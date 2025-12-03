import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing credentials" }), {
        status: 400,
      });
    }

    const result = await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 401,
      });
    }

    const session = result.data.session ?? null;
    const accessToken = session?.access_token ?? null;
    const maxAge = session?.expires_in ? Number(session.expires_in) : undefined;

    const res = NextResponse.json({ session });

    if (accessToken) {
      res.cookies.set("sb-access-token", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        ...(maxAge ? { maxAge } : {}),
      });
    }

    return res;
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
    });
  }
}
