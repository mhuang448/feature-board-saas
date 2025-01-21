import { NextResponse } from "next/server";
import Post from "@/models/Post";
import User from "@/models/User";
import { auth } from "@/auth";
import { Filter } from "bad-words";

export async function POST(req) {
  try {
    const { title, description } = await req.json();

    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    const badWordsFilter = new Filter();
    const sanitizedTitle = badWordsFilter.clean(title);
    const sanitizedDescription = badWordsFilter.clean(description);

    if (!sanitizedTitle) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const session = await auth();
    const userId = session?.user?.id;

    const post = await Post.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      boardId,
      userId,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  const session = await auth();
  const userId = session?.user?.id;

  const user = await User.findById(userId);

  // check if user has paid for subscription
  if (!user.hasAccess) {
    return NextResponse.json(
      { error: "Please subscribe to access this feature" },
      { status: 403 }
    );
  }

  const post = await Post.findById(postId);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Check if the user owns the board (created it)
  if (!user.boards.includes(post.boardId.toString())) {
    return NextResponse.json(
      { error: "Not authorized to delete post" },
      { status: 401 }
    );
  }

  await Post.findByIdAndDelete(postId);

  return NextResponse.json({ message: "Post deleted" });
}
