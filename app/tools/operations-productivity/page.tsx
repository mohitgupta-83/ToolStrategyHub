import Link from "next/link";
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
