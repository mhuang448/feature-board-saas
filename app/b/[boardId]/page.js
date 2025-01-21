import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import Post from "@/models/Post";
import { redirect } from "next/navigation";
import FormAddPost from "@/components/FormAddPost";
import CardPost from "@/components/CardPost";

const getData = async (boardId) => {
  await connectMongo();
  const board = await Board.findById(boardId);
  const posts = await Post.find({ boardId }).sort({ createdAt: -1 });
  if (!board) {
    redirect("/");
  }
  return { board, posts };
};

export default async function PublicFeedbackBoard({ params }) {
  const { boardId } = params;
  const { board, posts } = await getData(boardId);
  return (
    <main className="min-h-screen bg-base-200">
      <section className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="text-2xl font-bold">{board.name} (public)</h1>
      </section>
      <section className="max-w-5xl mx-auto px-5 py-10 flex flex-col md:flex-row items-start gap-7">
        <FormAddPost boardId={boardId} />
        <ul className="flex-grow flex flex-col gap-4">
          {posts.map((post) => (
            <CardPost key={post._id} post={post} />
          ))}
        </ul>
      </section>
    </main>
  );
}
