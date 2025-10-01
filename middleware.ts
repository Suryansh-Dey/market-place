import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ["/", "/auth/signin", "/market", "/api/plans"];
  if (publicRoutes.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Require auth for everything else
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Role-based protection
  if (pathname.startsWith("/vendor")) {
    if (token.role !== "vendor") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (pathname.startsWith("/admin")) {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Match all routes except:
      - those starting with _next/ (Next.js internals)
      - those containing a dot (static files)
    */
    "/((?!_next/|.*\\..*).*)"
  ],
};


