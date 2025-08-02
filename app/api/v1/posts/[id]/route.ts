import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await getServerSession(authOptions);
  const postId = params.postId;
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        post: null,
      },
      {
        status: 401,
      }
    );
  }
  if (!postId) {
    return NextResponse.json(
      {
        message: "Post ID is required",
        post: null,
      },
      {
        status: 400,
      }
    );
  }
  try {
    const postData = await prismaClient.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        comments: {
          include: {
            votes: true,
          },
        },
        votes: true,
      },
    });
    if (!postData) {
      return NextResponse.json(
        {
          message: "Cannot find post with the post ID",
          post: null,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Post fetched successfully",
        post: postData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Failed to fetch post", error);
    return NextResponse.json(
      {
        message: "Failed to fetch post",
        post: null,
      },
      {
        status: 400,
      }
    );
  }
}
