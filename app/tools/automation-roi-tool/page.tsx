"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function AutomationROITool() {
    const [manualHours, setManualHours] = useState(20);
    const [hourlyRate, setHourlyRate] = useState(50);
    const [setupCost, setSetupCost] = useState(5000);
    const [maintenance, setMaintenance] = useState(100);
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("automation-roi-tool");
            tracked.current = true;
        }
    }, []);

    const monthlyManualCost = manualHours * hourlyRate * 4.33;
    const annualSavings = (monthlyManualCost - maintenance) * 12;
    const paybackPeriod = setupCost / (monthlyManualCost - maintenance);
    const roi = ((annualSavings - setupCost) / setupCost) * 100;

    let recommendation = "Low Priority";
    if (paybackPeriod > 12) recommendation = "Do not automate. ROI is too slow.";
    else if (paybackPeriod > 6) recommendation = "Evaluate carefully. Marginal ROI.";
    else if (paybackPeriod > 0) recommendation = "High Priority. Automate immediately.";

    const faqs = [
        { question: "How do I calculate Manual Hours per Week?", answer: "Total the hours spent by every employee who performs the repetitive task each week." },
        { question: "Why include Maintenance Cost?", answer: "Automations break. API endpoints change. Always budget for software maintenance." }
    ];

    const seoContent = (
        <>
            <h2>Why Automation Isn't Always the Answer</h2>
            <p>Spending $10,000 to automate a task that costs $100 a month is a bad business decision. Use this tool to compute true ROI.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
                <li><Link href="/tools/workflow-cost-calculator">Workflow Cost Calculator</Link></li>
                <li><Link href="/tools/project-risk-predictor">Project Risk Predictor</Link></li>
                <li><Link href="/tools/task-complexity-estimator">Task Complexity Estimator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Automation ROI Tool" description="Calculate the payback period and financial return on your internal automation projects." slug="automation-roi-tool" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Manual Time Spent (Hours/Week)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{manualHours}</span>
                        </label>
                        <input type="range" min="1" max="100" value={manualHours} onChange={(e) => setManualHours(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Blended Employee Cost ($/Hour)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>${hourlyRate}</span>
                        </label>
                        <input type="range" min="15" max="250" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Automation Setup Cost ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>${setupCost}</span>
                        </label>
                        <input type="range" min="0" max="50000" step="500" value={setupCost} onChange={(e) => setSetupCost(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Maintenance Cost ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>${maintenance}</span>
                        </label>
                        <input type="range" min="0" max="5000" step="50" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 className="input-label">Projected Returns</h3>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>1-Year ROI</div>
                            <div style={{ fontSize: "2rem", color: roi > 0 ? "var(--accent-primary)" : "var(--error-color)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>{Math.round(roi)}%</div>
                        </div>
                        <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Payback Period</div>
                            <div style={{ fontSize: "2rem", color: paybackPeriod < 12 ? "var(--accent-primary)" : "var(--error-color)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>{paybackPeriod > 0 && paybackPeriod !== Infinity ? paybackPeriod.toFixed(1) : "N/A"}{paybackPeriod > 0 && paybackPeriod !== Infinity ? " mo" : ""}</div>
                        </div>
                    </div>

                    <div style={{ marginTop: "1rem", padding: "1.5rem", backgroundColor: paybackPeriod < 12 ? "rgba(35, 134, 255, 0.05)" : "rgba(239, 68, 68, 0.05)", borderRadius: "var(--radius-sm)", border: paybackPeriod < 12 ? "1px solid var(--accent-primary)" : "1px solid var(--error-color)" }}>
                        <div style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px", color: paybackPeriod < 12 ? "var(--accent-primary)" : "var(--error-color)", marginBottom: "0.5rem" }}>Recommendation</div>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6 }}>{recommendation}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
