
"use strict";

// ======================================
// BBB11 - AUTHENTICATION
// ======================================

let bbb11CurrentUser = null;
let bbb11CurrentRole = null;

const ADMIN_PAGES = [
    "admin",
    "members",
    "accounts",
    "attendance",
    "activities",
    "reports",
    "score"
];

// ======================================
// HIỂN THỊ GIAO DIỆN
// ======================================

function hienThiGiaoDienDaDangNhap(profile) {

    const loginPage = document.getElementById("loginPage");
    const app = document.querySelector(".app");

    if (loginPage) loginPage.classList.add("hidden");
    if (app) app.classList.remove("hidden");

    const ten = profile.email || "Người dùng BBB11";

    const userName = document.getElementById("userName");
    const welcomeName = document.getElementById("welcomeName");

    if (userName) {
        userName.textContent = ten + " (" + profile.role + ")";
    }

    if (welcomeName) {
        welcomeName.textContent = ten;
    }

    sessionStorage.setItem("bbb11_login", JSON.stringify({
        id: profile.id,
        ten,
        email: profile.email,
        role: profile.role
    }));

    // Phân quyền menu
    document.querySelectorAll(".menu-btn").forEach(button => {

        const page = button.getAttribute("onclick")
            ?.match(/showPage\('([^']+)'\)/)?.[1];

        if (page && ADMIN_PAGES.includes(page)) {
            button.style.display =
                profile.role === "admin" ? "" : "none";
        }
    });
}

// ======================================
// LẤY HỒ SƠ
// ======================================

async function layHoSoBBB11(userId) {

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("id, email, role, ho_ten, tieu_doi")
        .eq("id", userId)
        .maybeSingle();

    if (error) {
        console.error("Lỗi lấy profiles:", error);
        throw error;
    }

    if (!data) {
        throw new Error("Không tìm thấy hồ sơ trong profiles.");
    }

    const role = String(data.role || "")
        .trim()
        .toLowerCase();

    if (!["admin", "chien_si"].includes(role)) {
        throw new Error("Role không hợp lệ: " + role);
    }

    return {
        ...data,
        role
    };
}

// ======================================
// ĐĂNG NHẬP
// ======================================

async function dangNhap() {

    // HTML hiện tại sử dụng loginUsername
    const email = document
        .getElementById("loginUsername")
        ?.value.trim().toLowerCase();

    const password = document
        .getElementById("loginPassword")
        ?.value;

    if (!email || !password) {
        alert("Vui lòng nhập email và mật khẩu!");
        return;
    }

    try {

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

        if (error) {
            alert("Đăng nhập thất bại: " + error.message);
            return;
        }

       let profile = await layHoSoBBB11(data.user.id);

profile = await kiemTraHoSoCaNhanBBB11(
    data.user,
    profile
);

        bbb11CurrentUser = data.user;
        bbb11CurrentRole = profile.role;

        hienThiGiaoDienDaDangNhap(profile);

        alert("Đăng nhập BBB11 thành công!");

        if (profile.role === "admin") {
            showPage("admin");
        } else {
            showHome();
        }

    } catch (error) {

        console.error("BBB11 LOGIN ERROR:", error);

        await supabaseClient.auth.signOut();

        alert("Không thể xác nhận quyền truy cập: " + error.message);
    }
}


"use strict";

// ======================================
// ĐĂNG XUẤT
// ======================================

async function logout() {
    if (!confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        return;
    }

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert("Lỗi đăng xuất: " + error.message);
        return;
    }

    bbb11CurrentUser = null;
    bbb11CurrentRole = null;

    window.bbb11CurrentUser = null;
    window.bbb11CurrentRole = null;

    sessionStorage.removeItem("bbb11_login");
    location.reload();
}

// ======================================
// KIỂM TRA PHIÊN ĐĂNG NHẬP
// ======================================

