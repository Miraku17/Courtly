import { createClient } from "@supabase/supabase-js";

// Admin client uses service role key — server-only, never expose to browser.
// Used for admin operations like creating users.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
