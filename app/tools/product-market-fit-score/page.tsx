"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ProductMarketFitScore() {
    const [retention, setRetention] = useState(50);
    const [intensity, setIntensity] = useState(50);
    const [enthusiasm, setEnthusiasm] = useState(50);
    const [differentiation, setDifferentiation] = useState(50);
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("product-market-fit-score");
            tracked.current = true;
        }
    }, []);

    const score = Math.round((retention * 0.4) + (enthusiasm * 0.3) + (intensity * 0.2) + (differentiation * 0.1));

    let level = "No PMF";
    let desc = "Do not spend money on marketing. Fix the core product loop.";
    if (score >= 80) { level = "Strong PMF"; desc = "Pour gasoline on the fire. Scale acquisition now."; }
    else if (score >= 60) { level = "Weak PMF"; desc = "You have a business, but growth will be a grind until retention improves."; }

    const faqs = [
        { question: "How do you define PMF?", answer: "Product-Market fit occurs when your users are buying faster than you can build, and your retention curve flattens out above zero." }
    ];

    const seoContent = (
        <>
            <h2>Measuring the Unmeasurable</h2>
            <p>While PMF is often described as feeling 'like a runaway train', quantifying retention and enthusiasm gives actionable metrics.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
                <li><Link href="/tools/feature-priority-matrix">Feature Priority Matrix</Link></li>
                <li><Link href="/tools/business-model-selector">Business Model Selector</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Product-Market Fit Score" description="Are you ready to scale, or do you need to keep iterating? Calculate your PMF." slug="product-market-fit-score" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Retention Expectation</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{retention}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={retention} onChange={(e) => setRetention(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>User Enthusiasm (Sean Ellis Test)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{enthusiasm}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={enthusiasm} onChange={(e) => setEnthusiasm(Number(e.target.value))} />
                        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>% of users who would be highly disappointed if product vanished.</div>
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Problem Intensity</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{intensity}/100</span>
                        </label>
                        <input type="range" min="0" max="100" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Differentiation</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{differentiation}/100</span>
                        </label>
                        <input type="range" min="0" max="100" value={differentiation} onChange={(e) => setDifferentiation(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2">
                    <h3 className="input-label">PMF Diagnostic Score</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 80 ? "var(--accent-primary)" : "var(--text-primary)", lineHeight: 1, margin: "1rem 0" }}>
                        {score}
                    </div>

                    <div className="score-bar" style={{ marginBottom: "2rem" }}>
                        <div className="score-fill" style={{ width: `${score}%`, backgroundColor: score >= 80 ? "var(--accent-primary)" : "var(--text-secondary)" }}></div>
                    </div>

                    <div style={{ padding: "1.5rem", backgroundColor: score >= 80 ? "rgba(35, 134, 255, 0.05)" : "var(--bg-tertiary)", border: score >= 80 ? "1px solid var(--accent-primary)" : "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                        <div style={{ fontWeight: "bold", fontSize: "1.5rem", color: score >= 80 ? "var(--accent-primary)" : "var(--error-color)" }}>{level}</div>
                        <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "1.125rem", lineHeight: 1.6 }}>{desc}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
