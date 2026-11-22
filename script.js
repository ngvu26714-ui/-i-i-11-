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
// DANH SÁCH TÀI LIỆU BBB11
const TAI_LIEU_BBB11 = {
    thanhvien: [
        {
            ten: "Tài liệu thành viên BBB11",
            url: "https://docs.google.com/document/d/1hODKga-xGZ4DsuPKNLAVGPylQTo98Jud/edit"
        }
    ],

    taikhoan: [
        {
            ten: "Tài liệu tài khoản BBB11",
            url: "https://docs.google.com/document/d/1UoJS9Lnhvv3bLOJA73sqGqKsRPiKlnsS/edit"
        }
    ]
};
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
    music: musicPage,
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
// Hiển thị tài liệu thành viên
if (page === "members") {
    hienThiLinkTaiLieuBBB11(
        "thanhvien",
        "taiLieuThanhVien"
    );
}

// Hiển thị tài liệu tài khoản
if (page === "accounts") {
    hienThiLinkTaiLieuBBB11(
        "taikhoan",
        "taiLieuTaiKhoan"
    );
}
        home.classList.add("hidden");
        functionPage.classList.remove("hidden");

        // QUẢN LÝ THÀNH VIÊN
    if (page === "members") {
    const noiDung = document.getElementById("pageContent");

    if (noiDung) {
        noiDung.innerHTML = membersPage();

        if (typeof hienThiThanhVienBBB11 === "function") {
            hienThiThanhVienBBB11();
        } else {
            console.error(
                "Chưa tìm thấy hàm hienThiThanhVienBBB11()."
            );
        }
    }

}
        // LỖI BÁC
       if (page === "bac") {
    pageContent.innerHTML = window.bacPage();

    if (typeof window.hienThiLoiBac === "function") {
        window.hienThiLoiBac();
    }

    return;
}

        // NGHỊ QUYẾT
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

// HIỂN THỊ GIAO DIỆN
home.classList.add("hidden");
functionPage.classList.remove("hidden");

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
            <h3>📚 TÀI LIỆU TÀI KHOẢN</h3>
<div id="taiLieuTaiKhoan">
    Đang tải danh sách tài liệu...
</div>

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

