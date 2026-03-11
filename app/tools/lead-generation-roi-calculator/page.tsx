"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function LeadGenerationROICalculator() {
    const [leadsGenerated, setLeadsGenerated] = useState<number>(500);
    const [costPerLead, setCostPerLead] = useState<number>(15);
    const [closeRate, setCloseRate] = useState<number>(5);
    const [averageDealValue, setAverageDealValue] = useState<number>(2500);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("lead-generation-roi-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    const deals = leadsGenerated * (closeRate / 100);
    const revenue = deals * averageDealValue;
    const totalCost = leadsGenerated * costPerLead;
    const roi = totalCost > 0 ? ((revenue - totalCost) / totalCost) * 100 : 0;

    let scoreColor = "var(--success-color, #22c55e)";
    if (roi < 0) scoreColor = "var(--error-color, #ef4444)";

    const resetValues = () => {
        setLeadsGenerated(500);
        setCostPerLead(15 / rate);
        setCloseRate(5);
        setAverageDealValue(2500 / rate);
    };

    const faqs = [
        { question: "How to calculate Lead Generation ROI?", answer: "Calculate Total Revenue (Leads * Close Rate * Deal Value), subtract the Total Marketing Cost (Leads * CPL), and divide that profit by the Total Marketing Cost." },
        { question: "What is a good CPL (Cost Per Lead)?", answer: "CPL is highly dependent on your industry. A $5 CPL is terrible if you're selling a $2 app and closing at 1%. A $500 CPL is amazing if you're selling a $100,000 enterprise software and closing at 10%." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Lead Generation ROI Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate Lead Generation ROI and forecast pipeline revenue."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Pipeline Math and Lead Gen ROI</h2>
            <p>Generating leads is irrelevant if they don't close, or if the cost to acquire them vastly outweighs the final deal value. This calculator bridges the gap between the marketing team's Cost Per Lead (CPL) and the sales team's Close Rate to ensure overall profitability.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/cac-payback-calculator">CAC Payback</Link></li>
                <li><Link href="/tools/marketing-roi-calculator">Marketing ROI</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <ToolLayout
            title="Lead Generation ROI Calculator"
            description="Calculate Lead Generation ROI and forecast pipeline revenue."
            slug="lead-generation-roi-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Inputs</h3>
                        <button onClick={resetValues} className="pill" style={{ cursor: "pointer", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                            Reset
                        </button>
                    </div>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label">Leads Generated</label>
                        <input type="number" className="input-field" value={leadsGenerated} onChange={(e) => setLeadsGenerated(Number(e.target.value) || 0)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Cost per Lead ({symbol})</label>
                        <input type="number" className="input-field" value={costPerLead ? Number((costPerLead * rate).toFixed(2)) : 0} onChange={(e) => setCostPerLead((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Close Rate %</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{closeRate}%</span>
                        </label>
                        <input type="range" min="0" max="100" step="0.5" value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Average Deal Value ({symbol})</label>
                        <input type="number" className="input-field" value={averageDealValue ? Number((averageDealValue * rate).toFixed(2)) : 0} onChange={(e) => setAverageDealValue((Number(e.target.value) || 0) / rate)} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Lead Generation ROI</div>
                        <div style={{ fontSize: "3rem", color: scoreColor, fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatNumber(roi)}%
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid ${scoreColor}`, backgroundColor: "var(--bg-tertiary)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>Expected Revenue</div>
                        <div style={{ fontSize: "2.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            {formatCurrency(revenue * rate, currency)}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
