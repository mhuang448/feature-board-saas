import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

async function getUser() {
  const session = await auth();
  await connectMongo();
  // return await User.findById(session.user.id).populate({
  //   path: "boards",
  //   model: Board,
  // });
  return await User.findById(session.user.id).populate("boards");
}

export default async function Dashboard() {
  const user = await getUser();
  console.log(user);
  return (
    <main className="bg-base-200 min-h-screen">
      {/* HEADER */}
      <section className="bg-base-100">
        <section className="bg-base-100 max-w-5xl mx-auto px-5 py-3 flex justify-end">
          <ButtonLogout />
        </section>
      </section>

      {/* FORM NEW BOARD */}
      <section className="px-5 py-12 max-w-5xl mx-auto space-y-12">
        <FormNewBoard />
        {/* BOARDS */}
        <div>
          <h1 className="text-xl font-extrabold mb-4">
            {user.boards.length} Boards
          </h1>

          <ul className="space-y-4">
            {user.boards.map((board) => (
              <div key={board._id} className="bg-base-100 p-6 rounded-3xl">
                {board.name}
              </div>
            ))}
          </ul>
        </div>
      </section>

      {/* <button onClick={() => console.log("Logging in...")}>Login</button> */}
    </main>
  );
}
