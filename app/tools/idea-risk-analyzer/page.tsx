"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function IdeaRiskAnalyzer() {
    const [tech, setTech] = useState(50);
    const [market, setMarket] = useState(50);
    const [financial, setFinancial] = useState(50);
    const [execution, setExecution] = useState(50);
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("idea-risk-analyzer");
            tracked.current = true;
        }
    }, []);

    const totalRisk = Math.round((tech * 0.2) + (market * 0.4) + (financial * 0.1) + (execution * 0.3));

    let riskLevel = "Extreme Risk";
    if (totalRisk < 30) riskLevel = "Low Risk";
    else if (totalRisk < 60) riskLevel = "Moderate Risk";
    else if (totalRisk < 80) riskLevel = "High Risk";

    const faqs = [
        { question: "What is Market Risk?", answer: "The risk that even if you build the product flawlessly, nobody wants to buy it. This is the killer of most startups." },
        { question: "Why is Tech Risk weighted lower?", answer: "In software, execution and distribution usually fail before the underlying technology fails. Most apps aren't pushing boundaries in computer science, they are just CRUD wrappers." }
    ];

    const seoContent = (
        <>
            <h2>De-Risking Your Pipeline</h2>
            <p>Entrepreneurs are risk-tolerant, but they shouldn't be gambling blind. Understand what will kill your idea first.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
                <li><Link href="/tools/business-model-selector">Business Model Selector</Link></li>
                <li><Link href="/tools/idea-comparison-tool">Idea Comparison Tool</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Idea Risk Analyzer" description="Identify the weak points in your startup thesis." slug="idea-risk-analyzer" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Technical Risk (Can it be built?)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{tech}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={tech} onChange={(e) => setTech(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Market Risk (Will they buy it?)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{market}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={market} onChange={(e) => setMarket(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Execution/Distribution Risk</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{execution}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={execution} onChange={(e) => setExecution(Number(e.target.value))} />
                        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Can we actually reach them?</div>
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Financial Risk (Runway limits)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{financial}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={financial} onChange={(e) => setFinancial(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "1rem" }}>Overall Risk Assessment</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: totalRisk >= 60 ? "var(--error-color)" : "var(--accent-primary)", lineHeight: 1 }}>{totalRisk}</div>
                    <div style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "1.5rem", color: "var(--text-primary)" }}>{riskLevel}</div>

                    <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "var(--bg-tertiary)", padding: "1.5rem", borderRadius: "var(--radius-sm)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                            <div style={{ width: "100px", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: "bold" }}>Market:</div>
                            <div className="score-bar" style={{ flex: 1, height: "12px" }}>
                                <div className="score-fill" style={{ width: `${market}%`, backgroundColor: market > 60 ? "var(--error-color)" : "var(--text-secondary)" }}></div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                            <div style={{ width: "100px", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: "bold" }}>Execution:</div>
                            <div className="score-bar" style={{ flex: 1, height: "12px" }}>
                                <div className="score-fill" style={{ width: `${execution}%`, backgroundColor: execution > 60 ? "var(--error-color)" : "var(--text-secondary)" }}></div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                            <div style={{ width: "100px", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: "bold" }}>Tech:</div>
                            <div className="score-bar" style={{ flex: 1, height: "12px" }}>
                                <div className="score-fill" style={{ width: `${tech}%`, backgroundColor: tech > 60 ? "var(--error-color)" : "var(--text-secondary)" }}></div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </ToolLayout >
    );
}
