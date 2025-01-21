import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import User from "@/models/User";
// import connectMongo from "@libs/mongoose";

export async function POST(req) {
  try {
    // verify webhook is from stripe
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const body = await req.text();
    const signature = headers().get("stripe-signature");

    // if this throws an error, it means the webhook is not from stripe
    // throws Stripe.errors.SignatureVerificationError if the signature is not valid
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const { type, data } = event;

    if (type === "checkout.session.completed") {
      // await connectMongo();
      const session = data.object;
      const userId = session.client_reference_id;
      const user = await User.findById(userId);
      user.hasAccess = true;
      user.customerId = session.customer;
      await user.save();
    } else if (type === "customer.subscription.deleted") {
      // revoke access to product
      const subscription = data.object;
      const user = await User.findOne({ customerId: subscription.customer });
      user.hasAccess = false;

      // extra logic not in Marc Lou's code
      user.customerId = null;
      await user.save();
    }

    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Log the full error object for debugging
    console.error("Stripe Webhook Error:", error?.message);

    // Handle Stripe signature verification errors
    if (error instanceof Stripe.errors.SignatureVerificationError) {
      return NextResponse.json(
        {
          error: "Invalid signature",
          message: "Webhook signature verification failed",
        },
        { status: 401 }
      );
    }

    // Handle other specific Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: error.type,
          message: error.message,
        },
        { status: 400 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        error: "internal_server_error",
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
