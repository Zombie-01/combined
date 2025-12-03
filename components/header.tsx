"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || null);
      } else {
        setIsAuthenticated(false);
        setUserEmail(null);
      }

      setLoading(false);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || null);
      } else {
        setIsAuthenticated(false);
        setUserEmail(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <header className="sticky top-0 z-100 border-b border-gray-200 bg-white py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-2xl font-semibold text-gray-900 transition-colors hover:text-blue-600">
          Unified Admin
        </Link>

        <nav className="flex items-center gap-8">
          {!loading && isAuthenticated && (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                Dashboard
              </Link>
              <Link
                href="/portfolio"
                className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                Portfolio
              </Link>
              <Link
                href="/travel"
                className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                Travel
              </Link>
              <Link
                href="/yoga"
                className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                Yoga
              </Link>
              <button
                onClick={handleLogout}
                className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200">
                Logout
              </button>
            </>
          )}

          {!loading && !isAuthenticated && (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-gray-600 transition-colors hover:text-blue-600">
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
