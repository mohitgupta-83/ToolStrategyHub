"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function NicheSaturationScore() {
    const [competitors, setCompetitors] = useState(5);
    const [maturity, setMaturity] = useState(50); // 100 = mature
    const [overlap, setOverlap] = useState(50);
    const [differentiation, setDifferentiation] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("niche-saturation-score");
            tracked.current = true;
        }
    }, []);

    const compScore = Math.max(10 - competitors, 0) * 10;
    const saturation = Math.round((compScore * 0.2) + ((100 - maturity) * 0.3) + ((100 - overlap) * 0.2) + (differentiation * 0.3));

    let recommendation = "Extremely Saturated. Requires paradigm shift.";
    if (saturation > 75) recommendation = "Wide Open Niche. Execute immediately.";
    else if (saturation > 50) recommendation = "Developing Niche. Room for differentiated players.";
    else if (saturation > 30) recommendation = "Mature Niche. Difficult entry.";

    const faqs = [
        { question: "Is saturation a bad thing?", answer: "Total lack of competition often means lack of market. But total saturation means cost-of-acquisition is too high. You want the middle ground." }
    ];

    const seoContent = (
        <>
            <h2>Measuring Market Saturation</h2>
            <p>Entering a saturated market requires massive capital. Entering an empty market requires massive education. Find the Goldilocks zone.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/market-trend-evaluator">Market Trend Evaluator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Niche Saturation Score" description="Calculate the relative density of competitors against market demand." slug="niche-saturation-score" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Direct Competitors</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{competitors}</span>
                        </label>
                        <input type="range" min="0" max="25" value={competitors} onChange={(e) => setCompetitors(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Market Maturity / Commoditization</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{maturity}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={maturity} onChange={(e) => setMaturity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Feature / Audience Overlap</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{overlap}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={overlap} onChange={(e) => setOverlap(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Your Target Differentiation</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{differentiation}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={differentiation} onChange={(e) => setDifferentiation(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Opportunity Viability Index</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: saturation >= 50 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{saturation}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{recommendation}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
