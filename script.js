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


/* =====================================================
   BBB11 - TRANG TRUYỀN THỐNG ĐƠN VỊ
   Không thay thế hàm showPage() hiện có.
===================================================== */

window.traditionPage = function () {
    return `
    <style>
    .tt-page {
        --tt-gold: #ffdc70;
        --tt-red: #b50919;
        color: #fff6df;
        padding: 16px;
        border: 1px solid #cba94a;
        border-radius: 18px;
        background:
            radial-gradient(ellipse at top, #17683b, transparent 55%),
            linear-gradient(145deg, #073820, #02160c);
        font-family: Arial, sans-serif;
        overflow: hidden;
    }

    .tt-page * { box-sizing: border-box; }

    .tt-hero {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        text-align: center;
        padding: 35px 15px;
        border: 1px solid var(--tt-gold);
        border-radius: 18px;
        background:
            linear-gradient(90deg, #031b10eF, #07532cce, #031b10eF),
            url('https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/truyen-thong-su%20doan.png')
            center/cover;
    }

    .tt-hero:before {
        content: "★";
        position: absolute;
        z-index: -1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #ffdc701c;
        font-size: clamp(160px, 30vw, 320px);
    }

    .tt-emblem {
        display: grid;
        place-items: center;
        width: 68px;
        height: 68px;
        margin: auto auto 14px;
        border-radius: 50%;
        background: linear-gradient(135deg, #fff2a4, #d49a21);
        color: #a60012;
        border: 3px solid #fff0a0;
        box-shadow: 0 0 25px #ffdc7066;
        font-size: 32px;
    }

    .tt-label {
        display: inline-block;
        padding: 8px 17px;
        border: 1px solid var(--tt-gold);
        border-radius: 30px;
        background: #07512d;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .tt-hero h1 {
        margin: 18px 0 12px;
        color: var(--tt-gold);
        font-size: clamp(27px, 4.5vw, 52px);
        font-weight: 900;
        line-height: 1.2;
        text-shadow: 0 3px 0 #583900, 0 0 20px #ffdc7066;
    }

    .tt-ribbon {
        display: inline-block;
        padding: 10px 22px;
        background: linear-gradient(90deg, #85000b, #d51424, #85000b);
        color: #fff0a0;
        font-weight: 900;
    }

    .tt-motto {
        color: #fff0b5;
        font-style: italic;
        font-size: 17px;
        margin-bottom: 0;
    }

    .tt-section { margin-top: 23px; }

    .tt-heading {
        color: var(--tt-gold);
        font-size: clamp(18px, 2.5vw, 26px);
        font-weight: 900;
        padding-bottom: 12px;
        margin: 0 0 15px;
        border-bottom: 1px solid #ffdc7070;
    }

    .tt-top-grid {
        display: grid;
        grid-template-columns: minmax(0, 3fr) minmax(230px, 1fr);
        gap: 16px;
        margin-top: 20px;
    }

    .tt-panel {
        min-width: 0;
        border: 1px solid #dcb644;
        border-radius: 17px;
        background: linear-gradient(145deg, #0b4b2a, #032217);
        box-shadow: 0 7px 22px #0004;
        overflow: hidden;
    }

    .tt-cards {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
    }

    .tt-card {
        min-width: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid #dcb644;
        border-radius: 13px;
        background: #062819;
    }

    .tt-card-picture {
        height: 125px;
        display: grid;
        place-items: center;
        color: #ffdf76;
        font-size: 42px;
        background:
            radial-gradient(circle at center, #267a45, transparent 65%),
            linear-gradient(135deg, #12472c, #03180e);
        border-bottom: 1px solid #dcb64455;
    }

    .tt-card-body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
        padding: 13px;
    }

    .tt-card h3 {
        color: var(--tt-gold);
        font-size: 16px;
        line-height: 1.4;
        margin: 0 0 8px;
    }

    .tt-card p {
        color: #f4eedc;
        font-size: 13px;
        line-height: 1.6;
        margin: 0 0 14px;
    }

    .tt-btn {
        margin-top: auto;
        padding: 10px 14px;
        border: 0;
        border-radius: 25px;
        background: linear-gradient(135deg, #fff1a4, #dfa21e);
        color: #392600;
        font-weight: bold;
        cursor: pointer;
        transition: .2s;
    }

    .tt-btn:hover {
        transform: translateY(-2px);
        filter: brightness(1.08);
    }

    .tt-detail {
        margin-top: 15px;
        padding: 17px;
        border: 1px solid var(--tt-gold);
        border-radius: 12px;
        background: #03190f;
        line-height: 1.8;
    }

    .tt-detail h3 { color: var(--tt-gold); }

    .tt-quote {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 24px;
        min-height: 250px;
        background:
            linear-gradient(145deg, #064021ed, #02170eeb),
            url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80')
            center/cover;
    }

    .tt-quote-mark {
        color: var(--tt-gold);
        font-family: Georgia, serif;
        font-size: 60px;
    }

    .tt-quote blockquote {
        margin: 8px 0 18px;
        color: #fff0be;
        font-family: Georgia, serif;
        font-size: 19px;
        font-weight: bold;
        font-style: italic;
        line-height: 1.7;
    }

    .tt-video-grid {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(240px, 1fr);
        gap: 16px;
    }

    .tt-video-main { padding: 17px; }

    .tt-player {
        position: relative;
        width: 100%;
        aspect-ratio: 16/9;
        background: #000;
        border: 1px solid var(--tt-gold);
        border-radius: 12px;
        overflow: hidden;
    }

    .tt-player iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
    }

    .tt-placeholder {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 15px;
        text-align: center;
        color: #fff0a8;
        background: radial-gradient(circle, #145d35, #020d08);
    }

    .tt-placeholder i { font-size: 48px; }

    .tt-video-info h3 {
        color: var(--tt-gold);
        line-height: 1.4;
    }

    .tt-video-info p { line-height: 1.7; }

    .tt-playlist-title {
        padding: 16px;
        background: linear-gradient(135deg, #fff0a0, #e6ae31);
        color: #17391d;
        font-weight: 900;
    }

    .tt-playlist {
        display: grid;
        gap: 9px;
        padding: 11px;
    }

    .tt-video-item {
        display: grid;
        grid-template-columns: 75px minmax(0, 1fr);
        gap: 10px;
        align-items: center;
        width: 100%;
        padding: 9px;
        text-align: left;
        border: 1px solid #d5ad3c66;
        border-radius: 10px;
        background: #ffffff08;
        color: #fff4d5;
        cursor: pointer;
    }

    .tt-video-item.active,
    .tt-video-item:hover {
        border-color: var(--tt-gold);
        background: #ffdc7018;
    }

    .tt-video-icon {
        display: grid;
        place-items: center;
        height: 55px;
        border-radius: 7px;
        background: #124b2b;
        color: #ffdf76;
        font-size: 23px;
    }

    .tt-video-item strong {
        display: block;
        font-size: 13px;
        line-height: 1.5;
    }

    .tt-video-item small {
        display: block;
        margin-top: 4px;
        color: #e8dfc5;
        font-size: 11px;
    }

    .tt-footer {
        margin-top: 22px;
        padding: 17px;
        text-align: center;
        color: #a10013;
        background: linear-gradient(90deg, #d99b25, #fff0a0, #d99b25);
        border: 2px solid #fff0a0;
        font-weight: 900;
        line-height: 1.7;
    }

    @media(max-width: 850px) {
        .tt-top-grid,
        .tt-video-grid { grid-template-columns: 1fr; }
        .tt-quote { min-height: 200px; }
    }

    @media(max-width: 600px) {
        .tt-page { padding: 9px; border-radius: 12px; }
        .tt-hero { padding: 28px 12px; }
        .tt-cards { grid-template-columns: 1fr; }
        .tt-card { display: grid; grid-template-columns: 95px minmax(0, 1fr); }
        .tt-card-picture { height: 100%; min-height: 160px; font-size: 30px; }
        .tt-card-body { padding: 11px; }
        .tt-card h3 { font-size: 15px; }
        .tt-heading { font-size: 18px; }
        .tt-video-main { padding: 11px; }
        .tt-video-item { grid-template-columns: 65px minmax(0, 1fr); }
        .tt-quote { padding: 18px; }
        .tt-quote blockquote { font-size: 17px; }
        .tt-footer { padding: 13px 9px; font-size: 13px; }
    }

    @media(prefers-reduced-motion: reduce) {
        .tt-page * { scroll-behavior: auto !important; transition: none !important; }
    }
    </style>

    <div class="tt-page">
      
<header class="hero hero-image tradition-banner-fix">
    <img
        src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/truyen-thong-banner.png"
        alt="Truyền thống đơn vị - Giáo dục chính trị"
    >
</header>


       
<div class="tt-top-grid">

    <section class="tt-panel" style="padding:16px">

        <h2 class="tt-heading">
            <i class="fa-solid fa-book-open"></i>
            TÌM HIỂU TRUYỀN THỐNG
        </h2>

        <div class="tt-cards">

            <!-- THẺ 1: SƯ ĐOÀN -->
            <article class="tt-card">
                <div class="tt-card-picture">
                    <img
                        id="ttImage1"
                        class="tt-upload-image"
                        src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/truyen-thong-su%20doan.png"
                        alt="Ảnh truyền thống Sư đoàn"
                        style="display:block;width:100%;height:100%;object-fit:cover;"
                    >
         
                </div>

                <div class="tt-card-body">
                    <h3>Truyền thống Sư đoàn</h3>
                    <p>Hình ảnh truyền thống và thành tích của Sư đoàn.</p>
              
                    <button class="tt-btn"
            onclick="bbb11ShowTraditionDetail('company')">
        Tìm hiểu <i class="fa-solid fa-arrow-right"></i>
    </button>
            </article>

            <!-- THẺ 2: TRUNG ĐOÀN -->
            <article class="tt-card">
                <div class="tt-card-picture">
                    <img
                        id="ttImage2"
                        class="tt-upload-image"
                        src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/truyen-thong-trung%20doan.png"
                        alt="Ảnh truyền thống Trung đoàn"
                        style="display:block;width:100%;height:100%;object-fit:cover;"
                    >
                </div>

                <div class="tt-card-body">
                    <h3>Truyền thống Trung đoàn</h3>
                    <p>Hình ảnh truyền thống, hoạt động và thành tích của Trung đoàn.</p>
                 <div class="tt-card-body">
              
                    <button class="tt-btn"
            onclick="bbb11ShowTraditionDetail('company')">
        Tìm hiểu <i class="fa-solid fa-arrow-right"></i>
    </button>
            </article>

    </article>

            <!-- THẺ 3: ĐẠI ĐỘI 11 -->
            <article class="tt-card">
                <div class="tt-card-picture">
                    <img
                        id="ttImage3"
                        class="tt-upload-image"
                        src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/truyen-thong-dai-%20doi.png"
                        alt="Ảnh truyền thống Đại đội 11"
                        style="display:block;width:100%;height:100%;object-fit:cover;"
                    >
                </div>

                <div class="tt-card-body">
                    <h3>Truyền thống Đại đội 11</h3>
                    <p>Cán bộ, chiến sĩ là anh em, Đại đội là ngôi nhà đoàn kết.</p>

                    <button class="tt-btn"
                            onclick="bbb11ShowTraditionDetail('company')">
                        Tìm hiểu
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </article>

        </div>

<div id="bbb11TraditionDetail" class="tt-detail"></div>

</section>

<aside class="tt-panel tt-quote">

    <!-- KHUNG HÌNH BÁC HỒ -->
    <div class="tt-bac-frame">
        <img src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/bac-ho%205.png"
             alt="Chủ tịch Hồ Chí Minh"
             class="tt-bac-img">
    </div>

    <!-- DẤU NGOẶC KÉP -->
    <div class="tt-quote-mark">“</div>

    <!-- NỘI DUNG TRÍCH DẪN -->
    <blockquote>
        Phát huy truyền thống, đoàn kết, kỷ luật,
        ra sức học tập, rèn luyện và hoàn thành tốt
        mọi nhiệm vụ.
    </blockquote>

    <!-- HỌA TIẾT TRANG TRÍ -->
    <div class="tt-quote-star">
        ❧ ★ ❧
    </div>

</aside>

</div>


        <section class="tt-section tt-video-grid">
            <div class="tt-panel tt-video-main">
                <h2 class="tt-heading">
                    <i class="fa-solid fa-circle-play"></i>
                    GÓC VIDEO CÁCH MẠNG
                </h2>

                <div class="tt-player">
                    <iframe id="bbb11TraditionPlayer"
                        src="about:blank"
                        title="Video truyền thống đơn vị"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>

                    <div id="bbb11TraditionPlaceholder" class="tt-placeholder">
                        <i class="fa-solid fa-circle-play"></i>
                        <p>Chọn video trong danh sách để xem tại đây.</p>
                    </div>
                </div>

                <div class="tt-video-info">
                    <h3 id="bbb11TraditionVideoTitle">Góc video truyền thống</h3>
                    <p id="bbb11TraditionVideoDescription">
                        Chọn một video trong danh sách bên cạnh.
                    </p>
                </div>
            </div>

            <aside class="tt-panel">
                <div class="tt-playlist-title">
                    <i class="fa-solid fa-list"></i> DANH SÁCH VIDEO
                </div>

                <div class="tt-playlist">
                    <button class="tt-video-item"
                        onclick="bbb11PlayTraditionVideo('history',this)">
                        <span class="tt-video-icon"><i class="fa-solid fa-flag"></i></span>
                        <span>
                            <strong>Lịch sử cách mạng Việt Nam</strong>
                            <small>Các dấu mốc lịch sử</small>
                        </span>
                    </button>

                    <button class="tt-video-item"
                        onclick="bbb11PlayTraditionVideo('hochiminh',this)">
                        <span class="tt-video-icon"><i class="fa-solid fa-user"></i></span>
                        <span>
                            <strong>Chủ tịch Hồ Chí Minh</strong>
                            <small>Cuộc đời và sự nghiệp</small>
                        </span>
                    </button>

                    <button class="tt-video-item"
                        onclick="bbb11PlayTraditionVideo('dienbien',this)">
                        <span class="tt-video-icon"><i class="fa-solid fa-medal"></i></span>
                        <span>
                            <strong>Chiến thắng Điện Biên Phủ</strong>
                            <small>Bản hùng ca lịch sử</small>
                        </span>
                    </button>

                    <button class="tt-video-item"
                        onclick="bbb11PlayTraditionVideo('army',this)">
                        <span class="tt-video-icon"><i class="fa-solid fa-shield-halved"></i></span>
                        <span>
                            <strong>Quân đội nhân dân Việt Nam</strong>
                            <small>Xây dựng và trưởng thành</small>
                        </span>
                    </button>
                </div>
            </aside>
        </section>

        <footer class="tt-footer">
            ★ PHÁT HUY TRUYỀN THỐNG ★<br>
            RÈN LUYỆN BẢN LĨNH – XÂY DỰNG ĐƠN VỊ VỮNG MẠNH
        </footer>
    </div>
    `;
};


/* NỘI DUNG TÌM HIỂU
   Hãy bổ sung dữ kiện lịch sử chính thức của đơn vị. */


