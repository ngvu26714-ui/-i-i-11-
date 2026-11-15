
"use strict";

// ============================================
// BBB11 - NHẬP / CẬP NHẬT DANH SÁCH THÀNH VIÊN
// ============================================

(function () {
const TEN_BANG = "bbb11_members";

function layClient() {
return window.supabaseClient || null;
}

function hienThiTrangThai(noiDung, loi = false) {
const el = document.getElementById("trangThaiNhapThanhVien");

if (el) {
el.textContent = noiDung;
el.style.color = loi ? "#b91c1c" : "#166534";
} else {
console.log(noiDung);
}
}

function chuanHoa(value) {
return String(value ?? "").trim();
}

function chuanHoaCot(value) {
return chuanHoa(value)
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "")
.replace(/đ/g, "d")
.replace(/Đ/g, "D")
.toLowerCase()
.replace(/[^a-z0-9]/g, "");
}

function layGiaTri(row, cacCot) {
const keys = Object.keys(row);

for (const cot of cacCot) {
const key = keys.find(
k => chuanHoaCot(k) === chuanHoaCot(cot)
);

if (key !== undefined) {
return row[key];
}
}

return "";
}

async function kiemTraQuyen() {
if (
typeof window.kiemTraQuyenThanhVienBBB11 !== "function"
) {
throw new Error(
"Không tìm thấy hàm kiểm tra quyền. " +
"Hãy kiểm tra file thanhvien.js hoặc account.js."
);
}

const ketQua =
await window.kiemTraQuyenThanhVienBBB11();

if (typeof ketQua === "boolean") {
return ketQua;
}

if (
ketQua &&
typeof ketQua.coQuyen === "boolean"
) {
return ketQua.coQuyen;
}

return false;
}

function docExcel(file) {
return new Promise((resolve, reject) => {
if (!window.XLSX) {
reject(
new Error("Chưa tải thư viện Excel XLSX.")
);
return;
}

const reader = new FileReader();

reader.onload = function (event) {
try {
const workbook = XLSX.read(
new Uint8Array(event.target.result),
{ type: "array" }
);

const tenSheet = workbook.SheetNames[0];

if (!tenSheet) {
throw new Error(
"File Excel không có trang tính."
);
}

const rows = XLSX.utils.sheet_to_json(
workbook.Sheets[tenSheet],
{ defval: "", raw: false }
);

resolve(rows);
} catch (error) {
reject(error);
}
};

reader.onerror = function () {
reject(new Error("Không thể đọc file Excel."));
};

reader.readAsArrayBuffer(file);
});
}

async function capNhatDanhSachThanhVienTuFile() {
const input = document.getElementById(
"fileDanhSachThanhVien"
);

const file = input?.files?.[0];

if (!file) {
hienThiTrangThai(
"Vui lòng chọn file Excel.",
true
);
return;
}

if (!/\.(xlsx|xls)$/i.test(file.name)) {
hienThiTrangThai(
"Chỉ chấp nhận file .xlsx hoặc .xls.",
true
);
return;
}

const client = layClient();

if (!client) {
hienThiTrangThai(
"Không tìm thấy Supabase client. Kiểm tra supabase.js.",
true
);
return;
}

const nut = document.getElementById(
"nutNhapDanhSachThanhVien"
);

if (nut) nut.disabled = true;

try {
hienThiTrangThai("Đang kiểm tra quyền...");

if (!(await kiemTraQuyen())) {
throw new Error(
"Bạn không có quyền nhập danh sách thành viên."
);
}

hienThiTrangThai("Đang đọc file Excel...");

const rows = await docExcel(file);

if (!rows.length) {
throw new Error("File Excel không có dữ liệu.");
}

const danhSach = [];
const maSoDaGap = new Set();
const dongLoi = [];

rows.forEach((row, index) => {
const maSo = chuanHoa(layGiaTri(row, [
"ma_so", "ma so", "Mã số", "MS"
]));

const hoTen = chuanHoa(layGiaTri(row, [
"ho_ten", "ho ten", "Họ tên",
"Họ và tên", "Tên thành viên"
]));

const tieuDoi = chuanHoa(layGiaTri(row, [
"tieu_doi", "tieu doi", "Tiểu đội"
]));

const chucVu = chuanHoa(layGiaTri(row, [
"chuc_vu", "chuc vu", "Chức vụ"
]));

if (!maSo && !hoTen && !tieuDoi && !chucVu) {
return;
}

if (!maSo || !hoTen || !tieuDoi) {
dongLoi.push(index + 2);
return;
}

const khoa = maSo.toLowerCase();

if (maSoDaGap.has(khoa)) {
dongLoi.push(index + 2);
return;
}

maSoDaGap.add(khoa);

danhSach.push({
ma_so: maSo,
ho_ten: hoTen,
tieu_doi: tieuDoi,
chuc_vu: chucVu
});
});

if (!danhSach.length) {
throw new Error(
"Không có dòng hợp lệ. Cần các cột " +
"Mã số, Họ tên, Tiểu đội."
);
}

let themMoi = 0;
let capNhat = 0;
const loiLuu = [];

for (const tv of danhSach) {
try {
const { data: thanhVienCu, error: loiTim } =
await client
.from(TEN_BANG)
.select("id, ma_so")
.eq("ma_so", tv.ma_so)
.maybeSingle();

if (loiTim) throw loiTim;

if (thanhVienCu) {
const { error } = await client
.from(TEN_BANG)
.update({
ho_ten: tv.ho_ten,
tieu_doi: tv.tieu_doi,
chuc_vu: tv.chuc_vu
})
.eq("id", thanhVienCu.id);

if (error) throw error;

capNhat++;
} else {
const { error } = await client
.from(TEN_BANG)
.insert({
ma_so: tv.ma_so,
ho_ten: tv.ho_ten,
tieu_doi: tv.tieu_doi,
chuc_vu: tv.chuc_vu,
vai_tro: "member",
trang_thai: "active"
});

if (error) throw error;

themMoi++;
}
} catch (error) {
loiLuu.push(
tv.ma_so + ": " + error.message
);
}
}

if (typeof window.hienThiThanhVien === "function") {
await window.hienThiThanhVien();
}

let thongBao =
"Hoàn tất! Thêm mới: " + themMoi +
"; cập nhật: " + capNhat + ".";

if (dongLoi.length) {
thongBao +=
" Bỏ qua dòng lỗi/trùng: " +
dongLoi.join(", ") + ".";
}

if (loiLuu.length) {
console.error("Lỗi lưu thành viên:", loiLuu);

thongBao +=
" Có " + loiLuu.length +
" thành viên chưa lưu được. Xem Console (F12).";
}

hienThiTrangThai(
thongBao,
loiLuu.length > 0
);

} catch (error) {
console.error("Lỗi nhập Excel:", error);

hienThiTrangThai(
error.message || "Không thể nhập file Excel.",
true
);
} finally {
if (nut) nut.disabled = false;
}
}

window.capNhatDanhSachThanhVienTuFile =
capNhatDanhSachThanhVienTuFile;
})();

