import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const KNOWN_TOOLS = [
    "reddit-pain-finder",
    "subreddit-pain-analyzer",
    "freelance-rate-calculator",
    "construction-cost-estimator",
    "loan-scenario-comparator"
];

export async function GET() {
    // Edge runtime route or Node server route
    try {
        const pipeline = redis.pipeline();

        // 1. Aggregates
        pipeline.get("global:views");
        pipeline.get("global:usage");
        pipeline.pfcount("global:visitors");

        // 2. Timeseries details
        const today = new Date();
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split("T")[0];
            days.push(dateStr);
            pipeline.get(`daily:${dateStr}:views`);
            pipeline.get(`daily:${dateStr}:usage`);
        }

        // 3. Tool Specific Data
        KNOWN_TOOLS.forEach((slug) => {
            pipeline.get(`tool:${slug}:views`);
            pipeline.get(`tool:${slug}:usage`);
            pipeline.get(`tool:${slug}:last_active`);
        });

        const results = await pipeline.exec();

        // Parse results
        let idx = 0;
        const globalViews = parseInt(String(results[idx++] || 0), 10);
        const globalUsage = parseInt(String(results[idx++] || 0), 10);
        const globalVisitors = parseInt(String(results[idx++] || 0), 10);

        const timeseries = days.map((dateStr) => {
            return {
                date: dateStr,
                views: parseInt(String(results[idx++] || 0), 10),
                usage: parseInt(String(results[idx++] || 0), 10),
            };
        });

        const topTools = KNOWN_TOOLS.map((slug) => {
            const views = parseInt(String(results[idx++] || 0), 10);
            const usage = parseInt(String(results[idx++] || 0), 10);
            const lastActiveRaw = results[idx++];
            const conversion = views > 0 ? ((usage / views) * 100).toFixed(1) : "0.0";

            let lastActive = "Never";
            if (lastActiveRaw) {
                lastActive = new Date(parseInt(String(lastActiveRaw), 10)).toLocaleString();
            }

            const humanName = slug
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");

            return {
                slug,
                name: humanName,
                views,
                usage,
                conversion: parseFloat(conversion),
                lastActive,
            };
        });

        const conversionRate = globalViews > 0 ? ((globalUsage / globalViews) * 100).toFixed(1) : "0.0";

        return NextResponse.json({
            success: true,
            data: {
                globalVisitors,
                globalViews,
                globalUsage,
                conversionRate,
                timeseries,
                topTools: topTools.sort((a, b) => b.usage - a.usage),
            }
        });

    } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 });
    }
}
// Prevent Next.js from aggressively caching this route during dev/build
export const dynamic = "force-dynamic";
