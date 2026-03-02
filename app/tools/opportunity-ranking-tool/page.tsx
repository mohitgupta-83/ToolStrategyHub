"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function OpportunityRankingTool() {
    const [opts, setOpts] = useState([{ id: 1, name: "Idea 1", market: 50, risk: 50, monetize: 50, comp: 50, execution: 50 }]);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("opportunity-ranking-tool");
            tracked.current = true;
        }
    }, []);

    const updateOpt = (id: number, field: string, value: string | number) => {
        setOpts(opts.map(o => o.id === id ? { ...o, [field]: value } : o));
    };

    const addOpt = () => {
        if (opts.length >= 3) return;
        setOpts([...opts, { id: Date.now(), name: "New Idea", market: 50, risk: 50, monetize: 50, comp: 50, execution: 50 }]);
    };

    const removeOpt = (id: number) => {
        setOpts(opts.filter(o => o.id !== id));
    };

    const scoredOpts = opts.map(o => {
        const score = Math.round((o.market * 0.25) + ((100 - o.risk) * 0.15) + (o.monetize * 0.25) + ((100 - o.comp) * 0.15) + ((100 - o.execution) * 0.2));
        return { ...o, score };
    }).sort((a, b) => b.score - a.score);

    const faqs = [
        { question: "Why compare internally?", answer: "Founders suffer from 'Shiny Object Syndrome'. Placing all ideas in one matrix forces you to acknowledge that executing Idea B means delaying the higher-ROAS Idea A." }
    ];

    const seoContent = (
        <>
            <h2>Defeating Shiny Object Syndrome</h2>
            <p>Every idea looks brilliant in isolation. Ranking them systematically exposes the fatal flaws of execution risk and bad monetization alignment.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/startup-readiness-score">Startup Readiness Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Opportunity Ranking Board" description="Rank multiple opportunities against one another." slug="opportunity-ranking-tool" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                    {scoredOpts.map((opt, idx) => (
                        <div key={opt.id} className="card stagger-1" style={{ border: idx === 0 ? "2px solid var(--accent-primary)" : "1px solid var(--border-color)", position: "relative" }}>
                            {idx === 0 && <div style={{ position: "absolute", top: "-10px", right: "20px", background: "var(--accent-primary)", color: "#000", padding: "2px 8px", fontSize: "0.75rem", fontWeight: "bold", borderRadius: "4px" }}>TOP PICK</div>}
                            <input type="text" value={opt.name} onChange={(e) => updateOpt(opt.id, 'name', e.target.value)} style={{ width: "100%", background: "transparent", color: "var(--text-primary)", fontSize: "1.25rem", fontWeight: "bold", border: "none", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }} />

                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}><span>Market Size</span><span>{opt.market}</span></div>
                                    <input type="range" min="0" max="100" value={opt.market} onChange={(e) => updateOpt(opt.id, 'market', Number(e.target.value))} style={{ width: "100%" }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}><span>Risk Level</span><span>{opt.risk}</span></div>
                                    <input type="range" min="0" max="100" value={opt.risk} onChange={(e) => updateOpt(opt.id, 'risk', Number(e.target.value))} style={{ width: "100%" }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}><span>Monetization</span><span>{opt.monetize}</span></div>
                                    <input type="range" min="0" max="100" value={opt.monetize} onChange={(e) => updateOpt(opt.id, 'monetize', Number(e.target.value))} style={{ width: "100%" }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}><span>Competition</span><span>{opt.comp}</span></div>
                                    <input type="range" min="0" max="100" value={opt.comp} onChange={(e) => updateOpt(opt.id, 'comp', Number(e.target.value))} style={{ width: "100%" }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}><span>Exec. Difficulty</span><span>{opt.execution}</span></div>
                                    <input type="range" min="0" max="100" value={opt.execution} onChange={(e) => updateOpt(opt.id, 'execution', Number(e.target.value))} style={{ width: "100%" }} />
                                </div>
                            </div>

                            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                <div style={{ fontSize: "2rem", fontFamily: "var(--font-mono)", fontWeight: "bold", color: idx === 0 ? "var(--accent-primary)" : "var(--text-primary)" }}>{opt.score}</div>
                                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Opportunity Score</div>
                            </div>
                            {opts.length > 1 && <button onClick={() => removeOpt(opt.id)} style={{ width: "100%", marginTop: "1rem", padding: "0.5rem", background: "transparent", color: "var(--error-color)", border: "1px solid var(--error-color)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Remove</button>}
                        </div>
                    ))}
                    {opts.length < 3 && (
                        <button onClick={addOpt} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.02)", border: "1px dashed var(--border-color)", cursor: "pointer", minHeight: "200px", color: "var(--text-secondary)", transition: "color 0.2s" }}>
                            + Add Opportunity
                        </button>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
