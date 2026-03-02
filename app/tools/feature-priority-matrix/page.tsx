"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function FeaturePriorityMatrix() {
    const [features, setFeatures] = useState([{ id: 1, name: "Login System", impact: 80, effort: 30 }]);
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("feature-priority-matrix");
            tracked.current = true;
        }
    }, []);

    const addFeature = () => {
        const id = features.length ? Math.max(...features.map(f => f.id)) + 1 : 1;
        setFeatures([...features, { id, name: `Feature ${id}`, impact: 50, effort: 50 }]);
    };

    const updateFeature = (id: number, field: string, value: number | string) => {
        setFeatures(features.map(f => f.id === id ? { ...f, [field]: value } : f));
    };

    const removeFeature = (id: number) => {
        setFeatures(features.filter(f => f.id !== id));
    };

    const sorted = [...features].sort((a, b) => {
        const scoreA = a.impact / (a.effort || 1);
        const scoreB = b.impact / (b.effort || 1);
        return scoreB - scoreA;
    });

    const faqs = [
        { question: "What is an Impact/Effort matrix?", answer: "It is a 2x2 grid that helps you maximize ROI by finding high-impact, low-effort tasks ('quick wins')." }
    ];

    const seoContent = (
        <>
            <h2>Roadmap Prioritization</h2>
            <p>Do not build the hardest features first. Build the features that deliver the most value for the least amount of effort.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
                <li><Link href="/tools/mvp-scope-calculator">MVP Scope Calculator</Link></li>
                <li><Link href="/tools/product-market-fit-score">Product-Market Fit Score</Link></li>
                <li><Link href="/tools/decision-matrix-builder">Decision Matrix Builder</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Feature Priority Matrix" description="Find the high-impact quick wins in your feature backlog." slug="feature-priority-matrix" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className="stagger-1">
                    {features.map((f) => (
                        <div key={f.id} className="card" style={{ padding: "1.5rem", position: "relative" }}>
                            {features.length > 1 && (
                                <button onClick={() => removeFeature(f.id)} style={{ position: "absolute", top: "1rem", right: "1rem", color: "var(--error-color)", background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem" }}>×</button>
                            )}
                            <input
                                type="text"
                                value={f.name}
                                onChange={(e) => updateFeature(f.id, "name", e.target.value)}
                                style={{ width: "100%", padding: "0.75rem", marginBottom: "1.5rem", backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "1.125rem" }}
                            />
                            <div style={{ display: "flex", gap: "2rem" }}>
                                <div style={{ flex: 1 }}>
                                    <label className="input-label" style={{ fontSize: "0.875rem", display: "flex", justifyContent: "space-between" }}>
                                        <span>Impact</span>
                                        <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{f.impact}</span>
                                    </label>
                                    <input type="range" min="1" max="100" value={f.impact} onChange={(e) => updateFeature(f.id, "impact", Number(e.target.value))} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label className="input-label" style={{ fontSize: "0.875rem", display: "flex", justifyContent: "space-between" }}>
                                        <span>Effort</span>
                                        <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{f.effort}</span>
                                    </label>
                                    <input type="range" min="1" max="100" value={f.effort} onChange={(e) => updateFeature(f.id, "effort", Number(e.target.value))} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={addFeature} className="pill hover:border-accent" style={{ cursor: "pointer", alignSelf: "flex-start", padding: "1rem 2rem", background: "var(--bg-secondary)" }}>+ Add Feature</button>
                </div>

                <div className="card stagger-2 sticky" style={{ top: "2rem" }}>
                    <h3 className="input-label" style={{ marginBottom: "1.5rem" }}>Prioritized Roadmap</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {sorted.map((f, i) => {
                            const ratio = (f.impact / (f.effort || 1)).toFixed(2);
                            return (
                                <div key={f.id} style={{ display: "flex", justifyContent: "space-between", padding: "1.25rem", backgroundColor: i === 0 ? "rgba(35, 134, 255, 0.1)" : "var(--bg-tertiary)", border: i === 0 ? "1px solid var(--accent-primary)" : "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", transition: "all 0.2s" }}>
                                    <div style={{ color: "var(--text-primary)", fontWeight: i === 0 ? "bold" : "normal", fontSize: "1.125rem" }}>{i + 1}. {f.name}</div>
                                    <div style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: "bold" }}>{ratio}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
