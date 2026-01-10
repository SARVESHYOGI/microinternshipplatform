import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  console.log("MIDDLEWARE HIT:", pathname);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("JWT PAYLOAD:", payload);

    const role = (payload.role as string).toUpperCase();

    if (pathname.startsWith("/admin")) {
      if (role === "ADMIN") return NextResponse.next();
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/company")) {
      if (role === "COMPANY") return NextResponse.next();
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/student")) {
      if (role === "STUDENT") return NextResponse.next();
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.redirect(new URL("/login", request.url));
  } catch (err) {
    console.error("JWT verification error:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/company/:path*", "/student/:path*"],
};
