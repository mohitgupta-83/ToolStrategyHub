"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function FreelanceProjectPricingMatrix() {
    const [timeEstimate, setTimeEstimate] = useState<number>(40);
    const [complexity, setComplexity] = useState<number>(2); // 1-3
    const [riskLevel, setRiskLevel] = useState<number>(1); // 1-3
    const [experience, setExperience] = useState<"junior" | "mid" | "senior" | "expert">("mid");

    const [currency, setCurrency] = useState<CurrencyCode>("USD");

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("freelance-project-pricing-matrix");
            tracked.current = true;
        }
    }, []);

    let baseHourlyRate = 50;
    if (experience === "junior") baseHourlyRate = 35;
    else if (experience === "mid") baseHourlyRate = 75;
    else if (experience === "senior") baseHourlyRate = 125;
    else if (experience === "expert") baseHourlyRate = 200;

    // The foundational cost before any premiums
    const rawCost = timeEstimate * baseHourlyRate;

    // Complexity Multiplier (Standard vs Custom Architecture)
    let complexityMultiplier = 1;
    if (complexity === 2) complexityMultiplier = 1.3;
    else if (complexity === 3) complexityMultiplier = 1.8;

    // Scope Creep Risk Buffer
    let riskBuffer = 1.1; // Baseline 10% contingency
    if (riskLevel === 2) riskBuffer = 1.3; // 30% for unclear specs
    if (riskLevel === 3) riskBuffer = 1.6; // 60% for toxic client / volatile tech

    const suggestedPrice = rawCost * complexityMultiplier * riskBuffer;

    // Unbillable admin & software overhead (20%)
    const overhead = suggestedPrice * 0.2;
    // Net profit after overhead
    const estimatedProfit = suggestedPrice - (rawCost * 1.0) - overhead;
    const profitMargin = (estimatedProfit / suggestedPrice) * 100;

    let scoreStatus = "Highly Profitable";
    let scoreColor = "var(--success-color, #22c55e)";

    if (profitMargin < 15) {
        scoreStatus = "Dangerously Thin Margin";
        scoreColor = "var(--error-color, #ef4444)";
    } else if (profitMargin < 35) {
        scoreStatus = "Adequate Margin";
        scoreColor = "var(--accent-primary)";
    }

    const faqs = [
        { question: "Why is the final price so much higher than my hourly rate?", answer: "Because clients buy solutions, not your time. If a project is highly complex with vague specifications (high risk), you will incur massive unpaid debugging hours and negotiation friction. The risk multiplier insures your margin." },
        { question: "What is the overhead tax?", answer: "Freelancers often forget they are a business. Your project price must subsidize your unbillable time (invoicing, sales calls) and operational expenses (software subscriptions, taxes). We deduct a flat 20% to calculate realistic net profit." },
        { question: "Should I show this calculation to the client?", answer: "Never. Present the final suggested price as a flat-rate package. If you show them the hours and multipliers, they will attempt to line-item veto your risk buffers." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Freelance Project Pricing Matrix",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Stop underpricing your work. Calculate fixed-rate project pricing using risk buffers, complexity multipliers, and true overhead costs."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>The Freelance Pricing Death Spiral</h2>
            <p>The number one reason freelancers and independent agencies fail is that they price fixed-bid projects based on raw hourly estimates. They ignore the three laws of custom work: client specifications are always wrong, software architecture is universally more complicated than it appears, and scope creep is inevitable. Over time, calculating a project via direct time estimation destroys any possible profit margin.</p>
            <p>The Freelance Project Pricing Matrix engine applies institutional risk-management protocols to independent labor pricing. By inputting your raw time estimate and adjusting for technical difficulty and client volatility, the algorithm generates a buffered, fixed-bid price package. This ensures that when the project inevitably goes 30% over scope, your profit margin remains protected. Related strategies include transitioning from hourly to value-based pricing, calculating freelance profit margins, how to charge for high-risk clients, identifying red flags in freelance proposals, and structuring flat-rate agency contracts.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/freelance-rate-calculator">Freelance Hourly Rate Break-Even Calculator</Link></li>
                <li><Link href="/tools/workflow-cost-calculator">Manual Workflow Cost Calculator</Link></li>
                <li><Link href="/tools/pricing-psychology-optimizer">Pricing Psychology Optimizer</Link></li>
                <li><Link href="/tools/revenue-model-designer">Revenue Model Designer</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Freelance Project Pricing Matrix" description="Calculate the perfect fixed-bid project price by injecting risk buffers, complexity multipliers, and overhead metrics into your raw time estimate." slug="freelance-project-pricing-matrix" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Raw Time Estimate (Hours)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{timeEstimate}h</span>
                        </label>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "-0.5rem", marginBottom: "0.5rem" }}>If everything goes perfectly, how long will this take?</p>
                        <input type="range" min="10" max="500" step="10" value={timeEstimate} onChange={(e) => setTimeEstimate(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Your Experience / Positioning</label>
                        <select value={experience} onChange={(e) => setExperience(e.target.value as any)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="junior">Junior (Building portfolio, cheap)</option>
                            <option value="mid">Mid-Level (Competent, reliable)</option>
                            <option value="senior">Senior (High quality, autonomous)</option>
                            <option value="expert">Expert (Niche authority, premium)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Project Complexity Factor</label>
                        <select value={complexity} onChange={(e) => setComplexity(Number(e.target.value))} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value={1}>Standard (Using templates, basic logic)</option>
                            <option value={2}>Complex (Custom integrations, advanced routing)</option>
                            <option value={3}>Bleeding Edge (Unproven tech, heavy R&D required)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Client Volatility / Risk</label>
                        <select value={riskLevel} onChange={(e) => setRiskLevel(Number(e.target.value))} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value={1}>Low Risk (Clear specs, decisive client)</option>
                            <option value={2}>Medium Risk (Vague specs, potential scope creep)</option>
                            <option value={3}>High Risk (Toxic traits, committee approvals, legacy tech)</option>
                        </select>
                    </div>

                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center", position: "relative", overflow: "hidden" }}>
                        <div className="input-label" style={{ color: "var(--text-secondary)", marginBottom: "0.5rem", zIndex: 2, position: "relative" }}>Suggested Fixed-Bid Price</div>
                        <div style={{ fontSize: "3.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1, zIndex: 2, position: "relative" }}>
                            {formatCurrency(suggestedPrice * rate, currency)}
                        </div>
                        <div style={{ position: "absolute", bottom: "-30px", left: "0", right: "0", height: "100px", background: "var(--accent-primary)", opacity: 0.1, filter: "blur(30px)", zIndex: 1 }}></div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid ${scoreColor}`, backgroundColor: "var(--bg-tertiary)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>Margin Target</div>
                        <div style={{ fontSize: "1.25rem", color: scoreColor, fontWeight: "bold" }}>{scoreStatus}</div>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                            Projected True Profit Margin: <strong>{profitMargin.toFixed(1)}%</strong>
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Base Labor Cost</span>
                            <span style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{formatCurrency(rawCost * rate, currency)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Risk & Complexity Buffer</span>
                            <span style={{ color: "var(--success-color, #22c55e)", fontFamily: "var(--font-mono)" }}>+{formatCurrency((suggestedPrice - rawCost) * rate, currency)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Est. Biz Overhead (20%)</span>
                            <span style={{ color: "var(--error-color, #ef4444)", fontFamily: "var(--font-mono)" }}>-{formatCurrency(overhead * rate, currency)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
