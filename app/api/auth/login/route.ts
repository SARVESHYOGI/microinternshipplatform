import { NextRequest,NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SigninSchema } from "@/lib/schema/SigninSchema.zod";


export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();

        const result = SigninSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { message: "Invalid input", errors: result.error.flatten() },
                { status: 400 }
            );
        }

        const { email, password } = result.data;
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        const response = NextResponse.json(
            {
                message: "Login successful",
                user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                },
            },
            { status: 200 }
        );
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, 
            path: "/",
        });
        return response;
    } catch (error) {
        console.log("error in login: ", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}