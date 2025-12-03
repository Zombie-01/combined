import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  // Fail fast with a clear message when URL is missing
  throw new Error("Environment variable NEXT_PUBLIC_SUPABASE_URL is not set.");
}

// Create a defensive supabaseAdmin export that gives a helpful error when used
// if the service role key is not provided. This prevents cryptic build-time
// errors (like "supabaseKey is required") and gives a clear actionable message.
let _supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null;

if (supabaseServiceRoleKey) {
  _supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
} else {
  // Create a lightweight proxy that throws when any method is used.
  const handler = {
    get() {
      throw new Error(
        "SUPABASE_SERVICE_ROLE_KEY is not set. Set SUPABASE_SERVICE_ROLE_KEY in environment to enable server-side Supabase admin operations."
      );
    },
  } as any;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - provide a proxy for the Supabase client shape
  _supabaseAdmin = new Proxy({}, handler);
}

export const supabaseAdmin = _supabaseAdmin as unknown as ReturnType<
  typeof createClient<Database>
>;
