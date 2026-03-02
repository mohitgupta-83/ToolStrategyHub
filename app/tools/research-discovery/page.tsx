import Link from "next/link";
import { getToolsList } from "@/lib/contentRegistry";

export default function ResearchDiscoveryHub() {
    const allTools = getToolsList();
    const clusterSlugs = [
        "reddit-pain-finder",
        "subreddit-pain-analyzer",
        "keyword-opportunity-calculator",
        "competitor-gap-analyzer",
        "niche-saturation-score",
        "market-trend-evaluator",
        "opportunity-ranking-tool",
        "validation-checklist-builder",
        "startup-readiness-score",
        "launch-timing-analyzer"
    ];
    
    const clusterTools = clusterSlugs
        .map(slug => allTools.find(t => t.slug === slug))
        .filter(t => t !== undefined);

    return (
        <div className="container stagger-1" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
            <div style={{ maxWidth: "800px", marginBottom: "4rem" }}>
                <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem", lineHeight: 1.1 }}>Research & Discovery System</h1>
                <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Stop guessing what the market wants. Analyze pain points, quantify competitor gaps, map saturation density, and mathematically benchmark new opportunities using our deep research toolkit.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
                {clusterTools.map((tool, idx) => (
                    <Link
                        href={"/tools/" + tool?.slug}
                        key={idx}
                        className="card stagger-2"
                        style={{ display: "block", textDecoration: "none", color: "inherit", transition: "transform 0.2s, border-color 0.2s" }}
                    >
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem", color: "var(--text-primary)" }}>{tool?.name}</h3>
                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1.5rem" }}>{tool?.description}</p>
                        <div style={{ color: "var(--accent-primary)", fontSize: "0.875rem", fontFamily: "var(--font-mono)", fontWeight: "bold", display: "flex", alignItems: "center" }}>
                            Launch Tool <span style={{ marginLeft: "0.5rem" }}>→</span>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div style={{ marginTop: "6rem", padding: "3rem", borderRadius: "1rem", backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-color)" }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>The Intelligence Edge</h2>
                <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.125rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                    <div>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.875rem" }}>Identify Pain</h3>
                        <p>We actively scan unstructured textual data from the internet's largest forums to deterministically extract consumer hostility and friction. Where there is pain, there is a paid solution.</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.875rem" }}>Quantify the Gap</h3>
                        <p>Finding a problem isn't enough. We measure incumbency strength, feature density, and content arbitrage vectors to ensure there is physical room in the market for you.</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.875rem" }}>Time the Launch</h3>
                        <p>A good product at the wrong time operates as a bad product. Evaluate keyword trajectories, temporal demand curves, and competitive intensity to deploy exactly when the market is ready.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const metadata = {
    title: "Research & Discovery Hub | ToolStrategyHub",
    description: "Deep research tools for analyzing pain points, keyword opportunities, and market readiness.",
};
