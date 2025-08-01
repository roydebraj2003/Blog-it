import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import NextAuth, { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const CreatePostSchema = z.object({
  title: z
    .string()
    .max(100, { message: "Maximum size of title is 100 character" })
    .min(1, { message: "Title cannot be empty" }),
  description: z
    .string()
    .max(150, { message: "Description should be below 150 characters" }),
  body: z
    .string()
    .max(10000, {
      message: "Post body is too long (must be under 10000 characters)",
    }),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({
      message: "User unauthorized!",
      status: 401,
    });
  }
  const parsed = CreatePostSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.format() },
      { status: 400 }
    );
  }
  try {
    await prismaClient.post.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        body: parsed.data.body,
        userId: session?.user.id as string,
      },
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error in creating a post",
      status: 500,
    });
  }
}
