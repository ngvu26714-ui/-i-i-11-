
"use strict";

// ======================================
// BBB11 - ĐẠI ĐỘI 11
// HỆ THỐNG QUẢN LÝ
// ======================================

console.log("BBB11: JavaScript đã tải!");

// ======================================
// 1. HÀM LƯU VÀ ĐỌC DỮ LIỆU
// ======================================

function docDuLieu(key) {
    try {
        const data = JSON.parse(
            localStorage.getItem(key) || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Lỗi đọc dữ liệu:", error);
        return [];
    }
}

function luuDuLieu(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ======================================
// 2. THÔNG TIN NGƯỜI DÙNG
// ======================================

function capNhatThongTinNguoiDung() {
    let user = null;

    try {
        user = JSON.parse(
            sessionStorage.getItem("bbb11_login") || "null"
        );
    } catch (error) {
        console.error(error);
    }

    const ten = user?.ten || "KHÁCH TRUY CẬP";

    const userName = document.getElementById("userName");
    const welcomeName = document.getElementById("welcomeName");

    if (userName) userName.textContent = ten;
    if (welcomeName) welcomeName.textContent = ten;
}

// ======================================
// 3. TRANG CHỦ
// ======================================

function showHome() {
    document.getElementById("homePage")
        ?.classList.remove("hidden");

    document.getElementById("functionPage")
        ?.classList.add("hidden");

    capNhatThongTinNguoiDung();
}

// ======================================
// 4. ĐIỀU HƯỚNG CÁC CHỨC NĂNG
// ======================================

function showPage(page) {
    const home = document.getElementById("homePage");
    const functionPage = document.getElementById("functionPage");
    const content = document.getElementById("pageContent");

    if (!home || !functionPage || !content) {
        alert("Không tìm thấy khu vực hiển thị!");
        return;
    }

    const pages = {
        admin: adminPage,
        members: membersPage,
        accounts: accountsPage,
        attendance: attendancePage,
        activities: activitiesPage,
        reports: reportsPage,
        manual: manualPage,
        resolution: resolutionPage,
        news: newsPage,
        music: musicPage,
        quiz: quizPage,
        education: educationPage,
        bac: bacPage,
        question: questionPage,
        score: scorePage,
        ranking: rankingPage
    };

    if (typeof pages[page] !== "function") {
        content.innerHTML = "<h2>Chức năng chưa được xây dựng.</h2>";
    } else {
        try {
            content.innerHTML = pages[page]();
        } catch (error) {
            console.error(error);
            content.innerHTML = `
                <h2>Lỗi tải chức năng</h2>
                <p>${escapeHTML(error.message)}</p>
            `;
        }
    }

    home.classList.add("hidden");
    functionPage.classList.remove("hidden");

    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeButton = document.querySelector(
        `.menu-btn[onclick="showPage('${page}')"]`
    );

    activeButton?.classList.add("active");

    if (page === "members") hienThiThanhVien();
    if (page === "accounts") hienThiTaiKhoan();
    if (page === "attendance") hienThiDiemDanh();
    if (page === "activities") hienThiHoatDong();
    if (page === "score") hienThiDiemThiDua();
    if (page === "ranking") hienThiBangXepHang();
}

// ======================================
// 5. BẢO VỆ DỮ LIỆU HIỂN THỊ
// ======================================

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// ======================================
// 6. ĐĂNG XUẤT
// ======================================

function logout() {
    if (!confirm("Bạn có muốn đăng xuất không?")) return;

    sessionStorage.removeItem("bbb11_login");
    showHome();
}

// ======================================
// 7. QUẢN LÝ THÀNH VIÊN
// ======================================

function membersPage() {
    return `
        <div class="page-box">
            <h2>QUẢN LÝ THÀNH VIÊN BBB11</h2>

            <h3>THÊM THÀNH VIÊN</h3>

            <input id="tvHoTen" placeholder="Họ và tên">
            <input id="tvMaSo" placeholder="Mã số thành viên">
            <input id="tvChucVu" placeholder="Chức vụ">
            <input id="tvTieuDoi" placeholder="Tiểu đội">

            <button class="action-button" onclick="themThanhVien()">
                Thêm thành viên
            </button>

            <h3>TÌM KIẾM THÀNH VIÊN</h3>

            <input id="timThanhVien"
                placeholder="Nhập tên hoặc mã số..."
                oninput="hienThiThanhVien()">

            <h3>DANH SÁCH THÀNH VIÊN</h3>

            <div id="danhSachThanhVien"></div>
        </div>
    `;
}

function layDanhSachThanhVien() {
    return docDuLieu("bbb11_thanhvien");
}

function themThanhVien() {
    const hoTen = document.getElementById("tvHoTen").value.trim();
    const maSo = document.getElementById("tvMaSo").value.trim();
    const chucVu = document.getElementById("tvChucVu").value.trim();
    const tieuDoi = document.getElementById("tvTieuDoi").value.trim();

    if (!hoTen || !maSo) {
        alert("Vui lòng nhập họ tên và mã số!");
        return;
    }

    const danhSach = layDanhSachThanhVien();

    if (danhSach.some(tv => tv.maSo === maSo)) {
        alert("Mã số đã tồn tại!");
        return;
    }

    danhSach.push({
        id: Date.now().toString(),
        hoTen,
        maSo,
        chucVu,
        tieuDoi
    });

    luuDuLieu("bbb11_thanhvien", danhSach);

    alert("Thêm thành viên thành công!");
    showPage("members");
}

function hienThiThanhVien() {
    const noiDung = document.getElementById("danhSachThanhVien");
    if (!noiDung) return;

    const tuKhoa = (
        document.getElementById("timThanhVien")?.value || ""
    ).toLowerCase().trim();

    const danhSach = layDanhSachThanhVien().filter(tv =>
        String(tv.hoTen).toLowerCase().includes(tuKhoa) ||
        String(tv.maSo).toLowerCase().includes(tuKhoa)
    );

    if (!danhSach.length) {
        noiDung.innerHTML = "<p>Chưa có thành viên.</p>";
        return;
    }

    noiDung.innerHTML = danhSach.map(tv => `
        <div class="list-item">
            <h3>${escapeHTML(tv.hoTen)}</h3>
            <p>Mã số: ${escapeHTML(tv.maSo)}</p>
            <p>Chức vụ: ${escapeHTML(tv.chucVu)}</p>
            <p>Tiểu đội: ${escapeHTML(tv.tieuDoi)}</p>

            <button class="action-button"
                onclick="suaThanhVien('${escapeHTML(tv.id)}')">
                Sửa
            </button>

            <button class="action-button"
                onclick="xoaThanhVien('${escapeHTML(tv.id)}')">
                Xóa
            </button>
        </div>
    `).join("");
}

function suaThanhVien(id) {
    const danhSach = layDanhSachThanhVien();
    const tv = danhSach.find(item => item.id === id);

    if (!tv) return;

    const hoTen = prompt("Họ tên:", tv.hoTen);
    if (hoTen === null) return;

    const chucVu = prompt("Chức vụ:", tv.chucVu);
    if (chucVu === null) return;

    const tieuDoi = prompt("Tiểu đội:", tv.tieuDoi);
    if (tieuDoi === null) return;

    if (!hoTen.trim()) {
        alert("Họ tên không được để trống!");
        return;
    }

    tv.hoTen = hoTen.trim();
    tv.chucVu = chucVu.trim();
    tv.tieuDoi = tieuDoi.trim();

    luuDuLieu("bbb11_thanhvien", danhSach);
    showPage("members");
}

function xoaThanhVien(id) {
    if (!confirm("Bạn chắc chắn muốn xóa thành viên này?")) return;

    const danhSach = layDanhSachThanhVien().filter(
        tv => tv.id !== id
    );

    luuDuLieu("bbb11_thanhvien", danhSach);
    showPage("members");
}

// ======================================
// 8. CÁC TRANG CHỨC NĂNG CƠ BẢN
// ======================================

function taoTrang(tieuDe, moTa) {
    return `
        <div class="page-box">
            <h2>${tieuDe}</h2>
            <p>${moTa}</p>
        </div>
    `;
}

function adminPage() {
    return taoTrang("BẢNG ĐIỀU KHIỂN",
        "Tổng quan hệ thống quản lý Đại đội 11.");
}


function accountsPage() {
    return `
        <div class="page-box">

            <h2>QUẢN LÝ TÀI KHOẢN BBB11</h2>

            <p>Danh sách tài khoản thành viên Đại đội 11.</p>

            <button class="action-button"
                onclick="hienThiTaiKhoan()">
                TẢI DANH SÁCH TÀI KHOẢN
            </button>

            <div id="danhSachTaiKhoan">
                <p>Nhấn nút để tải danh sách.</p>
            </div>

        </div>
    `;
}



function attendancePage() {
    return taoTrang("QUẢN LÝ ĐIỂM DANH",
        "Khu vực theo dõi tình hình điểm danh.");
}

function activitiesPage() {
    return taoTrang("QUẢN LÝ HOẠT ĐỘNG",
        "Khu vực quản lý các hoạt động của đơn vị.");
}

function reportsPage() {
    return taoTrang("BÁO CÁO THỐNG KÊ",
        "Khu vực tổng hợp báo cáo và thống kê.");
}

function manualPage() {
    return taoTrang("CẨM NANG NGƯỜI LÍNH",
        "Tài liệu học tập và rèn luyện.");
}


function resolutionPage() {
    return `
        <div class="page-box">
            <h2>HỌC TẬP NGHỊ QUYẾT</h2>

            <p>
                Kho tài liệu học tập nghị quyết của Đại đội 11.
            </p>

            <div class="list-item">
                <h3>THÊM TÀI LIỆU</h3>

                <input id="resolutionTitle"
                    placeholder="Tên tài liệu">

                <select id="resolutionCategory">
                    <option value="Nghị quyết">Nghị quyết</option>
                    <option value="Chỉ thị">Chỉ thị</option>
                    <option value="Văn kiện">Văn kiện</option>
                    <option value="Tài liệu học tập">Tài liệu học tập</option>
                    <option value="Khác">Khác</option>
                </select>

                <input id="resolutionUrl"
                    type="url"
                    placeholder="Dán link PDF, Word hoặc website">

                <button class="action-button"
                    onclick="themTaiLieuNghiQuyet()">
                    THÊM TÀI LIỆU
                </button>
            </div>

            <div class="list-item">
                <h3>TÌM KIẾM TÀI LIỆU</h3>

                <input id="resolutionSearch"
                    placeholder="Nhập tên tài liệu..."
                    oninput="hienThiTaiLieuNghiQuyet()">
            </div>

            <h3>DANH SÁCH TÀI LIỆU</h3>

            <div id="resolutionList">
                Đang tải tài liệu...
            </div>
        </div>
    `;
}

// LẤY DỮ LIỆU
function layTaiLieuNghiQuyet() {
    try {
        return JSON.parse(
            localStorage.getItem("bbb11_resolution") || "[]"
        );
    } catch {
        return [];
    }
}

// KIỂM TRA ĐƯỜNG LINK
function kiemTraLinkNghiQuyet(url) {
    try {
        const parsed = new URL(url);

        return ["https:", "http:"].includes(parsed.protocol);
    } catch {
        return false;
    }
}

// THÊM TÀI LIỆU
function themTaiLieuNghiQuyet() {
    const title = document
        .getElementById("resolutionTitle").value.trim();

    const category = document
        .getElementById("resolutionCategory").value;

    const url = document
        .getElementById("resolutionUrl").value.trim();

    if (!title || !url) {
        alert("Vui lòng nhập tên và đường link tài liệu!");
        return;
    }

    if (!kiemTraLinkNghiQuyet(url)) {
        alert("Đường link không hợp lệ!");
        return;
    }

    const danhSach = layTaiLieuNghiQuyet();

    danhSach.push({
        id: Date.now().toString(),
        title,
        category,
        url,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem(
        "bbb11_resolution",
        JSON.stringify(danhSach)
    );

    alert("Đã thêm tài liệu thành công!");

    showPage("resolution");
}

// HIỂN THỊ TÀI LIỆU
function hienThiTaiLieuNghiQuyet() {
    const khung = document.getElementById("resolutionList");

    if (!khung) return;

    const keyword = (
        document.getElementById("resolutionSearch")?.value || ""
    ).toLowerCase().trim();

    const danhSach = layTaiLieuNghiQuyet().filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword)
    );

    if (!danhSach.length) {
        khung.innerHTML = "<p>Chưa có tài liệu phù hợp.</p>";
        return;
    }

    khung.innerHTML = danhSach.map(item => `
        <div class="list-item">
            <h3>${escapeHTML(item.title)}</h3>

            <p>Phân loại: ${escapeHTML(item.category)}</p>

            <a href="${escapeHTML(item.url)}"
               target="_blank"
               rel="noopener noreferrer">
                📖 MỞ TÀI LIỆU
            </a>

            <button class="btn-delete"
                onclick="xoaTaiLieuNghiQuyet('${item.id}')">
                XÓA
            </button>
        </div>
    `).join("");
}

// XÓA TÀI LIỆU
function xoaTaiLieuNghiQuyet(id) {
    if (!confirm("Bạn có chắc muốn xóa tài liệu này?")) return;

    const danhSach = layTaiLieuNghiQuyet().filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "bbb11_resolution",
        JSON.stringify(danhSach)
    );

    showPage("resolution");
}




function newsPage() {
    return `
        <div class="page-box">
            <h2>ĐỌC BÁO VÀ NGHE TIN</h2>

            <p>
                Kho liên kết báo chí, thời sự và các chương trình nghe tin.
            </p>

            <div class="list-item">
                <h3>THÊM ĐƯỜNG LINK BÁO ĐIỆN TỬ</h3>

                <input id="newsTitle"
                    type="text"
                    placeholder="Tên báo hoặc nội dung tin tức">

                <input id="newsUrl"
                    type="url"
                    placeholder="Dán đường link báo tại đây">

                <button class="action-button"
                    onclick="themLienKetBao('bao')">
                    THÊM LINK BÁO
                </button>
            </div>

            <div class="list-item">
                <h3>THÊM LINK NGHE TIN</h3>

                <input id="audioTitle"
                    type="text"
                    placeholder="Tên chương trình nghe tin">

                <input id="audioUrl"
                    type="url"
                    placeholder="Dán link MP3 hoặc âm thanh">

                <button class="action-button"
                    onclick="themLienKetBao('audio')">
                    THÊM LINK NGHE TIN
                </button>
            </div>

            <h3> DANH SÁCH BÁO ĐIỆN TỬ </h3>
            <div id="newsList"></div>

            <h3> DANH SÁCH NGHE TIN </h3>
            <div id="audioList"></div>
        </div>
    `;
}

// ĐỌC DỮ LIỆU
function layLienKetBao() {
    try {
        return JSON.parse(
            localStorage.getItem("bbb11_news") || "[]"
        );
    } catch {
        return [];
    }
}

// KIỂM TRA LINK
function kiemTraURL(url) {
    try {
        const parsed = new URL(url);

        return parsed.protocol === "https:" ||
               parsed.protocol === "http:";
    } catch {
        return false;
    }
}

// THÊM LINK
function themLienKetBao(loai) {
    const laAudio = loai === "audio";

    const title = document.getElementById(
        laAudio ? "audioTitle" : "newsTitle"
    ).value.trim();

    const url = document.getElementById(
        laAudio ? "audioUrl" : "newsUrl"
    ).value.trim();

    if (!title || !url) {
        alert("Vui lòng nhập tên và đường link!");
        return;
    }

    if (!kiemTraURL(url)) {
        alert("Đường link không hợp lệ!");
        return;
    }

    const danhSach = layLienKetBao();

    danhSach.push({
        id: Date.now().toString(),
        title,
        url,
        type: loai
    });

    localStorage.setItem(
        "bbb11_news",
        JSON.stringify(danhSach)
    );

    alert("Đã thêm liên kết thành công!");

    showPage("news");
}

// HIỂN THỊ DANH SÁCH
function hienThiLienKetBao() {
    const danhSach = layLienKetBao();

    const newsList = document.getElementById("newsList");
    const audioList = document.getElementById("audioList");

    if (!newsList || !audioList) return;

    const bao = danhSach.filter(item => item.type === "bao");
    const audio = danhSach.filter(item => item.type === "audio");

    newsList.innerHTML = bao.length
        ? bao.map(item => `
            <div class="list-item">
                <h3>${escapeHTML(item.title)}</h3>

                <a href="${escapeHTML(item.url)}"
                   target="_blank"
                   rel="noopener noreferrer">
                    MỞ TRANG BÁO
                </a>

                <button class="btn-delete"
                    onclick="xoaLienKetBao('${item.id}')">
                    Xóa
                </button>
            </div>
        `).join("")
        : "<p>Chưa có đường link báo.</p>";

    audioList.innerHTML = audio.length
        ? audio.map(item => `
            <div class="list-item">
                <h3>${escapeHTML(item.title)}</h3>

                <a href="${escapeHTML(item.url)}"
                   target="_blank"
                   rel="noopener noreferrer">
                    MỞ NGHE TIN
                </a>

                <button class="btn-delete"
                    onclick="xoaLienKetBao('${item.id}')">
                    Xóa
                </button>
            </div>
        `).join("")
        : "<p>Chưa có đường link nghe tin.</p>";
}

// XÓA LINK
function xoaLienKetBao(id) {
    if (!confirm("Bạn có chắc muốn xóa liên kết này?")) return;

    const danhSach = layLienKetBao().filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "bbb11_news",
        JSON.stringify(danhSach)
    );

    showPage("news");
}


