
"use strict";

// ======================================
// BBB11 - SUPABASE AUTHENTICATION
// ADMIN & CHIEN SI
// ======================================

let bbb11CurrentUser = null;
let bbb11CurrentRole = null;

// Các trang chỉ ADMIN được sử dụng
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
// 1. HIỂN THỊ GIAO DIỆN
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
        userName.textContent =
            ten + " (" + profile.role.toUpperCase() + ")";
    }

    if (welcomeName) welcomeName.textContent = ten;

    // Lưu trạng thái giao diện
    sessionStorage.setItem("bbb11_login", JSON.stringify({
        id: profile.id,
        ten: ten,
        email: profile.email,
        role: profile.role
    }));

    // Ẩn chức năng quản trị đối với chiến sĩ
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
// 2. ĐĂNG NHẬP
// ======================================

async function dangNhap() {

    const email = document
        .getElementById("loginEmail")
        ?.value.trim().toLowerCase();

    const password = document
        .getElementById("loginPassword")
        ?.value;

    if (!email || !password) {
        alert("Vui lòng nhập Email và mật khẩu!");
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

        // Lấy quyền từ bảng profiles
        const { data: profile, error: profileError } =
            await supabaseClient
                .from("profiles")
                .select("id, email, role")
                .eq("id", data.user.id)
                .single();

        if (profileError || !profile) {

            await supabaseClient.auth.signOut();

            alert("Không tìm thấy hồ sơ hoặc quyền truy cập!");

            return;
        }

        if (!["admin", "chien_si"].includes(profile.role)) {

            await supabaseClient.auth.signOut();

            alert("Tài khoản không có quyền sử dụng BBB11!");

            return;
        }

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

        console.error("BBB11 Login Error:", error);

        alert("Lỗi kết nối: " + error.message);
    }
}

// ======================================
// 3. ĐĂNG XUẤT
// ======================================

async function logout() {

    const confirmLogout = confirm(
        "Bạn có chắc chắn muốn đăng xuất BBB11?"
    );

    if (!confirmLogout) return;

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert("Không thể đăng xuất: " + error.message);
        return;
    }

    bbb11CurrentUser = null;
    bbb11CurrentRole = null;

    sessionStorage.removeItem("bbb11_login");

    location.reload();
}

// ======================================
// 4. KIỂM TRA PHIÊN ĐĂNG NHẬP
// ======================================

async function khoiTaoDangNhapBBB11() {

    const loginPage = document.getElementById("loginPage");
    const app = document.querySelector(".app");

    if (loginPage) loginPage.classList.remove("hidden");
    if (app) app.classList.add("hidden");

    const { data, error } =
        await supabaseClient.auth.getSession();

    if (error) {
        console.error(error);
        return;
    }

    const session = data.session;

    if (!session) return;

    const { data: profile, error: profileError } =
        await supabaseClient
            .from("profiles")
            .select("id, email, role")
            .eq("id", session.user.id)
            .single();

    if (profileError || !profile ||
        !["admin", "chien_si"].includes(profile.role)) {

        await supabaseClient.auth.signOut();
        return;
    }

    bbb11CurrentUser = session.user;
    bbb11CurrentRole = profile.role;

    hienThiGiaoDienDaDangNhap(profile);

    showHome();
}

// ======================================
// 5. KHỞI ĐỘNG BBB11
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    khoiTaoDangNhapBBB11().catch(error => {
        console.error("Lỗi khởi động BBB11:", error);
    });

});

