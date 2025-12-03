import { supabase } from '@/lib/supabase/client';

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === 'admin' || false;
}
