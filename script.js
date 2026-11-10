
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
        gallery: galleryPage,
        education: educationPage,
        bac: bacPage,
        question: questionPage,
        score: scorePage,
        ranking: rankingPage
    };
    if (page === "music") {
    hienThiKhoNhac();
}
if (page === "activities") {
    hienThiHoatDong();
}
if (page === "admin") {
    capNhatBangDieuKhien();
}
if (page === "reports") {
    const input = document.getElementById("reportMonth");

    if (input) {
        input.value = new Date().toISOString().slice(0, 7);
    }

    capNhatBaoCao();
}
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

if (page === "gallery") {
    loadGallery();
}
    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeButton = document.querySelector(
        `.menu-btn[onclick="showPage('${page}')"]`
    );

    activeButton?.classList.add("active");

    if (page === "accounts")   hienThiTaiKhoan();
    if (page === "attendance") hienThiDiemDanh();
    if (page === "activities") hienThiHoatDong();
    if (page === "score")      hienThiDiemThiDua();
    if (page === "ranking")    hienThiNganHangQuiz();
    if (page === "ranking")    hienThiLichSuQuiz();
    if (page === "ranking")    hienThiBangXepHang();
    if (page === "ranking")    hienThiBangXepHang();
    if (page === "question")   hienThiCauHoiTuan();
    if (page === "attendance") {
    const dateInput = document.getElementById("attendanceDate");

    if (dateInput) {
        dateInput.value = new Date().toLocaleDateString("en-CA");
    }

    taiDanhSachDiemDanh();
    hienThiThongKeDiemDanh();
    hienThiLichSuDiemDanh();
}
    
}
    if (page === "quiz") {
    
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
    return `
        <div class="page-box">

            <h2>BẢNG ĐIỀU KHIỂN QUẢN TRỊ BBB11</h2>

            <p>Tổng quan tình hình quản lý Đại đội 11.</p>

            <div class="stats-grid">

                <div class="stat-card">
                    <i class="fa-solid fa-users"></i>
                    <h3 id="adminMembers">0</h3>
                    <p>Tổng thành viên</p>
                </div>

                <div class="stat-card">
                    <i class="fa-solid fa-calendar-check"></i>
                    <h3 id="adminPresent">0</h3>
                    <p>Có mặt hôm nay</p>
                </div>

                <div class="stat-card">
                    <i class="fa-solid fa-calendar-days"></i>
                    <h3 id="adminActivities">0</h3>
                    <p>Tổng hoạt động</p>
                </div>

                <div class="stat-card">
                    <i class="fa-solid fa-music"></i>
                    <h3 id="adminMusic">0</h3>
                    <p>Bài hát</p>
                </div>

                <div class="stat-card">
                    <i class="fa-solid fa-book"></i>
                    <h3 id="adminQuestions">0</h3>
                    <p>Câu hỏi tuần</p>
                </div>

                <div class="stat-card">
                    <i class="fa-solid fa-trophy"></i>
                    <h3 id="adminScores">0</h3>
                    <p>Lượt chấm thi đua</p>
                </div>

            </div>

            <h3>THÔNG TIN HỆ THỐNG</h3>

            <div class="notice-card">
                <p>Hệ thống: BBB11 - ĐẠI ĐỘI 11</p>
                <p>Trạng thái: Đang hoạt động</p>
                <p id="adminDate"></p>
            </div>

            <button class="action-button"
                onclick="capNhatBangDieuKhien()">
                LÀM MỚI THỐNG KÊ
            </button>

        </div>
    `;
}

// CẬP NHẬT THỐNG KÊ QUẢN TRỊ
function capNhatBangDieuKhien() {

    const members = docDuLieu("bbb11_thanhvien");
    const attendance = docDuLieu("bbb11_attendance");
    const activities = docDuLieu("bbb11_activities");
    const music = docDuLieu("bbb11_music");
    const questions = docDuLieu("bbb11_questions");
    const scores = docDuLieu("bbb11_scores");

    const today = new Date().toLocaleDateString("en-CA");

    const todayAttendance = attendance.filter(
        item => item.date === today
    );

    const present = todayAttendance.filter(
        item => item.status === "present"
    ).length;

    const setValue = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    };

    setValue("adminMembers", members.length);
    setValue("adminPresent", present);
    setValue("adminActivities", activities.length);
    setValue("adminMusic", music.length);
    setValue("adminQuestions", questions.length);
    setValue("adminScores", scores.length);

    setValue(
        "adminDate",
        "Ngày cập nhật: " + new Date().toLocaleDateString("vi-VN")
    );
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
    return `
        <div class="page-box">

            <h2>QUẢN LÝ ĐIỂM DANH BBB11</h2>

            <p>Theo dõi quân số và tình hình tham gia của Đại đội 11.</p>

            <div class="list-item">
                <h3>ĐIỂM DANH THÀNH VIÊN</h3>

                <label>Ngày điểm danh:</label>
                <input type="date" id="attendanceDate">

                <button class="action-button"
                    onclick="taiDanhSachDiemDanh()">
                    TẢI DANH SÁCH THÀNH VIÊN
                </button>

                <div id="attendanceMembers"></div>

                <button class="action-button"
                    onclick="luuDiemDanh()">
                    LƯU ĐIỂM DANH
                </button>
            </div>

            <h3>THỐNG KÊ QUÂN SỐ</h3>

            <div class="stats-grid">
                <div class="stat-card">
                    <h3 id="attTotal">0</h3>
                    <p>Tổng thành viên</p>
                </div>

                <div class="stat-card">
                    <h3 id="attPresent">0</h3>
                    <p>Có mặt</p>
                </div>

                <div class="stat-card">
                    <h3 id="attAbsent">0</h3>
                    <p>Vắng mặt</p>
                </div>

                <div class="stat-card">
                    <h3 id="attLeave">0</h3>
                    <p>Nghỉ phép / công tác</p>
                </div>
            </div>

            <h3>LỊCH SỬ ĐIỂM DANH</h3>

            <input type="date"
                id="attendanceHistoryDate"
                onchange="hienThiLichSuDiemDanh()">

            <div id="attendanceHistory"></div>

        </div>
    `;
}

