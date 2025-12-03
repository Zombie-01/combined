import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Redirect unauthenticated requests under /admin to /admin/login
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin paths
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Allow login page and public assets
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Check cookie set by login route
  const token = req.cookies.get("sb-access-token")?.value || null;
  const authHeader = req.headers.get("authorization") || "";

  if (token || authHeader.startsWith("Bearer ")) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to login
  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
