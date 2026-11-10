
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
    if (page === "ranking") hienThiNganHangQuiz();
    if (page === "ranking") hienThiLichSuQuiz();
    if (page === "ranking") hienThiBangXepHang();
    if (page === "ranking") hienThiBangXepHang();
    if (page === "question") {
    hienThiCauHoiTuan();
}
    if (page === "quiz") {
    
}

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
    return `
        <div class="page-box">
            <h2>CẨM NANG NGƯỜI LÍNH</h2>

            <p>
                Kho tài liệu cẩm nang, kiến thức và kỹ năng
                dành cho cán bộ, chiến sĩ Đại đội 11.
            </p>

            <div class="list-item">
                <h3>THÊM TÀI LIỆU CẨM NANG</h3>

                <input id="manualTitle"
                    placeholder="Tên tài liệu">

                <select id="manualCategory">
                    <option value="Điều lệnh">Điều lệnh</option>
                    <option value="Kỷ luật">Kỷ luật</option>
                    <option value="Kỹ năng quân nhân">Kỹ năng quân nhân</option>
                    <option value="Kiến thức">Kiến thức</option>
                    <option value="Khác">Khác</option>
                </select>

                <input id="manualUrl"
                    type="url"
                    placeholder="Dán link PDF hoặc website">

                <button class="action-button"
                    onclick="themCamNang()">
                    THÊM TÀI LIỆU
                </button>
            </div>

            <div class="list-item">
                <h3>TÌM KIẾM CẨM NANG</h3>

                <input id="manualSearch"
                    placeholder="Nhập tên tài liệu..."
                    oninput="hienThiCamNang()">
            </div>

            <h3>DANH SÁCH CẨM NANG</h3>

            <div id="manualList">
                Đang tải dữ liệu...
            </div>
        </div>
    `;
}

// LẤY DỮ LIỆU
function layDanhSachCamNang() {
    try {
        return JSON.parse(
            localStorage.getItem("bbb11_manual") || "[]"
        );
    } catch {
        return [];
    }
}

// KIỂM TRA LINK
function kiemTraLinkCamNang(url) {
    try {
        const parsed = new URL(url);
        return ["https:", "http:"].includes(parsed.protocol);
    } catch {
        return false;
    }
}

// THÊM TÀI LIỆU
function themCamNang() {
    const title = document
        .getElementById("manualTitle").value.trim();

    const category = document
        .getElementById("manualCategory").value;

    const url = document
        .getElementById("manualUrl").value.trim();

    if (!title || !url) {
        alert("Vui lòng nhập tên và đường link!");
        return;
    }

    if (!kiemTraLinkCamNang(url)) {
        alert("Đường link không hợp lệ!");
        return;
    }

    const danhSach = layDanhSachCamNang();

    danhSach.push({
        id: Date.now().toString(),
        title,
        category,
        url
    });

    localStorage.setItem(
        "bbb11_manual",
        JSON.stringify(danhSach)
    );

    alert("Đã thêm cẩm nang!");

    showPage("manual");
}