window.bbb11ShowTraditionDetail = function(type) {
    const contents = {
        division: {
            title: "TRUYỀN THỐNG SƯ ĐOÀN",
            text: "Bổ sung lịch sử hình thành, ngày truyền thống, các mốc thời gian, chiến công và thành tích chính thức của Sư đoàn."
        },
        regiment: {
            title: "TRUYỀN THỐNG TRUNG ĐOÀN",
            text: "Bổ sung ngày thành lập, quá trình xây dựng, chiến đấu, trưởng thành và thành tích chính thức của Trung đoàn."
        },
        company: {
            title: "TÌM HIỂU TRUYỀN THỐNG CÁCH MẠNG",
            text: "Bổ sung lịch sử Đại đội 11, các hoạt động tiêu biểu, hình ảnh tư liệu và thành tích thi đua của đơn vị."
        }
    };
const box = document.getElementById("bbb11TraditionDetail");
const item = contents[type];

if (!box || !item) {
    alert("Không tìm thấy khu vực hiển thị nội dung!");
    return;
}

box.hidden = false;
box.style.display = "block";
box.replaceChildren();

    const title = document.createElement("h3");
    title.textContent = item.title;

    const paragraph = document.createElement("p");
    paragraph.textContent = item.text;

    box.append(title, paragraph);

 
if (type === "company") {
    // KHUNG XEM WEBSITE / TRANG FACEBOOK
    const viewer = document.createElement("div");
    viewer.className = "tt-web-viewer";

    const webTitle = document.createElement("h4");
    webTitle.textContent = "TRANG FACEBOOK TRUNG ĐOÀN BỘ BINH 1";
    viewer.appendChild(webTitle);

 
    // NÚT MỞ TRANG FACEBOOK
    const fbLink = document.createElement("a");

    fbLink.href = "https://www.facebook.com/trungdoanbobinh1";
    fbLink.target = "_blank";
    fbLink.rel = "noopener noreferrer";
    fbLink.textContent = "MỞ TRANG FACEBOOK TRUNG ĐOÀN";

    fbLink.style.cssText = `
        display: inline-block;
        padding: 12px 18px;
        margin: 8px 0 20px;
        background: #1877f2;
        color: white;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
    `;

    viewer.appendChild(fbLink);

    // KHUNG XEM TRỰC TIẾP TRANG FACEBOOK
    const fbViewer = document.createElement("div");
    fbViewer.className = "tt-facebook-viewer";

    fbViewer.style.cssText = `
        width: 100%;
        margin: 0 0 24px;
        padding: 12px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 3px 12px rgba(0,0,0,0.12);
    `;

    const fbTitle = document.createElement("h4");
    fbTitle.textContent = "THEO DÕI TIN TỨC TRUNG ĐOÀN";
    fbTitle.style.cssText = `
        margin: 4px 0 14px;
        color: #8b1e1e;
        font-size: 19px;
    `;

    const fbFrame = document.createElement("iframe");

    fbFrame.src =
        "https://www.facebook.com/plugins/page.php?href=" +
        encodeURIComponent(
            "https://www.facebook.com/trungdoanbobinh1"
        ) +
        "&tabs=timeline&width=500&height=650" +
        "&small_header=false&adapt_container_width=true" +
        "&hide_cover=false&show_facepile=true";

    fbFrame.title = "Trang Facebook Trung đoàn Bộ binh 1";
    fbFrame.style.cssText = `
        display: block;
        width: 100%;
        height: 650px;
        border: none;
        overflow: hidden;
    `;

    fbFrame.setAttribute("scrolling", "no");
    fbFrame.setAttribute("frameborder", "0");
    fbFrame.setAttribute("allowfullscreen", "true");
    fbFrame.setAttribute("loading", "lazy");
    fbFrame.setAttribute(
        "allow",
        "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    );

    fbViewer.appendChild(fbTitle);
    fbViewer.appendChild(fbFrame);
    viewer.appendChild(fbViewer);

    box.appendChild(viewer);


    // Ô XEM VIDEO FACEBOOK
    const videoBox = document.createElement("div");
    videoBox.className = "tt-video-viewer";
    videoBox.style.cssText = `
        margin-top: 24px;
        padding: 18px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 3px 12px rgba(0,0,0,0.12);
    `;

    const videoTitle = document.createElement("h4");
    videoTitle.textContent = "VIDEO TRUYỀN THỐNG ĐƠN VỊ";
    videoTitle.style.cssText = `
        margin: 0 0 14px;
        color: #8b1e1e;
        font-size: 19px;
    `;
    videoBox.appendChild(videoTitle);

    // DÁN LINK VIDEO FACEBOOK THẬT VÀO ĐÂY
    const facebookVideoUrl = "https://www.facebook.com/reel/1829016894945257";

    if (facebookVideoUrl !== "DAN_LINK_VIDEO_FACEBOOK_VAO_DAY") {
        const videoFrame = document.createElement("iframe");

        videoFrame.src =
            "https://www.facebook.com/plugins/video.php?href=" +
            encodeURIComponent(facebookVideoUrl) +
            "&show_text=false";

        videoFrame.title = "Video truyền thống đơn vị";
        videoFrame.style.cssText = `
            display: block;
            width: 100%;
            height: 400px;
            border: 0;
            border-radius: 10px;
        `;

        videoFrame.setAttribute("allowfullscreen", "true");
        videoFrame.setAttribute("loading", "lazy");

        videoBox.appendChild(videoFrame);
    } else {
        const note = document.createElement("p");
        note.textContent =
            "Vui lòng thêm link một video Facebook công khai để xem trực tiếp tại đây.";
        videoBox.appendChild(note);
    }

    box.appendChild(videoBox);
}
};
/* VIDEO
   Thay VIDEO_ID bằng ID YouTube thật trước khi phát.
   ID là phần sau v= trong đường dẫn YouTube. */

window.bbb11TraditionVideos = {
    history: {
        id: "2gtZpukMrn0",
        title: "Lịch sử cách mạng Việt Nam",
        description: "Những dấu mốc quan trọng trong lịch sử dân tộc."
    },
    hochiminh: {
        id: "cxKnRdHQIm4",
        title: "Chủ tịch Hồ Chí Minh",
        description: "Tìm hiểu cuộc đời và sự nghiệp của Bác Hồ."
    },
    dienbien: {
        id: "p6GGTkHS8wQ",
        title: "Chiến thắng Điện Biên Phủ",
        description: "Ôn lại chiến thắng lịch sử Điện Biên Phủ."
    },
    army: {
        id: "iNiXDtewkrI",
        title: "Quân đội nhân dân Việt Nam",
        description: "Tìm hiểu quá trình xây dựng và trưởng thành của Quân đội."
    }
};

window.bbb11PlayTraditionVideo = function(key, button) {
    const video = window.bbb11TraditionVideos[key];
    if (!video) return;

    if (!/^[a-zA-Z0-9_-]{11}$/.test(video.id)) {
        alert(
            "Video này chưa được cài đặt ID YouTube.\n" +
            "Hãy điền ID video thật vào bbb11TraditionVideos."
        );
        return;
    }

    const player = document.getElementById("bbb11TraditionPlayer");
    const placeholder = document.getElementById("bbb11TraditionPlaceholder");
    const title = document.getElementById("bbb11TraditionVideoTitle");
    const description = document.getElementById("bbb11TraditionVideoDescription");

    if (!player || !placeholder || !title || !description) return;

    player.src =
        "https://www.youtube-nocookie.com/embed/" +
        encodeURIComponent(video.id) + "?autoplay=1&rel=0";

    placeholder.style.display = "none";
    title.textContent = video.title;
    description.textContent = video.description;

    document.querySelectorAll(".tt-video-item").forEach(function(item) {
        item.classList.remove("active");
    });

    if (button) button.classList.add("active");
};


// DANH SÁCH CÁC TRANG
const pages = {
    admin: adminPage,
    members: membersPage,
    accounts: accountsPage,
    attendance: attendancePage,
    activities: activitiesPage,
    reports: reportsPage,
    binhdanhocvuso: window.binhDanHocVuSoPage,
    music: musicPage,
    gallery: galleryPage,
    manual: manualPage,
    tradition: traditionPage,
    resolution: resolutionPage,
    news: newsPage,
    quiz: quizPage,
    education: educationPage,
    bac: bacPage,
    question: questionPage,
    score: scorePage,
    ranking: rankingPage
};




/* ===== TRANG CHỦ TẾT ĐẠI ĐỘI 11 ===== */
pages.tet = function () {
    return `
        <div class="tet-home-container">

            <div class="tet-image-frame">

                <img
                    src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/login-bg%205.png"
                    alt="Chúc mừng năm mới Đại đội 11"
                >

                <!-- LỚP HIỆU ỨNG ÁNH SÁNG -->
                <canvas
                    id="tetEffectsCanvas"
                    aria-hidden="true"
                ></canvas>

                <div class="tet-light-frame"></div>

                <!-- ĐÈN LỒNG TRANG TRÍ -->
                <div class="tet-lantern tet-lantern-left" aria-hidden="true">
                    <span class="tet-lantern-string"></span>
                    <span class="tet-lantern-body">✦</span>
                    <span class="tet-lantern-tassel"></span>
                </div>

                <div class="tet-lantern tet-lantern-right" aria-hidden="true">
                    <span class="tet-lantern-string"></span>
                    <span class="tet-lantern-body">✦</span>
                    <span class="tet-lantern-tassel"></span>
                </div>

                <!-- TIÊU ĐỀ TRANG TRÍ -->
                <div class="tet-floating-title">
                    <span class="tet-eyebrow">✦ MỪNG ĐẢNG - MỪNG XUÂN ✦</span>
                    <strong>ĐẠI ĐỘI BỘ BINH 11</strong>
                    <small>XUÂN MỚI · KHÍ THẾ MỚI · QUYẾT TÂM MỚI</small>
                </div>

                <div class="tet-corner-label">
                    ★ XUÂN ĐOÀN KẾT ★
                </div>

            </div>

            <!-- LỜI CHÚC NẰM DƯỚI ẢNH -->
            <section class="tet-message-bottom">

                <div class="tet-ornament">✦ ❖ ✦ ❖ ✦</div>

                <p class="tet-kicker">CHÀO MỪNG NĂM MỚI</p>

                <h1 class="tet-shimmer">ĐẠI ĐỘI BỘ BINH 11</h1>

                <p class="tet-subtitle">
                    VỮNG NIỀM TIN - SẮT Ý CHÍ - BỀN QUYẾT TÂM
                </p>

                <div class="tet-ribbon">
                    <span>★</span>
                    <strong>
                        ĐOÀN KẾT - KỶ LUẬT - TRÁCH NHIỆM - QUYẾT THẮNG
                    </strong>
                    <span>★</span>
                </div>

                <div class="tet-divider-bottom">
                    <span>✦</span>
                </div>

                <p>
                    Phát huy truyền thống, xây dựng đơn vị vững mạnh toàn diện
                </p>

                <p>
                    Mừng Đảng - Mừng Xuân - Quyết tâm hoàn thành xuất sắc mọi nhiệm vụ
                </p>

                <h3>CHÚC CÁN BỘ, CHIẾN SĨ ĐẠI ĐỘI 11</h3>

                <p class="tet-wish-bottom">
                    SỨC KHỎE - HẠNH PHÚC - BÌNH AN - THẮNG LỢI
                </p>

                <div class="tet-ornament tet-ornament-bottom">
                    🌸 ✨ 🌼 ✨ 🌸
                </div>

            </section>
        </div>
    `;
};


// KIỂM TRA VÀ HIỂN THỊ TRANG
if (typeof pages[page] !== "function") {
    content.innerHTML = "<h2>Chức năng chưa được xây dựng.</h2>";
} else {
    try {
        content.innerHTML = pages[page]();

if (page === "tet") {
    requestAnimationFrame(() => {
        if (typeof window.initTetEffects === "function") {
            window.initTetEffects();
        }
    });
} else if (typeof window.__tetEffectsCleanup === "function") {
    window.__tetEffectsCleanup();
}

// Hiển thị tài liệu thành viên
if (page === "members") {
    hienThiLinkTaiLieuBBB11(
        "thanhvien",
        "taiLieuThanhVien"
    );
}
  // CẬP NHẬT THƯ VIỆN ẢNH
        if (
            page === "gallery" &&
            typeof loadGallery === "function"
        ) {
            loadGallery();
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
    <div class="page-box manual-app manual-modern">

       
<section class="manual-hero-banner">
    <img
        src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/cam-nang-nguoi-linh.png"
        alt="Cẩm nang người lính - Đại đội 11"
        class="manual-banner-image"
    >
</section>


        <section class="manual-welcome">
            <div>
                <span class="manual-kicker">TRI THỨC • KỶ LUẬT • BẢN LĨNH</span>
                <h2>HÀNH TRANG NGƯỜI CHIẾN SĨ</h2>
                <p>
                    Tra cứu kiến thức, rèn luyện kỹ năng và phát huy
                    truyền thống vẻ vang của đơn vị.
                </p>
            </div>
            <div class="manual-welcome-icon">
                <i class="fa-solid fa-book-open-reader"></i>
            </div>
        </section>

        <section class="manual-library">
            <div class="manual-section-heading">
                <div>
                    <h2><i class="fa-solid fa-book-open"></i>
                        TÀI LIỆU CẨM NANG
                    </h2>
                    <p>Chọn danh mục hoặc tìm kiếm nội dung cần tra cứu</p>
                </div>
            </div>

            <div class="manual-search-wrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                    id="manualSearch"
                    type="search"
                    placeholder="Tìm tên tài liệu..."
                    oninput="hienThiCamNang()"
                >
            </div>

            <div class="manual-category-grid">
                <button class="manual-category active"
                    onclick="chonDanhMucCamNang('tatca')">
                    <i class="fa-solid fa-layer-group"></i>
                    <span>Tất cả tài liệu</span>
                </button>

                <button class="manual-category"
                    onclick="chonDanhMucCamNang('dieulenh')">
                    <i class="fa-solid fa-flag"></i>
                    <span>Điều lệnh</span>
                </button>

                <button class="manual-category"
                    onclick="chonDanhMucCamNang('kyluat')">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>Kỷ luật</span>
                </button>

                <button class="manual-category"
                    onclick="chonDanhMucCamNang('kynang')">
                    <i class="fa-solid fa-compass"></i>
                    <span>Kỹ năng quân nhân</span>
                </button>

                <button class="manual-category"
                    onclick="chonDanhMucCamNang('kienthuc')">
                    <i class="fa-solid fa-graduation-cap"></i>
                    <span>Kiến thức</span>
                </button>

                <button class="manual-category"
                    onclick="chonDanhMucCamNang('khac')">
                    <i class="fa-solid fa-folder-open"></i>
                    <span>Tài liệu khác</span>
                </button>
            </div>

            <div class="manual-list-heading">
                <h3 id="tenDanhMucCamNang">
                    <i class="fa-solid fa-book"></i> TẤT CẢ TÀI LIỆU
                </h3>
            </div>

            <div id="manualList" class="manual-document-grid">
                <p>Đang tải tài liệu...</p>
            </div>
        </section>

        <section class="manual-reader-panel">
            <div class="manual-panel-heading">
                <div class="manual-panel-icon">
                    <i class="fa-solid fa-book-reader"></i>
                </div>
                <div>
                    <h3 id="manualReaderTitle">KHUNG ĐỌC TÀI LIỆU</h3>
                    <p>Nội dung tài liệu được hiển thị tại đây nếu website hỗ trợ</p>
                </div>
            </div>

            <div class="manual-reader-actions">
                <button class="manual-btn manual-btn-gold"
                    onclick="taiLaiCamNang()">
                    <i class="fa-solid fa-rotate"></i> Tải lại
                </button>
                <button class="manual-btn manual-btn-outline"
                    onclick="moCamNangNgoai()">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    Mở bên ngoài
                </button>
            </div>

            <iframe
                id="manualReader"
                title="Khung đọc tài liệu cẩm nang"
                src="about:blank"
                loading="lazy"
                style="width:100%;height:620px;border:0;border-radius:12px;background:#fff;margin-top:16px">
            </iframe>

            <p class="manual-reader-note">
                <i class="fa-solid fa-circle-info"></i>
                Một số website không cho phép nhúng trực tiếp.
                Hãy chọn “Mở bên ngoài” nếu nội dung không hiển thị.
            </p>
        </section>

        <details class="manual-add-panel">
            <summary>
                <i class="fa-solid fa-circle-plus"></i>
                THÊM TÀI LIỆU CẨM NANG
                <i class="fa-solid fa-chevron-down manual-summary-arrow"></i>
            </summary>

            <div class="manual-form">
                <label for="manualTitle">Tên tài liệu</label>
                <input id="manualTitle" type="text"
                    placeholder="Nhập tên tài liệu...">

                <label for="manualCategory">Danh mục</label>
                <select id="manualCategory">
                    <option value="Điều lệnh">Điều lệnh</option>
                    <option value="Kỷ luật">Kỷ luật</option>
                    <option value="Kỹ năng quân nhân">Kỹ năng quân nhân</option>
                    <option value="Kiến thức">Kiến thức</option>
                    <option value="Khác">Khác</option>
                </select>

                <label for="manualUrl">Đường dẫn tài liệu</label>
                <input id="manualUrl" type="url"
                    placeholder="https://...">

                <button class="manual-btn manual-btn-gold"
                    onclick="themCamNang()">
                    <i class="fa-solid fa-plus"></i> Lưu tài liệu
                </button>
            </div>
        </details>

        <footer class="manual-footer">
            <i class="fa-solid fa-star"></i>
            KỶ LUẬT - TRÁCH NHIỆM - ĐOÀN KẾT - QUYẾT THẮNG
            <i class="fa-solid fa-star"></i>
        </footer>
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

    // Giữ nguyên chức năng lọc tài liệu
    danhMucDangChon = ma;

    // Cập nhật trạng thái được chọn của nút
    document.querySelectorAll(
        ".manual-modern .manual-category"
    ).forEach(function (button) {
        button.classList.remove("active");
    });

    const cacMaDanhMuc = [
        "tatca",
        "dieulenh",
        "kyluat",
        "kynang",
        "kienthuc",
        "khac"
    ];

    const viTri = cacMaDanhMuc.indexOf(ma);
    const cacNut = document.querySelectorAll(
        ".manual-modern .manual-category"
    );

    if (viTri >= 0 && cacNut[viTri]) {
        cacNut[viTri].classList.add("active");
    }

    // Cập nhật tiêu đề danh mục
    const title = document.getElementById(
        "tenDanhMucCamNang"
    );

    if (title) {
        title.textContent = "📖 " + danhMuc[ma];
    }

    // Hiển thị lại tài liệu theo danh mục đã chọn
    if (typeof window.hienThiCamNang === "function") {
        window.hienThiCamNang();
    }
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

/* =====================================================
   MINI GAME ĐẤU TRƯỜNG TRI THỨC BBB11
===================================================== */

var bbb11QuizGameState = {
    questions: [],
    index: 0,
    score: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
    timeLeft: 30,
    timer: null,
    mode: "quick",
    player: "Chiến sĩ",
    locked: false,
    doublePoints: false,
    level: 1,
    sessionId: 0
};

function quizEscapeHTML(value) {
    return String(value == null ? "" : value).replace(
        /[&<>"']/g,
        function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        }
    );
}

function layNganHangQuiz() {
    try {
        var data = JSON.parse(
            localStorage.getItem("bbb11_quiz") || "[]"
        );

        if (!Array.isArray(data)) return [];

        return data.filter(function (item) {
            return item &&
                typeof item.question === "string" &&
                item.answers &&
                ["A", "B", "C", "D"].every(function (key) {
                    return typeof item.answers[key] === "string";
                }) &&
                ["A", "B", "C", "D"].includes(item.correct);
        });
    } catch (error) {
        console.error("Lỗi đọc ngân hàng BBB11:", error);
        return [];
    }
}

function luuNganHangQuiz(data) {
    localStorage.setItem("bbb11_quiz", JSON.stringify(data));
}

function layLichSuQuizBBB11() {
    try {
        var data = JSON.parse(
            localStorage.getItem("bbb11_quiz_history") || "[]"
        );
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

function layBangXepHangQuiz() {
    try {
        var data = JSON.parse(
            localStorage.getItem("bbb11_quiz_leaderboard") || "[]"
        );
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

function quizPage() {
    setTimeout(function () {
        hienThiNganHangQuiz();
        hienThiLichSuQuiz();
        hienThiBangXepHangQuiz();
        capNhatThongKeQuizBBB11();
    }, 0);

    return `
        <div class="page-box bbb11-game">

            <section class="game-hero">
                <div class="game-hero-content">
                    <span class="game-eyebrow">
                        TIỂU ĐOÀN 3 • ĐẠI ĐỘI 11
                    </span>

                    <h2>ĐẤU TRƯỜNG TRI THỨC</h2>

                    <p>
                        Thử thách kiến thức. Bứt phá giới hạn.
                        Chinh phục mọi cấp độ!
                    </p>

                    <div class="game-hero-stats">
                        <div>
                            <strong id="gameTotalQuestions">0</strong>
                            <span>CÂU HỎI</span>
                        </div>
                        <div>
                            <strong id="gameBestScore">0</strong>
                            <span>ĐIỂM KỶ LỤC</span>
                        </div>
                        <div>
                            <strong id="gamePlayedCount">0</strong>
                            <span>LƯỢT CHƠI</span>
                        </div>
                    </div>
                </div>

                <div class="game-hero-emblem">★</div>
            </section>

            <section class="game-panel">
                <div class="game-section-heading">
                    <span class="game-section-icon">⚡</span>
                    <div>
                        <h3>CHỌN CHẾ ĐỘ CHƠI</h3>
                        <p>Mỗi lượt chơi là một thử thách mới</p>
                    </div>
                </div>

                <label class="game-label" for="quizPlayerName">
                    TÊN CHIẾN SĨ / BIỆT DANH
                </label>

                <input
                    id="quizPlayerName"
                    class="game-input"
                    maxlength="30"
                    placeholder="Nhập tên trước khi thi đấu..."
                >

                <div class="game-mode-grid">

                    <button class="game-mode-card"
                        onclick="batDauGameBBB11('quick')">
                        <span class="mode-symbol">⚡</span>
                        <strong>ĐẤU NHANH</strong>
                        <small>10 câu hỏi • 30 giây/câu</small>
                        <span class="mode-action">VÀO TRẬN →</span>
                    </button>

                    <button class="game-mode-card"
                        onclick="quayThuongBBB11()">
                        <span class="mode-symbol">🎡</span>
                        <strong>VÒNG QUAY</strong>
                        <small>May mắn quyết định thử thách</small>
                        <span class="mode-action">QUAY NGAY →</span>
                    </button>

                    <button class="game-mode-card"
                        onclick="batDauGameBBB11('level')">
                        <span class="mode-symbol">🏆</span>
                        <strong>VƯỢT CẤP ĐỘ</strong>
                        <small>Chinh phục từng vòng chơi</small>
                        <span class="mode-action">CHINH PHỤC →</span>
                    </button>

                    <button class="game-mode-card"
                        onclick="batDauGameBBB11('marathon')">
                        <span class="mode-symbol">🔥</span>
                        <strong>SINH TỒN KIẾN THỨC</strong>
                        <small>Trả lời liên tục để lập kỷ lục</small>
                        <span class="mode-action">THỬ SỨC →</span>
                    </button>

                    <button class="game-mode-card"
                        onclick="batDauGameBBB11('speed')">
                        <span class="mode-symbol">🚀</span>
                        <strong>THỬ THÁCH TỐC ĐỘ</strong>
                        <small>5 câu • thưởng điểm tốc độ</small>
                        <span class="mode-action">BỨT PHÁ →</span>
                    </button>

                    <button class="game-mode-card"
                        onclick="batDauGameBBB11('memory')">
                        <span class="mode-symbol">🧠</span>
                        <strong>TRÍ NHỚ SIÊU TỐC</strong>
                        <small>Đáp án được xáo trộn mỗi lượt</small>
                        <span class="mode-action">KIỂM TRA →</span>
                    </button>

                    <button class="game-mode-card"
                        onclick="batDauGameBBB11('challenge')">
                        <span class="mode-symbol">🎯</span>
                        <strong>THỬ THÁCH TỔNG HỢP</strong>
                        <small>15 câu hỏi ngẫu nhiên</small>
                        <span class="mode-action">VÀO THI →</span>
                    </button>

<button class="game-mode-card"
    onclick="window.bbb11GameBanBia()">
    <span class="mode-symbol">🎯</span>
    <strong>BẮN SÚNG AK</strong>
    <small>4 bia đáp án • 5 cột mốc • 30 giây/câu</small>
    <span class="mode-action">VÀO CHIẾN TRƯỜNG →</span>
</button>

                </div>

                <div id="quizWheelResult"
                    class="game-wheel-result"
                    aria-live="polite"></div>
            </section>

            <section class="game-panel game-arena" id="quizArena">
                <div class="game-empty">
                    <div class="game-empty-icon">🎮</div>
                    <h3>SẴN SÀNG CHƯA, CHIẾN SĨ?</h3>
                    <p>Chọn chế độ ở trên để bắt đầu cuộc chơi.</p>
                </div>
            </section>

            <section class="game-panel">
                <div class="game-section-heading">
                    <span class="game-section-icon">🥇</span>
                    <div>
                        <h3>BẢNG XẾP HẠNG</h3>
                        <p>Top thành tích lưu trên thiết bị này</p>
                    </div>
                </div>

                <div id="quizLeaderboard"></div>
            </section>

            <details class="game-panel game-management">
                <summary>
                    <span>🛠️ QUẢN LÝ CÂU HỎI</span>
                    <span class="game-summary-note">
                        Thêm hoặc xóa câu hỏi
                    </span>
                </summary>

                <div class="game-form">
                    <label class="game-label">NỘI DUNG CÂU HỎI</label>

                    <textarea id="quizQuestion"
                        class="game-input"
                        placeholder="Nhập nội dung câu hỏi..."></textarea>

                    <div class="game-answer-grid">
                        <input id="quizA" class="game-input"
                            placeholder="Đáp án A">
                        <input id="quizB" class="game-input"
                            placeholder="Đáp án B">
                        <input id="quizC" class="game-input"
                            placeholder="Đáp án C">
                        <input id="quizD" class="game-input"
                            placeholder="Đáp án D">
                    </div>

                    <label class="game-label" for="quizCorrect">
                        ĐÁP ÁN CHÍNH XÁC
                    </label>

                    <select id="quizCorrect" class="game-input">
                        <option value="A">Đáp án A</option>
                        <option value="B">Đáp án B</option>
                        <option value="C">Đáp án C</option>
                        <option value="D">Đáp án D</option>
                    </select>

                    <button class="game-primary-btn"
                        onclick="themCauHoiQuiz()">
                        + THÊM CÂU HỎI
                    </button>
                </div>

                <div class="game-section-heading">
                    <span class="game-section-icon">📚</span>
                    <div>
                        <h3>NGÂN HÀNG CÂU HỎI</h3>
                        <p id="quizCount">Đang tải...</p>
                    </div>
                </div>

                <div id="quizQuestionList"></div>
            </details>

            <section class="game-panel">
                <div class="game-section-heading">
                    <span class="game-section-icon">📜</span>
                    <div>
                        <h3>LỊCH SỬ THÀNH TÍCH</h3>
                        <p>Các lượt chơi gần đây trên thiết bị</p>
                    </div>
                </div>

                <div id="quizHistory"></div>
            </section>
        </div>
    `;
}
/* =====================================================
   PHẦN 2: THỐNG KÊ VÀ QUẢN LÝ NGÂN HÀNG CÂU HỎI
===================================================== */

function capNhatThongKeQuizBBB11() {
    var bank = layNganHangQuiz();
    var history = layLichSuQuizBBB11();
    var board = layBangXepHangQuiz();

    var total = document.getElementById("gameTotalQuestions");
    var best = document.getElementById("gameBestScore");
    var played = document.getElementById("gamePlayedCount");

    if (total) total.textContent = bank.length;

    var bestScore = board.reduce(function (max, item) {
        return Math.max(max, Number(item.score) || 0);
    }, 0);

    if (best) best.textContent = bestScore;
    if (played) played.textContent = history.length;
}

// THÊM CÂU HỎI
function themCauHoiQuiz() {
    var questionEl = document.getElementById("quizQuestion");
    var aEl = document.getElementById("quizA");
    var bEl = document.getElementById("quizB");
    var cEl = document.getElementById("quizC");
    var dEl = document.getElementById("quizD");
    var correctEl = document.getElementById("quizCorrect");

    if (!questionEl || !aEl || !bEl || !cEl || !dEl || !correctEl) {
        alert("Không tìm thấy biểu mẫu thêm câu hỏi!");
        return;
    }

    var question = questionEl.value.trim();

    var answers = {
        A: aEl.value.trim(),
        B: bEl.value.trim(),
        C: cEl.value.trim(),
        D: dEl.value.trim()
    };

    if (!question || Object.values(answers).some(function (value) {
        return !value;
    })) {
        alert("Vui lòng nhập câu hỏi và đầy đủ 4 đáp án!");
        return;
    }

    var bank = layNganHangQuiz();

    bank.push({
        id: Date.now().toString(),
        question: question,
        answers: answers,
        correct: correctEl.value
    });

    try {
        luuNganHangQuiz(bank);
    } catch (error) {
        alert("Không lưu được câu hỏi. Hãy kiểm tra bộ nhớ trình duyệt!");
        return;
    }

    questionEl.value = "";
    aEl.value = "";
    bEl.value = "";
    cEl.value = "";
    dEl.value = "";

    hienThiNganHangQuiz();
    capNhatThongKeQuizBBB11();

    alert("Đã thêm câu hỏi vào ngân hàng BBB11!");
}

// HIỂN THỊ DANH SÁCH CÂU HỎI
function hienThiNganHangQuiz() {
    var khung = document.getElementById("quizQuestionList");
    if (!khung) return;

    var bank = layNganHangQuiz();
    var count = document.getElementById("quizCount");

    if (count) {
        count.textContent = "Tổng số câu hỏi: " + bank.length;
    }

    if (!bank.length) {
        khung.innerHTML =
            '<div class="game-empty"><p>Chưa có câu hỏi. Hãy thêm câu hỏi để bắt đầu!</p></div>';
        return;
    }

    khung.innerHTML = bank.map(function (item, index) {
        return `
            <div class="game-bank-item">
                <strong>CÂU ${index + 1}</strong>

                <p>${quizEscapeHTML(item.question)}</p>

                <div class="game-bank-options">
                    <span>A. ${quizEscapeHTML(item.answers.A)}</span>
                    <span>B. ${quizEscapeHTML(item.answers.B)}</span>
                    <span>C. ${quizEscapeHTML(item.answers.C)}</span>
                    <span>D. ${quizEscapeHTML(item.answers.D)}</span>
                </div>

                <button class="game-delete-btn"
                    onclick="xoaCauHoiQuiz('${quizEscapeHTML(item.id)}')">
                    XÓA CÂU HỎI
                </button>
            </div>
        `;
    }).join("");
}

// XÓA CÂU HỎI
function xoaCauHoiQuiz(id) {
    if (!confirm("Bạn có chắc muốn xóa câu hỏi này?")) return;

    var bank = layNganHangQuiz().filter(function (item) {
        return String(item.id) !== String(id);
    });

    try {
        luuNganHangQuiz(bank);
    } catch (error) {
        alert("Không thể cập nhật ngân hàng câu hỏi!");
        return;
    }

    hienThiNganHangQuiz();
    capNhatThongKeQuizBBB11();
}
/* =====================================================
   PHẦN 3: ĐIỀU KHIỂN TRÒ CHƠI
===================================================== */

// DỪNG ĐỒNG HỒ
function dungDongHoQuizBBB11() {
    if (bbb11QuizGameState.timer) {
        clearInterval(bbb11QuizGameState.timer);
        bbb11QuizGameState.timer = null;
    }
}

// TRỘN DANH SÁCH CÂU HỎI
function tronDanhSachQuizBBB11(list) {
    var result = list.slice();

    for (var i = result.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = result[i];
        result[i] = result[j];
        result[j] = temp;
    }

    return result;
}

// BẮT ĐẦU GAME
function batDauGameBBB11(mode, doublePoints) {
    dungDongHoQuizBBB11();

    var bank = layNganHangQuiz();

    if (!bank.length) {
        alert("Ngân hàng chưa có câu hỏi. Hãy thêm câu hỏi trước!");
        return;
    }

    var nameEl = document.getElementById("quizPlayerName");
    var player = nameEl && nameEl.value.trim()
        ? nameEl.value.trim()
        : "Chiến sĩ";

    var questions = tronDanhSachQuizBBB11(bank);

    // Giới hạn số câu theo chế độ
    if (mode === "quick") {
        questions = questions.slice(0, 10);
    } else if (mode === "level") {
        questions = questions.slice(0, 5);
    } else if (mode === "speed") {
        questions = questions.slice(0, 5);
    } else if (mode === "memory") {
        questions = questions.slice(0, 5);
    } else if (mode === "challenge") {
        questions = questions.slice(0, 15);
    }

    bbb11QuizGameState = {
        questions: questions,
        index: 0,
        score: 0,
        correct: 0,
        streak: 0,
        bestStreak: 0,
        timeLeft: 30,
        timer: null,
        mode: mode || "quick",
        player: player.slice(0, 30),
        locked: false,
        doublePoints: Boolean(doublePoints),
        level: 1,
        sessionId: Date.now()
    };

    hienThiCauHoiGameBBB11();
}

// HIỂN THỊ CÂU HỎI
function hienThiCauHoiGameBBB11() {
    dungDongHoQuizBBB11();

    var state = bbb11QuizGameState;
    var arena = document.getElementById("quizArena");

    if (!arena) return;

    if (state.index >= state.questions.length) {
        ketThucGameBBB11();
        return;
    }

    state.locked = false;
    state.timeLeft = 30;

    var item = state.questions[state.index];
    var total = state.questions.length;
    var progress = (state.index / total) * 100;

    var modeNames = {
        quick: "⚡ ĐẤU NHANH",
        level: "🏆 VƯỢT CẤP ĐỘ",
        marathon: "🔥 SINH TỒN KIẾN THỨC",
        speed: "🚀 THỬ THÁCH TỐC ĐỘ",
        memory: "🧠 TRÍ NHỚ SIÊU TỐC",
        challenge: "🎯 THỬ THÁCH TỔNG HỢP"
    };

    arena.innerHTML = `
        <div class="game-live-header">
            <span class="game-live-tag">● ĐANG THI ĐẤU</span>
            <span class="game-live-mode">
                ${modeNames[state.mode] || "🎮 THỬ THÁCH"}
            </span>
        </div>

        <div class="game-progress-track">
            <div class="game-progress-fill"
                style="width:${progress}%"></div>
        </div>

        <div class="game-score-strip">
            <div>
                <small>CÂU HỎI</small>
                <strong>${state.index + 1}/${total}</strong>
            </div>
            <div>
                <small>ĐIỂM</small>
                <strong id="gameLiveScore">${state.score}</strong>
            </div>
            <div>
                <small>LIÊN TIẾP</small>
                <strong id="gameLiveStreak">${state.streak} 🔥</strong>
            </div>
        </div>

        <div class="game-timer-wrap">
            <div class="game-timer" id="gameTimer">30</div>
            <span>GIÂY CÒN LẠI</span>
        </div>

        <div class="game-question-card">
            <span class="game-question-number">
                THỬ THÁCH ${String(state.index + 1).padStart(2, "0")}
            </span>

            <h3>${quizEscapeHTML(item.question)}</h3>

            <div class="game-choice-grid">
                ${["A", "B", "C", "D"].map(function (key) {
                    return `
                        <button class="game-choice"
                            onclick="chonDapAnGameBBB11('${key}')">
                            <span class="game-choice-letter">${key}</span>
                            <span>${quizEscapeHTML(item.answers[key])}</span>
                        </button>
                    `;
                }).join("")}
            </div>

            <div id="gameFeedback"
                class="game-feedback"
                aria-live="polite"></div>
        </div>
    `;

    var sessionId = state.sessionId;

    state.timer = setInterval(function () {
        if (sessionId !== bbb11QuizGameState.sessionId) {
            dungDongHoQuizBBB11();
            return;
        }

        state.timeLeft--;

        var timerEl = document.getElementById("gameTimer");

        if (timerEl) {
            timerEl.textContent = Math.max(0, state.timeLeft);

            timerEl.classList.toggle(
                "timer-danger",
                state.timeLeft <= 10
            );
        }

        if (state.timeLeft <= 0) {
            chonDapAnGameBBB11(null);
        }
    }, 1000);
}

// CHỌN ĐÁP ÁN VÀ CHẤM ĐIỂM
function chonDapAnGameBBB11(answer) {
    var state = bbb11QuizGameState;

    if (state.locked) return;

    state.locked = true;
    dungDongHoQuizBBB11();

    var item = state.questions[state.index];

    if (!item) return;

    var correct = answer === item.correct;
    var points = 0;

    var buttons = document.querySelectorAll(
        "#quizArena .game-choice"
    );

    buttons.forEach(function (button) {
        button.disabled = true;

        var letter = button.querySelector(".game-choice-letter");

        if (!letter) return;

        if (letter.textContent === item.correct) {
            button.classList.add("choice-correct");
        } else if (letter.textContent === answer) {
            button.classList.add("choice-wrong");
        }
    });

    if (correct) {
        state.correct++;
        state.streak++;

        state.bestStreak = Math.max(
            state.bestStreak,
            state.streak
        );

        points = 100 + state.timeLeft * 5;

        if (state.streak >= 3) {
            points += 50;
        }

        // Thưởng thêm điểm ở chế độ tốc độ
        if (state.mode === "speed") {
            points += 100;
        }

        if (state.doublePoints) {
            points *= 2;
        }

        state.score += points;
    } else {
        state.streak = 0;
    }

    var feedback = document.getElementById("gameFeedback");

    if (feedback) {
        feedback.innerHTML = correct
            ? `
                <div class="feedback-correct">
                    ✓ CHÍNH XÁC! +${points} ĐIỂM
                </div>
            `
            : `
                <div class="feedback-wrong">
                    ${answer === null
                        ? "⌛ HẾT THỜI GIAN!"
                        : "✕ CHƯA CHÍNH XÁC!"}
                    <p>
                        Đáp án đúng:
                        <strong>${item.correct}</strong>
                    </p>
                </div>
            `;
    }

    var liveScore = document.getElementById("gameLiveScore");
    var liveStreak = document.getElementById("gameLiveStreak");

    if (liveScore) {
        liveScore.textContent = state.score;
    }

    if (liveStreak) {
        liveStreak.textContent = state.streak + " 🔥";
    }

    if (feedback) {
        var nextButton = document.createElement("button");

        nextButton.className = "game-primary-btn game-next-btn";

        nextButton.textContent =
            state.index + 1 >= state.questions.length
                ? "XEM KẾT QUẢ 🏆"
                : "CÂU TIẾP THEO →";

        nextButton.onclick = function () {
            state.index++;
            hienThiCauHoiGameBBB11();
        };

        feedback.appendChild(nextButton);
    }
}

/* =====================================================
   PHẦN 4: KẾT QUẢ, LỊCH SỬ VÀ BẢNG XẾP HẠNG
===================================================== */

// KẾT THÚC TRẬN ĐẤU
function ketThucGameBBB11() {
    dungDongHoQuizBBB11();

    var state = bbb11QuizGameState;
    var arena = document.getElementById("quizArena");

    if (!arena || !state.questions.length) return;

    var total = state.questions.length;
    var accuracy = Math.round(state.correct / total * 100);

    var result = {
        id: Date.now().toString(),
        player: state.player,
        mode: state.mode,
        score: state.score,
        correct: state.correct,
        total: total,
        accuracy: accuracy,
        bestStreak: state.bestStreak,
        date: new Date().toLocaleString("vi-VN")
    };

    // LƯU LỊCH SỬ
    var history = layLichSuQuizBBB11();
    history.unshift(result);

    try {
        localStorage.setItem(
            "bbb11_quiz_history",
            JSON.stringify(history.slice(0, 100))
        );
    } catch (error) {
        console.warn("Không lưu được lịch sử game:", error);
    }

    // LƯU BẢNG XẾP HẠNG
    var board = layBangXepHangQuiz();
    board.push(result);

    board.sort(function (a, b) {
        return (Number(b.score) || 0) - (Number(a.score) || 0);
    });

    try {
        localStorage.setItem(
            "bbb11_quiz_leaderboard",
            JSON.stringify(board.slice(0, 50))
        );
    } catch (error) {
        console.warn("Không lưu được bảng xếp hạng:", error);
    }

    var message = accuracy >= 80
        ? "XUẤT SẮC! BẠN ĐÃ CHINH PHỤC ĐẤU TRƯỜNG!"
        : accuracy >= 50
            ? "LÀM TỐT LẮM! HÃY TIẾP TỤC LUYỆN TẬP!"
            : "ĐỪNG BỎ CUỘC! HÃY THỬ LẠI!";

    arena.innerHTML = `
        <div class="game-result">
            <div class="game-result-medal">
                ${accuracy >= 80 ? "🏆" : accuracy >= 50 ? "🥈" : "🎯"}
            </div>

            <span class="game-live-tag">ĐÃ HOÀN THÀNH</span>

            <h2>${quizEscapeHTML(message)}</h2>

            <p class="game-result-player">
                Chiến sĩ: ${quizEscapeHTML(state.player)}
            </p>

            <div class="game-result-score">
                <small>TỔNG ĐIỂM</small>
                <strong>${state.score}</strong>
            </div>

            <div class="game-result-stats">
                <div>
                    <strong>${state.correct}/${total}</strong>
                    <span>CÂU ĐÚNG</span>
                </div>

                <div>
                    <strong>${accuracy}%</strong>
                    <span>CHÍNH XÁC</span>
                </div>

                <div>
                    <strong>${state.bestStreak}</strong>
                    <span>CHUỖI ĐÚNG</span>
                </div>
            </div>

            <button type="button"
                class="game-primary-btn"
                onclick="batDauGameBBB11('${state.mode}', ${state.doublePoints})">
                🔄 CHƠI LẠI
            </button>

            <button type="button"
                class="game-secondary-btn"
                onclick="quayLaiMenuGameBBB11()">
                ↩ CHỌN CHẾ ĐỘ KHÁC
            </button>
        </div>
    `;

    hienThiLichSuQuiz();
    hienThiBangXepHangQuiz();
    capNhatThongKeQuizBBB11();
}

// QUAY LẠI KHU VỰC CHỌN CHẾ ĐỘ
function quayLaiMenuGameBBB11() {
    dungDongHoQuizBBB11();

    var arena = document.getElementById("quizArena");

    if (arena) {
        arena.innerHTML = `
            <div class="game-empty">
                <div class="game-empty-icon">🎮</div>
                <h3>SẴN SÀNG CHƯA, CHIẾN SĨ?</h3>
                <p>Chọn một chế độ phía trên để bắt đầu.</p>
            </div>
        `;
    }
}

// HIỂN THỊ BẢNG XẾP HẠNG
function hienThiBangXepHangQuiz() {
    var container = document.getElementById("quizLeaderboard");

    if (!container) return;

    var board = layBangXepHangQuiz();

    board.sort(function (a, b) {
        return (Number(b.score) || 0) - (Number(a.score) || 0);
    });

    if (!board.length) {
        container.innerHTML = `
            <div class="game-empty">
                <p>🏅 Chưa có thành tích. Hãy là người đầu tiên!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="game-table">
            <div class="game-table-row game-table-head">
                <span>HẠNG</span>
                <span>CHIẾN SĨ</span>
                <span>ĐIỂM</span>
                <span>CHÍNH XÁC</span>
            </div>

            ${board.slice(0, 10).map(function (item, index) {
                var medal = index === 0
                    ? "🥇"
                    : index === 1
                        ? "🥈"
                        : index === 2
                            ? "🥉"
                            : String(index + 1);

                return `
                    <div class="game-table-row">
                        <span>${medal}</span>
                        <span>${quizEscapeHTML(item.player || "Chiến sĩ")}</span>
                        <strong>${Number(item.score) || 0}</strong>
                        <span>${Number(item.accuracy) || 0}%</span>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

// HIỂN THỊ LỊCH SỬ THI ĐẤU
function hienThiLichSuQuiz() {
    var container = document.getElementById("quizHistory");

    if (!container) return;

    var history = layLichSuQuizBBB11();

    if (!history.length) {
        container.innerHTML = `
            <div class="game-empty">
                <p>📜 Lịch sử sẽ xuất hiện sau trận đấu đầu tiên.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = history.slice(0, 10).map(function (item) {
        return `
            <div class="game-history-item">
                <div>
                    <strong>${quizEscapeHTML(item.player || "Chiến sĩ")}</strong>
                    <small>${quizEscapeHTML(item.date || "")}</small>
                </div>

                <div class="game-history-score">
                    <strong>${Number(item.score) || 0} điểm</strong>
                    <small>
                        ${Number(item.correct) || 0}/${Number(item.total) || 0}
                        câu đúng
                    </small>
                </div>
            </div>
        `;
    }).join("");
}

/* =====================================================
   PHẦN 5: VÒNG QUAY MAY MẮN BBB11
===================================================== */

// VÒNG QUAY CHỌN CHẾ ĐỘ
function quayThuongBBB11() {
    var arena = document.getElementById("quizArena");

    if (!arena) return;

    if (!layNganHangQuiz().length) {
        alert("Bạn hãy thêm câu hỏi trước khi quay thưởng!");
        return;
    }

    dungDongHoQuizBBB11();

    var prizes = [
        {
            name: "⚡ ĐẤU NHANH",
            mode: "quick",
            description: "10 câu hỏi để khởi động"
        },
        {
            name: "🏆 VƯỢT CẤP ĐỘ",
            mode: "level",
            description: "Chinh phục 5 câu hỏi"
        },
        {
            name: "🔥 SINH TỒN KIẾN THỨC",
            mode: "marathon",
            description: "Thử sức với toàn bộ ngân hàng câu hỏi"
        },
        {
            name: "🚀 THỬ THÁCH TỐC ĐỘ",
            mode: "speed",
            description: "5 câu hỏi tốc độ"
        },
        {
            name: "🧠 TRÍ NHỚ SIÊU TỐC",
            mode: "memory",
            description: "5 câu hỏi với đáp án đảo vị trí"
        },
        {
            name: "💎 THỬ THÁCH TỔNG HỢP",
            mode: "challenge",
            description: "15 câu hỏi tổng hợp"
        }
    ];

    arena.innerHTML = `
        <div class="game-wheel-screen">
            <div class="game-wheel-icon" id="gameWheelIcon">🎡</div>

            <h2>VÒNG QUAY MAY MẮN</h2>

            <p id="gameWheelMessage">
                Vận may sẽ quyết định thử thách của bạn!
            </p>

            <button type="button"
                class="game-primary-btn"
                id="gameSpinButton"
                onclick="batDauQuayBBB11()">
                🎯 QUAY NGAY
            </button>

            <div id="gameWheelResult"></div>
        </div>
    `;
}

// XỬ LÝ QUAY
function batDauQuayBBB11() {
    var button = document.getElementById("gameSpinButton");
    var icon = document.getElementById("gameWheelIcon");
    var message = document.getElementById("gameWheelMessage");
    var result = document.getElementById("gameWheelResult");

    if (!button || !icon || !message || !result) return;

    if (button.disabled) return;

    button.disabled = true;
    button.textContent = "⏳ ĐANG QUAY...";

    icon.classList.add("game-wheel-spinning");
    message.textContent = "Đang chọn thử thách của bạn...";

    var prizes = [
        {
            name: "⚡ ĐẤU NHANH",
            mode: "quick",
            description: "10 câu hỏi để khởi động"
        },
        {
            name: "🏆 VƯỢT CẤP ĐỘ",
            mode: "level",
            description: "Chinh phục 5 câu hỏi"
        },
        {
            name: "🔥 SINH TỒN KIẾN THỨC",
            mode: "marathon",
            description: "Thử sức với toàn bộ ngân hàng câu hỏi"
        },
        {
            name: "🚀 THỬ THÁCH TỐC ĐỘ",
            mode: "speed",
            description: "5 câu hỏi tốc độ"
        },
        {
            name: "🧠 TRÍ NHỚ SIÊU TỐC",
            mode: "memory",
            description: "5 câu hỏi đảo vị trí đáp án"
        },
        {
            name: "💎 THỬ THÁCH TỔNG HỢP",
            mode: "challenge",
            description: "15 câu hỏi tổng hợp"
        }
    ];

    var prize = prizes[Math.floor(Math.random() * prizes.length)];

    // Hiệu ứng quay được tạo bằng CSS.
    // Dùng setTimeout để người chơi thấy hiệu ứng.
    setTimeout(function () {
        icon.classList.remove("game-wheel-spinning");

        message.textContent = "🎉 THỬ THÁCH ĐÃ ĐƯỢC CHỌN!";

        result.innerHTML = `
            <div class="game-wheel-prize">
                <h3>${quizEscapeHTML(prize.name)}</h3>
                <p>${quizEscapeHTML(prize.description)}</p>

                <button type="button"
                    class="game-primary-btn"
                    onclick="batDauGameBBB11('${prize.mode}')">
                    BẮT ĐẦU THỬ THÁCH →
                </button>

                <button type="button"
                    class="game-secondary-btn"
                    onclick="quayThuongBBB11()">
                    QUAY LẠI
                </button>
            </div>
        `;

        button.textContent = "✓ ĐÃ QUAY XONG";
    }, 1400);
}

// THỬ THÁCH NHÂN ĐÔI ĐIỂM
function batDauGameNhanDoiBBB11(mode) {
    batDauGameBBB11(mode || "challenge", true);
}

/* =========================================
   PHẦN 6: KẾT THÚC LƯỢT CHƠI BBB11
   Đồng hồ - tính điểm - lưu lịch sử
========================================= */

window.bbb11KetThucLuotChoi = function (lyDo = "completed") {
    const game = window.bbb11QuizGameState;

    if (!game || game.daKetThuc) return;

    game.daKetThuc = true;

    if (game.timer) {
        clearInterval(game.timer);
        game.timer = null;
    }

    const diem = Number(game.diem || 0);
    const tenNguoiChoi =
        localStorage.getItem("bbb11CurrentUser") ||
        window.bbb11CurrentUser ||
        "Người chơi";

    const ketQua = {
        ten: tenNguoiChoi,
        diem: diem,
        soCauDung: Number(game.soCauDung || 0),
        soCauSai: Number(game.soCauSai || 0),
        thoiGian: new Date().toLocaleString("vi-VN"),
        cheDo: game.cheDo || "quick",
        lyDo: lyDo
    };

    // Lưu lịch sử chơi riêng
    try {
        const lichSu = JSON.parse(
            localStorage.getItem("bbb11_quiz_history") || "[]"
        );

        lichSu.unshift(ketQua);

        localStorage.setItem(
            "bbb11_quiz_history",
            JSON.stringify(lichSu.slice(0, 200))
        );
    } catch (e) {
        console.error("Không thể lưu lịch sử BBB11:", e);
    }

    // Lưu bảng xếp hạng riêng
    try {
        const bangXepHang = JSON.parse(
            localStorage.getItem("bbb11_quiz_ranking") || "[]"
        );

        bangXepHang.push(ketQua);

        bangXepHang.sort((a, b) => Number(b.diem) - Number(a.diem));

        localStorage.setItem(
            "bbb11_quiz_ranking",
            JSON.stringify(bangXepHang.slice(0, 100))
        );
    } catch (e) {
        console.error("Không thể lưu bảng xếp hạng BBB11:", e);
    }

    const ketQuaEl = document.getElementById("bbb11KetQua");

    if (ketQuaEl) {
        ketQuaEl.innerHTML = `
            <div class="bbb11-result-card">
                <h2>🏆 KẾT THÚC TRÒ CHƠI</h2>
                <p>Người chơi: ${String(ketQua.ten)
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")}</p>
                <h1>${diem} điểm</h1>
                <p>✅ Số câu đúng: ${ketQua.soCauDung}</p>
                <p>❌ Số câu sai: ${ketQua.soCauSai}</p>
                <button onclick="bbb11BatDauLai()">
                    🔄 Chơi lại
                </button>
            </div>
        `;
    }

    document.dispatchEvent(
        new CustomEvent("bbb11QuizFinished", { detail: ketQua })
    );
};


/* Xem lịch sử chơi */
window.bbb11LayLichSu = function () {
    try {
        return JSON.parse(
            localStorage.getItem("bbb11_quiz_history") || "[]"
        );
    } catch (e) {
        return [];
    }
};


/* Xem bảng xếp hạng */
window.bbb11LayBangXepHang = function () {
    try {
        return JSON.parse(
            localStorage.getItem("bbb11_quiz_ranking") || "[]"
        ).sort((a, b) => Number(b.diem) - Number(a.diem));
    } catch (e) {
        return [];
    }
};


/* Bắt đầu lại - dùng lại hàm khởi động ở phần trước */
window.bbb11BatDauLai = function () {
    const game = window.bbb11QuizGameState;

    if (game && game.timer) {
        clearInterval(game.timer);
    }

    if (typeof window.bbb11KhoiDongGame === "function") {
        window.bbb11KhoiDongGame();
    } else {
        alert(
            "Chưa tìm thấy hàm khởi động game. " +
            "Hãy kiểm tra tên hàm bắt đầu ở các phần trước."
        );
    }
};

/* =========================================
   PHẦN 7: BẢNG XẾP HẠNG VÀ LỊCH SỬ BBB11
========================================= */

window.bbb11HienThiBangXepHang = function () {
    const danhSach = window.bbb11LayBangXepHang();
    const noiDung = document.getElementById("bbb11BangXepHang");

    if (!noiDung) {
        alert("Không tìm thấy khu vực bảng xếp hạng!");
        return;
    }

    if (!danhSach.length) {
        noiDung.innerHTML = "<p>Chưa có dữ liệu xếp hạng.</p>";
        return;
    }

    noiDung.innerHTML = `
        <h2>🏆 BẢNG XẾP HẠNG BBB11</h2>
        <div class="bbb11-ranking-list">
            ${danhSach.slice(0, 20).map((item, index) => `
                <div class="bbb11-ranking-item">
                    <span>${index === 0 ? "🥇" :
                        index === 1 ? "🥈" :
                        index === 2 ? "🥉" : index + 1}</span>
                    <strong>${String(item.ten || "Người chơi")
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")}</strong>
                    <b>${Number(item.diem) || 0} điểm</b>
                </div>
            `).join("")}
        </div>
    `;
};


window.bbb11HienThiLichSu = function () {
    const danhSach = window.bbb11LayLichSu();
    const noiDung = document.getElementById("bbb11LichSu");

    if (!noiDung) {
        alert("Không tìm thấy khu vực lịch sử chơi!");
        return;
    }

    if (!danhSach.length) {
        noiDung.innerHTML = "<p>Bạn chưa có lịch sử chơi.</p>";
        return;
    }

    noiDung.innerHTML = `
        <h2>📜 LỊCH SỬ CHƠI</h2>
        ${danhSach.slice(0, 30).map(item => `
            <div class="bbb11-history-item">
                <strong>${String(item.ten || "Người chơi")
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")}</strong>
                <span>${Number(item.diem) || 0} điểm</span>
                <small>${String(item.thoiGian || "")}</small>
            </div>
        `).join("")}
    `;
};

/* ==========================================
   BBB11 - BẮN SÚNG AK CHINH PHỤC CỘT MỐC
   Trò chơi trắc nghiệm dạng bắn 4 bia
========================================== */

window.bbb11GameBanBia = function () {
   const root = document.getElementById("quizArena");

    if (!root) {
        alert("Chưa tìm thấy khu vực trò chơi bbb11BanBia!");
        return;
    }

    const cauHoi = [
        {
            q: "Pháo đài Láng nổ súng mở đầu Toàn quốc kháng chiến vào ngày nào?",
            a: ["19/12/1946", "02/09/1945", "07/05/1954", "10/10/1954"],
            d: 0,
            gt: "Ngày 19/12/1946, quân và dân Hà Nội mở đầu Toàn quốc kháng chiến."
        },
        {
            q: "Ngày Quốc khánh nước Việt Nam là ngày nào?",
            a: ["30/04/1975", "02/09/1945", "19/08/1945", "07/05/1954"],
            d: 1,
            gt: "Ngày 02/09/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập."
        },
        {
            q: "Chiến thắng Điện Biên Phủ diễn ra vào năm nào?",
            a: ["1945", "1946", "1954", "1975"],
            d: 2,
            gt: "Chiến thắng Điện Biên Phủ diễn ra ngày 07/05/1954."
        },
        {
            q: "Ngày giải phóng miền Nam, thống nhất đất nước là ngày nào?",
            a: ["02/09/1945", "07/05/1954", "19/08/1945", "30/04/1975"],
            d: 3,
            gt: "Ngày 30/04/1975 đánh dấu giải phóng miền Nam, thống nhất đất nước."
        },
        {
            q: "Quân đội nhân dân Việt Nam thành lập ngày nào?",
            a: ["22/12/1944", "22/12/1945", "19/12/1946", "02/09/1945"],
            d: 0,
            gt: "Ngày 22/12/1944 là ngày thành lập Quân đội nhân dân Việt Nam."
        },
        {
            q: "Ai là người đọc Tuyên ngôn Độc lập ngày 02/09/1945?",
            a: ["Võ Nguyên Giáp", "Hồ Chí Minh", "Phạm Văn Đồng", "Trường Chinh"],
            d: 1,
            gt: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình."
        },
        {
            q: "Chiến dịch Điện Biên Phủ kết thúc thắng lợi vào ngày nào?",
            a: ["30/04/1975", "22/12/1944", "07/05/1954", "02/09/1945"],
            d: 2,
            gt: "Chiến dịch Điện Biên Phủ kết thúc thắng lợi ngày 07/05/1954."
        },
        {
            q: "Ngày truyền thống của Quân đội nhân dân Việt Nam là ngày nào?",
            a: ["01/05", "02/09", "19/08", "22/12"],
            d: 3,
            gt: "Ngày 22/12 hằng năm là ngày thành lập và ngày hội Quốc phòng toàn dân."
        },
        {
            q: "Cách làm nào thể hiện tinh thần đoàn kết trong tập thể?",
            a: ["Hỗ trợ đồng đội, cùng hoàn thành nhiệm vụ", "Chỉ quan tâm bản thân", "Đùn đẩy trách nhiệm", "Không phối hợp"],
            d: 0,
            gt: "Đoàn kết và hỗ trợ đồng đội góp phần hoàn thành nhiệm vụ chung."
        },
        {
            q: "Khi phát hiện sai sót trong nhiệm vụ, cần làm gì?",
            a: ["Che giấu", "Báo cáo và chủ động khắc phục", "Đổ lỗi", "Bỏ qua"],
            d: 1,
            gt: "Cần trung thực báo cáo, nhận trách nhiệm và khắc phục sai sót."
        }
    ];

    let viTri = 0;
    let diem = 0;
    let dung = 0;
    let sai = 0;
    let daChon = false;
    let timer = null;
    let giay = 30;
    let daKetThuc = false;

    const thoatTimer = () => {
        if (timer) clearInterval(timer);
        timer = null;
    };

    function anToan(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;",
            '"': "&quot;", "'": "&#39;"
        })[c]);
    }

    function hienThi() {
        thoatTimer();

        if (viTri >= cauHoi.length) {
            ketThuc();
            return;
        }

        daChon = false;
        giay = 30;

        const c = cauHoi[viTri];
        const cotMoc = Math.floor(viTri / 2) + 1;

        root.innerHTML = `
            <div class="bb11-arena">
                <header class="bb11-hud">
                    <div class="bb11-player">🎖️ CHIẾN SĨ BBB11</div>
                    <div>CÂU ${viTri + 1}/${cauHoi.length}</div>
                    <div class="bb11-clock" id="bb11Clock">30</div>
                    <div>⭐ <span id="bb11Score">${diem}</span></div>
                </header>

                <div class="bb11-map">
                    <div class="bb11-checkpoints">
                        ${[1,2,3,4,5].map(n => `
                            <div class="bb11-checkpoint
                                ${n <= cotMoc ? "passed" : ""}">
                                <span>${n < cotMoc ? "✓" : "★"}</span>
                                <small>MỐC ${n}</small>
                            </div>
                        `).join("")}
                    </div>

                    <div class="bb11-question">
                        <span class="bb11-label">NHIỆM VỤ ${viTri + 1}</span>
                        <h3>${anToan(c.q)}</h3>
                        <p>🎯 Chọn một trong bốn bia đáp án!</p>
                    </div>

                    <div class="bb11-targets" id="bb11Targets">
                        ${c.a.map((a, i) => `
                            <button class="bb11-target"
                                data-answer="${i}"
                                aria-label="Bia ${String.fromCharCode(65+i)}">
                                <span class="bb11-target-ring">
                                    <span class="bb11-target-letter">
                                        ${String.fromCharCode(65+i)}
                                    </span>
                                </span>
                                <span class="bb11-target-text">
                                    ${anToan(a)}
                                </span>
                            </button>
                        `).join("")}
                    </div>

                 
<div class="bb11-aim-layer" id="bb11AimLayer">
    <div class="bb11-crosshair" id="bb11Crosshair">
        <span></span>
    </div>
    <div class="bb11-bullet" id="bb11Bullet"></div>
</div>

<div class="bb11-weapon-area">
    <div class="bb11-rifle" aria-label="Súng trong trò chơi">
        
<span class="bb11-rifle-icon">🔫</span>



        <span class="bb11-rifle-label">AK • BBB11</span>
    </div>
    <button type="button" class="bb11-fire-button"
        id="bb11FireButton">
        🔥 BẮN
    </button>
    <p class="bb11-aim-hint">
        Di chuyển tâm ngắm vào bia rồi nhấn BẮN
    </p>
</div>


                    <div class="bb11-feedback" id="bb11Feedback">
                        Chọn bia để trả lời câu hỏi
                    </div>

                    <div class="bb11-bottom">
                        <span>🎯 ĐÚNG: ${dung}</span>
                        <span>❌ SAI: ${sai}</span>
                        <span>🏁 MỐC ${cotMoc}/5</span>
                    </div>
                </div>
            </div>
        `;

       
const map = root.querySelector(".bb11-map");
const aimLayer = root.querySelector("#bb11AimLayer");
const crosshair = root.querySelector("#bb11Crosshair");
const bullet = root.querySelector("#bb11Bullet");
const fireButton = root.querySelector("#bb11FireButton");

let aimX = map.clientWidth / 2;
let aimY = map.clientHeight * 0.48;
let selectedTarget = null;

function capNhatTamNgam(x, y) {
    const rect = map.getBoundingClientRect();

    aimX = Math.max(0, Math.min(map.clientWidth, x));
    aimY = Math.max(0, Math.min(map.clientHeight, y));

    crosshair.style.left = aimX + "px";
    crosshair.style.top = aimY + "px";

    const element = document.elementFromPoint(
        rect.left + aimX,
        rect.top + aimY
    );

    selectedTarget = element
        ? element.closest("[data-answer]")
        : null;

    if (selectedTarget && !map.contains(selectedTarget)) {
        selectedTarget = null;
    }
}

map.addEventListener("pointermove", function (event) {
    const rect = map.getBoundingClientRect();

    capNhatTamNgam(
        event.clientX - rect.left,
        event.clientY - rect.top
    );
});

root.querySelectorAll("[data-answer]").forEach(btn => {
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const rect = map.getBoundingClientRect();
        const targetRect = btn.getBoundingClientRect();

        capNhatTamNgam(
            targetRect.left + targetRect.width / 2 - rect.left,
            targetRect.top + targetRect.height / 2 - rect.top
        );

        selectedTarget = btn;
        btn.classList.add("bb11-aimed");
    });
});

fireButton.onclick = function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (fireButton.disabled) return;

    const rifle = root.querySelector(".bb11-rifle");
    const map = root.querySelector(".bb11-map");
    const bullet = root.querySelector("#bb11Bullet");
    const crosshair = root.querySelector("#bb11Crosshair");

    if (!map || !bullet || !crosshair) {
        console.error("BBB11: Thiếu khu vực ngắm hoặc viên đạn.");
        return;
    }

    // Hiệu ứng giật súng
    if (rifle) {
        rifle.classList.remove("bb11-recoil");
        void rifle.offsetWidth;
        rifle.classList.add("bb11-recoil");
    }

    // Lấy vị trí tâm ngắm
    const mapRect = map.getBoundingClientRect();
    const aimRect = crosshair.getBoundingClientRect();

    const startX = map.clientWidth / 2;
    const startY = map.clientHeight - 25;

    const endX =
        aimRect.left + aimRect.width / 2 - mapRect.left;

    const endY =
        aimRect.top + aimRect.height / 2 - mapRect.top;

    // Khởi tạo viên đạn
    bullet.style.transition = "none";
    bullet.style.opacity = "1";
    bullet.style.left = startX + "px";
    bullet.style.top = startY + "px";
    bullet.style.transform = "translate(0, 0)";

    void bullet.offsetWidth;

    // Bắn viên đạn về phía tâm ngắm
    bullet.style.transition =
        "transform 250ms linear, opacity 100ms 200ms";

    bullet.style.transform =
        `translate(${endX - startX}px, ${endY - startY}px)`;

    bullet.style.opacity = "0";

    // Phản hồi khi bắn
    fireButton.disabled = true;

    setTimeout(function () {
        const target = document.elementFromPoint(
            mapRect.left + endX,
            mapRect.top + endY
        );

        const bia = target
            ? target.closest("[data-answer]")
            : null;

        if (bia && map.contains(bia)) {
            bia.click();
        } else {
            const feedback =
                root.querySelector("#bb11Feedback");

            if (feedback) {
                feedback.textContent =
                    "🎯 Chưa trúng bia! Hãy điều chỉnh tâm ngắm.";
            }
        }

        fireButton.disabled = false;
    }, 260);
};


        timer = setInterval(() => {
            giay--;

            const clock = root.querySelector("#bb11Clock");
            if (clock) {
                clock.textContent = giay;
                if (giay <= 10) clock.classList.add("urgent");
            }

            if (giay <= 0) traLoi(-1, null);
        }, 1000);
    }

    function traLoi(chon, btn) {
        if (daChon || daKetThuc) return;

        daChon = true;
        thoatTimer();

        const c = cauHoi[viTri];
        const chinhXac = chon === c.d;
        const feedback = root.querySelector("#bb11Feedback");
        const shot = root.querySelector("#bb11Shot");

        if (btn) {
            btn.classList.add("fired");
            shot.textContent = "💥";
            shot.classList.remove("bb11-boom");
            void shot.offsetWidth;
            shot.classList.add("bb11-boom");
        }

        if (chinhXac) {
            dung++;
            diem += 100 + giay * 2;
            feedback.innerHTML = `
                <strong class="bb11-correct">🎯 BẮN TRÚNG ĐÁP ÁN!</strong>
                <p>${anToan(c.gt)}</p>
            `;
        } else {
            sai++;
            feedback.innerHTML = `
                <strong class="bb11-wrong">
                    ${chon === -1 ? "⏰ HẾT GIỜ!" : "❌ CHƯA CHÍNH XÁC"}
                </strong>
                <p>Đáp án đúng: ${"ABCD"[c.d]} — ${anToan(c.a[c.d])}</p>
                <p>${anToan(c.gt)}</p>
            `;
        }

        root.querySelectorAll("[data-answer]").forEach(b => {
            b.disabled = true;
            const n = Number(b.dataset.answer);

            if (n === c.d) b.classList.add("right-answer");
            else if (n === chon) b.classList.add("wrong-answer");
        });

        const nut = document.createElement("button");
        nut.className = "bb11-next";
        nut.textContent = (viTri % 2 === 1 && viTri < 9)
            ? "🏁 VƯỢT CỘT MỐC TIẾP THEO"
            : viTri === 9 ? "🏆 XEM KẾT QUẢ" : "➡️ CÂU TIẾP THEO";

        nut.onclick = () => {
            viTri++;
            hienThi();
        };

        feedback.appendChild(nut);
        const scoreEl = root.querySelector("#bb11Score");
        if (scoreEl) scoreEl.textContent = diem;
    }

    function ketThuc() {
        daKetThuc = true;
        thoatTimer();

        const ketQua = {
            ten: window.bbb11CurrentUser || "Người chơi",
            diem,
            soCauDung: dung,
            soCauSai: sai,
            cheDo: "ban-bia-5-cot-moc",
            thoiGian: new Date().toLocaleString("vi-VN")
        };

        try {
            const key = "bbb11_quiz_history";
            const history = JSON.parse(localStorage.getItem(key) || "[]");
            history.unshift(ketQua);
            localStorage.setItem(key, JSON.stringify(history.slice(0, 200)));

            const rankKey = "bbb11_quiz_ranking";
            const rank = JSON.parse(localStorage.getItem(rankKey) || "[]");
            rank.push(ketQua);
            rank.sort((a, b) => Number(b.diem) - Number(a.diem));
            localStorage.setItem(rankKey, JSON.stringify(rank.slice(0, 100)));
        } catch (e) {
            console.warn("Không lưu được kết quả trên thiết bị.", e);
        }

        root.innerHTML = `
            <div class="bb11-finish">
                <h1>🏆 HOÀN THÀNH NHIỆM VỤ!</h1>
                <p class="bb11-final-score">${diem} ĐIỂM</p>
                <p>🎯 Trả lời đúng: ${dung}/10 câu</p>
                <p>❌ Trả lời sai hoặc hết giờ: ${sai} câu</p>
                <p>⭐ Đã vượt qua 5 cột mốc!</p>
                <button class="bb11-next" id="bb11Replay">
                    🔄 CHƠI LẠI
                </button>
            </div>
        `;

        root.querySelector("#bb11Replay").onclick = window.bbb11GameBanBia;
    }

    hienThi();
};

let danhSachBaiHocTuSupabase = [];

window.educationPage = function () {
    return `
        <div class="page-box education-page education-unit-theme">

            <section class="education-hero">
                <img
                    src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/giao-duc-chinh-tri.png"
                    alt="Giáo dục chính trị BBB11"
                    class="education-hero-image"
                >
            </section>

            <p class="education-intro">
                Kho học tập chính trị, tài liệu giáo dục và nội dung
                rèn luyện phục vụ cán bộ, chiến sĩ Đại đội 11.
            </p>

            <section class="education-content">
                <div class="education-heading">
                    <span class="education-heading-icon">📚</span>
                    <div>
                        <h2>GIÁO DỤC CHÍNH TRỊ BBB11</h2>
                        <p>Chủ động học tập – Nâng cao nhận thức – Hoàn thành nhiệm vụ</p>
                    </div>
                </div>

        


<div class="education-search">
    <input
        type="text"
        id="educationSearch"
        placeholder="🔍 Tìm kiếm bài học, tài liệu..."
        oninput="capNhatDanhSachBaiHocChinhTri()"
    >
</div>

<!-- KHUNG XEM TÀI LIỆU TRỰC TIẾP -->
<div class="education-viewer" id="educationViewer"
     style="display:none;">

    <div class="education-viewer-header">
        <strong id="educationViewerTitle">
            📖 NỘI DUNG ĐANG XEM
        </strong>

        <button onclick="dongKhungXem()">
            ✕ Đóng
        </button>
    </div>

    <div class="education-viewer-body">
        <iframe
            id="educationViewerFrame"
            src="about:blank"
            title="Xem tài liệu trực tiếp"
            allowfullscreen>
        </iframe>
    </div>

    <p class="education-open-link">
        Không xem được?
        <a id="educationOpenNewTab"
           href="#"
           target="_blank"
           rel="noopener noreferrer">
            Mở liên kết trong tab mới
        </a>
    </p>
</div>

<!-- DANH SÁCH BÀI HỌC -->
<div id="educationList">
    ${taoDanhSachBaiHocChinhTri()}
</div>

</section>

</div>
`;
};

window.educationPage = window.educationPage;

function educationEscapeHTML(value) {
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

function capNhatDanhSachBaiHocChinhTri() {
    const khung = document.getElementById("educationList");
    if (!khung) return;

    const keyword =
        document.getElementById("educationSearch")?.value || "";

    khung.innerHTML = taoDanhSachBaiHocChinhTri(keyword);
}

window.capNhatDanhSachBaiHocChinhTri =
    capNhatDanhSachBaiHocChinhTri;

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
    const tuKhoa = String(keyword).toLocaleLowerCase("vi").trim();

    const ketQua = danhSach.filter(item => {
        const noiDung = [
            item.title,
            item.category,
            item.description,
            item.content
        ].join(" ").toLocaleLowerCase("vi");

        return !tuKhoa || noiDung.includes(tuKhoa);
    });

    if (!ketQua.length) {
        return `
            <div class="education-empty">
                <i class="fa-solid fa-book-open"></i>
                <h4>${tuKhoa ? "Không tìm thấy bài học" : "Chưa có bài học"}</h4>
                <p>${
                    tuKhoa
                        ? "Thử tìm bằng từ khóa khác."
                        : "Các bài học sẽ hiển thị tại đây."
                }</p>
            </div>`;
    }

    return ketQua.map((item, index) => {
        const urlThamKhao =
            item.reference_url ||
            item.referenceUrl ||
            item.source_url ||
            item.sourceUrl ||
            item.reference ||
            "";

        let linkThamKhao = "";

        try {
            const url = new URL(urlThamKhao, window.location.origin);

            if (
                urlThamKhao &&
                ["https:", "http:"].includes(url.protocol)
            ) {
                linkThamKhao = url.href;
            }
        } catch (error) {
            linkThamKhao = "";
        }

        if (!linkThamKhao) {
            linkThamKhao =
                "https://www.google.com/search?q=" +
                encodeURIComponent(
                    (item.title || "Tài liệu giáo dục chính trị") +
                    " tài liệu tham khảo chính thống"
                );
        }

        return `
        <article class="education-card">
            <div class="education-card-top">
                <div class="education-card-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="education-card-title">
                    <span class="education-category">
                        <i class="fa-solid fa-folder-open"></i>
                        ${educationEscapeHTML(
                            item.category || "Tài liệu khác"
                        )}
                    </span>
                    <h4>${educationEscapeHTML(
                        item.title || "Chưa có tiêu đề"
                    )}</h4>
                </div>
            </div>

            ${item.description ? `
                <p class="education-description">
                    ${educationEscapeHTML(item.description)}
                </p>
            ` : ""}

            <details class="education-detail">
                <summary>
                    <span>
                        <i class="fa-solid fa-book-open"></i>
                        XEM NỘI DUNG BÀI HỌC
                    </span>
                    <i class="fa-solid fa-chevron-down education-chevron"></i>
                </summary>

                <div class="education-content">
                    <pre>${educationEscapeHTML(
                        item.content || "Chưa cập nhật nội dung bài học."
                    )}</pre>
                </div>
            </details>

            <div class="education-reference">

 <button
    type="button"
    class="btn-education-reference"
    onclick="moKhungXem(this)"
    data-url="${educationEscapeHTML(linkThamKhao)}"
    data-title="${educationEscapeHTML(item.title || "Tài liệu giáo dục chính trị")}">

    <i class="fa-solid fa-eye"></i>
    XEM TÀI LIỆU TRỰC TIẾP
</button>


    <a
        class="btn-education-reference"
        href="${educationEscapeHTML(linkThamKhao)}"
        target="_blank"
        rel="noopener noreferrer">

        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        MỞ TAB MỚI
    </a>

</div>
        </article>`;
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
    <div class="page-box resolution-modern">

        <section class="resolution-hero">
            <div class="resolution-eyebrow">
                TIỂU ĐOÀN 3 • ĐẠI ĐỘI 11
            </div>

            <h1>
                <i class="fa-solid fa-book-open"></i>
                HỌC TẬP NGHỊ QUYẾT
            </h1>

            <p>
                Nâng cao nhận thức chính trị, phát huy trách nhiệm,
                giữ vững kỷ luật và quyết tâm hoàn thành nhiệm vụ.
            </p>

            <div class="resolution-hero-line"></div>
        </section>

        <section class="resolution-purpose">
            <div class="resolution-purpose-icon">
                <i class="fa-solid fa-medal"></i>
            </div>

            <div>
                <h2>MỤC ĐÍCH HỌC TẬP</h2>
                <p>
                    Chủ động nghiên cứu, nắm vững nội dung nghị quyết,
                    liên hệ thực tiễn và vận dụng vào quá trình công tác,
                    học tập, rèn luyện tại đơn vị.
                </p>
            </div>
        </section>

        <section class="resolution-filter-panel">
            <h2 class="resolution-section-title">
                <i class="fa-solid fa-layer-group"></i>
                PHÂN LOẠI TÀI LIỆU
            </h2>

            <div class="resolution-filters">
                <label for="locNamNQ">
                    <i class="fa-regular fa-calendar"></i>
                    Năm ban hành
                </label>

                <select id="locNamNQ"
                    onchange="locHienThiNghiQuyetBBB11()">
                    <option value="Tất cả">Tất cả các năm</option>
                    ${cacNam.map(nam =>
                        `<option value="${escapeHTML(nam)}">${escapeHTML(nam)}</option>`
                    ).join("")}
                </select>

                <label for="locChuDeNQ">
                    <i class="fa-solid fa-folder-open"></i>
                    Chủ đề nghị quyết
                </label>

                <select id="locChuDeNQ"
                    onchange="locHienThiNghiQuyetBBB11()">
                    <option value="Tất cả">Tất cả chủ đề</option>
                    ${cacChuDe.map(chuDe =>
                        `<option value="${escapeHTML(chuDe)}">${escapeHTML(chuDe)}</option>`
                    ).join("")}
                </select>
            </div>

            <div class="resolution-count">
                <i class="fa-solid fa-book-bookmark"></i>
                <span id="demNghiQuyetBBB11">
                    Danh sách tài liệu nghị quyết
                </span>
            </div>
        </section>

        <section class="resolution-results">
            <h2 class="resolution-section-title">
                <i class="fa-solid fa-book-open-reader"></i>
                DANH SÁCH NGHỊ QUYẾT
            </h2>

            <div id="resolutionList" class="resolution-list"></div>
        </section>

        <footer class="resolution-footer">
            HỌC TẬP NGHIÊM TÚC • NHẬN THỨC ĐÚNG • HÀNH ĐỘNG ĐÚNG
        </footer>

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
        <div class="page-box resolution-app resolution-unit-theme">

            <!-- BANNER HỌC TẬP NGHỊ QUYẾT -->
            <section class="res-hero-banner manual-hero-banner">
                <img
                    src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/hoc-tap-nghi-quyet2.png"
                    alt="Giáo dục chính trị - Học tập nghị quyết"
                    class="manual-banner-image"
                >

                <p class="res-hero-desc">
                    Kho học tập nghị quyết, chỉ thị và văn kiện
                    phục vụ giáo dục chính trị tại đơn vị.
                </p>
            </section>

            <!-- MỤC ĐÍCH HỌC TẬP -->
            <div class="notice-card res-purpose-box">
                <h3>🎖️ MỤC ĐÍCH HỌC TẬP</h3>
                <p>
                    Nâng cao nhận thức chính trị, trách nhiệm,
                    phẩm chất đạo đức và ý thức chấp hành kỷ luật.
                </p>
            </div>

            <div class="res-section-bar">
                <h3>📖 DANH SÁCH NGHỊ QUYẾT</h3>
            </div>

            <div id="resolutionList" class="res-list-grid"></div>

            <div class="resolution-reader-card res-panel">

                <div class="res-panel-head">
                    <h3 id="resolutionReaderTitle">
                        📖 KHUNG ĐỌC TÀI LIỆU
                    </h3>
                </div>

                <p id="resolutionReaderDescription" class="res-reader-desc">
                    Chọn nghị quyết để xem nội dung học tập.
                </p>

                <div id="resolutionReaderContent" class="res-reader-summary">
                    <p>Vui lòng chọn một tài liệu ở danh sách bên trên.</p>
                </div>

                <div class="resolution-reader-actions res-actions">

                    <button class="action-button res-btn-primary"
                        onclick="taiLaiNghiQuyet()">
                        🔄 TẢI LẠI
                    </button>

                    <button class="action-button res-btn-secondary"
                        onclick="moNghiQuyetBenNgoai()">
                        🌐 MỞ VĂN BẢN GỐC
                    </button>

                </div>

                <iframe
                    id="resolutionReader"
                    class="res-iframe"
                    title="Khung đọc nghị quyết"
                    src="about:blank"
                    loading="lazy">
                </iframe>

                <p id="resolutionReaderNote" class="res-note">
                    Nếu website nguồn chặn nhúng, bạn vẫn có thể
                    đọc phần nội dung học tập tóm tắt ở phía trên.
                </p>

            </div>

            <div class="resolution-web-box res-panel">
                <div class="res-panel-head">
                    <h3>🌐 XEM TÀI LIỆU TRỰC TIẾP</h3>
                </div>

                <iframe
                    id="resolutionWebFrame"
                    class="res-iframe"
                    src="about:blank"
                    title="Nội dung nghị quyết"
                    loading="lazy">
                </iframe>

                <p id="resolutionWebNote" class="res-note">
                    Chọn nghị quyết để xem tài liệu tại đây.
                </p>
            </div>

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
    const danhSach = Array.isArray(BAI_HAT_QUAN_DOI)
        ? BAI_HAT_QUAN_DOI
        : [];

    const cards = danhSach.map((bai, index) => `
        <article class="bbb11-music-item"
            data-search="${escapeHTML(
                (bai.ten + " " + bai.nhom).toLocaleLowerCase("vi")
            )}">

            <div class="bbb11-track-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="bbb11-track-icon">
                <i class="fa-solid fa-music"></i>
            </div>

            <div class="bbb11-track-info">
                <h4>${escapeHTML(bai.ten)}</h4>
                <p>
                    <i class="fa-solid fa-microphone-lines"></i>
                    ${escapeHTML(bai.nhom)}
                </p>
            </div>

            <button class="bbb11-play-btn"
                type="button"
                onclick="window.phatBaiHatBBB11(${index})"
                aria-label="Nghe ${escapeHTML(bai.ten)}">
                <i class="fa-solid fa-play"></i>
                <span>NGHE NGAY</span>
            </button>
        </article>
    `).join("");

    return `
    <div class="page-box bbb11-music-app">

        <header class="bbb11-music-hero">
            <img
                src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/kho-tan-am-nhac.png"
                alt="Kho tàng âm nhạc quân đội"
                class="bbb11-music-banner">

            <div class="bbb11-hero-overlay"></div>

            <div class="bbb11-hero-content">
                <span class="bbb11-hero-tag">
                    <i class="fa-solid fa-star"></i>
                    TIỂU ĐOÀN 3 · ĐẠI ĐỘI 11
                </span>

                <h2>KHO TÀNG<br>
                    <span>ÂM NHẠC QUÂN ĐỘI</span>
                </h2>

                <p>
                    Giai điệu truyền thống · Khúc hát người lính
                </p>

                <div class="bbb11-hero-stats">
                    <div>
                        <i class="fa-solid fa-compact-disc"></i>
                        <span>
                            <strong>${danhSach.length}</strong>
                            <small>BÀI HÁT</small>
                        </span>
                    </div>

                    <div>
                        <i class="fa-solid fa-headphones"></i>
                        <span>
                            <strong>BBB11</strong>
                            <small>TRỰC TUYẾN</small>
                        </span>
                    </div>
                </div>
            </div>
        </header>

        <section class="bbb11-player-panel">
            <div class="bbb11-section-heading">
                <div class="bbb11-heading-icon">
                    <i class="fa-solid fa-circle-play"></i>
                </div>
                <div>
                    <span class="bbb11-eyebrow">MUSIC PLAYER</span>
                    <h3>Trình phát âm nhạc</h3>
                </div>
                <span class="bbb11-live-indicator">
                    <span></span> BBB11
                </span>
            </div>

            <div class="bbb11-now-playing">
                <div class="bbb11-disc">
                    <i class="fa-solid fa-music"></i>
                </div>

                <div class="bbb11-now-info">
                    <span>ĐANG PHÁT</span>
                    <h4 id="bbb11NowPlaying">
                        Chưa chọn bài hát
                    </h4>
                    <p>Chọn một giai điệu để bắt đầu</p>
                </div>
            </div>

            <div class="bbb11-video-wrap">
                <iframe
                    id="bbb11MusicPlayer"
                    src="about:blank"
                    title="Trình phát âm nhạc BBB11"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                </iframe>
            </div>

            <div class="bb11-player-footer">
                <div>
                    <i class="fa-solid fa-shield-halved"></i>
                    Âm vang truyền thống
                </div>

                <button type="button"
                    onclick="window.xoaNhacBB11()">
                    <i class="fa-solid fa-stop"></i>
                    DỪNG NHẠC
                </button>
            </div>
        </section>

        <section class="bb11-library">
            <div class="bb11-section-heading">
                <div class="bb11-heading-icon">
                    <i class="fa-solid fa-list-music"></i>
                </div>
                <div>
                    <span class="bb11-eyebrow">Giai điệu truyền thống · Khúc hát người lính</span>
                    <h3>Thư viện bài hát</h3>
                    <p>Khám phá những ca khúc cách mạng bất hủ</p>
                </div>
            </div>

            <div class="bb11-library-search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                    id="bbb11MusicSearch"
                    type="search"
                    placeholder="Tìm tên bài hát, nhạc sĩ..."
                    oninput="window.locBaiHat C11()">
                <span class="bb11-search-shortcut">
                    <i class="fa-solid fa-sliders"></i>
                </span>
            </div>

            <div class="bb11-library-meta">
                <span>
                    <i class="fa-solid fa-layer-group"></i>
                    DANH SÁCH PHÁT
                </span>
                <span class="bb11-song-count">
                    ${danhSach.length} BÀI HÁT
                </span>
            </div>

            <div id="bbb11MusicList" class="bbb11-music-list">
                ${cards}
            </div>

            <div id="bb11NoMusic" class="bbb11-no-music" hidden>
                <i class="fa-solid fa-music"></i>
                <h4>Không tìm thấy bài hát</h4>
                <p>Thử nhập tên bài hát khác nhé.</p>
            </div>
        </section>

        <footer class="bb11-music-bottom">
            <i class="fa-solid fa-star"></i>
            TIỂU ĐOÀN 3 · ĐẠI ĐỘI 11
            <span>•</span>
            ÂM NHẠC TRUYỀN THỐNG
        </footer>
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


"use strict";

// ============================================
// BBB11 - THƯ VIỆN ẢNH ĐƠN VỊ
// Ảnh được quản lý trực tiếp trong code
// Không cần Supabase
// ============================================

(function () {

    // ========================================
    // DANH SÁCH ẢNH CỦA ĐƠN VỊ
    // Thay đường dẫn bằng ảnh thật trong GitHub
    // ========================================

    const GALLERY_IMAGES = [
        {
            title: "Hoạt động Đại đội 11",
            album: "Hoạt động văn nghệ ",
            description: "Lễ Tuyên Thệ Chiến Sĩ Mới.",
            src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-01.jpg.jpg"
        },
        {
            title: "Huấn luyện",
            album: "Kết Thúc 3 tiếng nổ CSM",
            description: "Hình ảnh huấn luyện của đơn vị.",
            src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-02.jpg.jpg"
        },
        {
            title: "Học Tập Và Giao Lưu Văn Nghệ ",
            album: "Học tập và Sinh hoạt",
            description: "Hình ảnh học tập và  sinh hoạt Đại đội 11.",
            src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-03.jpg.jpg"
        },
        {
            title: "Hoạt động tập thể",
            album: "Giao Lưu giữa Chiến Sĩ Cũ Và Chiến Sĩ Mới",
            description: "Hình ảnh hoạt động tập thể.",
            src: "https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/bbb11-gallery/anh-04.jpg.jpg"
        }
    ];

    // Mã hóa nội dung văn bản để hiển thị an toàn
    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, c => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[c]);
    }

    // ========================================
    // GIAO DIỆN THƯ VIỆN ẢNH
    // ========================================

    window.galleryPage = function () {
        return `
        <section id="bbb11Gallery" class="bbb11-gallery">
            <style>
                .bbb11-gallery {
                    padding: 18px;
                    color: var(--text-color, inherit);
                }

                .bbb11-gallery h2 {
                    margin: 0 0 10px;
                }

                .bbb11-gallery .gallery-toolbar {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin: 18px 0;
                }

                .bbb11-gallery input,
                .bbb11-gallery select {
                    box-sizing: border-box;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font: inherit;
                    max-width: 100%;
                }

                .bbb11-gallery input {
                    flex: 1;
                    min-width: 180px;
                }

                .bbb11-gallery .gallery-grid {
                    display: grid;
                    grid-template-columns:
                        repeat(auto-fill, minmax(190px, 1fr));
                    gap: 15px;
                    margin-top: 18px;
                }

                .bbb11-gallery .gallery-card {
                    overflow: hidden;
                    border: 1px solid #ddd;
                    border-radius: 12px;
                    background: var(--card-bg, #fff);
                    color: var(--text-color, #222);
                    box-shadow: 0 2px 7px #0000000d;
                }

                .bbb11-gallery .gallery-photo {
                    display: block;
                    width: 100%;
                    height: 190px;
                    object-fit: cover;
                    cursor: pointer;
                    background: #eee;
                }

                .bbb11-gallery .gallery-info {
                    padding: 12px;
                }

                .bbb11-gallery .gallery-info h3 {
                    font-size: 16px;
                    margin: 0 0 8px;
                    overflow-wrap: anywhere;
                }

                .bbb11-gallery .gallery-desc {
                    font-size: 13px;
                    overflow-wrap: anywhere;
                }

                .bbb11-gallery .gallery-album {
                    display: inline-block;
                    background: #fee2e2;
                    color: #991b1b;
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 12px;
                }

                .bbb11-gallery .gallery-empty {
                    padding: 20px;
                    text-align: center;
                    opacity: .8;
                }

                .bbb11-gallery .gallery-lightbox {
                    position: fixed;
                    inset: 0;
                    z-index: 999999;
                    background: #000e;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }

                .bbb11-gallery .gallery-lightbox img {
                    max-width: 95vw;
                    max-height: 85vh;
                    object-fit: contain;
                }

                .bbb11-gallery .gallery-lightbox button {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    padding: 10px 14px;
                    border: 0;
                    border-radius: 8px;
                    cursor: pointer;
                }

                @media (max-width: 600px) {
                    .bbb11-gallery {
                        padding: 10px;
                    }

                    .bbb11-gallery .gallery-grid {
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                        gap: 9px;
                    }

                    .bbb11-gallery .gallery-photo {
                        height: 140px;
                    }
                }
            </style>
   
            
        




            <h2>🖼️ THƯ VIỆN ẢNH BBB11</h2>
            <p>Hình ảnh hoạt động, huấn luyện và sinh hoạt Đại đội 11.</p>

            <div class="gallery-toolbar">
                <input id="bbb11GallerySearch"
                    type="search"
                    placeholder="Tìm kiếm hình ảnh..."
                    oninput="loadGallery()">

                <select id="bbb11GalleryAlbum"
                    onchange="loadGallery()">
                    <option value="">Tất cả album</option>
                </select>
            </div>

            <p id="bbb11GalleryStatus">Đang tải hình ảnh...</p>
            <div id="bbb11GalleryGrid" class="gallery-grid"></div>
        </section>`;
    };

    // ========================================
    // HIỂN THỊ ẢNH
    // ========================================

    window.loadGallery = function () {
        const root = document.getElementById("bbb11Gallery");
        if (!root) return;

        const grid = root.querySelector("#bbb11GalleryGrid");
        const status = root.querySelector("#bbb11GalleryStatus");
        const searchInput = root.querySelector("#bbb11GallerySearch");
        const albumSelect = root.querySelector("#bbb11GalleryAlbum");

        if (!grid || !status || !searchInput || !albumSelect) return;

        const previousAlbum = albumSelect.value;
        const albums = [...new Set(
            GALLERY_IMAGES.map(item => item.album).filter(Boolean)
        )].sort((a, b) => a.localeCompare(b, "vi"));

        albumSelect.innerHTML =
            '<option value="">Tất cả album</option>' +
            albums.map(album =>
                `<option value="${escapeHTML(album)}">${escapeHTML(album)}</option>`
            ).join("");

        if (albums.includes(previousAlbum)) {
            albumSelect.value = previousAlbum;
        }

        const keyword = searchInput.value.trim().toLowerCase();
        const selectedAlbum = albumSelect.value;

        const filtered = GALLERY_IMAGES.filter(item => {
            const text = [
                item.title,
                item.album,
                item.description
            ].join(" ").toLowerCase();

            return text.includes(keyword) &&
                (!selectedAlbum || item.album === selectedAlbum);
        });

        status.textContent = filtered.length
            ? `Có ${filtered.length} hình ảnh`
            : "Không tìm thấy hình ảnh phù hợp.";

        grid.innerHTML = filtered.map((item, index) => `
            <article class="gallery-card">
                <img
                    class="gallery-photo"
                    data-gallery-index="${index}"
                    src="${escapeHTML(item.src)}"
                    alt="${escapeHTML(item.title)}"
                    loading="lazy">

                <div class="gallery-info">
                    <h3>${escapeHTML(item.title)}</h3>

                    <span class="gallery-album">
                        ${escapeHTML(item.album || "Ảnh đơn vị")}
                    </span>

                    <p class="gallery-desc">
                        ${escapeHTML(item.description || "")}
                    </p>
                </div>
            </article>
        `).join("");

        grid.querySelectorAll("[data-gallery-index]").forEach(img => {
            img.onerror = function () {
                this.alt = "Không tải được ảnh. Hãy kiểm tra đường dẫn.";
                this.style.opacity = "0.45";
            };

            img.onclick = function () {
                openGalleryLightbox(filtered[Number(this.dataset.galleryIndex)]);
            };
        });
    };

    // ========================================
    // XEM ẢNH PHÓNG TO
    // ========================================

    function openGalleryLightbox(item) {
        if (!item) return;

        document.getElementById("bbb11GalleryLightbox")?.remove();

        const overlay = document.createElement("div");
        overlay.id = "bbb11GalleryLightbox";
        overlay.className = "gallery-lightbox";

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.title || "";

        const close = document.createElement("button");
        close.type = "button";
        close.textContent = "✕ Đóng";
        close.setAttribute("aria-label", "Đóng ảnh");

        close.onclick = () => overlay.remove();

        overlay.onclick = event => {
            if (event.target === overlay) overlay.remove();
        };

        overlay.append(close, img);
        document.body.appendChild(overlay);
    }

    console.log("BBB11: Đã nạp thư viện ảnh từ code.");

})();


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


function binhDanHocVuSoPage() {
    const qlmsUrl = "https://qlms.bqp.vn/trang-chu?continue=%252F";

    return `
        <div class="page-box">
            <h2>
                <i class="fa-solid fa-laptop-file"></i>
                BÌNH DÂN HỌC VỤ SỐ
            </h2>

            <p>Học tập, rèn luyện kỹ năng số ngay tại Đại đội 11.</p>

            <a href="${qlmsUrl}" target="_blank"
               rel="noopener noreferrer"
               style="display:block;padding:16px;background:#b71c1c;
               color:white;text-align:center;text-decoration:none;
               border-radius:10px;font-weight:bold;">
                <i class="fa-solid fa-graduation-cap"></i>
                MỞ HỆ THỐNG HỌC TẬP QLMS
            </a>

            <h3 style="margin-top:25px;">
                <i class="fa-solid fa-book-open"></i>
                Ô HỌC TẬP TRỰC TIẾP
            </h3>

            <p>
                Bạn có thể thử đăng nhập và học ngay trong khung bên dưới.
                Nếu khung không tải được, hãy mở QLMS bằng nút phía trên.
            </p>

            <div style="width:100%;height:700px;
                        border:2px solid #b71c1c;
                        border-radius:10px;overflow:hidden;
                        background:#f5f5f5;">
                <iframe
                    src="${qlmsUrl}"
                    title="Hệ thống học tập Bình dân học vụ số"
                    style="width:100%;height:100%;border:0;"
                    loading="lazy"
                    allow="fullscreen">
                </iframe>
            </div>

            <div style="display:flex;gap:10px;flex-wrap:wrap;
                        margin-top:15px;">
                <a href="${qlmsUrl}" target="_blank"
                   rel="noopener noreferrer"
                   style="flex:1;min-width:180px;padding:14px;
                   background:#1976d2;color:white;text-align:center;
                   text-decoration:none;border-radius:8px;font-weight:bold;">
                    <i class="fa-solid fa-up-right-from-square"></i>
                    MỞ QLMS RIÊNG
                </a>

                <button onclick="document.getElementById('videoHuongDan').scrollIntoView({behavior:'smooth'})"
                    style="flex:1;min-width:180px;padding:14px;
                    background:#388e3c;color:white;border:0;
                    border-radius:8px;font-weight:bold;cursor:pointer;">
                    <i class="fa-solid fa-circle-play"></i>
                    XEM HƯỚNG DẪN
                </button>
            </div>

            <div id="videoHuongDan">
                <h3 style="margin-top:30px;">
                    <i class="fa-brands fa-youtube"></i>
                    VIDEO HƯỚNG DẪN HỌC TẬP
                </h3>

                <div style="position:relative;width:100%;
                            aspect-ratio:16/9;background:#111;
                            border-radius:10px;overflow:hidden;">
                    <iframe
                        src="https://www.youtube.com/embed/qpu_q5qalQI"
                        title="Hướng dẫn Bình dân học vụ số"
                        style="position:absolute;inset:0;
                        width:100%;height:100%;border:0;"
                        allow="accelerometer; autoplay; clipboard-write;
                        encrypted-media; gyroscope; picture-in-picture;
                        web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                    </iframe>
                </div>

                <p>
                    <a href="https://www.youtube.com/watch?v=qpu_q5qalQI"
                       target="_blank" rel="noopener noreferrer">
                        Nếu video không chạy, bấm vào đây để mở YouTube.
                    </a>
                </p>

                <p>
                    <a href="https://www.binhchungtangthietgiap.vn/huong-dan-su-dung-nen-tang-binh-dan-hoc-vu-so-qlms-cua-bo-quoc-phong-tren-internet"
                       target="_blank" rel="noopener noreferrer">
                        Xem hướng dẫn sử dụng QLMS chi tiết
                    </a>
                </p>
            </div>
        </div>
    `;
}

window.binhDanHocVuSoPage = binhDanHocVuSoPage;



/* ===== HIỆU ỨNG CHUYỂN ĐỘNG TRANG TẾT ===== */
window.initTetEffects = function () {
    const canvas = document.getElementById("tetEffectsCanvas");
    if (!canvas) return;

    // Dọn vòng hoạt ảnh cũ nếu mở lại trang Tết
    if (typeof window.__tetEffectsCleanup === "function") {
        window.__tetEffectsCleanup();
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let lastTime = 0;
    let elapsed = 0;
    let fireworkTimer = 0;
    let sparkleTimer = 0;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const particles = [];
    const fireworks = [];
    const colors = ["#ffd96a", "#fff4c2", "#ffb347", "#ff765e"];

    function resize() {
        if (!canvas.isConnected) return;

        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function addSparkle(initial = false) {
        particles.push({
            x: random(0, width),
            y: initial ? random(0, height) : height + 5,
            vx: random(-7, 7),
            vy: random(-24, -8),
            size: random(0.7, 2),
            phase: random(0, Math.PI * 2),
            alpha: random(0.35, 0.9)
        });
    }

    function addFirework() {
        const x = random(width * 0.12, width * 0.88);
        const y = random(height * 0.08, height * 0.55);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const bits = [];

        for (let i = 0; i < 28; i++) {
            const angle = Math.PI * 2 * i / 28;
            const speed = random(22, 75);

            bits.push({
                x: 0,
                y: 0,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                size: random(0.8, 1.8)
            });
        }

        fireworks.push({
            x,
            y,
            age: 0,
            life: random(0.8, 1.2),
            color,
            bits
        });
    }

    function drawSparkles(dt) {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            p.x += p.vx * dt + Math.sin(elapsed * 1.5 + p.phase) * 5 * dt;
            p.y += p.vy * dt;

            const twinkle = 0.45 + 0.55 *
                Math.abs(Math.sin(elapsed * 2.5 + p.phase));

            ctx.save();
            ctx.globalAlpha = p.alpha * twinkle;
            ctx.fillStyle = "#ffe6a0";
            ctx.shadowColor = "#ffc83d";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            if (p.y < -10) {
                particles.splice(i, 1);
            }
        }
    }

    function drawFireworks(dt) {
        for (let i = fireworks.length - 1; i >= 0; i--) {
            const f = fireworks[i];
            f.age += dt;

            const fade = Math.max(0, 1 - f.age / f.life);

            for (const p of f.bits) {
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.vy += 22 * dt;

                ctx.save();
                ctx.globalAlpha = fade;
                ctx.fillStyle = f.color;
                ctx.shadowColor = f.color;
                ctx.shadowBlur = 7;
                ctx.beginPath();
                ctx.arc(
                    f.x + p.x,
                    f.y + p.y,
                    p.size,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
                ctx.restore();
            }

            if (f.age >= f.life) {
                fireworks.splice(i, 1);
            }
        }
    }

    function frame(now) {
        if (!canvas.isConnected) {
            cleanup();
            return;
        }

        const dt = lastTime
            ? Math.min((now - lastTime) / 1000, 0.04)
            : 0.016;

        lastTime = now;
        elapsed += dt;

        ctx.clearRect(0, 0, width, height);

        if (!reducedMotion) {
            fireworkTimer -= dt;
            sparkleTimer -= dt;

            if (fireworkTimer <= 0) {
                addFirework();
                fireworkTimer = random(0.7, 1.3);
            }

            if (sparkleTimer <= 0) {
                const maxParticles = width < 600 ? 32 : 65;

                if (particles.length < maxParticles) {
                    addSparkle();
                }

                sparkleTimer = 0.07;
            }
        }

        drawSparkles(dt);
        drawFireworks(dt);

        raf = requestAnimationFrame(frame);
    }

    function cleanup() {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        particles.length = 0;
        fireworks.length = 0;

        if (window.__tetEffectsCleanup === cleanup) {
            window.__tetEffectsCleanup = null;
        }
    }

    resize();

    if (!reducedMotion) {
        for (let i = 0; i < (width < 600 ? 18 : 35); i++) {
            addSparkle(true);
        }
    }

    window.__tetEffectsCleanup = cleanup;
    window.addEventListener("resize", resize, { passive: true });
    raf = requestAnimationFrame(frame);
};


// ========================================
// CHỨC NĂNG XEM NỘI DUNG TRỰC TIẾP BBB11
// ========================================

function moKhungXemNoiDung(tieuDe, duongLink) {

    const viewer = document.getElementById("educationViewer");
    const frame = document.getElementById("educationViewerFrame");
    const title = document.getElementById("educationViewerTitle");

    if (!viewer || !frame || !title) return;

    title.textContent = "📖 " + tieuDe;
    frame.src = duongLink;

    viewer.style.display = "block";

    viewer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ĐÓNG KHUNG XEM
function dongKhungXem() {

    const viewer = document.getElementById("educationViewer");
    const frame = document.getElementById("educationViewerFrame");

    if (!viewer || !frame) return;

    viewer.style.display = "none";
    frame.src = "about:blank";
}
// MỞ KHUNG XEM TÀI LIỆU
window.moKhungXem = function (link, tenTaiLieu) {

    const viewer = document.getElementById("educationViewer");
    const frame = document.getElementById("educationViewerFrame");
    const title = document.getElementById("educationViewerTitle");
    const openLink = document.getElementById("educationOpenNewTab");

    if (!viewer || !frame) {
        alert("Không tìm thấy khung xem tài liệu!");
        return;
    }

    try {
        const url = new URL(link);

        if (!["http:", "https:"].includes(url.protocol)) {
            alert("Đường dẫn tài liệu không hợp lệ!");
            return;
        }

        frame.src = url.href;
        openLink.href = url.href;

        title.textContent = "📖 " + tenTaiLieu;

        viewer.style.display = "block";

        viewer.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (error) {
        alert("Đường dẫn tài liệu không hợp lệ!");
    }
};


// ĐÓNG KHUNG XEM
window.dongKhungXem = function () {

    const viewer = document.getElementById("educationViewer");
    const frame = document.getElementById("educationViewerFrame");

    if (viewer) {
        viewer.style.display = "none";
    }

    if (frame) {
        frame.src = "about:blank";
    }
};
})();
