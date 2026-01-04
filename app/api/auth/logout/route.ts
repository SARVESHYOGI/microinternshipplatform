import { NextResponse } from "next/server";

export const POST = () => {
  try {
    const response = NextResponse.json({ message: "Logged out" });
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
