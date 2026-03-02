"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function TeamCapacityPlanner() {
    const [members, setMembers] = useState(5);
    const [weeklyHours, setWeeklyHours] = useState(40);
    const [projects, setProjects] = useState(3);
    const [hoursPerProject, setHoursPerProject] = useState(60);
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("team-capacity-planner");
            tracked.current = true;
        }
    }, []);

    const totalCapacity = members * weeklyHours * 0.8; // Assume 80% realistic utilization
    const totalLoad = projects * hoursPerProject;
    let utilization = Math.round((totalLoad / totalCapacity) * 100);
    if (isNaN(utilization) || utilization === Infinity) utilization = 0;

    let warning = "Capacity is healthy.";
    if (utilization > 100) warning = "CRITICAL OVERLOAD. The team will break. Projects will fail or developers will burn out.";
    else if (utilization > 85) warning = "High risk. No buffer for bug fixes or unexpected delays.";
    else if (utilization < 50) warning = "Underutilized team. Resources are being wasted.";

    const faqs = [
        { question: "Why assume 80% utilization?", answer: "Humans are not robots. Factoring 100% utilization ignores context switching, meetings, Slack messages, and biological breaks." }
    ];

    const seoContent = (
        <>
            <h2>Protecting Development Output</h2>
            <p>Overloading your team reduces velocity. It sounds counterintuitive, but a team assigned to 3 projects moves slower overall than a team focused on 1 due to continuous context switching penalties.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
                <li><Link href="/tools/burnout-risk-calculator">Burnout Risk Calculator</Link></li>
                <li><Link href="/tools/weekly-planning-tool">Weekly Planning Tool</Link></li>
                <li><Link href="/tools/project-time-estimator">Project Time Estimator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Team Capacity Planner" description="Measure true engineering throughput and avoid delivery failure." slug="team-capacity-planner" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Team Members</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{members}</span>
                        </label>
                        <input type="range" min="1" max="50" value={members} onChange={(e) => setMembers(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Weekly Hours Per Member</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{weeklyHours}h</span>
                        </label>
                        <input type="range" min="10" max="60" value={weeklyHours} onChange={(e) => setWeeklyHours(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Active Projects</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{projects}</span>
                        </label>
                        <input type="range" min="1" max="20" value={projects} onChange={(e) => setProjects(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Est. Avg Hours / Project / Week</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{hoursPerProject}h</span>
                        </label>
                        <input type="range" min="10" max="200" value={hoursPerProject} onChange={(e) => setHoursPerProject(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div>
                        <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Capacity Utilization Rate</h3>
                        <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: utilization > 90 ? "var(--error-color)" : "var(--accent-primary)", lineHeight: 1 }}>
                            {utilization}%
                        </div>
                    </div>
                    
                    <div className="score-bar" style={{ marginTop: "1rem" }}>
                        <div className="score-fill" style={{ width: `${Math.min(utilization, 100)}%`, backgroundColor: utilization > 90 ? "var(--error-color)" : "var(--accent-primary)" }}></div>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)", color: "var(--text-secondary)" }}>
                            <span>True Available Capacity (80% Util)</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{Math.round(totalCapacity)} hrs</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)", color: "var(--text-secondary)" }}>
                            <span>Total Workload Demand</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{totalLoad} hrs</strong>
                        </div>
                    </div>

                    <div style={{ marginTop: "1.5rem", padding: "1.5rem", backgroundColor: utilization > 90 ? "rgba(239, 68, 68, 0.05)" : "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: utilization > 90 ? "1px solid var(--error-color)" : "1px solid var(--border-color)" }}>
                        <p style={{ color: utilization > 90 ? "var(--error-color)" : "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6, fontWeight: utilization > 100 ? "bold" : "normal" }}>
                            {warning}
                        </p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
