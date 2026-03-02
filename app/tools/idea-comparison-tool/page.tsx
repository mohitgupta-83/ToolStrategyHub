"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function IdeaComparisonTool() {
    const [ideas, setIdeas] = useState([{ id: 1, name: "Idea 1", marketSize: 50, difficulty: 50, revenue: 50, speed: 50 }]);
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("idea-comparison-tool");
            tracked.current = true;
        }
    }, []);

    const addIdea = () => {
        const id = ideas.length ? Math.max(...ideas.map(i => i.id)) + 1 : 1;
        setIdeas([...ideas, { id, name: `Idea ${id}`, marketSize: 50, difficulty: 50, revenue: 50, speed: 50 }]);
    };

    const updateIdea = (id: number, field: string, value: number | string) => {
        setIdeas(ideas.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const removeIdea = (id: number) => {
        setIdeas(ideas.filter(i => i.id !== id));
    };

    const scoredIdeas = ideas.map(i => {
        const score = Math.round((i.marketSize * 0.3) + ((100 - i.difficulty) * 0.2) + (i.revenue * 0.3) + (i.speed * 0.2));
        return { ...i, score };
    }).sort((a, b) => b.score - a.score);

    const bestIdea = scoredIdeas[0];

    const faqs = [
        { question: "How does the comparison scoring work?", answer: "We use a weighted algorithm that heavily favors market size and revenue potential, while penalizing difficulty. Speed to launch acts as a momentum multiplier." },
        { question: "Why penalize difficulty?", answer: "Capital efficiency relies on rapid iteration. Complex products die in development before reaching the market." }
    ];

    const seoContent = (
        <>
            <h2>Objective Idea Evaluation</h2>
            <p>Every founder thinks their latest idea is their best. This tool mitigates recency bias by forcing you to grade concepts on identical variables.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validator</Link></li>
                <li><Link href="/tools/problem-severity-calculator">Problem Severity Calculator</Link></li>
                <li><Link href="/tools/idea-risk-analyzer">Idea Risk Analyzer</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Idea Comparison Tool" description="Rank multiple ideas side-by-side to find the ultimate winner." slug="idea-comparison-tool" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                    {ideas.map((idea) => (
                        <div key={idea.id} className="card stagger-1" style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {ideas.length > 1 && (
                                <button onClick={() => removeIdea(idea.id)} style={{ position: "absolute", top: "1rem", right: "1rem", color: "var(--error-color)", background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem" }}>×</button>
                            )}
                            <input type="text" value={idea.name} onChange={(e) => updateIdea(idea.id, "name", e.target.value)} style={{ width: "100%", fontSize: "1.25rem", padding: "0.5rem", backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)" }} />

                            <div className="input-group">
                                <label className="input-label">Market Size: {idea.marketSize}</label>
                                <input type="range" min="0" max="100" value={idea.marketSize} onChange={(e) => updateIdea(idea.id, "marketSize", Number(e.target.value))} />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Difficulty: {idea.difficulty}</label>
                                <input type="range" min="0" max="100" value={idea.difficulty} onChange={(e) => updateIdea(idea.id, "difficulty", Number(e.target.value))} />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Revenue Potential: {idea.revenue}</label>
                                <input type="range" min="0" max="100" value={idea.revenue} onChange={(e) => updateIdea(idea.id, "revenue", Number(e.target.value))} />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Speed to Launch: {idea.speed}</label>
                                <input type="range" min="0" max="100" value={idea.speed} onChange={(e) => updateIdea(idea.id, "speed", Number(e.target.value))} />
                            </div>
                        </div>
                    ))}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--border-color)", borderRadius: "var(--radius-md)" }}>
                        <button onClick={addIdea} className="pill hover:border-accent" style={{ cursor: "pointer", fontSize: "1rem", padding: "1rem 2rem", background: "var(--bg-secondary)" }}>+ Add Another Idea</button>
                    </div>
                </div>

                <div className="card stagger-2">
                    <h3 className="input-label" style={{ marginBottom: "1.5rem" }}>Ranked Results</h3>
                    {bestIdea && (
                        <div style={{ marginBottom: "2rem", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)" }}>
                            <div style={{ color: "var(--accent-primary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Top Recommendation</div>
                            <div style={{ fontSize: "2.5rem", color: "var(--text-primary)", fontWeight: "bold" }}>{bestIdea.name}</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-secondary)" }}>Score: {bestIdea.score}/100</div>
                        </div>
                    )}

                    <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                                <th style={{ padding: "1rem 0" }}>Rank</th>
                                <th>Idea</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoredIdeas.map((idea, index) => (
                                <tr key={idea.id} style={{ borderBottom: "1px dashed var(--border-color)" }}>
                                    <td style={{ padding: "1rem 0", color: index === 0 ? "var(--accent-primary)" : "var(--text-secondary)", fontWeight: "bold" }}>#{index + 1}</td>
                                    <td style={{ fontWeight: index === 0 ? "bold" : "normal" }}>{idea.name}</td>
                                    <td style={{ fontFamily: "var(--font-mono)" }}>{idea.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ToolLayout>
    );
}