async function khoiTaoDangNhapBBB11() {
    const loginPage = document.getElementById("loginPage");
    const app = document.querySelector(".app");

    if (loginPage) loginPage.classList.remove("hidden");
    if (app) app.classList.add("hidden");

    const { data, error } =
        await supabaseClient.auth.getSession();

    if (error) {
        console.error("Lỗi phiên:", error);
        return;
    }

    if (!data.session) return;

    try {
        const user = data.session.user;

        // Lấy hồ sơ từ bảng profiles
        let profile = await layHoSoBBB11(user.id);

        // Yêu cầu nhập họ tên và trung đội nếu chưa có
        profile = await kiemTraHoSoCaNhanBBB11(user, profile);

        // Lưu người dùng và vai trò
        bbb11CurrentUser = user;
        bbb11CurrentRole = profile.role;

        window.bbb11CurrentUser = user;
        window.bbb11CurrentRole = profile.role;

        // Hiển thị giao diện
        hienThiGiaoDienDaDangNhap(profile);

        if (profile.role === "admin") {
            showPage("admin");
        } else {
            showHome();
        }

    } catch (error) {
        console.error("Lỗi xác nhận hồ sơ:", error);

        await supabaseClient.auth.signOut();

        if (loginPage) loginPage.classList.remove("hidden");
        if (app) app.classList.add("hidden");

        alert("Không thể xác nhận hồ sơ: " + error.message);
    }
}


// ============================================
// BBB11 - HIỂN THỊ DANH SÁCH QUẢN LÝ TÀI KHOẢN
// ============================================

async function hienThiTaiKhoan() {
    const client = window.supabaseClient;

    // Chỉ quản trị viên được xem danh sách tài khoản
    if (window.bbb11CurrentRole !== "admin") {
        alert("Bạn không có quyền quản lý tài khoản!");
        return;
    }

    if (!client) {
        alert("Chưa kết nối được Supabase!");
        return;
    }

    // Tìm vùng hiển thị, không ghi đè lên nút menu
    let khuVuc = document.getElementById("danhSachTaiKhoan");

    if (!khuVuc || khuVuc.closest(".menu-btn")) {
        khuVuc = document.getElementById("pageContent");
    }

    if (!khuVuc) {
        console.error("Không tìm thấy khu vực hiển thị tài khoản.");
        return;
    }

    khuVuc.innerHTML = `
        <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
        <p>Đang tải danh sách tài khoản...</p>
    `;

    try {
        const { data: danhSach, error } = await client
            .from("profiles")
            .select("*")
            .order("ho_ten", { ascending: true });

        if (error) throw error;

        if (!danhSach || danhSach.length === 0) {
            khuVuc.innerHTML = `
                <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
                <p>Chưa có hồ sơ tài khoản nào.</p>
            `;
            return;
        }

        // Tạo bảng và tránh đưa dữ liệu trực tiếp vào HTML
        const bang = document.createElement("table");
        bang.style.width = "100%";
        bang.style.borderCollapse = "collapse";

        const tieuDe = document.createElement("thead");
        const dongTieuDe = document.createElement("tr");

        [
            "STT",
            "HỌ VÀ TÊN",
            "TRUNG ĐỘI",
            "VAI TRÒ",
            "MÃ HỒ SƠ"
        ].forEach(tieuDeCot => {
            const o = document.createElement("th");
            o.textContent = tieuDeCot;
            o.style.padding = "10px";
            o.style.border = "1px solid #ccc";
            dongTieuDe.appendChild(o);
        });

        tieuDe.appendChild(dongTieuDe);
        bang.appendChild(tieuDe);

        const thanBang = document.createElement("tbody");

        danhSach.forEach((taiKhoan, index) => {
            const dong = document.createElement("tr");

            const vaiTro = taiKhoan.role === "admin"
                ? "Quản trị viên"
                : "Thành viên";

            const cacCot = [
                index + 1,
                taiKhoan.ho_ten || "Chưa cập nhật",
                taiKhoan.tieu_doi || "Chưa cập nhật",
                vaiTro,
                taiKhoan.id || ""
            ];

            cacCot.forEach(giaTri => {
                const o = document.createElement("td");
                o.textContent = String(giaTri);
                o.style.padding = "10px";
                o.style.border = "1px solid #ccc";
                dong.appendChild(o);
            });

            thanBang.appendChild(dong);
        });

        bang.appendChild(thanBang);

        khuVuc.replaceChildren();

        const tieuDeTrang = document.createElement("h2");
        tieuDeTrang.textContent = "QUẢN LÝ TÀI KHOẢN BBB11";

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Tổng số hồ sơ: " + danhSach.length;

        khuVuc.append(tieuDeTrang, thongBao, bang);

    } catch (error) {
        console.error("Lỗi tải danh sách tài khoản:", error);

        khuVuc.replaceChildren();

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Không tải được danh sách. Hãy kiểm tra quyền truy cập bảng profiles trên Supabase.";

        khuVuc.appendChild(thongBao);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    khoiTaoDangNhapBBB11().catch(error => {
        console.error("BBB11 INIT ERROR:", error);
    });
});

