"use client";

// Generate or retrieve a stable ID for the user's session
function getSessionId() {
    if (typeof window === "undefined") return "server-session";
    let sid = localStorage.getItem("bt_sid");
    if (!sid) {
        sid = crypto.randomUUID();
        localStorage.setItem("bt_sid", sid);
    }
    return sid;
}

export async function trackView(pathname: string) {
    if (typeof window === "undefined") return;

    const sid = getSessionId();
    try {
        await fetch("/api/track-view", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sid, pathname }),
            // Don't wait for response, fire and forget
        });
    } catch {
        // Suppress analytics tracking errors
    }
}

export async function trackUsage(toolSlug: string) {
    if (typeof window === "undefined") return;

    const sid = getSessionId();
    try {
        await fetch("/api/track-usage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sid, toolSlug }),
        });
    } catch {
        // Suppress
    }
}
