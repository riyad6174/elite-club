import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const envUsername = process.env.ADMIN_USERNAME || "admin";
    const envPassword = process.env.ADMIN_PASSWORD;
    const envPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!envPassword && !envPasswordHash) {
      return NextResponse.json(
        { error: "Admin credentials are not configured in environment variables." },
        { status: 500 }
      );
    }

    let isMatch = false;

    // First check if username matches
    if (username === envUsername) {
      if (envPasswordHash) {
        // Match with hashed password
        isMatch = await bcrypt.compare(password, envPasswordHash);
      } else if (envPassword) {
        // Fallback to plaintext password
        isMatch = password === envPassword;
      }
    }

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Sign JWT and set httpOnly cookie
    const token = signToken({ username });
    const response = NextResponse.json({ success: true, message: "Login successful" });
    
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