// ============================================
// BBB11 - ĐỒNG BỘ HỒ SƠ VỚI DANH SÁCH THÀNH VIÊN
// ============================================

async function dongBoHoSoBBB11(user, hoTen, tieuDoi) {
    const client = window.supabaseClient;

    if (!client || !user?.id) {
        throw new Error("Chưa có kết nối hoặc tài khoản đăng nhập.");
    }

    hoTen = String(hoTen || "").trim();
    tieuDoi = String(tieuDoi || "").trim();

    if (!hoTen || !tieuDoi) {
        throw new Error("Vui lòng nhập họ tên và trung đội.");
    }

    // 1. Cập nhật hồ sơ, giữ nguyên role hiện tại
    const { error: loiProfile } = await client
        .from("profiles")
        .update({
            ho_ten: hoTen,
            tieu_doi: tieuDoi
        })
        .eq("id", user.id);

    if (loiProfile) throw loiProfile;

    // 2. Tìm thành viên theo tài khoản
    const { data: thanhVien, error: loiTim } = await client
        .from("bbb11_members")
        .select("id, ma_so, ho_ten, tieu_doi, chuc_vu")
        .eq("user_id", user.id)
        .maybeSingle();

    if (loiTim) throw loiTim;

    const maSo = thanhVien?.ma_so ||
        ("TV-" + user.id.replace(/-/g, "").slice(0, 8).toUpperCase());

    const duLieu = {
        user_id: user.id,
        ma_so: maSo,
        ho_ten: hoTen,
        tieu_doi: tieuDoi
    };

    let ketQua;

    if (thanhVien) {
        ketQua = await client
            .from("bbb11_members")
            .update(duLieu)
            .eq("user_id", user.id);
    } else {
        ketQua = await client
            .from("bbb11_members")
            .insert(duLieu);
    }

    if (ketQua.error) throw ketQua.error;

    // 3. Làm mới danh sách nếu hàm đang tồn tại
    if (typeof window.hienThiThanhVien === "function") {
        await window.hienThiThanhVien();
    }

    return true;
}

// ============================================
// YÊU CẦU BỔ SUNG HỒ SƠ LẦN ĐẦU
// ============================================

async function kiemTraHoSoCaNhanBBB11(user, profile) {
    if (profile.ho_ten && profile.tieu_doi) {
        return profile;
    }

    const hoTen = prompt("Nhập họ và tên của bạn:");
    if (!hoTen?.trim()) {
        throw new Error("Bạn cần nhập họ tên để tiếp tục.");
    }

    const tieuDoi = prompt("Nhập trung đội của bạn:");
    if (!tieuDoi?.trim()) {
        throw new Error("Bạn cần nhập trung đội để tiếp tục.");
    }

    await dongBoHoSoBBB11(user, hoTen, tieuDoi);

    return {
        ...profile,
        ho_ten: hoTen.trim(),
        tieu_doi: tieuDoi.trim()
    };
}


// ============================================
// BBB11 - HIỂN THỊ DANH SÁCH QUẢN LÝ TÀI KHOẢN
// ============================================

