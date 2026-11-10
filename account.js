
"use strict";

// BBB11 - QUẢN LÝ TÀI KHOẢN
// Yêu cầu đã cấu hình Supabase Auth.

const BBB11Account = {
    client: null,

    async init(supabaseClient) {
        this.client = supabaseClient;

        if (!this.client) {
            throw new Error("Chưa kết nối Supabase!");
        }
    },

    async getAdmin() {
        const { data: { user }, error } =
            await this.client.auth.getUser();

        if (error || !user) {
            throw new Error("Bạn chưa đăng nhập!");
        }

        const { data, error: profileError } =
            await this.client
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

        if (profileError || !data ||
            data.vai_tro !== "admin" ||
            data.trang_thai !== "active") {
            throw new Error("Bạn không có quyền quản trị!");
        }

        return user;
    },

    async danhSach() {
        await this.getAdmin();

        const { data, error } = await this.client
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        return data || [];
    },

    async taoProfile(id, hoTen, maSo, vaiTro) {
        await this.getAdmin();

        if (!["admin", "member"].includes(vaiTro)) {
            throw new Error("Vai trò không hợp lệ!");
        }

        const { error } = await this.client
            .from("profiles")
            .insert({
                id,
                ho_ten: hoTen,
                ma_so: maSo || null,
                vai_tro: vaiTro,
                trang_thai: "active"
            });

        if (error) throw error;
    },

    async doiTrangThai(id, trangThai) {
        await this.getAdmin();

        if (!["active", "locked"].includes(trangThai)) {
            throw new Error("Trạng thái không hợp lệ!");
        }

        const { data: { user } } =
            await this.client.auth.getUser();

        if (user.id === id) {
            throw new Error("Không thể tự khóa tài khoản đang sử dụng!");
        }

        const { error } = await this.client
            .from("profiles")
            .update({ trang_thai: trangThai })
            .eq("id", id);

        if (error) throw error;
    },

    async doiVaiTro(id, vaiTro) {
        await this.getAdmin();

        if (!["admin", "member"].includes(vaiTro)) {
            throw new Error("Vai trò không hợp lệ!");
        }

        const { data: { user } } =
            await this.client.auth.getUser();

        if (user.id === id) {
            throw new Error("Không thể tự thay đổi quyền của mình!");
        }

        const { error } = await this.client
            .from("profiles")
            .update({ vai_tro: vaiTro })
            .eq("id", id);

        if (error) throw error;
    }
};

// HIỂN THỊ DANH SÁCH

async function hienThiTaiKhoan() {
    const container =
        document.getElementById("danhSachTaiKhoan");

    if (!container) return;

    container.innerHTML = "Đang tải dữ liệu...";

    try {
        const danhSach = await BBB11Account.danhSach();

        if (!danhSach.length) {
            container.innerHTML = "<p>Chưa có tài khoản.</p>";
            return;
        }

        container.innerHTML = danhSach.map(tk => `
            <div class="list-item">
                <h3>${escapeHTML(tk.ho_ten)}</h3>
                <p>Mã số: ${escapeHTML(tk.ma_so || "")}</p>
                <p>Quyền: ${
                    tk.vai_tro === "admin"
                    ? "Quản trị viên"
                    : "Thành viên"
                }</p>
                <p>Trạng thái: ${
                    tk.trang_thai === "active"
                    ? "Đang hoạt động"
                    : "Đã khóa"
                }</p>

                <button class="action-button"
                    onclick="capNhatTrangThaiTaiKhoan(
                        '${escapeHTML(tk.id)}',
                        '${tk.trang_thai === "active" ? "locked" : "active"}'
                    )">
                    ${tk.trang_thai === "active"
                        ? "Khóa tài khoản"
                        : "Mở khóa"}
                </button>
            </div>
        `).join("");

    } catch (error) {
        container.innerHTML =
            `<p>${escapeHTML(error.message)}</p>`;
    }
}

async function capNhatTrangThaiTaiKhoan(id, trangThai) {
    if (!confirm("Bạn có chắc muốn thực hiện thao tác này?")) return;

    try {
        await BBB11Account.doiTrangThai(id, trangThai);
        alert("Cập nhật tài khoản thành công!");
        await hienThiTaiKhoan();
    } catch (error) {
        alert(error.message);
    }
}
