"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function DeadlineConfidenceCalculator() {
    const [tasks, setTasks] = useState(50);
    const [daysLeft, setDaysLeft] = useState(14);
    const [velocity, setVelocity] = useState(3); // tasks per day
    const [riskBuffer, setRiskBuffer] = useState(20); // percent risk
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("deadline-confidence-calculator");
            tracked.current = true;
        }
    }, []);

    // required pace
    const requiredVelocity = tasks / daysLeft;
    const adjustedVelocityForRisk = velocity * (1 - (riskBuffer / 100)); // lower velocity based on risk
    const expectedDays = tasks / adjustedVelocityForRisk;

    let confidence = Math.round((daysLeft / expectedDays) * 100);
    if (confidence > 100) confidence = 100;
    if (isNaN(confidence) || confidence < 0) confidence = 0;

    let suggestion = "Safe to deploy. Minimal risk.";
    if (confidence < 50) suggestion = "Deadline failure is imminent. De-scope non-critical features today.";
    else if (confidence < 80) suggestion = "Deadline is at risk. Protect the team from any context switching or scope creep.";

    const faqs = [
        { question: "How does the risk buffer work?", answer: "It mathematically simulates 'Unknown Unknowns' by artificially depressing the team's historical velocity to account for integration errors or bugs." }
    ];

    const seoContent = (
        <>
            <h2>Why Deadlines Fail</h2>
            <p>A deadline fails because of the planning fallacy—the human tendency to assume the best possible path forward. Math is unbiased.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
                <li><Link href="/tools/team-capacity-planner">Team Capacity Planner</Link></li>
                <li><Link href="/tools/project-risk-predictor">Project Risk Predictor</Link></li>
                <li><Link href="/tools/project-time-estimator">Project Time Estimator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Deadline Confidence Calculator" description="Compute the mathematical probability of project delivery failure." slug="deadline-confidence-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Tasks / Points Remaining</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{tasks}</span>
                        </label>
                        <input type="range" min="1" max="200" value={tasks} onChange={(e) => setTasks(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Days Until Deadline</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{daysLeft}</span>
                        </label>
                        <input type="range" min="1" max="100" value={daysLeft} onChange={(e) => setDaysLeft(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Team Velocity (Tasks per Day)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{velocity}</span>
                        </label>
                        <input type="range" min="1" max="20" step="0.5" value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Unknowns / Risk Factor</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{riskBuffer}%</span>
                        </label>
                        <input type="range" min="0" max="50" value={riskBuffer} onChange={(e) => setRiskBuffer(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div>
                        <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Confidence Score</h3>
                        <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: confidence < 60 ? "var(--error-color)" : "var(--accent-primary)", lineHeight: 1 }}>
                            {confidence}%
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Required Velocity</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{requiredVelocity.toFixed(1)} tasks/day</div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Expected Delivery</div>
                            <div style={{ fontSize: "1.25rem", color: expectedDays > daysLeft ? "var(--error-color)" : "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{Math.ceil(expectedDays)} days</div>
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid ${confidence < 60 ? 'var(--error-color)' : 'var(--accent-primary)'}`, backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)" }}>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6 }}>{suggestion}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