async function hienThiTaiKhoan() {
    const client = window.supabaseClient;

    // Chỉ quản trị viên được xem danh sách tài khoản
    if (window.bbb11CurrentRole !== "admin") {
        alert("Bạn không có quyền quản lý tài khoản!");
        return;
    }

    if (!client) {
        alert("Chưa kết nối được Supabase!");
        return;
    }

    // Tìm vùng hiển thị, không ghi đè lên nút menu
    let khuVuc = document.getElementById("danhSachTaiKhoan");

    if (!khuVuc || khuVuc.closest(".menu-btn")) {
        khuVuc = document.getElementById("pageContent");
    }

    if (!khuVuc) {
        console.error("Không tìm thấy khu vực hiển thị tài khoản.");
        return;
    }

    khuVuc.innerHTML = `
        <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
        <p>Đang tải danh sách tài khoản...</p>
    `;

    try {
        const { data: danhSach, error } = await client
            .from("profiles")
            .select("*")
            .order("ho_ten", { ascending: true });

        if (error) throw error;

        if (!danhSach || danhSach.length === 0) {
            khuVuc.innerHTML = `
                <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
                <p>Chưa có hồ sơ tài khoản nào.</p>
            `;
            return;
        }

        // Tạo bảng và tránh đưa dữ liệu trực tiếp vào HTML
        const bang = document.createElement("table");
        bang.style.width = "100%";
        bang.style.borderCollapse = "collapse";

        const tieuDe = document.createElement("thead");
        const dongTieuDe = document.createElement("tr");

        [
            "STT",
            "HỌ VÀ TÊN",
            "TRUNG ĐỘI",
            "VAI TRÒ",
            "MÃ HỒ SƠ"
        ].forEach(tieuDeCot => {
            const o = document.createElement("th");
            o.textContent = tieuDeCot;
            o.style.padding = "10px";
            o.style.border = "1px solid #ccc";
            dongTieuDe.appendChild(o);
        });

        tieuDe.appendChild(dongTieuDe);
        bang.appendChild(tieuDe);

        const thanBang = document.createElement("tbody");

        danhSach.forEach((taiKhoan, index) => {
            const dong = document.createElement("tr");

            const vaiTro = taiKhoan.role === "admin"
                ? "Quản trị viên"
                : "Thành viên";

            const cacCot = [
                index + 1,
                taiKhoan.ho_ten || "Chưa cập nhật",
                taiKhoan.tieu_doi || "Chưa cập nhật",
                vaiTro,
                taiKhoan.id || ""
            ];

            cacCot.forEach(giaTri => {
                const o = document.createElement("td");
                o.textContent = String(giaTri);
                o.style.padding = "10px";
                o.style.border = "1px solid #ccc";
                dong.appendChild(o);
            });

            thanBang.appendChild(dong);
        });

        bang.appendChild(thanBang);

        khuVuc.replaceChildren();

        const tieuDeTrang = document.createElement("h2");
        tieuDeTrang.textContent = "QUẢN LÝ TÀI KHOẢN BBB11";

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Tổng số hồ sơ: " + danhSach.length;

        khuVuc.append(tieuDeTrang, thongBao, bang);

    } catch (error) {
        console.error("Lỗi tải danh sách tài khoản:", error);

        khuVuc.replaceChildren();

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Không tải được danh sách. Hãy kiểm tra quyền truy cập bảng profiles trên Supabase.";

        khuVuc.appendChild(thongBao);
    }
}

// ============================================
// BBB11 - HIỂN THỊ DANH SÁCH QUẢN LÝ TÀI KHOẢN
// ============================================

