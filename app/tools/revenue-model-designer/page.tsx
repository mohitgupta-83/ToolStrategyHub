"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function RevenueModelDesigner() {
    const [audienceType, setAudienceType] = useState("b2b_enterprise");
    const [productType, setProductType] = useState("software");
    const [acquisitionMethod, setAcquisitionMethod] = useState("inbound");

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("revenue-model-designer");
            tracked.current = true;
        }
    }, []);

    const determineModel = () => {
        if (productType === "marketplace") {
            return {
                model: "Transaction Fee / Marketplace",
                description: "You are connecting buyers and sellers. You must take a rake on the transaction.",
                pros: ["Network effects build a massive moat.", "Scales infinitely once liquidity is reached."],
                cons: ["The cold start problem is brutal.", "Requires balancing supply and demand simultaneously."],
                examples: "Airbnb (15% fee), Uber (25% fee), Fiverr."
            };
        }

        if (productType === "service" || productType === "consulting") {
            return {
                model: "Productized Service / Retainer",
                description: "You perform labor. To scale, you must package the labor as a fixed-price monthly subscription.",
                pros: ["High initial cash flow.", "Clients value done-for-you solutions more than DIY software."],
                cons: ["Profit margins degrade as you hire.", "Difficult to scale without deteriorating quality."],
                examples: "Designjoy ($5k/mo design), SEO retainers."
            };
        }

        if (audienceType === "b2c_mass" && productType === "software") {
            if (acquisitionMethod === "viral" || acquisitionMethod === "inbound") {
                return {
                    model: "Freemium + Subscription",
                    description: "Give away the core product to fuel a viral loop, charge for power-user features.",
                    pros: ["Massive top-of-funnel growth.", "Lower customer acquisition cost (CAC)."],
                    cons: ["Free users drain server resources and support.", "Conversion rates to paid are typically 1-3%."],
                    examples: "Spotify ($10/mo), Notion ($10/mo)."
                };
            } else {
                return {
                    model: "One-Time Payment (Lifetime Deal)",
                    description: "B2C users hate subscriptions. A high one-time fee converts better for standalone utilities.",
                    pros: ["Immediate cash injection.", "Higher conversion rate among subscription-fatigued consumers."],
                    cons: ["You have to constantly acquire new users to survive.", "Hosting costs endure forever."],
                    examples: "Final Cut Pro ($300), Indie Mac Apps."
                };
            }
        }

        if (audienceType === "b2b_smb") {
            return {
                model: "Self-Serve Tiered Subscription (SaaS)",
                description: "Charge a monthly recurring revenue (MRR) based on features or seats.",
                pros: ["Predictable cash flow.", "High valuation multiples upon exit."],
                cons: ["Requires high upfront engineering before seeing revenue.", "Extremely competitive and prone to churn."],
                examples: "Mailchimp ($20-$300/mo), Slack ($8/user/mo)."
            };
        }

        return {
            model: "Enterprise Annual Contracts (Sales-Led)",
            description: "Sell robust solutions via outbound sales teams with minimum contract sizes.",
            pros: ["Customers almost never churn.", "Massive contract values ($50k - $1M+)."],
            cons: ["Sales cycles take 6-18 months.", "Requires expensive account executives, not just marketing."],
            examples: "Salesforce CRM, Oracle Databases."
        };
    };

    const results = determineModel();

    const faqs = [
        { question: "Why not just use a subscription model for everything?", answer: "Consumers are suffering from subscription fatigue. Unless your product provides continuous, undeniable monthly value or requires ongoing server costs, forcing a subscription on a utility app will destroy your conversion rate." },
        { question: "What is a productized service?", answer: "It is taking a bespoke freelance service (like designing a logo) and packaging it with clear constraints, a fixed price, and a subscription cadence (e.g., unlimited design requests for $5,000/mo)." }
    ];

    const seoContent = (
        <>
            <h2>Selecting the Optimal Revenue Model</h2>
            <p>Your product does not determine your revenue model; your audience and your acquisition channel do. If you require outbound sales to acquire a user, you cannot charge $5/month—the math structurally fails. You must architect your pricing model to mathematically support your customer acquisition cost.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/saas-pricing-calculator">SaaS Pricing Calculator</Link></li>
                <li><Link href="/tools/pricing-psychology-optimizer">Pricing Psychology Optimizer</Link></li>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Revenue Model Designer" description="Architect the correct monetization strategy based on your audience, product type, and acquisition vector." slug="revenue-model-designer" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Target Audience</label>
                        <select value={audienceType} onChange={(e) => setAudienceType(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="b2c_mass">B2C (Mass Consumers)</option>
                            <option value="b2c_prosumer">B2C (Prosumers / Creators)</option>
                            <option value="b2b_smb">B2B (Small/Med Business)</option>
                            <option value="b2b_enterprise">B2B (Enterprise / Corp)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Core Product Form</label>
                        <select value={productType} onChange={(e) => setProductType(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="software">SaaS / Web App</option>
                            <option value="mobile_app">Mobile Application</option>
                            <option value="marketplace">Marketplace/Platform</option>
                            <option value="content">Content / Community</option>
                            <option value="service">Labor / Consulting</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Primary Acquisition Vector</label>
                        <select value={acquisitionMethod} onChange={(e) => setAcquisitionMethod(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="inbound">Inbound (SEO, Content)</option>
                            <option value="paid">Paid Ads (Meta, Google)</option>
                            <option value="viral">Viral / Word of Mouth</option>
                            <option value="outbound">Outbound Sales (Cold Email/Calls)</option>
                        </select>
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem", textAlign: "center" }}>Recommended System</div>
                        <div style={{ fontSize: "1.8rem", color: "var(--text-primary)", textAlign: "center", fontWeight: "bold", marginBottom: "1rem" }}>
                            {results.model}
                        </div>
                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.5, fontSize: "0.95rem", textAlign: "center" }}>
                            {results.description}
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                            <h4 style={{ color: "var(--success-color, #22c55e)", margin: 0 }}>✓ Strengths</h4>
                            <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                                {results.pros.map((p, i) => <li key={i} style={{ marginBottom: "0.5rem" }}>{p}</li>)}
                            </ul>
                        </div>

                        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                            <h4 style={{ color: "var(--error-color, #ef4444)", margin: 0 }}>✗ Weaknesses</h4>
                            <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                                {results.cons.map((c, i) => <li key={i} style={{ marginBottom: "0.5rem" }}>{c}</li>)}
                            </ul>
                        </div>

                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", marginTop: "0.5rem" }}>
                            <span style={{ color: "var(--text-primary)", fontWeight: "bold" }}>Valid Examples: </span>
                            <span style={{ color: "var(--text-secondary)" }}>{results.examples}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
