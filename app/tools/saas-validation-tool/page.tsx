"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

interface ScorecardResult {
    score: number;
    riskLevel: string;
    monetization: string;
    recommendation: string;
}

export default function SaasValidationTool() {
    const [urgency, setUrgency] = useState(5);
    const [wtp, setWtp] = useState(5);
    const [marketSize, setMarketSize] = useState(5);
    const [competition, setCompetition] = useState(5);
    const [distribution, setDistribution] = useState(5);
    const [feasibility, setFeasibility] = useState(5);
    const [businessModel, setBusinessModel] = useState(5);
    const [founderFit, setFounderFit] = useState(5);

    const [result, setResult] = useState<ScorecardResult | null>(null);
    const tracked = useRef(false);

    useEffect(() => {
        // Algorithm
        // Let's weight the dimensions (total weight = 1.0)
        // Urgency: 20%, WTP: 15%, Market Size: 10%, Competition: 10% (inverse), Distribution: 15%, Feasibility: 10%, Business Model: 10%, Founder Fit: 10%
        const weightedScore =
            (urgency * 10 * 0.20) +
            (wtp * 10 * 0.15) +
            (marketSize * 10 * 0.10) +
            ((10 - competition) * 10 * 0.10) +
            (distribution * 10 * 0.15) +
            (feasibility * 10 * 0.10) +
            (businessModel * 10 * 0.10) +
            (founderFit * 10 * 0.10);

        const score = Math.round(weightedScore);

        let riskLevel = "Critical";
        if (score > 75) riskLevel = "Low";
        else if (score > 50) riskLevel = "Moderate";
        else if (score > 30) riskLevel = "High";

        let monetization = "Weak";
        if (wtp > 7 && urgency > 7) monetization = "Highly Validated";
        else if (wtp > 5) monetization = "Viable";

        let recommendation = "Discard or pivot. The viability score is too low. Focus on identifying a higher-urgency problem with better distribution channels.";
        if (score >= 80) recommendation = "Strong green light. You have a well-aligned opportunity in a high-urgency market with clear distribution advantages and feasibility.";
        else if (score >= 60) recommendation = "Proceed with caution. The core idea is viable but you need to optimize specific weak dimensions (e.g. distribution, pricing or feasibility) before building.";
        else if (score >= 45) recommendation = "High risk. Requires a major pivot, a stronger founder wedge, or a clearer path to reach early customers without massive ad spend.";

        setResult({ score, riskLevel, monetization, recommendation });

        if (!tracked.current) {
            trackUsage("saas-validation-tool");
            tracked.current = true;
        }
    }, [urgency, wtp, marketSize, competition, distribution, feasibility, businessModel, founderFit]);

    const faqs = [
        { question: "How does the SaaS Validation score work?", answer: "The tool evaluates your idea across 8 strategic dimensions. Urgency and Distribution are weighted highest (20% and 15%) because they are the most common points of failure for early-stage software companies." },
        { question: "What is a good score?", answer: "A score of 70+ indicates a strong candidate for development. Scores between 50 and 70 are viable but need targeted improvements in weak areas. Anything below 50 should be pivoted or abandoned before coding begins." },
        { question: "Why is Competition inverted in the score?", answer: "Lower competition is generally positive for solo founders or bootstrappers who need a niche wedge. However, extremely low competition can also signal a lack of market demand. The tool treats moderate-to-low competition as a validation premium." }
    ];

    const seoContent = (
        <>
            <h2>Validating Your SaaS Idea Before Writing Code</h2>
            <p>The number one mistake SaaS founders make is building a product without validation. True validation is not asking friends if they like your idea; it is a systematic assessment of market urgency, willingness to pay, and acquisition channels. The <strong>SaaS Validation Tool</strong> provides a rigorous scorecard across eight core dimensions to help you decide whether to build, pivot, or kill your idea.</p>
            <h3>The 8 Dimensions of SaaS Validation</h3>
            <p>Our algorithm weights urgency, monetization viability, distribution advantage, and operational feasibility. By answering these questions honestly, you can identify hidden risks in your business model before investing months of engineering resources.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validator</Link></li>
                <li><Link href="/tools/market-size-estimator">TAM SAM SOM Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout
            title="SaaS Validation Tool"
            description="Score your SaaS idea across 8 dimensions including urgency, willingness to pay, feasibility, and distribution."
            slug="saas-validation-tool"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Assess Your Idea</h3>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">1. Market Urgency (Pain Level)</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{urgency}/10</span>
                        </div>
                        <input type="range" min="1" max="10" value={urgency} onChange={(e) => setUrgency(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>1 = Nice to have, 10 = Severe, urgent pain</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">2. Willingness to Pay (WTP)</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{wtp}/10</span>
                        </div>
                        <input type="range" min="1" max="10" value={wtp} onChange={(e) => setWtp(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>1 = Expects it free, 10 = Enterprise budgets</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">3. Target Market Size (TAM)</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{marketSize}/10</span>
                        </div>
                        <input type="range" min="1" max="10" value={marketSize} onChange={(e) => setMarketSize(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>1 = Ultra-niche, 10 = Multi-billion dollar market</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">4. Competition Level</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{competition}/10</span>
                        </div>
                        <input type="range" min="1" max="10" value={competition} onChange={(e) => setCompetition(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>1 = Blue ocean, 10 = Saturated Red ocean</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">5. Your Distribution Advantage</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{distribution}/10</span>
                        </div>
                        <input type="range" min="1" max="10" value={distribution} onChange={(e) => setDistribution(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>1 = Cold outbound only, 10 = Proprietary channel/audience</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">6. Technical Feasibility</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{feasibility}/10</span>
                        </div>
                        <input type="range" min="1" max="10" value={feasibility} onChange={(e) => setFeasibility(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>1 = Extremely complex (AI/ML core), 10 = Simple CRUD database / MVP in 2 weeks</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">7. Business Model Clarity</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{businessModel}/10</span>
                        </div>
                        <input type="range" min="1" max="10" value={businessModel} onChange={(e) => setBusinessModel(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>1 = Unclear monetization, 10 = Standard recurring SaaS subscription</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">8. Founder-Market Fit</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{founderFit}/10</span>
                        </div>
                        <input type="range" min="1" max="10" value={founderFit} onChange={(e) => setFounderFit(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>1 = No industry experience, 10 = 5+ years working in this specific domain</div>
                    </div>
                </div>

                {result && (
                    <div className="stagger-2">
                        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            <div>
                                <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Viability Score</h3>
                                <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: "var(--accent-primary)", lineHeight: 1 }}>
                                    {result.score} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>/ 100</span>
                                </div>
                                <div className="score-bar" style={{ marginTop: "1rem" }}>
                                    <div className="score-fill" style={{ width: `${result.score}%`, backgroundColor: result.score >= 70 ? "var(--success-color, #22c55e)" : result.score >= 50 ? "#eab308" : "var(--error-color, #ef4444)" }}></div>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", borderTop: "1px dashed var(--border-color)", paddingTop: "1.5rem" }}>
                                <div>
                                    <div className="input-label">Risk Profile</div>
                                    <div className="pill" style={{ marginTop: "0.5rem", display: "inline-block" }}>{result.riskLevel} Risk</div>
                                </div>
                                <div>
                                    <div className="input-label">Monetization</div>
                                    <div className="pill" style={{ marginTop: "0.5rem", display: "inline-block" }}>{result.monetization}</div>
                                </div>
                            </div>

                            <div style={{ backgroundColor: "var(--bg-tertiary)", padding: "1.5rem", borderRadius: "var(--radius-sm)" }}>
                                <h4 style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Strategic Recommendation</h4>
                                <p style={{ color: "var(--text-primary)", lineHeight: 1.6 }}>{result.recommendation}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
