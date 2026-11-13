
"use strict";

// ======================================
// BBB11 - KẾT NỐI SUPABASE
// ĐẠI ĐỘI 11
// ======================================

// 1. THÔNG TIN KẾT NỐI
const SUPABASE_URL =
    "https://etbczslniaqsivyogdpw.supabase.co";

// Chỉ sử dụng Publishable Key
// Lấy tại Supabase → Project Settings → API Keys
const SUPABASE_ANON_KEY =
    "sb_publishable_dWdnGOcGfzXYTzGzl2AATA_tvHpg8aH";

// ======================================
// 2. KIỂM TRA THƯ VIỆN
// ======================================

if (!window.supabase) {
    throw new Error(
        "BBB11: Chưa tải được thư viện Supabase!"
    );
}

// ======================================
// 3. KIỂM TRA CẤU HÌNH
// ======================================

if (
    !SUPABASE_URL.startsWith("https://") ||
    SUPABASE_ANON_KEY.includes("DAN_SB_")
) {
    throw new Error(
        "BBB11: Vui lòng kiểm tra SUPABASE_URL và API KEY!"
    );
}

// ======================================
// 4. KHỞI TẠO SUPABASE CLIENT
// ======================================

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
            storage: window.localStorage
        },
        global: {
            headers: {
                "X-Client-Info": "BBB11-DaiDoi11"
            }
        }
    }
);

// ======================================
// 5. KIỂM TRA KẾT NỐI
// ======================================

console.log(
    "BBB11: Supabase Client đã khởi tạo thành công!"
);



