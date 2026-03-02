"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function AudiencePersonaBuilder() {
    const [industry, setIndustry] = useState("Technology");
    const [skill, setSkill] = useState("Intermediate");
    const [income, setIncome] = useState("$50k - $100k");
    const [goals, setGoals] = useState("Save time on manual tasks.");
    const [frustrations, setFrustrations] = useState("Current tools are too bloated and slow.");
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("audience-persona-builder");
            tracked.current = true;
        }
    }, []);

    const faqs = [
        { question: "Why do I need a persona?", answer: "Personas help teams make empathetic product decisions rather than engineering-driven decisions." }
    ];

    const handlePrint = () => {
        window.print();
    };

    const seoContent = (
        <>
            <h2>Modeling Your Target User</h2>
            <p>A good persona highlights what a user hates, not just their demographic information.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
                <li><Link href="/tools/market-size-estimator">Market Size Estimator</Link></li>
                <li><Link href="/tools/mvp-scope-calculator">MVP Scope Calculator</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Audience Persona Builder" description="Quickly map out the precise characteristics of your target buyer." slug="audience-persona-builder" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Industry / Niche</label>
                        <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Skill Level</label>
                        <select value={skill} onChange={(e) => setSkill(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option>Beginner / Novice</option>
                            <option>Intermediate</option>
                            <option>Advanced / Expert</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Income / Budget Range</label>
                        <input type="text" value={income} onChange={(e) => setIncome(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Main Goals (What are they trying to achieve?)</label>
                        <textarea rows={3} value={goals} onChange={(e) => setGoals(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Biggest Frustrations</label>
                        <textarea rows={3} value={frustrations} onChange={(e) => setFrustrations(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>Persona Profile Target</h3>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div>
                            <div className="input-label" style={{ marginBottom: "0.25rem" }}>Industry Profile</div>
                            <div style={{ color: "var(--text-primary)", fontWeight: "bold", fontSize: "1.125rem" }}>{industry} • {skill}</div>
                        </div>
                        <div>
                            <div className="input-label" style={{ marginBottom: "0.25rem" }}>Budget / Tier</div>
                            <div style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)", fontSize: "1.125rem", fontWeight: "bold" }}>{income}</div>
                        </div>
                        <div style={{ padding: "1.5rem", backgroundColor: "rgba(35, 134, 255, 0.05)", borderRadius: "var(--radius-sm)", borderLeft: "4px solid var(--accent-primary)" }}>
                            <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Primary Objective</div>
                            <div style={{ color: "var(--text-primary)", fontStyle: "italic", fontSize: "1.125rem" }}>"{goals}"</div>
                        </div>
                        <div style={{ padding: "1.5rem", backgroundColor: "rgba(239, 68, 68, 0.05)", borderRadius: "var(--radius-sm)", borderLeft: "4px solid var(--error-color)" }}>
                            <div className="input-label" style={{ color: "var(--error-color)", marginBottom: "0.5rem" }}>Core Pain Point</div>
                            <div style={{ color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.5 }}>{frustrations}</div>
                        </div>
                    </div>

                    <button onClick={handlePrint} className="pill hover:border-accent" style={{ marginTop: "2rem", width: "100%", textAlign: "center", cursor: "pointer", background: "var(--bg-tertiary)" }}>
                        Export Print Summary
                    </button>
                </div>
            </div>
        </ToolLayout>
    );
}
