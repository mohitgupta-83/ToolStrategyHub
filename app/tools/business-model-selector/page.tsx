"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function BusinessModelSelector() {
    const [audience, setAudience] = useState("B2B Enterprise");
    const [acquisition, setAcquisition] = useState("Outbound Sales");
    const [type, setType] = useState("Software");
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("business-model-selector");
            tracked.current = true;
        }
    }, []);

    let model = "B2B SaaS / Seat-Based Subscription";
    let explanation = "The classic structure. You require high LTV to justify direct sales efforts. Charging per seat aligns value with massive corporate teams.";

    if (audience === "B2C Consumers" && type === "Marketplace") {
        model = "Transaction Fee Marketplace";
        explanation = "Take a percentage of GMV (Gross Merchandise Value). You must build liquidity on both the supply and demand side simultaneously before turning a profit.";
    }
    else if (audience === "B2C Consumers" && type === "Software") {
        model = "Freemium + Pro Tier";
        explanation = "Consumer software requires viral or organic loops to keep CAC low. You give 90% of value for free and monetize the 5% power users to subsidize the rest.";
    }
    else if (audience === "B2B SMBs" && acquisition === "Inbound / SEO") {
        model = "Usage-Based PLG (Product-Led Growth)";
        explanation = "Small businesses hate talking to sales. Build a self-serve product where they pay based on API calls, storage, or transactions.";
    }
    else if (audience === "B2B Enterprise") {
        model = "Custom Annual Contracts + Implementation Fee";
        explanation = "Enterprise wants white-glove service. Charge high upfront implementation fees to subsidize the 6-12 month sales cycle, followed by secure annual lock-ins.";
    }

    const faqs = [
        { question: "Can a business have multiple models?", answer: "Yes, but focus is key in the early days. Don't build self-serve PLG and enterprise outbound simultaneously with a team of two." }
    ];

    const seoContent = (
        <>
            <h2>Finding the Right Business Model</h2>
            <p>Charging per seat doesn't work for marketplaces, and take-rates don't work for SaaS. Match your pricing architecture to your user behavior.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
                <li><Link href="/tools/product-market-fit-score">Product-Market Fit Score</Link></li>
                <li><Link href="/tools/idea-risk-analyzer">Idea Risk Analyzer</Link></li>
                <li><Link href="/tools/saas-pricing-calculator">SaaS Pricing Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Business Model Selector" description="Choose the right monetization mechanics based on your audience." slug="business-model-selector" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ marginBottom: "0.5rem" }}>Audience Type</label>
                        <select value={audience} onChange={(e) => setAudience(e.target.value)} style={{ width: "100%", padding: "1rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", fontSize: "1rem" }}>
                            <option>B2C Consumers</option>
                            <option>B2B SMBs</option>
                            <option>B2B Enterprise</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ marginBottom: "0.5rem" }}>Primary Acquisition Channel</label>
                        <select value={acquisition} onChange={(e) => setAcquisition(e.target.value)} style={{ width: "100%", padding: "1rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", fontSize: "1rem" }}>
                            <option>Inbound / SEO</option>
                            <option>Paid Ads</option>
                            <option>Outbound Sales</option>
                            <option>Viral / Word of Mouth</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ marginBottom: "0.5rem" }}>Core Product Mechanism</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: "100%", padding: "1rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", fontSize: "1rem" }}>
                            <option>Software</option>
                            <option>Marketplace</option>
                            <option>Community / Content</option>
                            <option>Physical Good / Service</option>
                        </select>
                    </div>
                </div>

                <div className="card stagger-2" style={{ backgroundColor: "var(--bg-secondary)", display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <h3 className="input-label">Recommended Architecture</h3>
                    <div style={{ padding: "2.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-md)", border: "1px solid var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontWeight: "bold", textAlign: "center", lineHeight: 1.3 }}>{model}</div>
                    </div>
                    <div style={{ padding: "1.5rem", borderLeft: "4px solid var(--accent-primary)", backgroundColor: "rgba(35, 134, 255, 0.05)", borderRadius: "var(--radius-sm)" }}>
                        <h4 style={{ fontSize: "1rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Strategic Rationale</h4>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6 }}>{explanation}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
