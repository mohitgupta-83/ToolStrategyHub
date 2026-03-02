"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function TaskComplexityEstimator() {
    const [dependencies, setDependencies] = useState(2); // 1-5
    const [logic, setLogic] = useState(2); // 1-5
    const [testing, setTesting] = useState(2); // 1-5
    const [clarity, setClarity] = useState(4); // 1-5 (inverted meaning for score)
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("task-complexity-estimator");
            tracked.current = true;
        }
    }, []);

    // Max score calculation: (5 + 5 + 5 + 5)
    // Clarity is inverted, low clarity = high complexity
    const score = dependencies + logic + testing + (6 - clarity); 

    let estimatedPoints = 1;
    let strategy = "Assign to junior. Simple isolated task.";
    if (score >= 18) {
        estimatedPoints = 13;
        strategy = "Epic-level complexity. Break this task down into 3+ smaller tickets before beginning work.";
    } else if (score >= 14) {
        estimatedPoints = 8;
        strategy = "High complexity. Requires a senior developer and potentially multiple days of focus.";
    } else if (score >= 10) {
        estimatedPoints = 5;
        strategy = "Standard complex feature. Needs dedicated testing and clear architecture before coding.";
    } else if (score >= 7) {
        estimatedPoints = 3;
        strategy = "Moderate task. Isolated logic but requires some architectural hooks.";
    }

    const labels = ["Trivial", "Low", "Moderate", "High", "Extreme"];

    const faqs = [
        { question: "Why use Fibonacci for story points?", answer: "Fibonacci (1, 2, 3, 5, 8, 13) prevents artificial precision. A task is roughly a 5 or an 8. It's never exactly a 6.7. This acknowledges uncertainty in software." }
    ];

    const seoContent = (
        <>
            <h2>Estimating Complexity Instead of Time</h2>
            <p>Humans are bad at estimating hours, but good at relative sizing. By grading a task on logic, testing, and dependencies, you derive a realistic Fibonacci complexity point assignment.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
                <li><Link href="/tools/project-time-estimator">Project Time Estimator</Link></li>
                <li><Link href="/tools/decision-matrix-builder">Decision Matrix Builder</Link></li>
                <li><Link href="/tools/weekly-planning-tool">Weekly Planning Tool</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Task Complexity Estimator" description="Standardize story pointing by evaluating structural task complexity." slug="task-complexity-estimator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>System Dependencies</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{labels[dependencies - 1]}</span>
                        </label>
                        <input type="range" min="1" max="5" value={dependencies} onChange={(e) => setDependencies(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Algorithmic / Business Logic</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{labels[logic - 1]}</span>
                        </label>
                        <input type="range" min="1" max="5" value={logic} onChange={(e) => setLogic(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Testing Effort / QA Scope</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{labels[testing - 1]}</span>
                        </label>
                        <input type="range" min="1" max="5" value={testing} onChange={(e) => setTesting(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Requirement Clarity</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{labels[clarity - 1]}</span>
                        </label>
                        <input type="range" min="1" max="5" value={clarity} onChange={(e) => setClarity(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Higher clarity reduces task complexity.</div>
                    </div>
                </div>

                <div className="card stagger-2" style={{ backgroundColor: "var(--bg-secondary)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "1rem" }}>Calculated Story Points</h3>
                    <div style={{ fontSize: "8rem", fontFamily: "var(--font-mono)", color: "var(--accent-primary)", lineHeight: 1, fontWeight: "bold" }}>{estimatedPoints}</div>
                    <div style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "1.25rem", letterSpacing: "2px", textTransform: "uppercase" }}>Points</div>
                    
                    <div style={{ marginTop: "3rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6 }}>{strategy}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
