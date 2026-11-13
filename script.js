// ======================================
// HÀM BẢO MẬT HIỂN THỊ HTML BBB11
// ======================================

window.escapeHTML = function(value) {
    return String(value ?? "").replace(/[&<>"']/g, function(char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[char];
    });
};

function escapeHTML(value) {
    return window.escapeHTML(value);
}

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

    // KIỂM TRA QUYỀN
    if (!bbb11CurrentUser || !bbb11CurrentRole) {
        alert("Vui lòng đăng nhập trước!");
        return;
    }

    if (
        ADMIN_PAGES.includes(page) &&
        bbb11CurrentRole !== "admin"
    ) {
        alert("Bạn không có quyền truy cập chức năng quản trị!");
        return;
    }

    const home = document.getElementById("homePage");
    const functionPage = document.getElementById("functionPage");
    const content = document.getElementById("pageContent");

    if (!home || !functionPage || !content) {
        alert("Không tìm thấy khu vực hiển thị!");
        return;
    }

    // DANH SÁCH CÁC TRANG
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
        quiz: quizPage,
        education: educationPage,
        bac: bacPage,
        question: questionPage,
        score: scorePage,
        ranking: rankingPage
    };
// KIỂM TRA VÀ HIỂN THỊ TRANG
if (typeof pages[page] !== "function") {
    content.innerHTML = "<h2>Chức năng chưa được xây dựng.</h2>";
} else {
    try {
       
        content.innerHTML = pages[page]();
        if (page === "bac") {
    hienThiLoiBac();
}
content.innerHTML = pages[page]();
home.classList.add("hidden");
functionPage.classList.remove("hidden");

if (page === "resolution") {
    hienThiTaiLieuNghiQuyet();
}

    } catch (error) {
        console.error("Lỗi tải trang:", error);

        content.innerHTML = `
            <div class="page-box">
                <h2>Lỗi tải chức năng</h2>
                <p>${escapeHTML(error.message)}</p>
            </div>
        `;
    }
}

home.classList.add("hidden");
functionPage.classList.remove("hidden");

    // HIỂN THỊ GIAO DIỆN
    home.classList.add("hidden");
    functionPage.classList.remove("hidden");

    // CẬP NHẬT CÁC CHỨC NĂNG
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

    if (page === "gallery") {
        loadGallery();
    }

    if (page === "resolution") {
        // Danh sách nghị quyết đã hiển thị trực tiếp
        // Không cần tìm kiếm hoặc thêm tài liệu.
    }

    if (page === "accounts") {
        hienThiTaiKhoan();
    }

    if (page === "attendance") {
        xuLyTrang("attendance");
    }

    if (page === "activities") {
        hienThiHoatDong();
    }

    if (page === "score") {
        hienThiDiemThiDua();
    }

    if (page === "ranking") {
        hienThiNganHangQuiz();
        hienThiLichSuQuiz();
        hienThiBangXepHang();
    }

    if (page === "question") {
        xuLyTrang("question");
 }
 };
// ======================================
// 6. ĐĂNG XUẤT
// ======================================


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
        <button