async function hienThiTaiKhoan() {
    const client = window.supabaseClient;

    // Chỉ quản trị viên được xem danh sách tài khoản
    if (window.bbb11CurrentRole !== "admin") {
        alert("Bạn không có quyền quản lý tài khoản!");
        return;
    }

    if (!client) {
        alert("Chưa kết nối được Supabase!");
        return;
    }

    // Tìm vùng hiển thị, không ghi đè lên nút menu
    let khuVuc = document.getElementById("danhSachTaiKhoan");

    if (!khuVuc || khuVuc.closest(".menu-btn")) {
        khuVuc = document.getElementById("pageContent");
    }

    if (!khuVuc) {
        console.error("Không tìm thấy khu vực hiển thị tài khoản.");
        return;
    }

    khuVuc.innerHTML = `
        <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
        <p>Đang tải danh sách tài khoản...</p>
    `;

    try {
        const { data: danhSach, error } = await client
            .from("profiles")
            .select("*")
            .order("ho_ten", { ascending: true });

        if (error) throw error;

        if (!danhSach || danhSach.length === 0) {
            khuVuc.innerHTML = `
                <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
                <p>Chưa có hồ sơ tài khoản nào.</p>
            `;
            return;
        }

        // Tạo bảng và tránh đưa dữ liệu trực tiếp vào HTML
        const bang = document.createElement("table");
        bang.style.width = "100%";
        bang.style.borderCollapse = "collapse";

        const tieuDe = document.createElement("thead");
        const dongTieuDe = document.createElement("tr");

        [
            "STT",
            "HỌ VÀ TÊN",
            "TRUNG ĐỘI",
            "VAI TRÒ",
            "MÃ HỒ SƠ"
        ].forEach(tieuDeCot => {
            const o = document.createElement("th");
            o.textContent = tieuDeCot;
            o.style.padding = "10px";
            o.style.border = "1px solid #ccc";
            dongTieuDe.appendChild(o);
        });

        tieuDe.appendChild(dongTieuDe);
        bang.appendChild(tieuDe);

        const thanBang = document.createElement("tbody");

        danhSach.forEach((taiKhoan, index) => {
            const dong = document.createElement("tr");

            const vaiTro = taiKhoan.role === "admin"
                ? "Quản trị viên"
                : "Thành viên";

            const cacCot = [
                index + 1,
                taiKhoan.ho_ten || "Chưa cập nhật",
                taiKhoan.tieu_doi || "Chưa cập nhật",
                vaiTro,
                taiKhoan.id || ""
            ];

            cacCot.forEach(giaTri => {
                const o = document.createElement("td");
                o.textContent = String(giaTri);
                o.style.padding = "10px";
                o.style.border = "1px solid #ccc";
                dong.appendChild(o);
            });

            thanBang.appendChild(dong);
        });

        bang.appendChild(thanBang);

        khuVuc.replaceChildren();

        const tieuDeTrang = document.createElement("h2");
        tieuDeTrang.textContent = "QUẢN LÝ TÀI KHOẢN BBB11";

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Tổng số hồ sơ: " + danhSach.length;

        khuVuc.append(tieuDeTrang, thongBao, bang);

    } catch (error) {
        console.error("Lỗi tải danh sách tài khoản:", error);

        khuVuc.replaceChildren();

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Không tải được danh sách. Hãy kiểm tra quyền truy cập bảng profiles trên Supabase.";

        khuVuc.appendChild(thongBao);
    }
}

// ============================================
// BBB11 - HIỂN THỊ DANH SÁCH QUẢN LÝ TÀI KHOẢN
// ============================================

