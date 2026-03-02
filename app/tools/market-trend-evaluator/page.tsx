"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function MarketTrendEvaluator() {
    const [growth, setGrowth] = useState(50);
    const [momentum, setMomentum] = useState(50);
    const [seasonal, setSeasonal] = useState(50);
    const [adoption, setAdoption] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("market-trend-evaluator");
            tracked.current = true;
        }
    }, []);

    // High seasonal is bad. Extremely fast adoption is risky (fad).
    const score = Math.round((growth * 0.4) + (momentum * 0.3) + ((100 - seasonal) * 0.15) + ((100 - Math.abs(50 - adoption)) * 0.15));

    let status = "Fad / Highly Unstable";
    if (score > 75) status = "Sustainable Macro Trend";
    else if (score > 50) status = "Developing Trend";

    const faqs = [
        { question: "Why is extremely fast adoption penalized?", answer: "Trends that skyrocket overnight (like fidget spinners or Clubhouse) usually lack foundational stability. Sustainable shifts take years to adopt." }
    ];

    const seoContent = (
        <>
            <h2>Fad vs Macro Trend</h2>
            <p>Do not build a 5-year business on a 6-month fad. Evaluate the underlying behavioral shift causing the momentum before writing any code.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/opportunity-ranking-tool">Opportunity Ranking Tool</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Market Trend Evaluator" description="Quantify trend longevity." slug="market-trend-evaluator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>YoY Growth Rate (Observed)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{growth}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Search / Social Momentum</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{momentum}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={momentum} onChange={(e) => setMomentum(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Seasonal Dependency</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{seasonal}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={seasonal} onChange={(e) => setSeasonal(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Adoption Speed (50 = Optimal)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{adoption}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={adoption} onChange={(e) => setAdoption(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Trend Stability Score</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 50 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{status}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
