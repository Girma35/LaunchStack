import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PATHS = ["/dashboard"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    const sessionCookie = request.cookies.get("better-auth.session_token");
    if (!sessionCookie?.value) {
      const url = new URL("/auth/signin", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
