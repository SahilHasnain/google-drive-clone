import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/appwrite";

export async function POST(req: Request) {
  try {
    const { accountId, password } = await req.json();
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: expirationDate,
    });

    return NextResponse.json({ sessionId: session.$id });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify OTP", details: error },
      { status: 500 },
    );
  }
}