// HIỂN THỊ
function hienThiCamNang() {
    const khung = document.getElementById("manualList");

    if (!khung) return;

    const keyword = (
        document.getElementById("manualSearch")?.value || ""
    ).toLowerCase().trim();

    const danhSach = layDanhSachCamNang().filter(item =>
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
                MỞ TÀI LIỆU
            </a>

            <button class="btn-delete"
                onclick="xoaCamNang('${item.id}')">
                XÓA
            </button>
        </div>
    `).join("");
}

// XÓA
function xoaCamNang(id) {
    if (!confirm("Bạn có chắc muốn xóa tài liệu này?")) return;

    const danhSach = layDanhSachCamNang().filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "bbb11_manual",
        JSON.stringify(danhSach)
    );

    showPage("manual");
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
    return `
        <div class="page-box">
            <h2>KIỂM TRA TRẮC NGHIỆM BBB11</h2>

            <p>
                Hệ thống kiểm tra kiến thức dành cho
                cán bộ, chiến sĩ Đại đội 11.
            </p>

            <div class="list-item">
                <h3>THÊM CÂU HỎI</h3>

                <textarea id="quizQuestion"
                    placeholder="Nhập nội dung câu hỏi..."></textarea>

                <input id="quizA" placeholder="Đáp án A">
                <input id="quizB" placeholder="Đáp án B">
                <input id="quizC" placeholder="Đáp án C">
                <input id="quizD" placeholder="Đáp án D">

                <label>Chọn đáp án đúng:</label>

                <select id="quizCorrect">
                    <option value="A">Đáp án A</option>
                    <option value="B">Đáp án B</option>
                    <option value="C">Đáp án C</option>
                    <option value="D">Đáp án D</option>
                </select>

                <button class="action-button"
                    onclick="themCauHoiQuiz()">
                    THÊM CÂU HỎI
                </button>
            </div>

            <div class="list-item">
                <h3>NGÂN HÀNG CÂU HỎI</h3>
                <div id="quizQuestionList"></div>
            </div>

            <div class="list-item">
                <h3>BÀI KIỂM TRA</h3>

                <p id="quizCount"></p>

                <button class="action-button"
                    onclick="batDauQuiz()">
                    BẮT ĐẦU KIỂM TRA
                </button>

                <div id="quizExam"></div>
                <div id="quizResult"></div>
            </div>

            <div class="list-item">
                <h3>LỊCH SỬ KẾT QUẢ</h3>
                <div id="quizHistory"></div>
            </div>
        </div>
    `;
}

// LẤY NGÂN HÀNG CÂU HỎI
function layNganHangQuiz() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_quiz") || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// LƯU NGÂN HÀNG
function luuNganHangQuiz(data) {
    localStorage.setItem(
        "bbb11_quiz",
        JSON.stringify(data)
    );
}

// THÊM CÂU HỎI
function themCauHoiQuiz() {
    const question = document
        .getElementById("quizQuestion").value.trim();

    const answers = {
        A: document.getElementById("quizA").value.trim(),
        B: document.getElementById("quizB").value.trim(),
        C: document.getElementById("quizC").value.trim(),
        D: document.getElementById("quizD").value.trim()
    };

    const correct = document
        .getElementById("quizCorrect").value;

    if (!question || Object.values(answers).some(x => !x)) {
        alert("Vui lòng nhập đầy đủ câu hỏi và 4 đáp án!");
        return;
    }

    const danhSach = layNganHangQuiz();

    danhSach.push({
        id: Date.now().toString(),
        question,
        answers,
        correct
    });

    luuNganHangQuiz(danhSach);

    alert("Đã thêm câu hỏi!");

    showPage("quiz");
}

// HIỂN THỊ NGÂN HÀNG
function hienThiNganHangQuiz() {
    const khung = document.getElementById("quizQuestionList");

    if (!khung) return;

    const danhSach = layNganHangQuiz();

    document.getElementById("quizCount").textContent =
        "Tổng số câu hỏi: " + danhSach.length;

    if (!danhSach.length) {
        khung.innerHTML = "<p>Chưa có câu hỏi.</p>";
        return;
    }

    khung.innerHTML = danhSach.map((item, index) => `
        <div class="list-item">
            <strong>Câu ${index + 1}: 
                ${escapeHTML(item.question)}
            </strong>

            <p>A. ${escapeHTML(item.answers.A)}</p>
            <p>B. ${escapeHTML(item.answers.B)}</p>
            <p>C. ${escapeHTML(item.answers.C)}</p>
            <p>D. ${escapeHTML(item.answers.D)}</p>

            <button class="btn-delete"
                onclick="xoaCauHoiQuiz('${item.id}')">
                XÓA CÂU HỎI
            </button>
        </div>
    `).join("");
}

// XÓA CÂU HỎI
function xoaCauHoiQuiz(id) {
    if (!confirm("Bạn có chắc muốn xóa câu hỏi này?")) return;

    const danhSach = layNganHangQuiz().filter(
        item => item.id !== id
    );

    luuNganHangQuiz(danhSach);

    showPage("quiz");
}

// BẮT ĐẦU KIỂM TRA
function batDauQuiz() {
    const danhSach = layNganHangQuiz();

    if (!danhSach.length) {
        alert("Bạn cần thêm câu hỏi trước khi kiểm tra!");
        return;
    }

    const cauHoi = [...danhSach]
        .sort(() => Math.random() - 0.5);

    const khung = document.getElementById("quizExam");
    const ketQua = document.getElementById("quizResult");

    ketQua.innerHTML = "";

    khung.innerHTML = `
        <h3>BÀI KIỂM TRA KIẾN THỨC</h3>

        <form id="quizForm">
            ${cauHoi.map((item, index) => `
                <div class="question">
                    <strong>
                        Câu ${index + 1}:
                        ${escapeHTML(item.question)}
                    </strong>

                    ${["A","B","C","D"].map(key => `
                        <label>
                            <input type="radio"
                                name="answer_${index}"
                                value="${key}"
                                required>
                            ${key}. ${escapeHTML(item.answers[key])}
                        </label>
                    `).join("")}
                </div>
            `).join("")}

            <button type="submit" class="action-button">
                NỘP BÀI VÀ CHẤM ĐIỂM
            </button>
        </form>
    `;

    document.getElementById("quizForm")
        .addEventListener("submit", function(event) {
            event.preventDefault();

            chamDiemQuiz(cauHoi);
        });
}

// CHẤM ĐIỂM
function chamDiemQuiz(cauHoi) {
    const form = document.getElementById("quizForm");

    if (!form || form.dataset.submitted === "true") return;

    const data = new FormData(form);

    let dung = 0;

    cauHoi.forEach((item, index) => {
        if (data.get("answer_" + index) === item.correct) {
            dung++;
        }
    });

    const tong = cauHoi.length;
    const diem = Number((dung / tong * 10).toFixed(2));

    form.dataset.submitted = "true";

    form.querySelectorAll("input, button").forEach(el => {
        el.disabled = true;
    });

    const ketQua = document.getElementById("quizResult");

    ketQua.innerHTML = `
        <div class="result">
            <h3>KẾT QUẢ KIỂM TRA</h3>
            <p>Số câu đúng: ${dung}/${tong}</p>
            <p>Số câu sai: ${tong - dung}</p>
            <p>Điểm số: ${diem}/10</p>
            <p>
                ${diem >= 8 ? "Hoàn thành tốt!" :
                  diem >= 5 ? "Đã hoàn thành bài kiểm tra." :
                  "Cần tiếp tục ôn tập!"}
            </p>
        </div>
    `;

    luuLichSuQuiz({
        id: Date.now().toString(),
        dung,
        tong,
        diem,
        ngay: new Date().toLocaleString("vi-VN")
    });

    hienThiLichSuQuiz();
}

// LƯU LỊCH SỬ
function luuLichSuQuiz(item) {
    let history = [];

    try {
        history = JSON.parse(
            localStorage.getItem("bbb11_quiz_history") || "[]"
        );

        if (!Array.isArray(history)) history = [];
    } catch {
        history = [];
    }

    history.unshift(item);

    localStorage.setItem(
        "bbb11_quiz_history",
        JSON.stringify(history)
    );
}

// HIỂN THỊ LỊCH SỬ
function hienThiLichSuQuiz() {
    const khung = document.getElementById("quizHistory");

    if (!khung) return;

    let history = [];

    try {
        history = JSON.parse(
            localStorage.getItem("bbb11_quiz_history") || "[]"
        );

        if (!Array.isArray(history)) history = [];
    } catch {
        history = [];
    }

    if (!history.length) {
        khung.innerHTML = "<p>Chưa có kết quả kiểm tra.</p>";
        return;
    }

    khung.innerHTML = history.map(item => `
        <div class="list-item">
            <p>Ngày kiểm tra: ${escapeHTML(item.ngay)}</p>
            <p>Số câu đúng: ${item.dung}/${item.tong}</p>
            <p>Điểm: ${item.diem}/10</p>
        </div>
    `).join("");
}




function educationPage() {
    return `
        <div class="page-box">
            <h2>GIÁO DỤC CHÍNH TRỊ</h2>

            <p>
                Hệ thống tài liệu, nội dung học tập và giáo dục
                chính trị dành cho cán bộ, chiến sĩ Đại đội 11.
            </p>

            <div class="list-item">
                <h3>THÊM NỘI DUNG GIÁO DỤC</h3>

                <input id="educationTitle"
                    placeholder="Tên bài học">

                <select id="educationCategory">
                    <option value="Giáo dục chính trị">
                        Giáo dục chính trị
                    </option>
                    <option value="Pháp luật">
                        Pháp luật
                    </option>
                    <option value="Truyền thống quân đội">
                        Truyền thống quân đội
                    </option>
                    <option value="Đạo đức, lối sống">
                        Đạo đức, lối sống
                    </option>
                    <option value="Tài liệu khác">
                        Tài liệu khác
                    </option>
                </select>

                <textarea id="educationContent"
                    placeholder="Nhập nội dung bài học..."></textarea>

                <input id="educationUrl"
                    type="url"
                    placeholder="Link tài liệu PDF hoặc website (không bắt buộc)">

                <button class="action-button"
                    onclick="themBaiHocChinhTri()">
                    THÊM BÀI HỌC
                </button>
            </div>

            <div class="list-item">
                <h3>TÌM KIẾM BÀI HỌC</h3>

                <input id="educationSearch"
                    placeholder="Nhập tên bài học..."
                    oninput="hienThiBaiHocChinhTri()">
            </div>

            <h3>DANH SÁCH BÀI HỌC</h3>

            <div id="educationList">
                Đang tải dữ liệu...
            </div>
        </div>
    `;
}

// LẤY DANH SÁCH BÀI HỌC
function layDanhSachBaiHoc() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_education") || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// KIỂM TRA LINK
function kiemTraLinkEducation(url) {
    if (!url) return true;

    try {
        const parsed = new URL(url);

        return ["https:", "http:"].includes(parsed.protocol);
    } catch {
        return false;
    }
}

// THÊM BÀI HỌC
function themBaiHocChinhTri() {
    const title = document
        .getElementById("educationTitle").value.trim();

    const category = document
        .getElementById("educationCategory").value;

    const content = document
        .getElementById("educationContent").value.trim();

    const url = document
        .getElementById("educationUrl").value.trim();

    if (!title || !content) {
        alert("Vui lòng nhập tên và nội dung bài học!");
        return;
    }

    if (!kiemTraLinkEducation(url)) {
        alert("Đường link không hợp lệ!");
        return;
    }

    const danhSach = layDanhSachBaiHoc();

    danhSach.push({
        id: Date.now().toString(),
        title,
        category,
        content,
        url,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem(
        "bbb11_education",
        JSON.stringify(danhSach)
    );

    alert("Đã thêm bài học thành công!");

    showPage("education");
}

// HIỂN THỊ BÀI HỌC
function hienThiBaiHocChinhTri() {
    const khung = document.getElementById("educationList");

    if (!khung) return;

    const keyword = (
        document.getElementById("educationSearch")?.value || ""
    ).toLowerCase().trim();

    const danhSach = layDanhSachBaiHoc().filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword)
    );

    if (!danhSach.length) {
        khung.innerHTML = "<p>Chưa có bài học phù hợp.</p>";
        return;
    }

    khung.innerHTML = danhSach.map(item => `
        <div class="list-item">
            <h3>${escapeHTML(item.title)}</h3>

            <p>
                <strong>Chuyên mục:</strong>
                ${escapeHTML(item.category)}
            </p>

            <p>${escapeHTML(item.content)}</p>

            ${item.url ? `
                <p>
                    <a href="${escapeHTML(item.url)}"
                       target="_blank"
                       rel="noopener noreferrer">
                        MỞ TÀI LIỆU THAM KHẢO
                    </a>
                </p>
            ` : ""}

            <button class="btn-delete"
                onclick="xoaBaiHocChinhTri('${item.id}')">
                XÓA BÀI HỌC
            </button>
        </div>
    `).join("");
}

// XÓA BÀI HỌC
function xoaBaiHocChinhTri(id) {
    if (!confirm("Bạn có chắc muốn xóa bài học này?")) return;

    const danhSach = layDanhSachBaiHoc().filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "bbb11_education",
        JSON.stringify(danhSach)
    );

    showPage("education");
}




function bacPage() {
    return `
        <div class="page-box">
            <h2>LỜI BÁC HỒ DẠY</h2>

            <p>
                Học tập và làm theo tư tưởng, đạo đức,
                phong cách Hồ Chí Minh.
            </p>

            <div class="list-item">
                <h3>THÊM LỜI BÁC HỒ DẠY</h3>

                <input id="bacTitle"
                    placeholder="Tên chủ đề">

                <textarea id="bacContent"
                    placeholder="Nhập nội dung lời dạy..."></textarea>

                <input id="bacSource"
                    placeholder="Nguồn tài liệu (không bắt buộc)">

                <button class="action-button"
                    onclick="themLoiBac()">
                    THÊM NỘI DUNG
                </button>
            </div>

            <div class="list-item">
                <h3>TÌM KIẾM</h3>

                <input id="bacSearch"
                    placeholder="Nhập từ khóa..."
                    oninput="hienThiLoiBac()">
            </div>

            <h3>DANH SÁCH NỘI DUNG</h3>

            <div id="bacList">
                Đang tải dữ liệu...
            </div>
        </div>
    `;
}

// LẤY DỮ LIỆU
function layDanhSachLoiBac() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_bac") || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// THÊM NỘI DUNG
function themLoiBac() {
    const title = document
        .getElementById("bacTitle").value.trim();

    const content = document
        .getElementById("bacContent").value.trim();

    const source = document
        .getElementById("bacSource").value.trim();

    if (!title || !content) {
        alert("Vui lòng nhập chủ đề và nội dung!");
        return;
    }

    const danhSach = layDanhSachLoiBac();

    danhSach.push({
        id: Date.now().toString(),
        title,
        content,
        source,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem(
        "bbb11_bac",
        JSON.stringify(danhSach)
    );

    alert("Đã thêm nội dung thành công!");

    showPage("bac");
}

// HIỂN THỊ DANH SÁCH
function hienThiLoiBac() {
    const khung = document.getElementById("bacList");

    if (!khung) return;

    const keyword = (
        document.getElementById("bacSearch")?.value || ""
    ).toLowerCase().trim();

    const danhSach = layDanhSachLoiBac().filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.content.toLowerCase().includes(keyword)
    );

    if (!danhSach.length) {
        khung.innerHTML = "<p>Chưa có nội dung phù hợp.</p>";
        return;
    }

    khung.innerHTML = danhSach.map(item => `
        <div class="list-item">
            <h3>${escapeHTML(item.title)}</h3>

            <p>${escapeHTML(item.content)}</p>

            ${item.source ? `
                <p>
                    <strong>Nguồn:</strong>
                    ${escapeHTML(item.source)}
                </p>
            ` : ""}

            <button class="btn-delete"
                onclick="xoaLoiBac('${item.id}')">
                XÓA
            </button>
        </div>
    `).join("");
}

// XÓA NỘI DUNG
function xoaLoiBac(id) {
    if (!confirm("Bạn có chắc muốn xóa nội dung này?")) {
        return;
    }

    const danhSach = layDanhSachLoiBac().filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "bbb11_bac",
        JSON.stringify(danhSach)
    );

    showPage("bac");
}




function questionPage() {
    return `
        <div class="page-box">
            <h2>MỖI TUẦN MỘT CÂU HỎI</h2>

            <p>
                Chương trình tìm hiểu kiến thức hằng tuần
                dành cho cán bộ, chiến sĩ Đại đội 11.
            </p>

            <div class="list-item">
                <h3>ĐĂNG CÂU HỎI MỚI</h3>

                <input id="weeklyTitle"
                    placeholder="Chủ đề câu hỏi">

                <textarea id="weeklyQuestion"
                    placeholder="Nhập nội dung câu hỏi..."></textarea>

                <input id="weeklyA" placeholder="Đáp án A">
                <input id="weeklyB" placeholder="Đáp án B">
                <input id="weeklyC" placeholder="Đáp án C">
                <input id="weeklyD" placeholder="Đáp án D">

                <label>Đáp án chính xác:</label>

                <select id="weeklyCorrect">
                    <option value="A">Đáp án A</option>
                    <option value="B">Đáp án B</option>
                    <option value="C">Đáp án C</option>
                    <option value="D">Đáp án D</option>
                </select>

                <label>Ngày bắt đầu:</label>
                <input type="date" id="weeklyStart">

                <label>Ngày kết thúc:</label>
                <input type="date" id="weeklyEnd">

                <button class="action-button"
                    onclick="themCauHoiTuan()">
                    ĐĂNG CÂU HỎI
                </button>
            </div>

            <div class="list-item">
                <h3>CÂU HỎI TUẦN NÀY</h3>
                <div id="weeklyActive"></div>
            </div>

            <div class="list-item">
                <h3>LỊCH SỬ CÂU HỎI</h3>
                <div id="weeklyHistory"></div>
            </div>

            <div class="list-item">
                <h3>LỊCH SỬ THAM GIA</h3>
                <div id="weeklyResults"></div>
            </div>
        </div>
    `;
}

// LẤY DANH SÁCH CÂU HỎI
function layCauHoiTuan() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_weekly") || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// THÊM CÂU HỎI
function themCauHoiTuan() {
    const title = document.getElementById("weeklyTitle").value.trim();
    const question = document.getElementById("weeklyQuestion").value.trim();

    const answers = {
        A: document.getElementById("weeklyA").value.trim(),
        B: document.getElementById("weeklyB").value.trim(),
        C: document.getElementById("weeklyC").value.trim(),
        D: document.getElementById("weeklyD").value.trim()
    };

    const correct = document.getElementById("weeklyCorrect").value;
    const start = document.getElementById("weeklyStart").value;
    const end = document.getElementById("weeklyEnd").value;

    if (!title || !question ||
        Object.values(answers).some(x => !x) ||
        !start || !end) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (end < start) {
        alert("Ngày kết thúc phải sau ngày bắt đầu!");
        return;
    }

    const danhSach = layCauHoiTuan();

    danhSach.push({
        id: Date.now().toString(),
        title,
        question,
        answers,
        correct,
        start,
        end,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem(
        "bbb11_weekly",
        JSON.stringify(danhSach)
    );

    alert("Đã đăng câu hỏi thành công!");

    showPage("question");
}

// LẤY LỊCH SỬ THAM GIA
function layKetQuaTuan() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_weekly_results") || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// HIỂN THỊ CÂU HỎI
function hienThiCauHoiTuan() {
    const active = document.getElementById("weeklyActive");
    const history = document.getElementById("weeklyHistory");
    const results = document.getElementById("weeklyResults");

    if (!active) return;

    const danhSach = layCauHoiTuan();

    const homNay = new Date().toLocaleDateString("en-CA");

    const dangMo = danhSach.filter(item =>
        item.start <= homNay && item.end >= homNay
    );

    const daKetThuc = danhSach.filter(item =>
        item.end < homNay
    );

    if (!dangMo.length) {
        active.innerHTML = "<p>Hiện chưa có câu hỏi đang áp dụng.</p>";
    } else {
        active.innerHTML = dangMo.map(item => {
            const daTraLoi = layKetQuaTuan().some(
                result => result.questionId === item.id
            );

            return `
                <div class="question">
                    <h3>${escapeHTML(item.title)}</h3>

                    <p>${escapeHTML(item.question)}</p>

                    <p>Thời gian:
                        ${escapeHTML(item.start)}
                        đến
                        ${escapeHTML(item.end)}
                    </p>

                    ${daTraLoi ? `
                        <p>Bạn đã tham gia câu hỏi này.</p>
                    ` : `
                        ${["A","B","C","D"].map(key => `
                            <label>
                                <input type="radio"
                                    name="weekly_${item.id}"
                                    value="${key}">
                                ${key}. ${escapeHTML(item.answers[key])}
                            </label>
                        `).join("")}

                        <button class="action-button"
                            onclick="traLoiCauHoiTuan('${item.id}')">
                            GỬI CÂU TRẢ LỜI
                        </button>
                    `}
                </div>
            `;
        }).join("");
    }

    if (history) {
        history.innerHTML = daKetThuc.length
            ? daKetThuc.map(item => `
                <div class="list-item">
                    <strong>${escapeHTML(item.title)}</strong>
                    <p>Đã kết thúc: ${escapeHTML(item.end)}</p>
                </div>
            `).join("")
            : "<p>Chưa có câu hỏi đã kết thúc.</p>";
    }

    if (results) {
        const ketQua = layKetQuaTuan();

        results.innerHTML = ketQua.length
            ? ketQua.map(item => `
                <div class="list-item">
                    <p>${escapeHTML(item.title)}</p>
                    <p>Đáp án đã chọn: ${escapeHTML(item.answer)}</p>
                    <p>Kết quả: ${item.correct ? "Đúng" : "Chưa đúng"}</p>
                </div>
            `).join("")
            : "<p>Chưa có lượt tham gia.</p>";
    }
}

// TRẢ LỜI CÂU HỎI
function traLoiCauHoiTuan(id) {
    const item = layCauHoiTuan().find(
        question => question.id === id
    );

    if (!item) {
        alert("Không tìm thấy câu hỏi!");
        return;
    }

    const homNay = new Date().toLocaleDateString("en-CA");

    if (homNay < item.start || homNay > item.end) {
        alert("Câu hỏi đã hết thời gian tham gia!");
        return;
    }

    const daTraLoi = layKetQuaTuan().some(
        result => result.questionId === id
    );

    if (daTraLoi) {
        alert("Bạn đã trả lời câu hỏi này!");
        return;
    }

    const selected = document.querySelector(
        `input[name="weekly_${id}"]:checked`
    );

    if (!selected) {
        alert("Vui lòng chọn một đáp án!");
        return;
    }

    const answer = selected.value;
    const dung = answer === item.correct;

    const ketQua = layKetQuaTuan();

    ketQua.push({
        id: Date.now().toString(),
        questionId: id,
        title: item.title,
        answer,
        correct: dung,
        ngay: new Date().toLocaleString("vi-VN")
    });

    localStorage.setItem(
        "bbb11_weekly_results",
        JSON.stringify(ketQua)
    );

    alert(dung ? "Chính xác! Bạn đã trả lời đúng." :
        "Chưa chính xác. Hãy tiếp tục cố gắng!");

    showPage("question");
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
