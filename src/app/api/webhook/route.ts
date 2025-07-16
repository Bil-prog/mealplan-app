import { stripe } from "@/lib/stripe";
//import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      webhookSecret
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        //const session = event.data.object as Stripe.Checkout.Session;
        //await handleCheckoutSessionCompleted(session);
        break;
      }
      case "invoice.payment_failed": {
        //const invoice = event.data.object as Stripe.Invoice;
        //await handleInvoicePaymentFailed(invoice);
        break;
      }
      case "customer.subscription.deleted": {
        //const subscription = event.data.object as Stripe.Subscription;
        //await handleSubscriptionDeleted(subscription);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({});
}

// const handleCheckoutSessionCompleted = async (
//   session: Stripe.Checkout.Session
// ) => {
//   const userId = session.metadata?.clerkUserId;
//   if (!userId) {
//     console.log("No user id");
//     return;
//   }

//   const subscriptionId = session.subscription as string;
//   if (!subscriptionId) {
//     console.log("No sub id");
//     return;
//   }

//   try {
//     await prisma.profile.update({
//       where: { userId },
//       data: {
//         stripeSubscriptionId: subscriptionId,
//         subscriptionActive: true,
//         subscriptionTier: session.metadata?.planType || null,
//       },
//     });
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

// const handleInvoicePaymentFailed = async (invoice: Stripe.Invoice) => {
//   const subscriptionId = invoice.subscription as string;
//   console.log(
//     "Handling invoice payment failed for subscription",
//     subscriptionId
//   );
//   if (!subscriptionId) {
//     console.error("No subscription ID found in invoice.");
//     return;
//   }

//   let userId: string | undefined;
//   try {
//     const profile = await prisma.profile.findUnique({
//       where: { stripeSubscriptionId: subscriptionId },
//       select: { userId: true },
//     });
//     if (!profile?.userId) {
//       console.error("No profile found");
//       return;
//     }
//     userId = profile.userId;
//   } catch (error: any) {
//     console.error("Prisma Query Error:", error.message);
//     return;
//   }
//   try {
//     await prisma.profile.update({
//       where: { userId },
//       data: { subscriptionActive: false },
//     });
//     console.log(`Subscription payment failed for user: ${userId}`);
//   } catch (error: any) {
//     console.error("Prisma Update Error:", error.message);
//   }
// };

// const handleSubscriptionDeleted = async (subscription: Stripe.Subscription) => {
//   const subscriptionId = subscription.id;
//   console.log(
//     "Handling customer.subscription.deleted for subscription:",
//     subscriptionId
//   );

//   let userId: string | undefined;
//   try {
//     const profile = await prisma.profile.findUnique({
//       where: { stripeSubscriptionId: subscriptionId },
//       select: { userId: true },
//     });

//     if (!profile?.userId) {
//       console.error("No profile found for this subscription ID.");
//       return;
//     }

//     userId = profile.userId;
//   } catch (error: any) {
//     console.error("Prisma Query Error:", error.message);
//     return;
//   }

//   try {
//     await prisma.profile.update({
//       where: { userId },
//       data: {
//         subscriptionActive: false,
//         stripeSubscriptionId: null,
//       },
//     });
//     console.log(`Subscription canceled for user: ${userId}`);
//   } catch (error: any) {
//     console.error("Prisma Update Error:", error.message);
//   }
// };
