"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function BusinessModelCanvasBuilder() {
    const [valueProp, setValueProp] = useState("");
    const [customerSegment, setCustomerSegment] = useState("");
    const [revenueStreams, setRevenueStreams] = useState("");
    const [channels, setChannels] = useState("");
    const [keyResources, setKeyResources] = useState("");
    const [costStructure, setCostStructure] = useState("");

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("business-model-canvas-builder");
            tracked.current = true;
        }
    }, []);

    const handleDownload = () => {
        const text = `
Business Model Canvas Summary
==============================
Value Proposition:
${valueProp || "Not defined"}

Customer Segment:
${customerSegment || "Not defined"}

Revenue Streams:
${revenueStreams || "Not defined"}

Channels:
${channels || "Not defined"}

Key Resources:
${keyResources || "Not defined"}

Cost Structure:
${costStructure || "Not defined"}
        `;
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "bmcb-summary.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const faqs = [
        { question: "Why a 1-page canvas instead of a 40-page business plan?", answer: "Investors don't read business plans, they read traction and unit economics. The one-page format forces you to ruthlessly edit your strategy down to the core fundamentals that actually dictate survival." },
        { question: "Which block is the most important?", answer: "Value Proposition and Customer Segments. If you solve an invisible problem for people without money, your revenue streams and channels do not matter. Start there." },
        { question: "How often should I update this?", answer: "Every time you invalidate a hypothesis via customer interviews. Until you achieve product-market fit, this canvas should be treated as a living document." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Business Model Canvas Builder",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Generate a lean, one-page business model canvas to visualize your startup strategy."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Visualizing the Machine</h2>
            <p>Your business is a system that turns inputs (capital and labor) into outputs (revenue). If any node in that system is fundamentally disconnected, the entire machine fails. The Business Model Canvas was popularized by Alexander Osterwalder as a standardized framework to replace the bloated, fictional '40 page business plan' with a lean, objective map of actual assumptions. By explicitly stating your channels alongside your cost structure, you can immediately identify fatal economic flaws.</p>
            <p>Our digital business model canvas builder enforces brevity. If your value proposition cannot fit into a small structural box, it is too complicated for the market to understand. The core loop of a SaaS company is converting customer segments into revenue streams via repeatable channels. Use this template to create an operational blueprint. Critical topics to master include how to fill out a lean canvas for a saas startup, determining your unfair advantage in a crowded market, identifying key partnerships to scale distribution, calculating customer acquisition cost against lifetime value, and iterating your revenue model design.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validation Scorecard</Link></li>
                <li><Link href="/tools/revenue-model-designer">Revenue Model Designer</Link></li>
                <li><Link href="/tools/pricing-psychology-optimizer">Pricing Psychology Optimizer</Link></li>
                <li><Link href="/tools/market-size-estimator">TAM / SAM / SOM Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Business Model Canvas Builder" description="Map, discuss, and design your entire operational business model on a single visual dashboard before you write code." slug="business-model-canvas-builder" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }} className="stagger-1">
                    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label className="input-label" style={{ color: "var(--accent-primary)" }}>Value Proposition</label>
                        <textarea placeholder="The exact problem you solve and the unique benefit you provide." value={valueProp} onChange={(e) => setValueProp(e.target.value)} style={{ width: "100%", height: "100px", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", resize: "none" }} />
                    </div>

                    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label className="input-label" style={{ color: "var(--accent-primary)" }}>Customer Segment</label>
                        <textarea placeholder="Who are you solving this for? Be incredibly specific on the niche." value={customerSegment} onChange={(e) => setCustomerSegment(e.target.value)} style={{ width: "100%", height: "100px", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", resize: "none" }} />
                    </div>

                    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label className="input-label" style={{ color: "var(--accent-primary)" }}>Revenue Streams</label>
                        <textarea placeholder="Subscription, one-off, transactional margin, or usage-based?" value={revenueStreams} onChange={(e) => setRevenueStreams(e.target.value)} style={{ width: "100%", height: "100px", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", resize: "none" }} />
                    </div>

                    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label className="input-label" style={{ color: "var(--accent-primary)" }}>Acquisition Channels</label>
                        <textarea placeholder="Outbound cold email, SEO, paid social, or channel partners?" value={channels} onChange={(e) => setChannels(e.target.value)} style={{ width: "100%", height: "100px", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", resize: "none" }} />
                    </div>

                    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label className="input-label" style={{ color: "var(--accent-primary)" }}>Key Resources / Unfair Advantage</label>
                        <textarea placeholder="What do you have that cannot be easily copied by a well-funded competitor?" value={keyResources} onChange={(e) => setKeyResources(e.target.value)} style={{ width: "100%", height: "100px", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", resize: "none" }} />
                    </div>

                    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label className="input-label" style={{ color: "var(--accent-primary)" }}>Cost Structure</label>
                        <textarea placeholder="Fixed vs variable costs? COGS, payroll, and server infrastructure." value={costStructure} onChange={(e) => setCostStructure(e.target.value)} style={{ width: "100%", height: "100px", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", resize: "none" }} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem" }}>
                    <button onClick={handleDownload} className="btn" style={{ padding: "1rem 3rem", fontSize: "1.25rem" }}>Download Blueprint Summary (TXT)</button>
                    <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                        Creates a clean text file you can share with co-founders or drop directly into an LLM for strategic review.
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
}
