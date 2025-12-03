import { cookies } from 'next/headers';
import { supabaseAdmin } from '../supabase/server';

function parseCookieHeader(header: string | null, name: string) {
  if (!header) return null;
  const pairs = header.split(';').map((p) => p.trim());
  for (const p of pairs) {
    if (p.startsWith(name + '=')) return decodeURIComponent(p.split('=')[1] || '');
  }
  return null;
}

export async function getSession(req?: Request | null) {
  // Try to read sb-access-token from provided Request or from next/headers (server)
  let token: string | null = null;

  if (req && 'headers' in req) {
    const header = (req as Request).headers.get('cookie');
    token = parseCookieHeader(header, 'sb-access-token');
  } else {
    try {
      const c = cookies();
      const cookie = c.get('sb-access-token');
      token = cookie?.value ?? null;
    } catch (err) {
      // Not running in server environment that provides next/headers
      token = null;
    }
  }

  if (!token) return null;

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token as any);
    if (error) return null;
    const user = data?.user ?? null;
    if (!user) return null;
    return { user, access_token: token };
  } catch (err) {
    console.error('getSession error', err);
    return null;
  }
}

export async function getCurrentUser(req?: Request | null) {
  const session = await getSession(req);
  if (!session) return null;

  try {
    const { data: profile, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();

    if (error || !profile) return null;
    return profile;
  } catch (err) {
    console.error('getCurrentUser error', err);
    return null;
  }
}

export async function isAdmin(req?: Request | null) {
  const user = await getCurrentUser(req);
  return user?.role === 'admin' || false;
}
