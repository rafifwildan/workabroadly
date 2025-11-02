// File: frontend/middleware.ts
// Next.js middleware untuk protect routes yang perlu authentication

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Daftar halaman yang perlu authentication
const protectedRoutes = [
  "/home",
  "/dashboard",
  "/profile",
  "/scenario",
  "/role-play",
  "/career-coach",
  "/progress",
  "/tokens",
  "/admin",
];

// Daftar halaman yang tidak boleh diakses kalau sudah login
const authRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ambil token dari cookie (untuk server-side check)
  const token = request.cookies.get("workabroadly_token")?.value;
  
  // Check jika user mengakses protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  
  // Check jika user mengakses auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  
  // RULE 1: Jika mengakses protected route tanpa token → redirect ke login
  if (isProtectedRoute && !token) {
    console.log(`🔒 Protected route accessed without token: ${pathname}`);
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
  
  // RULE 2: Jika sudah login tapi mengakses login/signup → redirect ke home
  if (isAuthRoute && token) {
    console.log(`✅ Auth route accessed with token: ${pathname} → redirecting to /home`);
    const url = new URL("/home", request.url);
    return NextResponse.redirect(url);
  }
  
  // Allow request to continue
  return NextResponse.next();
}

// Konfigurasi path mana saja yang akan diproses middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