// LẤY DANH SÁCH THÀNH VIÊN
function layThanhVienDiemDanh() {
    return docDuLieu("bbb11_thanhvien");
}

// LẤY DỮ LIỆU ĐIỂM DANH
function layDuLieuDiemDanh() {
    return docDuLieu("bbb11_attendance");
}

// TẢI DANH SÁCH
function taiDanhSachDiemDanh() {

    const khung = document.getElementById("attendanceMembers");
    const date = document.getElementById("attendanceDate").value;

    if (!date) {
        alert("Vui lòng chọn ngày điểm danh!");
        return;
    }

    const members = layThanhVienDiemDanh();

    if (!members.length) {
        khung.innerHTML = "<p>Chưa có thành viên. Hãy thêm thành viên trước.</p>";
        return;
    }

    const oldData = layDuLieuDiemDanh().filter(
        item => item.date === date
    );

    khung.innerHTML = members.map(member => {

        const old = oldData.find(
            item => item.code === member.maSo
        );

        return `
            <div class="list-item">

                <strong>${escapeHTML(member.hoTen)}</strong>

                <p>Mã số: ${escapeHTML(member.maSo)}</p>

                <select class="attendance-status"
                    data-code="${escapeHTML(member.maSo)}"
                    data-name="${escapeHTML(member.hoTen)}">

                    <option value="present"
                        ${old?.status === "present" ? "selected" : ""}>
                        Có mặt
                    </option>

                    <option value="absent"
                        ${old?.status === "absent" ? "selected" : ""}>
                        Vắng mặt
                    </option>

                    <option value="leave"
                        ${old?.status === "leave" ? "selected" : ""}>
                        Nghỉ phép
                    </option>

                    <option value="duty"
                        ${old?.status === "duty" ? "selected" : ""}>
                        Đi công tác
                    </option>

                </select>

                <input class="attendance-note"
                    data-code="${escapeHTML(member.maSo)}"
                    placeholder="Lý do / ghi chú"
                    value="${escapeHTML(old?.note || "")}">

            </div>
        `;
    }).join("");
}

// LƯU ĐIỂM DANH
function luuDiemDanh() {

    const date = document.getElementById("attendanceDate").value;

    if (!date) {
        alert("Vui lòng chọn ngày!");
        return;
    }

    const statuses = document.querySelectorAll(
        ".attendance-status"
    );

    if (!statuses.length) {
        alert("Vui lòng tải danh sách thành viên trước!");
        return;
    }

    const danhSach = layDuLieuDiemDanh().filter(
        item => item.date !== date
    );

    statuses.forEach(select => {

        const code = select.dataset.code;

        const note = [...document.querySelectorAll(".attendance-note")]
            .find(input => input.dataset.code === code)?.value.trim() || "";

        danhSach.push({
            id: date + "_" + code,
            date,
            code,
            name: select.dataset.name,
            status: select.value,
            note,
            updatedAt: new Date().toISOString()
        });
    });

    localStorage.setItem(
        "bbb11_attendance",
        JSON.stringify(danhSach)
    );

    alert("Đã lưu điểm danh thành công!");

    hienThiThongKeDiemDanh();
    hienThiLichSuDiemDanh();
}

// THỐNG KÊ
function hienThiThongKeDiemDanh() {

    const date = document.getElementById("attendanceDate")?.value;

    if (!date) return;

    const members = layThanhVienDiemDanh();

    const records = layDuLieuDiemDanh().filter(
        item => item.date === date
    );

    const count = status =>
        records.filter(item => item.status === status).length;

    document.getElementById("attTotal").textContent = members.length;

    document.getElementById("attPresent").textContent =
        count("present");

    document.getElementById("attAbsent").textContent =
        count("absent");

    document.getElementById("attLeave").textContent =
        count("leave") + count("duty");
}

// LỊCH SỬ
function hienThiLichSuDiemDanh() {

    const khung = document.getElementById("attendanceHistory");

    if (!khung) return;

    const date = document.getElementById(
        "attendanceHistoryDate"
    ).value;

    let records = layDuLieuDiemDanh();

    if (date) {
        records = records.filter(item => item.date === date);
    }

    records.sort((a, b) => b.date.localeCompare(a.date));

    khung.innerHTML = records.length
        ? records.map(item => `
            <div class="list-item">

                <strong>${escapeHTML(item.name)}</strong>

                <p>Mã số: ${escapeHTML(item.code)}</p>

                <p>Ngày: ${escapeHTML(item.date)}</p>

                <p>Trạng thái:
                    ${({
                        present: "Có mặt",
                        absent: "Vắng mặt",
                        leave: "Nghỉ phép",
                        duty: "Đi công tác"
                    })[item.status] || "Chưa xác định"}
                </p>

                <p>Ghi chú: ${escapeHTML(item.note)}</p>

            </div>
        `).join("")
        : "<p>Chưa có lịch sử điểm danh.</p>";
}



function activitiesPage() {
    return `
        <div class="page-box">

            <h2>QUẢN LÝ HOẠT ĐỘNG BBB11</h2>

            <p>
                Quản lý kế hoạch, lịch sinh hoạt,
                học tập và hoạt động của Đại đội 11.
            </p>

            <div class="notice-card">
                <h3>THÔNG TIN HOẠT ĐỘNG</h3>
                <p>Theo dõi và quản lý các hoạt động của đơn vị.</p>
            </div>

            <h3>THÊM HOẠT ĐỘNG MỚI</h3>

            <div class="list-item">

                <input id="actName"
                    placeholder="Tên hoạt động">

                <select id="actCategory">
                    <option value="Học tập">Học tập</option>
                    <option value="Huấn luyện">Huấn luyện</option>
                    <option value="Sinh hoạt">Sinh hoạt</option>
                    <option value="Thi đua">Thi đua</option>
                    <option value="Công tác">Công tác</option>
                    <option value="Khác">Khác</option>
                </select>

                <label>Ngày tổ chức:</label>
                <input type="date" id="actDate">

                <label>Giờ tổ chức:</label>
                <input type="time" id="actTime">

                <input id="actLocation"
                    placeholder="Địa điểm tổ chức">

                <input id="actLeader"
                    placeholder="Người phụ trách">

                <textarea id="actDescription"
                    placeholder="Nội dung hoạt động"></textarea>

                <select id="actStatus">
                    <option value="Sắp diễn ra">Sắp diễn ra</option>
                    <option value="Đang thực hiện">Đang thực hiện</option>
                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                    <option value="Đã hủy">Đã hủy</option>
                </select>

                <button class="action-button"
                    onclick="themHoatDong()">
                    THÊM HOẠT ĐỘNG
                </button>

            </div>

            <h3>DANH SÁCH HOẠT ĐỘNG</h3>

            <input id="actSearch"
                placeholder="Tìm kiếm hoạt động..."
                oninput="hienThiHoatDong()">

            <select id="actFilter"
                onchange="hienThiHoatDong()">
                <option value="all">Tất cả hoạt động</option>
                <option value="Học tập">Học tập</option>
                <option value="Huấn luyện">Huấn luyện</option>
                <option value="Sinh hoạt">Sinh hoạt</option>
                <option value="Thi đua">Thi đua</option>
                <option value="Công tác">Công tác</option>
                <option value="Khác">Khác</option>
            </select>

            <div id="activityList"></div>

        </div>
    `;
}

