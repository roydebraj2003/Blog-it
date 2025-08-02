import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { filter: string; page: string } }
) {
  const session = await getServerSession(authOptions);
  const { filter, page } = params;
  const pageSize = 16;

  let orderBy;
  if (filter === "trending") {
    orderBy = { totalVotes: "desc" };
  } else if (filter === "recent") {
    orderBy = { createdAt: "desc" };
  } else {
    return NextResponse.json(
      {
        message: "Invalid filter option",
        posts: null,
      },
      { status: 400 }
    );
  }

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const queryOptions: any = {
    orderBy,
    take: pageSize,
  };

  if (page !== "start") {
    queryOptions.cursor = { id: page };
    queryOptions.skip = 1;
  }

  try {
    const posts = await prismaClient.post.findMany(queryOptions);

    return NextResponse.json(
      {
        message: `${filter} posts fetched successfully`,
        posts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error while fetching ${filter} posts`, error);

    return NextResponse.json(
      {
        message: `Error while fetching ${filter} posts`,
        posts: null,
      },
      { status: 500 }
    );
  }
}
