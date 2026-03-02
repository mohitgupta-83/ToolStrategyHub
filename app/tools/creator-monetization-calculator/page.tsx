"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function CreatorMonetizationCalculator() {
    const [audience, setAudience] = useState(10000);
    const [engagement, setEngagement] = useState(5); // %
    const [conversion, setConversion] = useState(2); // %
    const [price, setPrice] = useState(50); // $

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("creator-monetization-calculator");
            tracked.current = true;
        }
    }, []);

    const engagedUsers = Math.round(audience * (engagement / 100));
    const buyers = Math.round(engagedUsers * (conversion / 100));
    const revenue = buyers * price;

    const faqs = [
        { question: "Why use engaged users?", answer: "Total follower count is a vanity metric. Only users who actually see and engage with your content have a chance of converting." }
    ];

    const seoContent = (
        <>
            <h2>The Monetization Funnel</h2>
            <p>Followers don't pay bills. To monetize effectively, you must understand the steep drop-off between followers, engaged users, and actual buyers.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/creator-business-model-picker">Creator Business Model Picker</Link></li>
                <li><Link href="/tools/content-roi-calculator">Content ROI Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Creator Monetization Funnel" description="Model your funnel from total followers to net revenue." slug="creator-monetization-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Total Audience Size</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{audience.toLocaleString()}</span>
                        </label>
                        <input type="range" min="1000" max="1000000" step="1000" value={audience} onChange={(e) => setAudience(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Average Engagement Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{engagement}%</span>
                        </label>
                        <input type="range" min="0.1" max="25" step="0.1" value={engagement} onChange={(e) => setEngagement(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Conversion Rate from Engaged (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{conversion}%</span>
                        </label>
                        <input type="range" min="0.1" max="10" step="0.1" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Product/Service Price ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>${price}</span>
                        </label>
                        <input type="range" min="1" max="1000" step="5" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 className="input-label">Revenue Breakdown</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Total Fans</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{audience.toLocaleString()}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Eyeballs (Engaged)</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{engagedUsers.toLocaleString()}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Total Buyers</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{buyers.toLocaleString()}</strong>
                        </div>
                    </div>
                    <div style={{ marginTop: "1rem", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div style={{ fontSize: "0.875rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Projected Campaign Revenue</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>${revenue.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
