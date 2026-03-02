const fs = require('fs');
const path = require('path');

const PROJECT_DIR = process.cwd();

const tools = [
    {
        name: "Content ROI Calculator",
        slug: "content-roi-calculator",
        description: "Calculate the exact hourly return of creating specific pieces of content mapped against revenue.",
        primaryKeyword: "content roi calculator",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ContentROICalculator() {
    const [hours, setHours] = useState(10);
    const [revenue, setRevenue] = useState(500);
    const [conversion, setConversion] = useState(2); // %

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("content-roi-calculator");
            tracked.current = true;
        }
    }, []);

    const hourlyRate = revenue / hours;
    
    // Simplistic ROI percentage assuming a base value of time is $50/hr
    const costOfTime = hours * 50; 
    const roiPercentage = ((revenue - costOfTime) / costOfTime) * 100;

    const faqs = [
        { question: "Why map ROI hourly?", answer: "Content creation is labor. If your YouTube adsense brings in $100 but the video took 40 hours to make, you are making $2.50 an hour. You must know your effective hourly rate." }
    ];

    const seoContent = (
        <>
            <h2>The Only Content Metric That Matters</h2>
            <p>Likes and retweets don't pay your mortgage. Effective hourly rate across your content portfolio dictates your true business health.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/channel-profit-predictor">Channel Profit Predictor</Link></li>
                <li><Link href="/tools/creator-monetization-calculator">Creator Monetization Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Content ROI Calculator" description="Compute the real financial return on your creative hours." slug="content-roi-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Hours Spent on Content</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{hours}h</span>
                        </label>
                        <input type="range" min="1" max="100" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Direct Revenue Earned ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>\${revenue}</span>
                        </label>
                        <input type="range" min="0" max="10000" step="100" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Conversion Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{conversion}%</span>
                        </label>
                        <input type="range" min="0.1" max="10" step="0.1" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Effective Hourly Rate</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-mono)", color: hourlyRate > 50 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>\${hourlyRate.toFixed(2)}</div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginTop: "2rem", width: "100%" }}>
                        <div style={{ padding: "1.5rem", backgroundColor: roiPercentage > 0 ? "rgba(35, 134, 255, 0.05)" : "rgba(239, 68, 68, 0.05)", borderRadius: "var(--radius-sm)", border: roiPercentage > 0 ? "1px solid var(--accent-primary)" : "1px solid var(--error-color)", textAlign: "center" }}>
                            <div style={{ fontSize: "0.875rem", color: roiPercentage > 0 ? "var(--accent-primary)" : "var(--error-color)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>Calculated True ROI</div>
                            <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>{roiPercentage.toFixed(0)}%</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>*Assumes baseline opportunity cost of $50/hr</div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Viral Potential Score",
        slug: "viral-potential-score",
        description: "Check the virality probability by rating hook strength, trend relevance, and emotional resonance.",
        primaryKeyword: "viral potential score",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ViralPotentialScore() {
    const [hook, setHook] = useState(50);
    const [trend, setTrend] = useState(50);
    const [emotion, setEmotion] = useState(50);
    const [shareability, setShareability] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("viral-potential-score");
            tracked.current = true;
        }
    }, []);

    // 40% hook, 20% trend, 20% emotion, 20% shareability
    const score = Math.round((hook * 0.4) + (trend * 0.2) + (emotion * 0.2) + (shareability * 0.2));

    let chance = "Low";
    if (score > 85) chance = "Extreme";
    else if (score > 70) chance = "High";
    else if (score > 50) chance = "Moderate";

    const faqs = [
        { question: "What makes content shareable?", answer: "Shareability is status. Will the person sharing this piece of content look smarter, funnier, or better informed to their peers? If yes, they share it." }
    ];

    const seoContent = (
        <>
            <h2>The Mathematics of Virality</h2>
            <p>Virality isn't luck; it's an algorithm. Without a hook, nobody stops. Without shareability, the algorithmic loop terminates.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/audience-growth-estimator">Audience Growth Estimator</Link></li>
                <li><Link href="/tools/content-idea-profit-score">Content Idea Profit Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Viral Potential Score" description="Rank your content's algorithmic hooks before hitting publish." slug="viral-potential-score" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>First 3 Seconds Hook (100 = Perfect)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{hook}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={hook} onChange={(e) => setHook(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Trend Relevance (100 = Peaking Now)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{trend}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={trend} onChange={(e) => setTrend(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Emotional Impact (Awe, Anger, Joy)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{emotion}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={emotion} onChange={(e) => setEmotion(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Shareability (Status Enhancement)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{shareability}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={shareability} onChange={(e) => setShareability(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div>
                        <h3 className="input-label" style={{ textAlign: "center" }}>Viral Probability Score</h3>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "0.25rem", margin: "1rem 0" }}>
                            <div style={{ fontSize: "6rem", fontFamily: "var(--font-serif)", color: score > 70 ? "var(--accent-primary)" : "var(--text-primary)", lineHeight: 1 }}>{score}</div>
                            <div style={{ fontSize: "1.5rem", color: "var(--text-secondary)" }}>/100</div>
                        </div>
                    </div>
                    <div style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "1.25rem", padding: "0.5rem 1.5rem", borderRadius: "2rem", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-secondary)", color: score > 70 ? "var(--accent-primary)" : "var(--text-primary)" }}>
                        {chance} Chance of Escape Velocity
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Channel Profit Predictor",
        slug: "channel-profit-predictor",
        description: "Project out yearly revenue based on historical views and RPM performance data.",
        primaryKeyword: "channel profit predictor",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ChannelProfitPredictor() {
    const [cpm, setCpm] = useState(5);
    const [monthlyViews, setMonthlyViews] = useState(100000);
    const [sponsorships, setSponsorships] = useState(500);
    const [growth, setGrowth] = useState(2); // % monthly compounding

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("channel-profit-predictor");
            tracked.current = true;
        }
    }, []);

    let yearlyAdsense = 0;
    let yearlySponsors = 0;
    let currentViews = monthlyViews;

    for (let i = 0; i < 12; i++) {
        yearlyAdsense += (currentViews / 1000) * cpm;
        yearlySponsors += sponsorships;
        currentViews *= (1 + (growth / 100));
    }

    const total = yearlyAdsense + yearlySponsors;

    const faqs = [
        { question: "Why include growth rate?", answer: "A channel is not static. If your channel grows by 2% sequentially per month, your 12th month will generate significantly more revenue than month 1." }
    ];

    const seoContent = (
        <>
            <h2>Modeling Media Business Economics</h2>
            <p>Treat your channel like a media acquisition company. Calculate your predictable yearly earnings to make smart hiring and investment decisions.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/youtube-niche-validator">YouTube Niche Validator</Link></li>
                <li><Link href="/tools/creator-monetization-calculator">Creator Monetization Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Channel Profit Predictor" description="Calculate forward-looking 12-month trailing earnings." slug="channel-profit-predictor" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Niche CPM / RPM ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>\${cpm}</span>
                        </label>
                        <input type="range" min="1" max="40" step="0.5" value={cpm} onChange={(e) => setCpm(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Current Monthly Views</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{monthlyViews.toLocaleString()}</span>
                        </label>
                        <input type="range" min="10000" max="10000000" step="10000" value={monthlyViews} onChange={(e) => setMonthlyViews(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Average Monthly Sponsorships ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>\${sponsorships.toLocaleString()}</span>
                        </label>
                        <input type="range" min="0" max="20000" step="500" value={sponsorships} onChange={(e) => setSponsorships(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Base Growth Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{growth}%</span>
                        </label>
                        <input type="range" min="0" max="20" step="1" value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 className="input-label">Year 1 Financial Projection</h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)" }}>AdSense Revenue</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>\${Math.round(yearlyAdsense).toLocaleString()}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Sponsorships</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>\${Math.round(yearlySponsors).toLocaleString()}</strong>
                        </div>
                    </div>

                    <div style={{ marginTop: "1.5rem", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div style={{ fontSize: "0.875rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Total Projected ARR</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>\${Math.round(total).toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Creator Business Model Picker",
        slug: "creator-business-model-picker",
        description: "Diagnose your audience size, skills, and niche to find your exact optimal monetization vehicle.",
        primaryKeyword: "creator business model picker",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function CreatorBusinessModelPicker() {
    const [audienceType, setAudienceType] = useState("B2B"); // B2B, B2C, Entertainment
    const [size, setSize] = useState("Micro"); // Micro, Mid, Huge
    const [skills, setSkills] = useState("Writing"); // Writing, Video, Code, Coaching

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("creator-business-model-picker");
            tracked.current = true;
        }
    }, []);

    let recommendation = "";
    let desc = "";

    if (audienceType === "B2B") {
        if (size === "Micro") {
            recommendation = "High-Ticket Consulting";
            desc = "With a small, highly targeted B2B audience, you cannot make money on ads. You must sell your direct expertise for large retainers.";
        } else {
            recommendation = "B2B SaaS / Paid Newsletter";
            desc = "A large B2B audience is the holy grail. Convert attention into recurring software subscriptions or premium intel reports.";
        }
    } else if (audienceType === "B2C") {
        if (size === "Micro") {
            recommendation = "Digital Products / Courses";
            desc = "To monetize a small B2C audience, you need high margins. Sell $50-$150 digital courses to your true fans.";
        } else {
            recommendation = "Sponsorships / Memberships";
            desc = "Leverage volume. Sell highly targeted sponsorships and build a low-cost ($5-$10/mo) membership community.";
        }
    } else {
        // Entertainment
        if (size === "Huge") {
            recommendation = "AdSense + Brand Merch";
            desc = "Entertainment audiences are notoriously hard to convert to high-ticket items. Rely on massive volume AdSense, integrated sponsorships, and merch.";
        } else {
            recommendation = "Patreon / Crowdfunding";
            desc = "A small entertainment audience requires extreme loyalty. Use patronage models where super-fans fund your continued art.";
        }
    }

    const faqs = [
        { question: "Why does B2B differ from Entertainment?", answer: "A B2B follower might use your knowledge to make $10,000. They will gladly pay $500 for a course. An entertainment follower is just killing time and is unlikely to buy anything above $20." }
    ];

    const seoContent = (
        <>
            <h2>Stop Mixing Models</h2>
            <p>You cannot use a Mr. Beast monetization model (AdSense volume) on a highly technical B2B channel. Align the model to the audience archetype.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/creator-monetization-calculator">Creator Monetization Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Creator Business Model Picker" description="Match your niche and audience to the highest leverage income stream." slug="creator-business-model-picker" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Audience Archetype</label>
                        <select value={audienceType} onChange={(e) => setAudienceType(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="B2B">B2B (Professionals, Founders, Tech)</option>
                            <option value="B2C">B2C (Fitness, Finance, Hobbyists)</option>
                            <option value="Entertainment">Entertainment (Comedy, Gaming, Vlogs)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Current Audience Size</label>
                        <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="Micro">Micro (under 10k engaged)</option>
                            <option value="Mid">Mid-Size (10k - 100k engaged)</option>
                            <option value="Huge">Huge Mass Market (100k+)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Core Creator Skillset</label>
                        <select value={skills} onChange={(e) => setSkills(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="Writing">Writing / Synthesis</option>
                            <option value="Video">Video Production / Speaking</option>
                            <option value="Code">Coding / Building Tools</option>
                            <option value="Coaching">1-on-1 Communication / Coaching</option>
                        </select>
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "1rem" }}>Optimal Monetization Engine</h3>
                    <div style={{ backgroundColor: "rgba(35, 134, 255, 0.1)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--accent-primary)", textAlign: "center", width: "100%" }}>
                        <div style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--accent-primary)", marginBottom: "1rem" }}>{recommendation}</div>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6 }}>{desc}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Newsletter Growth Calculator",
        slug: "newsletter-growth-calculator",
        description: "Project your newsletter subscriber list over time by calculating traffic, opt-ins, and churn rates.",
        primaryKeyword: "newsletter growth calculator",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function NewsletterGrowthCalculator() {
    const [traffic, setTraffic] = useState(10000); // monthly traffic
    const [optIn, setOptIn] = useState(3); // %
    const [churn, setChurn] = useState(1); // monthly expected churn %
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("newsletter-growth-calculator");
            tracked.current = true;
        }
    }, []);

    const newSubsPerMonth = Math.round(traffic * (optIn / 100));
    
    // Simulate 12 months with churn
    let subs = 0;
    for(let i=0; i<12; i++){
        subs += newSubsPerMonth;
        subs = subs * (1 - (churn / 100)); // apply churn
    }
    const year1 = Math.round(subs);

    const faqs = [
        { question: "Why is churn so important?", answer: "Without factoring in users who naturally unsubscribe, your growth curve will look infinitely linear. High friction opt-ins usually yield lower churn." }
    ];

    const seoContent = (
        <>
            <h2>The Mathematics of the Inbox</h2>
            <p>An owned audience is your single greatest asset. Calculate how conversion rate optimizations radically shift your end-of-year subscriber count.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/audience-growth-estimator">Audience Growth Estimator</Link></li>
                <li><Link href="/tools/creator-business-model-picker">Creator Business Model Picker</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Newsletter Growth Calculator" description="Model subscriber list velocity against expected churn parameters." slug="newsletter-growth-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Unique Traffic</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{traffic.toLocaleString()}</span>
                        </label>
                        <input type="range" min="1000" max="1000000" step="1000" value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Opt-In Conversion Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{optIn}%</span>
                        </label>
                        <input type="range" min="0.1" max="15" step="0.1" value={optIn} onChange={(e) => setOptIn(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Churn Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{churn}%</span>
                        </label>
                        <input type="range" min="0" max="10" step="0.1" value={churn} onChange={(e) => setChurn(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div>
                        <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>New Monthly Subs (Gross)</h3>
                        <div style={{ fontSize: "3rem", fontFamily: "var(--font-mono)", color: "var(--text-primary)", lineHeight: 1 }}>{newSubsPerMonth.toLocaleString()}</div>
                    </div>
                    
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)" }}>
                        <div style={{ fontSize: "0.875rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Projected Year 1 Net Subs</div>
                        <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: "var(--text-primary)", fontWeight: "bold", lineHeight: 1 }}>{year1.toLocaleString()}</div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>*Factoring in {churn}% monthly decay</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    }
];

const clusterHubCode = `import Link from "next/link";
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
`;

function generateTools() {
    tools.forEach(tool => {
        const dirPath = path.join(PROJECT_DIR, 'app', 'tools', tool.slug);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const filePath = path.join(dirPath, 'page.tsx');
        fs.writeFileSync(filePath, tool.componentCode, 'utf8');
        console.log("Created " + filePath);
    });

    // We also need tools 1-5 definitions for the registry file.
    // So let's create a combined registry here.
    const allToolsRegistry = [
        { "name": "Content Idea Profit Score", "slug": "content-idea-profit-score", "description": "Evaluate your content ideas based on niche competition, audience demand, and monetization potential.", "primaryKeyword": "content idea profit score" },
        { "name": "YouTube Niche Validator", "slug": "youtube-niche-validator", "description": "Determine the viability of a YouTube niche by estimating reach, CPM, and structural difficulty.", "primaryKeyword": "youtube niche validator" },
        { "name": "Creator Monetization Calculator", "slug": "creator-monetization-calculator", "description": "Calculate projected monthly revenue based on audience size, estimated engagement, and conversion rates.", "primaryKeyword": "creator monetization calculator" },
        { "name": "Audience Growth Estimator", "slug": "audience-growth-estimator", "description": "Project your follower growth over 6 to 12 months based on compound growth rates.", "primaryKeyword": "audience growth estimator" },
        { "name": "Posting Frequency Optimizer", "slug": "posting-frequency-optimizer", "description": "Determine the ideal weekly posting cadence based on your available hours and content complexity.", "primaryKeyword": "posting frequency optimizer" },
        ...tools.map(t => ({ name: t.name, slug: t.slug, description: t.description, primaryKeyword: t.primaryKeyword }))
    ];

    const registryContent = `import type { ToolMetadata } from "./types";

export const BUILDERS_CREATORS_TOOLS: ToolMetadata[] = [\n`;

    const toolEntries = allToolsRegistry.map(t => '  { "name": "' + t.name + '", "slug": "' + t.slug + '", "description": "' + t.description.replace(/"/g, '\\"') + '", "primaryKeyword": "' + t.primaryKeyword + '" }').join(',\\n');

    const registryEnd = `\n];\n`;

    const registryFilePath = path.join(PROJECT_DIR, 'lib', 'buildersCreatorsTools.ts');
    fs.writeFileSync(registryFilePath, registryContent + toolEntries + registryEnd, 'utf8');
    console.log("Created Builders Creators Registry File");

    // Create Hub
    const hubDir = path.join(PROJECT_DIR, 'app', 'tools', 'builders-creators');
    if (!fs.existsSync(hubDir)) {
        fs.mkdirSync(hubDir, { recursive: true });
    }
    fs.writeFileSync(path.join(hubDir, 'page.tsx'), clusterHubCode, 'utf8');
    console.log("Created Hub Page");
}

generateTools();
