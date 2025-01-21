import ButtonLogin from "@/components/ButtonLogin";
import ButtonCat from "@/components/ButtonCat";
// import ListItem from "@/components/ListItem";
import ExampleState from "@/components/ExampleState";
import FAQListItem from "@/components/FAQListItem";
import Image from "next/image";
import productDemo from "./productDemo.jpeg";
import yizzyGroupLogo from "./YizzyGroupLogo.jpeg";
import { auth } from "@/auth";

export default async function Home() {
  // const name = "Marc";
  // const isLoggedIn = true;

  const session = await auth();

  const age = 19;
  let canVote;
  canVote = age >= 18 ? "yes" : "no";

  console.log(canVote);

  // const greeting2 = `Hello ${isLoggedIn ? name : "there"}`;
  // console.log(greeting2);

  const fruits = ["🍎", "🍓", "🍇"];
  console.log(fruits.length);
  fruits.push("🍌");
  console.log(fruits.length);

  fruits.pop();
  console.log(fruits.length);

  fruits.push("🍌");

  fruits.forEach((fruit) => {
    console.log(fruit);
  });

  const fruitEmojis = fruits.map((fruit) => {
    return `I love ${fruit}`;
  });

  console.log(fruitEmojis);

  const fruitsNoNanna = fruits.filter((fruit) => {
    return fruit !== "🍌";
  });

  console.log(fruitsNoNanna);

  const pricingFeaturesList = [
    "Collect customer feedback",
    "Unlimited boards",
    "Admin dashboard",
    "24/7 support",
  ];
  console.log(pricingFeaturesList.length);

  const returnSomething = () => {
    return "Something";
  };
  console.log(returnSomething());
  const returnSomethingElse = () => "Something Else";
  console.log(returnSomethingElse());

  return (
    <main>
      {/* HEADER */}
      <section className="bg-base-200">
        <section className="max-w-5xl mx-auto flex justify-between items-center px-8 py-2">
          <div className="font-bold">The Yizzy Group</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover" href="#pricing">
              Pricing
            </a>
            <a className="link link-hover" href="#faq">
              FAQ
            </a>
          </div>
          <div>
            <ButtonLogin session={session} />
          </div>
        </section>
      </section>

      {/* CAT BUTTON */}
      <div className="flex justify-center mt-4">
        <ButtonCat />
      </div>

      {/* HERO */}
      <section className="px-8 text-center lg:text-left py-32 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg:items-start">
        <Image
          src={productDemo}
          alt="Product Demo"
          className="w-96 rounded-xl saturate-200" // EXTRA OPTIONAL h-40 object-contain grayscale saturate-200
        />
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Collect Customer Feedback to build better products
          </h1>
          <div className="opacity-90 mb-10">
            Create feedback board in minutes, prioritize features, and build
            products your customers will love.
          </div>
          <ButtonLogin session={session}>
            {/* <div>This is a test</div> */}
          </ButtonLogin>
        </div>
        {/* <p>Hey {name}</p> */}
      </section>

      {/* PRICING */}
      <section className="bg-base-200" id="pricing">
        <div className="px-8 py-32 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            A pricing that adapts to your needs
          </h2>

          {/* CARD */}
          <div className="p-8 bg-base-100 max-w-96 rounded-3xl mx-auto space-y-6">
            {/* PRICE */}
            <div className="flex gap-2 items-baseline">
              <div className="text-4xl font-black">$19</div>
              <div className="uppercase text-sm font-medium opacity-60">
                /month
              </div>
            </div>

            {/* FEATURES  */}
            <ul className="space-y-2">
              {/* COMPONENT APPROACH */}
              {/* <ListItem>Collect customer feedback</ListItem>
              <ListItem>Unlimited boards</ListItem>
              <ListItem>Admin dashboard</ListItem>
              <ListItem>24/7 support</ListItem> */}

              {/* DIRECT JavaScript + JSX APPROACH  */}
              {[
                "Collect customer feedback",
                "Unlimited boards",
                "Admin dashboard",
                "24/7 support",
              ].map((priceItem) => (
                <li className="flex gap-2 items-center" key={priceItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="text-green-600 size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {priceItem}
                </li>
              ))}
            </ul>

            <ButtonLogin session={session} extraStyle="w-full" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base-200" id="faq">
        <div className="px-8 py-32 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            Frequenty Asked Questions
          </h2>

          <ul className="max-w-lg mx-auto">
            {[
              {
                question: "What do I get exactly?",
                answer:
                  "Ability to create feedback boards, collect customer feedback, prioritize features, and build products your customers will love.",
              },
              {
                question: "Can I get a refund",
                answer:
                  "We do not offer refunds. You can cancel your subscription at any time.",
              },
              {
                question: "How long have we been around?",
                answer:
                  "This project has been in development for 10 years. We are proud to release and hope you enjoy.",
              },
            ].map((qa) => (
              <FAQListItem key={qa.question} qa={qa}></FAQListItem>
            ))}
          </ul>
        </div>
      </section>
      {/* State example  */}
      {/* <section className="bg-base-200">
        <ExampleState className="bg-base-200" />
      </section> */}
      <section className="bg-gradient-to-b from-[#f2f2f2] via-[#c1c1c5] to-[#bababe]">
        <div className="flex justify-center items-center mb-8 py-12">
          <Image
            src={yizzyGroupLogo}
            alt="Yizzy Group Logo"
            className="w-96 rounded-xl saturate-200"
          />
        </div>
      </section>
    </main>
  );
}
