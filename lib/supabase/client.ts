import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("[Supabase] 환경변수 미설정 — mock 데이터로 동작합니다.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