async function hienThiTaiKhoan() {
    const client = window.supabaseClient;

    // Chỉ quản trị viên được xem danh sách tài khoản
    if (window.bbb11CurrentRole !== "admin") {
        alert("Bạn không có quyền quản lý tài khoản!");
        return;
    }

    if (!client) {
        alert("Chưa kết nối được Supabase!");
        return;
    }

    // Tìm vùng hiển thị, không ghi đè lên nút menu
    let khuVuc = document.getElementById("danhSachTaiKhoan");

    if (!khuVuc || khuVuc.closest(".menu-btn")) {
        khuVuc = document.getElementById("pageContent");
    }

    if (!khuVuc) {
        console.error("Không tìm thấy khu vực hiển thị tài khoản.");
        return;
    }

    khuVuc.innerHTML = `
        <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
        <p>Đang tải danh sách tài khoản...</p>
    `;

    try {
        const { data: danhSach, error } = await client
            .from("profiles")
            .select("*")
            .order("ho_ten", { ascending: true });

        if (error) throw error;

        if (!danhSach || danhSach.length === 0) {
            khuVuc.innerHTML = `
                <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
                <p>Chưa có hồ sơ tài khoản nào.</p>
            `;
            return;
        }

        // Tạo bảng và tránh đưa dữ liệu trực tiếp vào HTML
        const bang = document.createElement("table");
        bang.style.width = "100%";
        bang.style.borderCollapse = "collapse";

        const tieuDe = document.createElement("thead");
        const dongTieuDe = document.createElement("tr");

        [
            "STT",
            "HỌ VÀ TÊN",
            "TRUNG ĐỘI",
            "VAI TRÒ",
            "MÃ HỒ SƠ"
        ].forEach(tieuDeCot => {
            const o = document.createElement("th");
            o.textContent = tieuDeCot;
            o.style.padding = "10px";
            o.style.border = "1px solid #ccc";
            dongTieuDe.appendChild(o);
        });

        tieuDe.appendChild(dongTieuDe);
        bang.appendChild(tieuDe);

        const thanBang = document.createElement("tbody");

        danhSach.forEach((taiKhoan, index) => {
            const dong = document.createElement("tr");

            const vaiTro = taiKhoan.role === "admin"
                ? "Quản trị viên"
                : "Thành viên";

            const cacCot = [
                index + 1,
                taiKhoan.ho_ten || "Chưa cập nhật",
                taiKhoan.tieu_doi || "Chưa cập nhật",
                vaiTro,
                taiKhoan.id || ""
            ];

            cacCot.forEach(giaTri => {
                const o = document.createElement("td");
                o.textContent = String(giaTri);
                o.style.padding = "10px";
                o.style.border = "1px solid #ccc";
                dong.appendChild(o);
            });

            thanBang.appendChild(dong);
        });

        bang.appendChild(thanBang);

        khuVuc.replaceChildren();

        const tieuDeTrang = document.createElement("h2");
        tieuDeTrang.textContent = "QUẢN LÝ TÀI KHOẢN BBB11";

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Tổng số hồ sơ: " + danhSach.length;

        khuVuc.append(tieuDeTrang, thongBao, bang);

    } catch (error) {
        console.error("Lỗi tải danh sách tài khoản:", error);

        khuVuc.replaceChildren();

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Không tải được danh sách. Hãy kiểm tra quyền truy cập bảng profiles trên Supabase.";

        khuVuc.appendChild(thongBao);
    }
}
// ============================================
// BBB11 - HIỂN THỊ DANH SÁCH QUẢN LÝ TÀI KHOẢN
// ============================================