function membersPage() {
    return `
        <div class="page-box">
            <h2>DANH SÁCH THÀNH VIÊN BBB11</h2>
            <h3>📚 TÀI LIỆU THÀNH VIÊN</h3>
<div id="taiLieuThanhVien">
    Đang tải danh sách tài liệu...
</div>

            <p>Quản lý quân số thành viên Đại đội 11.</p>

            <button class="action-button"
                onclick="hienThiThanhVien()">
                TẢI DANH SÁCH THÀNH VIÊN
            </button>

            <div id="danhSachThanhVien">
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



"use strict";

// ============================================
// BBB11 - CẨM NANG NGƯỜI LÍNH
// ============================================

(function () {
    const STORAGE_KEY = "bbb11_manual";

    let danhMucDangChon = "tatca";
    let taiLieuDangDoc = null;

    const danhMuc = {
        tatca: "TẤT CẢ TÀI LIỆU",
        dieulenh: "ĐIỀU LỆNH",
        kyluat: "KỶ LUẬT",
        kynang: "KỸ NĂNG QUÂN NHÂN",
        kienthuc: "KIẾN THỨC",
        khac: "TÀI LIỆU KHÁC"
    };

    // ========================================
    // GIAO DIỆN
    // ========================================

    window.manualPage = function () {
        return `
        <div class="page-box manual-app">

            <h2>📚 CẨM NANG NGƯỜI LÍNH</h2>

            <p>
                Kho tài liệu kiến thức và kỹ năng
                dành cho cán bộ, chiến sĩ Đại đội 11.
            </p>

            <div class="news-tabs">
                
<button class="action-button"
    onclick="chonDanhMucCamNang('tatca')">
    <i class="fa-solid fa-layer-group"></i> TẤT CẢ
</button>

<button class="action-button"
    onclick="chonDanhMucCamNang('dieulenh')">
    <i class="fa-solid fa-person-military-rifle"></i> ĐIỀU LỆNH
</button>

<button class="action-button"
    onclick="chonDanhMucCamNang('kyluat')">
    <i class="fa-solid fa-shield-halved"></i> KỶ LUẬT
</button>

<button class="action-button"
    onclick="chonDanhMucCamNang('kynang')">
    <i class="fa-solid fa-compass"></i> KỸ NĂNG
</button>

<button class="action-button"
    onclick="chonDanhMucCamNang('kienthuc')">
    <i class="fa-solid fa-book-open"></i> KIẾN THỨC
</button>

<button class="action-button"
    onclick="chonDanhMucCamNang('khac')">
    <i class="fa-solid fa-folder-open"></i> KHÁC
</button>

            </div>

            <div class="list-item">
                <h3 id="tenDanhMucCamNang">
                    📖 TẤT CẢ TÀI LIỆU
                </h3>

                <input
                    id="manualSearch"
                    type="search"
                    placeholder="🔎 Tìm kiếm tài liệu..."
                    oninput="hienThiCamNang()"
                    style="width:100%;box-sizing:border-box"
                >

                <div id="manualList">
                    Đang tải tài liệu...
                </div>
            </div>

            <div class="list-item">
                <h3 id="manualReaderTitle">
                    📖 KHUNG ĐỌC TÀI LIỆU
                </h3>

                <div style="display:flex;gap:8px;flex-wrap:wrap">
                    <button class="action-button"
                        onclick="taiLaiCamNang()">
                        ↻ TẢI LẠI
                    </button>

                    <button class="action-button"
                        onclick="moCamNangNgoai()">
                        ↗ MỞ BÊN NGOÀI
                    </button>
                </div>

                <iframe
                    id="manualReader"
                    title="Khung đọc tài liệu"
                    src="about:blank"
                    style="width:100%;height:650px;
                    border:1px solid #ccc;border-radius:8px;
                    background:white;margin-top:12px"
                    loading="lazy">
                </iframe>

                <p style="font-size:13px;color:#777">
                    Nếu website không hiển thị trong khung đọc,
                    hãy chọn MỞ BÊN NGOÀI.
                </p>
            </div>

            <div class="list-item">
                <h3>➕ THÊM TÀI LIỆU CẨM NANG</h3>

                <label for="manualTitle">Tên tài liệu</label>
                <input
                    id="manualTitle"
                    type="text"
                    placeholder="Nhập tên tài liệu..."
                    style="width:100%;box-sizing:border-box"
                >

                <label for="manualCategory">Danh mục</label>
                <select
                    id="manualCategory"
                    style="width:100%;box-sizing:border-box"
                >
                    <option value="Điều lệnh">Điều lệnh</option>
                    <option value="Kỷ luật">Kỷ luật</option>
                    <option value="Kỹ năng quân nhân">
                        Kỹ năng quân nhân
                    </option>
                    <option value="Kiến thức">Kiến thức</option>
                    <option value="Khác">Khác</option>
                </select>

                <label for="manualUrl">Link PDF hoặc website</label>
                <input
                    id="manualUrl"
                    type="url"
                    placeholder="https://..."
                    style="width:100%;box-sizing:border-box"
                >

                <button class="action-button"
                    onclick="themCamNang()">
                    ➕ THÊM TÀI LIỆU
                </button>
            </div>
        </div>`;
    };

    // ========================================
    // ĐỌC DỮ LIỆU
    // ========================================

    function layDanhSach() {
        try {
            const data = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "[]"
            );

            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("Lỗi đọc cẩm nang:", error);
            return [];
        }
    }

    function luuDanhSach(data) {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(data)
            );
            return true;
        } catch (error) {
            console.error("Lỗi lưu cẩm nang:", error);
            alert("Không thể lưu dữ liệu vào trình duyệt.");
            return false;
        }
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (c) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[c];
        });
    }

    function hopLeURL(url) {
        try {
            const parsed = new URL(url);
            return ["https:", "http:"].includes(parsed.protocol);
        } catch (error) {
            return false;
        }
    }

    function maDanhMuc(category) {
        const value = String(category || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (value.includes("dieu lenh")) return "dieulenh";
        if (value.includes("ky luat")) return "kyluat";
        if (value.includes("ky nang")) return "kynang";
        if (value.includes("kien thuc")) return "kienthuc";

        return "khac";
    }

function layDanhSach() {
    let duLieuDaLuu = [];

    try {
        duLieuDaLuu = JSON.parse(
            localStorage.getItem("bbb11_manual") || "[]"
        );

        if (!Array.isArray(duLieuDaLuu)) {
            duLieuDaLuu = [];
        }
    } catch (error) {
        duLieuDaLuu = [];
    }

    // Kết hợp tài liệu trong code và tài liệu đã thêm
    const tatCa = [...TAI_LIEU_CAM_NANG, ...duLieuDaLuu];

    // Loại bỏ tài liệu trùng ID
    return Array.from(
        new Map(tatCa.map(item => [String(item.id), item])).values()
    );
}
    // ========================================
    // CHỌN DANH MỤC
    // ========================================

    window.chonDanhMucCamNang = function (ma) {
        if (!Object.prototype.hasOwnProperty.call(danhMuc, ma)) {
            return;
        }

        danhMucDangChon = ma;

        const title = document.getElementById(
            "tenDanhMucCamNang"
        );

        if (title) {
            title.textContent = "📖 " + danhMuc[ma];
        }

        window.hienThiCamNang();
    };

    // ========================================
    // THÊM TÀI LIỆU
    // ========================================

    window.themCamNang = function () {
        const title = document.getElementById("manualTitle");
        const category = document.getElementById("manualCategory");
        const urlInput = document.getElementById("manualUrl");

        if (!title || !category || !urlInput) {
            alert("Không tìm thấy biểu mẫu cẩm nang.");
            return;
        }

        const ten = title.value.trim();
        const link = urlInput.value.trim();

        if (!ten || !link) {
            alert("Vui lòng nhập tên và link tài liệu!");
            return;
        }

        if (!hopLeURL(link)) {
            alert("Link không hợp lệ! Hãy nhập link HTTP hoặc HTTPS.");
            return;
        }

        const data = layDanhSach();

        data.unshift({
            id: Date.now().toString() +
                Math.random().toString(36).slice(2, 7),
            title: ten,
            category: category.value,
            url: link
        });

        if (!luuDanhSach(data)) return;

        title.value = "";
        urlInput.value = "";

        window.hienThiCamNang();
        alert("Đã thêm tài liệu thành công!");
    };

    // ========================================
    // ĐỌC TÀI LIỆU
    // ========================================

   // ============================================
// DANH SÁCH CẨM NANG CÓ SẴN
// DÁN LINK TRỰC TIẾP VÀO ĐÂY
// ============================================




   
const TAI_LIEU_CAM_NANG = [
    {
        id: "tl001",
        title: "Sư đoàn 9 diễn tập bắn đạn thật",
        category: "Huấn luyện quân sự",
        url: "https://baotintuc.vn/su-doan-9-quan-doan-4-dien-tap-ban-dan-that-post972370.html"
    },
    {
        id: "tl002",
        title: "Sư đoàn 9 xây dựng lực lượng tinh nhuệ, sẵn sàng chiến đấu",
        category: "Xây dựng đơn vị",
        url: "https://baotintuc.vn/xay-dung-luc-luong-tinh-nhue-san-sang-chien-dau-post990814.html"
    },
    {
        id: "tl003",
        title: "Chủ tịch Quốc hội thăm, làm việc với Sư đoàn 9",
        category: "Giáo dục chính trị",
        url: "https://baotintuc.vn/thoi-su/chu-tich-quoc-hoi-tran-thanh-man-tham-lam-viec-voi-su-doan-9-20260303123932667.htm"
    },
    {
        id: "tl004",
        title: "Những người lính Quân đoàn 4: Trồng rau trên đá, nuôi cá trên đồi",
        category: "Hậu cần quân đội",
        url: "https://baotintuc.vn/nhung-nguoi-linh-quan-doan-4-bai-cuoi-trong-rau-tren-da-nuoi-ca-tren-doi-post476258.html"
    },
    {
        id: "tl005",
        title: "Những kỷ niệm vào sinh ra tử của người lính Sư đoàn 9",
        category: "Truyền thống đơn vị",
        url: "https://baotintuc.vn/thoi-su/nhung-ky-niem-vao-sinh-ra-tu-20140103203924304.htm"
    },
    {
        id: "tl006",
        title: "Chủ tịch nước thăm, tiếp xúc cử tri tại Sư đoàn 9",
        category: "Truyền thống đơn vị",
        url: "https://baotintuc.vn/chu-tich-nuoc-nguyen-xuan-phuc-tiep-xuc-cu-tri-thanh-pho-ho-chi-minh-post918969.html"
    },
    {
        id: "tl007",
        title: "Lịch sử và truyền thống Sư đoàn 9",
        category: "Truyền thống đơn vị",
        url: "https://baotintuc.vn/tag/quan-doan-4-tag95245.html"
    },
    {
        id: "tl008",
        title: "Sư đoàn 9 trong nhiệm vụ xây dựng và bảo vệ Tổ quốc",
        category: "Giáo dục chính trị",
        url: "https://baotintuc.vn/chu-tich-quoc-hoi-tran-thanh-man-tham-lam-viec-voi-su-doan-9-post881240.html"
    },
    {
        id: "tl009",
        title: "Sư đoàn 9 trong cuộc kháng chiến bảo vệ Tổ quốc",
        category: "Truyền thống đơn vị",
        url: "https://baotintuc.vn/tim-manh-moi-xac-dinh-danh-tinh-liet-si-tu-buc-anh-luu-cung-hai-cot-post942873.html"
    },
    {
        id: "tl010",
        title: "Hoạt động của chiến sĩ Sư đoàn 9 trong phòng chống dịch",
        category: "Công tác dân vận",
        url: "https://baotintuc.vn/tp-ho-chi-minh-tiem-vaccine-mui-thu-2-cho-cac-chien-si-tham-gia-phong-chong-dich-post597176.html"
    },
    {
        id: "tl011",
        title: "Sĩ quan quân đội thi điều lệnh",
        category: "Điều lệnh",
        url: "https://baotintuc.vn/xem-si-quan-quan-doi-thi-dieu-lenh-post524844.html"
    },
    {
        id: "tl012",
        title: "Binh đoàn Cửu Long diễn tập chiến thuật bắn đạn thật",
        category: "Huấn luyện quân sự",
        url: "https://baotintuc.vn/tag/quan-doan-4-tag95245.html"
    },
    {
        id: "tl013",
        title: "Sư đoàn 9 tiếp tục nâng cao chất lượng huấn luyện",
        category: "Huấn luyện quân sự",
        url: "https://baotintuc.vn/xay-dung-luc-luong-tinh-nhue-san-sang-chien-dau-post990814.html"
    },
    {
        id: "tl014",
        title: "Truyền thống chiến đấu của Sư đoàn 9",
        category: "Truyền thống đơn vị",
        url: "https://baotintuc.vn/thoi-su/nhung-ky-niem-vao-sinh-ra-tu-20140103203924304.htm"
    },
    {
        id: "tl015",
        title: "Quân đoàn 4 trong chiến dịch giải phóng miền Nam",
        category: "Lịch sử quân đội",
        url: "https://baotintuc.vn/long-form/megastory/thanh-pho-mang-ten-bac-vui-sao-nuoc-mat-lai-trao-20230428110313628.htm"
    },
    {
        id: "tl016",
        title: "Sư đoàn 9 và công tác tìm kiếm hài cốt liệt sĩ",
        category: "Lịch sử quân đội",
        url: "https://baotintuc.vn/tim-manh-moi-xac-dinh-danh-tinh-liet-si-tu-buc-anh-luu-cung-hai-cot-post942873.html"
    },
    {
        id: "tl017",
        title: "Quân đoàn 4 kỷ niệm ngày truyền thống",
        category: "Truyền thống đơn vị",
        url: "https://baotintuc.vn/chinh-tri/quan-doan-4-ky-niem-45-nam-ngay-truyen-thong-20190719183104505.htm"
    },
    {
        id: "tl018",
        title: "Công tác tăng gia sản xuất của bộ đội Sư đoàn 9",
        category: "Hậu cần quân đội",
        url: "https://baotintuc.vn/nhung-nguoi-linh-quan-doan-4-bai-cuoi-trong-rau-tren-da-nuoi-ca-tren-doi-post476258.html"
    },
    {
        id: "tl019",
        title: "Hình ảnh chiến sĩ Sư đoàn 9 trong đời sống quân ngũ",
        category: "Đời sống quân nhân",
        url: "https://baotintuc.vn/tp-ho-chi-minh-tiem-vaccine-mui-thu-2-cho-cac-chien-si-tham-gia-phong-chong-dich-post597176.html"
    },
    {
        id: "tl020",
        title: "Tin tức và hoạt động liên quan đến Quân đoàn 4",
        category: "Tin tức quân đội",
        url: "https://baotintuc.vn/tag/quan-doan-4-tag95245.html"
    }
];


    // ============================================
    // HIỂN THỊ DANH SÁCH CẨM NANG
    // ============================================

    window.hienThiCamNang = function () {
        const khung = document.getElementById("manualList");
        if (!khung) return;

        const tuKhoa = (
            document.getElementById("manualSearch")?.value || ""
        ).trim().toLowerCase();

        const danhSach = layDanhSach().filter(item => {
            const dungDanhMuc =
                danhMucDangChon === "tatca" ||
                maDanhMuc(item.category) === danhMucDangChon;

            const dungTuKhoa =
                String(item.title || "").toLowerCase().includes(tuKhoa);

            return dungDanhMuc && dungTuKhoa;
        });

        if (!danhSach.length) {
            khung.innerHTML = "<p>Chưa có tài liệu phù hợp.</p>";
            return;
        }

        khung.innerHTML = danhSach.map(item => `
            <div class="list-item">
                <h4>${escapeHTML(item.title)}</h4>
                <p>Danh mục: ${escapeHTML(item.category || "Khác")}</p>
                <button class="action-button"
                    onclick="docCamNang('${encodeURIComponent(String(item.id))}')">
                    📖 ĐỌC TÀI LIỆU
                </button>
                <button class="action-button"
                    onclick="moLinkCamNang('${encodeURIComponent(String(item.id))}')">
                    ↗ MỞ LINK
                </button>
            </div>
        `).join("");
    };

    // ============================================
    // MỞ TÀI LIỆU TRONG KHUNG ĐỌC
    // ============================================

    window.docCamNang = function (encodedId) {
        const id = decodeURIComponent(encodedId);
        const taiLieu = layDanhSach().find(
            item => String(item.id) === id
        );

        if (!taiLieu) {
            alert("Không tìm thấy tài liệu!");
            return;
        }

        if (!hopLeURL(taiLieu.url)) {
            alert("Link tài liệu không hợp lệ!");
            return;
        }

        taiLieuDangDoc = taiLieu;

        const frame = document.getElementById("manualReader");
        const title = document.getElementById("manualReaderTitle");

        if (title) {
            title.textContent = "📖 " + taiLieu.title;
        }

        if (frame) {
            frame.src = taiLieu.url;
            frame.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    // ============================================
    // MỞ LINK TÀI LIỆU TRONG TAB MỚI
    // ============================================

    window.moLinkCamNang = function (encodedId) {
        const id = decodeURIComponent(encodedId);
        const taiLieu = layDanhSach().find(
            item => String(item.id) === id
        );

        if (!taiLieu || !hopLeURL(taiLieu.url)) {
            alert("Không tìm thấy link tài liệu hợp lệ!");
            return;
        }

        window.open(taiLieu.url, "_blank", "noopener,noreferrer");
    };

    // ========================================
    // TẢI LẠI
    // ========================================

    window.taiLaiCamNang = function () {
        if (!taiLieuDangDoc) {
            alert("Vui lòng chọn tài liệu trước!");
            return;
        }

        const frame = document.getElementById("manualReader");
        if (frame) frame.src = taiLieuDangDoc.url;
    };

    // ========================================
    // MỞ BÊN NGOÀI
    // ========================================

    window.moCamNangNgoai = function () {
        if (!taiLieuDangDoc) {
            alert("Vui lòng chọn tài liệu trước!");
            return;
        }

        if (!hopLeURL(taiLieuDangDoc.url)) {
            alert("Đường dẫn không hợp lệ!");
            return;
        }

        window.open(
            taiLieuDangDoc.url,
            "_blank",
            "noopener,noreferrer"
        );
    };

    // ========================================
    // XÓA TÀI LIỆU
    // ========================================

    window.xoaCamNang = function (encodedId) {
        const id = decodeURIComponent(encodedId);

        if (!confirm("Bạn có chắc muốn xóa tài liệu này?")) {
            return;
        }

        const data = layDanhSach().filter(
            item => String(item.id) !== id
        );

        if (!luuDanhSach(data)) return;

        if (
            taiLieuDangDoc &&
            String(taiLieuDangDoc.id) === id
        ) {
            taiLieuDangDoc = null;

            const frame = document.getElementById("manualReader");
            const title = document.getElementById("manualReaderTitle");

            if (frame) frame.src = "about:blank";
            if (title) title.textContent = "📖 KHUNG ĐỌC TÀI LIỆU";
        }

        window.hienThiCamNang();
    };

})();


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
         reference_url: "https://www.bienphong.com.vn/quan-doi-nhan-dan-viet-nam-phat-huy-truyen-thong-vung-buoc-tien-vao-giai-doan-phat-trien-hien-dai-post498784.html",
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
         reference_url: "https://baohatinh.vn/chuan-muc-dao-duc-trong-hanh-vi-ung-xu-tren-mang-xa-hoi-post214842.html",
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

    },
    {
         id: "ct-bam-5",
        title: "Trung thành với Tổ quốc, với Nhân dân",
        category: "Lý tưởng và trách nhiệm",
        description:"Bồi dưỡng lòng yêu nước và trách nhiệm phục vụ Nhân dân.",
        reference_url: "https://www.qdnd.vn/quoc-phong-an-ninh/xay-dung-quan-doi/trung-thanh-vo-han-voi-to-quoc-voi-dang-voi-nhan-dan-435225?utm_source=chatgpt.com",
        content: `I. MỤC ĐÍCH, YÊU CẦU
Nâng cao nhận thức về trách nhiệm của quân nhân đối với Tổ quốc và Nhân dân.

II. NỘI DUNG HỌC TẬP
1. Tìm hiểu truyền thống yêu nước và lịch sử đấu tranh bảo vệ Tổ quốc.
2. Nêu cao tinh thần trách nhiệm, tận tụy trong học tập, công tác.
3. Tôn trọng Nhân dân, thực hiện đúng chức trách và nhiệm vụ được giao.

III. LIÊN HỆ THỰC TIỄN
Mỗi quân nhân chủ động rèn luyện phẩm chất, hoàn thành nhiệm vụ và có hành động thiết thực vì tập thể, cộng đồng.

IV. CÂU HỎI ÔN TẬP
1. Vì sao quân nhân cần nêu cao trách nhiệm với Tổ quốc và Nhân dân?
2. Những việc làm nào thể hiện tinh thần trách nhiệm?
3. Liên hệ bản thân trong thực hiện nhiệm vụ.`,
        builtin: true

    },
    {
        id: "ct-bam-6",
        title: "Xây dựng ý chí quyết tâm và tinh thần vượt khó",
        category: "Bản lĩnh và ý chí",
        description: "Rèn luyện nghị lực, tính kiên trì và tinh thần hoàn thành nhiệm vụ.",
         reference_url: "https://www.qdnd.vn/quoc-phong-an-ninh/xay-dung-quan-doi/bai-hoc-ve-xay-dung-y-chi-quyet-tam-chien-dau-cho-quan-doi-438695?utm_source=chatgpt.com",
        content: `I. MỤC ĐÍCH
Bồi dưỡng ý chí, nghị lực và tinh thần chủ động khắc phục khó khăn.

II. NỘI DUNG HỌC TẬP
1.Xác định mục tiêu rõ ràng trong học tập và công tác.
2.Bình tĩnh tìm giải pháp khi gặp khó khăn.
3.Kiên trì rèn luyện, không ngừng khắc phục hạn chế của bản thân.

III. LIÊN HỆ THỰC TIỄN
Xây dựng kế hoạch rèn luyện cụ thể, đánh giá kết quả và điều chỉnh phương pháp khi cần thiết.


IV. CÂU HỎI ÔN TẬP
1. Ý chí quyết tâm có ý nghĩa như thế nào?
2. Cần làm gì để vượt qua khó khăn?
3. Nêu một việc bản thân cần kiên trì thực hiện.`,
        builtin: true
    },
    {
        id: "ct-bam-7",
     title: "Đoàn kết nội bộ, xây dựng tình đồng chí đồng đội",
        category: "Đoàn kết và văn hóa đơn vị",
         description: "Phát huy tinh thần tương trợ, tôn trọng và cùng nhau tiến bộ.",
           reference_url: "https://www.qdnd.vn/vung-buoc-duoi-quan-ky-quyet-thang/lich-su-quan-doi-nhan-dan-viet-nam/quan-doi-ta-doan-ket-tren-duoi-dong-long-thong-nhat-y-chi-va-hanh-dong-807980?utm_source=chatgpt.com",
        content: `I. MỤC ĐÍCH
Nâng cao nhận thức về vai trò của đoàn kết trong xây dựng tập thể vững mạnh.

II. NỘI DUNG HỌC TẬP
1. Tôn trọng, lắng nghe và chia sẻ với đồng chí, đồng đội.
2. Sẵn sàng giúp đỡ nhau trong học tập, công tác và sinh hoạt.
3. Góp ý chân thành, giải quyết bất đồng trên tinh thần xây dựng.

III. LIÊN HỆ THỰC TIỄN
Tích cực tham gia hoạt động tập thể, không gây mất đoàn kết và cùng nhau khắc phục khó khăn.

IV. CÂU HỎI ÔN TẬP
1. Đoàn kết có vai trò gì đối với tập thể?
2. Làm thế nào để xây dựng tình đồng chí đồng đội?
3. Bản thân cần làm gì để giữ gìn đoàn kết?`,
        builtin: true

    },
    {
         id: "ct-bam-8",
         title: "Rèn luyện tác phong và phương pháp công tác khoa học",
        category: "Tác phong và hiệu quả công việc",
        description:  "Hình thành thói quen làm việc có kế hoạch, đúng giờ và trách nhiệm.",
        reference_url: "https://www.qdnd.vn/nuoi-duong-van-hoa-bo-doi-cu-ho/ren-luyen-phuong-phap-tac-phong-cong-tac-khoa-hoc-nghiem-tuc-trach-nhiem-cao-695872?utm_source=chatgpt.com",
        content: `
I. MỤC ĐÍCH
Nâng cao ý thức tổ chức công việc khoa học, hiệu quả.

II. NỘI DUNG HỌC TẬP
1. Thực hiện đúng thời gian, quy trình và nhiệm vụ được giao.
2. Sắp xếp công việc theo thứ tự ưu tiên.
3. Chủ động kiểm tra kết quả, báo cáo trung thực và chịu trách nhiệm.

III. LIÊN HỆ THỰC TIỄN
Lập kế hoạch công việc hằng ngày, hạn chế trì hoãn và rút kinh nghiệm sau mỗi nhiệm vụ.

IV. CÂU HỎI ÔN TẬP
1. Tác phong khoa học mang lại lợi ích gì?
2. Nêu các bước lập kế hoạch công việc.
3. Bản thân cần sửa đổi thói quen nào?`,
        builtin: true

    },
    {
         id: "ct-bam-9",
        title: "Quân đội với công tác dân vận và giúp đỡ Nhân dân",
        category: "Dân vận và trách nhiệm cộng đồng",
        description:"Nâng cao ý thức gần dân, tôn trọng dân và phục vụ cộng đồng.",
         reference_url: "https://www.qdnd.vn/quoc-phong-an-ninh/quoc-phong-toan-dan/quan-doi-thuc-hien-cong-tac-dan-van-vung-dong-bao-dan-toc-thieu-so-bam-sat-phuong-cham-nhieu-mo-hinh-hieu-qua-766334?utm_source=chatgpt.com",
        content: `
I. MỤC ĐÍCH
Nâng cao nhận thức về trách nhiệm của quân nhân trong công tác dân vận.

II. NỘI DUNG HỌC TẬP
1. Tôn trọng, lắng nghe và ứng xử đúng mực với Nhân dân.
2. Tích cực tham gia hoạt động cộng đồng theo phân công.
3. Chấp hành quy định, giữ gìn hình ảnh và uy tín của quân nhân.

III. LIÊN HỆ THỰC TIỄN
Thực hiện tốt nhiệm vụ được giao, sẵn sàng giúp đỡ người dân trong phạm vi trách nhiệm.

IV. CÂU HỎI ÔN TẬP
1. Công tác dân vận có ý nghĩa gì?
2. Quân nhân cần ứng xử thế nào với Nhân dân?
3. Liên hệ trách nhiệm của bản thân.`,
        builtin: true

    },
    {
     id: "ct-bam-10",
      title: "Phòng, chống tham nhũng, lãng phí và tiêu cực",
        category: "Pháp luật và đạo đức",
        description: "Rèn luyện liêm chính, tiết kiệm và trách nhiệm trong công việc.",
         reference_url: "https://chinhphu.vn/?classid=2629&docid=217305&pageid=27160&utm_source=chatgpt.com",
        content: `
I. MỤC ĐÍCH
Nâng cao ý thức tuân thủ pháp luật, thực hành tiết kiệm và phòng ngừa sai phạm.

II. NỘI DUNG HỌC TẬP
1. Sử dụng tài sản, trang thiết bị đúng mục đích.
2. Trung thực trong báo cáo và thực hiện nhiệm vụ.
3. Chấp hành quy định, phản ánh sai phạm qua kênh có thẩm quyền.

III. LIÊN HỆ THỰC TIỄN
Không lãng phí tài sản chung, thực hiện đúng quy trình và chịu trách nhiệm về công việc.

IV. CÂU HỎI ÔN TẬP
1. Lãng phí gây ra những hậu quả gì?
2. Cần làm gì để thực hành tiết kiệm?
3. Bản thân có thể góp phần phòng ngừa tiêu cực như thế nào?`,
        builtin: true

    },
    {
        id: "ct-bam-11",
        title: "Bảo vệ môi trường, xây dựng đơn vị xanh, sạch, đẹp",
        category: "Môi trường và nếp sống",
        description:"Xây dựng ý thức vệ sinh, tiết kiệm và bảo vệ cảnh quan.",
        reference_url: "https://www.qdnd.vn/quoc-phong-an-ninh/tin-tuc/nhung-nguoi-linh-chung-tay-bao-ve-moi-truong-588464?utm_source=chatgpt.com",
        content: `
I. MỤC ĐÍCH
Nâng cao trách nhiệm bảo vệ môi trường và giữ gìn nơi ở, nơi làm việc.

II. NỘI DUNG HỌC TẬP
1. Giữ gìn vệ sinh nơi ở và khu vực làm việc.
2. Tiết kiệm điện, nước và sử dụng vật tư hợp lý.
3. Thu gom, phân loại và xử lý rác theo quy định.

III. LIÊN HỆ THỰC TIỄN
Duy trì vệ sinh hằng ngày, bảo vệ cây xanh và sử dụng tiết kiệm tài sản chung.

IV. CÂU HỎI ÔN TẬP
1. Vì sao cần bảo vệ môi trường?
2. Những hành động nào giúp tiết kiệm tài nguyên?
3. Đề xuất một việc làm xây dựng đơn vị xanh, sạch, đẹp.`,
        builtin: true
    }
];
function layTatCaBaiHocChinhTri() {
    return [...danhSachBaiHocChinhTriMacDinh];
}



/* ==========================================
   BBB11 - THƯ VIỆN LỜI BÁC HỒ DẠY
   VÀ KIẾN THỨC CÁCH MẠNG
   ========================================== */

const danhSachLoiBacBBB11 = [
    {
        title: "Quân đội ta trung với Đảng, hiếu với dân",
        content: "Quân đội nhân dân Việt Nam từ nhân dân mà ra, vì nhân dân mà chiến đấu. Mỗi cán bộ, chiến sĩ cần nêu cao tinh thần trách nhiệm, gắn bó với nhân dân và hoàn thành tốt nhiệm vụ.",
        source: "Tư tưởng Hồ Chí Minh về Quân đội nhân dân Việt Nam",
        category: "Quân đội"
    },
    {
        title: "Đoàn kết là sức mạnh",
        content: "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.",
        source: "Hồ Chí Minh",
        category: "Đoàn kết"
    },
    {
        title: "Thi đua yêu nước",
        content: "Thi đua là yêu nước, yêu nước thì phải thi đua. Những người thi đua là những người yêu nước nhất.",
        source: "Lời kêu gọi thi đua ái quốc, năm 1948",
        category: "Thi đua"
    },
    {
        title: "Cần, kiệm, liêm, chính",
        content: "Mỗi cán bộ, chiến sĩ cần rèn luyện đạo đức, thực hành tiết kiệm, sống giản dị, trung thực, có trách nhiệm và chống lãng phí.",
        source: "Chuyên đề học tập đạo đức Hồ Chí Minh",
        category: "Đạo đức"
    },
    {
        title: "Học tập suốt đời",
        content: "Không ngừng học tập, nâng cao trình độ chính trị, quân sự, chuyên môn; gắn kiến thức với thực tiễn và nhiệm vụ được giao.",
        source: "Nội dung giáo dục, rèn luyện cán bộ, chiến sĩ",
        category: "Học tập"
    },
    {
        title: "Kỷ luật là sức mạnh của quân đội",
        content: "Chấp hành nghiêm điều lệnh, điều lệ, mệnh lệnh và quy định của đơn vị; giữ gìn đoàn kết, thống nhất, bảo đảm an toàn trong huấn luyện và công tác.",
        source: "Chuyên đề giáo dục kỷ luật quân đội",
        category: "Kỷ luật"
    },
    {
        title: "Đoàn kết quân dân",
        content: "Tôn trọng, giúp đỡ và bảo vệ nhân dân; giữ gìn phẩm chất người quân nhân cách mạng; tích cực tham gia các hoạt động giúp dân phù hợp với nhiệm vụ.",
        source: "Chuyên đề công tác dân vận",
        category: "Đoàn kết"
    },
    {
        title: "Đạo đức cách mạng",
        content: "Thường xuyên tu dưỡng, rèn luyện bản thân; đặt trách nhiệm với tập thể lên trên lợi ích cá nhân; kiên quyết đấu tranh với biểu hiện thiếu trách nhiệm và chủ nghĩa cá nhân.",
        source: "Chuyên đề học tập tư tưởng Hồ Chí Minh",
        category: "Đạo đức"
    },
    {
        title: "Tinh thần trách nhiệm",
        content: "Mỗi chiến sĩ cần chủ động trong công việc, thực hiện đúng chức trách, không ngại khó khăn, đoàn kết giúp đỡ đồng đội và hoàn thành nhiệm vụ.",
        source: "Chuyên đề xây dựng phẩm chất người quân nhân",
        category: "Quân đội"
    },
    {
        title: "Tự phê bình và phê bình",
        content: "Thẳng thắn nhìn nhận khuyết điểm, chân thành góp ý trên tinh thần xây dựng, tôn trọng đồng chí và cùng nhau tiến bộ.",
        source: "Chuyên đề xây dựng tổ chức và rèn luyện đảng viên",
        category: "Đạo đức"
    },
    {
        title: "Truyền thống Quân đội nhân dân Việt Nam",
        content: "Ngày 22 tháng 12 năm 1944 là ngày thành lập Đội Việt Nam Tuyên truyền Giải phóng quân, tiền thân của Quân đội nhân dân Việt Nam.",
        source: "Lịch sử Quân đội nhân dân Việt Nam",
        category: "Lịch sử"
    },
    {
        title: "Cách mạng Tháng Tám năm 1945",
        content: "Thắng lợi của Cách mạng Tháng Tám năm 1945 mở ra bước ngoặt lớn trong lịch sử dân tộc, dẫn tới sự ra đời của nước Việt Nam Dân chủ Cộng hòa ngày 2 tháng 9 năm 1945.",
        source: "Lịch sử Việt Nam",
        category: "Lịch sử"
    },
    {
        title: "Chiến thắng Điện Biên Phủ",
        content: "Chiến thắng Điện Biên Phủ ngày 7 tháng 5 năm 1954 là mốc son trong lịch sử đấu tranh giành độc lập dân tộc, thể hiện ý chí và sức mạnh đoàn kết của nhân dân Việt Nam.",
        source: "Lịch sử Việt Nam",
        category: "Lịch sử"
    },
    {
        title: "Ngày Quốc khánh 2 tháng 9",
        content: "Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
        source: "Tuyên ngôn Độc lập năm 1945",
        category: "Lịch sử"
    },
    {
        title: "Phát huy phẩm chất Bộ đội Cụ Hồ",
        content: "Rèn luyện bản lĩnh chính trị, giữ gìn đạo đức, chấp hành kỷ luật, đoàn kết với đồng chí, gần gũi nhân dân và nỗ lực hoàn thành nhiệm vụ.",
        source: "Chuyên đề giáo dục truyền thống quân đội",
        category: "Quân đội"
        
    }
];

/* Video mặc định: dùng mã video YouTube đã có trong dữ liệu cũ.
   Có thể bổ sung video khác bằng cách thêm mã video hợp lệ. */


const danhSachVideoBBB11 = [
    {
        title: "Quân đội ta trung với Đảng, hiếu với dân",
        id: "l9kvarGw-hU",
        category: "Tư tưởng Hồ Chí Minh",
        link: "https://www.youtube.com/watch?v=l9kvarGw-hU"
    },
    {
        title: "Học tập tư tưởng, đạo đức, phong cách Hồ Chí Minh",
        id: "",
        category: "Tư tưởng Hồ Chí Minh",
        link: "https://www.youtube.com/watch?v=HR8wWe6uqGs"
    },
    {
        title: "Lịch sử Quân đội nhân dân Việt Nam",
        id: "",
        category: "Lịch sử quân đội",
        link: "https://www.youtube.com/watch?v=iNiXDtewkrI"
    },
    {
        title: "Truyền thống Bộ đội Cụ Hồ",
        id: "",
        category: "Truyền thống quân đội",
        link: "https://www.youtube.com/watch?v=wnMs4ZhTasM"
    },
    {
        title: "Chiến thắng Điện Biên Phủ",
        id: "",
        category: "Lịch sử cách mạng",
        link: "https://www.youtube.com/watch?v=lp8vODuwq_k"
    },
    {
        title: "Cách mạng Tháng Tám năm 1945",
        id: "",
        category: "Lịch sử cách mạng",
        link: "https://www.youtube.com/watch?v=u7kjhRCfj2o"
    },
    {
        title: "Lịch sử Đảng Cộng sản Việt Nam",
        id: "",
        category: "Lịch sử Đảng",
        link: "https://www.youtube.com/watch?v=7FtGvLISpIk"
    },
    {
        title: "Điều lệnh và kỷ luật quân đội",
        id: "",
        category: "Điều lệnh quân đội",
        link: "https://www.youtube.com/watch?v=OKWf_LwarO8"
    },
    {
        title: "Đoàn kết quân dân",
        id: "",
        category: "Đoàn kết",
        link: "https://www.youtube.com/watch?v=9WziqsYSUgk"
    },
    {
        title: "Thi đua yêu nước",
        id: "",
        category: "Thi đua",
        link: "https://www.youtube.com/watch?v=Q0-0o0Yj0ew"
    },
    {
        title: "Đạo đức cách mạng, cần kiệm liêm chính",
        id: "",
        category: "Đạo đức cách mạng",
        link: "https://www.youtube.com/watch?v=VqIy_YGMw6Q"
    },
    {
        title: "Tự phê bình và tinh thần trách nhiệm",
        id: "",
        category: "Rèn luyện phẩm chất",
        link: "https://www.youtube.com/watch?v=rbFSxuUrEFE"
    },
    {
        title: "Học tập suốt đời",
        id: "",
        category: "Học tập",
        link: "https://www.youtube.com/watch?v=_Us8u92YY3E"
    },
    {
        title: "Các bài hát truyền thống cách mạng",
        id: "",
        category: "Văn hóa văn nghệ",
        link: "https://www.youtube.com/watch?v=38SCCHGYfAo"
    }
];



function bacEscapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

function bacPage() {
    return `
        <div class="page-box bac-library">

            <div class="bac-hero">
                <div class="bac-symbol">★</div>
                <h2>THƯ VIỆN LỜI BÁC HỒ DẠY</h2>
                <p>
                    Học tập tư tưởng, đạo đức, phong cách Hồ Chí Minh;
                    phát huy truyền thống cách mạng, rèn luyện bản lĩnh
                    và phẩm chất người quân nhân.
                </p>
            </div>

            <div class="bac-section">
                <h3>▶ VIDEO HỌC TẬP TRỰC TUYẾN</h3>

                <label for="bacVideoSelect">Chọn video:</label>

                <select id="bacVideoSelect"
                    onchange="chonVideoBacBBB11(this.value)">
                    ${danhSachVideoBBB11.map((video, index) => `
                        <option value="${index}">
                            ${bacEscapeHTML(video.title)}
                        </option>
                    `).join("")}
                </select>

                <div class="bac-video-frame">
                    <iframe
                        id="bacVideoPlayer"
                        src="https://www.youtube-nocookie.com/embed/l9kvarGw-hU"
                        title="Video học tập tư tưởng Hồ Chí Minh"
                        loading="lazy"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                </div>

                <p class="bac-note">
                    Nếu video không phát được, hãy kiểm tra quyền nhúng
                    của video hoặc mở video trực tiếp trên YouTube.
                </p>

            

<div class="bac-video-list">
    <h3>🎵 DANH SÁCH VIDEO VÀ BÀI HÁT</h3>

    ${danhSachVideoBBB11.map((video, index) => `
        <div class="bac-video-item">
            <div class="bac-video-info">
                <strong>${bacEscapeHTML(video.title)}</strong>
                <p>${bacEscapeHTML(video.category)}</p>
            </div>

            <button
                type="button"
                class="bac-youtube-button"
                onclick="phatVideoTrongOBBB11(${index})">
                ▶ Phát ngay tại đây
            </button>
        </div>
    `).join("")}
</div>


            </div>

<div class="bac-section">
    <h3>🎵 NGHE NHẠC CÁCH MẠNG</h3>

    <p>
        Các bài hát truyền thống, khơi dậy tinh thần yêu nước
        và niềm tự hào của người quân nhân.
    </p>

    <a
        class="bac-youtube-button"
        href="https://www.youtube.com/watch?v=7zPT3rR3HAs&list=RD7zPT3rR3HAs&start_radio=1"
        target="_blank"
        rel="noopener noreferrer">
        ▶ Mở bài hát trên YouTube
    </a>
</div>

            <div class="bac-section">
                <h3>📚 KHO LỜI BÁC HỒ DẠY VÀ KIẾN THỨC CÁCH MẠNG</h3>

                <input
                    id="bacSearch"
                    type="search"
                    placeholder="🔍 Tìm lời Bác, lịch sử, kỷ luật..."
                    oninput="hienThiLoiBac()">

                <select id="bacCategory"
                    onchange="hienThiLoiBac()">
                    <option value="">Tất cả chủ đề</option>
                    <option value="Quân đội">Quân đội</option>
                    <option value="Đạo đức">Đạo đức cách mạng</option>
                    <option value="Đoàn kết">Đoàn kết quân dân</option>
                    <option value="Kỷ luật">Kỷ luật</option>
                    <option value="Thi đua">Thi đua yêu nước</option>
                    <option value="Học tập">Học tập</option>
                    <option value="Lịch sử">Lịch sử cách mạng</option>
                </select>

                <div id="bacList"></div>

                <p id="bacEmpty" style="display:none">
                    Không tìm thấy nội dung phù hợp.
                </p>
            </div>

        </div>
    `;
}

function chonVideoBacBBB11(index) {
    const video = danhSachVideoBBB11[Number(index)];
    const player = document.getElementById("bacVideoPlayer");
    const link = document.getElementById("bacYoutubeLink");

    if (!video || !player || !link) return;

    // Chỉ nhận mã video YouTube có định dạng hợp lệ.
    if (!/^[a-zA-Z0-9_-]{11}$/.test(video.id)) return;

    player.src =
        "https://www.youtube-nocookie.com/embed/" + video.id;

    link.href = "https://www.youtube.com/watch?v=" + video.id;
    player.title = video.title;
}

function hienThiLoiBac() {
    const khung = document.getElementById("bacList");
    if (!khung) return;

    const searchElement = document.getElementById("bacSearch");
    const categoryElement = document.getElementById("bacCategory");

    const tuKhoa = (searchElement?.value || "")
        .trim()
        .toLocaleLowerCase("vi");

    const chuDe = categoryElement?.value || "";

    const ketQua = danhSachLoiBacBBB11.filter(item => {
        const noiDung = [
            item.title,
            item.content,
            item.source,
            item.category
        ].join(" ").toLocaleLowerCase("vi");

        return noiDung.includes(tuKhoa) &&
            (!chuDe || item.category === chuDe);
    });

    khung.innerHTML = ketQua.map((item, index) => `
        <article class="bac-card">
            <div class="bac-card-category">
                ${bacEscapeHTML(item.category)}
            </div>

            <h4>${index + 1}. ${bacEscapeHTML(item.title)}</h4>

            <p>${bacEscapeHTML(item.content)}</p>

            <small>
                <strong>Nguồn tham khảo:</strong>
                ${bacEscapeHTML(item.source)}
            </small>
        </article>
    `).join("");

    const empty = document.getElementById("bacEmpty");
    if (empty) {
        empty.style.display = ketQua.length ? "none" : "block";
    }
}

const linkHocTapBBB11 = [
    {
        ten: "▶ Xem video về lời Bác Hồ dạy",
        moTa: "Học tập tư tưởng Hồ Chí Minh",
        link: "https://www.youtube.com/watch?v=l9kvarGw-hU"
    },
    {
        ten: "▶ Tìm hiểu lịch sử Quân đội nhân dân Việt Nam",
        moTa: "Truyền thống vẻ vang của Quân đội",
        link: "https://www.youtube.com/watch?v=iNiXDtewkrI"
    },
    {
        ten: "▶ Học tập truyền thống Bộ đội Cụ Hồ",
        moTa: "Phẩm chất, đạo đức và trách nhiệm người quân nhân",
        link: "https://www.youtube.com/watch?v=rmA7oywKpdI"
    },
    {
        ten: "▶ Tìm hiểu lịch sử Đảng Cộng sản Việt Nam",
        moTa: "Những mốc son lịch sử cách mạng",
        link: "https://www.youtube.com/watch?v=7FtGvLISpIk"
    },
    {
        ten: "▶ Tìm hiểu Chiến thắng Điện Biên Phủ",
        moTa: "Chiến thắng lịch sử ngày 7/5/1954",
        link: "https://www.youtube.com/watch?v=COG1itIE3Rw"
    },
    {
        ten: "▶ Tìm hiểu Cách mạng Tháng Tám năm 1945",
        moTa: "Mốc son giành độc lập dân tộc",
        link: "https://www.youtube.com/watch?v=u7kjhRCfj2o"
    },
    {
        ten: "▶ Học tập điều lệnh và kỷ luật quân đội",
        moTa: "Rèn luyện tác phong, ý thức tổ chức kỷ luật",
        link: "https://www.youtube.com/watch?v=I0PaHFVRKuA"
    },
    {
        ten: "▶ Nghe những bài hát cách mạng",
        moTa: "Các ca khúc truyền thống, khơi dậy tinh thần yêu nước",
        link: "https://www.youtube.com/watch?v=7zPT3rR3HAs&list=RD7zPT3rR3HAs&start_radio=1"
    }
];

function hienThiLinkHocTapBBB11() {
    const khung = document.getElementById("bacLinks");
    if (!khung) return;

    khung.innerHTML = linkHocTapBBB11.map(item => `
        <div class="list-item">
            <h3>${bacEscapeHTML(item.ten)}</h3>
            <p>${bacEscapeHTML(item.moTa)}</p>
            <a class="youtube-button"
               href="${bacEscapeHTML(item.link)}"
               target="_blank"
               rel="noopener noreferrer">
                Mở nội dung ▶
            </a>
        </div>
    `).join("");
}

window.hienThiLinkHocTapBBB11 = hienThiLinkHocTapBBB11;


/* Cho phép các hàm được gọi từ menu và HTML của website. */
window.bacPage = bacPage;
window.hienThiLoiBac = hienThiLoiBac;
window.chonVideoBacBBB11 = chonVideoBacBBB11;



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

function resolutionPage() {
    const danhSach = typeof danhSachNghiQuyetBBB11 !== "undefined"
        ? danhSachNghiQuyetBBB11
        : [];

    const layNam = item => {
        const match = String(item.date || "").match(
            /\d{2}\/\d{2}\/(\d{4})/
        );
        return match ? match[1] : "Chưa xác minh";
    };

    const layChuDe = item => {
        const text = (
            (item.title || "") + " " +
            (item.description || "")
        ).toLowerCase();

        if (/765|1657|1659|huấn luyện|đào tạo/.test(text))
            return "Huấn luyện, giáo dục và đào tạo";

        if (/1652|1656|3488|57-nq\/tw|khoa học|kỹ thuật|công nghệ|chuyển đổi số/.test(text))
            return "Khoa học, kỹ thuật và công nghệ";

        if (/1658|1661|hậu cần|tài chính/.test(text))
            return "Hậu cần, tài chính";

        if (/847|676|1161|76\/ct-bqp|bộ đội cụ hồ|tư tưởng|kỷ luật/.test(text))
            return "Chính trị, tư tưởng và kỷ luật";

        if (/29-nq\/tw|30-nq\/tw|31-nq\/tw|đại hội.*xiii|xây dựng đảng|hệ thống chính trị/.test(text))
            return "Xây dựng Đảng và hệ thống chính trị";

        if (/05-nq\/tw|44-nq\/tw|quốc phòng|bảo vệ tổ quốc|quân sự/.test(text))
            return "Quân sự, quốc phòng và bảo vệ Tổ quốc";

        return "Văn bản khác, đang xác minh";
    };

    const danhSachGop = [];
    const daGap = new Set();

    danhSach.forEach(item => {
        const khoa = (item.title || "").trim().toLowerCase();

        if (!khoa || daGap.has(khoa)) return;

        daGap.add(khoa);
        danhSachGop.push({
            ...item,
            nam: layNam(item),
            chuDe: layChuDe(item)
        });
    });

    const cacNam = [...new Set(danhSachGop.map(item => item.nam))]
        .sort((a, b) => b.localeCompare(a));

    const cacChuDe = [...new Set(danhSachGop.map(item => item.chuDe))];

    return `
        <div class="page-box">
            <h2>📚 HỌC TẬP NGHỊ QUYẾT BBB11</h2>

            <p>
                Tra cứu tài liệu theo năm ban hành
                và chủ đề học tập chính trị.
            </p>

            <div class="notice-card">
                <h3>🎖️ MỤC ĐÍCH HỌC TẬP</h3>
                <p>
                    Nâng cao nhận thức chính trị, tư tưởng,
                    trách nhiệm và ý thức chấp hành nhiệm vụ.
                </p>
            </div>

            <h3>🔎 PHÂN LOẠI TÀI LIỆU</h3>

            <div style="display:flex;gap:12px;flex-wrap:wrap;margin:15px 0">
                <select id="locNamNQ"
                    onchange="locHienThiNghiQuyetBBB11()"
                    style="padding:10px;max-width:100%">
                    <option value="Tất cả">Tất cả các năm</option>
                    ${cacNam.map(nam =>
                        `<option value="${escapeHTML(nam)}">${escapeHTML(nam)}</option>`
                    ).join("")}
                </select>

                <select id="locChuDeNQ"
                    onchange="locHienThiNghiQuyetBBB11()"
                    style="padding:10px;max-width:100%">
                    <option value="Tất cả">Tất cả chủ đề</option>
                    ${cacChuDe.map(chuDe =>
                        `<option value="${escapeHTML(chuDe)}">${escapeHTML(chuDe)}</option>`
                    ).join("")}
                </select>
            </div>

            <p id="demNghiQuyetBBB11"></p>
            <div id="resolutionList"></div>
        </div>
    `;
}

function locHienThiNghiQuyetBBB11() {
    const danhSach = typeof danhSachNghiQuyetBBB11 !== "undefined"
        ? danhSachNghiQuyetBBB11
        : [];

    const namChon = document.getElementById("locNamNQ")?.value || "Tất cả";
    const chuDeChon = document.getElementById("locChuDeNQ")?.value || "Tất cả";
    const noiHienThi = document.getElementById("resolutionList");

    if (!noiHienThi) return;

    function layNam(item) {
        const match = String(item.date || "").match(
            /\d{2}\/\d{2}\/(\d{4})/
        );
        return match ? match[1] : "Chưa xác minh";
    }

    function layChuDe(item) {
        const text = (
            (item.title || "") + " " +
            (item.description || "")
        ).toLowerCase();

        if (/765|1657|1659|huấn luyện|đào tạo/.test(text))
            return "Huấn luyện, giáo dục và đào tạo";
        if (/1652|1656|3488|57-nq\/tw|khoa học|kỹ thuật|công nghệ|chuyển đổi số/.test(text))
            return "Khoa học, kỹ thuật và công nghệ";
        if (/1658|1661|hậu cần|tài chính/.test(text))
            return "Hậu cần, tài chính";
        if (/847|676|1161|76\/ct-bqp|bộ đội cụ hồ|tư tưởng|kỷ luật/.test(text))
            return "Chính trị, tư tưởng và kỷ luật";
        if (/29-nq\/tw|30-nq\/tw|31-nq\/tw|đại hội.*xiii|xây dựng đảng|hệ thống chính trị/.test(text))
            return "Xây dựng Đảng và hệ thống chính trị";
        if (/05-nq\/tw|44-nq\/tw|quốc phòng|bảo vệ tổ quốc|quân sự/.test(text))
            return "Quân sự, quốc phòng và bảo vệ Tổ quốc";

        return "Văn bản khác, đang xác minh";
    }

    const daGap = new Set();

    const ketQua = danhSach.filter(item => {
        const khoa = (item.title || "").trim().toLowerCase();

        if (!khoa || daGap.has(khoa)) return false;
        daGap.add(khoa);

        return (namChon === "Tất cả" || layNam(item) === namChon) &&
            (chuDeChon === "Tất cả" || layChuDe(item) === chuDeChon);
    });

    document.getElementById("demNghiQuyetBBB11").textContent =
        "Có " + ketQua.length + " tài liệu phù hợp.";

    noiHienThi.innerHTML = ketQua.map((item, index) => `
        <div class="list-item">
            <h3>${index + 1}. ${escapeHTML(item.title || "Chưa có tiêu đề")}</h3>
            <p><b>Năm ban hành:</b> ${escapeHTML(layNam(item))}</p>
            <p><b>Phân loại:</b> ${escapeHTML(layChuDe(item))}</p>
            <p>${escapeHTML(item.description || "")}</p>
            ${item.url ? `
                <a href="${escapeHTML(item.url)}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="action-button"
                   style="display:inline-block;text-decoration:none">
                    📖 XEM TÀI LIỆU
                </a>
            ` : "<p>Chưa có đường dẫn tài liệu.</p>"}
        </div>
    `).join("") || "<p>Không có tài liệu phù hợp.</p>";
}


// =============================================
// KHO HỌC TẬP NGHỊ QUYẾT BBB11
// =============================================

const danhSachNghiQuyetBBB11 = [
 {
    title: "Chỉ thị số 676-CT/QUTW về tăng cường lãnh đạo, chỉ đạo phát huy giá trị văn hóa Bộ đội Cụ Hồ thời kỳ mới",
    date: "20/06/2026",
    agency: "Ban Thường vụ Quân ủy Trung ương",
    description: "Tăng cường lãnh đạo, chỉ đạo phát huy giá trị văn hóa Bộ đội Cụ Hồ trong thời kỳ mới.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Giữ gìn và phát huy giá trị văn hóa Bộ đội Cụ Hồ.
    - Tăng cường giáo dục chính trị, tư tưởng cho cán bộ, chiến sĩ.
    - Xây dựng phẩm chất đạo đức, lối sống trong sáng.
    - Phát huy tinh thần trách nhiệm, ý chí tự lực, tự cường.
    - Xây dựng môi trường văn hóa quân sự lành mạnh.
    - Gắn phát huy phẩm chất Bộ đội Cụ Hồ với thực hiện nhiệm vụ.
    - Kiên quyết đấu tranh với những biểu hiện suy thoái về đạo đức, lối sống.
    `,
    url: "https://tapchiqptd.vn/vi/chuyen-luan-chi-dao/nang-cao-hieu-qua-cong-tac-tu-tuong-trong-quan-doi-thoi-ky-moi/26797.html?utm_source=chatgpt.com"
  },
   {
    title: "Chỉ thị số 1161-CT/QUTW về tăng cường lãnh đạo, chỉ đạo công tác quản lý tư tưởng, chấp hành kỷ luật, pháp luật trong toàn quân",
    date: "03/11/2026",
    agency: "Ban Thường vụ Quân ủy Trung ương",
    description: "Tăng cường công tác quản lý tư tưởng, chấp hành kỷ luật, pháp luật trong toàn quân.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Tăng cường sự lãnh đạo, chỉ đạo của cấp ủy, chỉ huy các cấp.
    - Chủ động nắm bắt và quản lý tình hình tư tưởng bộ đội.
    - Kịp thời định hướng tư tưởng và giải quyết các vấn đề phát sinh.
    - Nâng cao ý thức chấp hành pháp luật Nhà nước, kỷ luật Quân đội.
    - Phát huy vai trò, trách nhiệm của cán bộ chủ trì.
    - Tăng cường xây dựng chính quy, duy trì nghiêm kỷ luật.
    - Chủ động phòng ngừa vi phạm và bảo đảm an toàn trong đơn vị.
    - Xây dựng cơ quan, đơn vị vững mạnh toàn diện.
    `,
    url: "https://www.qdnd.vn/?utm_source=chatgpt.com"
  },
   {
    title: "Nghị quyết số 31-NQ/TW về tăng cường xây dựng, chỉnh đốn Đảng và hệ thống chính trị",
    date: "15/10/2026",
    agency: "Ban Chấp hành Trung ương Đảng",
    description: "Tăng cường xây dựng, chỉnh đốn Đảng và hệ thống chính trị trong sạch, vững mạnh toàn diện, đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Tăng cường xây dựng, chỉnh đốn Đảng trong sạch, vững mạnh.
    - Nâng cao năng lực lãnh đạo và sức chiến đấu của tổ chức Đảng.
    - Chủ động phòng ngừa suy thoái về tư tưởng chính trị, đạo đức, lối sống.
    - Kiên quyết đấu tranh phòng, chống tham nhũng, lãng phí, tiêu cực.
    - Tăng cường kiểm soát quyền lực và trách nhiệm giải trình.
    - Phát huy vai trò giám sát của Nhân dân.
    - Xây dựng đội ngũ cán bộ, đảng viên có phẩm chất và năng lực.
    `,
    url: "https://www.qdnd.vn/quoc-phong-an-ninh/tin-tuc/cu-the-hoa-nghi-quyet-trung-uong-4-khoa-xiv-bang-ke-hoach-chuong-trinh-hanh-dong-thiet-thuc-hieu-qua-phu-hop-voi-chuc-nang-nhiem-vu-quan-doi-1061589"
  },
  {
    title: "Nghị quyết số 29-NQ/TW về tiếp tục đổi mới, hoàn thiện phương thức lãnh đạo, cầm quyền của Đảng",
    date: "15/10/2026",
    agency: "Ban Chấp hành Trung ương Đảng",
    description: "Tiếp tục đổi mới phương thức lãnh đạo, cầm quyền của Đảng trong kỷ nguyên mới, nâng cao hiệu quả hoạt động của hệ thống chính trị.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Đổi mới phương thức lãnh đạo và cầm quyền của Đảng.
    - Nâng cao chất lượng xây dựng và tổ chức thực hiện nghị quyết.
    - Phát huy vai trò, trách nhiệm của cấp ủy và người đứng đầu.
    - Tăng cường công tác kiểm tra, giám sát.
    - Đẩy mạnh cải cách hành chính và chuyển đổi số trong Đảng.
    - Phát huy dân chủ, trách nhiệm và tính chủ động của các tổ chức.
    - Nâng cao hiệu lực, hiệu quả hoạt động của hệ thống chính trị.
    `,
    url: "https://www.qdnd.vn/quoc-phong-an-ninh/tin-tuc/cu-the-hoa-nghi-quyet-trung-uong-4-khoa-xiv-bang-ke-hoach-chuong-trinh-hanh-dong-thiet-thuc-hieu-qua-phu-hop-voi-chuc-nang-nhiem-vu-quan-doi-1061589https://www.qdnd.vn/chinh-tri/cac-van-de/bo-chinh-tri-ban-hanh-chuong-trinh-hanh-dong-thuc-hien-ba-nghi-quyet-ve-xay-dung-dang-1060883"
  },
  {
    title: "Nghị quyết số 30-NQ/TW về tiếp tục xây dựng đội ngũ cán bộ các cấp",
    date: "15/10/2026",
    agency: "Ban Chấp hành Trung ương Đảng",
    description: "Tiếp tục xây dựng đội ngũ cán bộ các cấp và đổi mới căn bản, toàn diện công tác cán bộ, đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Xây dựng đội ngũ cán bộ có phẩm chất chính trị, đạo đức và năng lực.
    - Đổi mới căn bản, toàn diện công tác cán bộ.
    - Nâng cao chất lượng đánh giá, quy hoạch và đào tạo cán bộ.
    - Tăng cường trách nhiệm nêu gương của cán bộ lãnh đạo.
    - Kiểm soát quyền lực trong công tác cán bộ.
    - Kiên quyết phòng, chống chạy chức, chạy quyền.
    - Xây dựng đội ngũ cán bộ đáp ứng yêu cầu nhiệm vụ trong tình hình mới.
    `,
    url: "https://www.qdnd.vn/chinh-tri/cac-van-de/bo-chinh-tri-ban-hanh-chuong-trinh-hanh-dong-thuc-hien-ba-nghi-quyet-ve-xay-dung-dang-1060883"
  },
  {
    title: "Chỉ thị số 76/CT-BQP về tăng cường công tác giáo dục chính trị, quản lý tư tưởng, duy trì kỷ luật và bảo đảm an toàn trong Quân đội nhân dân Việt Nam",
    date: "28/04/2026",
    agency: "Bộ trưởng Bộ Quốc phòng",
    description: "Tăng cường giáo dục chính trị, quản lý tư tưởng, duy trì kỷ luật và bảo đảm an toàn trong toàn quân.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Nâng cao chất lượng công tác giáo dục chính trị.
    - Tăng cường quản lý và định hướng tư tưởng bộ đội.
    - Duy trì nghiêm nền nếp chính quy, chấp hành kỷ luật.
    - Nâng cao ý thức chấp hành pháp luật Nhà nước.
    - Phát huy trách nhiệm của cấp ủy, chỉ huy và cán bộ quản lý.
    - Chủ động phát hiện, ngăn ngừa các nguy cơ mất an toàn.
    - Tăng cường kiểm tra, giám sát việc thực hiện nhiệm vụ.
    - Xây dựng đơn vị vững mạnh toàn diện, an toàn.
    `,
    url: "https://tapchiqptd.vn/vi/chuyen-luan-chi-dao/nang-cao-hieu-qua-cong-tac-tu-tuong-trong-quan-doi-thoi-ky-moi/26797.html?utm_source=chatgpt.com"
 },



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
        url: "https://tapchiqptd.vn/vi/quan-triet-thuc-hien-nghi-quyet/quan-doan-2-tap-trung-lanh-dao-thuc-hien-nghi-quyet-so-847nqqutw-cua-quan-uy-trung-uong/18677.html?utm_source=chatgpt.com"
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
        url: "https://tapchiqptd.vn/vi/dua-nghi-quyet-cua-dang-vao-cuoc-song/ve-to-chuc-xay-dung-quan-doi-giai-doan-2021-2030-theo-dinh-huong-cua-dang/20093.html?utm_source=chatgpt.com"
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
        url: "https://tapchiqptd.vn/vi/bao-ve-to-quoc/chu-truong-giai-phap-dot-pha-nang-cao-chat-luong-hieu-qua-cong-tac-nghien-cuu-khoa-hoc-quan-su/20094.html?utm_source=chatgpt.com"
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
        url: "https://www.qdnd.vn/chinh-tri/tin-tuc/dang-uy-binh-doan-15-quan-triet-trien-khai-thuc-hien-cac-nghi-quyet-cua-quan-uy-trung-uong-721057"
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
        url: "https://tapchiqptd.vn/vi/quan-triet-thuc-hien-nghi-quyet/quan-triet-nghi-quyet-so-1657nqqutw-hoc-vien-phong-khong-khong-quan-doi-moi-cong-tac-giao-/22259.html?utm_source=chatgpt.com"
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
        url: "https://www.qdnd.vn/quoc-phong-an-ninh/xay-dung-quan-doi/p/238"
    },
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
        url: "https://tapchiqptd.vn/vi/quan-triet-thuc-hien-nghi-quyet/quan-doan-2-tap-trung-lanh-dao-thuc-hien-nghi-quyet-so-847nqqutw-cua-quan-uy-trung-uong/18677.html?utm_source=chatgpt.com"
    },
     
   
 

  {
    title: "Nghị quyết Đại hội đại biểu toàn quốc lần thứ XIII của Đảng",
    date: "01/02/2021",
    agency: "Đại hội đại biểu toàn quốc lần thứ XIII của Đảng",
    description: "Định hướng phát triển đất nước, xây dựng Đảng và hệ thống chính trị trong sạch, vững mạnh; phát huy sức mạnh đại đoàn kết toàn dân tộc.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Kiên định mục tiêu độc lập dân tộc gắn liền với chủ nghĩa xã hội.
    - Tăng cường xây dựng, chỉnh đốn Đảng và hệ thống chính trị.
    - Phát huy sức mạnh đại đoàn kết toàn dân tộc.
    - Đẩy mạnh phát triển kinh tế, văn hóa, xã hội.
    - Kết hợp chặt chẽ nhiệm vụ xây dựng và bảo vệ Tổ quốc.
    - Xây dựng nền quốc phòng toàn dân và thế trận an ninh nhân dân.
    - Phấn đấu thực hiện các mục tiêu phát triển đất nước đến năm 2030 và tầm nhìn 2045.
    `,
    url: "https://tulieuvankien.dangcongsan.vn/?utm_source=chatgpt.com"
  },
  {
    title: "Nghị quyết số 847-NQ/QUTW về phát huy phẩm chất Bộ đội Cụ Hồ",
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
    url: "https://tulieuvankien.dangcongsan.vn/?utm_source=chatgpt.com"
  },
  {
    title: "Nghị quyết số 765-NQ/QUTW về nâng cao chất lượng huấn luyện trong tình hình mới",
    date: "20/12/2012",
    agency: "Quân ủy Trung ương",
    description: "Định hướng nâng cao chất lượng huấn luyện quân sự, giáo dục chính trị và khả năng sẵn sàng chiến đấu của Quân đội trong tình hình mới.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Nâng cao chất lượng huấn luyện chiến đấu.
    - Đổi mới nội dung, chương trình và phương pháp huấn luyện.
    - Kết hợp huấn luyện với giáo dục chính trị.
    - Tăng cường huấn luyện làm chủ vũ khí, trang bị kỹ thuật.
    - Xây dựng chính quy, rèn luyện kỷ luật.
    - Nâng cao trình độ, năng lực của đội ngũ cán bộ huấn luyện.
    - Gắn huấn luyện với yêu cầu nhiệm vụ và thực tiễn đơn vị.
    `,
    url: "https://tapchiqptd.vn/vi/chuyen-luan-chi-dao/phat-huy-ket-qua-10-nam-thuc-hien-nghi-quyet-so-765nqqutw-toan-quan-tiep-tuc-doi-moi-sang-/19787.html?utm_source=chatgpt.com"
  },
 
  {
    title: "Nghị quyết số 224/2025/QH15",
    date: "Chưa xác minh",
    agency: "Quốc hội nước Cộng hòa xã hội chủ nghĩa Việt Nam",
    description: "Văn bản thuộc hệ thống nghị quyết của Quốc hội khóa XV; cần đối chiếu toàn văn để xác định chính xác nội dung và phạm vi áp dụng.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Tìm hiểu mục tiêu và phạm vi điều chỉnh của nghị quyết.
    - Nghiên cứu các nhiệm vụ và giải pháp được đề ra.
    - Nắm vững trách nhiệm của các cơ quan, tổ chức liên quan.
    - Tìm hiểu yêu cầu tổ chức triển khai thực hiện.
    - Liên hệ trách nhiệm cá nhân trong thực hiện chủ trương, chính sách.
    `,
    url: "https://vanban.chinhphu.vn/?classid=1&docid=214384&pageid=27160&utm_source=chatgpt.com"
  },
  {
    title: "Quyết định số 3089/QĐ-TLĐ của Đoàn Chủ tịch Tổng Liên đoàn Lao động Việt Nam",
    date: "Chưa xác minh",
    agency: "Đoàn Chủ tịch Tổng Liên đoàn Lao động Việt Nam",
    description: "Văn bản liên quan đến các chính sách hỗ trợ người lao động trong bối cảnh dịch bệnh và hoạt động sản xuất tại doanh nghiệp.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Tìm hiểu chủ trương chăm lo, bảo vệ quyền lợi người lao động.
    - Nghiên cứu các chính sách hỗ trợ người lao động.
    - Phát huy vai trò của tổ chức công đoàn tại cơ sở.
    - Quan tâm điều kiện làm việc và đời sống người lao động.
    - Tăng cường trách nhiệm của doanh nghiệp và tổ chức công đoàn.
    - Thực hiện các quy định về hỗ trợ theo đúng đối tượng và điều kiện.
    `,
    url: "https://congdoanvietnam.vn/"
  },
  {
    title: "Nghị quyết về nhiệm vụ quân sự, quốc phòng",
    date: "Tùy theo văn bản cụ thể",
    agency: "Quân ủy Trung ương / Bộ Quốc phòng",
    description: "Định hướng thực hiện nhiệm vụ quân sự, quốc phòng, xây dựng Quân đội và bảo vệ vững chắc Tổ quốc.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Quán triệt đường lối, quan điểm của Đảng về quốc phòng.
    - Nâng cao chất lượng tổng hợp và sức mạnh chiến đấu của Quân đội.
    - Xây dựng nền quốc phòng toàn dân vững mạnh.
    - Kết hợp phát triển kinh tế - xã hội với củng cố quốc phòng.
    - Chủ động nắm chắc tình hình, không để bị động, bất ngờ.
    - Nâng cao tinh thần cảnh giác và trách nhiệm bảo vệ Tổ quốc.
    - Xây dựng đơn vị vững mạnh toàn diện.
    `,
    url: "https://www.qdnd.vn/?utm_source=chatgpt.com"
  },
  {
    title: "Văn kiện và nghị quyết của Đảng",
    date: "Theo từng văn bản",
    agency: "Ban Chấp hành Trung ương Đảng và các cơ quan có thẩm quyền",
    description: "Hệ thống văn kiện, nghị quyết và tài liệu chính thức phục vụ nghiên cứu, học tập và quán triệt đường lối, chủ trương của Đảng.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Nghiên cứu chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh.
    - Nắm vững đường lối, chủ trương của Đảng.
    - Tìm hiểu các nghị quyết, chỉ thị và kết luận của Trung ương.
    - Nâng cao nhận thức chính trị và tư tưởng.
    - Vận dụng nội dung văn kiện vào thực tiễn công tác.
    - Tăng cường trách nhiệm của cán bộ, đảng viên.
    `,
    url: "https://mod.gov.vn/?utm_source=chatgpt.com"
  },
  {
    title: "Tài liệu tuyên truyền, giáo dục chính trị trong Quân đội",
    date: "Theo từng tài liệu",
    agency: "Bộ Quốc phòng và các cơ quan chính trị trong Quân đội",
    description: "Tài liệu phục vụ công tác giáo dục chính trị, tư tưởng, xây dựng bản lĩnh chính trị và phẩm chất đạo đức cho cán bộ, chiến sĩ.",
    content: `
    NỘI DUNG HỌC TẬP:

    - Giáo dục truyền thống vẻ vang của Quân đội nhân dân Việt Nam.
    - Nâng cao bản lĩnh chính trị cho cán bộ, chiến sĩ.
    - Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh.
    - Phát huy phẩm chất Bộ đội Cụ Hồ.
    - Chấp hành nghiêm pháp luật Nhà nước và kỷ luật Quân đội.
    - Xây dựng đoàn kết nội bộ và đoàn kết quân dân.
    - Nâng cao tinh thần trách nhiệm trong thực hiện nhiệm vụ.
    `,
    url: "https://tulieuvankien.dangcongsan.vn/?utm_source=chatgpt.com"
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
        url: "https://hcmcpv.org.vn/tin-tuc/dang-uy-quan-khu-7-quan-triet-trien-khai-thuc-hien-cac-nghi-quyet-cua-quan-uy-trung-uong-1491905850?utm_source=chatgpt.com"
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
        url: "https://tapchiqptd.vn/vi/bao-ve-to-quoc/chu-truong-giai-phap-dot-pha-nang-cao-chat-luong-hieu-qua-cong-tac-nghien-cuu-khoa-hoc-quan-su/20094.html?utm_source=chatgpt.com"
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
        url: "https://tapchiqptd.vn/vi/bao-ve-to-quoc/chu-truong-giai-phap-dot-pha-nang-cao-chat-luong-hieu-qua-cong-tac-nghien-cuu-khoa-hoc-quan-su/20094.html?utm_source=chatgpt.com"
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
        url: "https://tapchiqptd.vn/vi/bao-ve-to-quoc/chu-truong-giai-phap-dot-pha-nang-cao-chat-luong-hieu-qua-cong-tac-nghien-cuu-khoa-hoc-quan-su/20094.html?utm_source=chatgpt.com"
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
        url: "https://tapchiqptd.vn/vi/bao-ve-to-quoc/chu-truong-giai-phap-dot-pha-nang-cao-chat-luong-hieu-qua-cong-tac-nghien-cuu-khoa-hoc-quan-su/20094.html?utm_source=chatgpt.com"
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
        url: "https://tapchiqptd.vn/vi/chuyen-luan-chi-dao/trien-khai-thuc-hien-co-hieu-qua-cong-tac-tai-chinh-quan-doi-nam-2025/23781.html?utm_source=chatgpt.com"
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
        url: "https://tapchiqptd.vn/vi/quan-triet-thuc-hien-nghi-quyet/nhung-noi-dung-co-ban-cua-nghi-quyet-trung-uong-8-khoa-xiii-ve-chien-luoc-bao-ve-to-quoc-t/21360.html?utm_source=chatgpt.com"
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
        url: "https://baochinhphu.vn/nghi-quyet-so-57-tu-tam-nhin-den-hanh-dong-de-tang-toc-trong-ky-nguyen-so-102241227194540796.htm?utm_source=chatgpt.com"
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
        url: "https://tapchiqptd.vn/vi/quan-triet-thuc-hien-nghi-quyet/binh-chung-thong-tin-lien-lac-day-manh-thuc-hien-nghi-quyet-so-1659-cua-quan-uy-trung-uong/23767.html?utm_source=chatgpt.com"
    },
];

function layNamNghiQuyetBBB11(vanBan) {
    const ngay = (vanBan.date || "").match(/\d{2}\/\d{2}\/(\d{4})/);
    return ngay ? ngay[1] : "Chưa xác minh";
}

function layChuDeNghiQuyetBBB11(vanBan) {
    const noiDung = (
        (vanBan.title || "") + " " +
        (vanBan.description || "")
    ).toLowerCase();

    if (/765|1657|1659|huấn luyện|đào tạo/.test(noiDung))
        return "Huấn luyện, giáo dục và đào tạo";

    if (/1652|1656|3488|57-nq\/tw|khoa học|kỹ thuật|công nghệ/.test(noiDung))
        return "Khoa học, kỹ thuật và công nghệ";

    if (/1658|1661|hậu cần|tài chính/.test(noiDung))
        return "Hậu cần, tài chính";

    if (/847|676|1161|76\/ct-bqp|bộ đội cụ hồ|tư tưởng|kỷ luật/.test(noiDung))
        return "Chính trị, tư tưởng và kỷ luật";

    if (/29-nq\/tw|30-nq\/tw|31-nq\/tw|đại hội.*xiii|xây dựng đảng|hệ thống chính trị/.test(noiDung))
        return "Xây dựng Đảng và hệ thống chính trị";

    if (/05-nq\/tw|44-nq\/tw|quốc phòng|bảo vệ tổ quốc/.test(noiDung))
        return "Quân sự, quốc phòng và bảo vệ Tổ quốc";

    return "Văn bản khác, đang xác minh";
}

function locNghiQuyetBBB11(nam, chuDe) {
    return danhSachNghiQuyetBBB11.filter(function(vanBan) {
        const dungNam = !nam || nam === "Tất cả" ||
            layNamNghiQuyetBBB11(vanBan) === nam;

        const dungChuDe = !chuDe || chuDe === "Tất cả" ||
            layChuDeNghiQuyetBBB11(vanBan) === chuDe;

        return dungNam && dungChuDe;
    });
}



 // =============================================
 // GIAO DIỆN TRANG NGHỊ QUYẾT
 // =============================================




/* =========================================
   HỌC TẬP NGHỊ QUYẾT BBB11
========================================= */

let nghiQuyetDangXemBBB11 = 0;

window.resolutionPage = function () {
    return `
        <div class="page-box resolution-app">

            <h2>📚 HỌC TẬP NGHỊ QUYẾT BBB11</h2>

            <p>
                Kho học tập nghị quyết, chỉ thị và văn kiện
                phục vụ giáo dục chính trị tại đơn vị.
            </p>

            <div class="notice-card">
                <h3>🎖️ MỤC ĐÍCH HỌC TẬP</h3>
                <p>
                    Nâng cao nhận thức chính trị, trách nhiệm,
                    phẩm chất đạo đức và ý thức chấp hành kỷ luật.
                </p>
            </div>

            <h3>📖 DANH SÁCH NGHỊ QUYẾT</h3>

            <div id="resolutionList"></div>

            <div class="resolution-reader-card">

                <h3 id="resolutionReaderTitle">
                    📖 KHUNG ĐỌC TÀI LIỆU
                </h3>

                <p id="resolutionReaderDescription">
                    Chọn nghị quyết để xem nội dung học tập.
                </p>

                <div id="resolutionReaderContent">
                    <p>Vui lòng chọn một tài liệu ở danh sách bên trên.</p>
                </div>

                <div class="resolution-reader-actions">

                    <button class="action-button"
                        onclick="taiLaiNghiQuyet()">
                        🔄 TẢI LẠI
                    </button>

                    <button class="action-button"
                        onclick="moNghiQuyetBenNgoai()">
                        🌐 MỞ VĂN BẢN GỐC
                    </button>

                </div>

                <iframe
                    id="resolutionReader"
                    title="Khung đọc nghị quyết"
                    src="about:blank"
                    loading="lazy"
                    style="width:100%;height:650px;border:1px solid #ddd;border-radius:8px;margin-top:15px;">
                </iframe>

                <p id="resolutionReaderNote">
                    Nếu website nguồn chặn nhúng, bạn vẫn có thể
                    đọc phần nội dung học tập tóm tắt ở phía trên.
                </p>

            </div>
        </div>
    
    <div class="resolution-web-box">
    <h3>🌐 XEM TÀI LIỆU TRỰC TIẾP</h3>

    <iframe
        id="resolutionWebFrame"
        src="about:blank"
        title="Nội dung nghị quyết"
        style="
            width: 100%;
            height: 650px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background: white;
        "
        loading="lazy">
    </iframe>

    <p id="resolutionWebNote">
        Chọn nghị quyết để xem tài liệu tại đây.
    </p>
</div>
`;
};


/* =========================================
   HIỂN THỊ DANH SÁCH NGHỊ QUYẾT
========================================= */

window.hienThiTaiLieuNghiQuyet = function () {
    const list = document.getElementById("resolutionList");

    if (!list) return;

    if (!Array.isArray(danhSachNghiQuyetBBB11)) {
        list.innerHTML = "<p>Không tìm thấy dữ liệu nghị quyết.</p>";
        return;
    }

    list.innerHTML = danhSachNghiQuyetBBB11.map((item, index) => `
        <div class="list-item">
            <h3>${index + 1}. ${escapeHTML(item.title)}</h3>

            <p><strong>Ngày ban hành:</strong>
                ${escapeHTML(item.date || "Chưa cập nhật")}
            </p>

            <p><strong>Cơ quan:</strong>
                ${escapeHTML(item.agency || "Chưa cập nhật")}
            </p>

            <p>${escapeHTML(item.description || "")}</p>

            <button class="action-button"
                onclick="chonNghiQuyetBBB11(${index})">
                📖 XEM NỘI DUNG
            </button>
        </div>
    `).join("");
};



/* =========================================
   CHỌN NGHỊ QUYẾT ĐỂ ĐỌC
========================================= */

window.chonNghiQuyetBBB11 = function (index) {
    const item = danhSachNghiQuyetBBB11[index];

    if (!item) {
        alert("Không tìm thấy nghị quyết!");
        return;
    }

    nghiQuyetDangXemBBB11 = index;

    // Hiển thị tiêu đề
    const title = document.getElementById("resolutionReaderTitle");
    const description = document.getElementById("resolutionReaderDescription");
    const content = document.getElementById("resolutionReaderContent");

    if (title) {
        title.textContent = item.title || "Nghị quyết";
    }

    if (description) {
        description.textContent = item.description || "";
    }

    if (content) {
        content.textContent =
            item.content || "Chưa có nội dung văn bản được lưu.";
    }

    // Hiển thị đường link trực tiếp trong trang
    const frame = document.getElementById("resolutionWebFrame");
    const note = document.getElementById("resolutionWebNote");

    if (frame) {
        if (item.url) {
            frame.src = item.url;

            if (note) {
                note.textContent =
                    "Đang thử tải tài liệu. Nếu không hiển thị, website nguồn có thể chặn khung xem trực tiếp.";
            }
        } else {
            frame.src = "about:blank";

            if (note) {
                note.textContent = "Nghị quyết này chưa có đường link tài liệu.";
            }
        }
    }

    // Hiện khu vực đọc nghị quyết nếu đang bị ẩn
    const reader = document.getElementById("resolutionReader");

    if (reader) {
        reader.style.display = "block";
        reader.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
};


/* =========================================
   TẢI LẠI NGHỊ QUYẾT
========================================= */

window.taiLaiNghiQuyet = function () {
    chonNghiQuyetBBB11(nghiQuyetDangXemBBB11);
};


/* =========================================
   MỞ VĂN BẢN GỐC
========================================= */

window.moNghiQuyetBenNgoai = function () {
    const item = danhSachNghiQuyetBBB11[nghiQuyetDangXemBBB11];

    if (!item || !item.url) {
        alert("Tài liệu chưa có đường dẫn!");
        return;
    }

    window.open(item.url, "_blank", "noopener,noreferrer");
};


// =============================================
// HIỂN THỊ TOÀN BỘ NGHỊ QUYẾT
// =============================================

window.hienThiTaiLieuNghiQuyet = function () {
    const khung = document.getElementById("resolutionList");

    if (!khung) return;

    if (!Array.isArray(danhSachNghiQuyetBBB11)) {
        khung.textContent = "Không tìm thấy dữ liệu nghị quyết.";
        return;
    }

    khung.innerHTML = danhSachNghiQuyetBBB11.map((item, index) => `
        <div class="list-item resolution-card">
            <h3>${index + 1}. 📘 ${escapeHTML(item.title || "")}</h3>

            <p><strong>Ngày ban hành:</strong>
                ${escapeHTML(item.date || "Chưa cập nhật")}
            </p>

            <p><strong>Cơ quan:</strong>
                ${escapeHTML(item.agency || "Chưa cập nhật")}
            </p>

            <p><strong>Trích yếu:</strong>
                ${escapeHTML(item.description || "")}
            </p>

            <button
                type="button"
                class="action-button"
                onclick="window.chonNghiQuyetBBB11(${index})">
                📖 XEM NỘI DUNG
            </button>
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

/* =========================================
   TRANG QUẢN LÝ THÀNH VIÊN BBB11
   ========================================= */


function membersPage() {
    return `
        <div class="page-box">
            <h2>👥 QUẢN LÝ THÀNH VIÊN BBB11</h2>

            <div class="form-group">
                <label for="tvHoTen">Họ và tên thành viên *</label>
                <input
                    type="text"
                    id="tvHoTen"
                    placeholder="Nhập họ và tên thành viên"
                    required
                >
            </div>

            <div class="form-group">
                <label for="ma_so">Mã số thành viên *</label>
                <input
                    type="text"
                    id="ma_so"
                    name="ma_so"
                    placeholder="Ví dụ: BBB11-001"
                    required
                >
            </div>

            <div class="form-group">
                <label for="tvTrungDoi">Trung đội *</label>
                <input
                    type="text"
                    id="tvTrungDoi"
                    placeholder="Nhập trung đội"
                    required
                >
            </div>

            <button
                type="button"
                class="action-button"
                onclick="themThanhVien()">
                ➕ Thêm thành viên
            </button>

            <hr>

            <input
                type="search"
                id="timThanhVien"
                placeholder="Tìm theo họ tên hoặc trung đội"
                oninput="timKiemThanhVienBBB11()"
            >

            <div id="danhSachThanhVien">
                Đang tải danh sách thành viên...
            </div>
        </div>
    `;
}


/* ==========================================
   BBB11 - KHO TÀNG ÂM NHẠC QUÂN ĐỘI
   ========================================== */
(function () {
    "use strict";

    // Dán link YouTube của từng bài vào thuộc tính link.
    // Ví dụ: link: "https://www.youtube.com/watch?v=MA_VIDEO_ID"

    const BAI_HAT_QUAN_DOI = [
        { ten: "Vì nhân dân quên mình", nhom: "Nhạc quân đội", link: "https://www.youtube.com/watch?v=-SNck1Oc6PM&list=RD-SNck1Oc6PM&start_radio=1" },
        { ten: "Tiến bước dưới quân kỳ", nhom: "Nhạc hành khúc", link: "https://www.youtube.com/watch?v=XlhBEHQ-Vrc&list=RDXlhBEHQ-Vrc&start_radio=1" },
        { ten: "Hát mãi khúc quân hành", nhom: "Nhạc quân đội", link: "https://www.youtube.com/watch?v=WhmT-eMT9mY&list=RDWhmT-eMT9mY&start_radio=1" },
        { ten: "Màu áo chú bộ đội", nhom: "Nhạc về người lính", link: "https://www.youtube.com/watch?v=hAqIT4Qks8o&list=RDhAqIT4Qks8o&start_radio=1" },
        { ten: "Bác đang cùng chúng cháu hành quân", nhom: "Nhạc cách mạng", link: "https://www.youtube.com/watch?v=6ZLlLhHRg48&list=RD6ZLlLhHRg48&start_radio=1" },
        { ten: "Đường chúng ta đi", nhom: "Nhạc cách mạng", link: "https://www.youtube.com/watch?v=fxcuE6g7vLw&list=RDfxcuE6g7vLw&start_radio=1" },
        { ten: "Trường Sơn Đông Trường Sơn Tây", nhom: "Nhạc cách mạng", link:" https://www.youtube.com/watch?v=lY6w0Z8Hm9c&list=RDlY6w0Z8Hm9c&start_radio=1" },
        { ten: "Cô gái mở đường", nhom: "Nhạc cách mạng", link: "https://www.youtube.com/watch?v=TrGz8VOrWwQ&list=RDTrGz8VOrWwQ&start_radio=1" },
        { ten: "Năm anh em trên một chiếc xe tăng", nhom: "Nhạc hành khúc", link: "https://www.youtube.com/watch?v=MyoBKVQofb8&utm_source=chatgpt.com" },
        { ten: "Tiếng chày trên sóc Bom Bo", nhom: "Nhạc cách mạng", link: "https://www.youtube.com/watch?v=88V3DwJP8KU&list=RD88V3DwJP8KU&start_radio=1" },
        { ten: "Đất nước trọn niềm vui", nhom: "Nhạc cách mạng", link: "https://www.youtube.com/watch?v=lT4gYpIHdr4&list=RDlT4gYpIHdr4&start_radio=1" },
        { ten: "Như có Bác Hồ trong ngày vui đại thắng", nhom: "Nhạc cách mạng", link: "https://www.youtube.com/watch?v=KdW-JHLHpQQ&list=RDKdW-JHLHpQQ&start_radio=1" },
        { ten: "Tổ quốc gọi tên mình", nhom: "Nhạc về Tổ quốc", link: "https://www.youtube.com/watch?v=Nw65sK9VfYU&list=RDNw65sK9VfYU&start_radio=1" },
        { ten: "Giai điệu Tổ quốc", nhom: "Nhạc về Tổ quốc", link: "https://www.youtube.com/watch?v=M2eZUv9ckJg&list=RDM2eZUv9ckJg&start_radio=1" },
        { ten: "Khúc quân ca Trường Sa", nhom: "Nhạc về người lính", link: "https://www.youtube.com/watch?v=J3tONLXI5Oo&list=RDJ3tONLXI5Oo&start_radio=1" },
        { ten: "Hành khúc ngày và đêm", nhom: "Nhạc hành khúc", link: "https://www.youtube.com/watch?v=IrripNEcYco&list=RDIrripNEcYco&start_radio=1" },
        { ten: "Chào em cô gái Lam Hồng", nhom: "Nhạc cách mạng", link: "https://www.youtube.com/watch?v=XRaQrYkdXxo&list=RDXRaQrYkdXxo&start_radio=1" },
        { ten: "Tiến quân ca", nhom: "Quốc ca", link: "https://www.youtube.com/watch?v=CqC-QMjgsmo&list=RDCqC-QMjgsmo&start_radio=1" },
        { ten: "Thanh niên làm theo lời Bác", nhom: "Sinh hoạt tập thể", link: "https://www.youtube.com/watch?v=nqejlZymL6Y&list=RDnqejlZymL6Y&start_radio=1" },
        { ten: "Lên đàng", nhom: "Sinh hoạt tập thể", link: "https://www.youtube.com/watch?v=IftlbxhKb3I&list=RDIftlbxhKb3I&start_radio=1" }
    ];

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (c) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[c];
        });
    }

    function layVideoId(link) {
        try {
            const url = new URL(link);
            const host = url.hostname.replace(/^www\./, "");
            let id = "";

            if (host === "youtu.be") {
                id = url.pathname.split("/").filter(Boolean)[0] || "";
            } else if (
                ["youtube.com", "m.youtube.com",
                 "music.youtube.com", "youtube-nocookie.com"].includes(host)
            ) {
                if (url.pathname === "/watch") {
                    id = url.searchParams.get("v") || "";
                } else {
                    const match = url.pathname.match(
                        /^\/(?:embed|shorts|live)\/([^/?]+)/
                    );
                    if (match) id = match[1];
                }
            }

            return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : "";
        } catch (e) {
            return "";
        }
    }

    let baiDangPhat = -1;

    window.musicPage = function () {
        const cards = BAI_HAT_QUAN_DOI.map((bai, index) => `
            <article class="bbb11-music-item"
                data-search="${escapeHTML((bai.ten + " " + bai.nhom).toLocaleLowerCase("vi"))}">
                <div class="bbb11-track-number">${String(index + 1).padStart(2, "0")}</div>
                <div class="bbb11-track-icon">♫</div>
                <div class="bbb11-track-info">
                    <h4>${escapeHTML(bai.ten)}</h4>
                    <p>${escapeHTML(bai.nhom)}</p>
                </div>
                <button class="bbb11-play-btn"
                    onclick="window.phatBaiHatBBB11(${index})">
                    ▶ NGHE NGAY
                </button>
            </article>
        `).join("");

        return `
        <div class="page-box bbb11-music-app">
            <section class="bbb11-music-hero">
                <div class="bbb11-hero-symbol">♫</div>
                <div class="bbb11-hero-text">
                    <span class="bbb11-music-label">★ HỆ THỐNG BBB11 ★</span>
                    <h2>KHO TÀNG<br><span>ÂM NHẠC QUÂN ĐỘI</span></h2>
                    <p>Giai điệu người lính · Tự hào Tổ quốc · Vững bước quân hành</p>
                </div>
            </section>

            <section class="bbb11-player-panel">
                <div class="bbb11-player-heading">
                    <div>
                        <span class="bbb11-small-label">TRÌNH PHÁT ÂM NHẠC</span>
                        <h3>🎧 Đang phát</h3>
                        <p id="bbb11NowPlaying">Chọn một bài hát bên dưới để bắt đầu</p>
                    </div>
                    <span class="bbb11-live-indicator">● BBB11</span>
                </div>

                <div class="bbb11-video-wrap">
                    <iframe id="bbb11MusicPlayer"
                        src="about:blank"
                        title="Trình phát âm nhạc BBB11"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="bbb11-player-footer">
                    <span>♫ Âm nhạc truyền thống và cách mạng</span>
                    <button onclick="window.xoaNhacBBB11()">■ DỪNG NHẠC</button>
                </div>
            </section>

            <section class="bbb11-library">
                <div class="bbb11-library-heading">
                    <div>
                        <span class="bbb11-small-label">THƯ VIỆN ÂM NHẠC</span>
                        <h3>🎖️ Danh sách bài hát</h3>
                        <p>Chọn bài hát để nghe trực tiếp trên trang</p>
                    </div>
                    <span class="bbb11-song-count">${BAI_HAT_QUAN_DOI.length} BÀI HÁT</span>
                </div>

                <div class="bbb11-library-search">
                    <span>⌕</span>
                    <input id="bbb11MusicSearch" type="search"
                        placeholder="Tìm tên bài hát, thể loại..."
                        oninput="window.locBaiHatBBB11()">
                </div>

                <div id="bbb11MusicList" class="bbb11-music-list">
                    ${cards}
                </div>
                <p id="bbb11NoMusic" class="bbb11-no-music" hidden>
                    Không tìm thấy bài hát phù hợp.
                </p>
            </section>
        </div>`;
    };

    window.phatBaiHatBBB11 = function (index) {
        const bai = BAI_HAT_QUAN_DOI[index];
        if (!bai) return;

        const id = layVideoId(bai.link);

        if (!id) {
            alert(
                'Bài "' + bai.ten + '" chưa có link YouTube hợp lệ.\n\n' +
                'Hãy điền link video vào thuộc tính link của bài hát trong mảng BAI_HAT_QUAN_DOI.'
            );
            return;
        }

        const player = document.getElementById("bbb11MusicPlayer");
        const title = document.getElementById("bbb11NowPlaying");

        if (!player) {
            alert("Không tìm thấy trình phát. Hãy mở lại trang Âm nhạc.");
            return;
        }

        baiDangPhat = index;
        player.src = "https://www.youtube-nocookie.com/embed/" +
            id + "?autoplay=1&rel=0";

        if (title) title.textContent = bai.ten;

        document.querySelectorAll(".bbb11-music-item").forEach((card, i) => {
            card.classList.toggle("is-playing", i === index);
        });

        player.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    window.locBaiHatBBB11 = function () {
        const input = document.getElementById("bbb11MusicSearch");
        const list = document.getElementById("bbb11MusicList");
        const empty = document.getElementById("bbb11NoMusic");

        if (!input || !list) return;

        const keyword = input.value.trim().toLocaleLowerCase("vi");
        let visible = 0;

        list.querySelectorAll(".bbb11-music-item").forEach(card => {
            const show = card.dataset.search.includes(keyword);
            card.hidden = !show;
            if (show) visible++;
        });

        if (empty) empty.hidden = visible !== 0;
    };

    window.xoaNhacBBB11 = function () {
        const player = document.getElementById("bbb11MusicPlayer");
        const title = document.getElementById("bbb11NowPlaying");

        if (player) player.src = "about:blank";
        if (title) title.textContent = "Chọn một bài hát bên dưới để bắt đầu";

        baiDangPhat = -1;
        document.querySelectorAll(".bbb11-music-item").forEach(card => {
            card.classList.remove("is-playing");
        });
    };
  
/* =========================================
   TÀI LIỆU BBB11
   Thay link mẫu bằng link thật của bạn
   ========================================= */

const TAI_LIEU_BBB11 = {
    thanhvien: [
        {
            ten: "Danh sách thành viên BBB11",
            url: "DAN_LINK_TAI_LIEU_THANH_VIEN_VAO_DAY"
        }
    ],

    taikhoan: [
        {
            ten: "Tài liệu tài khoản BBB11",
            url: "DAN_LINK_TAI_LIEU_TAI_KHOAN_VAO_DAY"
        }
    ]
};

function taiTaiLieuBBB11(loai, index) {
    const danhSach = TAI_LIEU_BBB11[loai];

    if (!Array.isArray(danhSach) || !danhSach[index]) {
        alert("Không tìm thấy tài liệu.");
        return;
    }

    const taiLieu = danhSach[index];

    try {
        const url = new URL(taiLieu.url);

        if (url.protocol !== "https:") {
            alert("Đường link phải bắt đầu bằng https://");
            return;
        }

        window.open(url.href, "_blank", "noopener,noreferrer");
    } catch (error) {
        alert("Link tài liệu chưa hợp lệ. Vui lòng kiểm tra lại.");
        console.error(error);
    }
}

function hienThiLinkTaiLieuBBB11(loai, idPhanTu) {
    const noiDung = document.getElementById(idPhanTu);

    if (!noiDung) return;

    const danhSach = TAI_LIEU_BBB11[loai];

    if (!Array.isArray(danhSach) || danhSach.length === 0) {
        noiDung.textContent = "Chưa có tài liệu.";
        return;
    }

    noiDung.innerHTML = danhSach.map((taiLieu, index) => {
        const ten = String(taiLieu.ten || "Tài liệu")
            .replace(/[&<>"']/g, kyTu => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[kyTu]);

        return `
            <p>
                <button
                    type="button"
                    class="action-button"
                    onclick="taiTaiLieuBBB11('${loai}', ${index})">
                    📄 ${ten}
                </button>
            </p>
        `;
    }).join("");
}

function taiTaiLieuBBB11(loai, index) {
    const danhSach = TAI_LIEU_BBB11[loai];

    if (!Array.isArray(danhSach) || !danhSach[index]) {
        alert("Không tìm thấy tài liệu.");
        return;
    }

    const taiLieu = danhSach[index];

    // Riêng nghị quyết: hiển thị trong trang BBB11
    if (loai === "nghiQuyet" || loai === "resolution") {
        if (typeof window.chonNghiQuyetBBB11 === "function") {
            window.chonNghiQuyetBBB11(index);
        } else {
            alert("Chưa tìm thấy chức năng đọc nghị quyết trong trang.");
        }
        return;
    }

    // Các loại tài liệu khác vẫn mở liên kết như cũ
    try {
        const url = new URL(taiLieu.url);

        if (url.protocol !== "https:") {
            alert("Đường link phải bắt đầu bằng https://");
            return;
        }

        window.open(url.href, "_blank", "noopener,noreferrer");
    } catch (error) {
        alert("Link tài liệu chưa hợp lệ. Vui lòng kiểm tra lại.");
        console.error(error);
    }
}


function hienThiLinkTaiLieuBBB11(loai, idPhanTu) {
    const noiDung = document.getElementById(idPhanTu);
    if (!noiDung) return;

    const danhSach = TAI_LIEU_BBB11[loai];

    if (!Array.isArray(danhSach) || danhSach.length === 0) {
        noiDung.textContent = "Chưa có tài liệu.";
        return;
    }

    noiDung.innerHTML = danhSach.map((taiLieu, index) => {
        const ten = String(taiLieu.ten || "Tài liệu")
            .replace(/[&<>"']/g, kyTu => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[kyTu]);

        const loaiAnToan = String(loai).replace(/[^a-zA-Z0-9_-]/g, "");

        return `
            <div class="tai-lieu-item">
                <p>${ten}</p>
                <button
                    type="button"
                    class="action-button"
                    onclick="taiTaiLieuBBB11('${loaiAnToan}', ${index})">
                    📄 MỞ TÀI LIỆU
                </button>
            </div>
        `;
    }).join("");
}

// ===============================
// THƯ VIỆN ẢNH
// ===============================
function loadGallery() {
    const gallery = document.getElementById("gallery");

    if (!gallery) return;

    gallery.innerHTML = `
        <div class="page-box">
            <h2>THƯ VIỆN ẢNH BBB11</h2>
            <p>Chưa có hình ảnh được tải lên.</p>
        </div>
    `;
}


// ===============================
// TÀI LIỆU BBB11
// ===============================
function hienThiLinkTaiLieuBBB11() {
    const container = document.getElementById("taiLieuBBB11");

    if (!container) return;

    container.innerHTML = `
        <div class="page-box">
            <h2>TÀI LIỆU ĐẠI ĐỘI 11</h2>

            <p>Danh sách tài liệu BBB11.</p>

            <a href="DAN_LINK_GOOGLE_DRIVE"
               target="_blank"
               class="action-button">
                XEM TÀI LIỆU
            </a>
        </div>
    `;
}


// ===============================
// XỬ LÝ TRANG
// ===============================
function xuLyTrang() {
    console.log("Trang đã được tải thành công!");
}

function phatVideoTrongOBBB11(index) {
    const video = danhSachVideoBBB11[index];
    const player = document.getElementById("bacVideoPlayer");
    const link = document.getElementById("bacYoutubeLink");

    if (!video || !player) return;

    let videoId = video.id || "";
    let playlistId = "";

    try {
        const url = new URL(video.link);

        videoId = url.searchParams.get("v") || videoId;
        playlistId = url.searchParams.get("list") || "";

        if (url.hostname === "youtu.be") {
            videoId = url.pathname.slice(1) || videoId;
        }
    } catch (error) {
        console.error("Đường dẫn YouTube không hợp lệ:", error);
    }

    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        if (playlistId) {
            player.src =
                "https://www.youtube-nocookie.com/embed/videoseries?list=" +
                encodeURIComponent(playlistId);
        } else {
            alert("Bài này chưa có đường dẫn video hợp lệ.");
            return;
        }
    } else {
        player.src =
            "https://www.youtube-nocookie.com/embed/" +
            videoId +
            (playlistId
                ? "?list=" + encodeURIComponent(playlistId) + "&autoplay=1"
                : "?autoplay=1");
    }

    player.title = video.title;

    if (link) {
        link.href = video.link;
        link.textContent = "▶ Mở video trên YouTube";
    }

    player.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

window.phatVideoTrongOBBB11 = phatVideoTrongOBBB11;


})();