</button>
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

            <h2>📚 HỌC TẬP NGHỊ QUYẾT</h2>

            <div class="notice-card">
                <h3>📖 DANH SÁCH NGHỊ QUYẾT</h3>

                <p>
                    Nội dung tóm tắt phục vụ học tập.
                    Vui lòng mở nguồn tham khảo để đối chiếu
                    với văn bản chính thức.
                </p>
            </div>

            <div id="resolutionList"></div>

        </div>
    `;
}


function newsPage() {
    return `
        <div class="page-box">

            <h2>📰 TRANG ĐỌC BÁO ĐIỆN TỬ</h2>
            <p>Đọc báo trực tiếp trong phần mềm</p>

            <div class="news-tabs">

                <button class="action-button"
                    onclick="moBaoDienTu('nhandan')">
                    NHÂN DÂN
                </button>

                <button class="action-button"
                    onclick="moBaoDienTu('qdnd')">
                    QUÂN ĐỘI
                </button>

                <button class="action-button"
                    onclick="moBaoDienTu('cand')">
                    CÔNG AN
                </button>

                <button class="action-button"
                    onclick="moBaoDienTu('tuoitre')">
                    TUỔI TRẺ
                </button>

            </div>

            <div class="list-item">
                <h3 id="tenBaoDangDoc">
                    BÁO NHÂN DÂN
                </h3>

                <button class="action-button"
                    onclick="taiLaiBao()">
                    ↻ TẢI LẠI BÁO
                </button>

                <iframe
                    id="khungDocBao"
                    src="https://nhandan.vn/"
                    style="
                        width:100%;
                        height:750px;
                        border:1px solid #ccc;
                        border-radius:8px;
                        background:white;
                    "
                    loading="lazy"
                    referrerpolicy="no-referrer">
                </iframe>

                <p style="font-size:13px;color:#777">
                    Nếu báo không hiển thị do chính sách bảo mật
                    của trang báo, bạn có thể sử dụng nút
                    mở trang chính thức bên dưới.
                </p>

                <button class="action-button"
                    onclick="moTrangBaoNgoai()">
                    MỞ TRANG BÁO CHÍNH THỨC
                </button>
            </div>

            <h2>🎧 NGHE TIN VÀ PHÁT THANH</h2>

            <div class="list-item">
                <h3>Đài Tiếng nói Việt Nam - VOV</h3>

                <iframe
                    src="https://vov.vn/"
                    style="width:100%;height:500px;border:1px solid #ccc"
                    loading="lazy">
                </iframe>

                <a href="https://vov.vn/"
                   target="_blank"
                   rel="noopener noreferrer">
                    Truy cập VOV
                </a>
            </div>

        </div>
    `;
}


// DANH SÁCH BÁO ĐIỆN TỬ
const danhSachBaoDienTu = {
    nhandan: {
        ten: "BÁO NHÂN DÂN",
        url: "https://nhandan.vn/"
    },

    qdnd: {
        ten: "BÁO QUÂN ĐỘI NHÂN DÂN",
        url: "https://www.qdnd.vn/"
    },

    cand: {
        ten: "BÁO CÔNG AN NHÂN DÂN",
        url: "https://cand.com.vn/"
    },

    tuoitre: {
        ten: "BÁO TUỔI TRẺ",
        url: "https://tuoitre.vn/"
    }
};


// BÁO ĐANG ĐƯỢC CHỌN
let baoDangChon = "nhandan";


// CHUYỂN BÁO TRONG KHUNG ĐỌC
function moBaoDienTu(loai) {

    const bao = danhSachBaoDienTu[loai];

    if (!bao) return;

    baoDangChon = loai;

    const khung = document.getElementById("khungDocBao");
    const tieuDe = document.getElementById("tenBaoDangDoc");

    if (!khung || !tieuDe) return;

    tieuDe.innerText = bao.ten;

    khung.src = bao.url;
}


// TẢI LẠI BÁO
function taiLaiBao() {

    const bao = danhSachBaoDienTu[baoDangChon];

    const khung = document.getElementById("khungDocBao");

    if (!bao || !khung) return;

    khung.src = bao.url;
}


// MỞ TRANG BÁO CHÍNH THỨC
function moTrangBaoNgoai() {

    const bao = danhSachBaoDienTu[baoDangChon];

    if (!bao) return;

    window.open(
        bao.url,
        "_blank",
        "noopener,noreferrer"
    );
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

let danhSachBaiHocTuSupabase = [];

function educationPage() {
    return `
        <div class="page-box education-page">
            <h2>📚 GIÁO DỤC CHÍNH TRỊ BBB11</h2>
            <p>
                Kho bài học dành cho cán bộ, chiến sĩ Đại đội 11.
                Chọn từng bài để đọc nội dung trực tiếp.
            </p>

            <div class="notice-card">
                <h3>🎖️ MỤC ĐÍCH HỌC TẬP</h3>
                <p>
                    Nâng cao nhận thức, trách nhiệm, ý thức chấp hành
                    kỷ luật và tinh thần tự học, tự rèn luyện.
                </p>
            </div>
             
            <div id="educationList">
        
                ${taoDanhSachBaiHocChinhTri()}
            </div>
        </div>
    `;
}

window.educationPage = educationPage;

/* Mã hóa nội dung để tránh lỗi HTML */
function educationEscapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };
        return entities[char];
    });
}

/* Cập nhật danh sách bài học */
function capNhatDanhSachBaiHocChinhTri() {
    const khung = document.getElementById("educationList");

    if (!khung) {
        console.warn(
            "Chưa tìm thấy educationList. Hãy mở trang Giáo dục chính trị trước."
        );
        return;
    }

    const keyword =
        document.getElementById("educationSearch")?.value?.trim() || "";

    khung.innerHTML = taoDanhSachBaiHocChinhTri(keyword);
}

window.capNhatDanhSachBaiHocChinhTri =
    capNhatDanhSachBaiHocChinhTri;

/* Hiển thị bài học mẫu và bài học từ Supabase */

/* Hiển thị bài học mẫu và bài học từ Supabase */
function taoDanhSachBaiHocChinhTri(keyword = "") {
    const baiHocMau =
        Array.isArray(danhSachBaiHocChinhTriMacDinh)
            ? danhSachBaiHocChinhTriMacDinh
            : [];

    const baiHocSupabase =
        Array.isArray(danhSachBaiHocTuSupabase)
            ? danhSachBaiHocTuSupabase
            : [];

    const danhSach = [...baiHocMau, ...baiHocSupabase];

    const tuKhoa = String(keyword)
        .toLocaleLowerCase("vi")
        .trim();

    const ketQua = danhSach.filter(function (item) {
        const noiDung = [
            item.title,
            item.category,
            item.description,
            item.content
        ].join(" ").toLocaleLowerCase("vi");

        return !tuKhoa || noiDung.includes(tuKhoa);
    });

    if (ketQua.length === 0) {
        return tuKhoa
            ? "<p>Không tìm thấy bài học phù hợp.</p>"
            : "<p>Chưa có bài học nào.</p>";
    }

    return ketQua.map(function (item, index) {
        // Lấy đường dẫn tham khảo nếu bài học đã có URL.
        const urlThamKhao =
            item.reference_url ||
            item.referenceUrl ||
            item.source_url ||
            item.sourceUrl ||
            item.reference ||
            "";

        // Chỉ chấp nhận đường dẫn HTTP/HTTPS hợp lệ.
        let  = "https://www.qdnd.vn/quoc-phong-an-ninh/xay-dung-quan-doi/giao-duc-chinh-tri-di-vao-chieu-sau-hieu-qua-thiet-thuc-1049182";

        try {
            const url = new URL(
                urlThamKhao,
                window.location.origin
            );

            if (
                url.protocol === "https:" ||
                url.protocol === "http:"
            ) {
                linkThamKhao = url.href;
            }
        } catch (error) {
            linkThamKhao = "";
        }

        // Nếu chưa có URL, tìm tài liệu theo tiêu đề bài học.
        if (!linkThamKhao) {
            linkThamKhao =
                "https://www.google.com/search?q=" +
                encodeURIComponent(
                    (item.title || "Tài liệu giáo dục chính trị") +
                    " tài liệu tham khảo chính thống"
                );
        }

        return `
            <div class="list-item education-card">
                <h3>
                    ${index + 1}. 📘
                    ${educationEscapeHTML(
                        item.title || "Chưa có tiêu đề"
                    )}
                </h3>

                <p>
                    <strong>Chuyên mục:</strong>
                    ${educationEscapeHTML(
                        item.category || "Tài liệu khác"
                    )}
                </p>

                ${item.description ? `
                    <p>
                        <strong>Trích yếu:</strong>
                        ${educationEscapeHTML(item.description)}
                    </p>
                ` : ""}

                <details class="education-detail">
                    <summary>📖 XEM NỘI DUNG BÀI HỌC</summary>
                    <div class="education-content">
                        <pre>${educationEscapeHTML(
                            item.content || ""
                        )}</pre>
                    </div>
                </details>

                <div class="education-reference">
                    <a
                        class="btn-education-reference"
                        href="${educationEscapeHTML(linkThamKhao)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        🔗 Xem tài liệu tham khảo
                    </a>
                </div>
            </div>
        `;
    }).join("");
}

const danhSachBaiHocChinhTriMacDinh = [
    {
        id: "ct-bam-1",
        title: "Nâng cao bản lĩnh chính trị và trách nhiệm quân nhân",
        category: "Giáo dục chính trị",
        description: "Nội dung học tập, thảo luận và liên hệ thực tiễn.",
        // LINK TÀI LIỆU THAM KHẢO
        reference_url: "https://www.qdnd.vn/quoc-phong-an-ninh/xay-dung-quan-doi/giao-duc-chinh-tri-di-vao-chieu-sau-hieu-qua-thiet-thuc-1049182",
        content: `I. MỤC ĐÍCH, YÊU CẦU

