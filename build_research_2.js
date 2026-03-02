const fs = require('fs');
const path = require('path');

const PROJECT_DIR = process.cwd();

const tools = [
    {
        name: "Validation Checklist Builder",
        slug: "validation-checklist-builder",
        description: "Generate a custom, actionable step-by-step checklist to validate your specific business model.",
        primaryKeyword: "validation checklist builder",
        componentCode: `"use client";
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

    const checklists: any = {
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
`
    },
    {
        name: "Startup Readiness Score",
        slug: "startup-readiness-score",
        description: "Evaluate your preparedness to scale based on MVP status, team capability, and capital.",
        primaryKeyword: "startup readiness score",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function StartupReadinessScore() {
    const [clarity, setClarity] = useState(50);
    const [validation, setValidation] = useState(50);
    const [mvp, setMvp] = useState(50);
    const [team, setTeam] = useState(50);
    const [runway, setRunway] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("startup-readiness-score");
            tracked.current = true;
        }
    }, []);

    const score = Math.round((clarity * 0.15) + (validation * 0.3) + (mvp * 0.25) + (team * 0.15) + (runway * 0.15));

    let status = "Idea Stage - Keep validating.";
    if (score > 80) status = "Growth Stage - Pour gasoline on the fire. You are ready.";
    else if (score > 50) status = "MVP Stage - Focus on securing early beta testers and iterating.";
    else if (score > 30) status = "Pre-Launch - Build the minimum viable product.";

    const faqs = [
        { question: "Why is validation weighted so heavily?", answer: "A brilliant team with 5 years of runway building a product nobody wants will still fail. Validation is the only multiplier that matters." }
    ];

    const seoContent = (
        <>
            <h2>Premature Scaling will kill you</h2>
            <p>Scaling a startup before you have achieved Product-Market Fit is the leading cause of founder burnout and capital destruction.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/launch-timing-analyzer">Launch Timing Analyzer</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Startup Readiness Score" description="Calculate if you are fundamentally ready to pour capital into growth." slug="startup-readiness-score" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Problem Clarity (Pinpointed Need)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{clarity}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={clarity} onChange={(e) => setClarity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Market Validation (Pre-sales/Signups)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{validation}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={validation} onChange={(e) => setValidation(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>MVP Functionality (Working Logic)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{mvp}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={mvp} onChange={(e) => setMvp(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Team Capabilities / Velocity</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{team}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={team} onChange={(e) => setTeam(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Financial Runway / Survival Time</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{runway}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={runway} onChange={(e) => setRunway(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Overall Readiness</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{status}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Launch Timing Analyzer",
        slug: "launch-timing-analyzer",
        description: "Determine the exact macro window to launch your product to maximize viral velocity.",
        primaryKeyword: "launch timing analyzer",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function LaunchTimingAnalyzer() {
    const [demand, setDemand] = useState(50);
    const [intensity, setIntensity] = useState(50);
    const [product, setProduct] = useState(50);
    const [season, setSeason] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("launch-timing-analyzer");
            tracked.current = true;
        }
    }, []);

    const score = Math.round((demand * 0.35) + ((100 - intensity) * 0.2) + (product * 0.25) + (season * 0.2));

    let status = "Delay Launch immediately.";
    if (score > 75) status = "Optimal Launch Window: Strike Now.";
    else if (score > 50) status = "Acceptable Window: Requires heavy marketing push.";
    else if (score > 30) status = "Premature or Late: Re-evaluate seasonal and product factors.";

    const faqs = [
        { question: "How does seasonal timing impact B2B?", answer: "Launching a complex B2B tool in mid-December is an active choice to fail. Budgets are closed and buyers are on vacation. Launch in February or September." }
    ];

    const seoContent = (
        <>
            <h2>The Algorithm of Hype</h2>
            <p>Launching requires momentum. Matching an increasing demand curve with maximum product readiness generates the highest possible splash radius.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/startup-readiness-score">Startup Readiness Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Launch Timing Analyzer" description="Identify the golden window for GTM deployment." slug="launch-timing-analyzer" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Macro Demand Trend (100 = Peaking)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{demand}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={demand} onChange={(e) => setDemand(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Competitive Noise (100 = Deafening)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{intensity}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Current Product Stability / Polish</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{product}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={product} onChange={(e) => setProduct(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Seasonal Alignment (100 = Peak Season)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{season}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={season} onChange={(e) => setSeason(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Timing Score</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{status}</div>
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

export default function ResearchDiscoveryHub() {
    const allTools = getToolsList();
    const clusterSlugs = [
        "reddit-pain-finder",
        "subreddit-pain-analyzer",
        "keyword-opportunity-calculator",
        "competitor-gap-analyzer",
        "niche-saturation-score",
        "market-trend-evaluator",
        "opportunity-ranking-tool",
        "validation-checklist-builder",
        "startup-readiness-score",
        "launch-timing-analyzer"
    ];
    
    const clusterTools = clusterSlugs
        .map(slug => allTools.find(t => t.slug === slug))
        .filter(t => t !== undefined);

    return (
        <div className="container stagger-1" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
            <div style={{ maxWidth: "800px", marginBottom: "4rem" }}>
                <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem", lineHeight: 1.1 }}>Research & Discovery System</h1>
                <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Stop guessing what the market wants. Analyze pain points, quantify competitor gaps, map saturation density, and mathematically benchmark new opportunities using our deep research toolkit.
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
            
            <div style={{ marginTop: "6rem", padding: "3rem", borderRadius: "1rem", backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-color)" }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>The Intelligence Edge</h2>
                <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.125rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                    <div>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.875rem" }}>Identify Pain</h3>
                        <p>We actively scan unstructured textual data from the internet's largest forums to deterministically extract consumer hostility and friction. Where there is pain, there is a paid solution.</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.875rem" }}>Quantify the Gap</h3>
                        <p>Finding a problem isn't enough. We measure incumbency strength, feature density, and content arbitrage vectors to ensure there is physical room in the market for you.</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.875rem" }}>Time the Launch</h3>
                        <p>A good product at the wrong time operates as a bad product. Evaluate keyword trajectories, temporal demand curves, and competitive intensity to deploy exactly when the market is ready.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const metadata = {
    title: "Research & Discovery Hub | ToolStrategyHub",
    description: "Deep research tools for analyzing pain points, keyword opportunities, and market readiness.",
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

    const registryContent = `import type { ToolMetadata } from "./types";

export const RESEARCH_DISCOVERY_TOOLS: ToolMetadata[] = [\n`;

    // Tools from build_research_1.js 
    const t1 = [
        { "name": "Keyword Opportunity Calculator", "slug": "keyword-opportunity-calculator", "description": "Calculate keyword viability by analyzing search volume, competition, monetization, and trend direction.", "primaryKeyword": "keyword opportunity calculator" },
        { "name": "Competitor Gap Analyzer", "slug": "competitor-gap-analyzer", "description": "Uncover market entry vectors by quantifying competitor weaknesses and feature gaps.", "primaryKeyword": "competitor gap analyzer" },
        { "name": "Niche Saturation Score", "slug": "niche-saturation-score", "description": "Evaluate if a specific micro-market has room for a new entrant or if it is fully saturated.", "primaryKeyword": "niche saturation score" },
        { "name": "Market Trend Evaluator", "slug": "market-trend-evaluator", "description": "Determine if a trend is a fad or a sustainable macro-shift in market behavior.", "primaryKeyword": "market trend evaluator" },
        { "name": "Opportunity Ranking Tool", "slug": "opportunity-ranking-tool", "description": "Rank multiple business ideas against an algorithmic framework of risk, market size, and execution difficulty.", "primaryKeyword": "opportunity ranking tool" }
    ];

    // Note: reddit-pain-finder and subreddit-pain-analyzer ALREADY EXIST in lib/contentRegistry.ts. We don't redefine them here to avoid dupes in sitemap if `NEW_TOOLS` merges with `TOOLS`. Wait, if they are in `TOOLS`, they'll be processed there. Putting them here will duplicate them in `getToolsList()`. So I will omit them from this *new array* specifically to prevent sitemap duplications, BUT I still referenced them in the Hub page loop which draws from `allTools` array cleanly, preventing duplicates.

    const t2 = tools.map(t => ({ name: t.name, slug: t.slug, description: t.description, primaryKeyword: t.primaryKeyword }));
    const allNew = [...t1, ...t2];

    const toolEntries = allNew.map(t => '  { "name": "' + t.name + '", "slug": "' + t.slug + '", "description": "' + t.description.replace(/"/g, '\\"') + '", "primaryKeyword": "' + t.primaryKeyword + '" }').join(',\\n');

    const registryEnd = `\n];\n`;

    const registryFilePath = path.join(PROJECT_DIR, 'lib', 'researchDiscoveryTools.ts');
    fs.writeFileSync(registryFilePath, registryContent + toolEntries + registryEnd, 'utf8');
    console.log("Created Research Discovery Registry File");

    // Create Hub
    const hubDir = path.join(PROJECT_DIR, 'app', 'tools', 'research-discovery');
    if (!fs.existsSync(hubDir)) {
        fs.mkdirSync(hubDir, { recursive: true });
    }
    fs.writeFileSync(path.join(hubDir, 'page.tsx'), clusterHubCode, 'utf8');
    console.log("Created Hub Page");
}

generateTools();
