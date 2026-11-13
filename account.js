
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
        .select("id, email, role")
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

        const profile = await layHoSoBBB11(data.user.id);

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

    sessionStorage.removeItem("bbb11_login");

    location.reload();
}

// ======================================
// KIỂM TRA PHIÊN
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

        const profile = await layHoSoBBB11(
            data.session.user.id
        );

        bbb11CurrentUser = data.session.user;
        bbb11CurrentRole = profile.role;

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
    }
}

// ======================================
// KHỞI ĐỘNG
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    khoiTaoDangNhapBBB11().catch(error => {
        console.error("BBB11 INIT ERROR:", error);
    });

});
