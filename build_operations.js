const fs = require('fs');
const path = require('path');

const PROJECT_DIR = process.cwd();

const newTools = [
    {
        name: "Automation ROI Tool",
        slug: "automation-roi-tool",
        description: "Calculate whether an automation project generates enough long-term savings to justify the initial setup cost.",
        primaryKeyword: "automation roi calculation tool",
        componentCode: `"use client";
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
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>\${hourlyRate}</span>
                        </label>
                        <input type="range" min="15" max="250" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Automation Setup Cost (\$)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>\${setupCost}</span>
                        </label>
                        <input type="range" min="0" max="50000" step="500" value={setupCost} onChange={(e) => setSetupCost(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Maintenance Cost (\$)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>\${maintenance}</span>
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
`
    },
    {
        name: "Project Risk Predictor",
        slug: "project-risk-predictor",
        description: "Assess the probability of a project failing based on scope clarity, team experience, and uncertainty.",
        primaryKeyword: "project risk predictor tool",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ProjectRiskPredictor() {
    const [scopeClarity, setScopeClarity] = useState(50);
    const [teamExp, setTeamExp] = useState(50);
    const [deadline, setDeadline] = useState(50);
    const [techUncertainty, setTechUncertainty] = useState(50);
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("project-risk-predictor");
            tracked.current = true;
        }
    }, []);

    const riskScore = Math.round(((100 - scopeClarity) * 0.35) + ((100 - teamExp) * 0.2) + (deadline * 0.25) + (techUncertainty * 0.2));

    let riskCategory = "Extreme Risk";
    let mitigation = "Halt progress. Redefine scope or delay deadline.";
    if (riskScore < 30) {
        riskCategory = "Low Risk";
        mitigation = "Project is healthy. Continue monitoring.";
    } else if (riskScore < 60) {
        riskCategory = "Moderate Risk";
        mitigation = "Standard project. Add a 10-15% time buffer.";
    } else if (riskScore < 80) {
        riskCategory = "High Risk";
        mitigation = "Significant chance of failure. Cut scope and simplify tech constraints immediately.";
    }

    const faqs = [
        { question: "What is Scope Clarity?", answer: "How well the requirements are documented and understood by both stakeholders and developers." }
    ];

    const seoContent = (
        <>
            <h2>Preventing Project Failure</h2>
            <p>Measure risk objectively before committing resources. Poor scope clarity combined with tight deadlines creates guaranteed failure.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
                <li><Link href="/tools/project-time-estimator">Project Time Estimator</Link></li>
                <li><Link href="/tools/deadline-confidence-calculator">Deadline Confidence Calculator</Link></li>
                <li><Link href="/tools/task-complexity-estimator">Task Complexity Estimator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Project Risk Predictor" description="Synthesize qualitative project variables into a rigid risk index." slug="project-risk-predictor" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Scope Clarity (100 = Perfect documentation)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{scopeClarity}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={scopeClarity} onChange={(e) => setScopeClarity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Team Domain Experience</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{teamExp}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={teamExp} onChange={(e) => setTeamExp(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Deadline Pressure (100 = Impossible)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{deadline}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={deadline} onChange={(e) => setDeadline(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Technical Uncertainty (100 = Unproven tech)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{techUncertainty}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={techUncertainty} onChange={(e) => setTechUncertainty(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <h3 className="input-label" style={{ marginBottom: "1rem" }}>Systemic Risk Score</h3>
                        <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: riskScore >= 60 ? "var(--error-color)" : "var(--accent-primary)", lineHeight: 1 }}>{riskScore}</div>
                        <div style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "1.5rem", color: riskScore >= 60 ? "var(--error-color)" : "var(--text-primary)" }}>{riskCategory}</div>
                    </div>
                    
                    <div style={{ marginTop: "3rem", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                        <div style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Recommended Mitigation</div>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6 }}>{mitigation}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Team Capacity Planner",
        slug: "team-capacity-planner",
        description: "Diagnose overload constraints by mapping team member availability against active project demands.",
        primaryKeyword: "team capacity planning tool",
        componentCode: `"use client";
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
                        <div className="score-fill" style={{ width: \`\${Math.min(utilization, 100)}%\`, backgroundColor: utilization > 90 ? "var(--error-color)" : "var(--accent-primary)" }}></div>
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
`
    },
    {
        name: "Deadline Confidence Calculator",
        slug: "deadline-confidence-calculator",
        description: "Measure the statistical probability of hitting a project deadline by mapping remaining effort against velocity.",
        primaryKeyword: "deadline confidence calculator",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function DeadlineConfidenceCalculator() {
    const [tasks, setTasks] = useState(50);
    const [daysLeft, setDaysLeft] = useState(14);
    const [velocity, setVelocity] = useState(3); // tasks per day
    const [riskBuffer, setRiskBuffer] = useState(20); // percent risk
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("deadline-confidence-calculator");
            tracked.current = true;
        }
    }, []);

    // required pace
    const requiredVelocity = tasks / daysLeft;
    const adjustedVelocityForRisk = velocity * (1 - (riskBuffer / 100)); // lower velocity based on risk
    const expectedDays = tasks / adjustedVelocityForRisk;

    let confidence = Math.round((daysLeft / expectedDays) * 100);
    if (confidence > 100) confidence = 100;
    if (isNaN(confidence) || confidence < 0) confidence = 0;

    let suggestion = "Safe to deploy. Minimal risk.";
    if (confidence < 50) suggestion = "Deadline failure is imminent. De-scope non-critical features today.";
    else if (confidence < 80) suggestion = "Deadline is at risk. Protect the team from any context switching or scope creep.";

    const faqs = [
        { question: "How does the risk buffer work?", answer: "It mathematically simulates 'Unknown Unknowns' by artificially depressing the team's historical velocity to account for integration errors or bugs." }
    ];

    const seoContent = (
        <>
            <h2>Why Deadlines Fail</h2>
            <p>A deadline fails because of the planning fallacy—the human tendency to assume the best possible path forward. Math is unbiased.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
                <li><Link href="/tools/team-capacity-planner">Team Capacity Planner</Link></li>
                <li><Link href="/tools/project-risk-predictor">Project Risk Predictor</Link></li>
                <li><Link href="/tools/project-time-estimator">Project Time Estimator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Deadline Confidence Calculator" description="Compute the mathematical probability of project delivery failure." slug="deadline-confidence-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Tasks / Points Remaining</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{tasks}</span>
                        </label>
                        <input type="range" min="1" max="200" value={tasks} onChange={(e) => setTasks(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Days Until Deadline</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{daysLeft}</span>
                        </label>
                        <input type="range" min="1" max="100" value={daysLeft} onChange={(e) => setDaysLeft(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Team Velocity (Tasks per Day)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{velocity}</span>
                        </label>
                        <input type="range" min="1" max="20" step="0.5" value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Unknowns / Risk Factor</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{riskBuffer}%</span>
                        </label>
                        <input type="range" min="0" max="50" value={riskBuffer} onChange={(e) => setRiskBuffer(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div>
                        <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Confidence Score</h3>
                        <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: confidence < 60 ? "var(--error-color)" : "var(--accent-primary)", lineHeight: 1 }}>
                            {confidence}%
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Required Velocity</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{requiredVelocity.toFixed(1)} tasks/day</div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Expected Delivery</div>
                            <div style={{ fontSize: "1.25rem", color: expectedDays > daysLeft ? "var(--error-color)" : "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{Math.ceil(expectedDays)} days</div>
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: \`4px solid \${confidence < 60 ? 'var(--error-color)' : 'var(--accent-primary)'}\`, backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)" }}>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6 }}>{suggestion}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Task Complexity Estimator",
        slug: "task-complexity-estimator",
        description: "Move from hours to points by objectively sizing tasks based on dependencies, logic, and testing needs.",
        primaryKeyword: "task complexity estimator tool",
        componentCode: `"use client";
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
`
    },
    {
        name: "Burnout Risk Calculator",
        slug: "burnout-risk-calculator",
        description: "Assess psychological toll by measuring context switching, overtime, and deadline stress.",
        primaryKeyword: "burnout risk calculator tool",
        componentCode: `"use client";
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
                        <div style={{ width: "200px", height: "200px", borderRadius: "50%", background: \`conic-gradient(var(--error-color) \${Math.min(score, 100)}%, var(--bg-tertiary) 0)\`, transition: "all 0.5s ease", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}></div>
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
`
    },
    {
        name: "Weekly Planning Tool",
        slug: "weekly-planning-tool",
        description: "A logic-driven planner forcing alignment between estimated hours, priorities, and physical time constraints.",
        primaryKeyword: "weekly planning logic tool",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function WeeklyPlanningTool() {
    const [tasks, setTasks] = useState([{ id: 1, name: "Strategic Deep Work", hours: 10, priority: 1 }]);
    const [availableHours, setAvailableHours] = useState(40);
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("weekly-planning-tool");
            tracked.current = true;
        }
    }, []);

    const addTask = () => {
        const id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        setTasks([...tasks, { id, name: \`Task \${id}\`, hours: 2, priority: 2 }]);
    };

    const updateTask = (id: number, field: string, value: string | number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);
    
    let consumedHours = 0;
    const computedTasks = sortedTasks.map(task => {
        const startsAt = consumedHours;
        const fits = startsAt < availableHours;
        const partialFit = startsAt < availableHours && (startsAt + task.hours) > availableHours;
        consumedHours += task.hours;
        
        let status = fits ? (partialFit ? "Partial Fit" : "Will Complete") : "Over Capacity";
        return { ...task, status, startsAt };
    });

    const isOverloaded = consumedHours > availableHours;

    const faqs = [
        { question: "Why map hours strictly to priority?", answer: "Humans routinely plan 60 hours of work for a 40 hour week. By sorting rigidly by priority, the system explicitly shows you exactly which low-priority tasks will fail." }
    ];

    const seoContent = (
        <>
            <h2>Defeating the Planning Fallacy</h2>
            <p>A to-do list without hour constraints is a wishlist. True execution requires budgeting time the same way you budget capital.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
                <li><Link href="/tools/team-capacity-planner">Team Capacity Planner</Link></li>
                <li><Link href="/tools/deadline-confidence-calculator">Deadline Confidence Calculator</Link></li>
                <li><Link href="/tools/decision-matrix-builder">Decision Matrix Builder</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Weekly Planning Constraints" description="Force constraints onto your task list to separate reality from optimism." slug="weekly-planning-tool" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h3 className="input-label" style={{ margin: 0 }}>Task Input</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Weekly Hour Limit:</span>
                            <input type="number" value={availableHours} onChange={(e) => setAvailableHours(Number(e.target.value))} style={{ width: "80px", padding: "0.5rem", borderRadius: "1rem", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", fontFamily: "var(--font-mono)", textAlign: "center" }} />
                        </div>
                    </div>
                    
                    {tasks.map(t => (
                        <div key={t.id} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <input type="text" value={t.name} onChange={(e) => updateTask(t.id, "name", e.target.value)} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.25rem", border: "none", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }} placeholder="Task name" />
                            
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Priority</label>
                                <input type="number" min="1" max="100" value={t.priority} onChange={(e) => updateTask(t.id, "priority", Number(e.target.value))} style={{ width: "60px", padding: "0.5rem", borderRadius: "0.25rem", border: "none", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", textAlign: "center" }} />
                            </div>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Hours</label>
                                <input type="number" min="1" value={t.hours} onChange={(e) => updateTask(t.id, "hours", Number(e.target.value))} style={{ width: "60px", padding: "0.5rem", borderRadius: "0.25rem", border: "none", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", textAlign: "center" }} />
                            </div>

                            <button onClick={() => removeTask(t.id)} style={{ color: "var(--error-color)", background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", padding: "0.25rem" }}>×</button>
                        </div>
                    ))}
                    
                    <button onClick={addTask} className="pill hover:border-accent" style={{ background: "var(--bg-secondary)", border: "1px dashed var(--border-color)", padding: "1rem", width: "100%", cursor: "pointer", color: "var(--text-secondary)" }}>+ Add Task</button>
                </div>

                <div className="card stagger-2 sticky" style={{ top: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
                        <h3 className="input-label" style={{ margin: 0 }}>Reality Check execution</h3>
                        <div style={{ fontSize: "1.25rem", fontFamily: "var(--font-mono)", color: isOverloaded ? "var(--error-color)" : "var(--accent-primary)", fontWeight: "bold" }}>
                            {consumedHours} / {availableHours} hrs
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {computedTasks.map((t, idx) => {
                            let statusColor = "var(--text-secondary)";
                            let bgColor = "var(--bg-tertiary)";
                            let border = "1px solid var(--border-color)";
                            let applyOpacity = false;

                            if (t.status === "Will Complete") {
                                statusColor = "var(--accent-primary)";
                                bgColor = "rgba(35, 134, 255, 0.05)";
                                border = "1px solid rgba(35, 134, 255, 0.3)";
                            } else if (t.status === "Over Capacity") {
                                statusColor = "var(--error-color)";
                                applyOpacity = true;
                            } else if (t.status === "Partial Fit") {
                                statusColor = "#f59e0b"; // Warning amber
                            }

                            return (
                                <div key={idx} style={{ padding: "1rem", backgroundColor: bgColor, borderRadius: "var(--radius-sm)", border: border, opacity: applyOpacity ? 0.6 : 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <div style={{ color: "var(--text-primary)", fontWeight: "bold" }}>{t.name}</div>
                                        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Priority: {t.priority} • {t.hours} hrs</div>
                                    </div>
                                    <div style={{ fontSize: "0.875rem", fontWeight: "bold", textTransform: "uppercase", color: statusColor, padding: "0.25rem 0.5rem", borderRadius: "1rem", border: \`1px solid \${statusColor}\` }}>
                                        {t.status}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    }
];

const clusterHubCode = `import Link from "next/link";
import { getToolsList } from "@/lib/contentRegistry";

export default function OperationsProductivityHub() {
    const allTools = getToolsList();
    const clusterSlugs = [
        "workflow-cost-calculator",
        "automation-roi-tool",
        "project-time-estimator",
        "project-risk-predictor",
        "team-capacity-planner",
        "deadline-confidence-calculator",
        "task-complexity-estimator",
        "burnout-risk-calculator",
        "weekly-planning-tool",
        "decision-matrix-builder"
    ];
    
    const clusterTools = clusterSlugs
        .map(slug => allTools.find(t => t.slug === slug))
        .filter(t => t !== undefined);

    return (
        <div className="container stagger-1" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
            <div style={{ maxWidth: "800px", marginBottom: "4rem" }}>
                <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem", lineHeight: 1.1 }}>Operations & Productivity Cluster</h1>
                <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Stop running on chaos. Implement systems, predict risk mathematically, and determine the exact return on your operational investments before you build them.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
                {clusterTools.map((tool, idx) => (
                    <Link
                        href={"/tools/" + tool.slug}
                        key={idx}
                        className="card stagger-2"
                        style={{ display: "block", textDecoration: "none", color: "inherit", transition: "transform 0.2s, border-color 0.2s" }}
                    >
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem", color: "var(--text-primary)" }}>{tool.name}</h3>
                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1.5rem" }}>{tool.description}</p>
                        <div style={{ color: "var(--accent-primary)", fontSize: "0.875rem", fontFamily: "var(--font-mono)", fontWeight: "bold", display: "flex", alignItems: "center" }}>
                            Launch Tool <span style={{ marginLeft: "0.5rem" }}>→</span>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div style={{ marginTop: "6rem" }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>About This Cluster</h2>
                <div style={{ maxWidth: "800px", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.125rem" }}>
                    <p>
                        The Operations & Productivity cluster transforms chaotic management practices into rigid, deterministic formulas. We provide tools to measure capacity, establish ROI on automation, and accurately scope development timelines preventing burnout and missed deadlines.
                    </p>
                </div>
            </div>
        </div>
    );
}

export const metadata = {
    title: "Operations & Productivity Tools | ToolStrategyHub",
    description: "Systems, calculators, and matrix tools for managing teams and prioritizing tasks.",
};
`;

function generateTools() {
    newTools.forEach(tool => {
        const dirPath = path.join(PROJECT_DIR, 'app', 'tools', tool.slug);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const filePath = path.join(dirPath, 'page.tsx');
        fs.writeFileSync(filePath, tool.componentCode, 'utf8');
        console.log("Created " + filePath);
    });

    // Create Registry Data File
    const registryContent = `import type { ToolMetadata } from "./types";

export const OPERATIONS_PRODUCTIVITY_TOOLS: ToolMetadata[] = [`;

    const toolEntries = newTools.map(t => '{ "name": "' + t.name + '", "slug": "' + t.slug + '", "description": "' + t.description.replace(/"/g, '\\"') + '", "primaryKeyword": "' + t.primaryKeyword + '" }').join(',');

    const registryEnd = `
];
`;
    const registryFilePath = path.join(PROJECT_DIR, 'lib', 'operationsProductivityTools.ts');
    fs.writeFileSync(registryFilePath, registryContent + toolEntries + registryEnd, 'utf8');
    console.log("Created Operations Registry File");

    // Create Hub
    const hubDir = path.join(PROJECT_DIR, 'app', 'tools', 'operations-productivity');
    if (!fs.existsSync(hubDir)) {
        fs.mkdirSync(hubDir, { recursive: true });
    }
    fs.writeFileSync(path.join(hubDir, 'page.tsx'), clusterHubCode, 'utf8');
    console.log("Created Hub Page");
}

generateTools();
