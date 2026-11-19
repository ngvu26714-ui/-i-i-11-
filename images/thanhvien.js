
"use strict";

// ============================================
// BBB11 - QUẢN LÝ THÀNH VIÊN KHÔNG PHÂN QUYỀN
// ============================================

let danhSachThanhVienBBB11 = [];

function laySupabaseThanhVienBBB11() {
    return window.supabaseClient || null;
}

function escapeThanhVienBBB11(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// TẢI DANH SÁCH
async function layDanhSachThanhVien() {
    const client = laySupabaseThanhVienBBB11();

    if (!client) {
        throw new Error("Chưa kết nối Supabase.");
    }

    const { data, error } = await client
        .from("bbb11_members")
        .select("id, ho_ten, tieu_doi, created_at")
        .order("created_at", { ascending: false });

    if (error) throw error;

    danhSachThanhVienBBB11 = data || [];
    return danhSachThanhVienBBB11;
}

// HIỂN THỊ DANH SÁCH
async function hienThiThanhVien() {
    const khung = document.getElementById("danhSachThanhVien");
    if (!khung) return;

    khung.textContent = "Đang tải danh sách...";

    try {
        const danhSach = await layDanhSachThanhVien();

        if (!danhSach.length) {
            khung.textContent = "Chưa có thành viên nào.";
            return;
        }

        khung.innerHTML = danhSach.map((tv, index) => `
            <div class="list-item">
                <h4>${index + 1}. ${escapeThanhVienBBB11(tv.ho_ten)}</h4>
                <p>Trung đội: ${escapeThanhVienBBB11(tv.tieu_doi || "")}</p>

                <button type="button" class="action-button"
                    onclick="suaThanhVienBBB11('${encodeURIComponent(String(tv.id))}')">
                    Sửa
                </button>

                <button type="button" class="action-button"
                    onclick="xoaThanhVienBBB11('${encodeURIComponent(String(tv.id))}')">
                    Xóa
                </button>
            </div>
        `).join("");
    } catch (error) {
        console.error("Lỗi tải thành viên:", error);
        khung.textContent = "Không tải được danh sách: " + error.message;
    }
}


async function themThanhVien() {
    const client = laySupabaseThanhVienBBB11();

    if (!client) {
        alert("Chưa kết nối Supabase.");
        return;
    }

    try {

        // Lấy dữ liệu từ HTML
        const oHoTen = document.getElementById("tvHoTen");
        const oMaSo = document.getElementById("ma_so");
        const oTrungDoi = document.getElementById("tvTrungDoi");

        if (!oHoTen || !oMaSo || !oTrungDoi) {
            alert("Không tìm thấy ô nhập họ tên, mã số hoặc trung đội.");
            return;
        }

        const hoTen = oHoTen.value.trim();
        const maSo = oMaSo.value.trim();
        const trungDoi = oTrungDoi.value.trim();

        if (!hoTen || !maSo || !trungDoi) {
            alert("Vui lòng nhập đầy đủ họ tên, mã số và trung đội.");
            return;
        }

        // Thêm vào Supabase
        const { error } = await client
            .from("bbb11_members")
            .insert([{
                ma_so: maSo,
                ho_ten: hoTen,
                tieu_doi: trungDoi,
                vai_tro: "member",
                trang_thai: "active"
            }]);

        if (error) {
            console.error("Lỗi Supabase:", error);
            throw error;
        }

        alert("Thêm thành viên thành công!");

        oHoTen.value = "";
        oMaSo.value = "";
        oTrungDoi.value = "";

        // Tải lại danh sách nếu hàm này tồn tại
        if (typeof hienThiThanhVien === "function") {
            await hienThiThanhVien();
        }

    } catch (error) {
        console.error("Lỗi thêm thành viên:", error);
        alert("Không thể thêm thành viên: " + 
            (error.message || String(error)));
    }
}


// SỬA THÀNH VIÊN
async function suaThanhVienBBB11(idMaHoa) {
    const client = laySupabaseThanhVienBBB11();
    const id = decodeURIComponent(idMaHoa);

    const tv = danhSachThanhVienBBB11.find(
        item => String(item.id) === id
    );

    if (!tv) {
        alert("Không tìm thấy thành viên. Hãy tải lại trang.");
        return;
    }

    const hoTen = prompt("Họ tên:", tv.ho_ten || "");
    if (hoTen === null) return;

    const trungDoi = prompt("Trung đội:", tv.tieu_doi || "");
    if (trungDoi === null) return;

    if (!hoTen.trim() || !trungDoi.trim()) {
        alert("Họ tên và trung đội không được để trống.");
        return;
    }

    try {
        const { data, error } = await client
            .from("bbb11_members")
            .update({
                ho_ten: hoTen.trim(),
                tieu_doi: trungDoi.trim()
            })
            .eq("id", id)
            .select("id");

        if (error) throw error;
        if (!data?.length) {
            throw new Error("Không cập nhật được. Hãy kiểm tra quyền UPDATE trên Supabase.");
        }

        alert("Cập nhật thành công!");
        await hienThiThanhVien();
    } catch (error) {
        alert("Không thể sửa thành viên: " + error.message);
    }
}

// XÓA THÀNH VIÊN
async function xoaThanhVienBBB11(idMaHoa) {
    const client = laySupabaseThanhVienBBB11();
    const id = decodeURIComponent(idMaHoa);

    const tv = danhSachThanhVienBBB11.find(
        item => String(item.id) === id
    );

    if (!confirm("Bạn có chắc muốn xóa " + (tv?.ho_ten || "thành viên này") + "?")) {
        return;
    }

    try {
        const { data, error } = await client
            .from("bbb11_members")
            .delete()
            .eq("id", id)
            .select("id");

        if (error) throw error;
        if (!data?.length) {
            throw new Error("Không xóa được. Hãy kiểm tra quyền DELETE trên Supabase.");
        }

        alert("Đã xóa thành viên!");
        await hienThiThanhVien();
    } catch (error) {
        alert("Không thể xóa thành viên: " + error.message);
    }
}

// TÌM KIẾM
function timKiemThanhVienBBB11() {
    const tuKhoa = (
        document.getElementById("timThanhVien")?.value || ""
    ).trim().toLocaleLowerCase("vi");

    const khung = document.getElementById("danhSachThanhVien");
    if (!khung) return;

    const ketQua = danhSachThanhVienBBB11.filter(tv =>
        String(tv.ho_ten || "").toLocaleLowerCase("vi").includes(tuKhoa) ||
        String(tv.tieu_doi || "").toLocaleLowerCase("vi").includes(tuKhoa)
    );

    if (!ketQua.length) {
        khung.textContent = "Không tìm thấy thành viên.";
        return;
    }

    khung.innerHTML = ketQua.map((tv, index) => `
        <div class="list-item">
            <h4>${index + 1}. ${escapeThanhVienBBB11(tv.ho_ten)}</h4>
            <p>Trung đội: ${escapeThanhVienBBB11(tv.tieu_doi || "")}</p>
            <button type="button" onclick="suaThanhVienBBB11('${encodeURIComponent(String(tv.id))}')">Sửa</button>
            <button type="button" onclick="xoaThanhVienBBB11('${encodeURIComponent(String(tv.id))}')">Xóa</button>
        </div>
    `).join("");
}

async function kiemTraQuyenThanhVienBBB11() {
    const client = laySupabaseThanhVienBBB11();

    if (!client) {
        return { coQuyen: false };
    }

    try {
        // Kiểm tra người dùng đang đăng nhập
        const { data: authData, error: authError } =
            await client.auth.getUser();

        if (authError || !authData?.user) {
            return { coQuyen: false };
        }

        // Lấy vai trò từ bảng profiles
        const { data: profile, error } = await client
            .from("profiles")
            .select("role")
            .eq("id", authData.user.id)
            .maybeSingle();

        if (error) {
            console.error("Lỗi kiểm tra quyền:", error);
            return { coQuyen: false };
        }

        // Chỉ cho phép vai trò admin
        const vaiTro = String(profile?.role || "").toLowerCase();

        return {
            coQuyen: vaiTro === "admin"
        };

    } catch (error) {
        console.error("Lỗi xác minh quyền:", error);
        return { coQuyen: false };
    }
}

