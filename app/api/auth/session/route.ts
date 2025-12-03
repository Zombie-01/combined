import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

function parseCookie(header: string | null, name: string) {
  if (!header) return null;
  const pairs = header.split(";").map((p) => p.trim());
  for (const p of pairs) {
    if (p.startsWith(name + "="))
      return decodeURIComponent(p.split("=")[1] || "");
  }
  return null;
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const token = parseCookie(cookieHeader, "sb-access-token");

    if (token) {
      const { data, error } = await supabaseAdmin.auth.getUser(token as any);
      if (error) return NextResponse.json({ session: null, profile: null });
      const user = data?.user ?? null;
      if (!user) return NextResponse.json({ session: null, profile: null });
      const { data: profile } = await supabaseAdmin
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      return NextResponse.json({ session: { user }, profile: profile ?? null });
    }

    const authHeader = req.headers.get("authorization") || "";
    if (authHeader.startsWith("Bearer ")) {
      const token2 = authHeader.replace("Bearer ", "");
      const { data, error } = await supabaseAdmin.auth.getUser(token2 as any);
      if (error) return NextResponse.json({ session: null, profile: null });
      const user = data?.user ?? null;
      if (!user) return NextResponse.json({ session: null, profile: null });
      const { data: profile } = await supabaseAdmin
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      return NextResponse.json({ session: { user }, profile: profile ?? null });
    }

    return NextResponse.json({ session: null, profile: null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ session: null, profile: null });
  }
}