// LẤY DỮ LIỆU
function layDanhSachHoatDong() {
    return docDuLieu("bbb11_activities");
}

// LƯU DỮ LIỆU
function luuDanhSachHoatDong(data) {
    luuDuLieu("bbb11_activities", data);
}

// THÊM HOẠT ĐỘNG
function themHoatDong() {

    const name = document.getElementById("actName").value.trim();
    const category = document.getElementById("actCategory").value;
    const date = document.getElementById("actDate").value;
    const time = document.getElementById("actTime").value;
    const location = document.getElementById("actLocation").value.trim();
    const leader = document.getElementById("actLeader").value.trim();
    const description = document.getElementById("actDescription").value.trim();
    const status = document.getElementById("actStatus").value;

    if (!name || !date) {
        alert("Vui lòng nhập tên và ngày hoạt động!");
        return;
    }

    const danhSach = layDanhSachHoatDong();

    danhSach.push({
        id: Date.now().toString(),
        name,
        category,
        date,
        time,
        location,
        leader,
        description,
        status,
        createdAt: new Date().toISOString()
    });

    luuDanhSachHoatDong(danhSach);

    alert("Đã thêm hoạt động thành công!");

    showPage("activities");
}

// HIỂN THỊ HOẠT ĐỘNG
function hienThiHoatDong() {

    const khung = document.getElementById("activityList");

    if (!khung) return;

    const keyword = (
        document.getElementById("actSearch")?.value || ""
    ).toLowerCase().trim();

    const category = document.getElementById("actFilter")?.value || "all";

    const danhSach = layDanhSachHoatDong()
        .filter(item => {

            const matchKeyword =
                String(item.name || "").toLowerCase().includes(keyword) ||
                String(item.location || "").toLowerCase().includes(keyword) ||
                String(item.leader || "").toLowerCase().includes(keyword);

            const matchCategory =
                category === "all" || item.category === category;

            return matchKeyword && matchCategory;
        })
        .sort((a, b) => {
            return (a.date || "").localeCompare(b.date || "");
        });

    if (!danhSach.length) {
        khung.innerHTML = "<p>Chưa có hoạt động phù hợp.</p>";
        return;
    }

    khung.innerHTML = danhSach.map(item => `

        <div class="list-item">

            <h3>${escapeHTML(item.name)}</h3>

            <p>Thể loại: ${escapeHTML(item.category)}</p>

            <p>Ngày: ${escapeHTML(item.date)}</p>

            <p>Giờ: ${escapeHTML(item.time || "Chưa xác định")}</p>

            <p>Địa điểm: ${escapeHTML(item.location || "Chưa cập nhật")}</p>

            <p>Người phụ trách: ${escapeHTML(item.leader || "Chưa cập nhật")}</p>

            <p>Nội dung: ${escapeHTML(item.description || "Không có")}</p>

            <p>Trạng thái:
                <strong>${escapeHTML(item.status)}</strong>
            </p>

            <button class="btn-edit"
                onclick="suaHoatDong('${item.id}')">
                SỬA
            </button>

            <button class="btn-delete"
                onclick="xoaHoatDong('${item.id}')">
                XÓA
            </button>

        </div>

    `).join("");
}

// SỬA HOẠT ĐỘNG
function suaHoatDong(id) {

    const danhSach = layDanhSachHoatDong();

    const item = danhSach.find(x => x.id === id);

    if (!item) return;

    const name = prompt("Tên hoạt động:", item.name);
    if (name === null) return;

    const date = prompt("Ngày tổ chức (YYYY-MM-DD):", item.date);
    if (date === null) return;

    const time = prompt("Giờ tổ chức:", item.time || "");
    if (time === null) return;

    const location = prompt("Địa điểm:", item.location || "");
    if (location === null) return;

    const leader = prompt("Người phụ trách:", item.leader || "");
    if (leader === null) return;

    if (!name.trim() || !date.trim()) {
        alert("Tên và ngày hoạt động không được để trống!");
        return;
    }

    item.name = name.trim();
    item.date = date.trim();
    item.time = time.trim();
    item.location = location.trim();
    item.leader = leader.trim();

    luuDanhSachHoatDong(danhSach);

    alert("Đã cập nhật hoạt động!");

    showPage("activities");
}

// XÓA HOẠT ĐỘNG
function xoaHoatDong(id) {

    if (!confirm("Bạn có chắc chắn muốn xóa hoạt động này?")) {
        return;
    }

    const danhSach = layDanhSachHoatDong().filter(
        item => item.id !== id
    );

    luuDanhSachHoatDong(danhSach);

    hienThiHoatDong();
}


