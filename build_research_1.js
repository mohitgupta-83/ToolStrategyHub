const fs = require('fs');
const path = require('path');

const PROJECT_DIR = process.cwd();

const tools = [
    {
        name: "Keyword Opportunity Calculator",
        slug: "keyword-opportunity-calculator",
        description: "Calculate keyword viability by analyzing search volume, competition, monetization, and trend direction.",
        primaryKeyword: "keyword opportunity calculator",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function KeywordOpportunityCalculator() {
    const [volume, setVolume] = useState(5000);
    const [competition, setCompetition] = useState(50); // 0-100
    const [monetization, setMonetization] = useState(50); // 0-100
    const [trend, setTrend] = useState(5); // 1-10

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("keyword-opportunity-calculator");
            tracked.current = true;
        }
    }, []);

    const volumeScore = Math.min((volume / 10000) * 100, 100);
    const score = Math.round((volumeScore * 0.3) + ((100 - competition) * 0.3) + (monetization * 0.2) + (trend * 10 * 0.2));

    let recommendation = "Avoid";
    if (score > 75) recommendation = "Prime Opportunity: High Volume, Low Resistance.";
    else if (score > 50) recommendation = "Moderate Opportunity: Requires targeted content strategy.";
    else if (score > 30) recommendation = "Low Priority: High competition or low commercial viability.";

    const faqs = [
        { question: "Why is competition weighted heavily?", answer: "A keyword with 100,000 searches and 99 competition is useless. A keyword with 500 searches and 10 competition is profitable." }
    ];

    const seoContent = (
        <>
            <h2>Finding the Content Arbitrage</h2>
            <p>SEO isn't about finding the highest volume keyword. It's about finding the highest volume keyword with the lowest barrier to entry and highest monetization alignment.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/competitor-gap-analyzer">Competitor Gap Analyzer</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Keyword Opportunity Calculator" description="Identify high-ROAS, low-KD organic targets." slug="keyword-opportunity-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Search Volume (Monthly)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{volume.toLocaleString()}</span>
                        </label>
                        <input type="range" min="100" max="50000" step="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Competition (KD)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{competition}</span>
                        </label>
                        <input type="range" min="0" max="100" value={competition} onChange={(e) => setCompetition(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Commercial Intent</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{monetization}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={monetization} onChange={(e) => setMonetization(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Trend Momentum</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{trend}/10</span>
                        </label>
                        <input type="range" min="1" max="10" value={trend} onChange={(e) => setTrend(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Opportunity Score</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{recommendation}</div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>Difficulty: {competition > 70 ? "Hard" : competition > 30 ? "Medium" : "Easy"}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Competitor Gap Analyzer",
        slug: "competitor-gap-analyzer",
        description: "Uncover market entry vectors by quantifying competitor weaknesses and feature gaps.",
        primaryKeyword: "competitor gap analyzer",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function CompetitorGapAnalyzer() {
    const [strength, setStrength] = useState(80);
    const [features, setFeatures] = useState(50);
    const [differentiation, setDifferentiation] = useState(50);
    const [contentDepth, setContentDepth] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("competitor-gap-analyzer");
            tracked.current = true;
        }
    }, []);

    const score = Math.round(((100 - strength) * 0.2) + ((100 - features) * 0.3) + (differentiation * 0.3) + ((100 - contentDepth) * 0.2));

    let strategy = "Do Not Compete";
    if (score > 75) strategy = "Blue Ocean: Launch highly differentiated offering.";
    else if (score > 50) strategy = "Feature Wedge: Target the specific feature they lack.";
    else if (score > 30) strategy = "Content Wedge: Beat them purely on SEO and inbound.";

    const faqs = [
        { question: "What is a feature wedge?", answer: "Instead of building 100% of the competitor's app, build the 10% that users constantly request but the competitor ignores." }
    ];

    const seoContent = (
        <>
            <h2>Finding the Chink in the Armor</h2>
            <p>Every dominant incumbent has a weakness. They are too expensive, too complex, or too generalized. Gap analysis finds that weakness.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/niche-saturation-score">Niche Saturation Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Competitor Gap Analyzer" description="Calculate the viability of competing against incumbents." slug="competitor-gap-analyzer" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Competitor Entity Strength</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{strength}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={strength} onChange={(e) => setStrength(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Competitor Feature Completeness</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{features}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={features} onChange={(e) => setFeatures(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Your Differentiation Potential</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{differentiation}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={differentiation} onChange={(e) => setDifferentiation(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Competitor Content/SEO Depth</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{contentDepth}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={contentDepth} onChange={(e) => setContentDepth(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Gap Opportunity Score</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 50 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{strategy}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Niche Saturation Score",
        slug: "niche-saturation-score",
        description: "Evaluate if a specific micro-market has room for a new entrant or if it is fully saturated.",
        primaryKeyword: "niche saturation score",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function NicheSaturationScore() {
    const [competitors, setCompetitors] = useState(5);
    const [maturity, setMaturity] = useState(50); // 100 = mature
    const [overlap, setOverlap] = useState(50);
    const [differentiation, setDifferentiation] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("niche-saturation-score");
            tracked.current = true;
        }
    }, []);

    const compScore = Math.max(10 - competitors, 0) * 10;
    const saturation = Math.round((compScore * 0.2) + ((100 - maturity) * 0.3) + ((100 - overlap) * 0.2) + (differentiation * 0.3));

    let recommendation = "Extremely Saturated. Requires paradigm shift.";
    if (saturation > 75) recommendation = "Wide Open Niche. Execute immediately.";
    else if (saturation > 50) recommendation = "Developing Niche. Room for differentiated players.";
    else if (saturation > 30) recommendation = "Mature Niche. Difficult entry.";

    const faqs = [
        { question: "Is saturation a bad thing?", answer: "Total lack of competition often means lack of market. But total saturation means cost-of-acquisition is too high. You want the middle ground." }
    ];

    const seoContent = (
        <>
            <h2>Measuring Market Saturation</h2>
            <p>Entering a saturated market requires massive capital. Entering an empty market requires massive education. Find the Goldilocks zone.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/market-trend-evaluator">Market Trend Evaluator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Niche Saturation Score" description="Calculate the relative density of competitors against market demand." slug="niche-saturation-score" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Direct Competitors</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{competitors}</span>
                        </label>
                        <input type="range" min="0" max="25" value={competitors} onChange={(e) => setCompetitors(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Market Maturity / Commoditization</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{maturity}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={maturity} onChange={(e) => setMaturity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Feature / Audience Overlap</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{overlap}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={overlap} onChange={(e) => setOverlap(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Your Target Differentiation</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{differentiation}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={differentiation} onChange={(e) => setDifferentiation(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Opportunity Viability Index</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: saturation >= 50 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{saturation}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{recommendation}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
`
    },
    {
        name: "Market Trend Evaluator",
        slug: "market-trend-evaluator",
        description: "Determine if a trend is a fad or a sustainable macro-shift in market behavior.",
        primaryKeyword: "market trend evaluator",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function MarketTrendEvaluator() {
    const [growth, setGrowth] = useState(50);
    const [momentum, setMomentum] = useState(50);
    const [seasonal, setSeasonal] = useState(50);
    const [adoption, setAdoption] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("market-trend-evaluator");
            tracked.current = true;
        }
    }, []);

    // High seasonal is bad. Extremely fast adoption is risky (fad).
    const score = Math.round((growth * 0.4) + (momentum * 0.3) + ((100 - seasonal) * 0.15) + ((100 - Math.abs(50 - adoption)) * 0.15));

    let status = "Fad / Highly Unstable";
    if (score > 75) status = "Sustainable Macro Trend";
    else if (score > 50) status = "Developing Trend";

    const faqs = [
        { question: "Why is extremely fast adoption penalized?", answer: "Trends that skyrocket overnight (like fidget spinners or Clubhouse) usually lack foundational stability. Sustainable shifts take years to adopt." }
    ];

    const seoContent = (
        <>
            <h2>Fad vs Macro Trend</h2>
            <p>Do not build a 5-year business on a 6-month fad. Evaluate the underlying behavioral shift causing the momentum before writing any code.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/opportunity-ranking-tool">Opportunity Ranking Tool</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Market Trend Evaluator" description="Quantify trend longevity." slug="market-trend-evaluator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>YoY Growth Rate (Observed)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{growth}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Search / Social Momentum</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{momentum}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={momentum} onChange={(e) => setMomentum(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Seasonal Dependency</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{seasonal}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={seasonal} onChange={(e) => setSeasonal(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Adoption Speed (50 = Optimal)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{adoption}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={adoption} onChange={(e) => setAdoption(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Trend Stability Score</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 50 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    
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
        name: "Opportunity Ranking Tool",
        slug: "opportunity-ranking-tool",
        description: "Rank multiple business ideas against an algorithmic framework of risk, market size, and execution difficulty.",
        primaryKeyword: "opportunity ranking tool",
        componentCode: `"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function OpportunityRankingTool() {
    const [opts, setOpts] = useState([{ id: 1, name: "Idea 1", market: 50, risk: 50, monetize: 50, comp: 50, execution: 50 }]);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("opportunity-ranking-tool");
            tracked.current = true;
        }
    }, []);

    const updateOpt = (id: number, field: string, value: any) => {
        setOpts(opts.map(o => o.id === id ? { ...o, [field]: value } : o));
    };

    const addOpt = () => {
        if(opts.length >= 3) return;
        setOpts([...opts, { id: Date.now(), name: "New Idea", market: 50, risk: 50, monetize: 50, comp: 50, execution: 50 }]);
    };
    
    const removeOpt = (id: number) => {
        setOpts(opts.filter(o => o.id !== id));
    };

    const scoredOpts = opts.map(o => {
        const score = Math.round((o.market * 0.25) + ((100 - o.risk) * 0.15) + (o.monetize * 0.25) + ((100 - o.comp) * 0.15) + ((100 - o.execution) * 0.2));
        return { ...o, score };
    }).sort((a, b) => b.score - a.score);

    const faqs = [
        { question: "Why compare internally?", answer: "Founders suffer from 'Shiny Object Syndrome'. Placing all ideas in one matrix forces you to acknowledge that executing Idea B means delaying the higher-ROAS Idea A." }
    ];

    const seoContent = (
        <>
            <h2>Defeating Shiny Object Syndrome</h2>
            <p>Every idea looks brilliant in isolation. Ranking them systematically exposes the fatal flaws of execution risk and bad monetization alignment.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/startup-readiness-score">Startup Readiness Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Opportunity Ranking Board" description="Rank multiple opportunities against one another." slug="opportunity-ranking-tool" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                    {scoredOpts.map((opt, idx) => (
                        <div key={opt.id} className="card stagger-1" style={{ border: idx === 0 ? "2px solid var(--accent-primary)" : "1px solid var(--border-color)", position: "relative" }}>
                            {idx === 0 && <div style={{ position: "absolute", top: "-10px", right: "20px", background: "var(--accent-primary)", color: "#000", padding: "2px 8px", fontSize: "0.75rem", fontWeight: "bold", borderRadius: "4px" }}>TOP PICK</div>}
                            <input type="text" value={opt.name} onChange={(e) => updateOpt(opt.id, 'name', e.target.value)} style={{ width: "100%", background: "transparent", color: "var(--text-primary)", fontSize: "1.25rem", fontWeight: "bold", border: "none", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }} />
                            
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}><span>Market Size</span><span>{opt.market}</span></div>
                                    <input type="range" min="0" max="100" value={opt.market} onChange={(e) => updateOpt(opt.id, 'market', Number(e.target.value))} style={{ width: "100%" }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}><span>Risk Level</span><span>{opt.risk}</span></div>
                                    <input type="range" min="0" max="100" value={opt.risk} onChange={(e) => updateOpt(opt.id, 'risk', Number(e.target.value))} style={{ width: "100%" }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}><span>Monetization</span><span>{opt.monetize}</span></div>
                                    <input type="range" min="0" max="100" value={opt.monetize} onChange={(e) => updateOpt(opt.id, 'monetize', Number(e.target.value))} style={{ width: "100%" }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}><span>Competition</span><span>{opt.comp}</span></div>
                                    <input type="range" min="0" max="100" value={opt.comp} onChange={(e) => updateOpt(opt.id, 'comp', Number(e.target.value))} style={{ width: "100%" }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between" }}><span>Exec. Difficulty</span><span>{opt.execution}</span></div>
                                    <input type="range" min="0" max="100" value={opt.execution} onChange={(e) => updateOpt(opt.id, 'execution', Number(e.target.value))} style={{ width: "100%" }} />
                                </div>
                            </div>
                            
                            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                <div style={{ fontSize: "2rem", fontFamily: "var(--font-mono)", fontWeight: "bold", color: idx === 0 ? "var(--accent-primary)" : "var(--text-primary)" }}>{opt.score}</div>
                                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Opportunity Score</div>
                            </div>
                            {opts.length > 1 && <button onClick={() => removeOpt(opt.id)} style={{ width: "100%", marginTop: "1rem", padding: "0.5rem", background: "transparent", color: "var(--error-color)", border: "1px solid var(--error-color)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Remove</button>}
                        </div>
                    ))}
                    {opts.length < 3 && (
                        <button onClick={addOpt} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.02)", border: "1px dashed var(--border-color)", cursor: "pointer", minHeight: "200px", color: "var(--text-secondary)", transition: "color 0.2s" }}>
                            + Add Opportunity
                        </button>
                    )}
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
