import { NextResponse } from "next/server";
import { redis, rateLimitTrack } from "@/lib/redis";

const KNOWN_TOOLS = new Set([
    "reddit-pain-finder",
    "subreddit-pain-analyzer",
    "freelance-rate-calculator",
    "construction-cost-estimator",
    "loan-scenario-comparator"
]);

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        const { success } = await rateLimitTrack.limit(ip);

        if (!success) {
            return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
        }

        const { toolSlug } = await req.json();
        if (!toolSlug || !KNOWN_TOOLS.has(toolSlug)) {
            return NextResponse.json({ error: "Invalid tool" }, { status: 400 });
        }

        const today = new Date().toISOString().split("T")[0];

        const pipeline = redis.pipeline();

        // 1. Global Usage Counters
        pipeline.incr("global:usage");
        pipeline.incr(`daily:${today}:usage`);

        // 2. Tool-specific usage
        pipeline.incr(`tool:${toolSlug}:usage`);

        // Timestamp for last activity
        pipeline.set(`tool:${toolSlug}:last_active`, Date.now());

        await pipeline.exec();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Usage tracking error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
