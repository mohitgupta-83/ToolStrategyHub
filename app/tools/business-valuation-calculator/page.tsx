"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function BusinessValuationCalculator() {
    const [revenue, setRevenue] = useState<number>(1000000);
    const [margin, setMargin] = useState<number>(20);
    const [growth, setGrowth] = useState<number>(30);
    const [industry, setIndustry] = useState<"saas" | "ecommerce" | "agency" | "retail" | "deeptech">("saas");

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("business-valuation-calculator");
            tracked.current = true;
        }
    }, []);

    let baseMultiplier = 3;
    let multiplierType = "EBITDA"; // Default is multiple of profit

    switch (industry) {
        case "saas":
            baseMultiplier = 5;
            multiplierType = "Revenue"; // SaaS is often valued on top-line revenue multiples
            break;
        case "ecommerce":
            baseMultiplier = 3.5;
            multiplierType = "EBITDA";
            break;
        case "agency":
            baseMultiplier = 2.5; // Agencies have low multiples due to un-scalable labor
            multiplierType = "EBITDA";
            break;
        case "retail":
            baseMultiplier = 1.5;
            multiplierType = "EBITDA";
            break;
        case "deeptech":
            baseMultiplier = 10;
            multiplierType = "Revenue";
            break;
    }

    // Apply growth premium
    let growthPremium = 1;
    if (growth > 50) growthPremium = 1.5;
    else if (growth > 20) growthPremium = 1.2;
    else if (growth < 5) growthPremium = 0.8;

    const ebitda = revenue * (margin / 100);

    let valuation = 0;
    if (multiplierType === "Revenue") {
        valuation = revenue * baseMultiplier * growthPremium;
    } else {
        valuation = ebitda * baseMultiplier * growthPremium;
    }

    const lowRange = valuation * 0.8;
    const highRange = valuation * 1.2;

    let insightStatus = "High Potential";
    let insightColor = "var(--success-color, #22c55e)";

    if (margin < 10) {
        insightStatus = "Margin Squeeze (High Risk)";
        insightColor = "var(--error-color, #ef4444)";
    } else if (growth < 10 && industry === "saas") {
        insightStatus = "Stagnant (Low Acquisition Interest)";
        insightColor = "#eab308";
    }

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    const faqs = [
        { question: "Why is SaaS valued on Revenue while Agencies are valued on Profit (EBITDA)?", answer: "Software margins approach 90% at scale, so investors care about acquiring top-line market share. Agencies require proportional human labor to scale, meaning gross revenue does not guarantee net scalability. Investors want to buy the net profit (EBITDA), not a heavy payroll." },
        { question: "What is a growth premium?", answer: "Multipliers adjust based on trajectory. A company doubling year-over-year commands a massive premium multiplier compared to an identical company growing at 2%. Momentum demands a higher entry price." },
        { question: "Can a pre-revenue startup use this?", answer: "No. Pre-revenue startups are valued based on team pedigree, market TAM, and negotiating leverage. This calculator uses quantitative cash flow metrics suited for operational businesses." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Business Valuation Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate your startup or agency's enterprise value using revenue, margin, and industry-specific EBITDA multipliers."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Demystifying Enterprise Value</h2>
            <p>Most founders drastically overestimate or maliciously underestimate the value of their companies because they apply incorrect paradigm multiples. A digital marketing agency doing $5M in revenue cannot be valued at a 10x top-line multiple like a B2B SaaS company. That fundamentally ignores how private equity and strategic acquirers evaluate risk and scalability. The business valuation calculator correctly assigns EBITDA or Revenue multiples based on your exact business archetype.</p>
            <p>Our algorithm accounts for the reality of M&A (Mergers and Acquisitions). By inputting your top-line revenue, net profit margin, and trailing annual growth rate, we simulate a standard diligence estimate. Relevant search strategies include how to calculate the valuation of a small business, SaaS revenue multiple calculator, EBITDA agency valuation formula, the difference between enterprise value and equity value, and how to improve investor readiness scores before going to market. Selling a company is the ultimate test of its architecture; build it to be valuable on paper, not just in your mind.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/startup-runway-calculator">Startup Runway Calculator</Link></li>
                <li><Link href="/tools/saas-pricing-calculator">SaaS Pricing Calculator</Link></li>
                <li><Link href="/tools/revenue-model-designer">Revenue Model Designer</Link></li>
                <li><Link href="/tools/market-size-estimator">TAM / SAM / SOM Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Business Valuation Calculator" description="Estimate your company's exit value using industry-standard EBITDA and Revenue multipliers." slug="business-valuation-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Annual Revenue (Trailing 12M)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{formatter.format(revenue)}</span>
                        </label>
                        <input type="range" min="100000" max="25000000" step="50000" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Net Profit Margin</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{margin}%</span>
                        </label>
                        <input type="range" min="-10" max="60" step="1" value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Year-over-Year Growth</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{growth}%</span>
                        </label>
                        <input type="range" min="-20" max="200" step="5" value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Industry Archetype</label>
                        <select value={industry} onChange={(e) => setIndustry(e.target.value as any)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="saas">B2B SaaS (Software as a Service)</option>
                            <option value="ecommerce">E-Commerce / Direct to Consumer</option>
                            <option value="agency">Agency / Consulting / Services</option>
                            <option value="retail">Retail / Brick & Mortar</option>
                            <option value="deeptech">Deep Tech / AI Core</option>
                        </select>
                    </div>

                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Estimated Enterprise Value</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatter.format(valuation)}
                        </div>
                        <div style={{ fontSize: "1rem", color: "var(--accent-primary)", marginTop: "1rem" }}>
                            Expected Range: {formatter.format(lowRange)} – {formatter.format(highRange)}
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid ${insightColor}`, backgroundColor: "var(--bg-tertiary)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>Investor Readiness Insight</div>
                        <div style={{ fontSize: "1.25rem", color: insightColor, fontWeight: "bold" }}>{insightStatus}</div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>EBITDA (Profit)</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{formatter.format(ebitda)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Base Multiplier</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{baseMultiplier}x {multiplierType}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Growth Multiplier Adjustment</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{growthPremium}x</strong>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
