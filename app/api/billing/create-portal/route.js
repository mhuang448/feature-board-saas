import { NextResponse } from "next/server";
import { auth } from "@/auth";
// import connectMongo from "@libs/mongoose";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.returnUrl) {
      return NextResponse.json(
        { error: "Return URL is required" },
        { status: 400 }
      );
    }

    const session = await auth();

    // await connectMongo();

    const user = await User.findById(session?.user?.id);

    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const stripeCustomerPortalSession =
      await stripe.billingPortal.sessions.create({
        customer: user.customerId,
        return_url: body.returnUrl,
      });

    return NextResponse.json(
      { url: stripeCustomerPortalSession.url },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
