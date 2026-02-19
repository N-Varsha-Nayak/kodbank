import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { query } from "@/lib/db";
import { ensureSchema } from "@/lib/schema";
import { verifyUserToken } from "@/lib/auth";

export const runtime = "nodejs";

type TokenRow = RowDataPacket & {
  tid: number;
};

type BalanceRow = RowDataPacket & {
  balance: string;
};

function getTokenFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookiePart = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("kodbank_token="));

  if (cookiePart) {
    return decodeURIComponent(cookiePart.replace("kodbank_token=", ""));
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return "";
}

export async function GET(request: Request) {
  try {
    await ensureSchema();
    const token = getTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found." },
        { status: 401 }
      );
    }

    const decoded = verifyUserToken(token);
    if (!decoded.username) {
      return NextResponse.json(
        { success: false, message: "Token invalid." },
        { status: 401 }
      );
    }

    const tokenRows = await query<TokenRow[]>(
      "SELECT tid FROM UserToken WHERE token = ? AND expairy > NOW() LIMIT 1",
      [token]
    );

    if (tokenRows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Token expired or not recognized." },
        { status: 401 }
      );
    }

    const balances = await query<BalanceRow[]>(
      "SELECT balance FROM KodUser WHERE username = ? LIMIT 1",
      [decoded.username]
    );

    const row = balances[0];
    if (!row) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      balance: row.balance,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Balance lookup failed." },
      { status: 500 }
    );
  }
}
