import { NextRequest, NextResponse } from "next/server";
//import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing UserId" }, { status: 400 });
    }

    // const profile = await prisma.profile.findUnique({
    //   where: { userId },
    //   select: { subscriptionActive: true },
    // });

    // if (!profile?.subscriptionActive) {
    //   return NextResponse.json({ subscriptionActive: false });
    // }
    return NextResponse.json({ subscriptionActive: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("check-subscription error:", err.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
