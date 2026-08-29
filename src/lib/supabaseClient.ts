import { createClient } from "@supabase/supabase-js";

const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const anonKey =
  (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined) ||
  (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined);

export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured) {
  console.error(
    "Supabase configuration is missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.",
  );
}

export const supabase = createClient(
  url || "https://missing-supabase-config.invalid",
  anonKey || "missing-supabase-anon-key",
);
