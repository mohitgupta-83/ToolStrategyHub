import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET_KEY = process.env.JWT_SECRET || "fallback_super_secret_for_local_only";
const encodedKey = new TextEncoder().encode(JWT_SECRET_KEY);

export async function signAdminToken() {
    const token = await new SignJWT({ admin: true })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(encodedKey);
    return token;
}

export async function verifyAdminToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, encodedKey);
        return !!payload.admin;
    } catch {
        return false;
    }
}
