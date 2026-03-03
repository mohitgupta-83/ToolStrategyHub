"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function StartupRunwayCalculator() {
    const [cash, setCash] = useState<number>(150000);
    const [expenses, setExpenses] = useState<number>(15000);
    const [revenue, setRevenue] = useState<number>(5000);
    const tracked = useRef(false);

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

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("startup-runway-calculator");
            tracked.current = true;
        }
    }, []);

    const netBurnRate = expenses - revenue;
    const runwayMonths = netBurnRate > 0 ? cash / netBurnRate : Infinity;

    let survivalForecast = "Profitable (Infinite Runway)";
    let forecastColor = "var(--success-color, #22c55e)";

    if (netBurnRate > 0) {
        if (runwayMonths < 6) {
            survivalForecast = "Critical (Pivot or raise immediately)";
            forecastColor = "#ef4444"; // error
        } else if (runwayMonths < 12) {
            survivalForecast = "Warning (Begin fundraising now)";
            forecastColor = "#eab308"; // warning
        } else {
            survivalForecast = "Healthy (Focus on execution)";
            forecastColor = "var(--accent-primary)";
        }
    }

    const faqs = [
        { question: "What is net burn rate versus gross burn rate?", answer: "Gross burn rate is your total monthly expenses. Net burn rate is your expenses minus your revenue. Your actual runway is calculated using your net burn rate." },
        { question: "Why is 18 months of runway the standard recommendation?", answer: "Fundraising takes 6 months. It takes at least 12 months to hit the necessary traction milestones to raise the next round. If you dip below 6 months, you lose negotiation leverage." },
        { question: "Should I include founder salaries in expenses?", answer: "Yes. Unless you have independent wealth, paying yourself a living wage is required. If a founder runs out of personal cash, the startup fails regardless of company cash." },
        { question: "How often should I check my startup's runway?", answer: "At a minimum, review your runway monthly after reconciling accounting books. In critical early stages, bi-weekly checks can prevent sudden cash flow crises." },
        { question: "What should I do if my runway is under 6 months?", answer: "Immediately halt non-essential spending, pause all paid acquisition that doesn't have a 30-day ROI, and begin conversations with bridge investors. You must pivot to survival mode immediately." },
        { question: "How does MRR growth affect runway?", answer: "Consistent MRR (Monthly Recurring Revenue) growth decreases your net burn each month. Over time, growing MRR extends your runway exponentially, eventually reaching 'default alive' status." },
        { question: "Should we hire if runway is less than 12 months?", answer: "Generally, no. Hiring increases fixed burn and reduces runway further. Only hire if the new employee will immediately accelerate revenue generation to offset their cost within 3-4 months." },
        { question: "What is 'Default Alive'?", answer: "A startup is 'Default Alive' if its current growth rate will allow it to reach profitability with the cash it has left. Otherwise, it is 'Default Dead' and relies entirely on external funding to survive." },
        { question: "How do I calculate a safety buffer?", answer: "Multiply your gross monthly burn by 3 and hold it in a separate sub-account. Do not count this as usable runway unless absolutely necessary." },
        { question: "Will venture debt extend my runway?", answer: "Yes, but venture debt requires monthly payments. It is typically used to extend runway between equity rounds when future funding is highly likely." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Startup Runway Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" }
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>The Importance of Cash Management for Startups</h2>
            <p>Running out of cash is the number one reason startups fail. Knowing your runway allows you to make strategic decisions on hiring, marketing spend, and fundraising timelines before desperation sets in. This tool is a fundamental resource for early-stage founders. The primary keyword for managing these metrics is startup runway calculator, while secondary keywords include calculate startup burn rate, cash runway formula, default alive metrics, calculating early stage startup expenses, and extending venture funding runway.</p>
            <p>A comprehensive approach involves long-tail keywords like how to calculate net burn rate for SaaS startups, what is a good cash runway for a pre-seed startup, when should founders raise the next funding round, reducing gross burn to extend startup life, understanding the difference between gross and net burn, financial modeling tools for technical founders, how MRR growth impacts cash out dates, identifying warning signs of cash flow crises, building financial contingency plans, and avoiding startup bankruptcy through capital efficiency.</p>
            <h3>Default Alive versus Default Dead</h3>
            <p>Formulated by Paul Graham, the concept of default alive is crucial. If your expenses exceed your revenue, but your revenue is growing, will you cross the profitability axis before you hit zero dollars in the bank? If yes, you are default alive. If no, you are default dead and completely at the mercy of venture capitalists.</p>
            <h3>How to Use the Calculator</h3>
            <p>Input your current cash balance, your total monthly expenses (everything from AWS bills to salaries), and your current average monthly revenue. The calculator instantly determines your net burn rate and divides your cash balance by that figure to produce your exact runway in months. A survival forecast will warn you if you are entering the critical failure zone.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validator</Link></li>
                <li><Link href="/tools/saas-pricing-calculator">SaaS Pricing Calculator</Link></li>
                <li><Link href="/tools/market-size-estimator">Market Size Calculator (TAM/SAM/SOM)</Link></li>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Startup Runway Calculator" description="Determine your net burn rate and exact cash runway before you run out of capital." slug="startup-runway-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Current Cash in Bank</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{formatCurrency(cash * rate, currency)}</span>
                        </label>
                        <input type="range" min="0" max="2000000" step="10000" value={cash} onChange={(e) => setCash(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Expenses (Gross Burn)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{formatCurrency(expenses * rate, currency)}</span>
                        </label>
                        <input type="range" min="0" max="200000" step="1000" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Revenue</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{formatCurrency(revenue * rate, currency)}</span>
                        </label>
                        <input type="range" min="0" max="200000" step="1000" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Cash Runway Months</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            {runwayMonths === Infinity ? "Infinite \u221E" : runwayMonths.toFixed(1)} <span style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>mos</span>
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid ${forecastColor}`, backgroundColor: "var(--bg-tertiary)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>Survival Forecast</div>
                        <div style={{ fontSize: "1.25rem", color: forecastColor, fontWeight: "bold" }}>{survivalForecast}</div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Net Burn Rate</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{netBurnRate > 0 ? formatCurrency(netBurnRate * rate, currency) + "/mo" : "Profitable"}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Time Until $0</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                                {runwayMonths === Infinity ? "Never" : `${Math.floor(runwayMonths)} mos, ${Math.round((runwayMonths % 1) * 30)} days`}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
