"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function LaunchTimingAnalyzer() {
    const [demand, setDemand] = useState(50);
    const [intensity, setIntensity] = useState(50);
    const [product, setProduct] = useState(50);
    const [season, setSeason] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("launch-timing-analyzer");
            tracked.current = true;
        }
    }, []);

    const score = Math.round((demand * 0.35) + ((100 - intensity) * 0.2) + (product * 0.25) + (season * 0.2));

    let status = "Delay Launch immediately.";
    if (score > 75) status = "Optimal Launch Window: Strike Now.";
    else if (score > 50) status = "Acceptable Window: Requires heavy marketing push.";
    else if (score > 30) status = "Premature or Late: Re-evaluate seasonal and product factors.";

    const faqs = [
        { question: "How does seasonal timing impact B2B?", answer: "Launching a complex B2B tool in mid-December is an active choice to fail. Budgets are closed and buyers are on vacation. Launch in February or September." }
    ];

    const seoContent = (
        <>
            <h2>The Algorithm of Hype</h2>
            <p>Launching requires momentum. Matching an increasing demand curve with maximum product readiness generates the highest possible splash radius.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/startup-readiness-score">Startup Readiness Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Launch Timing Analyzer" description="Identify the golden window for GTM deployment." slug="launch-timing-analyzer" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Macro Demand Trend (100 = Peaking)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{demand}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={demand} onChange={(e) => setDemand(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Competitive Noise (100 = Deafening)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{intensity}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Current Product Stability / Polish</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{product}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={product} onChange={(e) => setProduct(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Seasonal Alignment (100 = Peak Season)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{season}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={season} onChange={(e) => setSeason(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Timing Score</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{status}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
