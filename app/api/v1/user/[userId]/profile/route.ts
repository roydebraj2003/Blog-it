import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateUserDetailsSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),

    bio: z.string().max(160, "Bio must be at most 160 characters").optional(),

    image: z.string(),
  })
  .partial();

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = params.userId;
  if (!userId) {
    return NextResponse.json(
      {
        message: "User ID is required",
        user: null,
      },
      {
        status: 400,
      }
    );
  }
  try {
    const userDetails = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: {
          include : {
            comments: true,
            votes: true
          }
        },
        comments: true,
      },
    });

    if (!userDetails) {
      return NextResponse.json(
        {
          message: "Unable to fetch user details",
          user: null,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { message: "User details fetched successfully", user: userDetails },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch user details",
        user: null,
      },
      {
        status: 400,
      }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);
  const userId = params.userId;

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (session.user.id !== userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = CreateUserDetailsSchema.safeParse(body);

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: {
          name: tree.properties?.name?.errors,
          username: tree.properties?.username?.errors,
          bio: tree.properties?.bio?.errors,
          image: tree.properties?.image?.errors,
        },
      },
      {
        status: 400,
      }
    );
  }

  const { name, username, bio, image } = parsed.data;

  try {
    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(username && { username }),
        ...(bio && { bio }),
        ...(image && { image }),
      },
    });

    return NextResponse.json(
      {
        message: "User edited successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update user details", error);
    return NextResponse.json(
      {
        message: "Failed to update user details",
        user: null,
      },
      { status: 500 }
    );
  }
}
