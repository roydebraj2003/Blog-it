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
  try {
    if (!session?.user) {
        return NextResponse.json({
          message: "User unauthorized",
          status: 401,
        });
      }
    const existingVote = await prismaClient.vote.findUnique({
        where: {
            userId_postId: {
                userId: session?.user.id as string,
                postId
            }
        }
    })

    if (!existingVote) {
        await prismaClient.vote.create({
          data: {
            userId: session.user.id,
            postId,
            type: "DOWN",
          },
        });
        return NextResponse.json({ message: "Post upvoted" });
      }

      if(existingVote.type === 'DOWN') {
        await prismaClient.vote.delete({
            where: {
                userId_postId: {
                    userId: session.user.id,
                    postId
                }
            }
        })
        return NextResponse.json({ message: "Upvote deleted"})
      }

      if(existingVote.type === 'UP') {
        await prismaClient.vote.update({
            where: {
                userId_postId: {
                    userId: session.user.id,
                    postId
                }
            },
            data: {
                type: 'DOWN'
            }
        })
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
