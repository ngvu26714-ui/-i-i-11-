"use strict";

// BBB11 - KẾT NỐI SUPABASE

const SUPABASE_URL = "URL_DU_AN_CUA_BAN";
const SUPABASE_ANON_KEY = "ANON_KEY_CUA_BAN";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("BBB11: Kết nối Supabase thành công!");
