"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function CompetitorGapAnalyzer() {
    const [strength, setStrength] = useState(80);
    const [features, setFeatures] = useState(50);
    const [differentiation, setDifferentiation] = useState(50);
    const [contentDepth, setContentDepth] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("competitor-gap-analyzer");
            tracked.current = true;
        }
    }, []);

    const score = Math.round(((100 - strength) * 0.2) + ((100 - features) * 0.3) + (differentiation * 0.3) + ((100 - contentDepth) * 0.2));

    let strategy = "Do Not Compete";
    if (score > 75) strategy = "Blue Ocean: Launch highly differentiated offering.";
    else if (score > 50) strategy = "Feature Wedge: Target the specific feature they lack.";
    else if (score > 30) strategy = "Content Wedge: Beat them purely on SEO and inbound.";

    const faqs = [
        { question: "What is a feature wedge?", answer: "Instead of building 100% of the competitor's app, build the 10% that users constantly request but the competitor ignores." }
    ];

    const seoContent = (
        <>
            <h2>Finding the Chink in the Armor</h2>
            <p>Every dominant incumbent has a weakness. They are too expensive, too complex, or too generalized. Gap analysis finds that weakness.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/niche-saturation-score">Niche Saturation Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Competitor Gap Analyzer" description="Calculate the viability of competing against incumbents." slug="competitor-gap-analyzer" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Competitor Entity Strength</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{strength}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={strength} onChange={(e) => setStrength(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Competitor Feature Completeness</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{features}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={features} onChange={(e) => setFeatures(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Your Differentiation Potential</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{differentiation}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={differentiation} onChange={(e) => setDifferentiation(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Competitor Content/SEO Depth</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{contentDepth}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={contentDepth} onChange={(e) => setContentDepth(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Gap Opportunity Score</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 50 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{strategy}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
