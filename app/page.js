import ButtonLogin from "@/components/ButtonLogin";
// import ListItem from "@/components/ListItem";
import ExampleState from "@/components/ExampleState";
import FAQListItem from "@/components/FAQListItem";
import Image from "next/image";
import productDemo from "./productDemo.jpeg";
export default function Home() {
  const name = "Marc";
  const isLoggedIn = true;

  const age = 19;
  let canVote;
  canVote = age >= 18 ? "yes" : "no";

  console.log(canVote);

  const greeting2 = `Hello ${isLoggedIn ? name : "there"}`;
  console.log(greeting2);

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
          <div className="font-bold">CodeFastSaas</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover" href="#pricing">
              Pricing
            </a>
            <a className="link link-hover" href="#faq">
              FAQ
            </a>
          </div>
          <div>
            <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
          </div>
        </section>
      </section>
      {/* HERO */}
      <section className="px-8 text-center lg:text-left py-32 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg:items-start">
        <Image
          src={productDemo}
          alt="Product Demo"
          className="w-96 rounded-xl grayscale opacity-50" // EXTRA OPTIONAL h-40 object-contain grayscale saturate-200
        />
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Collect Customer Feedback to build better products
          </h1>
          <div className="opacity-90 mb-10">
            Create feedback board in minutes, prioritize features, and build
            products your customers will love.
          </div>
          <ButtonLogin isLoggedIn={isLoggedIn} name={name}>
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

            <ButtonLogin
              isLoggedIn={isLoggedIn}
              name={name}
              extraStyle="w-full"
            />
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
                  "Lifechanging spiritual advice to guide and empower you to become your best self.",
              },
              {
                question: "Can I get a refund",
                answer:
                  "Yes. If you are not satisfied with your purchase you can email chris@helloclout.com for a refund.",
              },
              {
                question: "I have another question",
                answer: "Please ask away! [ INSERT TEXT HERE ]",
              },
            ].map((qa) => (
              <FAQListItem key={qa.question} qa={qa}></FAQListItem>
            ))}
          </ul>
        </div>
      </section>
      {/* State example  */}
      <ExampleState />
    </main>
  );
}
