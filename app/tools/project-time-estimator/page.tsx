/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { trackUsage } from "@/lib/tracker";

interface EstimationResult {
    baseDays: number;
    bufferedDays: number;
    confidenceLevel: number;
    riskIndicator: string;
}

export default function ProjectTimeEstimator() {
    const [complexity, setComplexity] = useState(5);
    const [teamSize, setTeamSize] = useState(2);
    const [experienceMultiplier, setExperienceMultiplier] = useState(1.0);
    const [uncertaintyBuffer, setUncertaintyBuffer] = useState(30);

    const [result, setResult] = useState<EstimationResult | null>(null);
    const tracked = useRef(false);

    useEffect(() => {
        // Pseudo-algorithmic scoring
        // Base days assumes 1 complexity point = 2 days of work for 1 average dev
        const totalWorkDays = (complexity * 2) / experienceMultiplier;

        // Team size doesn't scale perfectly linearly (Brooks's Law)
        // 1 dev = 1 divisor, 2 devs = 1.8 divisor, 3 devs = 2.4 divisor, etc.
        const communicationOverhead = Math.log(teamSize + 1);
        const effectiveTeamSize = teamSize / communicationOverhead;

        const baseDays = totalWorkDays / effectiveTeamSize;
        const bufferedDays = baseDays * (1 + (uncertaintyBuffer / 100));

        // Confidence calculation
        let confidenceLevel = 100 - (uncertaintyBuffer * 0.8) - (complexity * 2) + Math.min((experienceMultiplier - 1) * 30, 20);
        confidenceLevel = Math.max(10, Math.min(99, Math.round(confidenceLevel)));

        let riskIndicator = "Low";
        if (complexity > 7 || uncertaintyBuffer > 40) riskIndicator = "High";
        else if (complexity > 5 || uncertaintyBuffer > 25) riskIndicator = "Moderate";

        setResult({ baseDays, bufferedDays, confidenceLevel, riskIndicator });

        if (!tracked.current) {
            trackUsage("project-time-estimator");
            tracked.current = true;
        }
    }, [complexity, teamSize, experienceMultiplier, uncertaintyBuffer]);

    const faqs = [
        {
            question: "Why does adding more developers decrease efficiency?",
            answer: "According to Brooks&apos;s law, &apos;adding human resources to a late software project makes it later.&apos; Our algorithm mathematically discounts the efficiency of each additional team member due to unavoidable communication overhead and integration complexity."
        },
        {
            question: "Why should the buffer increase with complexity?",
            answer: "Complexity does not scale linearly. A complexity 8 task is not twice as hard as an 4 task; it likely contains exponential edge cases. The uncertainty buffer protects you against &apos;unknown unknowns&apos; during system integration."
        }
    ];

    const seoContent = (
        <>
            <h2>Why Your Software Estimates are Always Wrong</h2>
            <p>Engineers estimate based on &apos;happy path&apos; thinking. They imagine typing the code perfectly on a Tuesday morning without interruptions. They forget code reviews, CI/CD pipeline failures, and changing client requirements.</p>
            <h3>The Contingency Architecture</h3>
            <p>Professional project management requires explicitly buffering for the unknown. When you provide a delivery date, you must provide a mathematical confidence rating attached to that date (e.g., &apos;We are 85% confident in an 8-week delivery&apos;).</p>
        </>
    );

    return (
        <ToolLayout
            title="Project Time Estimation Calculator"
            description="Generate realistic software project timelines by factoring in Brooks&apos;s law, team velocity, and dynamic uncertainty buffers."
            slug="project-time-estimator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Task Ecosystem Complexity</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{complexity}/10</span>
                        </div>
                        <input type="range" min="1" max="10" value={complexity} onChange={(e) => setComplexity(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>1=Text Change, 10=Distributed Microservices</div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Active Team Size</label>
                        <input type="number" min="1" max="20" className="input-field" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value) || 1)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Team Experience Level</label>
                        <select className="input-field" value={experienceMultiplier} onChange={(e) => setExperienceMultiplier(Number(e.target.value))}>
                            <option value={0.7}>Junior / Unfamiliar with codebase</option>
                            <option value={1.0}>Mid-level / Average context</option>
                            <option value={1.5}>Senior / Domain Experts</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Uncertainty Buffer (Integration Risk)</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{uncertaintyBuffer}%</span>
                        </div>
                        <input type="range" min="0" max="100" step="5" value={uncertaintyBuffer} onChange={(e) => setUncertaintyBuffer(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>Minimum 30% recommended for greenfield projects</div>
                    </div>

                </div>

                {result && (
                    <div className="stagger-2">
                        <div className="card" style={{ borderColor: result.riskIndicator === "High" ? "var(--error-color)" : "var(--border-focus)" }}>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px dashed var(--border-color)" }}>
                                <div>
                                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Buffered Timeline</div>
                                    <div style={{ fontSize: "3.5rem", fontFamily: "var(--font-serif)", color: "var(--accent-primary)", lineHeight: 1 }}>
                                        {result.bufferedDays < 1 ? "< 1" : Math.ceil(result.bufferedDays)} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>Days</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: "right", paddingBottom: "0.5rem" }}>
                                    <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Optimistic Base</div>
                                    <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{Math.ceil(result.baseDays)} Days</div>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div style={{ backgroundColor: "var(--bg-tertiary)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                                    <div className="input-label" style={{ marginBottom: "1rem" }}>Delivery Confidence</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <div style={{ fontSize: "2rem", fontFamily: "var(--font-mono)", color: result.confidenceLevel > 70 ? "var(--accent-primary)" : "var(--error-color)" }}>
                                            {result.confidenceLevel}%
                                        </div>
                                    </div>
                                    <div className="score-bar" style={{ marginTop: "1rem", height: "4px" }}>
                                        <div className="score-fill" style={{ width: `${result.confidenceLevel}%`, backgroundColor: result.confidenceLevel > 70 ? "var(--accent-primary)" : "var(--error-color)" }}></div>
                                    </div>
                                </div>

                                <div style={{ backgroundColor: "var(--bg-tertiary)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                                    <div className="input-label" style={{ marginBottom: "1rem" }}>Complexity Risk</div>
                                    <div className="pill" style={{
                                        margin: 0,
                                        backgroundColor: result.riskIndicator === "High" ? "rgba(255, 50, 50, 0.1)" : "var(--bg-secondary)",
                                        color: result.riskIndicator === "High" ? "var(--error-color)" : "var(--text-primary)"
                                    }}>
                                        {result.riskIndicator}
                                    </div>
                                    {result.riskIndicator === "High" && (
                                        <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "1rem", lineHeight: 1.4 }}>
                                            Warning: High complexity scores drastically reduce estimation accuracy. Break this task down before promising delivery.
                                        </p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </ToolLayout >
    );
}
