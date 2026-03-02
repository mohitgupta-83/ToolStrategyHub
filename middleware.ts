import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
    // Protect admin routes except login
    if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login") {
        // Check for secure token
        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        // Verify token using jose on edge
        const isValid = await verifyAdminToken(token);
        if (!isValid) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // Allow access
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
