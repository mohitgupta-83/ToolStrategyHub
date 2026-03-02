"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ChannelProfitPredictor() {
    const [cpm, setCpm] = useState(5);
    const [monthlyViews, setMonthlyViews] = useState(100000);
    const [sponsorships, setSponsorships] = useState(500);
    const [growth, setGrowth] = useState(2); // % monthly compounding

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("channel-profit-predictor");
            tracked.current = true;
        }
    }, []);

    let yearlyAdsense = 0;
    let yearlySponsors = 0;
    let currentViews = monthlyViews;

    for (let i = 0; i < 12; i++) {
        yearlyAdsense += (currentViews / 1000) * cpm;
        yearlySponsors += sponsorships;
        currentViews *= (1 + (growth / 100));
    }

    const total = yearlyAdsense + yearlySponsors;

    const faqs = [
        { question: "Why include growth rate?", answer: "A channel is not static. If your channel grows by 2% sequentially per month, your 12th month will generate significantly more revenue than month 1." }
    ];

    const seoContent = (
        <>
            <h2>Modeling Media Business Economics</h2>
            <p>Treat your channel like a media acquisition company. Calculate your predictable yearly earnings to make smart hiring and investment decisions.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/youtube-niche-validator">YouTube Niche Validator</Link></li>
                <li><Link href="/tools/creator-monetization-calculator">Creator Monetization Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Channel Profit Predictor" description="Calculate forward-looking 12-month trailing earnings." slug="channel-profit-predictor" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Niche CPM / RPM ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>${cpm}</span>
                        </label>
                        <input type="range" min="1" max="40" step="0.5" value={cpm} onChange={(e) => setCpm(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Current Monthly Views</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{monthlyViews.toLocaleString()}</span>
                        </label>
                        <input type="range" min="10000" max="10000000" step="10000" value={monthlyViews} onChange={(e) => setMonthlyViews(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Average Monthly Sponsorships ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>${sponsorships.toLocaleString()}</span>
                        </label>
                        <input type="range" min="0" max="20000" step="500" value={sponsorships} onChange={(e) => setSponsorships(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Base Growth Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{growth}%</span>
                        </label>
                        <input type="range" min="0" max="20" step="1" value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 className="input-label">Year 1 Financial Projection</h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)" }}>AdSense Revenue</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>${Math.round(yearlyAdsense).toLocaleString()}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Sponsorships</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>${Math.round(yearlySponsors).toLocaleString()}</strong>
                        </div>
                    </div>

                    <div style={{ marginTop: "1.5rem", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div style={{ fontSize: "0.875rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Total Projected ARR</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>${Math.round(total).toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
