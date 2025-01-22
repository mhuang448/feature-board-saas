import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import ButtonCheckout from "@/components/ButtonCheckout";
import ButtonBillingPortal from "@/components/ButtonBillingPortal";
import ButtonHome from "@/components/ButtonHome";

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
        <section className="bg-base-100 max-w-5xl mx-auto px-5 py-3 flex justify-between items-center">
          {user.hasAccess ? <ButtonBillingPortal /> : <ButtonCheckout />}
          <ButtonHome />
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
              <li key={board._id}>
                <Link
                  href={`/dashboard/b/${board._id}`}
                  className="block bg-base-100 p-6 rounded-3xl hover:text-neutral-50 hover:bg-neutral duration-200"
                >
                  {board.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* <button onClick={() => console.log("Logging in...")}>Login</button> */}
    </main>
  );
}
