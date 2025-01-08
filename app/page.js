import Link from "next/link";
import ButtonLogin from "@/components/ButtonLogin";
export default function Home() {
  const name = "Marc";
  const isLoggedIn = true;
  return (
    <main>
      <section className="bg-base-200">
        <section className="max-w-3xl mx-auto flex justify-between items-center px-8 py-2">
          <div className="font-bold">CodeFastSaas</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover">FAQ</a>
          </div>
          <div>
            <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
          </div>
        </section>
      </section>
      <section className="px-8 text-center py-32 max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
          Collect Customer Feedback to build better products
        </h1>
        <div className="opacity-90 mb-10">
          Create feedback board in minutes, prioritize features, and build
          products your customers will love.
        </div>
        {/* <button className="btn">Get started</button> */}

        <ButtonLogin isLoggedIn={isLoggedIn} name={name}>
          {/* <div>This is a test</div> */}
        </ButtonLogin>
        {/* <p>Hey {name}</p> */}
      </section>
    </main>
  );
}
