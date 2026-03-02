import Link from "next/link";
import { getToolsList } from "@/lib/contentRegistry";

export default function BuildersCreatorsHub() {
    const allTools = getToolsList();
    const clusterSlugs = [
        "content-idea-profit-score",
        "youtube-niche-validator",
        "creator-monetization-calculator",
        "audience-growth-estimator",
        "posting-frequency-optimizer",
        "content-roi-calculator",
        "viral-potential-score",
        "channel-profit-predictor",
        "creator-business-model-picker",
        "newsletter-growth-calculator"
    ];
    
    const clusterTools = clusterSlugs
        .map(slug => allTools.find(t => t.slug === slug))
        .filter(t => t !== undefined);

    return (
        <div className="container stagger-1" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
            <div style={{ maxWidth: "800px", marginBottom: "4rem" }}>
                <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem", lineHeight: 1.1 }}>Builders & Creators Cluster</h1>
                <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Stop guessing your metrics. Scale your audience, predict your AdSense, validate your business model, and mathematically track media ROI with our creator toolkit.
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
            
            <div style={{ marginTop: "6rem" }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>About This Cluster</h2>
                <div style={{ maxWidth: "800px", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.125rem" }}>
                    <p>
                        The Creators & Builders cluster brings deterministic engineering methodologies into the world of creative production. Instead of hoping for virality, we give you calculators to model compound channel growth, measure content ROIs, and systematically monetize digital attention. 
                    </p>
                </div>
            </div>
        </div>
    );
}

export const metadata = {
    title: "Creators & Builders Tools | ToolStrategyHub",
    description: "Calculators and tools for audience growth, monetization modeling, and YouTube validation.",
};
