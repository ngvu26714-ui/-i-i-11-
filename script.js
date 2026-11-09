// =====================================
// BBB11 - ĐẠI ĐỘI 11
// JAVASCRIPT
// =====================================

// Hiển thị lời chào
console.log("BBB11 - ĐẠI ĐỘI 11");

// Lấy tên người dùng
let tenNguoiDung = localStorage.getItem("bbb11_user");

if (!tenNguoiDung) {
    tenNguoiDung = prompt("Nhập họ và tên của bạn:");

    if (!tenNguoiDung || !tenNguoiDung.trim()) {
        tenNguoiDung = "Chiến sĩ";
    }

    localStorage.setItem("bbb11_user", tenNguoiDung);
}

// Hiển thị tên người dùng
document.addEventListener("DOMContentLoaded", function () {

    const user = document.getElementById("userName");

    if (user) {
        user.textContent = tenNguoiDung.toUpperCase();
    }

    console.log("Website BBB11 đã sẵn sàng!");
});

// Hàm quay về trang chủ
function showHome() {

    const home = document.getElementById("homePage");
    const page = document.getElementById("functionPage");

    if (home) home.classList.remove("hidden");

    if (page) page.classList.add("hidden");
}

// Hàm hiển thị thông báo
function thongBao(noiDung) {
    alert(noiDung);
}

// =====================================
// KẾT THÚC BƯỚC 1
// =====================================

// =====================================
// BƯỚC 2: ĐIỀU HƯỚNG BBB11 - ĐÃ SỬA
// =====================================

// Hàm chống lỗi khi hiển thị dữ liệu HTML
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Tên người dùng hiện tại
let currentUser = tenNguoiDung;

// Danh sách tên trang
const danhSachTrang = {
    admin: "BẢNG ĐIỀU KHIỂN",
    members: "QUẢN LÝ THÀNH VIÊN",
    accounts: "QUẢN LÝ TÀI KHOẢN",
    attendance: "QUẢN LÝ ĐIỂM DANH",
    activities: "QUẢN LÝ HOẠT ĐỘNG",
    reports: "BÁO CÁO THỐNG KÊ",
    manual: "CẨM NANG NGƯỜI LÍNH",
    resolution: "HỌC TẬP NGHỊ QUYẾT",
    news: "ĐỌC BÁO VÀ NGHE TIN",
    music: "KHO TÀNG ÂM NHẠC",
    quiz: "KIỂM TRA TRẮC NGHIỆM",
    education: "GIÁO DỤC CHÍNH TRỊ",
    bac: "LỜI BÁC HỒ DẠY",
    question: "MỖI TUẦN MỘT CÂU HỎI",
    score: "CHẤM ĐIỂM THI ĐUA",
    ranking: "BẢNG XẾP HẠNG",
    notice: "BẢNG TIN ĐẠI ĐỘI 11"
};

// Tên hàm tương ứng với từng trang
const pageFunctions = {
    admin: "adminPage",
    members: "membersPage",
    accounts: "accountsPage",
    attendance: "attendancePage",
    activities: "activitiesPage",
    reports: "reportsPage",
    manual: "manualPage",
    resolution: "resolutionPage",
    news: "newsPage",
    music: "musicPage",
    quiz: "quizPage",
    education: "educationPage",
    bac: "bacPage",
    question: "questionPage",
    score: "scorePage",
    ranking: "rankingPage",
    notice: "noticePage"
};

// Hiển thị trang chủ
function showHome() {
    const home = document.getElementById("homePage");
    const page = document.getElementById("functionPage");

    if (home) home.classList.remove("hidden");
    if (page) page.classList.add("hidden");

    window.scrollTo(0, 0);
}

// Hiển thị trang chức năng
function showPage(tenTrang) {

    // Đồng bộ tên trang
    if (tenTrang === "bác") tenTrang = "bac";

    const home = document.getElementById("homePage");
    const page = document.getElementById("functionPage");
    const content = document.getElementById("pageContent");

    if (!home || !page || !content) {
        alert("Không tìm thấy khu vực hiển thị trang!");
        return;
    }

    if (!danhSachTrang[tenTrang]) {
        alert("Trang không tồn tại!");
        return;
    }

    // Ẩn trang chủ
    home.classList.add("hidden");

    // Hiện trang chức năng
    page.classList.remove("hidden");

    // Lấy hàm hiển thị tương ứng
    const tenHam = pageFunctions[tenTrang];
    const hamHienThi = window[tenHam];

    if (typeof hamHienThi === "function") {

        content.innerHTML = hamHienThi();

    } else {

        content.innerHTML = `
            <div class="page-box">
                <h2>${escapeHTML(danhSachTrang[tenTrang])}</h2>
                <p>Chức năng đang được hoàn thiện.</p>
            </div>
        `;
    }

    // Đánh dấu menu đang chọn
    document.querySelectorAll(".sidebar button").forEach(button => {
        button.classList.remove("active");
    });

    window.scrollTo(0, 0);
}

// Thông báo
function thongBao(noiDung) {
    alert(noiDung);
}

// =====================================
// KẾT THÚC BƯỚC 2
// =====================================

// =====================================
// BƯỚC 3: CẨM NANG NGƯỜI LÍNH
// =====================================

// Lấy danh sách tài liệu
function layTaiLieu() {
    return JSON.parse(
        localStorage.getItem("bbb11_tailieu") || "[]"
    );
}

// Lưu danh sách tài liệu
function luuTaiLieu(data) {
    localStorage.setItem(
        "bbb11_tailieu",
        JSON.stringify(data)
    );
}

// Hiển thị trang cẩm nang
function manualPage() {

    const danhSach = layTaiLieu();

    return `
        <div class="page-box">

            <h2>📘 CẨM NANG NGƯỜI LÍNH</h2>

            <p>Thư viện tài liệu Đại đội 11</p>

            <input
                type="text"
                id="tenTaiLieu"
                placeholder="Nhập tên tài liệu"
            >

            <textarea
                id="noiDungTaiLieu"
                placeholder="Nhập nội dung tài liệu..."
            ></textarea>

            <button onclick="themTaiLieu()">
                ➕ Thêm tài liệu
            </button>

            <h3>Danh sách tài liệu</h3>

            <div id="danhSachTaiLieu">

                ${danhSach.map((item, index) => `
                    <div class="list-item">

                        <h3>${escapeHTML(item.ten)}</h3>

                        <button onclick="xemTaiLieu(${index})">
                            Xem nội dung
                        </button>

                        <button onclick="xoaTaiLieu(${index})">
                            Xóa
                        </button>

                    </div>
                `).join("")}

                ${danhSach.length === 0
                    ? "<p>Chưa có tài liệu nào.</p>"
                    : ""
                }

            </div>

            <div id="chiTietTaiLieu"></div>

        </div>
    `;
}

// Thêm tài liệu
function themTaiLieu() {

    const ten = document
        .getElementById("tenTaiLieu")
        .value.trim();

    const noiDung = document
        .getElementById("noiDungTaiLieu")
        .value.trim();

    if (!ten || !noiDung) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const danhSach = layTaiLieu();

    danhSach.push({
        ten: ten,
        noiDung: noiDung,
        ngayTao: new Date().toLocaleDateString("vi-VN")
    });

    luuTaiLieu(danhSach);

    showPage("manual");

    alert("Đã thêm tài liệu thành công!");
}

// Xem nội dung
function xemTaiLieu(index) {

    const danhSach = layTaiLieu();
    const item = danhSach[index];

    if (!item) return;

    document.getElementById("chiTietTaiLieu").innerHTML = `
        <div class="list-item">

            <h3>${escapeHTML(item.ten)}</h3>

            <p>${escapeHTML(item.noiDung).replace(/\n/g, "<br>")}</p>

            <small>Ngày tạo: ${escapeHTML(item.ngayTao)}</small>

        </div>
    `;
}

// Xóa tài liệu
function xoaTaiLieu(index) {

    if (!confirm("Bạn có chắc muốn xóa tài liệu này?")) {
        return;
    }

    const danhSach = layTaiLieu();

    danhSach.splice(index, 1);

    luuTaiLieu(danhSach);

    showPage("manual");

    alert("Đã xóa tài liệu!");
}

// =====================================
// KẾT THÚC BƯỚC 3
// =====================================

// =====================================
// BƯỚC 4: HỌC TẬP NGHỊ QUYẾT
// =====================================

// Lấy danh sách nghị quyết
function layNghiQuyet() {
    return JSON.parse(
        localStorage.getItem("bbb11_nghiquyet") || "[]"
    );
}

// Lưu nghị quyết
function luuNghiQuyet(data) {
    localStorage.setItem(
        "bbb11_nghiquyet",
        JSON.stringify(data)
    );
}

// Hiển thị trang nghị quyết
function resolutionPage() {

    const danhSach = layNghiQuyet();

    return `
        <div class="page-box">

            <h2>📜 HỌC TẬP NGHỊ QUYẾT</h2>

            <p>Thư viện học tập nghị quyết Đại đội 11</p>

            <input
                type="text"
                id="tenNghiQuyet"
                placeholder="Nhập tên nghị quyết"
            >

            <textarea
                id="noiDungNghiQuyet"
                placeholder="Nhập nội dung nghị quyết..."
            ></textarea>

            <button onclick="themNghiQuyet()">
                ➕ Thêm nghị quyết
            </button>

            <h3>Danh sách nghị quyết</h3>

            <div>
                ${danhSach.map((item, index) => `
                    <div class="list-item">

                        <h3>${escapeHTML(item.ten)}</h3>

                        <button onclick="xemNghiQuyet(${index})">
                            Xem nội dung
                        </button>

                        <button onclick="xoaNghiQuyet(${index})">
                            Xóa
                        </button>

                    </div>
                `).join("")}

                ${danhSach.length === 0
                    ? "<p>Chưa có nghị quyết nào.</p>"
                    : ""
                }
            </div>

            <div id="chiTietNghiQuyet"></div>

        </div>
    `;
}

// Thêm nghị quyết
function themNghiQuyet() {

    const ten = document
        .getElementById("tenNghiQuyet")
        .value.trim();

    const noiDung = document
        .getElementById("noiDungNghiQuyet")
        .value.trim();

    if (!ten || !noiDung) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const danhSach = layNghiQuyet();

    danhSach.push({
        ten: ten,
        noiDung: noiDung,
        ngayTao: new Date().toLocaleDateString("vi-VN")
    });

    luuNghiQuyet(danhSach);

    showPage("resolution");

    alert("Đã thêm nghị quyết thành công!");
}

// Xem nghị quyết
function xemNghiQuyet(index) {

    const danhSach = layNghiQuyet();
    const item = danhSach[index];

    if (!item) return;

    document.getElementById("chiTietNghiQuyet").innerHTML = `
        <div class="list-item">

            <h3>${escapeHTML(item.ten)}</h3>

            <p>${escapeHTML(item.noiDung).replace(/\n/g, "<br>")}</p>

            <small>Ngày tạo: ${escapeHTML(item.ngayTao)}</small>

        </div>
    `;
}

// Xóa nghị quyết
function xoaNghiQuyet(index) {

    if (!confirm("Bạn có chắc muốn xóa nghị quyết này?")) {
        return;
    }

    const danhSach = layNghiQuyet();

    danhSach.splice(index, 1);

    luuNghiQuyet(danhSach);

    showPage("resolution");

    alert("Đã xóa nghị quyết!");
}

// =====================================
// KẾT THÚC BƯỚC 4
// =====================================

// =====================================
// BƯỚC 5: ĐỌC BÁO VÀ NGHE TIN
// =====================================

function newsPage() {

    const danhSachBao = [
        {
            ten: "Báo Quân đội nhân dân",
            moTa: "Tin tức quốc phòng, quân sự và đời sống",
            link: "https://www.qdnd.vn",
            icon: "🪖"
        },
        {
            ten: "Báo Nhân Dân",
            moTa: "Tin tức chính trị, xã hội",
            link: "https://nhandan.vn",
            icon: "📰"
        },
        {
            ten: "Cổng thông tin Chính phủ",
            moTa: "Thông tin chỉ đạo và điều hành",
            link: "https://baochinhphu.vn",
            icon: "🏛️"
        },
        {
            ten: "Đài Truyền hình Việt Nam",
            moTa: "Tin tức và chương trình truyền hình",
            link: "https://vtv.vn",
            icon: "📺"
        },
        {
            ten: "Đài Tiếng nói Việt Nam",
            moTa: "Tin tức phát thanh và âm thanh",
            link: "https://vov.vn",
            icon: "📻"
        }
    ];

    return `
        <div class="page-box">

            <h2>📰 ĐỌC BÁO VÀ NGHE TIN</h2>

            <p>
                Cập nhật thông tin chính thống,
                nâng cao kiến thức mỗi ngày.
            </p>

            <div class="news-list">

                ${danhSachBao.map(bao => `
                    <div class="list-item">

                        <h3>
                            ${bao.icon}
                            ${bao.ten}
                        </h3>

                        <p>${bao.moTa}</p>

                        <a href="${bao.link}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="action-button">
                            Truy cập ngay →
                        </a>

                    </div>
                `).join("")}

            </div>

        </div>
    `;
}

// =====================================
// KẾT THÚC BƯỚC 5
// =====================================

// =====================================
// BƯỚC 6: KHO TÀNG ÂM NHẠC
// =====================================

// Lấy danh sách bài hát
function layDanhSachNhac() {
    return JSON.parse(
        localStorage.getItem("bbb11_amnhac") || "[]"
    );
}

// Lưu danh sách bài hát
function luuDanhSachNhac(data) {
    localStorage.setItem(
        "bbb11_amnhac",
        JSON.stringify(data)
    );
}

// Hiển thị kho âm nhạc
function musicPage() {

    const danhSach = layDanhSachNhac();

    return `
        <div class="page-box">

            <h2>🎵 KHO TÀNG ÂM NHẠC</h2>

            <p>Âm nhạc và tinh thần Đại đội 11</p>

            <input
                type="text"
                id="tenBaiHat"
                placeholder="Nhập tên bài hát"
            >

            <input
                type="url"
                id="linkBaiHat"
                placeholder="Dán đường dẫn MP3"
            >

            <button onclick="themBaiHat()">
                ➕ Thêm bài hát
            </button>

            <h3>🎧 Danh sách bài hát</h3>

            <div>
                ${danhSach.map((item, index) => `
                    <div class="list-item">

                        <h3>${escapeHTML(item.ten)}</h3>

                        <audio controls preload="none"
                            src="${escapeHTML(item.link)}">
                        </audio>

                        <br>

                        <button onclick="xoaBaiHat(${index})">
                            🗑️ Xóa bài hát
                        </button>

                    </div>
                `).join("")}

                ${danhSach.length === 0
                    ? "<p>Chưa có bài hát nào.</p>"
                    : ""
                }
            </div>

        </div>
    `;
}

