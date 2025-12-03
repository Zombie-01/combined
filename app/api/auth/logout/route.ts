import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Clear server-side cookie storing Supabase access token
    const res = NextResponse.json({ success: true });
    res.cookies.set('sb-access-token', '', { httpOnly: true, path: '/', maxAge: 0 });
    return res;
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500 });
  }
}
