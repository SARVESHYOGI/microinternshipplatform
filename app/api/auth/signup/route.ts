import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignupSchema } from "@/lib/schema/SignupSchema.zod";
import { UserRole } from "@/generated/prisma/enums";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const result = SignupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password, role } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        ...(role === UserRole.STUDENT && {
          studentProfile: {
            create: {
              skills: [],
            },
          },
        }),
        ...(role === UserRole.COMPANY && {
          company: {
            create: {
              companyName: name,
            },
          },
        }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "Signup successful", user },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
