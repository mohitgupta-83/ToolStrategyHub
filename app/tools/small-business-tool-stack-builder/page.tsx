"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function SmallBusinessToolStackBuilder() {
    const [businessType, setBusinessType] = useState("agency");
    const [teamSize, setTeamSize] = useState("1");
    const [budget, setBudget] = useState("low");
    const [growthStage, setGrowthStage] = useState("startup");

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("small-business-tool-stack-builder");
            tracked.current = true;
        }
    }, []);

    const getStack = () => {
        const stack = [];

        // Communication
        if (teamSize === "1") {
            stack.push({ category: "Communication & Email", tool: budget === "low" ? "Google Workspace Basics" : "Superhuman + Google Workspace", cost: budget === "low" ? "$6/mo" : "$36/mo" });
        } else {
            stack.push({ category: "Internal Comms", tool: "Slack", cost: budget === "low" ? "$0/mo" : "$8/seat/mo" });
            stack.push({ category: "Email", tool: "Google Workspace", cost: "$6-$12/seat/mo" });
        }

        // Project Management
        if (businessType === "agency") {
            stack.push({ category: "Project Management", tool: budget === "low" ? "Trello / Notion" : "Linear / Asana", cost: budget === "low" ? "$0/mo" : "$15/seat/mo" });
            stack.push({ category: "Client Portal", tool: budget === "low" ? "Notion Shared Pages" : "Copilot / Basecamp", cost: budget === "low" ? "$0/mo" : "$15-$99/mo" });
        } else if (businessType === "ecommerce") {
            stack.push({ category: "Inventory / Ops", tool: "Shopify Backend", cost: "$39/mo+" });
            stack.push({ category: "Customer Support", tool: budget === "low" ? "Gmail" : "Gorgias / Zendesk", cost: budget === "low" ? "$0/mo" : "$50/mo+" });
        } else {
            stack.push({ category: "Task Tracking", tool: "Notion", cost: budget === "low" ? "$0/mo" : "$10/seat" });
        }

        // Accounting & Finance
        stack.push({ category: "Accounting", tool: budget === "low" ? "Wave Accounting" : "QuickBooks Online", cost: budget === "low" ? "$0/mo" : "$30/mo" });
        stack.push({ category: "Payments / Banking", tool: "Stripe + Mercury", cost: "2.9% + 30¢ / Free" });

        // Growth & Marketing
        if (growthStage === "scaling" || budget === "high") {
            if (businessType === "ecommerce") {
                stack.push({ category: "Email Marketing", tool: "Klaviyo", cost: "$45/mo+" });
            } else {
                stack.push({ category: "CRM", tool: "HubSpot Starter", cost: "$20/mo" });
                stack.push({ category: "Outbound Sales", tool: "Apollo.io", cost: "$49/mo" });
            }
        } else {
            stack.push({ category: "Marketing / CRM", tool: "MailerLite / Notion CRM", cost: "$0/mo" });
        }

        return stack;
    };

    const tools = getStack();

    const faqs = [
        { question: "Why avoid enterprise tools early on?", answer: "Enterprise tools like Salesforce or Jira require full-time administrators to maintain. Early on, you need velocity, not infinite customizability." },
        { question: "Should I pay for Notion or stick to the free plan?", answer: "Notion's free plan is generally sufficient for solo founders. Once you add a second team member, the team features and permissions become necessary." }
    ];

    const seoContent = (
        <>
            <h2>Optimizing Your Operating System</h2>
            <p>Your software stack is the operating system of your business. Paying for 15 disconnected SaaS tools causes data silos, cognitive fatigue, and massive unnecessary monthly burn. Build a lean, integrated stack first.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/workflow-cost-calculator">Manual Workflow Cost Calculator</Link></li>
                <li><Link href="/tools/decision-matrix-builder">Decision Matrix Builder</Link></li>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Small Business Tool Stack Builder" description="Stop paying for bloatware. Generate a custom, lean software stack based on your exact business archetype and budget." slug="small-business-tool-stack-builder" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Business Archetype</label>
                        <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="agency">Agency / Service Business</option>
                            <option value="saas">SaaS / Tech Startup</option>
                            <option value="ecommerce">E-Commerce / D2C</option>
                            <option value="creator">Creator / Info Product</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Team Size</label>
                        <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="1">Solo Founder</option>
                            <option value="2-10">Small Team (2-10)</option>
                            <option value="11-50">Scaling (11-50)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Software Budget Sensitivity</label>
                        <select value={budget} onChange={(e) => setBudget(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="low">Bootstrapped ($0-$50/mo limit)</option>
                            <option value="high">Funded / High Cashflow (Will pay for efficiency)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Current Growth Stage</label>
                        <select value={growthStage} onChange={(e) => setGrowthStage(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="startup">Pre-Revenue / Startup</option>
                            <option value="scaling">Scaling / Profitable</option>
                        </select>
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Recommended Core Stack</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {tools.map((t, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                    <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "1px" }}>{t.category}</span>
                                    <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--text-primary)" }}>{t.tool}</span>
                                </div>
                                <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                                    {t.cost}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: "1rem", backgroundColor: "rgba(34, 197, 94, 0.1)", borderLeft: "4px solid var(--success-color, #22c55e)", color: "var(--text-primary)", fontSize: "0.9rem", marginTop: "1rem", lineHeight: 1.5 }}>
                        <strong>Tip:</strong> Wait until a manual process breaks before buying software to run it. Spreadsheets and Zapier are often sufficient for the first $100k in revenue.
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
