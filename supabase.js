
"use strict";

// BBB11 - SUPABASE CONFIG

const SUPABASE_URL =
    "https://etbczslniaqsivyogdpw.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_dWdnGOcGfzXYTzGzl2AATA_tvHpg8aH";

if (!window.supabase) {
    throw new Error("Chưa tải được thư viện Supabase!");
}

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("BBB11: Supabase đã kết nối!");