function reportsPage() {
    return `
        <div class="page-box">

            <h2>BÁO CÁO THỐNG KÊ BBB11</h2>

            <p>Tổng hợp tình hình quản lý và hoạt động Đại đội 11.</p>

            <div class="list-item">
                <h3>THỜI GIAN BÁO CÁO</h3>

                <label>Chọn tháng:</label>
                <input type="month" id="reportMonth"
                    onchange="capNhatBaoCao()">

                <button class="action-button"
                    onclick="capNhatBaoCao()">
                    XEM BÁO CÁO
                </button>

                <button class="action-button"
                    onclick="xuatBaoCaoCSV()">
                    XUẤT BÁO CÁO EXCEL
                </button>
            </div>

            <h3>KẾT QUẢ THỐNG KÊ</h3>

            <div class="stats-grid">

                <div class="stat-card">
                    <h3 id="reportMembers">0</h3>
                    <p>Tổng thành viên</p>
                </div>

                <div class="stat-card">
                    <h3 id="reportActivities">0</h3>
                    <p>Hoạt động trong tháng</p>
                </div>

                <div class="stat-card">
                    <h3 id="reportPresent">0</h3>
                    <p>Lượt có mặt</p>
                </div>

                <div class="stat-card">
                    <h3 id="reportAbsent">0</h3>
                    <p>Lượt vắng mặt</p>
                </div>

                <div class="stat-card">
                    <h3 id="reportLeave">0</h3>
                    <p>Lượt nghỉ phép</p>
                </div>

                <div class="stat-card">
                    <h3 id="reportDuty">0</h3>
                    <p>Lượt đi công tác</p>
                </div>

            </div>

            <h3>CHI TIẾT ĐIỂM DANH</h3>

            <div id="reportAttendance"></div>

            <h3>HOẠT ĐỘNG TRONG THÁNG</h3>

            <div id="reportActivityList"></div>

        </div>
    `;
}

// CẬP NHẬT BÁO CÁO
function capNhatBaoCao() {

    const monthInput = document.getElementById("reportMonth");

    if (!monthInput) return;

    const month = monthInput.value;

    if (!month) return;

    const members = docDuLieu("bbb11_thanhvien");
    const attendance = docDuLieu("bbb11_attendance");
    const activities = docDuLieu("bbb11_activities");

    const records = attendance.filter(
        item => String(item.date || "").startsWith(month)
    );

    const monthlyActivities = activities.filter(
        item => String(item.date || "").startsWith(month)
    );

    const count = status =>
        records.filter(item => item.status === status).length;

    const setValue = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    };

    setValue("reportMembers", members.length);
    setValue("reportActivities", monthlyActivities.length);
    setValue("reportPresent", count("present"));
    setValue("reportAbsent", count("absent"));
    setValue("reportLeave", count("leave"));
    setValue("reportDuty", count("duty"));

    const attendanceBox =
        document.getElementById("reportAttendance");

    attendanceBox.innerHTML = records.length
        ? records.map(item => `
            <div class="list-item">
                <strong>${escapeHTML(item.name)}</strong>
                <p>Ngày: ${escapeHTML(item.date)}</p>
                <p>Mã số: ${escapeHTML(item.code)}</p>
                <p>Trạng thái: ${escapeHTML(item.status)}</p>
                <p>Ghi chú: ${escapeHTML(item.note || "")}</p>
            </div>
        `).join("")
        : "<p>Chưa có dữ liệu điểm danh trong tháng.</p>";

    const activityBox =
        document.getElementById("reportActivityList");

    activityBox.innerHTML = monthlyActivities.length
        ? monthlyActivities.map(item => `
            <div class="list-item">
                <h3>${escapeHTML(item.name)}</h3>
                <p>Ngày: ${escapeHTML(item.date)}</p>
                <p>Địa điểm: ${escapeHTML(item.location || "")}</p>
                <p>Trạng thái: ${escapeHTML(item.status || "")}</p>
            </div>
        `).join("")
        : "<p>Chưa có hoạt động trong tháng.</p>";
}

