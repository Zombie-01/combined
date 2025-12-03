import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({
          error:
            "SUPABASE_SERVICE_ROLE_KEY is not configured on the server. Registration is disabled.",
          hint: "Set SUPABASE_SERVICE_ROLE_KEY in environment to enable server-side Supabase admin operations.",
        }),
        { status: 503 }
      );
    }

    // Create user using service role
    const createRes = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true,
    });

    if (createRes.error) {
      return new Response(JSON.stringify({ error: createRes.error.message }), {
        status: 400,
      });
    }

    const user = createRes.data.user;

    // Insert profile row into public.users table if desired
    if (user) {
      await supabaseAdmin
        .from("users")
        .insert({ id: user.id, email, name, role: "user" });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
    });
  }
}
