"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function MVPScopeCalculator() {
    const [features, setFeatures] = useState(10);
    const [complexity, setComplexity] = useState(50);
    const [team, setTeam] = useState(1);
    const [timeline, setTimeline] = useState(4); // weeks
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("mvp-scope-calculator");
            tracked.current = true;
        }
    }, []);

    const capacity = team * timeline * 10;
    const required = features * (complexity / 10);

    let ratio = Math.min((capacity / required) * 100, 100);
    if (isNaN(ratio)) ratio = 0;

    let recommendation = "";
    if (ratio >= 100) recommendation = "Scope looks safe. Proceed to build.";
    else if (ratio >= 60) recommendation = "Aggressive scope. You must cut 20-30% of features to hit timelines.";
    else recommendation = "Scope creep alert. You have planned a monolith, not an MVP. Reduce features immediately.";

    const faqs = [
        { question: "What defines an MVP?", answer: "A Minimum Viable Product is the bare minimum amount of engineering required to prove a user will pay for your solution." }
    ];

    const seoContent = (
        <>
            <h2>Preventing Scope Creep</h2>
            <p>Every developer wants to build a monolith. Force constraints to launch within 30 days.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
                <li><Link href="/tools/audience-persona-builder">Audience Persona Builder</Link></li>
                <li><Link href="/tools/feature-priority-matrix">Feature Priority Matrix</Link></li>
                <li><Link href="/tools/project-time-estimator">Project Time Estimator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="MVP Scope Calculator" description="Match your feature ambitions against your actual bandwidth." slug="mvp-scope-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Core Feature Count</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{features}</span>
                        </label>
                        <input type="range" min="1" max="50" value={features} onChange={(e) => setFeatures(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Average Complexity</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{complexity}/100</span>
                        </label>
                        <input type="range" min="1" max="100" value={complexity} onChange={(e) => setComplexity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Team Size (Engineers)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{team}</span>
                        </label>
                        <input type="range" min="1" max="10" value={team} onChange={(e) => setTeam(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Timeline Pressure (Weeks)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{timeline} weeks</span>
                        </label>
                        <input type="range" min="1" max="52" value={timeline} onChange={(e) => setTimeline(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2">
                    <h3 className="input-label" style={{ marginBottom: "1.5rem" }}>Scope Feasibility vs Bandwidth</h3>

                    <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: ratio < 60 ? "var(--error-color)" : "var(--accent-primary)", lineHeight: 1 }}>
                        {Math.round(ratio)}<span style={{ fontSize: "2rem" }}>%</span>
                    </div>

                    <div className="score-bar" style={{ marginTop: "1rem" }}>
                        <div className="score-fill" style={{ width: `${ratio}%`, backgroundColor: ratio < 60 ? "var(--error-color)" : "var(--accent-primary)" }}></div>
                    </div>

                    <p style={{ marginTop: "3rem", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6 }}>
                        {recommendation}
                    </p>
                </div>
            </div>
        </ToolLayout >
    );
}
