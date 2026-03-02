"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function SocialMediaROICalculator() {
    const [contentCost, setContentCost] = useState<number>(500);
    const [timeInvestment, setTimeInvestment] = useState<number>(10);
    const [hourlyRate, setHourlyRate] = useState<number>(50);
    const [leadsGenerated, setLeadsGenerated] = useState<number>(150);
    const [conversionRate, setConversionRate] = useState<number>(2);
    const [revenuePerCustomer, setRevenuePerCustomer] = useState<number>(200);

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("social-media-roi-calculator");
            tracked.current = true;
        }
    }, []);

    const totalCostOfTime = timeInvestment * hourlyRate;
    const totalInvestment = contentCost + totalCostOfTime;

    const customersAcquired = leadsGenerated * (conversionRate / 100);
    const totalRevenue = customersAcquired * revenuePerCustomer;

    const netProfit = totalRevenue - totalInvestment;
    const roiPercentage = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;

    let effectivenessScore = "Poor";
    let scoreColor = "var(--error-color, #ef4444)";
    if (roiPercentage > 300) {
        effectivenessScore = "Excellent";
        scoreColor = "var(--success-color, #22c55e)";
    } else if (roiPercentage > 50) {
        effectivenessScore = "Good";
        scoreColor = "var(--accent-primary)";
    } else if (roiPercentage > 0) {
        effectivenessScore = "Marginal";
        scoreColor = "#eab308";
    }

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    const faqs = [
        { question: "Why do I need to include an hourly rate?", answer: "Social media is often incorrectly viewed as 'free' marketing. If you spend 10 hours editing a video and your time is worth $50/hour, that video cost $500. Without accounting for labor, your ROI will be a dangerously inflated vanity metric." },
        { question: "What is a good social media ROI?", answer: "A healthy baseline ROI for organic social media is typically around 50-100% net positive after accounting for all labor and tool costs. If you are consistently below 0%, you are subsidizing the platform with free labor." },
        { question: "Should I track ROI per channel or overall?", answer: "Always track ROI per channel. Averaging your ROI across platforms hides the inefficiency of poorly performing channels while dragging down the metrics of highly profitable ones." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Social Media ROI Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate true social media ROI by factoring in labor hours, content costs, lead velocity, and customer lifetime value."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Tracking True Returns on Content Investment</h2>
            <p>Most marketers measure social media success using superficial analytics: likes, comments, and follower growth. While these indicate engagement, they are utterly decoupled from business utility. The social media ROI calculator enforces financial accountability by calculating the true cost of content creation—especially the shadow cost of unbillable labor—and mapping it directly against lead conversion velocity and revenue capture.</p>
            <p>Our methodology ensures you don't fall into the 'free marketing' trap. Measuring your time investment against your target hourly rate allows you to determine whether a channel is mathematically sustainable. For modern B2B SaaS and agency operations, tracking exact channel effectiveness is critical. Understanding metrics like how to calculate social media marketing ROI, factoring labor into content marketing costs, and converting social leads to revenue is required to generate positive unit economics.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/workflow-cost-calculator">Manual Workflow Cost Calculator</Link></li>
                <li><Link href="/tools/creator-monetization-calculator">Creator Monetization Calculator</Link></li>
                <li><Link href="/tools/content-monetization-planner">Content Monetization Planner</Link></li>
                <li><Link href="/tools/saas-pricing-calculator">SaaS Pricing Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Social Media ROI Calculator" description="Stop tracking vanity metrics. Calculate your actual financial return by factoring in labor, production costs, and lead conversion rates." slug="social-media-roi-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <h3 style={{ fontSize: "1rem", color: "var(--accent-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", margin: 0 }}>The Investment</h3>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Hard Content Costs (Tools, Ads, Contractors)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{formatter.format(contentCost)}</span>
                        </label>
                        <input type="range" min="0" max="10000" step="100" value={contentCost} onChange={(e) => setContentCost(Number(e.target.value))} />
                    </div>

                    <div className="input-group" style={{ display: "flex", gap: "1rem" }}>
                        <div style={{ flex: 1 }}>
                            <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Hours Spent</span>
                                <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{timeInvestment}h</span>
                            </label>
                            <input type="range" min="0" max="100" step="1" value={timeInvestment} onChange={(e) => setTimeInvestment(Number(e.target.value))} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Hourly Rate</span>
                                <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>${hourlyRate}/h</span>
                            </label>
                            <input type="range" min="10" max="250" step="5" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} />
                        </div>
                    </div>

                    <h3 style={{ fontSize: "1rem", color: "var(--accent-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", margin: 0, marginTop: "1rem" }}>The Return</h3>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Leads Generated</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{leadsGenerated}</span>
                        </label>
                        <input type="range" min="0" max="5000" step="10" value={leadsGenerated} onChange={(e) => setLeadsGenerated(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Lead-to-Customer Conversion</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{conversionRate}%</span>
                        </label>
                        <input type="range" min="0.1" max="15" step="0.1" value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Revenue Per Customer (LTV)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{formatter.format(revenuePerCustomer)}</span>
                        </label>
                        <input type="range" min="10" max="5000" step="50" value={revenuePerCustomer} onChange={(e) => setRevenuePerCustomer(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>True ROI Percentage</div>
                        <div style={{ fontSize: "4rem", color: roiPercentage >= 0 ? "var(--accent-primary)" : "var(--error-color)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {roiPercentage >= 0 ? "+" : ""}{roiPercentage.toFixed(1)}%
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid ${scoreColor}`, backgroundColor: "var(--bg-tertiary)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>Channel Effectiveness</div>
                        <div style={{ fontSize: "1.25rem", color: scoreColor, fontWeight: "bold" }}>{effectivenessScore}</div>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                            Total Subsidized Investment: {formatter.format(totalInvestment)}
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Derived Customers</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{Math.floor(customersAcquired)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Gross Return</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{formatter.format(totalRevenue)}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Net Profit Generated</span>
                            <strong style={{ color: netProfit >= 0 ? "var(--success-color, #22c55e)" : "var(--error-color)", fontFamily: "var(--font-mono)" }}>
                                {netProfit >= 0 ? "+" : ""}{formatter.format(netProfit)}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