Nâng cao nhận thức, ý thức trách nhiệm và tinh thần tự giác của cán bộ, chiến sĩ trong học tập, công tác và thực hiện nhiệm vụ.

II. NỘI DUNG HỌC TẬP

1. Chủ động học tập, nghiên cứu các nội dung giáo dục chính trị theo chương trình và tài liệu chính thống do đơn vị hướng dẫn.

2. Rèn luyện bản lĩnh, giữ vững tinh thần trách nhiệm, bình tĩnh xử lý khó khăn và chấp hành nghiêm quy định của đơn vị.

3. Phát huy đoàn kết nội bộ, tôn trọng, giúp đỡ đồng chí, đồng đội; tích cực khắc phục hạn chế của bản thân.

III. LIÊN HỆ THỰC TIỄN

Mỗi quân nhân xây dựng kế hoạch tự học, tự rèn luyện; gắn nội dung học tập với chức trách, nhiệm vụ được giao.

IV. CÂU HỎI ÔN TẬP

1. Vì sao cần nâng cao bản lĩnh chính trị và trách nhiệm quân nhân?
2. Mỗi cá nhân cần làm gì để nâng cao ý thức tự giác?
3. Liên hệ trách nhiệm của bản thân trong thực hiện nhiệm vụ.`,
        builtin: true
    },
    {
        id: "ct-bam-2",
        title: "Chấp hành pháp luật, kỷ luật và xây dựng nền nếp chính quy",
        category: "Pháp luật",
        description: "Nội dung khái quát phục vụ học tập và liên hệ thực tế.",
         reference_url: "https://vanban.chinhphu.vn/?classid=1&docid=180640&pageid=27160&typegroupid=3",
        content: `I. MỤC ĐÍCH

Nâng cao ý thức tự giác chấp hành pháp luật Nhà nước, kỷ luật Quân đội và quy định của đơn vị.

II. NỘI DUNG HỌC TẬP

