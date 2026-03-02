import { NextResponse } from "next/server";
import { redis, rateLimitTrack } from "@/lib/redis";
import crypto from "crypto";

// Minimal set of known tools to prevent garbage keys
const KNOWN_TOOLS = new Set([
    "reddit-pain-finder",
    "subreddit-pain-analyzer",
    "freelance-rate-calculator",
    "construction-cost-estimator",
    "loan-scenario-comparator"
]);

export async function POST(req: Request) {
    try {
        // Basic rate limit based on IP
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        const { success } = await rateLimitTrack.limit(ip);

        if (!success) {
            return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
        }

        const { sid, pathname } = await req.json();
        if (!sid || !pathname) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        // Hash SID to obscure it (1-way) before saving unique trackers
        const hashedSid = crypto.createHash("sha256").update(sid).digest("hex");

        // YYYY-MM-DD
        const today = new Date().toISOString().split("T")[0];

        const pipeline = redis.pipeline();

        // 1. Global View Counters
        pipeline.incr("global:views");
        pipeline.incr(`daily:${today}:views`);

        // 2. Track Unique Visitor globally vs daily using HyperLogLog
        pipeline.pfadd("global:visitors", hashedSid);
        pipeline.pfadd(`daily:${today}:visitors`, hashedSid);

        // 3. If viewing a tool, track tool-specific views
        const pathParts = pathname.split("/");
        const toolSlug = pathParts.length > 2 && pathParts[1] === "tools" ? pathParts[2] : null;

        if (toolSlug && KNOWN_TOOLS.has(toolSlug)) {
            pipeline.incr(`tool:${toolSlug}:views`);
        }

        await pipeline.exec();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("View tracking error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
