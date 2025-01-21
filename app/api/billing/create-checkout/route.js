import { NextResponse } from "next/server";
import { auth } from "@/auth";
// import connectMongo from "@libs/mongoose";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.successURL || !body.cancelURL) {
      return NextResponse.json(
        { error: "Success and cancel URLs are required" },
        { status: 400 }
      );
    }

    const session = await auth();

    // await connectMongo();

    const user = await User.findById(session?.user?.id);

    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      success_url: body.successURL,
      cancel_url: body.cancelURL,
      client_reference_id: user._id.toString(),
      customer_email: user.email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
    });

    return NextResponse.json(
      { url: stripeCheckoutSession.url },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