1. Tìm hiểu và thực hiện đúng các quy định, điều lệnh, điều lệ có liên quan đến chức trách, nhiệm vụ.

2. Duy trì nền nếp ngày, tuần; thực hiện đúng lễ tiết, tác phong quân nhân; quản lý, bảo quản và sử dụng trang bị theo quy định.

3. Chủ động phòng ngừa vi phạm, bảo đảm an toàn trong huấn luyện, công tác và sinh hoạt.

III. LIÊN HỆ THỰC TIỄN

Mỗi quân nhân tự giác tu dưỡng, nghiêm túc tiếp thu góp ý, sửa chữa khuyết điểm và giúp đỡ đồng đội cùng tiến bộ.

IV. CÂU HỎI ÔN TẬP

1. Ý nghĩa của việc chấp hành pháp luật và kỷ luật là gì?
2. Nêu những việc cần làm để xây dựng nền nếp chính quy.
3. Bản thân cần làm gì để phòng ngừa vi phạm?`,
        builtin: true
    },
    {
        id: "ct-bam-3",
        title: "Phát huy truyền thống Quân đội nhân dân Việt Nam",
        category: "Truyền thống quân đội",
        description: "Bài học về truyền thống, trách nhiệm và hành động thiết thực.",
         reference_url: "https://vanban.chinhphu.vn/?classid=1&docid=180640&pageid=27160&typegroupid=3",
        content: `I. MỤC ĐÍCH

Bồi dưỡng niềm tự hào, ý thức giữ gìn và phát huy truyền thống Quân đội nhân dân Việt Nam.

II. NỘI DUNG HỌC TẬP

1. Quân đội nhân dân Việt Nam được thành lập ngày 22 tháng 12 năm 1944. Quá trình xây dựng, chiến đấu và trưởng thành gắn liền với sự nghiệp đấu tranh giành độc lập, bảo vệ Tổ quốc và phục vụ Nhân dân.

2. Phát huy tinh thần yêu nước, đoàn kết, kỷ luật, trách nhiệm; tích cực học tập, huấn luyện và hoàn thành nhiệm vụ được giao.

3. Giữ gìn truyền thống bằng hành động cụ thể: chấp hành điều lệnh, rèn luyện tác phong, bảo vệ tài sản chung và giúp đỡ đồng đội.

III. LIÊN HỆ THỰC TIỄN

Gắn việc học tập truyền thống với nhiệm vụ hằng ngày, góp phần xây dựng tập thể đoàn kết, chính quy và an toàn.

IV. CÂU HỎI ÔN TẬP

1. Quân đội nhân dân Việt Nam được thành lập ngày nào?
2. Nêu những việc làm thiết thực để phát huy truyền thống quân đội.
3. Liên hệ trách nhiệm của bản thân.`,
        builtin: true
    },
    {
        id: "ct-bam-4",
        title: "Đạo đức, lối sống và trách nhiệm khi sử dụng mạng xã hội",
        category: "Đạo đức, lối sống",
        description: "Xây dựng lối sống lành mạnh và sử dụng mạng xã hội có trách nhiệm.",
         reference_url: "https://vanban.chinhphu.vn/?classid=1&docid=180640&pageid=27160&typegroupid=3",
        content: `I. MỤC ĐÍCH

Nâng cao ý thức tu dưỡng đạo đức, xây dựng lối sống lành mạnh và sử dụng mạng xã hội có trách nhiệm.

II. NỘI DUNG HỌC TẬP

1. Sống trung thực, có trách nhiệm; tôn trọng đồng chí, đồng đội và chấp hành quy tắc ứng xử của đơn vị.

2. Kiểm tra nguồn tin trước khi chia sẻ; không phát tán thông tin sai lệch, nội dung vi phạm pháp luật hoặc thông tin thuộc phạm vi bí mật.

3. Thực hiện đúng quy định hiện hành của pháp luật và đơn vị khi sử dụng thiết bị, mạng xã hội và các dịch vụ trực tuyến.

III. LIÊN HỆ THỰC TIỄN

Tự giác điều chỉnh hành vi, xây dựng môi trường văn hóa lành mạnh và báo cáo người có trách nhiệm khi gặp tình huống đáng ngờ.

IV. CÂU HỎI ÔN TẬP

