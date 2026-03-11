"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function CustomerLifetimeValueCalculator() {
    const [arpu, setArpu] = useState<number>(100);
    const [margin, setMargin] = useState<number>(80);
    const [churnRate, setChurnRate] = useState<number>(5);
    const [cac, setCac] = useState<number>(500);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("customer-lifetime-value-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    const lifetimeMonths = churnRate > 0 ? 1 / (churnRate / 100) : Infinity;
    const ltv = (arpu * (margin / 100)) * lifetimeMonths;
    const ltvCacRatio = cac > 0 ? ltv / cac : Infinity;

    const resetValues = () => {
        setArpu(100 / rate);
        setMargin(80);
        setChurnRate(5);
        setCac(500 / rate);
    };

    const faqs = [
        { question: "How is LTV calculated?", answer: "LTV (Lifetime Value) is calculated by taking the Average Revenue Per User (ARPU), multiplying it by gross margin, and dividing it by monthly churn rate." },
        { question: "What is a good LTV to CAC ratio?", answer: "A healthy SaaS business has an LTV:CAC ratio of 3:1 or higher. This means for every $1 spent acquiring a customer, you generate $3 in expected lifetime value. Below 1 means you lose money per customer." },
        { question: "Why include gross margin in LTV?", answer: "Because revenue is not value. If serving a customer costs 20% of their subscription in server and support costs, your actual lifetime value generated is only 80% of their revenue." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Customer Lifetime Value Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate Customer Lifetime Value (LTV) and LTV/CAC ratio to evaluate your unit economics."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Understanding Customer Lifetime Value</h2>
            <p>Customer Lifetime Value (LTV) is the total estimated gross profit a single customer will generate over the entirety of their relationship with your brand. Strong LTV ensures long-term profitability.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/cac-payback-calculator">CAC Payback Calculator</Link></li>
                <li><Link href="/tools/marketing-roi-calculator">Marketing ROI Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <ToolLayout
            title="Customer Lifetime Value Calculator"
            description="Calculate Customer Lifetime Value (LTV) and LTV/CAC ratio to evaluate your unit economics."
            slug="customer-lifetime-value-calculator"
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
                        <label className="input-label">Average Revenue per User/Mo ({symbol})</label>
                        <input type="number" className="input-field" value={arpu ? Number((arpu * rate).toFixed(2)) : 0} onChange={(e) => setArpu((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Gross Margin %</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{margin}%</span>
                        </label>
                        <input type="range" min="1" max="100" step="1" value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Churn Rate %</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{churnRate}%</span>
                        </label>
                        <input type="range" min="0" max="100" step="0.5" value={churnRate} onChange={(e) => setChurnRate(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Customer Acquisition Cost ({symbol}) (Optional)</label>
                        <input type="number" className="input-field" value={cac ? Number((cac * rate).toFixed(2)) : 0} onChange={(e) => setCac((Number(e.target.value) || 0) / rate)} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Customer Lifetime Value</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {ltv === Infinity ? "Infinity" : formatCurrency(ltv * rate, currency)}
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid var(--accent-primary)`, backgroundColor: "var(--bg-tertiary)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>LTV:CAC Ratio</div>
                        <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            {ltvCacRatio === Infinity ? "N/A" : `${formatNumber(ltvCacRatio)}x`}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
