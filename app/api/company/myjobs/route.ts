import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, _response: NextResponse) => {
    try {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        const payload = await verifyAuth(token);
        const userId = payload.userId as string;

        const jobs = await prisma.job.findMany({
            where: {
                company: {
                    userId: userId
                }
            }
        });
        return NextResponse.json(
            { jobs },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: `Internal server error ${error}`  },
            { status: 500 }
        );
    }
}