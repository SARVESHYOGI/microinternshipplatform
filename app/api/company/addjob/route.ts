import { NextRequest, NextResponse } from "next/server";

export const POST=async (request:NextRequest,respose:NextResponse)=>{
    try {
        const body = await request.json();
        return NextResponse.json(
            { message: body },
            { status: 200 },
            
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: `Internal server error ${error}`  },
            { status: 500 }
        );
    }
}