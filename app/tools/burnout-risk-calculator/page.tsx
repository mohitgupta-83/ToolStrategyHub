"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function BurnoutRiskCalculator() {
    const [hours, setHours] = useState(45);
    const [contextSwitching, setContextSwitching] = useState(50);
    const [agency, setAgency] = useState(50);
    const [deadlineStress, setDeadlineStress] = useState(50);
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("burnout-risk-calculator");
            tracked.current = true;
        }
    }, []);

    // 40 hours is baseline, every hour above increases risk linearly. 
    // Context switching causes heavy fatigue.
    // Lack of agency (autonomy) is a massive contributor to burnout.
    const overloadHours = Math.max(0, hours - 40);
    const score = Math.round((overloadHours * 1.5) + (contextSwitching * 0.3) + ((100 - agency) * 0.4) + (deadlineStress * 0.2));

    let riskLevel = "Healthy";
    let advice = "Workload is sustainable. Maintain current boundaries.";
    if (score > 85) {
        riskLevel = "Severe Burnout Imminent";
        advice = "Intervention required. You must force mandatory PTO and drastically reduce context switching.";
    } else if (score > 60) {
        riskLevel = "High Risk";
        advice = "Unsustainable pace. Decrease working hours and increase task autonomy.";
    } else if (score > 40) {
        riskLevel = "Moderate Fatigue";
        advice = "Minor warning signs. Optimize deep work blocks and ensure completely disconnected weekends.";
    }

    const faqs = [
        { question: "What is Lack of Agency?", answer: "Burnout is not just working long hours. It's working long hours while feeling like you have no control over your schedule or methods. High agency mitigates fatigue." }
    ];

    const seoContent = (
        <>
            <h2>The Mathematics of Employee Turnover</h2>
            <p>You lose massive institutional knowledge when a senior engineer quits due to burnout. Monitor psychological load, not just jira tickets.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
                <li><Link href="/tools/team-capacity-planner">Team Capacity Planner</Link></li>
                <li><Link href="/tools/automation-roi-tool">Automation ROI Tool</Link></li>
                <li><Link href="/tools/weekly-planning-tool">Weekly Planning Tool</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Burnout Risk Calculator" description="Compute the psychological drag coefficient on your team using task inputs." slug="burnout-risk-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Weekly Working Hours</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{hours}h</span>
                        </label>
                        <input type="range" min="30" max="80" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Context Switching (100 = Constant Interruptions)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{contextSwitching}</span>
                        </label>
                        <input type="range" min="0" max="100" value={contextSwitching} onChange={(e) => setContextSwitching(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Operational Agency (100 = Total Control)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{agency}</span>
                        </label>
                        <input type="range" min="0" max="100" value={agency} onChange={(e) => setAgency(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Higher agency reduces burnout risk.</div>
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Deadline Stress & Pressure</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{deadlineStress}</span>
                        </label>
                        <input type="range" min="0" max="100" value={deadlineStress} onChange={(e) => setDeadlineStress(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Burnout Risk Index</h3>
                    
                    <div style={{ position: "relative", width: "200px", height: "100px", overflow: "hidden", margin: "2rem 0" }}>
                        <div style={{ width: "200px", height: "200px", borderRadius: "50%", background: `conic-gradient(var(--error-color) ${Math.min(score, 100)}%, var(--bg-tertiary) 0)`, transition: "all 0.5s ease", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}></div>
                        <div style={{ position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", width: "160px", height: "80px", backgroundColor: "var(--bg-secondary)", borderRadius: "100px 100px 0 0", display: "flex", justifyContent: "center", alignItems: "flex-end", paddingBottom: "10px" }}>
                            <span style={{ fontSize: "3rem", fontFamily: "var(--font-mono)", fontWeight: "bold", color: score > 60 ? "var(--error-color)" : "var(--text-primary)", lineHeight: 1 }}>{Math.min(score, 100)}</span>
                        </div>
                    </div>

                    <div style={{ fontWeight: "bold", fontSize: "1.5rem", color: score > 60 ? "var(--error-color)" : "var(--accent-primary)", textAlign: "center", marginBottom: "1rem" }}>{riskLevel}</div>

                    <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem", lineHeight: 1.6, textAlign: "center", maxWidth: "80%" }}>
                        {advice}
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
}