function musicPage() {
    return taoTrang("KHO TÀNG ÂM NHẠC",
        "Kho bài hát truyền thống.");
}

function quizPage() {
    return taoTrang("KIỂM TRA TRẮC NGHIỆM",
        "Chuyên mục kiểm tra kiến thức.");
}

function educationPage() {
    return taoTrang("GIÁO DỤC CHÍNH TRỊ",
        "Tài liệu giáo dục chính trị.");
}

function bacPage() {
    return taoTrang("LỜI BÁC HỒ DẠY",
        "Học tập và làm theo lời Bác.");
}

function questionPage() {
    return taoTrang("MỖI TUẦN MỘT CÂU HỎI",
        "Chuyên mục hỏi đáp kiến thức.");
}

function scorePage() {
    return taoTrang("CHẤM ĐIỂM THI ĐUA",
        "Khu vực theo dõi điểm thi đua.");
}

function rankingPage() {
    return taoTrang("BẢNG TIN THI ĐUA",
        "Thành tích thi đua của đơn vị.");
}

// ======================================
// 9. CÁC HÀM TẠM CHO TRANG QUẢN LÝ
// ======================================

function hienThiTaiKhoan() {}
function hienThiDiemDanh() {}
function hienThiHoatDong() {}
function hienThiDiemThiDua() {}
function hienThiBangXepHang() {}

// ======================================
// 10. KHỞI ĐỘNG
// ======================================

document.addEventListener("DOMContentLoaded", function() {
    capNhatThongTinNguoiDung();
    showHome();

    console.log("BBB11: Khởi động thành công!");
});