async function hienThiTaiKhoan() {
    const client = window.supabaseClient;

    // Chỉ quản trị viên được xem danh sách tài khoản
    if (window.bbb11CurrentRole !== "admin") {
        alert("Bạn không có quyền quản lý tài khoản!");
        return;
    }

    if (!client) {
        alert("Chưa kết nối được Supabase!");
        return;
    }

    // Tìm vùng hiển thị, không ghi đè lên nút menu
    let khuVuc = document.getElementById("danhSachTaiKhoan");

    if (!khuVuc || khuVuc.closest(".menu-btn")) {
        khuVuc = document.getElementById("pageContent");
    }

    if (!khuVuc) {
        console.error("Không tìm thấy khu vực hiển thị tài khoản.");
        return;
    }

    khuVuc.innerHTML = `
        <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
        <p>Đang tải danh sách tài khoản...</p>
    `;

    try {
        const { data: danhSach, error } = await client
            .from("profiles")
            .select("*")
            .order("ho_ten", { ascending: true });

        if (error) throw error;

        if (!danhSach || danhSach.length === 0) {
            khuVuc.innerHTML = `
                <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
                <p>Chưa có hồ sơ tài khoản nào.</p>
            `;
            return;
        }

        // Tạo bảng và tránh đưa dữ liệu trực tiếp vào HTML
        const bang = document.createElement("table");
        bang.style.width = "100%";
        bang.style.borderCollapse = "collapse";

        const tieuDe = document.createElement("thead");
        const dongTieuDe = document.createElement("tr");

        [
            "STT",
            "HỌ VÀ TÊN",
            "TRUNG ĐỘI",
            "VAI TRÒ",
            "MÃ HỒ SƠ"
        ].forEach(tieuDeCot => {
            const o = document.createElement("th");
            o.textContent = tieuDeCot;
            o.style.padding = "10px";
            o.style.border = "1px solid #ccc";
            dongTieuDe.appendChild(o);
        });

        tieuDe.appendChild(dongTieuDe);
        bang.appendChild(tieuDe);

        const thanBang = document.createElement("tbody");

        danhSach.forEach((taiKhoan, index) => {
            const dong = document.createElement("tr");

            const vaiTro = taiKhoan.role === "admin"
                ? "Quản trị viên"
                : "Thành viên";

            const cacCot = [
                index + 1,
                taiKhoan.ho_ten || "Chưa cập nhật",
                taiKhoan.tieu_doi || "Chưa cập nhật",
                vaiTro,
                taiKhoan.id || ""
            ];

            cacCot.forEach(giaTri => {
                const o = document.createElement("td");
                o.textContent = String(giaTri);
                o.style.padding = "10px";
                o.style.border = "1px solid #ccc";
                dong.appendChild(o);
            });

            thanBang.appendChild(dong);
        });

        bang.appendChild(thanBang);

        khuVuc.replaceChildren();

        const tieuDeTrang = document.createElement("h2");
        tieuDeTrang.textContent = "QUẢN LÝ TÀI KHOẢN BBB11";

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Tổng số hồ sơ: " + danhSach.length;

        khuVuc.append(tieuDeTrang, thongBao, bang);

    } catch (error) {
        console.error("Lỗi tải danh sách tài khoản:", error);

        khuVuc.replaceChildren();

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Không tải được danh sách. Hãy kiểm tra quyền truy cập bảng profiles trên Supabase.";

        khuVuc.appendChild(thongBao);
    }
}

// ============================================
// BBB11 - HIỂN THỊ DANH SÁCH QUẢN LÝ TÀI KHOẢN
// ============================================

async function hienThiTaiKhoan() {
    const client = window.supabaseClient;

    // Chỉ quản trị viên được xem danh sách tài khoản
    if (window.bbb11CurrentRole !== "admin") {
        alert("Bạn không có quyền quản lý tài khoản!");
        return;
    }

    if (!client) {
        alert("Chưa kết nối được Supabase!");
        return;
    }

    // Tìm vùng hiển thị, không ghi đè lên nút menu
    let khuVuc = document.getElementById("danhSachTaiKhoan");

    if (!khuVuc || khuVuc.closest(".menu-btn")) {
        khuVuc = document.getElementById("pageContent");
    }

    if (!khuVuc) {
        console.error("Không tìm thấy khu vực hiển thị tài khoản.");
        return;
    }

    khuVuc.innerHTML = `
        <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
        <p>Đang tải danh sách tài khoản...</p>
    `;

    try {
        const { data: danhSach, error } = await client
            .from("profiles")
            .select("*")
            .order("ho_ten", { ascending: true });

        if (error) throw error;

        if (!danhSach || danhSach.length === 0) {
            khuVuc.innerHTML = `
                <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>
                <p>Chưa có hồ sơ tài khoản nào.</p>
            `;
            return;
        }

        // Tạo bảng và tránh đưa dữ liệu trực tiếp vào HTML
        const bang = document.createElement("table");
        bang.style.width = "100%";
        bang.style.borderCollapse = "collapse";

        const tieuDe = document.createElement("thead");
        const dongTieuDe = document.createElement("tr");

        [
            "STT",
            "HỌ VÀ TÊN",
            "TRUNG ĐỘI",
            "VAI TRÒ",
            "MÃ HỒ SƠ"
        ].forEach(tieuDeCot => {
            const o = document.createElement("th");
            o.textContent = tieuDeCot;
            o.style.padding = "10px";
            o.style.border = "1px solid #ccc";
            dongTieuDe.appendChild(o);
        });

        tieuDe.appendChild(dongTieuDe);
        bang.appendChild(tieuDe);

        const thanBang = document.createElement("tbody");

        danhSach.forEach((taiKhoan, index) => {
            const dong = document.createElement("tr");

            const vaiTro = taiKhoan.role === "admin"
                ? "Quản trị viên"
                : "Thành viên";

            const cacCot = [
                index + 1,
                taiKhoan.ho_ten || "Chưa cập nhật",
                taiKhoan.tieu_doi || "Chưa cập nhật",
                vaiTro,
                taiKhoan.id || ""
            ];

            cacCot.forEach(giaTri => {
                const o = document.createElement("td");
                o.textContent = String(giaTri);
                o.style.padding = "10px";
                o.style.border = "1px solid #ccc";
                dong.appendChild(o);
            });

            thanBang.appendChild(dong);
        });

        bang.appendChild(thanBang);

        khuVuc.replaceChildren();

        const tieuDeTrang = document.createElement("h2");
        tieuDeTrang.textContent = "QUẢN LÝ TÀI KHOẢN BBB11";

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Tổng số hồ sơ: " + danhSach.length;

        khuVuc.append(tieuDeTrang, thongBao, bang);

    } catch (error) {
        console.error("Lỗi tải danh sách tài khoản:", error);

        khuVuc.replaceChildren();

        const thongBao = document.createElement("p");
        thongBao.textContent =
            "Không tải được danh sách. Hãy kiểm tra quyền truy cập bảng profiles trên Supabase.";

        khuVuc.appendChild(thongBao);
    }
}

