"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function KeywordOpportunityCalculator() {
    const [volume, setVolume] = useState(5000);
    const [competition, setCompetition] = useState(50); // 0-100
    const [monetization, setMonetization] = useState(50); // 0-100
    const [trend, setTrend] = useState(5); // 1-10

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("keyword-opportunity-calculator");
            tracked.current = true;
        }
    }, []);

    const volumeScore = Math.min((volume / 10000) * 100, 100);
    const score = Math.round((volumeScore * 0.3) + ((100 - competition) * 0.3) + (monetization * 0.2) + (trend * 10 * 0.2));

    let recommendation = "Avoid";
    if (score > 75) recommendation = "Prime Opportunity: High Volume, Low Resistance.";
    else if (score > 50) recommendation = "Moderate Opportunity: Requires targeted content strategy.";
    else if (score > 30) recommendation = "Low Priority: High competition or low commercial viability.";

    const faqs = [
        { question: "Why is competition weighted heavily?", answer: "A keyword with 100,000 searches and 99 competition is useless. A keyword with 500 searches and 10 competition is profitable." }
    ];

    const seoContent = (
        <>
            <h2>Finding the Content Arbitrage</h2>
            <p>SEO isn't about finding the highest volume keyword. It's about finding the highest volume keyword with the lowest barrier to entry and highest monetization alignment.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/competitor-gap-analyzer">Competitor Gap Analyzer</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Keyword Opportunity Calculator" description="Identify high-ROAS, low-KD organic targets." slug="keyword-opportunity-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Search Volume (Monthly)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{volume.toLocaleString()}</span>
                        </label>
                        <input type="range" min="100" max="50000" step="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Competition (KD)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{competition}</span>
                        </label>
                        <input type="range" min="0" max="100" value={competition} onChange={(e) => setCompetition(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Commercial Intent</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{monetization}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={monetization} onChange={(e) => setMonetization(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Trend Momentum</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{trend}/10</span>
                        </label>
                        <input type="range" min="1" max="10" value={trend} onChange={(e) => setTrend(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Opportunity Score</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{recommendation}</div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>Difficulty: {competition > 70 ? "Hard" : competition > 30 ? "Medium" : "Easy"}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
