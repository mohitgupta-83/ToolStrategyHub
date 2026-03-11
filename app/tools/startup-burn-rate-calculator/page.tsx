"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function StartupBurnRateCalculator() {
    const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
    const [monthlyRevenue, setMonthlyRevenue] = useState<number>(20000);
    const [cashInBank, setCashInBank] = useState<number>(300000);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("startup-burn-rate-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    const burnRate = monthlyExpenses - monthlyRevenue;
    const runwayMonths = burnRate > 0 ? cashInBank / burnRate : Infinity;

    const resetValues = () => {
        setMonthlyExpenses(50000 / rate);
        setMonthlyRevenue(20000 / rate);
        setCashInBank(300000 / rate);
    };

    const faqs = [
        { question: "What is burn rate?", answer: "Burn rate is the amount of negative cash flow a company has over a given timeframe (typically monthly). It is expenses minus revenue." },
        { question: "What is runway?", answer: "Runway is the number of months your company has left before it runs out of cash, assuming current burn rate remains constant." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Startup Burn Rate Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate your monthly burn rate and runway."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Understanding Burn Rate</h2>
            <p>Know exactly how much cash you are burning every month so you can optimize costs, plan funding rounds, or reach default alive status before bankruptcy hits.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/startup-runway-calculator">Advanced Runway Calculator</Link></li>
                <li><Link href="/tools/business-valuation-calculator">Valuation Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <ToolLayout
            title="Startup Burn Rate Calculator"
            description="Calculate your monthly burn rate and runway."
            slug="startup-burn-rate-calculator"
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
                        <label className="input-label">Monthly Expenses ({symbol})</label>
                        <input type="number" className="input-field" value={monthlyExpenses ? Number((monthlyExpenses * rate).toFixed(2)) : 0} onChange={(e) => setMonthlyExpenses((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Monthly Revenue ({symbol})</label>
                        <input type="number" className="input-field" value={monthlyRevenue ? Number((monthlyRevenue * rate).toFixed(2)) : 0} onChange={(e) => setMonthlyRevenue((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Cash in Bank ({symbol})</label>
                        <input type="number" className="input-field" value={cashInBank ? Number((cashInBank * rate).toFixed(2)) : 0} onChange={(e) => setCashInBank((Number(e.target.value) || 0) / rate)} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Monthly Burn Rate</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {burnRate <= 0 ? "Profitable" : formatCurrency(burnRate * rate, currency)}
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid var(--accent-primary)`, backgroundColor: "var(--bg-tertiary)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>Runway Months</div>
                        <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            {runwayMonths === Infinity ? "Infinite" : `${formatNumber(runwayMonths)} mos`}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
