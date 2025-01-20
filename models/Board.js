import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// const Board = mongoose.model("Board", boardSchema);

// Board.find()

export default mongoose.models.Board || mongoose.model("Board", boardSchema);
