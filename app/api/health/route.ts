import { NextResponse } from "next/server";

export const GET = () => {
    return new NextResponse("OK", { status: 200 });
}