// Thêm bài hát
function themBaiHat() {

    const ten = document
        .getElementById("tenBaiHat")
        .value.trim();

    const link = document
        .getElementById("linkBaiHat")
        .value.trim();

    if (!ten || !link) {
        alert("Vui lòng nhập tên và đường dẫn bài hát!");
        return;
    }

    try {
        const url = new URL(link);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("Đường dẫn không hợp lệ");
        }
    } catch {
        alert("Đường dẫn bài hát không hợp lệ!");
        return;
    }

    const danhSach = layDanhSachNhac();

    danhSach.push({
        ten: ten,
        link: link
    });

    luuDanhSachNhac(danhSach);

    showPage("music");

    alert("Đã thêm bài hát thành công!");
}

// Xóa bài hát
function xoaBaiHat(index) {

    if (!confirm("Bạn có chắc muốn xóa bài hát này?")) {
        return;
    }

    const danhSach = layDanhSachNhac();

    danhSach.splice(index, 1);

    luuDanhSachNhac(danhSach);

    showPage("music");

    alert("Đã xóa bài hát!");
}

// =====================================
// KẾT THÚC BƯỚC 6
// =====================================

// =====================================
// BƯỚC 7: KIỂM TRA TRẮC NGHIỆM
// =====================================

// Ngân hàng câu hỏi
const nganHangCauHoi = [
    {
        cauHoi: "Điều gì tạo nên sức mạnh của một tập thể?",
        dapAn: [
            "Đoàn kết",
            "Chia rẽ",
            "Thiếu trách nhiệm",
            "Thờ ơ"
        ],
        dapAnDung: 0
    },
    {
        cauHoi: "Trong học tập cần có thái độ như thế nào?",
        dapAn: [
            "Qua loa",
            "Nghiêm túc",
            "Thụ động",
            "Không quan tâm"
        ],
        dapAnDung: 1
    },
    {
        cauHoi: "Biểu hiện của tinh thần trách nhiệm là gì?",
        dapAn: [
            "Trốn tránh nhiệm vụ",
            "Đổ lỗi cho người khác",
            "Hoàn thành nhiệm vụ được giao",
            "Không phối hợp"
        ],
        dapAnDung: 2
    },
    {
        cauHoi: "Ý nghĩa của việc chấp hành kỷ luật?",
        dapAn: [
            "Gây mất đoàn kết",
            "Giúp tập thể hoạt động hiệu quả",
            "Không có ý nghĩa",
            "Làm giảm trách nhiệm"
        ],
        dapAnDung: 1
    },
    {
        cauHoi: "Một tập thể vững mạnh cần những yếu tố nào?",
        dapAn: [
            "Đoàn kết, kỷ luật, trách nhiệm",
            "Thiếu phối hợp",
            "Thiếu tinh thần học tập",
            "Không có mục tiêu"
        ],
        dapAnDung: 0
    },
    {
        cauHoi: "Khi đồng đội gặp khó khăn nên làm gì?",
        dapAn: [
            "Thờ ơ",
            "Phê phán",
            "Quan tâm và giúp đỡ",
            "Bỏ mặc"
        ],
        dapAnDung: 2
    },
    {
        cauHoi: "Tác phong của người quân nhân cần có?",
        dapAn: [
            "Tùy tiện",
            "Nghiêm túc, chính quy",
            "Thiếu trách nhiệm",
            "Chủ quan"
        ],
        dapAnDung: 1
    },
    {
        cauHoi: "Học tập thường xuyên giúp chúng ta?",
        dapAn: [
            "Nâng cao kiến thức",
            "Lãng phí thời gian",
            "Giảm trách nhiệm",
            "Không có tác dụng"
        ],
        dapAnDung: 0
    },
    {
        cauHoi: "Tinh thần tập thể được thể hiện qua?",
        dapAn: [
            "Ích kỷ",
            "Chỉ quan tâm bản thân",
            "Phối hợp và hỗ trợ nhau",
            "Thiếu đoàn kết"
        ],
        dapAnDung: 2
    },
    {
        cauHoi: "Đại đội BBB11 hướng tới điều gì?",
        dapAn: [
            "Thiếu kỷ luật",
            "Đoàn kết, trách nhiệm, hoàn thành tốt nhiệm vụ",
            "Thiếu tinh thần học tập",
            "Hoạt động riêng lẻ"
        ],
        dapAnDung: 1
    }
];

// Biến lưu câu trả lời
let dapAnNguoiDung = [];

// Hiển thị trang trắc nghiệm
function quizPage() {

    dapAnNguoiDung = [];

    return `
        <div class="page-box">

            <h2>📝 KIỂM TRA TRẮC NGHIỆM</h2>

            <p>BBB11 - ĐẠI ĐỘI 11</p>

            <p>
                Số lượng câu hỏi:
                ${nganHangCauHoi.length}
            </p>

            <button class="action-button"
                onclick="batDauTracNghiem()">
                BẮT ĐẦU KIỂM TRA
            </button>

            <div id="khuVucCauHoi"></div>

            <div id="ketQuaTracNghiem"></div>

        </div>
    `;
}

// Bắt đầu kiểm tra
function batDauTracNghiem() {

    dapAnNguoiDung = [];

    const khuVuc = document.getElementById("khuVucCauHoi");

    khuVuc.innerHTML = nganHangCauHoi.map((cau, index) => `
        <div class="question">

            <h3>
                Câu ${index + 1}: ${cau.cauHoi}
            </h3>

            ${cau.dapAn.map((dapAn, i) => `
                <label style="display:block;margin:10px 0;">
                    <input
                        type="radio"
                        name="cau${index}"
                        value="${i}"
                    >
                    ${String.fromCharCode(65 + i)}.
                    ${dapAn}
                </label>
            `).join("")}

        </div>
    `).join("") + `
        <button class="action-button"
            onclick="nopBaiTracNghiem()">
            NỘP BÀI
        </button>
    `;

}

// Nộp bài và tính điểm
function nopBaiTracNghiem() {

    let soCauDung = 0;
    let soCauDaLam = 0;

    nganHangCauHoi.forEach((cau, index) => {

        const chon = document.querySelector(
            `input[name="cau${index}"]:checked`
        );

        if (chon) {

            soCauDaLam++;

            if (Number(chon.value) === cau.dapAnDung) {
                soCauDung++;
            }
        }

    });

    if (soCauDaLam !== nganHangCauHoi.length) {
        alert("Bạn chưa trả lời hết câu hỏi!");
        return;
    }

    const soCauSai = nganHangCauHoi.length - soCauDung;

    const diem = Math.round(
        soCauDung / nganHangCauHoi.length * 100
    );

    // Hiển thị kết quả
    document.getElementById("ketQuaTracNghiem").innerHTML = `
        <div class="list-item">

            <h2>🏆 KẾT QUẢ KIỂM TRA</h2>
        <h3>Người làm: ${escapeHTML(currentUser)}</h3>

            <h3>Điểm: ${diem}/100</h3>

            <p>✅ Số câu đúng: ${soCauDung}</p>

            <p>❌ Số câu sai: ${soCauSai}</p>

            <p>
                Xếp loại:
                ${diem >= 90 ? "Xuất sắc" :
                  diem >= 80 ? "Giỏi" :
                  diem >= 65 ? "Khá" :
                  diem >= 50 ? "Trung bình" : "Cần cố gắng"}
            </p>

        </div>
    `;

    // Lưu lịch sử
    const lichSu = JSON.parse(
        localStorage.getItem("bbb11_lichsu_kiemtra") || "[]"
    );

    lichSu.push({
        ten: currentUser,
        diem: diem,
        soCauDung: soCauDung,
        ngay: new Date().toLocaleString("vi-VN")
    });

    localStorage.setItem(
        "bbb11_lichsu_kiemtra",
        JSON.stringify(lichSu)
    );

    // Khóa đáp án sau khi nộp
    document.querySelectorAll("#khuVucCauHoi input")
        .forEach(input => input.disabled = true);

    document.querySelectorAll("#khuVucCauHoi button")
        .forEach(button => button.disabled = true);

}

// =====================================
// KẾT THÚC BƯỚC 7
// =====================================

// =====================================
// BƯỚC 8: GIÁO DỤC CHÍNH TRỊ
// =====================================

// Lấy danh sách bài học
function layBaiHoc() {
    return JSON.parse(
        localStorage.getItem("bbb11_baihoc") || "[]"
    );
}

// Lưu danh sách bài học
function luuBaiHoc(data) {
    localStorage.setItem(
        "bbb11_baihoc",
        JSON.stringify(data)
    );
}

// Hiển thị trang giáo dục chính trị
function educationPage() {

    const danhSach = layBaiHoc();

    return `
        <div class="page-box">

            <h2>🎓 GIÁO DỤC CHÍNH TRỊ</h2>

            <p>Học tập, rèn luyện và nâng cao nhận thức</p>

            <input
                type="text"
                id="tenBaiHoc"
                placeholder="Nhập tên bài học"
            >

            <textarea
                id="noiDungBaiHoc"
                placeholder="Nhập nội dung bài học..."
            ></textarea>

            <button class="action-button"
                onclick="themBaiHoc()">
                ➕ Thêm bài học
            </button>

            <h3>📚 DANH SÁCH BÀI HỌC</h3>

            <div>
                ${danhSach.map((item, index) => `
                    <div class="list-item">

                        <h3>${escapeHTML(item.ten)}</h3>

                        <small>${escapeHTML(item.ngayTao)}</small>

                        <br>

                        <button class="action-button"
                            onclick="xemBaiHoc(${index})">
                            Xem bài học
                        </button>

                        <button class="action-button"
                            onclick="xoaBaiHoc(${index})">
                            Xóa
                        </button>

                    </div>
                `).join("")}

                ${danhSach.length === 0
                    ? "<p>Chưa có bài học nào.</p>"
                    : ""
                }
            </div>

            <div id="chiTietBaiHoc"></div>

        </div>
    `;
}

// Thêm bài học
function themBaiHoc() {

    const ten = document
        .getElementById("tenBaiHoc")
        .value.trim();

    const noiDung = document
        .getElementById("noiDungBaiHoc")
        .value.trim();

    if (!ten || !noiDung) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const danhSach = layBaiHoc();

    danhSach.push({
        ten: ten,
        noiDung: noiDung,
        ngayTao: new Date().toLocaleDateString("vi-VN")
    });

    luuBaiHoc(danhSach);

    showPage("education");

    alert("Đã thêm bài học thành công!");
}

// Xem bài học
function xemBaiHoc(index) {

    const danhSach = layBaiHoc();
    const baiHoc = danhSach[index];

    if (!baiHoc) return;

    document.getElementById("chiTietBaiHoc").innerHTML = `
        <div class="list-item">

            <h3>📖 ${escapeHTML(baiHoc.ten)}</h3>

            <p>
                ${escapeHTML(baiHoc.noiDung).replace(/\n/g, "<br>")}
            </p>

            <small>
                Ngày tạo: ${escapeHTML(baiHoc.ngayTao)}
            </small>

        </div>
    `;

}

// Xóa bài học
function xoaBaiHoc(index) {

    if (!confirm("Bạn có chắc muốn xóa bài học này?")) {
        return;
    }

    const danhSach = layBaiHoc();

    danhSach.splice(index, 1);

    luuBaiHoc(danhSach);

    showPage("education");

    alert("Đã xóa bài học!");
}

// =====================================
// KẾT THÚC BƯỚC 8
// =====================================

// =====================================
// BƯỚC 9: LỜI BÁC HỒ DẠY
// =====================================

// Lấy dữ liệu
function layCamNhan() {
    return JSON.parse(
        localStorage.getItem("bbb11_camnhan") || "[]"
    );
}

// Lưu dữ liệu
function luuCamNhan(data) {
    localStorage.setItem(
        "bbb11_camnhan",
        JSON.stringify(data)
    );
}

// Hiển thị trang
function unclePage() {

    const danhSach = layCamNhan();

    return `
        <div class="page-box">

            <h2>🇻🇳 GÓC LỜI BÁC HỒ DẠY</h2>

            <div class="list-item">
                <h3>🌟 Học tập và làm theo tư tưởng,
                đạo đức, phong cách Hồ Chí Minh</h3>

                <p>
                    Không ngừng học tập, rèn luyện,
                    nâng cao tinh thần trách nhiệm,
                    ý thức tổ chức kỷ luật và đoàn kết.
                </p>
            </div>

            <h3>✍️ GÓC CẢM NHẬN</h3>

            <textarea
                id="noiDungCamNhan"
                placeholder="Viết cảm nhận của bạn..."
            ></textarea>

            <button class="action-button"
                onclick="themCamNhan()">
                💾 Lưu cảm nhận
            </button>

            <h3>📖 CẢM NHẬN CỦA THÀNH VIÊN</h3>

            <div>
                ${danhSach.map((item, index) => `
                    <div class="list-item">

                        <h3>${escapeHTML(item.ten)}</h3>

                        <p>
                            ${escapeHTML(item.noiDung).replace(/\n/g, "<br>")}
                        </p>

                        <small>
                            ${escapeHTML(item.ngay)}
                        </small>

                        <br>

                        <button class="action-button"
                            onclick="xoaCamNhan(${index})">
                            🗑️ Xóa
                        </button>

                    </div>
                `).join("")}

                ${danhSach.length === 0
                    ? "<p>Chưa có cảm nhận nào.</p>"
                    : ""
                }
            </div>

        </div>
    `;
}

// Thêm cảm nhận
function themCamNhan() {

    const noiDung = document
        .getElementById("noiDungCamNhan")
        .value.trim();

    if (!noiDung) {
        alert("Bạn chưa nhập cảm nhận!");
        return;
    }

    const danhSach = layCamNhan();

    danhSach.unshift({
        ten: currentUser,
        noiDung: noiDung,
        ngay: new Date().toLocaleString("vi-VN")
    });

    luuCamNhan(danhSach);

    showPage("bác");

    alert("Đã lưu cảm nhận thành công!");
}

// Xóa cảm nhận
function xoaCamNhan(index) {

    if (!confirm("Bạn có chắc muốn xóa cảm nhận này?")) {
        return;
    }

    const danhSach = layCamNhan();

    danhSach.splice(index, 1);

    luuCamNhan(danhSach);

    showPage("bác");

    alert("Đã xóa cảm nhận!");
}

// =====================================
// KẾT THÚC BƯỚC 9
// =====================================

// =====================================
// BƯỚC 10: MỖI TUẦN MỘT CÂU HỎI
// =====================================

// Lấy danh sách câu hỏi
function layCauHoiTuan() {
    return JSON.parse(
        localStorage.getItem("bbb11_cauhoituan") || "[]"
    );
}

// Lưu danh sách câu hỏi
function luuCauHoiTuan(data) {
    localStorage.setItem(
        "bbb11_cauhoituan",
        JSON.stringify(data)
    );
}

