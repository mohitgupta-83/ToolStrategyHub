"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ContentMonetizationPlanner() {
    const [audience, setAudience] = useState(50000);
    const [platform, setPlatform] = useState("youtube");
    const [engagement, setEngagement] = useState(3);
    const [preference, setPreference] = useState("passive");

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("content-monetization-planner");
            tracked.current = true;
        }
    }, []);

    const calculateRoadmap = () => {
        const engagedTotal = Math.round(audience * (engagement / 100));
        let roadmap = [];
        let projectedIncome = 0;

        if (platform === "youtube") {
            const rpm = 5; // $5 per 1000 views
            const monthlyViews = engagedTotal * 4; // 4 videos a month
            const adSense = (monthlyViews / 1000) * rpm;
            projectedIncome += adSense;

            roadmap.push({ phase: "Phase 1: Foundation", strategy: "YouTube Partner Program (AdSense) based on steady upload schedule.", value: `$${Math.round(adSense)}/mo` });

            if (preference === "active") {
                const sponsorViews = monthlyViews;
                const sponsorIncome = (sponsorViews / 1000) * 20; // $20 CPM
                projectedIncome += sponsorIncome;
                roadmap.push({ phase: "Phase 2: Direct Sales", strategy: "Dedicated video sponsorships via outbound outreach to B2B brands.", value: `$${Math.round(sponsorIncome)}/mo` });
            } else {
                const affiliateIncome = engagedTotal * 0.01 * 10; // 1% click, $10 commission
                projectedIncome += affiliateIncome;
                roadmap.push({ phase: "Phase 2: Passive Automation", strategy: "Evergreen Amazon/Software affiliate links in all video descriptions.", value: `$${Math.round(affiliateIncome)}/mo` });
            }
        }
        else if (platform === "newsletter" || platform === "twitter") {
            if (preference === "active") {
                const consultingClients = Math.round(engagedTotal * 0.005);
                const consultingIncome = consultingClients * 500;
                projectedIncome += consultingIncome;
                roadmap.push({ phase: "Phase 1: High Ticket", strategy: "Done-for-you consulting or coaching based on newsletter authority.", value: `$${Math.round(consultingIncome)}/mo` });

                const sponsorIncome = engagedTotal * 0.05 * 50; // 5% open, $50 CPM
                projectedIncome += sponsorIncome;
                roadmap.push({ phase: "Phase 2: Sponsorships", strategy: "Sell dedicated email blasts or Twitter thread sponsorships.", value: `$${Math.round(sponsorIncome)}/mo` });
            } else {
                const courseBuyers = Math.round(engagedTotal * 0.02);
                const courseIncome = courseBuyers * 99; // $99 course
                projectedIncome += courseIncome;
                roadmap.push({ phase: "Phase 1: Digital Products", strategy: "Launch an evergreen $99 video course solving one specific problem.", value: `$${Math.round(courseIncome)}/mo` });
                roadmap.push({ phase: "Phase 2: Scale", strategy: "Set up automated email sequences that pitch the course 3 days after subscribing.", value: "Compounding ROI" });
            }
        }
        else {
            // Instagram/TikTok
            const affiliateIncome = engagedTotal * 0.005 * 20; // 0.5% conversion, $20 commission
            projectedIncome += affiliateIncome;
            roadmap.push({ phase: "Phase 1: Affiliate", strategy: "Link-in-bio storefronts (LTK, Amazon, Stan Store).", value: `$${Math.round(affiliateIncome)}/mo` });

            if (preference === "active") {
                roadmap.push({ phase: "Phase 2: Brand Deals", strategy: "UGC content creation and sponsored posts via agency representation.", value: "Variable" });
            } else {
                const subBuyers = Math.round(engagedTotal * 0.01);
                const subIncome = subBuyers * 5;
                projectedIncome += subIncome;
                roadmap.push({ phase: "Phase 2: Paid Community", strategy: "Patreon or Skool community for behind-the-scenes content.", value: `$${Math.round(subIncome)}/mo` });
            }
        }

        return { roadmap, projectedIncome };
    };

    const result = calculateRoadmap();

    const faqs = [
        { question: "Why is passive monetization lower initially?", answer: "Passive monetization (like Adsense or affiliates) relies entirely on volume. Active monetization (like consulting or high-ticket sales) allows you to extract maximum value from a small, deeply engaged audience." },
        { question: "Can I do both active and passive?", answer: "Yes, but focus is required. Trying to launch a high-ticket coaching program while simultaneously setting up 50 affiliate funnels usually results in both failing. Stagger your roadmap phases." }
    ];

    const seoContent = (
        <>
            <h2>Building the Creator Stack</h2>
            <p>A fatal mistake creators make is relying entirely on algorithmic ad revenue rather than owning the distribution. A robust content monetization strategy layers passive, low-friction products on top of active, high-margin services to create income stability.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/creator-monetization-calculator">Creator Monetization Funnel Builder</Link></li>
                <li><Link href="/tools/revenue-model-designer">Revenue Model Designer</Link></li>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Content Monetization Planner" description="Map out a phased revenue strategy based on your audience size, host platform, and lifestyle preferences." slug="content-monetization-planner" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Total Audience / Subscribers</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{audience.toLocaleString()}</span>
                        </label>
                        <input type="range" min="1000" max="1000000" step="1000" value={audience} onChange={(e) => setAudience(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Primary Platform</label>
                        <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="youtube">YouTube (Long/Short Form)</option>
                            <option value="newsletter">Newsletter / Blog</option>
                            <option value="twitter">X / LinkedIn (Text)</option>
                            <option value="instagram">Instagram / TikTok</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Average Engagement Rate</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{engagement}%</span>
                        </label>
                        <input type="range" min="0.1" max="25" step="0.1" value={engagement} onChange={(e) => setEngagement(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Monetization Preference</label>
                        <select value={preference} onChange={(e) => setPreference(e.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="passive">Passive (Digital Products, Affiliates, Ads)</option>
                            <option value="active">Active (Consulting, Brand Deals, Services)</option>
                        </select>
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Projected Monthly Income Capacity</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            ${result.projectedIncome.toLocaleString()}
                        </div>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.5rem", lineHeight: 1.4 }}>
                            Assumes standard industry conversion metrics mapped against your engaged user baseline.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: "var(--text-primary)", marginBottom: "1rem", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.9rem" }}>Strategy Roadmap</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {result.roadmap.map((step, idx) => (
                                <div key={idx} style={{ padding: "1.25rem", borderLeft: "4px solid var(--border-focus)", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                        <div style={{ fontWeight: "bold", color: "var(--accent-primary)", fontSize: "1.1rem" }}>{step.phase}</div>
                                        <div style={{ fontFamily: "var(--font-mono)", color: "var(--success-color, #22c55e)", fontSize: "0.95rem" }}>{step.value}</div>
                                    </div>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                                        {step.strategy}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
