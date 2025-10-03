import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { hashPassword } from "@/lib/password";
import { createUser, getUserByEmail } from "@/lib/db-helpers";
import { DynamoDBUser } from "@/lib/dynamodb";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role = "user" } = await request.json();

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password using your existing helper
    const hashedPassword = await hashPassword(password);

    // Create user
    const now = new Date().toISOString();
    const newUser: DynamoDBUser = {
      userId: randomUUID(),
      email,
      name,
      password: hashedPassword,
      role: role as "user" | "vendor" | "admin",
      vendorVerified: false,
      createdAt: now,
    };

    await createUser(newUser);

    // Determine redirect URL based on role
    let redirectUrl = "/trips"; // default for users
    if (role === "vendor") {
      redirectUrl = "/vendor/dashboard";
    } else if (role === "admin") {
      redirectUrl = "/admin/dashboard";
    }

    // Return user data WITHOUT the password field (for security)
    // We destructure to remove password and return safe user data
    const { password: _, ...safeUserData } = newUser;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: safeUserData,
        redirectUrl, // ✅ Added redirect URL based on role
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