// XUẤT BÁO CÁO CSV
function xuatBaoCaoCSV() {

    const month = document.getElementById("reportMonth")?.value;

    if (!month) {
        alert("Vui lòng chọn tháng báo cáo!");
        return;
    }

    const records = docDuLieu("bbb11_attendance").filter(
        item => String(item.date || "").startsWith(month)
    );

    if (!records.length) {
        alert("Không có dữ liệu điểm danh để xuất!");
        return;
    }

    const rows = [
        ["Ngày", "Mã số", "Họ tên", "Trạng thái", "Ghi chú"],
        ...records.map(item => [
            item.date,
            item.code,
            item.name,
            item.status,
            item.note || ""
        ])
    ];

    const csv = "\uFEFF" + rows.map(row =>
        row.map(value =>
            '"' + String(value ?? "").replace(/"/g, '""') + '"'
        ).join(",")
    ).join("\r\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "BBB11_BaoCao_" + month + ".csv";

    link.click();

    URL.revokeObjectURL(url);
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
    return `
        <div class="page-box">

            <h2>🎵 KHO TÀNG ÂM NHẠC BBB11</h2>

            <p>
                Kho âm nhạc truyền thống, các ca khúc
                cách mạng và bài hát sinh hoạt tập thể.
            </p>

            <div class="notice-card">
                <h3>🎖️ ÂM NHẠC ĐẠI ĐỘI 11</h3>
                <p>
                    Âm nhạc góp phần xây dựng đời sống tinh thần,
                    đoàn kết và động viên cán bộ, chiến sĩ.
                </p>
            </div>

            <h3>THÊM BÀI HÁT</h3>

            <div class="list-item">

                <input id="musicTitle"
                    placeholder="Tên bài hát">

                <input id="musicArtist"
                    placeholder="Tên ca sĩ / nhạc sĩ">

                <select id="musicCategory">
                    <option value="Nhạc cách mạng">Nhạc cách mạng</option>
                    <option value="Nhạc truyền thống">Nhạc truyền thống</option>
                    <option value="Nhạc quân đội">Nhạc quân đội</option>
                    <option value="Nhạc sinh hoạt">Nhạc sinh hoạt</option>
                    <option value="Khác">Khác</option>
                </select>

                <input id="musicAudio"
                    placeholder="Đường dẫn file MP3">

                <input id="musicYoutube"
                    placeholder="Đường dẫn YouTube (nếu có)">

                <button class="action-button"
                    onclick="themBaiHat()">
                    THÊM BÀI HÁT
                </button>

            </div>

            <h3>DANH SÁCH ÂM NHẠC</h3>

            <input id="musicSearch"
                placeholder="Tìm kiếm bài hát..."
                oninput="hienThiKhoNhac()">

            <select id="musicFilter"
                onchange="hienThiKhoNhac()">
                <option value="all">Tất cả thể loại</option>
                <option value="Nhạc cách mạng">Nhạc cách mạng</option>
                <option value="Nhạc truyền thống">Nhạc truyền thống</option>
                <option value="Nhạc quân đội">Nhạc quân đội</option>
                <option value="Nhạc sinh hoạt">Nhạc sinh hoạt</option>
                <option value="Khác">Khác</option>
            </select>

            <div id="musicList"></div>

        </div>
    `;
}

// LẤY DANH SÁCH BÀI HÁT
function layDanhSachNhac() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_music") || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// LƯU DANH SÁCH
function luuDanhSachNhac(data) {
    localStorage.setItem(
        "bbb11_music",
        JSON.stringify(data)
    );
}

// THÊM BÀI HÁT
function themBaiHat() {

    const title = document.getElementById("musicTitle").value.trim();
    const artist = document.getElementById("musicArtist").value.trim();
    const category = document.getElementById("musicCategory").value;
    const audio = document.getElementById("musicAudio").value.trim();
    const youtube = document.getElementById("musicYoutube").value.trim();

    if (!title || (!audio && !youtube)) {
        alert("Vui lòng nhập tên bài hát và link MP3 hoặc YouTube!");
        return;
    }

    if (audio && !/^https?:\/\//i.test(audio)) {
        alert("Link MP3 phải bắt đầu bằng http:// hoặc https://");
        return;
    }

    if (youtube && !/^https?:\/\//i.test(youtube)) {
        alert("Link YouTube không hợp lệ!");
        return;
    }

    const danhSach = layDanhSachNhac();

    danhSach.push({
        id: Date.now().toString(),
        title,
        artist,
        category,
        audio,
        youtube,
        createdAt: new Date().toISOString()
    });

    luuDanhSachNhac(danhSach);

    alert("Đã thêm bài hát!");

    showPage("music");
}

// HIỂN THỊ KHO NHẠC
function hienThiKhoNhac() {

    const khung = document.getElementById("musicList");

    if (!khung) return;

    const keyword = (
        document.getElementById("musicSearch")?.value || ""
    ).toLowerCase().trim();

    const category = document.getElementById("musicFilter")?.value || "all";

    const danhSach = layDanhSachNhac().filter(item => {

        const matchKeyword =
            String(item.title).toLowerCase().includes(keyword) ||
            String(item.artist).toLowerCase().includes(keyword);

        const matchCategory =
            category === "all" || item.category === category;

        return matchKeyword && matchCategory;
    });

    if (!danhSach.length) {
        khung.innerHTML = "<p>Chưa có bài hát phù hợp.</p>";
        return;
    }

    khung.innerHTML = danhSach.map(item => `

        <div class="list-item">

            <h3>🎵 ${escapeHTML(item.title)}</h3>

            <p>Ca sĩ: ${escapeHTML(item.artist || "Chưa cập nhật")}</p>

            <p>Thể loại: ${escapeHTML(item.category)}</p>

            ${item.audio ? `
                <audio controls preload="none"
                    style="width:100%;margin:12px 0;">
                    <source src="${escapeHTML(item.audio)}">
                    Trình duyệt không hỗ trợ phát nhạc.
                </audio>
            ` : ""}

            ${item.youtube ? `
                <p>
                    <a href="${escapeHTML(item.youtube)}"
                       target="_blank"
                       rel="noopener noreferrer">
                        ▶ XEM VIDEO YOUTUBE
                    </a>
                </p>
            ` : ""}

            <button class="btn-delete"
                onclick="xoaBaiHat('${item.id}')">
                XÓA BÀI HÁT
            </button>

        </div>

    `).join("");
}

// XÓA BÀI HÁT
function xoaBaiHat(id) {

    if (!confirm("Bạn có chắc muốn xóa bài hát này?")) {
        return;
    }

    const danhSach = layDanhSachNhac().filter(
        item => item.id !== id
    );

    luuDanhSachNhac(danhSach);

    hienThiKhoNhac();
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
    return `
        <div class="page-box">
            <h2>CHẤM ĐIỂM THI ĐUA BBB11</h2>

            <p>
                Theo dõi, đánh giá kết quả rèn luyện
                và thi đua của cán bộ, chiến sĩ Đại đội 11.
            </p>

            <div class="list-item">
                <h3>NHẬP ĐIỂM THI ĐUA</h3>

                <input id="scoreName"
                    placeholder="Họ và tên thành viên">

                <input id="scoreCode"
                    placeholder="Mã số thành viên">

                <input id="scoreWeek"
                    type="week">

                <select id="scoreType">
                    <option value="plus">Điểm cộng</option>
                    <option value="minus">Điểm trừ</option>
                </select>

                <input id="scoreValue"
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    placeholder="Số điểm">

                <textarea id="scoreReason"
                    placeholder="Lý do cộng hoặc trừ điểm..."></textarea>

                <button class="action-button"
                    onclick="themDiemThiDua()">
                    LƯU KẾT QUẢ
                </button>
            </div>

            <div class="list-item">
                <h3>TÌM KIẾM THÀNH VIÊN</h3>

                <input id="scoreSearch"
                    placeholder="Nhập tên hoặc mã số..."
                    oninput="hienThiDiemThiDua()">
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fa-solid fa-users"></i>
                    <h3 id="scoreTotalMembers">0</h3>
                    <p>Thành viên</p>
                </div>

                <div class="stat-card">
                    <i class="fa-solid fa-plus"></i>
                    <h3 id="scoreTotalPlus">0</h3>
                    <p>Tổng điểm cộng</p>
                </div>

                <div class="stat-card">
                    <i class="fa-solid fa-minus"></i>
                    <h3 id="scoreTotalMinus">0</h3>
                    <p>Tổng điểm trừ</p>
                </div>

                <div class="stat-card">
                    <i class="fa-solid fa-chart-line"></i>
                    <h3 id="scoreTotalResult">0</h3>
                    <p>Điểm ròng</p>
                </div>
            </div>

            <h3>DANH SÁCH KẾT QUẢ THI ĐUA</h3>

            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Mã số</th>
                            <th>Điểm cộng</th>
                            <th>Điểm trừ</th>
                            <th>Điểm ròng</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>

                    <tbody id="scoreTableBody"></tbody>
                </table>
            </div>

            <h3>LỊCH SỬ CHẤM ĐIỂM</h3>

            <div id="scoreHistory"></div>
        </div>
    `;
}

// LẤY DỮ LIỆU
function layDuLieuDiem() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_scores") || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// LƯU DỮ LIỆU
function luuDuLieuDiem(data) {
    localStorage.setItem(
        "bbb11_scores",
        JSON.stringify(data)
    );
}

// THÊM ĐIỂM THI ĐUA
function themDiemThiDua() {
    const name = document
        .getElementById("scoreName").value.trim();

    const code = document
        .getElementById("scoreCode").value.trim();

    const week = document
        .getElementById("scoreWeek").value;

    const type = document
        .getElementById("scoreType").value;

    const value = Number(
        document.getElementById("scoreValue").value
    );

    const reason = document
        .getElementById("scoreReason").value.trim();

    if (!name || !code || !week || !reason) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (!Number.isFinite(value) || value <= 0 || value > 100) {
        alert("Số điểm phải lớn hơn 0 và không quá 100!");
        return;
    }

    const danhSach = layDuLieuDiem();

    danhSach.push({
        id: Date.now().toString(),
        name,
        code,
        week,
        type,
        value,
        reason,
        date: new Date().toLocaleString("vi-VN")
    });

    luuDuLieuDiem(danhSach);

    alert("Đã lưu điểm thi đua!");

    showPage("score");
}

// TÍNH ĐIỂM
function tinhTongDiem(danhSach) {
    const ketQua = {};

    danhSach.forEach(item => {
        if (!ketQua[item.code]) {
            ketQua[item.code] = {
                name: item.name,
                code: item.code,
                plus: 0,
                minus: 0
            };
        }

        if (item.type === "plus") {
            ketQua[item.code].plus += Number(item.value);
        } else {
            ketQua[item.code].minus += Number(item.value);
        }
    });

    return Object.values(ketQua).map(item => ({
        ...item,
        total: item.plus - item.minus
    }));
}

// HIỂN THỊ KẾT QUẢ
function hienThiDiemThiDua() {
    const tbody = document.getElementById("scoreTableBody");

    if (!tbody) return;

    const keyword = (
        document.getElementById("scoreSearch")?.value || ""
    ).toLowerCase().trim();

    const allScores = layDuLieuDiem();

    const members = tinhTongDiem(allScores);

    const filtered = members.filter(item =>
        item.name.toLowerCase().includes(keyword) ||
        item.code.toLowerCase().includes(keyword)
    );

    const plus = allScores
        .filter(item => item.type === "plus")
        .reduce((sum, item) => sum + Number(item.value), 0);

    const minus = allScores
        .filter(item => item.type === "minus")
        .reduce((sum, item) => sum + Number(item.value), 0);

    document.getElementById("scoreTotalMembers").textContent =
        members.length;

    document.getElementById("scoreTotalPlus").textContent =
        plus;

    document.getElementById("scoreTotalMinus").textContent =
        minus;

    document.getElementById("scoreTotalResult").textContent =
        plus - minus;

    tbody.innerHTML = filtered.length
        ? filtered.map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${escapeHTML(item.name)}</td>
                <td>${escapeHTML(item.code)}</td>
                <td>${item.plus}</td>
                <td>${item.minus}</td>
                <td><strong>${item.total}</strong></td>
                <td>
                    <button class="btn-edit"
                        onclick="xemLichSuDiem('${item.code}')">
                        XEM
                    </button>
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="7">Chưa có dữ liệu thi đua.</td></tr>`;

    hienThiLichSuDiem();
}

// XEM LỊCH SỬ
function xemLichSuDiem(code) {
    const danhSach = layDuLieuDiem().filter(
        item => item.code === code
    );

    const khung = document.getElementById("scoreHistory");

    if (!khung) return;

    khung.innerHTML = danhSach.map(item => `
        <div class="list-item">
            <h3>${escapeHTML(item.name)}</h3>

            <p>Tuần: ${escapeHTML(item.week)}</p>

            <p>
                Loại:
                ${item.type === "plus" ? "Điểm cộng" : "Điểm trừ"}
            </p>

            <p>Số điểm: ${item.value}</p>

            <p>Lý do: ${escapeHTML(item.reason)}</p>

            <p>Ngày ghi nhận: ${escapeHTML(item.date)}</p>

            <button class="btn-delete"
                onclick="xoaDiemThiDua('${item.id}')">
                XÓA
            </button>
        </div>
    `).join("");

    khung.scrollIntoView({ behavior: "smooth" });
}

// HIỂN THỊ LỊCH SỬ TẤT CẢ
function hienThiLichSuDiem() {
    const khung = document.getElementById("scoreHistory");

    if (!khung) return;

    const danhSach = layDuLieuDiem();

    if (!danhSach.length) {
        khung.innerHTML = "<p>Chưa có lịch sử chấm điểm.</p>";
        return;
    }

    khung.innerHTML = danhSach.slice().reverse().map(item => `
        <div class="list-item">
            <strong>${escapeHTML(item.name)}</strong>

            <p>Mã số: ${escapeHTML(item.code)}</p>
            <p>Tuần: ${escapeHTML(item.week)}</p>

            <p>
                ${item.type === "plus" ? "Điểm cộng" : "Điểm trừ"}:
                ${item.value}
            </p>

            <p>Lý do: ${escapeHTML(item.reason)}</p>
            <p>Ngày: ${escapeHTML(item.date)}</p>

            <button class="btn-delete"
                onclick="xoaDiemThiDua('${item.id}')">
                XÓA
            </button>
        </div>
    `).join("");
}

// XÓA ĐIỂM
function xoaDiemThiDua(id) {
    if (!confirm("Bạn có chắc muốn xóa bản ghi này?")) return;

    const danhSach = layDuLieuDiem().filter(
        item => item.id !== id
    );

    luuDuLieuDiem(danhSach);

    showPage("score");
}



function rankingPage() {
    return `
        <div class="page-box">

            <h2>🏆 BẢNG TIN THI ĐUA BBB11</h2>

            <p>
                Bảng tổng hợp thành tích thi đua
                của cán bộ, chiến sĩ Đại đội 11.
            </p>

            <div class="notice-card">
                <h3>THI ĐUA - KHEN THƯỞNG</h3>
                <p>
                    Đoàn kết, thi đua, quyết tâm hoàn thành
                    tốt mọi nhiệm vụ được giao.
                </p>
            </div>

            <div class="management-toolbar">

                <select id="rankingWeek"
                    onchange="hienThiBangXepHang()">
                    <option value="all">Tất cả các tuần</option>
                </select>

                <input id="rankingSearch"
                    placeholder="Tìm kiếm thành viên..."
                    oninput="hienThiBangXepHang()">

                <button class="action-button"
                    onclick="hienThiBangXepHang()">
                    LÀM MỚI
                </button>

            </div>

            <h3>🏅 TOP 3 THÀNH VIÊN XUẤT SẮC</h3>

            <div id="rankingTop"
                class="stats-grid">
            </div>

            <h3>📊 BẢNG XẾP HẠNG THI ĐUA</h3>

            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Hạng</th>
                            <th>Họ và tên</th>
                            <th>Mã số</th>
                            <th>Điểm cộng</th>
                            <th>Điểm trừ</th>
                            <th>Điểm ròng</th>
                        </tr>
                    </thead>

                    <tbody id="rankingTable">
                    </tbody>
                </table>
            </div>

            <div id="rankingSummary"
                class="notice-card">
            </div>

        </div>
    `;
}

// LẤY DỮ LIỆU ĐIỂM
function layDuLieuXepHang() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_scores") || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// TÍNH ĐIỂM XẾP HẠNG
function tinhXepHang(week = "all") {

    const danhSach = layDuLieuXepHang();

    const duLieu = week === "all"
        ? danhSach
        : danhSach.filter(item => item.week === week);

    const ketQua = {};

    duLieu.forEach(item => {

        if (!ketQua[item.code]) {
            ketQua[item.code] = {
                name: item.name,
                code: item.code,
                plus: 0,
                minus: 0
            };
        }

        if (item.type === "plus") {
            ketQua[item.code].plus += Number(item.value);
        } else {
            ketQua[item.code].minus += Number(item.value);
        }
    });

    return Object.values(ketQua)
        .map(item => ({
            ...item,
            total: item.plus - item.minus
        }))
        .sort((a, b) =>
            b.total - a.total ||
            a.name.localeCompare(b.name, "vi")
        );
}

// HIỂN THỊ BẢNG XẾP HẠNG
function hienThiBangXepHang() {

    const table = document.getElementById("rankingTable");
    const top = document.getElementById("rankingTop");
    const summary = document.getElementById("rankingSummary");

    if (!table || !top || !summary) return;

    const week = document.getElementById("rankingWeek")?.value || "all";

    const keyword = (
        document.getElementById("rankingSearch")?.value || ""
    ).toLowerCase().trim();

    const danhSach = tinhXepHang(week);

    const filtered = danhSach.filter(item =>
        item.name.toLowerCase().includes(keyword) ||
        item.code.toLowerCase().includes(keyword)
    );

    // TOP 3
    const medals = ["🥇", "🥈", "🥉"];

    const top3 = danhSach.slice(0, 3);

    top.innerHTML = top3.length
        ? top3.map((item, index) => `
            <div class="stat-card">
                <h3>${medals[index]} HẠNG ${index + 1}</h3>

                <h4>${escapeHTML(item.name)}</h4>

                <p>Mã số: ${escapeHTML(item.code)}</p>

                <h3>${item.total} điểm</h3>
            </div>
        `).join("")
        : "<p>Chưa có dữ liệu xếp hạng.</p>";

    // BẢNG XẾP HẠNG
    table.innerHTML = filtered.length
        ? filtered.map((item, index) => `
            <tr>
                <td>
                    <strong>${danhSach.indexOf(item) + 1}</strong>
                </td>

                <td>${escapeHTML(item.name)}</td>

                <td>${escapeHTML(item.code)}</td>

                <td>${item.plus}</td>

                <td>${item.minus}</td>

                <td>
                    <strong>${item.total}</strong>
                </td>
            </tr>
        `).join("")
        : `<tr>
            <td colspan="6">Chưa có dữ liệu phù hợp.</td>
        </tr>`;

    // TỔNG HỢP
    const tongDiem = danhSach.reduce(
        (sum, item) => sum + item.total, 0
    );

    summary.innerHTML = `
        <h3>THỐNG KÊ THI ĐUA</h3>

        <p>Tổng số thành viên: ${danhSach.length}</p>

        <p>Tổng điểm ròng: ${tongDiem}</p>

        <p>Thời gian thống kê:
            ${week === "all"
                ? "Tất cả các tuần"
                : escapeHTML(week)}
        </p>
    `;
}

// KHỞI TẠO BỘ LỌC TUẦN
function khoiTaoLocXepHang() {

    const select = document.getElementById("rankingWeek");

    if (!select) return;

    const danhSach = layDuLieuXepHang();

    const weeks = [...new Set(
        danhSach.map(item => item.week).filter(Boolean)
    )].sort().reverse();

    select.innerHTML = `
        <option value="all">Tất cả các tuần</option>
        ${weeks.map(week => `
            <option value="${escapeHTML(week)}">
                ${escapeHTML(week)}
            </option>
        `).join("")}
    `;

    hienThiBangXepHang();
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

function galleryPage() {
    return `
        <div class="page-box gallery-page">

            <h2>
                <i class="fa-solid fa-images"></i>
                THƯ VIỆN HÌNH ẢNH BBB11
            </h2>

            <p>
                Lưu giữ những hình ảnh, hoạt động và thành tích
                của Đại đội 11.
            </p>

            <div class="gallery-upload">

                <h3>ĐĂNG TẢI HÌNH ẢNH HOẠT ĐỘNG</h3>

                <label>Tên hoạt động</label>
                <input id="galleryTitle"
                    type="text"
                    placeholder="Ví dụ: Hoạt động thể thao Đại đội 11">

                <label>Ngày tổ chức</label>
                <input id="galleryDate" type="date">

                <label>Nội dung mô tả</label>
                <textarea id="galleryDescription"
                    placeholder="Nhập nội dung hoạt động..."></textarea>

                <label>Chọn hình ảnh</label>
                <input id="galleryFile"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onchange="previewGalleryImage()">

                <div id="galleryPreview"></div>

                <button class="action-button"
                    onclick="uploadGalleryImage()">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    TẢI ẢNH LÊN
                </button>

            </div>

            <h3 class="gallery-heading">
                HÌNH ẢNH HOẠT ĐỘNG ĐƠN VỊ
            </h3>

            <div id="galleryList" class="gallery-grid">
                <p>Đang tải hình ảnh...</p>
            </div>

        </div>
    `;
}


// XEM TRƯỚC HÌNH ẢNH
function previewGalleryImage() {

    const file = document.getElementById("galleryFile")?.files[0];
    const preview = document.getElementById("galleryPreview");

    if (!preview) return;

    if (!file) {
        preview.innerHTML = "";
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh!");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Ảnh không được vượt quá 5MB!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        preview.innerHTML = `
            <img src="${event.target.result}"
                alt="Ảnh xem trước"
                style="width:100%;max-width:350px;
                border-radius:10px;margin-top:15px;">
        `;
    };

    reader.readAsDataURL(file);
}


// TẢI ẢNH LÊN SUPABASE
async function uploadGalleryImage() {

    const title = document.getElementById("galleryTitle").value.trim();
    const date = document.getElementById("galleryDate").value;
    const description = document.getElementById("galleryDescription").value.trim();
    const file = document.getElementById("galleryFile").files[0];

    if (!title || !date || !file) {
        alert("Vui lòng nhập tên hoạt động, ngày và chọn ảnh!");
        return;
    }

    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
        alert("Chỉ chấp nhận ảnh JPG, PNG hoặc WEBP!");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Ảnh tối đa 5MB!");
        return;
    }

    if (typeof supabase === "undefined") {
        alert("Chưa kết nối Supabase!");
        return;
    }

    const button = document.querySelector(
        ".gallery-upload .action-button"
    );

    button.disabled = true;
    button.textContent = "ĐANG TẢI ẢNH...";

    try {
        const { data: authData, error: authError } =
            await supabaseClient.auth.getUser();

        if (authError || !authData.user) {
            throw new Error("Bạn cần đăng nhập để tải ảnh!");
        }

        const userId = authData.user.id;

        const extension = file.name.split(".").pop().toLowerCase();
        const filePath =
            userId + "/" + Date.now() + "." + extension;

        const { error: uploadError } =
            await supabaseClient.storage
                .from("bbb11-images")
                .upload(filePath, file, {
                    contentType: file.type,
                    upsert: false
                });

        if (uploadError) throw uploadError;

       const { error: insertError } =
    await supabaseClient
                .from("bbb11_gallery")
                .insert([{
                    title: title,
                    description: description,
                    activity_date: date,
                    image_path: filePath,
                    created_by: userId
                }]);

        if (insertError) {
            await supabaseClient.storage
                .from("bbb11-images")
                .remove([filePath]);

            throw insertError;
        }

        alert("Đăng tải hình ảnh thành công!");

        showPage("gallery");

    } catch (error) {
        console.error("Lỗi tải ảnh:", error);
        alert("Không thể tải ảnh: " + error.message);

    } finally {
        button.disabled = false;
        button.innerHTML =
            '<i class="fa-solid fa-cloud-arrow-up"></i> TẢI ẢNH LÊN';
    }
}


// HIỂN THỊ THƯ VIỆN
async function loadGallery() {

    const container = document.getElementById("galleryList");

    if (!container) return;

    try {
        const { data, error } = await supabaseClient
            .from("bbb11_gallery")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            container.innerHTML =
                "<p>Chưa có hình ảnh hoạt động nào.</p>";
            return;
        }

        const images = await Promise.all(
            data.map(async item => {

                const { data: imageData, error: imageError } =
                    await supabaseClient.storage
                        .from("bbb11-images")
                        .createSignedUrl(item.image_path, 3600);

                return {
                    ...item,
                    imageUrl: imageError ? "" : imageData.signedUrl
                };
            })
        );

        container.innerHTML = images.map(item => `
            <div class="gallery-card">

                ${
                    item.imageUrl
                    ? `<img src="${escapeHTML(item.imageUrl)}"
                        alt="${escapeHTML(item.title)}"
                        loading="lazy">`
                    : `<div class="gallery-no-image">
                        Không tải được ảnh
                       </div>`
                }

                <div class="gallery-info">

                    <h3>${escapeHTML(item.title)}</h3>

                    <p>
                        <i class="fa-solid fa-calendar"></i>
                        ${escapeHTML(item.activity_date || "")}
                    </p>

                    <p>${escapeHTML(item.description || "")}</p>

                    <button class="action-button"
                        onclick="viewGalleryImage('${escapeHTML(item.id)}')">
                        XEM ẢNH
                    </button>

                </div>

            </div>
        `).join("");

    } catch (error) {
        console.error(error);
        container.innerHTML =
            "<p>Không thể tải thư viện. Hãy kiểm tra kết nối Supabase và quyền truy cập.</p>";
    }
}


// XEM ẢNH LỚN
async function viewGalleryImage(id) {

    const { data, error } = await supabase
        .from("bbb11_gallery")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        alert("Không tìm thấy hình ảnh!");
        return;
    }

    const { data: imageData, error: imageError } =
        await supabaseClient.storage
            .from("bbb11-images")
            .createSignedUrl(data.image_path, 3600);

    if (imageError) {
        alert("Không thể mở hình ảnh!");
        return;
    }

    const content = document.getElementById("pageContent");

    content.innerHTML = `
        <div class="page-box">
            <button class="back-button"
                onclick="showPage('gallery')">
                <i class="fa-solid fa-arrow-left"></i>
                Quay lại thư viện
            </button>

            <h2>${escapeHTML(data.title)}</h2>

            <p>Ngày tổ chức: ${escapeHTML(data.activity_date || "")}</p>

            <img src="${escapeHTML(imageData.signedUrl)}"
                alt="${escapeHTML(data.title)}"
                style="width:100%;max-height:650px;
                object-fit:contain;border-radius:12px;">

            <p style="margin-top:15px;">
                ${escapeHTML(data.description || "")}
            </p>
        </div>
    `;
}
