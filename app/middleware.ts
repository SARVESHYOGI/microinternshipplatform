import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: "ADMIN" | "COMPANY" | "STUDENT";
    };

    const pathname = request.nextUrl.pathname;

    if (decoded.role === "ADMIN") {
      return NextResponse.next();
    }

    if (decoded.role === "COMPANY") {
      if (pathname.startsWith("/company")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (decoded.role === "STUDENT") {
      if (pathname.startsWith("/student")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.redirect(new URL("/login", request.url));
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/company/:path*",
    "/student/:path*",
  ],
};
