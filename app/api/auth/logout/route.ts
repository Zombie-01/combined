import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: Request) {
  try {
    // Try to sign out via anon client (best-effort). Clear server cookie.
    await supabase.auth.signOut();
    const res = NextResponse.json({ success: true });
    res.cookies.set('sb-access-token', '', { httpOnly: true, path: '/', maxAge: 0 });
    return res;
  } catch (err) {
    console.error(err);
    const res = new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500 });
    return res;
  }
}
