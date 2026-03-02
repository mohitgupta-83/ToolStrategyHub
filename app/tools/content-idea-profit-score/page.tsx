"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ContentIdeaProfitScore() {
    const [competition, setCompetition] = useState(50);
    const [demand, setDemand] = useState(50);
    const [monetization, setMonetization] = useState(50);
    const [effort, setEffort] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("content-idea-profit-score");
            tracked.current = true;
        }
    }, []);

    const score = Math.round(((100 - competition) * 0.25) + (demand * 0.35) + (monetization * 0.25) + ((100 - effort) * 0.15));

    let recommendation = "Discard Idea";
    if (score > 80) recommendation = "Highly Profitable. Execution should begin immediately.";
    else if (score > 60) recommendation = "Strong Potential. Validate with a minimum viable post.";
    else if (score > 40) recommendation = "Average. Requires unique angle to stand out.";

    const faqs = [
        { question: "Why is competition scored inversely?", answer: "High competition means higher cost of acquisition and harder organic reach. Lower competition increases profit potential." },
        { question: "What does 'monetization potential' mean?", answer: "Are you selling high-ticket B2B software or low-ticket B2C merch? Higher LTV means higher potential." }
    ];

    const seoContent = (
        <>
            <h2>Stop Wasting Time on Bad Content Ideas</h2>
            <p>Content creation is an investment of your finite time. Calculating profit potential ensures you're building assets, not just noise.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/youtube-niche-validator">YouTube Niche Validator</Link></li>
                <li><Link href="/tools/content-roi-calculator">Content ROI Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Content Idea Profit Score" description="Calculate the expected profitability of a content idea based on market dynamics." slug="content-idea-profit-score" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Niche Competition (100 = Saturated)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{competition}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={competition} onChange={(e) => setCompetition(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Audience Demand (100 = High Search Volume)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{demand}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={demand} onChange={(e) => setDemand(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monetization Potential (100 = High LTV)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{monetization}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={monetization} onChange={(e) => setMonetization(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Content Effort (100 = Very Hard to Produce)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{effort}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={effort} onChange={(e) => setEffort(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "1rem" }}>Profitability Score</h3>
                    <div style={{ fontSize: "6rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}</div>
                    <div style={{ marginTop: "2rem", padding: "1.5rem", width: "100%", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", fontWeight: "bold" }}>{recommendation}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
