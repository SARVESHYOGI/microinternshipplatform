"use server";
import { prisma } from "@/lib/prisma"; 

export async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      studentProfile: {
        select: {
        //   id: true,
        userId: true,
        },
      },
      company: {
        select: {
          id: true,
        //   name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
