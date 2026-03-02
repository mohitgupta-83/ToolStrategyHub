/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { trackUsage } from "@/lib/tracker";

interface Criterion {
    id: string;
    name: string;
    weight: number; // 1 to 5
}

interface Option {
    id: string;
    name: string;
    scores: Record<string, number>; // criterionId -> score (1 to 10)
}

export default function DecisionMatrixBuilder() {
    const [criteria, setCriteria] = useState<Criterion[]>([
        { id: "c1", name: "Cost", weight: 4 },
        { id: "c2", name: "Speed to Deploy", weight: 3 },
        { id: "c3", name: "Scalability", weight: 5 }
    ]);

    const [options, setOptions] = useState<Option[]>([
        { id: "o1", name: "Build Internal Tool", scores: { "c1": 8, "c2": 2, "c3": 9 } },
        { id: "o2", name: "Buy SaaS Off-The-Shelf", scores: { "c1": 4, "c2": 9, "c3": 6 } }
    ]);

    const [rankedOptions, setRankedOptions] = useState<{ option: Option, totalScore: number }[]>([]);
    const [confidence, setConfidence] = useState(0);

    const tracked = useRef(false);

    useEffect(() => {
        const scored = options.map(opt => {
            let totalScore = 0;
            criteria.forEach(c => {
                const score = opt.scores[c.id] || 0;
                totalScore += score * c.weight;
            });
            return { option: opt, totalScore };
        }).sort((a, b) => b.totalScore - a.totalScore);

        setRankedOptions(scored);

        // Calculate confidence (delta between #1 and #2 relative to max possible score)
        if (scored.length > 1 && criteria.length > 0) {
            const maxPossible = criteria.reduce((sum, c) => sum + (10 * c.weight), 0);
            const delta = scored[0].totalScore - scored[1].totalScore;
            // A delta of 15% of max possible score = 99% confident
            const conf = Math.min(99, Math.max(10, Math.round((delta / (maxPossible * 0.15)) * 100)));
            setConfidence(scored[0].totalScore === 0 ? 0 : conf);
        } else {
            setConfidence(0);
        }

        if (!tracked.current) {
            trackUsage("decision-matrix-builder");
            tracked.current = true;
        }
    }, [criteria, options]);

    const addCriterion = () => {
        setCriteria([...criteria, { id: Date.now().toString(), name: "New Criterion", weight: 3 }]);
    };
    const updateCriterion = (id: string, field: keyof Criterion, value: string | number) => {
        setCriteria(criteria.map(c => c.id === id ? { ...c, [field]: value } : c));
    };
    const removeCriterion = (id: string) => {
        setCriteria(criteria.filter(c => c.id !== id));
    };

    const addOption = () => {
        setOptions([...options, { id: Date.now().toString(), name: "New Option", scores: {} }]);
    };
    const updateOptionScore = (optId: string, critId: string, score: number) => {
        setOptions(options.map(o => o.id === optId ? { ...o, scores: { ...o.scores, [critId]: score } } : o));
    };
    const updateOptionName = (optId: string, name: string) => {
        setOptions(options.map(o => o.id === optId ? { ...o, name } : o));
    };
    const removeOption = (id: string) => {
        setOptions(options.filter(o => o.id !== id));
    };

    const faqs = [
        {
            question: "Why use a weighted matrix instead of a pro/con list?",
            answer: "A pro/con list treats all arguments equally. &apos;The system is slow&apos; (con) visually carries the same weight as &apos;It lacks dark mode&apos; (con). A weighted matrix algorithmically forces you to prioritize what actually matters to the business before evaluating the options."
        },
        {
            question: "What does the Confidence Score mean?",
            answer: "It measures the mathematical delta between your #1 choice and your #2 choice. If the confidence is 12%, you basically have a tie and need to add more criteria. If the confidence is 90%, the winning option is mathematically dominating the alternatives."
        }
    ];

    const seoContent = (
        <>
            <h2>Eliminating Executive Cognitive Bias</h2>
            <p>Humans are notoriously bad at making complex decisions. We typically choose based on emotion, sunk cost, or whoever spoke loudest in the meeting, and then reverse-engineer logic to justify the choice.</p>
            <h3>Forcing Objectivity</h3>
            <p>A multi-criteria decision matrix forces you to rank the importance of your &apos;needs&apos; completely independent of the available &apos;solutions&apos;. By assigning numerical weights (Multiplier) and strict scores (1-10), the winning path reveals itself purely through data.</p>
        </>
    );

    return (
        <ToolLayout
            title="Weighted Decision Matrix Builder"
            description="Make objective, bias-free decisions by scoring competing options against weighted criteria mathematically."
            slug="decision-matrix-builder"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div className="stagger-1" style={{ marginBottom: "3rem" }}>

                {/* Board Layout */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem", overflowX: "auto" }}>

                    {/* CRITERIA SECTION */}
                    <div className="card" style={{ padding: "2rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h3 style={{ fontSize: "1.25rem", color: "var(--accent-primary)" }}>1. Set Weighted Criteria</h3>
                            <button className="btn" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }} onClick={addCriterion}>+ Add Criterion</button>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                            {criteria.map((c, idx) => (
                                <div key={c.id} style={{ display: "flex", gap: "1rem", alignItems: "center", backgroundColor: "var(--bg-tertiary)", padding: "1rem", borderRadius: "8px" }}>
                                    <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", width: "20px" }}>{idx + 1}</div>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={c.name}
                                        onChange={(e) => updateCriterion(c.id, "name", e.target.value)}
                                        style={{ flex: 1, margin: 0 }}
                                        placeholder="e.g. Implementation Speed"
                                    />
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <label className="input-label" style={{ margin: 0 }}>Weight (1-5):</label>
                                        <select
                                            className="input-field"
                                            value={c.weight}
                                            onChange={(e) => updateCriterion(c.id, "weight", Number(e.target.value))}
                                            style={{ margin: 0, width: "80px" }}
                                        >
                                            {[1, 2, 3, 4, 5].map(w => <option key={w} value={w}>x{w}</option>)}
                                        </select>
                                    </div>
                                    <button onClick={() => removeCriterion(c.id)} style={{ background: "none", border: "none", color: "var(--error-color)", cursor: "pointer", fontSize: "1.25rem", padding: "0 0.5rem" }}>&times;</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* OPTIONS SECTION */}
                    <div className="card" style={{ padding: "2rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>2. Score Options (1-10)</h3>
                            <button className="btn" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }} onClick={addOption}>+ Add Option</button>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                            {options.map((opt) => (
                                <div key={opt.id} style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "1.5rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={opt.name}
                                            onChange={(e) => updateOptionName(opt.id, e.target.value)}
                                            style={{ margin: 0, fontWeight: "bold", borderBottom: "2px solid var(--accent-primary)", borderRadius: 0, padding: "0.25rem", backgroundColor: "transparent" }}
                                            placeholder="Option Name"
                                        />
                                        <button onClick={() => removeOption(opt.id)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>&times;</button>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                        {criteria.map(c => (
                                            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", flex: 1 }}>{c.name} <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>(x{c.weight})</span></span>
                                                <input
                                                    type="number"
                                                    min="0" max="10"
                                                    className="input-field"
                                                    value={opt.scores[c.id] || 0}
                                                    onChange={(e) => updateOptionScore(opt.id, c.id, Number(e.target.value))}
                                                    style={{ width: "60px", margin: 0, textAlign: "center", padding: "0.25rem" }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RESULTS SECTION */}
                    {rankedOptions.length > 0 && rankedOptions[0].totalScore > 0 && (
                        <div className="card stagger-2" style={{ borderColor: "var(--border-focus)", padding: "2rem", backgroundColor: "var(--bg-tertiary)" }}>
                            <h3 style={{ fontSize: "1.5rem", color: "var(--accent-primary)", marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "1px" }}>Algorithm Decision</h3>

                            <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px dashed var(--border-color)" }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Mathematical Winner</div>
                                    <div style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", color: "var(--text-primary)", lineHeight: 1 }}>
                                        {rankedOptions[0].option.name}
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Total Weighted Score</div>
                                    <div style={{ fontSize: "3rem", fontFamily: "var(--font-mono)", color: "var(--accent-primary)", lineHeight: 1 }}>
                                        {rankedOptions[0].totalScore}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
                                <div>
                                    <div className="input-label" style={{ marginBottom: "1rem" }}>Decision Confidence</div>
                                    <div style={{ fontSize: "2rem", color: confidence > 50 ? "var(--accent-primary)" : "var(--error-color)" }}>
                                        {confidence}%
                                    </div>
                                    <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.5rem", lineHeight: 1.5 }}>
                                        {confidence < 30 ? "Options are too close. Add more criteria to break the tie." : "Strong mathematical divergence. Recommendation is sound."}
                                    </p>
                                </div>

                                <div>
                                    <div className="input-label" style={{ marginBottom: "1rem" }}>Rankings</div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                        {rankedOptions.map((ro, idx) => (
                                            <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem", backgroundColor: idx === 0 ? "rgba(204, 255, 0, 0.05)" : "transparent", borderRadius: "4px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                                    <span style={{ color: idx === 0 ? "var(--accent-primary)" : "var(--text-muted)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>#{idx + 1}</span>
                                                    <span style={{ color: idx === 0 ? "var(--text-primary)" : "var(--text-secondary)" }}>{ro.option.name}</span>
                                                </div>
                                                <div style={{ fontFamily: "var(--font-mono)", color: idx === 0 ? "var(--accent-primary)" : "var(--text-muted)" }}>
                                                    {ro.totalScore} pts
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </ToolLayout>
    );
}