1. Vì sao cần có trách nhiệm khi sử dụng mạng xã hội?
2. Cần làm gì trước khi chia sẻ một thông tin?
3. Liên hệ việc rèn luyện đạo đức, lối sống của bản thân.`,
        builtin: true
    }
];

// ==========================================
// THƯ VIỆN LỜI BÁC HỒ DẠY BBB11
// ==========================================


const danhSachLoiBacBBB11 = [
    {
        title: "Quân đội ta trung với Đảng, hiếu với dân",
        content: "Quân đội nhân dân Việt Nam phải luôn tuyệt đối trung thành với Đảng, với Tổ quốc và nhân dân; sẵn sàng chiến đấu, hy sinh vì độc lập, tự do của Tổ quốc, vì hạnh phúc của nhân dân.",
        source: "Tư tưởng Hồ Chí Minh về Quân đội nhân dân Việt Nam"
    },
    {
        title: "Nhiệm vụ của quân đội",
        content: "Quân đội phải tích cực tham gia lao động sản xuất, góp phần xây dựng đất nước, đồng thời luôn sẵn sàng chiến đấu bảo vệ Tổ quốc.",
        source: "Tư tưởng Hồ Chí Minh về xây dựng Quân đội"
    },
    {
        title: "Đoàn kết là sức mạnh",
        content: "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.",
        source: "Hồ Chí Minh"
    },
    {
        title: "Cần, kiệm, liêm, chính, chí công vô tư",
        content: "Mỗi cán bộ, chiến sĩ cần thường xuyên rèn luyện đạo đức, lối sống trong sạch, giản dị, chống chủ nghĩa cá nhân.",
        source: "Tư tưởng Hồ Chí Minh"
    },
    {
        title: "Thi đua yêu nước",
        content: "Thi đua là yêu nước, yêu nước thì phải thi đua. Những người thi đua là những người yêu nước nhất.",
        source: "Lời kêu gọi thi đua ái quốc (1948)"
    },
    {
        title: "Học tập suốt đời",
        content: "Học hỏi là một việc phải tiếp tục suốt đời. Suốt đời phải gắn liền lý luận với công tác thực tế.",
        source: "Tư tưởng Hồ Chí Minh về học tập"
    },
    {
        title: "Giữ gìn kỷ luật",
        content: "Cán bộ, chiến sĩ phải nghiêm chỉnh chấp hành kỷ luật, giữ gìn đoàn kết, thống nhất trong đơn vị.",
        source: "Tư tưởng Hồ Chí Minh về xây dựng quân đội"
    },
    {
        title: "Đoàn kết quân dân",
        content: "Quân đội phải gắn bó mật thiết với nhân dân, tôn trọng và giúp đỡ nhân dân, bảo vệ nhân dân.",
        source: "Tư tưởng Hồ Chí Minh"
    },
    {
        title: "Rèn luyện đạo đức cách mạng",
        content: "Người cách mạng phải có đạo đức cách mạng làm nền tảng, phải thường xuyên tu dưỡng và rèn luyện.",
        source: "Tác phẩm Đạo đức cách mạng (1958)"
    },
    {
        title: "Tinh thần trách nhiệm",
        content: "Mỗi cán bộ, chiến sĩ cần nêu cao tinh thần trách nhiệm, tận tụy với công việc, hoàn thành tốt nhiệm vụ được giao.",
        source: "Tư tưởng Hồ Chí Minh"
    }
];

function bacPage() {
    return `
        <div class="page-box">
            <h2>☀️ LỜI BÁC HỒ DẠY</h2>
            <p>
                Học tập và làm theo tư tưởng, đạo đức,
                phong cách Hồ Chí Minh.
            </p>

            <div id="bacList">
                ${danhSachLoiBacBBB11.map((item, index) => `
                    <div class="list-item">
                        <h3>${index + 1}. ${escapeHTML(item.title)}</h3>
                        <p>${escapeHTML(item.content)}</p>
                        <small>
                            Nguồn: ${escapeHTML(item.source)}
                        </small>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}

// ==========================================
// HIỂN THỊ TẤT CẢ NỘI DUNG
// ==========================================

function hienThiLoiBac() {

    const khung = document.getElementById("bacList");

    if (!khung) return;

    khung.innerHTML = danhSachLoiBacBBB11.map((item, index) => `
        <div class="list-item">

            <h3>${index + 1}. ⭐ ${escapeHTML(item.title)}</h3>

            <p style="
                font-size:16px;
                line-height:1.8;
                white-space:pre-line;
            ">
                ${escapeHTML(item.content)}
            </p>

            <p>
                <strong>Nguồn tham khảo:</strong>
                ${escapeHTML(item.source)}
            </p>

        </div>
    `).join("");
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

// ======================================
// KIỂM TRA ĐĂNG NHẬP BBB11
// ======================================

window.kiemTraDangNhap = async function () {

    const loginPage = document.getElementById("loginPage");

    // Lấy ứng dụng chính, không lấy .app bên trong loginPage
    const app = document.querySelector("body > .app");

    if (!loginPage || !app) {
        console.error("Không tìm thấy giao diện đăng nhập hoặc ứng dụng!");
        return;
    }

    const daDangNhap =
        typeof bbb11CurrentUser !== "undefined" &&
        bbb11CurrentUser &&
        typeof bbb11CurrentRole !== "undefined" &&
        bbb11CurrentRole;

    if (daDangNhap) {
        loginPage.classList.add("hidden");
        app.classList.remove("hidden");
    } else {
        loginPage.classList.remove("hidden");
        app.classList.add("hidden");
    }
};


// ======================================
// KHỞI ĐỘNG BBB11
// ======================================

document.addEventListener("DOMContentLoaded", async function () {

    try {
        await window.kiemTraDangNhap();
    } catch (error) {
        console.error("Lỗi khởi động BBB11:", error);
    }

});
// ======================================
// HỌC TẬP NGHỊ QUYẾT BBB11
// ======================================

function resolutionPage() {

    const danhSachNghiQuyet = [
        {
            title: "Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIII của Đảng",
            category: "Văn kiện Đại hội Đảng",
            url: "https://tulieuvankien.dangcongsan.vn/"
        },
        {
            title: "Nghị quyết số 847-NQ/QUTW về phát huy phẩm chất Bộ đội Cụ Hồ",
            category: "Nghị quyết Quân ủy Trung ương",
            url: "https://www.qdnd.vn/"
        },
        {
            title: "Nghị quyết về nhiệm vụ quân sự, quốc phòng",
            category: "Quân sự - Quốc phòng",
            url: "https://mod.gov.vn/"
        },
        {
            title: "Văn kiện và nghị quyết của Đảng",
            category: "Tài liệu chính trị",
            url: "https://tulieuvankien.dangcongsan.vn/"
        },
        {
            title: "Tài liệu tuyên truyền, giáo dục chính trị trong Quân đội",
            category: "Giáo dục chính trị",
            url: "https://www.qdnd.vn/"
        }
    ];

    return `
        <div class="page-box">

            <h2>📚 HỌC TẬP NGHỊ QUYẾT BBB11</h2>

            <p>
                Kho tài liệu học tập nghị quyết,
                chỉ thị và văn kiện chính trị dành cho cán bộ,
                chiến sĩ Đại đội 11.
            </p>

            <div class="notice-card">
                <h3>🎖️ MỤC ĐÍCH HỌC TẬP</h3>
                <p>
                    Nâng cao nhận thức chính trị, tư tưởng,
                    trách nhiệm và ý thức chấp hành nhiệm vụ.
                </p>
            </div>

            <h3>📖 DANH SÁCH TÀI LIỆU</h3>

            <div id="resolutionList">

                ${danhSachNghiQuyet.map((item, index) => `
                    <div class="list-item">

                        <h3>
                            ${index + 1}. ${escapeHTML(item.title)}
                        </h3>

                        <p>
                            Phân loại:
                            ${escapeHTML(item.category)}
                        </p>

                        <a href="${item.url}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="action-button"
                           style="display:inline-block;text-decoration:none">

                            📖 XEM TÀI LIỆU

                        </a>

                    </div>
                `).join("")}

            </div>

        </div>
    `;
}

// =============================================
// KHO HỌC TẬP NGHỊ QUYẾT BBB11
// =============================================

const danhSachNghiQuyetBBB11 = [

    {
        title: "Nghị quyết 847-NQ/QUTW",
        date: "28/12/2021",
        agency: "Quân ủy Trung ương",
        description: "Phát huy phẩm chất cao đẹp Bộ đội Cụ Hồ, kiên quyết chống chủ nghĩa cá nhân trong tình hình mới.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Giữ gìn và phát huy phẩm chất Bộ đội Cụ Hồ.
        - Tuyệt đối trung thành với Đảng, Tổ quốc và Nhân dân.
        - Nêu cao tinh thần trách nhiệm trong thực hiện nhiệm vụ.
        - Kiên quyết đấu tranh chống chủ nghĩa cá nhân.
        - Xây dựng đoàn kết nội bộ, chấp hành nghiêm kỷ luật.
        - Tích cực tu dưỡng, rèn luyện đạo đức, lối sống.
        `,
        url: "https://btllang.mod.gov.vn/tin-tuc/tin-tong-hop/12143-toan-quan-quan-triet-va-thuc-hien-hieu-qua-nghi-quyet-so-847-nq-qutw-cua-quan-uy-trung-uong.html"
    },

    {
        title: "Nghị quyết 05-NQ/TW",
        date: "17/01/2022",
        agency: "Bộ Chính trị",
        description: "Về tổ chức Quân đội nhân dân Việt Nam giai đoạn 2021–2030 và những năm tiếp theo.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Xây dựng Quân đội nhân dân cách mạng, chính quy, tinh nhuệ, hiện đại.
        - Điều chỉnh tổ chức lực lượng theo hướng tinh, gọn, mạnh.
        - Nâng cao chất lượng tổng hợp và sức mạnh chiến đấu.
        - Xây dựng đội ngũ cán bộ đáp ứng yêu cầu nhiệm vụ.
        - Tăng cường xây dựng chính quy và quản lý kỷ luật.
        `,
        url: "https://www.qdnd.vn/vung-buoc-duoi-quan-ky-quyet-thang/su-menh-thoi-binh/xay-dung-quan-doi-nhan-dan-viet-nam-tinh-gon-manh-hien-dai-trong-thoi-ky-moi-807382"
    },

    {
        title: "Nghị quyết 1652-NQ/QUTW",
        date: "20/12/2022",
        agency: "Quân ủy Trung ương",
        description: "Về lãnh đạo công tác khoa học quân sự đến năm 2030 và những năm tiếp theo.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Nâng cao chất lượng nghiên cứu khoa học quân sự.
        - Đẩy mạnh ứng dụng khoa học vào thực tiễn.
        - Phát triển đội ngũ cán bộ nghiên cứu khoa học.
        - Gắn nghiên cứu với yêu cầu xây dựng Quân đội.
        `,
        url: "https://baoquankhu7.vn/dang-uy-quan-su-tphcm-quan-triet-cac-nghi-quyet-cua-quan-uy-trung-uong-1501886898-0032490s36310gs"
    },

    {
        title: "Nghị quyết 1656-NQ/QUTW",
        date: "20/12/2022",
        agency: "Quân ủy Trung ương",
        description: "Về lãnh đạo công tác kỹ thuật đến năm 2030 và những năm tiếp theo.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Nâng cao chất lượng công tác kỹ thuật quân sự.
        - Bảo đảm trang bị kỹ thuật cho nhiệm vụ.
        - Tăng cường quản lý, bảo quản và sử dụng trang bị.
        - Phát triển đội ngũ cán bộ, nhân viên kỹ thuật.
        `,
        url: "https://baoquankhu7.vn/dang-uy-quan-su-tphcm-quan-triet-cac-nghi-quyet-cua-quan-uy-trung-uong-1501886898-0032490s36310gs"
    },

    {
        title: "Nghị quyết 1657-NQ/QUTW",
        date: "20/12/2022",
        agency: "Quân ủy Trung ương",
        description: "Về đổi mới công tác giáo dục và đào tạo, đáp ứng yêu cầu nhiệm vụ xây dựng Quân đội trong tình hình mới.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Đổi mới nội dung và phương pháp giáo dục, đào tạo.
        - Nâng cao chất lượng đội ngũ giáo viên, cán bộ quản lý.
        - Gắn đào tạo với yêu cầu thực tiễn của đơn vị.
        - Nâng cao chất lượng đào tạo cán bộ.
        - Xây dựng môi trường giáo dục chính quy, hiện đại.
        `,
        url: "https://tapchiqptd.vn/vi/quan-triet-thuc-hien-nghi-quyet/quan-triet-nghi-quyet-so-1657nqqutw-hoc-vien-phong-khong-khong-quan-doi-moi-cong-tac-giao-/22259.html"
    },

    {
        title: "Nghị quyết 1658-NQ/QUTW",
        date: "20/12/2022",
        agency: "Quân ủy Trung ương",
        description: "Về công tác hậu cần Quân đội đến năm 2030 và những năm tiếp theo.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Nâng cao chất lượng công tác hậu cần.
        - Bảo đảm đời sống vật chất, tinh thần bộ đội.
        - Chủ động bảo đảm hậu cần cho các nhiệm vụ.
        - Quản lý và sử dụng hiệu quả nguồn lực hậu cần.
        `,
        url: "https://baoquankhu7.vn/dang-uy-quan-su-tphcm-quan-triet-cac-nghi-quyet-cua-quan-uy-trung-uong-1501886898-0032490s36310gs"
    },

    {
        title: "Nghị quyết 1659-NQ/QUTW",
        date: "20/12/2022",
        agency: "Quân ủy Trung ương",
        description: "Về nâng cao chất lượng huấn luyện giai đoạn 2023–2030 và những năm tiếp theo.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Nâng cao chất lượng huấn luyện quân sự.
        - Huấn luyện sát thực tế nhiệm vụ.
        - Kết hợp huấn luyện quân sự với giáo dục chính trị.
        - Nâng cao trình độ và khả năng thực hiện nhiệm vụ.
        - Bảo đảm an toàn trong huấn luyện và diễn tập.
        `,
        url: "https://baoquankhu7.vn/dang-uy-quan-su-tphcm-quan-triet-cac-nghi-quyet-cua-quan-uy-trung-uong-1501886898-0032490s36310gs"
    },

    {
        title: "Nghị quyết 1661-NQ/QUTW",
        date: "20/12/2022",
        agency: "Quân ủy Trung ương",
        description: "Về lãnh đạo công tác tài chính Quân đội đến năm 2030.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Nâng cao hiệu quả quản lý tài chính.
        - Bảo đảm ngân sách thực hiện nhiệm vụ.
        - Thực hành tiết kiệm, chống lãng phí.
        - Tăng cường công khai, minh bạch và kiểm tra tài chính.
        `,
        url: "https://baoquankhu7.vn/dang-uy-quan-su-tphcm-quan-triet-cac-nghi-quyet-cua-quan-uy-trung-uong-1501886898-0032490s36310gs"
    },

    {
        title: "Nghị quyết 44-NQ/TW",
        date: "24/11/2023",
        agency: "Ban Chấp hành Trung ương Đảng",
        description: "Về Chiến lược bảo vệ Tổ quốc trong tình hình mới.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Bảo vệ vững chắc độc lập, chủ quyền và toàn vẹn lãnh thổ.
        - Bảo vệ Đảng, Nhà nước, Nhân dân và chế độ xã hội chủ nghĩa.
        - Xây dựng nền quốc phòng toàn dân vững mạnh.
        - Kết hợp chặt chẽ nhiệm vụ xây dựng và bảo vệ Tổ quốc.
        - Xây dựng lực lượng vũ trang nhân dân vững mạnh.
        `,
        url: "https://truongchinhtrihatinh.gov.vn/uploads/news/2024_08/so-50.pdf"
    },

    {
        title: "Nghị quyết 57-NQ/TW",
        date: "22/12/2024",
        agency: "Bộ Chính trị",
        description: "Về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Đẩy mạnh phát triển khoa học và công nghệ.
        - Thúc đẩy đổi mới sáng tạo.
        - Phát triển hạ tầng số và dữ liệu số.
        - Nâng cao năng lực chuyển đổi số.
        - Ứng dụng công nghệ vào quản lý và thực hiện nhiệm vụ.
        `,
        url: "https://tulieuvankien.dangcongsan.vn/"
    },

    {
        title: "Nghị quyết 3488-NQ/QUTW",
        date: "29/01/2025",
        agency: "Quân ủy Trung ương",
        description: "Về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số trong Quân đội.",
        content: `
        NỘI DUNG HỌC TẬP:

        - Phát triển khoa học và công nghệ trong Quân đội.
        - Đẩy mạnh đổi mới sáng tạo.
        - Tăng cường ứng dụng công nghệ số.
        - Nâng cao năng lực nghiên cứu và làm chủ công nghệ.
        - Thúc đẩy chuyển đổi số trong các cơ quan, đơn vị.
        `,
        url: "https://www.qdnd.vn/giao-duc-khoa-hoc/nha-truong-quan-doi/hoc-vien-quan-y-quan-triet-trien-khai-thuc-hien-nghi-quyet-so-3488-nq-qutw-818493"
    }
];


// =============================================
// GIAO DIỆN TRANG NGHỊ QUYẾT
// =============================================

window.resolutionPage = function() {

    return `
        <div class="page-box resolution-app">

            <h2>📚 HỌC TẬP NGHỊ QUYẾT BBB11</h2>

            <p>
                Kho học tập nghị quyết, chỉ thị và văn kiện
                liên quan đến xây dựng Quân đội nhân dân Việt Nam.
            </p>

            <div class="notice-card">
                <h3>🎖️ MỤC ĐÍCH HỌC TẬP</h3>
                <p>
                    Nâng cao nhận thức chính trị, trách nhiệm,
                    phẩm chất đạo đức và ý thức chấp hành kỷ luật
                    của cán bộ, chiến sĩ.
                </p>
            </div>

            <h3>📖 DANH SÁCH NGHỊ QUYẾT</h3>

            <div id="resolutionList"></div>

            <p style="margin-top:20px;color:#777;">
                Nội dung tóm tắt phục vụ học tập.
                Vui lòng mở nguồn tham khảo để đối chiếu
                với văn bản chính thức.
            </p>

        </div>
    `;
};


// =============================================
// HIỂN THỊ TOÀN BỘ NGHỊ QUYẾT
// =============================================

window.hienThiTaiLieuNghiQuyet = function() {

    const khung = document.getElementById("resolutionList");

    if (!khung) return;

    khung.innerHTML = danhSachNghiQuyetBBB11.map((item, index) => `

        <div class="list-item resolution-card">

            <h3>
                ${index + 1}. 📘 ${escapeHTML(item.title)}
            </h3>

            <p>
                <strong>Ngày ban hành:</strong>
                ${escapeHTML(item.date)}
            </p>

            <p>
                <strong>Cơ quan ban hành:</strong>
                ${escapeHTML(item.agency)}
            </p>

            <p>
                <strong>Trích yếu:</strong>
                ${escapeHTML(item.description)}
            </p>

            <details class="resolution-detail">
                <summary>📖 XEM NỘI DUNG HỌC TẬP</summary>

                <div class="resolution-content">
                    <pre>${escapeHTML(item.content)}</pre>
                </div>
            </details>

            <p style="margin-top:12px;">
                <a href="${escapeHTML(item.url)}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="action-button"
                   style="display:inline-block;text-decoration:none;">

                    🔗 MỞ TÀI LIỆU THAM KHẢO

                </a>
            </p>

        </div>

    `).join("");
};
console.log("BBB11: Đã tải script.js");
console.log("showPage:", typeof window.showPage);
console.log("resolutionPage:", typeof window.resolutionPage);
console.log("hienThiTaiLieuNghiQuyet:",
    typeof window.hienThiTaiLieuNghiQuyet);
    // BẮT LỖI PROMISE TOÀN HỆ THỐNG BBB11
window.addEventListener("unhandledrejection", function(event) {
    console.error("BBB11 - LỖI PROMISE:", event.reason);

    if (event.reason === undefined) {
        console.error("Promise bị từ chối nhưng không có thông tin lỗi.");
    }
});

// MÃ HÓA HTML ĐỂ HIỂN THỊ NỘI DUNG AN TOÀN
function educationEscapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


window.capNhatDanhSachBaiHocChinhTri =
    capNhatDanhSachBaiHocChinhTri;
