"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ProblemSeverityCalculator() {
    const [frequency, setFrequency] = useState(50);
    const [cost, setCost] = useState(50);
    const [emotion, setEmotion] = useState(50);
    const [alternatives, setAlternatives] = useState(50);
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("problem-severity-calculator");
            tracked.current = true;
        }
    }, []);

    const score = Math.round((frequency * 0.3) + (cost * 0.3) + (emotion * 0.2) + ((100 - alternatives) * 0.2));

    let recommendation = "Ignoring this problem is fine for the user. Do not build.";
    if (score > 80) recommendation = "Hair-on-fire problem. Build the MVP immediately.";
    else if (score > 60) recommendation = "Solid pain point. A well-executed solution will sell.";
    else if (score > 40) recommendation = "Minor annoyance. You will struggle to get users to pay.";

    const faqs = [
        { question: "Why measure emotional impact?", answer: "People buy impulsively to relieve emotional stress, not just financial loss." }
    ];

    const seoContent = (
        <>
            <h2>Quantifying Pain Points</h2>
            <p>Evaluating if a problem is a vitamin or a painkiller is crucial before writing code.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validator</Link></li>
                <li><Link href="/tools/idea-comparison-tool">Idea Comparison Tool</Link></li>
                <li><Link href="/tools/market-size-estimator">Market Size Estimator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Problem Severity Calculator" description="Is your problem a vitamin or a painkiller? Calculate its actual severity." slug="problem-severity-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Frequency of Problem: {frequency}/100</label>
                        <input type="range" min="0" max="100" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Cost of Ignoring: {cost}/100</label>
                        <input type="range" min="0" max="100" value={cost} onChange={(e) => setCost(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Emotional Impact: {emotion}/100</label>
                        <input type="range" min="0" max="100" value={emotion} onChange={(e) => setEmotion(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Quality of Existing Alternatives: {alternatives}/100</label>
                        <input type="range" min="0" max="100" value={alternatives} onChange={(e) => setAlternatives(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2">
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Urgency Score</h3>
                    <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--text-primary)", lineHeight: 1 }}>
                        {score} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>/ 100</span>
                    </div>

                    <div className="score-bar" style={{ marginTop: "1rem" }}>
                        <div className="score-fill" style={{ width: `${score}%`, backgroundColor: score >= 60 ? "var(--accent-primary)" : "var(--error-color)" }}></div>
                    </div>

                    <div style={{ marginTop: "3rem", backgroundColor: "var(--bg-tertiary)", padding: "1.5rem", borderRadius: "var(--radius-sm)" }}>
                        <div style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Recommendation</div>
                        <p style={{ color: "var(--text-primary)", lineHeight: 1.6, fontSize: "1.125rem" }}>{recommendation}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