// Hiển thị trang câu hỏi tuần
function weeklyPage() {

    const danhSach = layCauHoiTuan();

    return `
        <div class="page-box">

            <h2>❓ MỖI TUẦN MỘT CÂU HỎI</h2>

            <p>BBB11 - ĐẠI ĐỘI 11</p>

            <h3>📌 Đăng câu hỏi mới</h3>

            <textarea
                id="noiDungCauHoi"
                placeholder="Nhập câu hỏi tuần này..."
            ></textarea>

            <button class="action-button"
                onclick="themCauHoiTuan()">
                ➕ Đăng câu hỏi
            </button>

            <h3>📚 DANH SÁCH CÂU HỎI</h3>

            ${danhSach.map((item, index) => `
                <div class="list-item">

                    <h3>Câu hỏi ${index + 1}</h3>

                    <p>${escapeHTML(item.cauHoi)}</p>

                    <small>${escapeHTML(item.ngay)}</small>

                    <textarea
                        id="traLoi${index}"
                        placeholder="Nhập câu trả lời..."
                    ></textarea>

                    <button class="action-button"
                        onclick="guiTraLoi(${index})">
                        📩 Gửi câu trả lời
                    </button>

                    <button class="action-button"
                        onclick="xemTraLoi(${index})">
                        👥 Xem câu trả lời
                    </button>

                    <button class="action-button"
                        onclick="xoaCauHoiTuan(${index})">
                        🗑️ Xóa câu hỏi
                    </button>

                    <div id="danhSachTraLoi${index}"></div>

                </div>
            `).join("")}

            ${danhSach.length === 0
                ? "<p>Chưa có câu hỏi nào.</p>"
                : ""
            }

        </div>
    `;
}

// Thêm câu hỏi
function themCauHoiTuan() {

    const cauHoi = document
        .getElementById("noiDungCauHoi")
        .value.trim();

    if (!cauHoi) {
        alert("Vui lòng nhập nội dung câu hỏi!");
        return;
    }

    const danhSach = layCauHoiTuan();

    danhSach.unshift({
        cauHoi: cauHoi,
        ngay: new Date().toLocaleDateString("vi-VN"),
        traLoi: []
    });

    luuCauHoiTuan(danhSach);

    showPage("question");

    alert("Đã đăng câu hỏi thành công!");
}

// Gửi câu trả lời
function guiTraLoi(index) {

    const input = document.getElementById("traLoi" + index);

    const noiDung = input.value.trim();

    if (!noiDung) {
        alert("Bạn chưa nhập câu trả lời!");
        return;
    }

    const danhSach = layCauHoiTuan();

    if (!danhSach[index]) return;

    danhSach[index].traLoi.push({
        ten: currentUser,
        noiDung: noiDung,
        ngay: new Date().toLocaleString("vi-VN")
    });

    luuCauHoiTuan(danhSach);

    showPage("question");

    alert("Đã gửi câu trả lời thành công!");
}

// Xem câu trả lời
function xemTraLoi(index) {

    const danhSach = layCauHoiTuan();

    if (!danhSach[index]) return;

    const traLoi = danhSach[index].traLoi || [];

    const khuVuc = document.getElementById(
        "danhSachTraLoi" + index
    );

    khuVuc.innerHTML = `
        <h3>👥 DANH SÁCH TRẢ LỜI</h3>

        ${traLoi.map(item => `
            <div class="list-item">
                <strong>${escapeHTML(item.ten)}</strong>
                <p>${escapeHTML(item.noiDung)}</p>
                <small>${escapeHTML(item.ngay)}</small>
            </div>
        `).join("")}

        ${traLoi.length === 0
            ? "<p>Chưa có câu trả lời.</p>"
            : ""
        }
    `;
}

// Xóa câu hỏi
function xoaCauHoiTuan(index) {

    if (!confirm("Bạn có chắc muốn xóa câu hỏi này?")) {
        return;
    }

    const danhSach = layCauHoiTuan();

    danhSach.splice(index, 1);

    luuCauHoiTuan(danhSach);

    showPage("question");

    alert("Đã xóa câu hỏi!");
}

// =====================================
// KẾT THÚC BƯỚC 10
// =====================================

// =====================================
// BƯỚC 11: CHẤM ĐIỂM THI ĐUA
// =====================================

// Lấy dữ liệu thi đua
function layDiemThiDua() {
    return JSON.parse(
        localStorage.getItem("bbb11_thidua") || "[]"
    );
}

// Lưu dữ liệu thi đua
function luuDiemThiDua(data) {
    localStorage.setItem(
        "bbb11_thidua",
        JSON.stringify(data)
    );
}

// Hiển thị trang thi đua

function showHome() {
    document.getElementById("homePage").classList.remove("hidden");

    document.getElementById("functionPage").classList.add("hidden");

    window.scrollTo(0, 0);
}

function showPage(page) {

    const home = document.getElementById("homePage");
    const functionPage = document.getElementById("functionPage");
    const content = document.getElementById("pageContent");

    home.classList.add("hidden");
    functionPage.classList.remove("hidden");

    let html = "";

    switch (page) {

        case "manual":
            html = manualPage();
            break;

        case "resolution":
            html = resolutionPage();
            break;

        case "news":
            html = newsPage();
            break;

        case "music":
            html = musicPage();
            break;

        case "quiz":
            html = quizPage();
            break;

        case "education":
            html = educationPage();
            break;

        case "bác":
            html = bacPage();
            break;

        case "question":
            html = questionPage();
            break;

        case "score":
            html = scorePage();
            break;

        case "ranking":
            html = rankingPage();
            break;

        default:
            html = "<h2>Chức năng chưa được xây dựng!</h2>";
    }

    content.innerHTML = html;

    window.scrollTo(0, 0);
}

// =====================================
// KẾT THÚC BƯỚC 11
// =====================================

// =====================================
// BƯỚC 12: BẢNG XẾP HẠNG THI ĐUA
// =====================================

// Hiển thị bảng xếp hạng
function rankingPage() {

    const danhSach = JSON.parse(
        localStorage.getItem("bbb11_thidua") || "[]"
    );

    // Sắp xếp điểm từ cao xuống thấp
    const xepHang = [...danhSach].sort(
        (a, b) => b.diem - a.diem
    );

    const tongThanhVien = danhSach.length;

    const diemCaoNhat = tongThanhVien > 0
        ? Math.max(...danhSach.map(item => item.diem))
        : 0;

    return `
        <div class="page-box">

            <h2>🥇 BẢNG XẾP HẠNG THI ĐUA</h2>

            <p>BBB11 - ĐẠI ĐỘI 11</p>

            <div class="list-item">
                <h3>📊 THỐNG KÊ THI ĐUA</h3>

                <p>
                    Tổng số kết quả:
                    <strong>${tongThanhVien}</strong>
                </p>

                <p>
                    Điểm cao nhất:
                    <strong>${diemCaoNhat}/100</strong>
                </p>
            </div>

            <input
                type="text"
                id="timKiemThanhVien"
                placeholder="🔍 Tìm kiếm thành viên..."
                oninput="timKiemXepHang()"
            >

            <h3>🏆 DANH SÁCH XẾP HẠNG</h3>

            <div id="bangXepHang">

                ${hienThiXepHang(xepHang)}

            </div>

        </div>
    `;
}

