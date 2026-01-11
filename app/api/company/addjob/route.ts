import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST=async (request:NextRequest,_respose:NextResponse)=>{
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

        const company = await prisma.company.findUnique({
  where: { userId }
});
if (!company) {
  return NextResponse.json(
    { message: "Company profile not found" },
    { status: 404 }
  );
}
        const body = await request.json();
        const { title, description, durationWeeks,payAmount,skillsRequired} = body;
        if(!userId){
            return NextResponse.json(
                { message: `Unauthorized`  },
                { status: 401 }
            );
        }
        if(!title || !description || !durationWeeks || !payAmount || !skillsRequired){
            return NextResponse.json(
                { message: `Missing required fields`  },
                { status: 400 }
            );
        }
        const job=await prisma.job.create({
            data:{
                title,
                description,
                durationWeeks,
                payAmount,
                skillsRequired,
                companyId:company.id
            }
        })

        return NextResponse.json(
            { message: job },
            { status: 201 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: `Internal server error ${error}`  },
            { status: 500 }
        );
    }
}