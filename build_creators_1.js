const fs = require('fs');
const path = require('path');

const PROJECT_DIR = process.cwd();

const tools = [
    {
        name: "Content Idea Profit Score",
        slug: "content-idea-profit-score",
        description: "Evaluate your content ideas based on niche competition, audience demand, and monetization potential.",
        primaryKeyword: "content idea profit score",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ContentIdeaProfitScore() {
    const [competition, setCompetition] = useState(50);
    const [demand, setDemand] = useState(50);
    const [monetization, setMonetization] = useState(50);
    const [effort, setEffort] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("content-idea-profit-score");
            tracked.current = true;
        }
    }, []);

    const score = Math.round(((100 - competition) * 0.25) + (demand * 0.35) + (monetization * 0.25) + ((100 - effort) * 0.15));

    let recommendation = "Discard Idea";
    if (score > 80) recommendation = "Highly Profitable. Execution should begin immediately.";
    else if (score > 60) recommendation = "Strong Potential. Validate with a minimum viable post.";
    else if (score > 40) recommendation = "Average. Requires unique angle to stand out.";

    const faqs = [
        { question: "Why is competition scored inversely?", answer: "High competition means higher cost of acquisition and harder organic reach. Lower competition increases profit potential." },
        { question: "What does 'monetization potential' mean?", answer: "Are you selling high-ticket B2B software or low-ticket B2C merch? Higher LTV means higher potential." }
    ];

    const seoContent = (
        <>
            <h2>Stop Wasting Time on Bad Content Ideas</h2>
            <p>Content creation is an investment of your finite time. Calculating profit potential ensures you're building assets, not just noise.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/youtube-niche-validator">YouTube Niche Validator</Link></li>
                <li><Link href="/tools/content-roi-calculator">Content ROI Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Content Idea Profit Score" description="Calculate the expected profitability of a content idea based on market dynamics." slug="content-idea-profit-score" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Niche Competition (100 = Saturated)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{competition}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={competition} onChange={(e) => setCompetition(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Audience Demand (100 = High Search Volume)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{demand}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={demand} onChange={(e) => setDemand(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monetization Potential (100 = High LTV)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{monetization}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={monetization} onChange={(e) => setMonetization(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Content Effort (100 = Very Hard to Produce)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{effort}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={effort} onChange={(e) => setEffort(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "1rem" }}>Profitability Score</h3>
                    <div style={{ fontSize: "6rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}</div>
                    <div style={{ marginTop: "2rem", padding: "1.5rem", width: "100%", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", fontWeight: "bold" }}>{recommendation}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "YouTube Niche Validator",
        slug: "youtube-niche-validator",
        description: "Determine the viability of a YouTube niche by estimating reach, CPM, and structural difficulty.",
        primaryKeyword: "youtube niche validator",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function YouTubeNicheValidator() {
    const [frequency, setFrequency] = useState(2); // uploads per week
    const [views, setViews] = useState(5000); // estimated views per video
    const [cpm, setCpm] = useState(8); // estimated CPM

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("youtube-niche-validator");
            tracked.current = true;
        }
    }, []);

    const monthlyViews = frequency * 4.33 * views;
    const monthlyAdSense = (monthlyViews / 1000) * cpm;
    
    // Viability Score based on reach & CPM
    let score = Math.round((cpm * 5) + Math.min(views / 1000, 50));
    if (score > 100) score = 100;

    let difficulty = "Medium";
    if (frequency > 3) difficulty = "Burnout Risk (High Volume)";
    else if (cpm < 5) difficulty = "High Volume Required (Low CPM)";
    else if (cpm > 15) difficulty = "Highly Competitive (High CPM)";

    const faqs = [
        { question: "Why is CPM important?", answer: "A $2 CPM channel needs 10x the views as a $20 CPM channel to make the exact same revenue. Niche selection dictates your required audience size." }
    ];

    const seoContent = (
        <>
            <h2>Validating Before Filming</h2>
            <p>Do the math before you buy the camera. A bad niche makes it mathematically impossible to make a living on AdSense alone.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/channel-profit-predictor">Channel Profit Predictor</Link></li>
                <li><Link href="/tools/audience-growth-estimator">Audience Growth Estimator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="YouTube Niche Validator" description="Validate your YouTube niche economics before committing to production." slug="youtube-niche-validator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Uploads Per Week</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{frequency}</span>
                        </label>
                        <input type="range" min="1" max="7" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Avg Views Per Upload</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{views.toLocaleString()}</span>
                        </label>
                        <input type="range" min="100" max="100000" step="1000" value={views} onChange={(e) => setViews(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Estimated CPM ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>\${cpm}</span>
                        </label>
                        <input type="range" min="1" max="50" step="1" value={cpm} onChange={(e) => setCpm(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <h3 className="input-label">Viability Score</h3>
                        <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Monthly AdSense</div>
                            <div style={{ fontSize: "1.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>\${Math.round(monthlyAdSense).toLocaleString()}</div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Growth Difficulty</div>
                            <div style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: "bold" }}>{difficulty}</div>
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
        name: "Creator Monetization Calculator",
        slug: "creator-monetization-calculator",
        description: "Calculate projected monthly revenue based on audience size, estimated engagement, and conversion rates.",
        primaryKeyword: "creator monetization calculator",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function CreatorMonetizationCalculator() {
    const [audience, setAudience] = useState(10000);
    const [engagement, setEngagement] = useState(5); // %
    const [conversion, setConversion] = useState(2); // %
    const [price, setPrice] = useState(50); // $

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("creator-monetization-calculator");
            tracked.current = true;
        }
    }, []);

    const engagedUsers = Math.round(audience * (engagement / 100));
    const buyers = Math.round(engagedUsers * (conversion / 100));
    const revenue = buyers * price;

    const faqs = [
        { question: "Why use engaged users?", answer: "Total follower count is a vanity metric. Only users who actually see and engage with your content have a chance of converting." }
    ];

    const seoContent = (
        <>
            <h2>The Monetization Funnel</h2>
            <p>Followers don't pay bills. To monetize effectively, you must understand the steep drop-off between followers, engaged users, and actual buyers.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/creator-business-model-picker">Creator Business Model Picker</Link></li>
                <li><Link href="/tools/content-roi-calculator">Content ROI Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Creator Monetization Funnel" description="Model your funnel from total followers to net revenue." slug="creator-monetization-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Total Audience Size</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{audience.toLocaleString()}</span>
                        </label>
                        <input type="range" min="1000" max="1000000" step="1000" value={audience} onChange={(e) => setAudience(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Average Engagement Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{engagement}%</span>
                        </label>
                        <input type="range" min="0.1" max="25" step="0.1" value={engagement} onChange={(e) => setEngagement(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Conversion Rate from Engaged (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{conversion}%</span>
                        </label>
                        <input type="range" min="0.1" max="10" step="0.1" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Product/Service Price ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>\${price}</span>
                        </label>
                        <input type="range" min="1" max="1000" step="5" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 className="input-label">Revenue Breakdown</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Total Fans</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{audience.toLocaleString()}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Eyeballs (Engaged)</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{engagedUsers.toLocaleString()}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Total Buyers</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{buyers.toLocaleString()}</strong>
                        </div>
                    </div>
                    <div style={{ marginTop: "1rem", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div style={{ fontSize: "0.875rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Projected Campaign Revenue</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>\${revenue.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Audience Growth Estimator",
        slug: "audience-growth-estimator",
        description: "Project your follower growth over 6 to 12 months based on compound growth rates.",
        primaryKeyword: "audience growth estimator",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function AudienceGrowthEstimator() {
    const [starting, setStarting] = useState(1000);
    const [monthlyGrowth, setMonthlyGrowth] = useState(10); // %

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("audience-growth-estimator");
            tracked.current = true;
        }
    }, []);

    const month6 = Math.round(starting * Math.pow(1 + monthlyGrowth / 100, 6));
    const month12 = Math.round(starting * Math.pow(1 + monthlyGrowth / 100, 12));

    const faqs = [
        { question: "Is audience growth linear or compound?", answer: "Good audience growth is compound. As you get larger, the absolute number of followers gained per month increases if the percentage remains stable." }
    ];

    const seoContent = (
        <>
            <h2>The Power of Compound Growth</h2>
            <p>Growing at 10% a month seems slow at 1,000 followers, but becomes exponential. Run the models to set realistic goals.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/newsletter-growth-calculator">Newsletter Growth Calculator</Link></li>
                <li><Link href="/tools/viral-potential-score">Viral Potential Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Audience Growth Estimator" description="Model the compound effect of consistent monthly follower growth." slug="audience-growth-estimator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Starting Followers</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{starting.toLocaleString()}</span>
                        </label>
                        <input type="range" min="100" max="100000" step="100" value={starting} onChange={(e) => setStarting(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Growth Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{monthlyGrowth}%</span>
                        </label>
                        <input type="range" min="1" max="50" step="1" value={monthlyGrowth} onChange={(e) => setMonthlyGrowth(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <h3 className="input-label">Growth Projections</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>6 Months</div>
                            <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>{month6.toLocaleString()}</div>
                        </div>
                        <div style={{ padding: "1.5rem", backgroundColor: "rgba(35, 134, 255, 0.05)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--accent-primary)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>12 Months</div>
                            <div style={{ fontSize: "2.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>{month12.toLocaleString()}</div>
                        </div>
                    </div>
                    <div style={{ height: "40px", width: "100%", background: \`linear-gradient(90deg, var(--bg-secondary) 0%, var(--accent-primary) 100%)\`, borderRadius: "var(--radius-sm)", marginTop: "1rem", position: "relative" }}>
                        <div style={{ position: "absolute", left: "0", top: "100%", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Now</div>
                        <div style={{ position: "absolute", right: "0", top: "100%", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Year 1</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Posting Frequency Optimizer",
        slug: "posting-frequency-optimizer",
        description: "Determine the ideal weekly posting cadence based on your available hours and content complexity.",
        primaryKeyword: "posting frequency optimizer",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function PostingFrequencyOptimizer() {
    const [hours, setHours] = useState(10);
    const [complexity, setComplexity] = useState(2); // 1 = Short, 3 = High
    const [platform, setPlatform] = useState("twitter");

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("posting-frequency-optimizer");
            tracked.current = true;
        }
    }, []);

    let hoursPerAsset = 1;
    if (platform === "youtube") hoursPerAsset = complexity === 1 ? 4 : (complexity === 2 ? 8 : 16);
    else if (platform === "newsletter") hoursPerAsset = complexity === 1 ? 2 : (complexity === 2 ? 4 : 8);
    else if (platform === "twitter" || platform === "linkedin") hoursPerAsset = complexity === 1 ? 0.25 : (complexity === 2 ? 0.5 : 1.5);

    const postsPerWeek = Math.floor(hours / hoursPerAsset);
    let recommendation = "Maintain consistency.";
    if (postsPerWeek === 0) recommendation = "Impossible cadence. You must dedicate more hours or reduce content complexity.";
    else if (postsPerWeek > 14) recommendation = "High output possible. Focus on quality over extreme volume to prevent burnout.";

    const faqs = [
        { question: "Why map hours to complexity?", answer: "Creators burn out because they plan YouTube channels on Twitter timelines. A high-production video takes 16 hours. Be realistic." }
    ];

    const seoContent = (
        <>
            <h2>Avoiding Creator Burnout</h2>
            <p>Consistency is key, but only if the cadence is physically possible given your constraints.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/youtube-niche-validator">YouTube Niche Validator</Link></li>
                <li><Link href="/tools/content-idea-profit-score">Content Idea Profit Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Posting Frequency Optimizer" description="Calculate your true capacity for content generation." slug="posting-frequency-optimizer" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Available Content Hours / Week</label>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <span></span><span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{hours}h</span>
                        </div>
                        <input type="range" min="1" max="40" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Primary Platform</label>
                        <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="twitter">Short Form Text (Twitter/LinkedIn)</option>
                            <option value="newsletter">Long Form Text (Newsletter/Blog)</option>
                            <option value="youtube">High Production Video (YouTube)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Content Complexity</label>
                        <select value={complexity} onChange={(e) => setComplexity(Number(e.target.value))} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value={1}>Low (Fast / Raw / Repurposed)</option>
                            <option value={2}>Medium (Standard Editing / Research)</option>
                            <option value={3}>High (Deep Dives / Cinematic)</option>
                        </select>
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Sustainable Cadence</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: postsPerWeek > 0 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{postsPerWeek}</div>
                    <div style={{ color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2rem" }}>Posts Per Week</div>
                    
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center", width: "100%" }}>
                        <p style={{ color: "var(--text-primary)", fontSize: "1rem", lineHeight: 1.5 }}>{recommendation}</p>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem" }}>Est. Time Per Asset: {hoursPerAsset}h</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    }
];

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
}

generateTools();
