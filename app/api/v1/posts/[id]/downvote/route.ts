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
          type: "DOWN",
        },
      });

      await prismaClient.post.update({
        where: { id: postId },
        data: {
          totalVotes: { increment: 1 },
        },
      });

      return NextResponse.json({ message: "Post downvoted" });
    }

    if (existingVote.type === "DOWN") {
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
          totalVotes: { decrement: 1 },
        },
      });

      return NextResponse.json({ message: "Downvote removed" });
    }

    if (existingVote.type === "UP") {
      await prismaClient.vote.update({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
        data: {
          type: "DOWN",
        },
      });

      await prismaClient.post.update({
        where: { id: postId },
        data: {
          upvotes: { decrement: 1 },
          totalVotes: { increment: 1 },
        },
      });

      return NextResponse.json({ message: "Post downvoted" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to downvote post" },
      { status: 500 }
    );
  }
}
