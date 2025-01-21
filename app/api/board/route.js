import { NextResponse } from "next/server";
import { auth } from "@/auth";
// import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Board from "@/models/Board";
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json(
        {
          error: "Board name is required",
        },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // mongoose automatically connects to the database when you use findById
    // await connectMongo();

    const user = await User.findById(session.user.id);

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "User does not have access, please subscribe first" },
        { status: 403 }
      );
    }

    const board = await Board.create({
      userId: user._id,
      name: body.name,
    });

    user.boards.push(board._id);

    await user.save();

    return NextResponse.json({
      message: "Board created successfully",
      board,
    });

    // User.find({ email: "hey@hey.com" });
    // User.findById();
  } catch (e) {
    // send error
    return NextResponse.json(
      {
        error: e.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const boardId = searchParams.get("boardId");

    if (!boardId) {
      return NextResponse.json(
        {
          error: "Board ID is required",
        },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = await User.findById(session?.user?.id);

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "User does not have access, please subscribe first" },
        { status: 403 }
      );
    }
    await Board.deleteOne({ _id: boardId, userId: session?.user?.id });

    user.boards = user.boards.filter((id) => id.toString() !== boardId);
    await user.save();

    return NextResponse.json({
      message: "Board deleted successfully",
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: e.message,
      },
      { status: 500 }
    );
  }
}
