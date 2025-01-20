import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
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

    await connectMongo();

    const user = await User.findById(session.user.id);

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
