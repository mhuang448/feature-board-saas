import { NextResponse } from "next/server";
import Post from "@/models/Post";
// import { connectMongo } from "@/lib/mongoose";

export async function POST(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");
  try {
    // await connectMongo();
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    post.votesCounter++;
    await post.save();

    return NextResponse.json({ message: "Vote counted" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");
  try {
    // await connectMongo();
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    post.votesCounter--;
    await post.save();

    return NextResponse.json({ message: "Vote counted" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
