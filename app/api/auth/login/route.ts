import { NextResponse } from "next/server";
import { rateLimitAuth } from "@/lib/redis";
import bcrypt from "bcryptjs";
import { signAdminToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        const { success } = await rateLimitAuth.limit(ip);

        if (!success) {
            return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
        }

        const { password: rawPassword } = await req.json();
        const password = rawPassword?.trim();
        if (!password) {
            return NextResponse.json({ error: "Missing password" }, { status: 400 });
        }

        // FOR DEBUGGING ONLY: Let's see if the plumbing works
        // We compare raw string AND hardcoded hash
        const isMatch = (password === "admin123") || await bcrypt.compare(password, "$2b$10$JUl.0EmP5X/LSK.0FAIV5e03CM9Z7gwgUk6IObrqljGnGMp4LAofK");

        if (!isMatch) {
            console.log("LOGIN FAILED: Input was:", `|${password}|`);
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Sign JWT
        const token = await signAdminToken();

        // Set HttpOnly Secure cookie natively with redirect/success
        cookies().set({
            name: "admin_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24h
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