// BBB11 - QUAN LY TAI KHOAN
async function hienThiTaiKhoan() {
    const client = window.supabaseClient;

    if (window.bbb11CurrentRole !== "admin") {
        alert("Ban khong co quyen quan ly tai khoan!");
        return;
    }

    if (!client) {
        alert("Chua ket noi Supabase!");
        return;
    }

    const khuVuc = document.getElementById("pageContent");

    if (!khuVuc) {
        alert("Khong tim thay pageContent!");
        return;
    }

    khuVuc.innerHTML = "<h2>QUAN LY TAI KHOAN BBB11</h2><p>Dang tai...</p>";
        try {
        const { data, error } = await client
            .from("profiles")
            .select("id, ho_ten, tieu_doi, role")
            .order("ho_ten", { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
            khuVuc.innerHTML =
                "<h2>QUAN LY TAI KHOAN BBB11</h2><p>Chua co tai khoan.</p>";
            return;
        }
                const bang = document.createElement("table");
        bang.style.width = "100%";
        bang.style.borderCollapse = "collapse";

        const cot = ["STT", "HO TEN", "TRUNG DOI", "VAI TRO", "MA HO SO"];
        const thead = document.createElement("tr");

        cot.forEach(t => {
            const th = document.createElement("th");
            th.textContent = t;
            th.style.border = "1px solid #ccc";
            th.style.padding = "8px";
            thead.appendChild(th);
        });

        bang.appendChild(thead);

        data.forEach((tk, i) => {
            const tr = document.createElement("tr");

            [
                i + 1,
                tk.ho_ten || "Chua cap nhat",
                tk.tieu_doi || "Chua cap nhat",
                tk.role || "member",
                tk.id || ""
            ].forEach(value => {
                const td = document.createElement("td");
                td.textContent = String(value);
                td.style.border = "1px solid #ccc";
                td.style.padding = "8px";
                tr.appendChild(td);
            });

            bang.appendChild(tr);
        });

        khuVuc.replaceChildren();

        const h2 = document.createElement("h2");
        h2.textContent = "QUAN LY TAI KHOAN BBB11";

        const p = document.createElement("p");
        p.textContent = "Tong so ho so: " + data.length;

        khuVuc.append(h2, p, bang);
            } catch (error) {
        console.error("Loi hien thi tai khoan:", error);
        khuVuc.textContent =
            "Khong tai duoc danh sach. Hay kiem tra quyen truy cap Supabase.";
    }
}

window.hienThiTaiKhoan = hienThiTaiKhoan;

