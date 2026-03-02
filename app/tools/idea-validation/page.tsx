import Link from "next/link";
import { getToolsList } from "@/lib/contentRegistry";

export default function IdeaValidationHub() {
    const allTools = getToolsList();
    const clusterSlugs = [
        "startup-idea-validator",
        "idea-comparison-tool",
        "problem-severity-calculator",
        "market-size-estimator",
        "audience-persona-builder",
        "mvp-scope-calculator",
        "feature-priority-matrix",
        "product-market-fit-score",
        "business-model-selector",
        "idea-risk-analyzer"
    ];

    // Sort tools to match our defined logical order in clusterSlugs
    const clusterTools = clusterSlugs
        .map(slug => allTools.find(t => t.slug === slug))
        .filter(t => t !== undefined) as typeof allTools;

    return (
        <div className="container stagger-1" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
            <div style={{ maxWidth: "800px", marginBottom: "4rem" }}>
                <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem", lineHeight: 1.1 }}>Idea & Validation Authority Cluster</h1>
                <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Stop guessing. Use these deterministically weighted calculators to quantify risk, optimize scope, and validate your thesis before writing a single line of code.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
                {clusterTools.map((tool, idx) => (
                    <Link
                        href={`/tools/${tool.slug}`}
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
                        The Idea & Validation cluster provides an objective counterweight to founder optimism. We have digitized the frameworks used by top-tier product managers and venture capitalists to help you prioritize your roadmap intelligently. Build wedges, quantify problem urgency, and score your market fit computationally.
                    </p>
                </div>
            </div>
        </div>
    );
}

export const metadata = {
    title: "Idea & Validation Tools | ToolStrategyHub",
    description: "A comprehensive suite of tools for validating startup ideas, calculating PMF, and prioritizing product features.",
};
