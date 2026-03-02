"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function AudienceGrowthEstimator() {
    const [starting, setStarting] = useState(1000);
    const [monthlyGrowth, setMonthlyGrowth] = useState(10); // %

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("audience-growth-estimator");
            tracked.current = true;
        }
    }, []);

    const month6 = Math.round(starting * Math.pow(1 + monthlyGrowth / 100, 6));
    const month12 = Math.round(starting * Math.pow(1 + monthlyGrowth / 100, 12));

    const faqs = [
        { question: "Is audience growth linear or compound?", answer: "Good audience growth is compound. As you get larger, the absolute number of followers gained per month increases if the percentage remains stable." }
    ];

    const seoContent = (
        <>
            <h2>The Power of Compound Growth</h2>
            <p>Growing at 10% a month seems slow at 1,000 followers, but becomes exponential. Run the models to set realistic goals.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/newsletter-growth-calculator">Newsletter Growth Calculator</Link></li>
                <li><Link href="/tools/viral-potential-score">Viral Potential Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Audience Growth Estimator" description="Model the compound effect of consistent monthly follower growth." slug="audience-growth-estimator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Starting Followers</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{starting.toLocaleString()}</span>
                        </label>
                        <input type="range" min="100" max="100000" step="100" value={starting} onChange={(e) => setStarting(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Growth Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{monthlyGrowth}%</span>
                        </label>
                        <input type="range" min="1" max="50" step="1" value={monthlyGrowth} onChange={(e) => setMonthlyGrowth(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <h3 className="input-label">Growth Projections</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>6 Months</div>
                            <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>{month6.toLocaleString()}</div>
                        </div>
                        <div style={{ padding: "1.5rem", backgroundColor: "rgba(35, 134, 255, 0.05)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--accent-primary)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>12 Months</div>
                            <div style={{ fontSize: "2.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>{month12.toLocaleString()}</div>
                        </div>
                    </div>
                    <div style={{ height: "40px", width: "100%", background: `linear-gradient(90deg, var(--bg-secondary) 0%, var(--accent-primary) 100%)`, borderRadius: "var(--radius-sm)", marginTop: "1rem", position: "relative" }}>
                        <div style={{ position: "absolute", left: "0", top: "100%", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Now</div>
                        <div style={{ position: "absolute", right: "0", top: "100%", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Year 1</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
