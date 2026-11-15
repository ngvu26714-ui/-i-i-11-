"use strict";

// ============================================
// KIỂM TRA QUYỀN QUẢN LÝ THÀNH VIÊN BBB11
// ============================================

function duocQuanLyThanhVienBBB11() {
    const nguoiDung = window.bbb11CurrentUser || {};

    const vaiTro = String(
        window.bbb11CurrentRole ||
        nguoiDung.vai_tro ||
        nguoiDung.role ||
        ""
    )
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
console.log("Vai trò hiện tại:", vaiTro);
    const vaiTroDuocPhep = [
        "admin",
        "đại đội trưởng",
        "phó đại đội trưởng",
        "pho đại đội trưởng",
        "trung đội trưởng",
        "dai_doi_truong",
        "pho_dai_doi_truong",
        "trung_doi_truong"
    ];

    return vaiTroDuocPhep.includes(vaiTro);
}
// ============================================
// TRANG QUẢN LÝ THÀNH VIÊN BBB11
// ============================================

window.membersPage = function membersPage() {
    if (!duocQuanLyThanhVienBBB11()) {
        return `
            <div class="page-box">
                <h2>Không có quyền truy cập</h2>
                <p>Bạn không được phép quản lý thành viên.</p>
            </div>
        `;
    }

    return `
        <div class="page-box">
            <h2>QUẢN LÝ THÀNH VIÊN BBB11</h2>
            <div id="danhSachThanhVienBBB11">
                Danh sách thành viên sẽ hiển thị tại đây.
            </div>
        </div>
    `;
};
// ============================================
// TRANG QUẢN LÝ THÀNH VIÊN BBB11
// ============================================

function membersPage() {
    if (!duocQuanLyThanhVienBBB11()) {
        return `
            <div class="page-box">
                <h2>Không có quyền truy cập</h2>
                <p>Tài khoản của bạn không được phép quản lý thành viên.</p>
            </div>
        `;
    }

    return `
        <div class="page-box">
            <h2>QUẢN LÝ THÀNH VIÊN BBB11</h2>

            <div id="danhSachThanhVienBBB11">
                Đang tải danh sách thành viên...
            </div>
        </div>
    `;
}
