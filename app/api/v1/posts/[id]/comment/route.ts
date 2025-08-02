import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prismaClient } from "@/app/lib/db";

const CreateCommentSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, { message: "Comment cannot be empty" })
    .max(500, {
      message: "Too long for a comment (must be under 500 characters)",
    }),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized", comment: null }, { status: 401 });
  }

  const parsed = CreateCommentSchema.safeParse(await req.json());
  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return NextResponse.json({
      message: "Validation failed",
      errors: {
        body: tree.properties?.body?.errors
      }
    }, {
      status: 400
    })
  }
  const postId = params.id;

  try {
    const comment = await prismaClient.comment.create({
      data: {
        body: parsed.data.body,
        userId: session.user.id,
        postId: postId,
      },
    });

    return NextResponse.json(
      { message: "Comment created", comment },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create comment", comment: null },
      { status: 500 }
    );
  }
}
