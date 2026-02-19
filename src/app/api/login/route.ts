import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { query, getPool } from "@/lib/db";
import { ensureSchema } from "@/lib/schema";
import { signUserToken } from "@/lib/auth";

export const runtime = "nodejs";

type KodUserRow = RowDataPacket & {
  uid: number;
  username: string;
  password: string;
  role: "Customer" | "manager" | "admin";
};

export async function POST(request: Request) {
  try {
    await ensureSchema();

    const body = await request.json();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    const rows = await query<KodUserRow[]>(
      "SELECT uid, username, password, role FROM KodUser WHERE username = ? LIMIT 1",
      [username]
    );

    const user = rows[0];
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password." },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password." },
        { status: 401 }
      );
    }

    const { token, expiryDate } = signUserToken(user.username, user.role);

    const pool = getPool();
    await pool.execute<ResultSetHeader>(
      "INSERT INTO UserToken(token, uid, expairy) VALUES(?, ?, ?)",
      [token, user.uid, expiryDate]
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    response.cookies.set("kodbank_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiryDate,
      path: "/",
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
