
"use strict";

// BBB11 - QUẢN LÝ TÀI KHOẢN

async function kiemTraQuanTri() {
    const { data: { user }, error } =
        await supabaseClient.auth.getUser();

    if (error || !user) {
        throw new Error("Bạn cần đăng nhập!");
    }

    const { data: profile, error: profileError } =
        await supabaseClient
            .from("profiles")
            .select("vai_tro, trang_thai")
            .eq("id", user.id)
            .single();

    if (profileError || !profile ||
        profile.vai_tro !== "admin" ||
        profile.trang_thai !== "active") {
        throw new Error("Bạn không có quyền quản trị!");
    }

    return user;
}

// HIỂN THỊ TÀI KHOẢN

async function hienThiTaiKhoan() {
    const khung = document.getElementById("danhSachTaiKhoan");

    if (!khung) return;

    khung.innerHTML = "Đang tải dữ liệu...";

    try {
        await kiemTraQuanTri();

        const { data, error } = await supabaseClient
            .from("profiles")
            .select("id, ho_ten, ma_so, vai_tro, trang_thai, created_at")
            .order("created_at", { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            khung.innerHTML = "<p>Chưa có tài khoản nào.</p>";
            return;
        }

        khung.innerHTML = data.map(tk => `
            <div class="list-item">
                <h3>${escapeHTML(tk.ho_ten)}</h3>

                <p>Mã số: ${escapeHTML(tk.ma_so || "")}</p>

                <p>Vai trò:
                    ${tk.vai_tro === "admin"
                        ? "Quản trị viên"
                        : "Thành viên"}
                </p>

                <p>Trạng thái:
                    ${tk.trang_thai === "active"
                        ? "Đang hoạt động"
                        : "Đã khóa"}
                </p>
            </div>
        `).join("");

    } catch (error) {
        khung.innerHTML =
            `<p>${escapeHTML(error.message)}</p>`;
    }
}

// TẠO HỒ SƠ TÀI KHOẢN
// Chỉ tạo hồ sơ cho UID đã được xác thực.
// Không tự tạo quyền admin từ trình duyệt.

async function taoHoSoTaiKhoan(id, hoTen, maSo) {
    await kiemTraQuanTri();

    if (!id || !hoTen.trim()) {
        throw new Error("Thiếu thông tin tài khoản!");
    }

    const { error } = await supabaseClient
        .from("profiles")
        .insert({
            id: id,
            ho_ten: hoTen.trim(),
            ma_so: maSo.trim() || null,
            vai_tro: "member",
            trang_thai: "active"
        });

    if (error) throw error;

    return true;
}

console.log("BBB11: Đã tải module quản lý tài khoản!");

