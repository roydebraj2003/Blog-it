import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const postId = params.id;

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const existingVote = await prismaClient.vote.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    if (!existingVote) {
      await prismaClient.vote.create({
        data: {
          userId: session.user.id,
          postId,
          type: "UP",
        },
      });

      await prismaClient.post.update({
        where: { id: postId },
        data: {
          upvotes: { increment: 1 },
          totalVotes: { increment: 1 },
        },
      });

      return NextResponse.json({ message: "Post upvoted" });
    }

    if (existingVote.type === "UP") {
      await prismaClient.vote.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
      });

      await prismaClient.post.update({
        where: { id: postId },
        data: {
          upvotes: { decrement: 1 },
          totalVotes: { decrement: 1 },
        },
      });

      return NextResponse.json({ message: "Upvote removed" });
    }

    if (existingVote.type === "DOWN") {
      await prismaClient.vote.update({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
        data: {
          type: "UP",
        },
      });

      await prismaClient.post.update({
        where: { id: postId },
        data: {
          upvotes: { increment: 1 },
          totalVotes: { increment: 1 },
        },
      });

      return NextResponse.json({ message: "Post upvoted" });
    }
  } catch (error) {
    console.error("Failed to upvote post:", error);
    return NextResponse.json(
      { message: "Failed to upvote post" },
      { status: 500 }
    );
  }
}
