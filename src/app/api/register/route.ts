import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ensureSchema } from "@/lib/schema";
import { getPool, query } from "@/lib/db";

export const runtime = "nodejs";

type ExistingUser = RowDataPacket & {
  uid: number;
};

export async function POST(request: Request) {
  try {
    await ensureSchema();

    const body = await request.json();
    const uid = Number(body.uid);
    const username = String(body.uname ?? "").trim();
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");
    const phone = String(body.phone ?? "").trim();
    const role = String(body.role ?? "Customer");

    if (!uid || !username || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (role !== "Customer") {
      return NextResponse.json(
        { success: false, message: "Only Customer registration is allowed." },
        { status: 400 }
      );
    }

    const existing = await query<ExistingUser[]>(
      "SELECT uid FROM KodUser WHERE uid = ? OR username = ? OR email = ? OR phone = ? LIMIT 1",
      [uid, username, email, phone]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "User with these details already exists." },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 10);
    const pool = getPool();
    const [insertResult] = await pool.execute<ResultSetHeader>(
      "INSERT INTO KodUser(uid, username, email, password, balance, phone, role) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [uid, username, email, hash, 100000, phone, "Customer"]
    );

    if (insertResult.affectedRows !== 1) {
      throw new Error("Register insert failed");
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful. Please login.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
