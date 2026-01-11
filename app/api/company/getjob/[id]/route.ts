import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            companyName: true,
            verified: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(job, { status: 200 });

  } catch (error) {
    console.error("Get job error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
