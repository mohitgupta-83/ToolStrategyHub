"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ContentROICalculator() {
    const [hours, setHours] = useState(10);
    const [revenue, setRevenue] = useState(500);
    const [conversion, setConversion] = useState(2); // %

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("content-roi-calculator");
            tracked.current = true;
        }
    }, []);

    const hourlyRate = revenue / hours;
    
    // Simplistic ROI percentage assuming a base value of time is $50/hr
    const costOfTime = hours * 50; 
    const roiPercentage = ((revenue - costOfTime) / costOfTime) * 100;

    const faqs = [
        { question: "Why map ROI hourly?", answer: "Content creation is labor. If your YouTube adsense brings in $100 but the video took 40 hours to make, you are making $2.50 an hour. You must know your effective hourly rate." }
    ];

    const seoContent = (
        <>
            <h2>The Only Content Metric That Matters</h2>
            <p>Likes and retweets don't pay your mortgage. Effective hourly rate across your content portfolio dictates your true business health.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/channel-profit-predictor">Channel Profit Predictor</Link></li>
                <li><Link href="/tools/creator-monetization-calculator">Creator Monetization Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Content ROI Calculator" description="Compute the real financial return on your creative hours." slug="content-roi-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Hours Spent on Content</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{hours}h</span>
                        </label>
                        <input type="range" min="1" max="100" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Direct Revenue Earned ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>${revenue}</span>
                        </label>
                        <input type="range" min="0" max="10000" step="100" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Conversion Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{conversion}%</span>
                        </label>
                        <input type="range" min="0.1" max="10" step="0.1" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Effective Hourly Rate</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-mono)", color: hourlyRate > 50 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>${hourlyRate.toFixed(2)}</div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginTop: "2rem", width: "100%" }}>
                        <div style={{ padding: "1.5rem", backgroundColor: roiPercentage > 0 ? "rgba(35, 134, 255, 0.05)" : "rgba(239, 68, 68, 0.05)", borderRadius: "var(--radius-sm)", border: roiPercentage > 0 ? "1px solid var(--accent-primary)" : "1px solid var(--error-color)", textAlign: "center" }}>
                            <div style={{ fontSize: "0.875rem", color: roiPercentage > 0 ? "var(--accent-primary)" : "var(--error-color)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>Calculated True ROI</div>
                            <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>{roiPercentage.toFixed(0)}%</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>*Assumes baseline opportunity cost of $50/hr</div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
