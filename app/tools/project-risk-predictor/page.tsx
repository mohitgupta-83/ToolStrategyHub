"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ProjectRiskPredictor() {
    const [scopeClarity, setScopeClarity] = useState(50);
    const [teamExp, setTeamExp] = useState(50);
    const [deadline, setDeadline] = useState(50);
    const [techUncertainty, setTechUncertainty] = useState(50);
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("project-risk-predictor");
            tracked.current = true;
        }
    }, []);

    const riskScore = Math.round(((100 - scopeClarity) * 0.35) + ((100 - teamExp) * 0.2) + (deadline * 0.25) + (techUncertainty * 0.2));

    let riskCategory = "Extreme Risk";
    let mitigation = "Halt progress. Redefine scope or delay deadline.";
    if (riskScore < 30) {
        riskCategory = "Low Risk";
        mitigation = "Project is healthy. Continue monitoring.";
    } else if (riskScore < 60) {
        riskCategory = "Moderate Risk";
        mitigation = "Standard project. Add a 10-15% time buffer.";
    } else if (riskScore < 80) {
        riskCategory = "High Risk";
        mitigation = "Significant chance of failure. Cut scope and simplify tech constraints immediately.";
    }

    const faqs = [
        { question: "What is Scope Clarity?", answer: "How well the requirements are documented and understood by both stakeholders and developers." }
    ];

    const seoContent = (
        <>
            <h2>Preventing Project Failure</h2>
            <p>Measure risk objectively before committing resources. Poor scope clarity combined with tight deadlines creates guaranteed failure.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
                <li><Link href="/tools/project-time-estimator">Project Time Estimator</Link></li>
                <li><Link href="/tools/deadline-confidence-calculator">Deadline Confidence Calculator</Link></li>
                <li><Link href="/tools/task-complexity-estimator">Task Complexity Estimator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Project Risk Predictor" description="Synthesize qualitative project variables into a rigid risk index." slug="project-risk-predictor" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Scope Clarity (100 = Perfect documentation)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{scopeClarity}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={scopeClarity} onChange={(e) => setScopeClarity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Team Domain Experience</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{teamExp}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={teamExp} onChange={(e) => setTeamExp(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Deadline Pressure (100 = Impossible)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{deadline}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={deadline} onChange={(e) => setDeadline(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Technical Uncertainty (100 = Unproven tech)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{techUncertainty}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={techUncertainty} onChange={(e) => setTechUncertainty(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <h3 className="input-label" style={{ marginBottom: "1rem" }}>Systemic Risk Score</h3>
                        <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: riskScore >= 60 ? "var(--error-color)" : "var(--accent-primary)", lineHeight: 1 }}>{riskScore}</div>
                        <div style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "1.5rem", color: riskScore >= 60 ? "var(--error-color)" : "var(--text-primary)" }}>{riskCategory}</div>
                    </div>
                    
                    <div style={{ marginTop: "3rem", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                        <div style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Recommended Mitigation</div>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6 }}>{mitigation}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
