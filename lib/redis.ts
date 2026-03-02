import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Create a new Redis instance.
// Using explicit ENV vars (they will be populated by Vercel/Upstash automatically when linked)
export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// A standard rate limiter: 10 requests per 10 seconds per IP
export const rateLimitTrack = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});

export const rateLimitAuth = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    prefix: "@upstash/ratelimit/auth",
});
