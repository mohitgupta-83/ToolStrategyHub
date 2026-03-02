/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { trackUsage } from "@/lib/tracker";

interface ScorecardResult {
    score: number;
    riskLevel: string;
    monetization: string;
    recommendation: string;
}

export default function StartupIdeaValidator() {
    const [urgency, setUrgency] = useState(50);
    const [audienceSize, setAudienceSize] = useState(50);
    const [willingnessToPay, setWillingnessToPay] = useState(50);
    const [competition, setCompetition] = useState(50);
    const [distribution, setDistribution] = useState(50);

    const [result, setResult] = useState<ScorecardResult | null>(null);
    const tracked = useRef(false);

    useEffect(() => {
        // Algorithm
        const weightedScore =
            (urgency * 0.30) +
            (audienceSize * 0.15) +
            (willingnessToPay * 0.25) +
            ((100 - competition) * 0.10) +
            (distribution * 0.20);

        const score = Math.round(weightedScore);

        let riskLevel = "Critical";
        if (score > 75) riskLevel = "Low";
        else if (score > 50) riskLevel = "Moderate";
        else if (score > 30) riskLevel = "High";

        let monetization = "Weak";
        if (willingnessToPay > 70 && urgency > 70) monetization = "Highly Validated";
        else if (willingnessToPay > 50) monetization = "Viable";

        let recommendation = "Discard or pivot. The risk profile is too high and distribution/willingness to pay is too low.";
        if (score >= 80) recommendation = "Immediate green light. You have a massive distribution advantage in a hungry market.";
        else if (score >= 60) recommendation = "Proceed carefully. Highly dependent on iterating the product based on early feedback.";
        else if (score >= 45) recommendation = "Requires a distinct wedge or pivot to overcome competition and distribution limits.";

        setResult({ score, riskLevel, monetization, recommendation });

        if (!tracked.current) {
            trackUsage("startup-idea-validator");
            tracked.current = true;
        }
    }, [urgency, audienceSize, willingnessToPay, competition, distribution]);

    const faqs = [
        {
            question: "How is the Idea Score calculated?",
            answer: "The algorithm weights problem urgency (30%), willingness to pay (25%), distribution advantage (20%), audience size (15%), and lack of competition (10%). Distribution and urgency are explicitly prioritized over audience size to combat standard &apos;TAM&apos; illusions."
        },
        {
            question: "Why is &apos;Distribution Advantage&apos; so important?",
            answer: "If you build it, they will not come. First-time founders assume great products sell themselves. Second-time founders know that having existing access to a large, targeted audience is a massive force multiplier."
        }
    ];

    const seoContent = (
        <>
            <h2>Validating Startup Ideas Deterministically</h2>
            <p>Most founders validate ideas via cognitive bias: they ask friends who politely agree the product is &apos;cool&apos;. True validation requires algorithmic rigidity measuring actual willingness to pay and distribution friction.</p>
            <h3>Scoring Mechanics</h3>
            <p>Our algorithm punishes ideas that lack immediate urgency. A &apos;nice to have&apos; product with massive competition will fail 99% of the time, regardless of how large the total addressable market appears in a pitch deck.</p>
        </>
    );

    return (
        <ToolLayout
            title="Startup Idea Validation Scorecard"
            description="Score your startup ideas using a weighted algorithmic scorecard analyzing urgency, audience size, and distribution."
            slug="startup-idea-validator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Problem Urgency (Pain Level)</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{urgency}/100</span>
                        </div>
                        <input type="range" min="0" max="100" value={urgency} onChange={(e) => setUrgency(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>0=Indifferent, 100=Desperate</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Willingness to Pay</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{willingnessToPay}/100</span>
                        </div>
                        <input type="range" min="0" max="100" value={willingnessToPay} onChange={(e) => setWillingnessToPay(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>0=Free only, 100=Enterprise Budgets</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Target Audience Size</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{audienceSize}/100</span>
                        </div>
                        <input type="range" min="0" max="100" value={audienceSize} onChange={(e) => setAudienceSize(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>0=Niche, 100=Global Scale</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Competition Level</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{competition}/100</span>
                        </div>
                        <input type="range" min="0" max="100" value={competition} onChange={(e) => setCompetition(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>0=Monopoly, 100=Saturated Red Ocean</div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Your Distribution Advantage</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{distribution}/100</span>
                        </div>
                        <input type="range" min="0" max="100" value={distribution} onChange={(e) => setDistribution(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>0=Starting from Scratch, 100=Existing Audience of 100k+</div>
                    </div>

                </div>

                {result && (
                    <div className="stagger-2">
                        <div className="card" style={{ borderColor: result.score >= 60 ? "var(--border-focus)" : "transparent" }}>
                            <div style={{ marginBottom: "2rem" }}>
                                <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Overall Viability Score</h3>
                                <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: "var(--accent-primary)", lineHeight: 1 }}>
                                    {result.score} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>/ 100</span>
                                </div>
                                <div className="score-bar" style={{ marginTop: "1rem" }}>
                                    <div className="score-fill" style={{ width: `${result.score}%`, backgroundColor: result.score >= 60 ? "var(--accent-primary)" : "var(--error-color)" }}></div>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem", borderTop: "1px dashed var(--border-color)", paddingTop: "1.5rem" }}>
                                <div>
                                    <div className="input-label">Execution Risk</div>
                                    <div className="pill" style={{ marginTop: "0.5rem" }}>{result.riskLevel}</div>
                                </div>
                                <div>
                                    <div className="input-label">Monetization</div>
                                    <div className="pill" style={{ marginTop: "0.5rem" }}>{result.monetization}</div>
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
        </ToolLayout >
    );
}