// Tạo nội dung bảng xếp hạng
function hienThiXepHang(danhSach) {

    if (danhSach.length === 0) {
        return "<p>Chưa có dữ liệu xếp hạng.</p>";
    }

    return `
        <table>
            <thead>
                <tr>
                    <th>Hạng</th>
                    <th>Họ tên</th>
                    <th>Điểm</th>
                    <th>Xếp loại</th>
                </tr>
            </thead>

            <tbody>
                ${danhSach.map((item, index) => `
                    <tr>
                        <td>
                            ${index === 0 ? "🥇" :
                              index === 1 ? "🥈" :
                              index === 2 ? "🥉" :
                              index + 1}
                        </td>

                        <td>${escapeHTML(item.ten)}</td>

                        <td>${item.diem}/100</td>

                        <td>
                            ${item.diem >= 90 ? "Xuất sắc" :
                              item.diem >= 80 ? "Giỏi" :
                              item.diem >= 65 ? "Khá" :
                              item.diem >= 50 ? "Trung bình" :
                              "Cần cố gắng"}
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

// Tìm kiếm thành viên
function timKiemXepHang() {

    const tuKhoa = document
        .getElementById("timKiemThanhVien")
        .value.toLowerCase()
        .trim();

    const danhSach = JSON.parse(
        localStorage.getItem("bbb11_thidua") || "[]"
    );

    const ketQua = [...danhSach]
        .filter(item =>
            item.ten.toLowerCase().includes(tuKhoa)
        )
        .sort((a, b) => b.diem - a.diem);

    document.getElementById("bangXepHang").innerHTML =
        hienThiXepHang(ketQua);
}

// =====================================
// KẾT THÚC BƯỚC 12
// =====================================

// =====================================
// BƯỚC 13: QUẢN LÝ THÀNH VIÊN
// =====================================

// Lấy danh sách thành viên
function layThanhVien() {
    return JSON.parse(
        localStorage.getItem("bbb11_thanhvien") || "[]"
    );
}

// Lưu danh sách thành viên
function luuThanhVien(data) {
    localStorage.setItem(
        "bbb11_thanhvien",
        JSON.stringify(data)
    );
}

// Hiển thị trang thành viên
function memberPage() {

    const danhSach = layThanhVien();

    return `
        <div class="page-box">

            <h2>👥 QUẢN LÝ THÀNH VIÊN BBB11</h2>

            <input
                type="text"
                id="tenThanhVienMoi"
                placeholder="Họ và tên"
            >

            <input
                type="text"
                id="chucVuThanhVien"
                placeholder="Chức vụ"
            >

            <input
                type="tel"
                id="sdtThanhVien"
                placeholder="Số điện thoại"
            >

            <button onclick="themThanhVien()">
                ➕ Thêm thành viên
            </button>

            <h3>📋 DANH SÁCH THÀNH VIÊN</h3>

            <input
                type="text"
                id="timThanhVien"
                placeholder="Tìm kiếm thành viên..."
                oninput="timKiemThanhVien()"
            >

            <div id="danhSachThanhVien">
                ${hienThiThanhVien(danhSach)}
            </div>

        </div>
    `;
}

// Hiển thị danh sách
function hienThiThanhVien(danhSach) {

    if (danhSach.length === 0) {
        return "<p>Chưa có thành viên nào.</p>";
    }

    return danhSach.map((item, index) => `
        <div class="list-item">

            <h3>${escapeHTML(item.ten)}</h3>

            <p>Chức vụ: ${escapeHTML(item.chucVu)}</p>

            <p>Số điện thoại: ${escapeHTML(item.sdt)}</p>

            <button onclick="suaThanhVien(${index})">
                ✏️ Sửa
            </button>

            <button onclick="xoaThanhVien(${index})">
                🗑️ Xóa
            </button>

        </div>
    `).join("");
}

// Thêm thành viên
function themThanhVien() {

    const ten = document
        .getElementById("tenThanhVienMoi")
        .value.trim();

    const chucVu = document
        .getElementById("chucVuThanhVien")
        .value.trim();

    const sdt = document
        .getElementById("sdtThanhVien")
        .value.trim();

    if (!ten || !chucVu || !sdt) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const danhSach = layThanhVien();

    danhSach.push({
        ten: ten,
        chucVu: chucVu,
        sdt: sdt
    });

    luuThanhVien(danhSach);

    showPage("member");

    alert("Đã thêm thành viên thành công!");
}

// Tìm kiếm thành viên
function timKiemThanhVien() {

    const tuKhoa = document
        .getElementById("timThanhVien")
        .value.toLowerCase();

    const danhSach = layThanhVien();

    const ketQua = danhSach.filter(item =>
        item.ten.toLowerCase().includes(tuKhoa)
    );

    document.getElementById(
        "danhSachThanhVien"
    ).innerHTML = hienThiThanhVien(ketQua);
}

// Sửa thành viên
function suaThanhVien(index) {

    const danhSach = layThanhVien();
    const item = danhSach[index];

    if (!item) return;

    const tenMoi = prompt("Nhập họ tên mới:", item.ten);

    if (tenMoi === null) return;

    const chucVuMoi = prompt("Nhập chức vụ mới:", item.chucVu);

    if (chucVuMoi === null) return;

    const sdtMoi = prompt("Nhập số điện thoại mới:", item.sdt);

    if (sdtMoi === null) return;

    if (!tenMoi.trim() || !chucVuMoi.trim() || !sdtMoi.trim()) {
        alert("Thông tin không được để trống!");
        return;
    }

    danhSach[index] = {
        ten: tenMoi.trim(),
        chucVu: chucVuMoi.trim(),
        sdt: sdtMoi.trim()
    };

    luuThanhVien(danhSach);

    showPage("member");

    alert("Đã cập nhật thành viên!");
}

// Xóa thành viên
function xoaThanhVien(index) {

    if (!confirm("Bạn có chắc muốn xóa thành viên này?")) {
        return;
    }

    const danhSach = layThanhVien();

    danhSach.splice(index, 1);

    luuThanhVien(danhSach);

    showPage("member");

    alert("Đã xóa thành viên!");
}

// =====================================
// KẾT THÚC BƯỚC 13
// =====================================

// =====================================
// BƯỚC 14: BẢNG TIN ĐẠI ĐỘI 11
// =====================================

// Lấy danh sách thông báo
function layThongBao() {
    return JSON.parse(
        localStorage.getItem("bbb11_thongbao") || "[]"
    );
}

// Lưu thông báo
function luuThongBao(data) {
    localStorage.setItem(
        "bbb11_thongbao",
        JSON.stringify(data)
    );
}

// Hiển thị bảng tin
function noticePage() {

    const danhSach = layThongBao();

    danhSach.sort((a, b) =>
        Number(b.ghim) - Number(a.ghim)
    );

    return `
        <div class="page-box">

            <h2>📢 BẢNG TIN ĐẠI ĐỘI 11</h2>

            <p>BBB11 - ĐOÀN KẾT - KỶ LUẬT - TRÁCH NHIỆM</p>

            <h3>✍️ ĐĂNG THÔNG BÁO</h3>

            <input
                type="text"
                id="tieuDeThongBao"
                placeholder="Nhập tiêu đề thông báo"
            >

            <textarea
                id="noiDungThongBao"
                placeholder="Nhập nội dung thông báo..."
            ></textarea>

            <label>
                <input type="checkbox" id="ghimThongBao">
                📌 Ghim thông báo quan trọng
            </label>

            <br><br>

            <button class="action-button"
                onclick="themThongBao()">
                ➕ Đăng thông báo
            </button>

            <h3>📋 DANH SÁCH THÔNG BÁO</h3>

            <div>
                ${danhSach.map(item => `
                    <div class="list-item">

                        ${item.ghim ? "<h3>📌 THÔNG BÁO QUAN TRỌNG</h3>" : ""}

                        <h3>${escapeHTML(item.tieuDe)}</h3>

                        <p>
                            ${escapeHTML(item.noiDung).replace(/\n/g, "<br>")}
                        </p>

                        <small>
                            Ngày đăng: ${escapeHTML(item.ngay)}
                        </small>

                        <br><br>

                        <button class="action-button"
                            onclick="suaThongBao('${item.id}')">
                            ✏️ Sửa
                        </button>

                        <button class="action-button"
                            onclick="xoaThongBao('${item.id}')">
                            🗑️ Xóa
                        </button>

                    </div>
                `).join("")}

                ${danhSach.length === 0
                    ? "<p>Chưa có thông báo nào.</p>"
                    : ""
                }
            </div>

        </div>
    `;
}

// Thêm thông báo
function themThongBao() {

    const tieuDe = document
        .getElementById("tieuDeThongBao")
        .value.trim();

    const noiDung = document
        .getElementById("noiDungThongBao")
        .value.trim();

    const ghim = document
        .getElementById("ghimThongBao")
        .checked;

    if (!tieuDe || !noiDung) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const danhSach = layThongBao();

    danhSach.unshift({
        id: Date.now().toString(),
        tieuDe: tieuDe,
        noiDung: noiDung,
        ghim: ghim,
        ngay: new Date().toLocaleString("vi-VN")
    });

    luuThongBao(danhSach);

    showPage("notice");

    alert("Đã đăng thông báo thành công!");
}

// Sửa thông báo
function suaThongBao(id) {

    const danhSach = layThongBao();

    const index = danhSach.findIndex(
        item => item.id === id
    );

    if (index === -1) return;

    const item = danhSach[index];

    const tieuDeMoi = prompt(
        "Nhập tiêu đề mới:",
        item.tieuDe
    );

    if (tieuDeMoi === null) return;

    const noiDungMoi = prompt(
        "Nhập nội dung mới:",
        item.noiDung
    );

    if (noiDungMoi === null) return;

    if (!tieuDeMoi.trim() || !noiDungMoi.trim()) {
        alert("Thông tin không được để trống!");
        return;
    }

    danhSach[index].tieuDe = tieuDeMoi.trim();
    danhSach[index].noiDung = noiDungMoi.trim();

    luuThongBao(danhSach);

    showPage("notice");

    alert("Đã cập nhật thông báo!");
}

// Xóa thông báo
function xoaThongBao(id) {

    if (!confirm("Bạn có chắc muốn xóa thông báo này?")) {
        return;
    }

    const danhSach = layThongBao();

    const ketQua = danhSach.filter(
        item => item.id !== id
    );

    luuThongBao(ketQua);

    showPage("notice");

    alert("Đã xóa thông báo!");
}

// =====================================
// KẾT THÚC BƯỚC 14
// =====================================

// =====================================
// BƯỚC 15: LỊCH CÔNG TÁC ĐẠI ĐỘI 11
// =====================================

// Lấy danh sách lịch
function layLichCongTac() {
    return JSON.parse(
        localStorage.getItem("bbb11_lichcongtac") || "[]"
    );
}

// Lưu danh sách lịch
function luuLichCongTac(data) {
    localStorage.setItem(
        "bbb11_lichcongtac",
        JSON.stringify(data)
    );
}

// Hiển thị trang lịch công tác
function schedulePage() {

    const danhSach = layLichCongTac();

    danhSach.sort((a, b) =>
        (a.ngay + a.gio).localeCompare(b.ngay + b.gio)
    );

    return `
        <div class="page-box">

            <h2>📅 LỊCH CÔNG TÁC ĐẠI ĐỘI 11</h2>

            <p>BBB11 - ĐOÀN KẾT - KỶ LUẬT - TRÁCH NHIỆM</p>

            <h3>➕ THÊM LỊCH CÔNG TÁC</h3>

            <input
                type="text"
                id="tenCongViec"
                placeholder="Tên công việc"
            >

            <input
                type="date"
                id="ngayCongTac"
            >

            <input
                type="time"
                id="gioCongTac"
            >

            <input
                type="text"
                id="diaDiemCongTac"
                placeholder="Địa điểm thực hiện"
            >

            <textarea
                id="moTaCongViec"
                placeholder="Nội dung công việc..."
            ></textarea>

            <button class="action-button"
                onclick="themLichCongTac()">
                ➕ Thêm lịch
            </button>

            <h3>📋 DANH SÁCH CÔNG VIỆC</h3>

            <div>
                ${danhSach.map((item, index) => `
                    <div class="list-item">

                        <h3>${escapeHTML(item.ten)}</h3>

                        <p>📅 Ngày: ${escapeHTML(item.ngay)}</p>

                        <p>🕒 Giờ: ${escapeHTML(item.gio)}</p>

                        <p>📍 Địa điểm: ${escapeHTML(item.diaDiem)}</p>

                        <p>${escapeHTML(item.moTa)}</p>

                        <p>
                            Trạng thái:
                            ${item.hoanThanh
                                ? "✅ Đã hoàn thành"
                                : "⏳ Chưa hoàn thành"}
                        </p>

                        <button class="action-button"
                            onclick="doiTrangThaiLich(${index})">
                            ${item.hoanThanh
                                ? "↩️ Đánh dấu chưa xong"
                                : "✅ Hoàn thành"}
                        </button>

                        <button class="action-button"
                            onclick="xoaLichCongTac(${index})">
                            🗑️ Xóa
                        </button>

                    </div>
                `).join("")}

                ${danhSach.length === 0
                    ? "<p>Chưa có lịch công tác.</p>"
                    : ""
                }
            </div>

        </div>
    `;
}

// Thêm lịch công tác
function themLichCongTac() {

    const ten = document
        .getElementById("tenCongViec")
        .value.trim();

    const ngay = document
        .getElementById("ngayCongTac")
        .value;

    const gio = document
        .getElementById("gioCongTac")
        .value;

    const diaDiem = document
        .getElementById("diaDiemCongTac")
        .value.trim();

    const moTa = document
        .getElementById("moTaCongViec")
        .value.trim();

    if (!ten || !ngay || !gio || !diaDiem || !moTa) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const danhSach = layLichCongTac();

    danhSach.push({
        ten: ten,
        ngay: ngay,
        gio: gio,
        diaDiem: diaDiem,
        moTa: moTa,
        hoanThanh: false
    });

    luuLichCongTac(danhSach);

    showPage("schedule");

    alert("Đã thêm lịch công tác thành công!");
}

// Đánh dấu hoàn thành
function doiTrangThaiLich(index) {

    const danhSach = layLichCongTac();

    if (!danhSach[index]) return;

    danhSach[index].hoanThanh =
        !danhSach[index].hoanThanh;

    luuLichCongTac(danhSach);

    showPage("schedule");
}

// Xóa lịch công tác
function xoaLichCongTac(index) {

    if (!confirm("Bạn có chắc muốn xóa lịch này?")) {
        return;
    }

    const danhSach = layLichCongTac();

    danhSach.splice(index, 1);

    luuLichCongTac(danhSach);

    showPage("schedule");

    alert("Đã xóa lịch công tác!");
}

// =====================================
// KẾT THÚC BƯỚC 15
// =====================================

// =====================================
// BƯỚC 16: THƯ VIỆN ẢNH VÀ VIDEO BBB11
// =====================================

// Lấy dữ liệu thư viện
function layThuVien() {
    return JSON.parse(
        localStorage.getItem("bbb11_thuvien") || "[]"
    );
}

// Lưu dữ liệu thư viện
function luuThuVien(data) {
    localStorage.setItem(
        "bbb11_thuvien",
        JSON.stringify(data)
    );
}

// Hiển thị thư viện
function galleryPage() {

    const danhSach = layThuVien();

    return `
        <div class="page-box">

            <h2>📸 THƯ VIỆN ẢNH VÀ VIDEO BBB11</h2>

            <p>Kỷ niệm và hoạt động Đại đội 11</p>

            <h3>➕ THÊM HÌNH ẢNH</h3>

            <input
                type="text"
                id="tenAnh"
                placeholder="Tên hình ảnh"
            >

            <input
                type="url"
                id="linkAnh"
                placeholder="Đường dẫn hình ảnh"
            >

            <button onclick="themAnh()">
                ➕ Thêm ảnh
            </button>

            <h3>🎬 THÊM VIDEO</h3>

            <input
                type="text"
                id="tenVideo"
                placeholder="Tên video"
            >

            <input
                type="url"
                id="linkVideo"
                placeholder="Đường dẫn video MP4"
            >

            <button onclick="themVideo()">
                ➕ Thêm video
            </button>

            <h3>🖼️ THƯ VIỆN CỦA ĐẠI ĐỘI</h3>

            <div class="gallery-grid">

                ${danhSach.map((item, index) => `
                    <div class="list-item">

                        <h3>${escapeHTML(item.ten)}</h3>

                        ${item.loai === "anh"
                            ? `
                                <img
                                    src="${escapeHTML(item.link)}"
                                    alt="${escapeHTML(item.ten)}"
                                    onclick="xemAnh('${item.id}')"
                                    style="width:100%;border-radius:10px;cursor:pointer;"
                                >
                            `
                            : `
                                <video
                                    src="${escapeHTML(item.link)}"
                                    controls
                                    preload="none"
                                    style="width:100%;border-radius:10px;"
                                ></video>
                            `
                        }

                        <p>
                            ${item.loai === "anh"
                                ? "🖼️ Hình ảnh"
                                : "🎬 Video"}
                        </p>

                        <button onclick="xoaMedia('${item.id}')">
                            🗑️ Xóa
                        </button>

                    </div>
                `).join("")}

                ${danhSach.length === 0
                    ? "<p>Thư viện chưa có dữ liệu.</p>"
                    : ""
                }

            </div>

            <div id="xemAnhLon"></div>

        </div>
    `;
}

// Kiểm tra đường dẫn
function kiemTraLinkMedia(link) {

    try {
        const url = new URL(link);

        return (
            url.protocol === "https:" ||
            url.protocol === "http:"
        );

    } catch {
        return false;
    }
}

// Thêm ảnh
function themAnh() {

    const ten = document
        .getElementById("tenAnh")
        .value.trim();

    const link = document
        .getElementById("linkAnh")
        .value.trim();

    if (!ten || !link) {
        alert("Vui lòng nhập tên và đường dẫn ảnh!");
        return;
    }

    if (!kiemTraLinkMedia(link)) {
        alert("Đường dẫn ảnh không hợp lệ!");
        return;
    }

    const danhSach = layThuVien();

    danhSach.unshift({
        id: Date.now().toString(),
        ten: ten,
        link: link,
        loai: "anh"
    });

    luuThuVien(danhSach);

    showPage("gallery");

    alert("Đã thêm ảnh thành công!");
}

// Thêm video
function themVideo() {

    const ten = document
        .getElementById("tenVideo")
        .value.trim();

    const link = document
        .getElementById("linkVideo")
        .value.trim();

    if (!ten || !link) {
        alert("Vui lòng nhập tên và đường dẫn video!");
        return;
    }

    if (!kiemTraLinkMedia(link)) {
        alert("Đường dẫn video không hợp lệ!");
        return;
    }

    const danhSach = layThuVien();

    danhSach.unshift({
        id: Date.now().toString(),
        ten: ten,
        link: link,
        loai: "video"
    });

    luuThuVien(danhSach);

    showPage("gallery");

    alert("Đã thêm video thành công!");
}

// Xem ảnh phóng to
function xemAnh(id) {

    const danhSach = layThuVien();

    const item = danhSach.find(
        media => media.id === id
    );

    if (!item || item.loai !== "anh") return;

    document.getElementById("xemAnhLon").innerHTML = `
        <div class="list-item">

            <h3>${escapeHTML(item.ten)}</h3>

            <img
                src="${escapeHTML(item.link)}"
                alt="${escapeHTML(item.ten)}"
                style="width:100%;border-radius:12px;"
            >

            <button onclick="
                document.getElementById('xemAnhLon').innerHTML = ''
            ">
                Đóng ảnh
            </button>

        </div>
    `;
}

// Xóa ảnh hoặc video
function xoaMedia(id) {

    if (!confirm("Bạn có chắc muốn xóa nội dung này?")) {
        return;
    }

    const danhSach = layThuVien();

    const ketQua = danhSach.filter(
        item => item.id !== id
    );

    luuThuVien(ketQua);

    showPage("gallery");

    alert("Đã xóa thành công!");
}

// =====================================
// KẾT THÚC BƯỚC 16
// =====================================

// =====================================
// BƯỚC 17: HỆ THỐNG THÔNG BÁO BBB11
// =====================================

// Lấy danh sách thông báo
function layThongBaoHeThong() {
    return JSON.parse(
        localStorage.getItem("bbb11_notification") || "[]"
    );
}

// Lưu thông báo
function luuThongBaoHeThong(data) {
    localStorage.setItem(
        "bbb11_notification",
        JSON.stringify(data)
    );
}

// Đếm thông báo chưa đọc
function demThongBaoChuaDoc() {
    const danhSach = layThongBaoHeThong();

    return danhSach.filter(
        item => !item.daDoc
    ).length;
}

// Hiển thị trang thông báo
function notificationPage() {

    const danhSach = layThongBaoHeThong();

    const soChuaDoc = demThongBaoChuaDoc();

    return `
        <div class="page-box">

            <h2>🔔 THÔNG BÁO BBB11</h2>

            <p>ĐẠI ĐỘI 11</p>

            <div class="list-item">
                <h3>📩 Thống kê thông báo</h3>

                <p>
                    Tổng thông báo: ${danhSach.length}
                </p>

                <p>
                    Chưa đọc: ${soChuaDoc}
                </p>
            </div>

            <h3>✍️ TẠO THÔNG BÁO</h3>

            <input
                type="text"
                id="tieuDeNotification"
                placeholder="Tiêu đề thông báo"
            >

            <textarea
                id="noiDungNotification"
                placeholder="Nhập nội dung thông báo..."
            ></textarea>

            <button onclick="themThongBaoHeThong()">
                ➕ Tạo thông báo
            </button>

            <button onclick="docTatCaThongBao()">
                ✅ Đánh dấu tất cả đã đọc
            </button>

            <h3>📋 DANH SÁCH THÔNG BÁO</h3>

            <div>
                ${danhSach.map(item => `
                    <div class="list-item">

                        <h3>
                            ${item.daDoc ? "📩" : "🔔"}
                            ${escapeHTML(item.tieuDe)}
                        </h3>

                        <p>
                            ${escapeHTML(item.noiDung)}
                        </p>

                        <small>
                            ${escapeHTML(item.ngay)}
                        </small>

                        <p>
                            ${item.daDoc
                                ? "✅ Đã đọc"
                                : "🟡 Chưa đọc"}
                        </p>

                        <button
                            onclick="docMotThongBao('${item.id}')">
                            Đánh dấu đã đọc
                        </button>

                        <button
                            onclick="xoaThongBaoHeThong('${item.id}')">
                            🗑️ Xóa
                        </button>

                    </div>
                `).join("")}

                ${danhSach.length === 0
                    ? "<p>Chưa có thông báo nào.</p>"
                    : ""
                }
            </div>

        </div>
    `;
}

// Tạo thông báo
function themThongBaoHeThong() {

    const tieuDe = document
        .getElementById("tieuDeNotification")
        .value.trim();

    const noiDung = document
        .getElementById("noiDungNotification")
        .value.trim();

    if (!tieuDe || !noiDung) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const danhSach = layThongBaoHeThong();

    danhSach.unshift({
        id: Date.now().toString(),
        tieuDe: tieuDe,
        noiDung: noiDung,
        ngay: new Date().toLocaleString("vi-VN"),
        daDoc: false
    });

    luuThongBaoHeThong(danhSach);

    showPage("notification");

    alert("Đã tạo thông báo thành công!");
}

// Đánh dấu một thông báo đã đọc
function docMotThongBao(id) {

    const danhSach = layThongBaoHeThong();

    const item = danhSach.find(
        thongBao => thongBao.id === id
    );

    if (!item) return;

    item.daDoc = true;

    luuThongBaoHeThong(danhSach);

    showPage("notification");
}

// Đánh dấu tất cả đã đọc
function docTatCaThongBao() {

    const danhSach = layThongBaoHeThong();

    danhSach.forEach(item => {
        item.daDoc = true;
    });

    luuThongBaoHeThong(danhSach);

    showPage("notification");

    alert("Tất cả thông báo đã được đánh dấu!");
}

// Xóa thông báo
function xoaThongBaoHeThong(id) {

    if (!confirm("Bạn có chắc muốn xóa thông báo?")) {
        return;
    }

    const danhSach = layThongBaoHeThong();

    const ketQua = danhSach.filter(
        item => item.id !== id
    );

    luuThongBaoHeThong(ketQua);

    showPage("notification");

    alert("Đã xóa thông báo!");
}

// =====================================
// KẾT THÚC BƯỚC 17
// =====================================

// =====================================
// BƯỚC 18: ĐĂNG NHẬP BBB11
// =====================================

// Tài khoản mẫu
const taiKhoanMau = [
    {
        username: "admin",
        password: "123456",
        role: "admin",
        ten: "Quản trị viên BBB11"
    },
    {
        username: "thanhvien",
        password: "123456",
        role: "member",
        ten: "Thành viên Đại đội 11"
    }
];

// Lấy người đang đăng nhập
function layNguoiDangNhap() {

    return JSON.parse(
        sessionStorage.getItem("bbb11_login") || "null"
    );
}

// Hiển thị trang đăng nhập
function loginPage() {

    return `
        <div class="page-box">

            <h2>🔐 ĐĂNG NHẬP BBB11</h2>

            <p>ĐẠI ĐỘI 11</p>

            <input
                type="text"
                id="loginUsername"
                placeholder="Tên đăng nhập"
            >

            <input
                type="password"
                id="loginPassword"
                placeholder="Mật khẩu"
            >

            if (!taiKhoan) {
    alert("Sai tên đăng nhập hoặc mật khẩu!");
    return;
}

if (taiKhoan.khoa) {
    alert("Tài khoản đã bị khóa!");
    return;
}
            <p>
                Tài khoản thử nghiệm:
                <br>
                Admin: admin / 123456
                <br>
                Thành viên: thanhvien / 123456
            </p>

            <div id="loginMessage"></div>

        </div>
    `;
}

// Đăng nhập
function dangNhapBBB11() {

    const username = document
        .getElementById("loginUsername")
        .value.trim();

    const password = document
        .getElementById("loginPassword")
        .value;

    const taiKhoan = taiKhoanMau.find(item =>
        item.username === username &&
        item.password === password
    );

    if (!taiKhoan) {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
        return;
    }

    const nguoiDung = {
        username: taiKhoan.username,
        ten: taiKhoan.ten,
        role: taiKhoan.role
    };

    sessionStorage.setItem(
        "bbb11_login",
        JSON.stringify(nguoiDung)
    );

    alert("Đăng nhập thành công!");

    showPage("home");
}

// Kiểm tra quyền quản trị viên
function laQuanTriVien() {

    const user = layNguoiDangNhap();

    return user && user.role === "admin";
}

// Kiểm tra đăng nhập
function kiemTraDangNhap() {

    const user = layNguoiDangNhap();

    if (!user) {
        alert("Bạn cần đăng nhập trước!");
        return false;
    }

    return true;
}

// Đăng xuất
function dangXuatBBB11() {

    if (!confirm("Bạn có muốn đăng xuất không?")) {
        return;
    }

    sessionStorage.removeItem("bbb11_login");

    alert("Đã đăng xuất!");

    showPage("login");
}

// Hiển thị thông tin tài khoản
function profilePage() {

    const user = layNguoiDangNhap();

    if (!user) {
        return loginPage();
    }

    return `
        <div class="page-box">

            <h2>👤 THÔNG TIN TÀI KHOẢN</h2>

            <h3>${escapeHTML(user.ten)}</h3>

            <p>
                Tài khoản: ${escapeHTML(user.username)}
            </p>

            <p>
                Quyền:
                ${user.role === "admin"
                    ? "Quản trị viên"
                    : "Thành viên"}
            </p>

            <button onclick="dangXuatBBB11()">
                🚪 ĐĂNG XUẤT
            </button>

        </div>
    `;
}

// =====================================
// KẾT THÚC BƯỚC 18
// =====================================

// =====================================
// BƯỚC 19: THỐNG KÊ HOẠT ĐỘNG BBB11
// =====================================

function statisticsPage() {

    // Lấy dữ liệu từ LocalStorage
    const thanhVien = JSON.parse(
        localStorage.getItem("bbb11_thanhvien") || "[]"
    );

    const baiHoc = JSON.parse(
        localStorage.getItem("bbb11_baihoc") || "[]"
    );

    const cauHoi = JSON.parse(
        localStorage.getItem("bbb11_cauhoituan") || "[]"
    );

    const thongBao = JSON.parse(
        localStorage.getItem("bbb11_thongbao") || "[]"
    );

    const lichCongTac = JSON.parse(
        localStorage.getItem("bbb11_lichcongtac") || "[]"
    );

    const diemThiDua = JSON.parse(
        localStorage.getItem("bbb11_thidua") || "[]"
    );

    const thuVien = JSON.parse(
        localStorage.getItem("bbb11_thuvien") || "[]"
    );

    const thongBaoHeThong = JSON.parse(
        localStorage.getItem("bbb11_notification") || "[]"
    );

    // Tính điểm trung bình
    const tongDiem = diemThiDua.reduce(
        (tong, item) => tong + Number(item.diem || 0),
        0
    );

    const diemTrungBinh = diemThiDua.length > 0
        ? (tongDiem / diemThiDua.length).toFixed(1)
        : 0;

    // Tìm điểm cao nhất
    const diemCaoNhat = diemThiDua.length > 0
        ? Math.max(...diemThiDua.map(item => Number(item.diem)))
        : 0;

    // Thống kê lịch đã hoàn thành
    const lichHoanThanh = lichCongTac.filter(
        item => item.hoanThanh
    ).length;

    // Tính tỷ lệ hoàn thành
    const tyLeHoanThanh = lichCongTac.length > 0
        ? Math.round(
            lichHoanThanh / lichCongTac.length * 100
        )
        : 0;

    return `
        <div class="page-box">

            <h2>📊 THỐNG KÊ HOẠT ĐỘNG BBB11</h2>

            <p>ĐẠI ĐỘI 11 - ĐOÀN KẾT - KỶ LUẬT - TRÁCH NHIỆM</p>

            <h3>📌 TỔNG QUAN HOẠT ĐỘNG</h3>

            <div class="list-item">
                👥 Tổng thành viên:
                <strong>${thanhVien.length}</strong>
            </div>

            <div class="list-item">
                🎓 Tổng bài học:
                <strong>${baiHoc.length}</strong>
            </div>

            <div class="list-item">
                ❓ Tổng câu hỏi tuần:
                <strong>${cauHoi.length}</strong>
            </div>

            <div class="list-item">
                📢 Tổng thông báo:
                <strong>${thongBao.length}</strong>
            </div>

            <div class="list-item">
                📅 Tổng lịch công tác:
                <strong>${lichCongTac.length}</strong>
            </div>

            <div class="list-item">
                📸 Tổng ảnh và video:
                <strong>${thuVien.length}</strong>
            </div>

            <div class="list-item">
                🔔 Thông báo hệ thống:
                <strong>${thongBaoHeThong.length}</strong>
            </div>

            <h3>🏆 THỐNG KÊ THI ĐUA</h3>

            <div class="list-item">
                <p>
                    Số kết quả thi đua:
                    <strong>${diemThiDua.length}</strong>
                </p>

                <p>
                    Điểm trung bình:
                    <strong>${diemTrungBinh}/100</strong>
                </p>

                <p>
                    Điểm cao nhất:
                    <strong>${diemCaoNhat}/100</strong>
                </p>
            </div>

            <h3>📅 TIẾN ĐỘ CÔNG TÁC</h3>

            <div class="list-item">

                <p>
                    Đã hoàn thành:
                    ${lichHoanThanh}/${lichCongTac.length}
                </p>

                <div style="
                    background:#ddd;
                    height:18px;
                    border-radius:20px;
                    overflow:hidden;
                ">
                    <div style="
                        width:${tyLeHoanThanh}%;
                        height:100%;
                        background:#16a34a;
                    "></div>
                </div>

                <p>${tyLeHoanThanh}% hoàn thành</p>

            </div>

            <h3>📈 BIỂU ĐỒ ĐIỂM THI ĐUA</h3>

            <div class="list-item">

                ${diemThiDua.length === 0
                    ? "<p>Chưa có dữ liệu điểm thi đua.</p>"
                    : diemThiDua.map(item => `
                        <div style="margin-bottom:15px;">

                            <p>${escapeHTML(item.ten)} - ${item.diem} điểm</p>

                            <div style="
                                background:#ddd;
                                height:15px;
                                border-radius:20px;
                                overflow:hidden;
                            ">
                                <div style="
                                    width:${Math.max(0, Math.min(100, Number(item.diem) || 0))}%;
                                    height:100%;
                                    background:#2563eb;
                                "></div>
                            </div>

                        </div>
                    `).join("")
                }

            </div>

            <button class="action-button"
                onclick="showPage('home')">
                🏠 Về trang chủ
            </button>

        </div>
    `;
}

// =====================================
// KẾT THÚC BƯỚC 19
// =====================================

// =====================================
// BƯỚC 20: SAO LƯU VÀ KHÔI PHỤC BBB11
// =====================================

// Các mục dữ liệu của BBB11
const danhSachKhoaDuLieu = [
    "bbb11_diemdanh"
    "bbb11_thanhvien",
    "bbb11_baihoc",
    "bbb11_camnhan",
    "bbb11_cauhoituan",
    "bbb11_thidua",
    "bbb11_thongbao",
    "bbb11_lichcongtac",
    "bbb11_thuvien",
    "bbb11_notification"
];

// Hiển thị trang sao lưu
function backupPage() {

    return `
        <div class="page-box">

            <h2>💾 SAO LƯU VÀ KHÔI PHỤC DỮ LIỆU</h2>

            <p>BBB11 - ĐẠI ĐỘI 11</p>

            <div class="list-item">

                <h3>📥 SAO LƯU DỮ LIỆU</h3>

                <p>
                    Tải toàn bộ dữ liệu website
                    về máy tính dưới dạng file JSON.
                </p>

                <button class="action-button"
                    onclick="saoLuuBBB11()">
                    💾 TẢI BẢN SAO LƯU
                </button>

            </div>

            <div class="list-item">

                <h3>📤 KHÔI PHỤC DỮ LIỆU</h3>

                <p>
                    Chọn file JSON đã sao lưu
                    để khôi phục dữ liệu.
                </p>

                <input
                    type="file"
                    id="fileKhoiPhuc"
                    accept=".json,application/json"
                >

                <button class="action-button"
                    onclick="khoiPhucBBB11()">
                    📤 KHÔI PHỤC
                </button>

            </div>

            <div class="list-item">

                <h3>⚠️ LƯU Ý</h3>

                <p>
                    Hãy sao lưu dữ liệu trước khi khôi phục.
                    Dữ liệu cũ có thể bị ghi đè.
                </p>

            </div>

        </div>
    `;
}

// Xuất dữ liệu
function saoLuuBBB11() {

    const duLieu = {};

    danhSachKhoaDuLieu.forEach(key => {

        const giaTri = localStorage.getItem(key);

        if (giaTri !== null) {
            duLieu[key] = JSON.parse(giaTri);
        }

    });

    const banSao = {
        ten: "BBB11 - ĐẠI ĐỘI 11",
        phienBan: 1,
        ngaySaoLuu: new Date().toISOString(),
        duLieu: duLieu
    };

    const blob = new Blob(
        [JSON.stringify(banSao, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
        "BBB11_SaoLuu_" +
        new Date().toISOString().slice(0, 10) +
        ".json";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    alert("Đã sao lưu dữ liệu BBB11!");
}

// Khôi phục dữ liệu
function khoiPhucBBB11() {

    const input = document.getElementById("fileKhoiPhuc");

    const file = input.files[0];

    if (!file) {
        alert("Vui lòng chọn file JSON!");
        return;
    }

    if (!confirm(
        "Bạn có chắc muốn khôi phục dữ liệu? " +
        "Dữ liệu hiện tại có thể bị ghi đè."
    )) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {

        try {

            const banSao = JSON.parse(event.target.result);

            if (
                !banSao ||
                !banSao.duLieu ||
                typeof banSao.duLieu !== "object" ||
                Array.isArray(banSao.duLieu) ||
                banSao.ten !== "BBB11 - ĐẠI ĐỘI 11"
            ) {
                throw new Error("File sao lưu không hợp lệ!");
            }

            const duLieu = banSao.duLieu;

            // Kiểm tra dữ liệu trước khi khôi phục
            for (const key of Object.keys(duLieu)) {

                if (!danhSachKhoaDuLieu.includes(key)) {
                    throw new Error("File chứa dữ liệu không hợp lệ!");
                }

                if (!Array.isArray(duLieu[key])) {
                    throw new Error("Định dạng dữ liệu bị lỗi!");
                }

            }

            // Ghi dữ liệu mới
            danhSachKhoaDuLieu.forEach(key => {

                if (Object.prototype.hasOwnProperty.call(duLieu, key)) {

                    localStorage.setItem(
                        key,
                        JSON.stringify(duLieu[key])
                    );

                } else {

                    localStorage.removeItem(key);

                }

            });

            alert("Khôi phục dữ liệu thành công!");

            showPage("home");

        } catch (error) {

            alert("Không thể khôi phục: " + error.message);

        }

    };

    reader.onerror = function() {
        alert("Không thể đọc file!");
    };

    reader.readAsText(file);

}

// =====================================
// KẾT THÚC BƯỚC 20
// =====================================

// =====================================
// BƯỚC 22: TRANG CHỦ BBB11
// =====================================

// Hiển thị trang chủ
function homePage() {

    const user = typeof layNguoiDangNhap === "function"
        ? layNguoiDangNhap()
        : null;

    const tenNguoiDung = user
        ? user.ten
        : "Chiến sĩ Đại đội 11";

    const thanhVien = JSON.parse(
        localStorage.getItem("bbb11_thanhvien") || "[]"
    );

    const baiHoc = JSON.parse(
        localStorage.getItem("bbb11_baihoc") || "[]"
    );

    const thongBao = JSON.parse(
        localStorage.getItem("bbb11_thongbao") || "[]"
    );

    const lich = JSON.parse(
        localStorage.getItem("bbb11_lichcongtac") || "[]"
    );

    return `
        <div class="home-container">

            <div class="hero-section">

                <div class="hero-content">

                    <div class="hero-logo">11</div>

                    <h1>BBB11</h1>

                    <h2>ĐẠI ĐỘI 11</h2>

                    <p>
                        ĐOÀN KẾT - KỶ LUẬT - TRÁCH NHIỆM
                    </p>

                    <h3>
                        🇻🇳 CHÀO MỪNG ${escapeHTML(tenNguoiDung)}
                    </h3>

                    <div id="dongHoBBB11">
                        Đang cập nhật thời gian...
                    </div>

                </div>

            </div>

            <h2 class="section-title">
                📊 THỐNG KÊ NHANH
            </h2>

            <div class="home-stats">

                <div class="stat-card">
                    <span>👥</span>
                    <h3>${thanhVien.length}</h3>
                    <p>Thành viên</p>
                </div>

                <div class="stat-card">
                    <span>🎓</span>
                    <h3>${baiHoc.length}</h3>
                    <p>Bài học</p>
                </div>

                <div class="stat-card">
                    <span>📢</span>
                    <h3>${thongBao.length}</h3>
                    <p>Thông báo</p>
                </div>

                <div class="stat-card">
                    <span>📅</span>
                    <h3>${lich.length}</h3>
                    <p>Lịch công tác</p>
                </div>

            </div>

            <h2 class="section-title">
                🏛️ CÁC CHỨC NĂNG CHÍNH
            </h2>

            <div class="home-menu">

                <div class="home-card"
                    onclick="showPage('member')">
                    <span>👥</span>
                    <h3>Quản lý thành viên</h3>
                    <p>Danh sách thành viên Đại đội 11</p>
                </div>

                <div class="home-card"
                    onclick="showPage('notice')">
                    <span>📢</span>
                    <h3>Bảng tin</h3>
                    <p>Cập nhật thông báo mới</p>
                </div>

                <div class="home-card"
                    onclick="showPage('schedule')">
                    <span>📅</span>
                    <h3>Lịch công tác</h3>
                    <p>Theo dõi lịch hoạt động</p>
                </div>

                <div class="home-card"
                    onclick="showPage('education')">
                    <span>🎓</span>
                    <h3>Giáo dục chính trị</h3>
                    <p>Học tập và rèn luyện</p>
                </div>

                <div class="home-card"
                    onclick="showPage('question')">
                    <span>❓</span>
                    <h3>Mỗi tuần một câu hỏi</h3>
                    <p>Giao lưu và học tập</p>
                </div>

                <div class="home-card"
                    onclick="showPage('score')">
                    <span>🏆</span>
                    <h3>Thi đua</h3>
                    <p>Theo dõi kết quả thi đua</p>
                </div>

                <div class="home-card"
                    onclick="showPage('ranking')">
                    <span>🥇</span>
                    <h3>Bảng xếp hạng</h3>
                    <p>Vinh danh thành tích</p>
                </div>

                <div class="home-card"
                    onclick="showPage('gallery')">
                    <span>📸</span>
                    <h3>Thư viện</h3>
                    <p>Hình ảnh và video</p>
                </div>

                <div class="home-card"
                    onclick="showPage('statistics')">
                    <span>📊</span>
                    <h3>Thống kê</h3>
                    <p>Tổng hợp hoạt động</p>
                </div>

            </div>

            <div class="slogan-box">

                <h2>🇻🇳 KHẨU HIỆU BBB11</h2>

                <h3>
                    ĐOÀN KẾT LÀ SỨC MẠNH
                </h3>

                <p>
                    KỶ LUẬT LÀ NỀN TẢNG
                </p>

                <p>
                    TRÁCH NHIỆM LÀ DANH DỰ
                </p>

            </div>

        </div>
    `;
}

// Đồng hồ thời gian thực
function capNhatDongHoBBB11() {

    const dongHo = document.getElementById(
        "dongHoBBB11"
    );

    if (!dongHo) return;

    const bayGio = new Date();

    const ngay = bayGio.toLocaleDateString("vi-VN");

    const gio = bayGio.toLocaleTimeString("vi-VN");

    dongHo.innerHTML = `
        📅 ${ngay}
        <br>
        🕒 ${gio}
    `;
}

// Cập nhật đồng hồ
function khoiTaoDongHoBBB11() {

    capNhatDongHoBBB11();

    setInterval(capNhatDongHoBBB11, 1000);
}

// =====================================
// KẾT THÚC BƯỚC 22
// =====================================

// =====================================
// CÁC TRANG CHỨC NĂNG BBB11
// =====================================

// 1. CẨM NANG NGƯỜI LÍNH
function manualPage() {
    return `
        <h2>⭐ CẨM NANG NGƯỜI LÍNH</h2>

        <div class="list-item">
            <h3>Điều lệnh và kỷ luật</h3>
            <p>Tìm hiểu những nội dung cơ bản về điều lệnh, chế độ và nền nếp chính quy.</p>
        </div>

        <div class="list-item">
            <h3>Truyền thống quân đội</h3>
            <p>Tìm hiểu truyền thống vẻ vang của Quân đội nhân dân Việt Nam.</p>
        </div>

        <div class="list-item">
            <h3>Phẩm chất người quân nhân</h3>
            <p>Rèn luyện tinh thần đoàn kết, trách nhiệm và ý thức tổ chức kỷ luật.</p>
        </div>
    `;
}

// 2. HỌC TẬP NGHỊ QUYẾT
function resolutionPage() {
    return `
        <h2>📚 HỌC TẬP NGHỊ QUYẾT</h2>

        <div class="list-item">
            <h3>Nội dung học tập</h3>
            <p>Nghiên cứu các nghị quyết, chỉ thị và văn kiện được đơn vị cung cấp.</p>
        </div>

        <div class="list-item">
            <h3>Tài liệu tham khảo</h3>
            <p>Cập nhật tài liệu chính thống phục vụ học tập và nghiên cứu.</p>
        </div>

        <div class="list-item">
            <h3>Ghi chú học tập</h3>
            <textarea id="ghiChuNghiQuyet"
                placeholder="Nhập nội dung ghi chú..."></textarea>

            <button onclick="luuGhiChuNghiQuyet()">
                💾 Lưu ghi chú
            </button>
        </div>
    `;
}

// Lưu ghi chú
function luuGhiChuNghiQuyet() {
    const noiDung = document.getElementById("ghiChuNghiQuyet").value;

    localStorage.setItem("bbb11_ghichu_nghiquyet", noiDung);

    alert("Đã lưu ghi chú!");
}

// 3. ĐỌC BÁO VÀ NGHE TIN
function newsPage() {
    return `
        <h2>📰 ĐỌC BÁO VÀ NGHE TIN</h2>

        <div class="list-item">
            <h3>Báo Quân đội nhân dân</h3>
            <p>Cập nhật tin tức quốc phòng và quân sự.</p>
            <a href="https://www.qdnd.vn/"
                target="_blank" rel="noopener">
                Truy cập báo
            </a>
        </div>

        <div class="list-item">
            <h3>Báo Nhân Dân</h3>
            <p>Cập nhật tin tức chính trị và xã hội.</p>
            <a href="https://nhandan.vn/"
                target="_blank" rel="noopener">
                Truy cập báo
            </a>
        </div>

        <div class="list-item">
            <h3>Đài Tiếng nói Việt Nam</h3>
            <a href="https://vov.vn/"
                target="_blank" rel="noopener">
                Nghe và đọc tin
            </a>
        </div>
    `;
}

// 4. KHO TÀNG ÂM NHẠC
function musicPage() {
    return `
        <h2>🎵 KHO TÀNG ÂM NHẠC</h2>

        <div class="list-item">
            <h3>Âm nhạc truyền thống</h3>
            <p>Không gian giới thiệu các ca khúc truyền thống và cách mạng.</p>
            <a href="https://www.youtube.com/"
                target="_blank" rel="noopener">
                Tìm kiếm bài hát
            </a>
        </div>

        <div class="list-item">
            <h3>Góc âm nhạc Đại đội 11</h3>
            <p>Bổ sung các bài hát do đơn vị lựa chọn và được phép sử dụng.</p>
        </div>
    `;
}

// 5. KIỂM TRA TRẮC NGHIỆM
function quizPage() {
    return `
        <h2>📝 KIỂM TRA TRẮC NGHIỆM</h2>

        <div class="list-item">
            <h3>Câu 1: Quân đội nhân dân Việt Nam thành lập ngày nào?</h3>

            <label>
                <input type="radio" name="quiz1" value="A">
                22/12/1944
            </label>

            <label>
                <input type="radio" name="quiz1" value="B">
                2/9/1945
            </label>

            <label>
                <input type="radio" name="quiz1" value="C">
                30/4/1975
            </label>
        </div>

        <button onclick="chamBaiQuiz()">
            Kiểm tra kết quả
        </button>

        <div id="ketQuaQuiz"></div>
    `;
}

function chamBaiQuiz() {
    const dapAn = document.querySelector(
        'input[name="quiz1"]:checked'
    );

    const ketQua = document.getElementById("ketQuaQuiz");

    if (!dapAn) {
        alert("Bạn chưa chọn đáp án!");
        return;
    }

    if (dapAn.value === "A") {
        ketQua.innerHTML = "<h3>✅ Chính xác! Bạn được 10 điểm.</h3>";
    } else {
        ketQua.innerHTML = "<h3>❌ Chưa chính xác. Đáp án đúng là 22/12/1944.</h3>";
    }
}

// 6. GIÁO DỤC CHÍNH TRỊ
function educationPage() {
    return `
        <h2>🎓 GIÁO DỤC CHÍNH TRỊ</h2>

        <div class="list-item">
            <h3>Giáo dục truyền thống</h3>
            <p>Tìm hiểu lịch sử dân tộc, truyền thống Quân đội nhân dân Việt Nam.</p>
        </div>

        <div class="list-item">
            <h3>Pháp luật và kỷ luật</h3>
            <p>Nâng cao ý thức chấp hành pháp luật Nhà nước và kỷ luật quân đội.</p>
        </div>

        <div class="list-item">
            <h3>Rèn luyện bản thân</h3>
            <p>Phát huy tinh thần trách nhiệm trong học tập và công tác.</p>
        </div>
    `;
}

// 7. LỜI BÁC HỒ DẠY
function bacPage() {
    return `
        <h2>🇻🇳 LỜI BÁC HỒ DẠY</h2>

        <div class="list-item">
            <h3>12 điều kỷ luật khi quan hệ với nhân dân</h3>
            <p>
                Đây là nội dung giáo dục quan trọng về tác phong,
                thái độ và trách nhiệm của người quân nhân với nhân dân.
            </p>
        </div>

        <div class="list-item">
            <h3>Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh</h3>
            <p>
                Không ngừng tu dưỡng, rèn luyện và hoàn thành tốt nhiệm vụ.
            </p>
        </div>
    `;
}

// 8. MỖI TUẦN MỘT CÂU HỎI
function questionPage() {
    return `
        <h2>❓ MỖI TUẦN MỘT CÂU HỎI</h2>

        <div class="list-item">
            <h3>Câu hỏi tuần này</h3>
            <p>Ngày thành lập Quân đội nhân dân Việt Nam là ngày nào?</p>

            <input id="traLoiTuan"
                placeholder="Nhập câu trả lời của bạn">

            <button onclick="kiemTraCauHoiTuan()">
                Gửi câu trả lời
            </button>

            <div id="ketQuaTuan"></div>
        </div>
    `;
}

function kiemTraCauHoiTuan() {
    const traLoi = document.getElementById("traLoiTuan").value.trim();

    const dung = ["22/12/1944", "22-12-1944", "22 tháng 12 năm 1944"];

    const ketQua = document.getElementById("ketQuaTuan");

    if (dung.includes(traLoi.toLowerCase())) {
        ketQua.innerHTML = "<p>✅ Chính xác!</p>";
    } else {
        ketQua.innerHTML = "<p>❌ Hãy thử lại nhé!</p>";
    }
}

// 9. CHẤM ĐIỂM THI ĐUA
function scorePage() {
    return `
        <h2>🏆 CHẤM ĐIỂM THI ĐUA</h2>

        <div class="list-item">
            <input id="tenThiDua" placeholder="Tên cá nhân hoặc tập thể">

            <input id="diemThiDua"
                type="number"
                min="0"
                max="100"
                placeholder="Điểm từ 0 đến 100">

            <button onclick="themDiemThiDua()">
                Lưu kết quả
            </button>
        </div>

        <div id="danhSachThiDua"></div>
    `;
}

function themDiemThiDua() {
    const ten = document.getElementById("tenThiDua").value.trim();
    const diem = Number(document.getElementById("diemThiDua").value);

    if (!ten || !Number.isInteger(diem) || diem < 0 || diem > 100) {
        alert("Vui lòng nhập tên và điểm hợp lệ từ 0 đến 100!");
        return;
    }

    const danhSach = JSON.parse(
        localStorage.getItem("bbb11_thidua") || "[]"
    );

    danhSach.push({ ten, diem });

    localStorage.setItem("bbb11_thidua", JSON.stringify(danhSach));

    document.getElementById("tenThiDua").value = "";
    document.getElementById("diemThiDua").value = "";

    hienThiDiemThiDua();
}

function hienThiDiemThiDua() {
    const danhSach = JSON.parse(
        localStorage.getItem("bbb11_thidua") || "[]"
    );

    const noiDung = document.getElementById("danhSachThiDua");

    noiDung.innerHTML = danhSach.map((item, index) => `
        <div class="list-item">
            <strong>${escapeHTML(item.ten)}</strong>
            <p>${item.diem} điểm</p>
            <button onclick="xoaDiemThiDua(${index})">Xóa</button>
        </div>
    `).join("");
}

// Xóa điểm
function xoaDiemThiDua(index) {
    const danhSach = JSON.parse(
        localStorage.getItem("bbb11_thidua") || "[]"
    );

    danhSach.splice(index, 1);

    localStorage.setItem("bbb11_thidua", JSON.stringify(danhSach));

    hienThiDiemThiDua();
}

// 10. BẢNG TIN THI ĐUA
function rankingPage() {
    const danhSach = JSON.parse(
        localStorage.getItem("bbb11_thidua") || "[]"
    );

    danhSach.sort((a, b) => b.diem - a.diem);

    return `
        <h2>🥇 BẢNG TIN THI ĐUA BBB11</h2>

        ${danhSach.length === 0
            ? "<p>Chưa có kết quả thi đua.</p>"
            : danhSach.map((item, index) => `
                <div class="list-item">
                    <h3>Hạng ${index + 1}</h3>
                    <p>${escapeHTML(item.ten)}</p>
                    <strong>${item.diem} điểm</strong>
                </div>
            `).join("")
        }
    `;
}






// ==========================================
// BBB11 - MỤC 1: BẢNG ĐIỀU KHIỂN NÂNG CAO
// ==========================================

function adminPage() {
    const doc = key => {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    };

    const thanhVien = doc("bbb11_thanhvien");
    const taiKhoan = doc("bbb11_taikhoan");
    const hoatDong = doc("bbb11_hoatdong");
    const lich = doc("bbb11_lichcongtac");
    const thiDua = doc("bbb11_thidua");
    const thongBao = doc("bbb11_notification");

    const tongDiem = thiDua.reduce(
        (sum, item) => sum + (Number(item.diem) || 0), 0
    );

    const diemTB = thiDua.length
        ? (tongDiem / thiDua.length).toFixed(1)
        : 0;

    const lichHoanThanh = lich.filter(
        item => item.hoanThanh
    ).length;

    const soHoatDong = hoatDong.length + lich.length;

    return `
    <div class="page-box">

        <h2>📊 BẢNG ĐIỀU KHIỂN QUẢN TRỊ BBB11</h2>

        <p>Trung tâm quản lý hoạt động Đại đội 11</p>

        <div class="stats-grid">

            <div class="stat-card">
                <i class="fa-solid fa-users"></i>
                <h3>${thanhVien.length}</h3>
                <p>Tổng thành viên</p>
            </div>

            <div class="stat-card">
                <i class="fa-solid fa-user-shield"></i>
                <h3>${taiKhoan.length}</h3>
                <p>Tài khoản hệ thống</p>
            </div>

            <div class="stat-card">
                <i class="fa-solid fa-calendar-days"></i>
                <h3>${soHoatDong}</h3>
                <p>Tổng hoạt động</p>
            </div>

            <div class="stat-card">
                <i class="fa-solid fa-bell"></i>
                <h3>${thongBao.length}</h3>
                <p>Thông báo hệ thống</p>
            </div>

        </div>

        <h3>🏆 THỐNG KÊ THI ĐUA</h3>

        <div class="stats-grid">

            <div class="stat-card">
                <i class="fa-solid fa-medal"></i>
                <h3>${thiDua.length}</h3>
                <p>Kết quả thi đua</p>
            </div>

            <div class="stat-card">
                <i class="fa-solid fa-star"></i>
                <h3>${diemTB}</h3>
                <p>Điểm trung bình</p>
            </div>

            <div class="stat-card">
                <i class="fa-solid fa-check-circle"></i>
                <h3>${lichHoanThanh}</h3>
                <p>Lịch đã hoàn thành</p>
            </div>

            <div class="stat-card">
                <i class="fa-solid fa-clock"></i>
                <h3>${lich.length - lichHoanThanh}</h3>
                <p>Lịch chưa hoàn thành</p>
            </div>

        </div>

        <h3>📈 TIẾN ĐỘ CÔNG TÁC</h3>

        <div class="list-item">

            <p>
                Đã hoàn thành:
                ${lichHoanThanh}/${lich.length}
            </p>

            <div style="
                background:#ddd;
                height:18px;
                border-radius:20px;
                overflow:hidden;
            ">
                <div style="
                    width:${lich.length
                        ? lichHoanThanh / lich.length * 100
                        : 0}%;
                    height:100%;
                    background:#287a36;
                "></div>
            </div>

            <p>
                ${lich.length
                    ? Math.round(lichHoanThanh / lich.length * 100)
                    : 0}% hoàn thành
            </p>

        </div>

        <h3>⚡ TRUY CẬP NHANH</h3>

        <div class="management-toolbar">

            <button class="btn-add"
                onclick="showPage('members')">
                👥 Quản lý thành viên
            </button>

            <button class="btn-add"
                onclick="showPage('accounts')">
                🔐 Quản lý tài khoản
            </button>

            <button class="btn-add"
                onclick="showPage('attendance')">
                📋 Điểm danh
            </button>

            <button class="btn-add"
                onclick="showPage('activities')">
                📅 Hoạt động
            </button>

            <button class="btn-add"
                onclick="showPage('reports')">
                📊 Báo cáo
            </button>

        </div>

        <h3>🏅 TOP THI ĐUA</h3>

        ${thiDua.length
            ? [...thiDua]
                .sort((a,b) => Number(b.diem) - Number(a.diem))
                .slice(0,5)
                .map((item,index) => `
                    <div class="list-item">
                        <strong>Hạng ${index + 1}:
                            ${escapeHTML(item.ten)}
                        </strong>
                        <p>${Number(item.diem) || 0} điểm</p>
                    </div>
                `).join("")
            : `<div class="list-item">
                Chưa có dữ liệu thi đua.
               </div>`
        }

        <h3>🔔 THÔNG BÁO GẦN ĐÂY</h3>

        ${thongBao.length
            ? thongBao.slice(0,5).map(item => `
                <div class="notice-card">
                    <strong>${escapeHTML(item.tieuDe || "Thông báo")}</strong>
                    <p>${escapeHTML(item.noiDung || "")}</p>
                    <small>${escapeHTML(item.ngay || "")}</small>
                </div>
            `).join("")
            : `<div class="list-item">
                Chưa có thông báo mới.
               </div>`
        }

        <button class="action-button"
            onclick="showHome()">
            🏠 Về trang chủ
        </button>

    </div>
    `;
}

// ==========================================
// KẾT THÚC MỤC 1
// ==========================================

 // ==========================================
 // BBB11 - MỤC 2: QUẢN LÝ THÀNH VIÊN
 // ==========================================

function layDanhSachThanhVien() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_thanhvien") || "[]"
        );
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function luuDanhSachThanhVien(data) {
    localStorage.setItem(
        "bbb11_thanhvien",
        JSON.stringify(data)
    );
}

function membersPage() {
    const danhSach = layDanhSachThanhVien();

    return `
    <div class="page-box">

        <h2>👥 QUẢN LÝ THÀNH VIÊN ĐẠI ĐỘI 11</h2>

        <div class="stats-grid">
            <div class="stat-card">
                <i class="fa-solid fa-users"></i>
                <h3>${danhSach.length}</h3>
                <p>Tổng thành viên</p>
            </div>
        </div>

        <h3>➕ THÊM THÀNH VIÊN</h3>

        <div class="form-grid">

            <div class="form-group">
                <label>Họ và tên</label>
                <input id="tvHoTen" placeholder="Nhập họ và tên">
            </div>

            <div class="form-group">
                <label>Ngày sinh</label>
                <input id="tvNgaySinh" type="date">
            </div>

            <div class="form-group">
                <label>Chức vụ</label>
                <select id="tvChucVu">
                    <option value="">Chọn chức vụ</option>
                    <option>Đại đội trưởng</option>
                    <option>Chính trị viên</option>
                    <option>Phó đại đội trưởng</option>
                    <option>Trung đội trưởng</option>
                    <option>Tiểu đội trưởng</option>
                    <option>Chiến sĩ</option>
                </select>
            </div>

            <div class="form-group">
                <label>Cấp bậc</label>
                <input id="tvCapBac" placeholder="Ví dụ: Trung sĩ">
            </div>

            <div class="form-group">
                <label>Số điện thoại</label>
                <input id="tvDienThoai" type="tel">
            </div>

            <div class="form-group">
                <label>Ngày nhập ngũ</label>
                <input id="tvNhapNgu" type="date">
            </div>

        </div>

        <label>Ghi chú</label>
        <textarea id="tvGhiChu"
            placeholder="Thông tin bổ sung..."></textarea>

        <input type="hidden" id="tvEditId">

        <div class="form-actions">
            <button class="btn-add"
                onclick="luuThanhVien()">
                💾 Lưu thành viên
            </button>

            <button class="action-button"
                onclick="lamMoiFormThanhVien()">
                Làm mới
            </button>
        </div>

        <h3>📋 DANH SÁCH THÀNH VIÊN</h3>

        <div class="management-toolbar">
            <input
                id="tvTimKiem"
                placeholder="Tìm theo họ tên..."
                oninput="hienThiThanhVien()"
            >

            <select id="tvLocChucVu"
                onchange="hienThiThanhVien()">
                <option value="">Tất cả chức vụ</option>
                <option>Đại đội trưởng</option>
                <option>Chính trị viên</option>
                <option>Phó đại đội trưởng</option>
                <option>Trung đội trưởng</option>
                <option>Tiểu đội trưởng</option>
                <option>Chiến sĩ</option>
            </select>
        </div>

        <div id="tvDanhSach"></div>

    </div>
    `;
}

// Thêm hoặc sửa thành viên
function luuThanhVien() {
    const lay = id => document.getElementById(id).value.trim();

    const hoTen = lay("tvHoTen");
    const ngaySinh = lay("tvNgaySinh");
    const chucVu = lay("tvChucVu");
    const capBac = lay("tvCapBac");
    const dienThoai = lay("tvDienThoai");
    const nhapNgu = lay("tvNhapNgu");
    const ghiChu = lay("tvGhiChu");
    const editId = lay("tvEditId");

    if (!hoTen || !chucVu || !capBac) {
        alert("Vui lòng nhập họ tên, chức vụ và cấp bậc!");
        return;
    }

    if (dienThoai && !/^[0-9+\-\s]{8,15}$/.test(dienThoai)) {
        alert("Số điện thoại không hợp lệ!");
        return;
    }

    const danhSach = layDanhSachThanhVien();

    if (editId) {
        const index = danhSach.findIndex(
            item => String(item.id) === editId
        );

        if (index === -1) return;

        danhSach[index] = {
            ...danhSach[index],
            hoTen,
            ten: hoTen,
            ngaySinh,
            chucVu,
            capBac,
            dienThoai,
            nhapNgu,
            ghiChu
        };

        alert("Đã cập nhật thành viên!");
    } else {
        danhSach.push({
            id: Date.now().toString(),
            hoTen,
            ten: hoTen,
            ngaySinh,
            chucVu,
            capBac,
            dienThoai,
            nhapNgu,
            ghiChu,
            ngayTao: new Date().toISOString()
        });

        alert("Đã thêm thành viên thành công!");
    }

    luuDanhSachThanhVien(danhSach);

    showPage("members");
}

// Hiển thị danh sách
function hienThiThanhVien() {
    const noiDung = document.getElementById("tvDanhSach");

    if (!noiDung) return;

    const tuKhoa = (
        document.getElementById("tvTimKiem")?.value || ""
    ).toLowerCase();

    const chucVu = (
        document.getElementById("tvLocChucVu")?.value || ""
    );

    const danhSach = layDanhSachThanhVien().filter(item => {
        const ten = String(item.hoTen || item.ten || "").toLowerCase();

        return ten.includes(tuKhoa) &&
            (!chucVu || item.chucVu === chucVu);
    });

    if (!danhSach.length) {
        noiDung.innerHTML =
            '<div class="list-item">Không tìm thấy thành viên.</div>';
        return;
    }

    noiDung.innerHTML = `
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ tên</th>
                        <th>Chức vụ</th>
                        <th>Cấp bậc</th>
                        <th>Điện thoại</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    ${danhSach.map((item, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${escapeHTML(item.hoTen || item.ten || "")}</td>
                            <td>${escapeHTML(item.chucVu || "")}</td>
                            <td>${escapeHTML(item.capBac || "")}</td>
                            <td>${escapeHTML(item.dienThoai || "")}</td>
                            <td>
                                <button class="btn-edit"
                                    onclick="suaThanhVien('${encodeURIComponent(String(item.id))}')">
                                    Sửa
                                </button>

                                <button class="btn-delete"
                                    onclick="xoaThanhVien('${encodeURIComponent(String(item.id))}')">
                                    Xóa
                                </button>

                                <button class="action-button"
                                    onclick="xemHoSoThanhVien('${encodeURIComponent(String(item.id))}')">
                                    Xem
                                </button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

// Sửa thông tin
function suaThanhVien(encodedId) {
    const id = decodeURIComponent(encodedId);
    const item = layDanhSachThanhVien().find(
        tv => String(tv.id) === id
    );

    if (!item) return;

    document.getElementById("tvHoTen").value = item.hoTen || item.ten || "";
    document.getElementById("tvNgaySinh").value = item.ngaySinh || "";
    document.getElementById("tvChucVu").value = item.chucVu || "";
    document.getElementById("tvCapBac").value = item.capBac || "";
    document.getElementById("tvDienThoai").value = item.dienThoai || "";
    document.getElementById("tvNhapNgu").value = item.nhapNgu || "";
    document.getElementById("tvGhiChu").value = item.ghiChu || "";
    document.getElementById("tvEditId").value = id;

    document.getElementById("tvHoTen").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// Xóa thành viên
function xoaThanhVien(encodedId) {
    const id = decodeURIComponent(encodedId);

    if (!confirm("Bạn có chắc chắn muốn xóa thành viên này?")) {
        return;
    }

    const danhSach = layDanhSachThanhVien().filter(
        item => String(item.id) !== id
    );

    luuDanhSachThanhVien(danhSach);
    showPage("members");
}

// Xem hồ sơ
function xemHoSoThanhVien(encodedId) {
    const id = decodeURIComponent(encodedId);

    const item = layDanhSachThanhVien().find(
        tv => String(tv.id) === id
    );

    if (!item) return;

    const hoSo = document.getElementById("tvDanhSach");

    hoSo.innerHTML = `
        <div class="list-item">
            <h3>👤 HỒ SƠ THÀNH VIÊN</h3>

            <p>Họ tên: ${escapeHTML(item.hoTen || item.ten || "")}</p>
            <p>Ngày sinh: ${escapeHTML(item.ngaySinh || "Chưa cập nhật")}</p>
            <p>Chức vụ: ${escapeHTML(item.chucVu || "")}</p>
            <p>Cấp bậc: ${escapeHTML(item.capBac || "")}</p>
            <p>Điện thoại: ${escapeHTML(item.dienThoai || "")}</p>
            <p>Ngày nhập ngũ: ${escapeHTML(item.nhapNgu || "")}</p>
            <p>Ghi chú: ${escapeHTML(item.ghiChu || "")}</p>

            <button class="action-button"
                onclick="hienThiThanhVien()">
                Quay lại danh sách
            </button>
        </div>
    `;
}

// Làm mới biểu mẫu
function lamMoiFormThanhVien() {
    [
        "tvHoTen",
        "tvNgaySinh",
        "tvChucVu",
        "tvCapBac",
        "tvDienThoai",
        "tvNhapNgu",
        "tvGhiChu",
        "tvEditId"
    ].forEach(id => {
        document.getElementById(id).value = "";
    });
}

// ==========================================
// KẾT THÚC MỤC 2
// ==========================================

// ==========================================
// BBB11 - MỤC 3: QUẢN LÝ TÀI KHOẢN
// ==========================================

function layTaiKhoanBBB11() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_taikhoan") || "[]"
        );
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function luuTaiKhoanBBB11(data) {
    localStorage.setItem(
        "bbb11_taikhoan",
        JSON.stringify(data)
    );
}

function accountsPage() {
    const danhSach = layTaiKhoanBBB11();

    const admin = danhSach.filter(
        item => item.role === "admin"
    ).length;

    const member = danhSach.filter(
        item => item.role === "member"
    ).length;

    return `
    <div class="page-box">

        <h2>🔐 QUẢN LÝ TÀI KHOẢN BBB11</h2>

        <div class="stats-grid">
            <div class="stat-card">
                <h3>${danhSach.length}</h3>
                <p>Tổng tài khoản</p>
            </div>

            <div class="stat-card">
                <h3>${admin}</h3>
                <p>Quản trị viên</p>
            </div>

            <div class="stat-card">
                <h3>${member}</h3>
                <p>Thành viên</p>
            </div>
        </div>

        <h3>➕ TẠO TÀI KHOẢN</h3>

        <div class="form-grid">

            <div class="form-group">
                <label>Tên đăng nhập</label>
                <input id="tkUsername"
                    placeholder="Nhập tên đăng nhập">
            </div>

            <div class="form-group">
                <label>Họ và tên</label>
                <input id="tkTen"
                    placeholder="Nhập họ tên">
            </div>

            <div class="form-group">
                <label>Mật khẩu</label>
                <input id="tkPassword"
                    type="password"
                    placeholder="Nhập mật khẩu">
            </div>

            <div class="form-group">
                <label>Phân quyền</label>
                <select id="tkRole">
                    <option value="member">Thành viên</option>
                    <option value="admin">Quản trị viên</option>
                </select>
            </div>

        </div>

        <input type="hidden" id="tkEditId">

        <button class="btn-add"
            onclick="luuTaiKhoanMoi()">
            💾 Lưu tài khoản
        </button>

        <button class="action-button"
            onclick="lamMoiTaiKhoan()">
            Làm mới
        </button>

        <h3>📋 DANH SÁCH TÀI KHOẢN</h3>

        <input id="tkTimKiem"
            placeholder="Tìm kiếm tài khoản..."
            oninput="hienThiTaiKhoan()">

        <div id="tkDanhSach"></div>

    </div>
    `;
}

// Thêm hoặc sửa tài khoản
function luuTaiKhoanMoi() {
    const username = document
        .getElementById("tkUsername").value.trim();

    const ten = document
        .getElementById("tkTen").value.trim();

    const password = document
        .getElementById("tkPassword").value;

    const role = document
        .getElementById("tkRole").value;

    const editId = document
        .getElementById("tkEditId").value;

    if (!username || !ten || (!password && !editId)) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (username.length < 4) {
        alert("Tên đăng nhập phải có ít nhất 4 ký tự!");
        return;
    }

    if (password && password.length < 8) {
        alert("Mật khẩu phải có ít nhất 8 ký tự!");
        return;
    }

    const danhSach = layTaiKhoanBBB11();

    const trung = danhSach.some(item =>
        item.username.toLowerCase() === username.toLowerCase() &&
        String(item.id) !== editId
    );

    if (trung) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

    if (editId) {
        const item = danhSach.find(
            tk => String(tk.id) === editId
        );

        if (!item) return;

        item.username = username;
        item.ten = ten;
        item.role = role;

        // Không thay đổi mật khẩu nếu để trống.
        if (password) {
            item.password = password;
        }

        alert("Đã cập nhật tài khoản!");
    } else {
        danhSach.push({
            id: Date.now().toString(),
            username,
            ten,
            password,
            role,
            khoa: false
        });

        alert("Đã tạo tài khoản!");
    }

    luuTaiKhoanBBB11(danhSach);
    showPage("accounts");
}

// Hiển thị danh sách
function hienThiTaiKhoan() {
    const noiDung = document.getElementById("tkDanhSach");

    if (!noiDung) return;

    const tuKhoa = (
        document.getElementById("tkTimKiem")?.value || ""
    ).toLowerCase();

    const danhSach = layTaiKhoanBBB11().filter(item =>
        String(item.username).toLowerCase().includes(tuKhoa) ||
        String(item.ten).toLowerCase().includes(tuKhoa)
    );

    if (!danhSach.length) {
        noiDung.innerHTML =
            '<div class="list-item">Chưa có tài khoản phù hợp.</div>';
        return;
    }

    noiDung.innerHTML = `
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tài khoản</th>
                        <th>Họ tên</th>
                        <th>Quyền</th>
                        <th>Trạng thái</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>

                <tbody>
                    ${danhSach.map((item, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${escapeHTML(item.username)}</td>
                            <td>${escapeHTML(item.ten)}</td>
                            <td>
                                ${item.role === "admin"
                                    ? "Quản trị viên"
                                    : "Thành viên"}
                            </td>
                            <td>
                                ${item.khoa
                                    ? "Đã khóa"
                                    : "Đang hoạt động"}
                            </td>
                            <td>
                                <button class="btn-edit"
                                    onclick="suaTaiKhoan('${encodeURIComponent(String(item.id))}')">
                                    Sửa
                                </button>

                                <button class="action-button"
                                    onclick="doiTrangThaiTaiKhoan('${encodeURIComponent(String(item.id))}')">
                                    ${item.khoa ? "Mở khóa" : "Khóa"}
                                </button>

                                <button class="btn-delete"
                                    onclick="xoaTaiKhoan('${encodeURIComponent(String(item.id))}')">
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

// Sửa tài khoản
function suaTaiKhoan(encodedId) {
    const id = decodeURIComponent(encodedId);

    const item = layTaiKhoanBBB11().find(
        tk => String(tk.id) === id
    );

    if (!item) return;

    document.getElementById("tkUsername").value = item.username;
    document.getElementById("tkTen").value = item.ten;
    document.getElementById("tkPassword").value = "";
    document.getElementById("tkRole").value = item.role;
    document.getElementById("tkEditId").value = id;

    document.getElementById("tkUsername").scrollIntoView({
        behavior: "smooth"
    });
}

// Khóa hoặc mở khóa
function doiTrangThaiTaiKhoan(encodedId) {
    const id = decodeURIComponent(encodedId);
    const danhSach = layTaiKhoanBBB11();

    const item = danhSach.find(
        tk => String(tk.id) === id
    );

    if (!item) return;

    if (item.username === "admin") {
        alert("Không thể khóa tài khoản quản trị mặc định!");
        return;
    }

    item.khoa = !item.khoa;

    luuTaiKhoanBBB11(danhSach);
    showPage("accounts");
}

// Xóa tài khoản
function xoaTaiKhoan(encodedId) {
    const id = decodeURIComponent(encodedId);
    const danhSach = layTaiKhoanBBB11();

    const item = danhSach.find(
        tk => String(tk.id) === id
    );

    if (!item) return;

    if (item.username === "admin") {
        alert("Không thể xóa tài khoản quản trị mặc định!");
        return;
    }

    if (!confirm("Bạn có chắc muốn xóa tài khoản này?")) {
        return;
    }

    luuTaiKhoanBBB11(
        danhSach.filter(tk => String(tk.id) !== id)
    );

    showPage("accounts");
}

// Làm mới biểu mẫu
function lamMoiTaiKhoan() {
    [
        "tkUsername",
        "tkTen",
        "tkPassword",
        "tkEditId"
    ].forEach(id => {
        document.getElementById(id).value = "";
    });

    document.getElementById("tkRole").value = "member";
}

// ==========================================
// KẾT THÚC MỤC 3
// ==========================================

// ==========================================
// BBB11 - BƯỚC 23: HỆ THỐNG PHÂN QUYỀN
// ==========================================

// Các trang chỉ dành cho Admin
const trangAdminBBB11 = [
    "admin",
    "accounts",
    "reports"
];

// Kiểm tra quyền truy cập
function kiemTraQuyenBBB11(page) {

    const user = layNguoiDangNhap();

    // Chưa đăng nhập
    if (!user) {
        alert("Vui lòng đăng nhập trước!");
        showPage("login");
        return false;
    }

    // Kiểm tra quyền Admin
    if (
        trangAdminBBB11.includes(page) &&
        user.role !== "admin"
    ) {
        alert("Bạn không có quyền truy cập chức năng này!");
        showPage("home");
        return false;
    }

    return true;
}

// Kiểm tra trạng thái tài khoản
function kiemTraTaiKhoanBBB11(username) {

    const danhSach = layTaiKhoanBBB11();

    const taiKhoan = danhSach.find(
        item => item.username === username
    );

    if (taiKhoan && taiKhoan.khoa) {
        return false;
    }

    return true;
}

// Kiểm tra Admin
function yeuCauAdminBBB11() {

    if (!layNguoiDangNhap()) {
        alert("Vui lòng đăng nhập!");
        showPage("login");
        return false;
    }

    if (!laQuanTriVien()) {
        alert("Chức năng chỉ dành cho quản trị viên!");
        showPage("home");
        return false;
    }

    return true;
}

// Kiểm tra thành viên
function yeuCauDangNhapBBB11() {

    if (!layNguoiDangNhap()) {
        alert("Bạn cần đăng nhập!");
        showPage("login");
        return false;
    }

    return true;
}

// ==========================================
// KẾT THÚC BƯỚC 23
// ==========================================

// ==========================================
// BBB11 - BƯỚC 24: QUẢN LÝ ĐIỂM DANH
// ==========================================

function layDuLieuDiemDanh() {
    try {
        const data = JSON.parse(
            localStorage.getItem("bbb11_diemdanh") || "[]"
        );
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function luuDuLieuDiemDanh(data) {
    localStorage.setItem(
        "bbb11_diemdanh",
        JSON.stringify(data)
    );
}

// Trang điểm danh
function attendancePage() {
    if (!yeuCauAdminBBB11()) return "";

    const thanhVien = layDanhSachThanhVien();

    return `
    <div class="page-box">

        <h2>📋 ĐIỂM DANH ĐẠI ĐỘI 11</h2>

        <label>Ngày điểm danh</label>
        <input type="date" id="ddNgay"
            value="${new Date().toISOString().slice(0,10)}">

        <h3>👥 DANH SÁCH THÀNH VIÊN</h3>

        <div id="ddDanhSach">

        ${thanhVien.length === 0
            ? "<p>Chưa có thành viên.</p>"
            : thanhVien.map(item => `
                <div class="list-item">

                    <strong>
                        ${escapeHTML(item.hoTen || item.ten || "")}
                    </strong>

                    <p>
                        ${escapeHTML(item.chucVu || "")}
                    </p>

                    <select id="dd_${encodeURIComponent(String(item.id))}">
                        <option value="Có mặt">Có mặt</option>
                        <option value="Vắng mặt">Vắng mặt</option>
                        <option value="Có phép">Có phép</option>
                        <option value="Đi muộn">Đi muộn</option>
                    </select>

                </div>
            `).join("")
        }

        </div>

        <button class="btn-add"
            onclick="luuDiemDanhBBB11()">
            💾 LƯU ĐIỂM DANH
        </button>

        <h3>📊 LỊCH SỬ ĐIỂM DANH</h3>

        <div id="ddLichSu"></div>

    </div>
    `;
}

// Lưu điểm danh
function luuDiemDanhBBB11() {

    if (!yeuCauAdminBBB11()) return;

    const ngay = document.getElementById("ddNgay").value;

    if (!ngay) {
        alert("Vui lòng chọn ngày điểm danh!");
        return;
    }

    const thanhVien = layDanhSachThanhVien();
    const danhSach = layDuLieuDiemDanh();

    const ketQua = thanhVien.map(item => {

        const id = encodeURIComponent(String(item.id));

        const trangThai = document.getElementById("dd_" + id).value;

        return {
            thanhVienId: String(item.id),
            hoTen: item.hoTen || item.ten || "",
            trangThai
        };
    });

    const index = danhSach.findIndex(
        item => item.ngay === ngay
    );

    const banGhi = {
        ngay,
        danhSach: ketQua,
        ngayCapNhat: new Date().toISOString()
    };

    if (index >= 0) {
        danhSach[index] = banGhi;
    } else {
        danhSach.unshift(banGhi);
    }

    luuDuLieuDiemDanh(danhSach);

    alert("Đã lưu điểm danh thành công!");

    hienThiLichSuDiemDanh();
}

// Hiển thị lịch sử
function hienThiLichSuDiemDanh() {

    const noiDung = document.getElementById("ddLichSu");

    if (!noiDung) return;

    const danhSach = layDuLieuDiemDanh();

    if (!danhSach.length) {
        noiDung.innerHTML =
            "<p>Chưa có dữ liệu điểm danh.</p>";
        return;
    }

    noiDung.innerHTML = danhSach.map(item => {

        const coMat = item.danhSach.filter(
            tv => tv.trangThai === "Có mặt"
        ).length;

        const vangMat = item.danhSach.filter(
            tv => tv.trangThai === "Vắng mặt"
        ).length;

        return `
            <div class="list-item">

                <h3>📅 Ngày ${escapeHTML(item.ngay)}</h3>

                <p>👥 Tổng số: ${item.danhSach.length}</p>

                <p>✅ Có mặt: ${coMat}</p>

                <p>❌ Vắng mặt: ${vangMat}</p>

                <button onclick="xemChiTietDiemDanh('${item.ngay}')">
                    Xem chi tiết
                </button>

            </div>
        `;
    }).join("");
}

// Xem chi tiết
function xemChiTietDiemDanh(ngay) {

    const item = layDuLieuDiemDanh().find(
        data => data.ngay === ngay
    );

    if (!item) return;

    const noiDung = document.getElementById("ddLichSu");

    noiDung.innerHTML = `
        <div class="list-item">

            <h3>📋 ĐIỂM DANH NGÀY ${escapeHTML(ngay)}</h3>

            ${item.danhSach.map(tv => `
                <p>
                    ${escapeHTML(tv.hoTen)}
                    — ${escapeHTML(tv.trangThai)}
                </p>
            `).join("")}

            <button onclick="hienThiLichSuDiemDanh()">
                Quay lại
            </button>

        </div>
    `;
}

// ==========================================
// KẾT THÚC BƯỚC 24
// ==========================================
