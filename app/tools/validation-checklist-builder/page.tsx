"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ValidationChecklistBuilder() {
    const [productType, setProductType] = useState("SaaS"); // SaaS, E-commerce, Service, Community
    const [audience, setAudience] = useState("B2B");
    const [model, setModel] = useState("Subscription");

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("validation-checklist-builder");
            tracked.current = true;
        }
    }, []);

    const checklists: Record<string, string[]> = {
        SaaS: [
            "Build a high-friction waitlist landing page detailing the exact unique value proposition.",
            "Run $100 in highly targeted LinkedIn/Search Ads to the waitlist.",
            "If CPL (Cost Per Lead) is below $5, email contacts and request a 15-minute discovery call.",
            "Pre-sell the annual conceptual product to 3 beta testers before writing backend code.",
            "Map out the exact data schema required for the MVP."
        ],
        Ecommerce: [
            "Source placeholder imagery or create a realistic 3D mockup.",
            "Spin up a one-product Shopify store and wire a Stripe testing key.",
            "Launch $200 of Instagram / TikTok Ads.",
            "Measure Add-To-Cart velocity to determine actual buyer intent.",
            "If Intent > 3%, acquire initial physical inventory batch."
        ],
        Service: [
            "Define the exact deliverable outcome, timelines, and boundaries.",
            "Reach out to 20 past connections offering a 'Beta Tier' discounted rate for a testimonial.",
            "Fulfill service manually using no-code glue (Zapier, Airtable).",
            "Collect video testimonials and case study data metrics.",
            "Productize the service with strict boundaries and launch public pricing."
        ],
        Community: [
            "Identify the specific hyper-niche pain point the community solves.",
            "Create a free email newsletter capturing intent.",
            "Launch a private Slack/Discord for the first 50 highly-vetted members for free.",
            "Stir organic conversation and identify the top 5 most active members.",
            "Wall off access behind a paywall once internal value exceeds free alternative value."
        ]
    };

    const currentList = checklists[productType] || checklists.SaaS;

    const faqs = [
        { question: "Why do validation checklists change per product?", answer: "Validating a $5M physical hardware startup requires massive upfront capital letters of intent. Validating a newsletter just requires a Twitter thread. The medium determines the method." }
    ];

    const seoContent = (
        <>
            <h2>Do Not Skip Step One</h2>
            <p>Every founder wants to write code. The validation checklist forces you to prove market demand before you waste 6 months engineering something nobody wants.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/startup-readiness-score">Startup Readiness Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Validation Checklist Builder" description="Generate your exact go-to-market testing protocol." slug="validation-checklist-builder" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Core Business Medium</label>
                        <select value={productType} onChange={(e) => setProductType(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="SaaS">SaaS / Web App</option>
                            <option value="Ecommerce">E-Commerce / Physical</option>
                            <option value="Service">Agency / Productized Service</option>
                            <option value="Community">Paid Community / Media</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Target Audience Vector</label>
                        <select value={audience} onChange={(e) => setAudience(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="B2B">B2B - Enterprise / SMB</option>
                            <option value="B2C">B2C - General Consumers</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Planned Monetization</label>
                        <select value={model} onChange={(e) => setModel(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="Subscription">Recurring Subscription</option>
                            <option value="OneTime">One-Time High Ticket</option>
                            <option value="Usage">Usage-Based / Pay as you go</option>
                        </select>
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column" }}>
                    <h3 className="input-label" style={{ marginBottom: "1rem" }}>Your Target Protocol</h3>

                    <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", listStyle: "none", padding: 0 }}>
                        {currentList.map((step: string, idx: number) => (
                            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)" }}>
                                <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--accent-primary)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", fontWeight: "bold" }}>{idx + 1}</div>
                                <span style={{ lineHeight: 1.5 }}>{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ToolLayout>
    );
}
