"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function BreakEvenCalculator() {
    const [fixedCosts, setFixedCosts] = useState<number>(10000);
    const [pricePerUnit, setPricePerUnit] = useState<number>(100);
    const [costPerUnit, setCostPerUnit] = useState<number>(40);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("break-even-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    const unitMargin = pricePerUnit - costPerUnit;
    const breakEvenUnits = unitMargin > 0 ? fixedCosts / unitMargin : Infinity;
    const breakEvenRevenue = breakEvenUnits !== Infinity ? breakEvenUnits * pricePerUnit : Infinity;

    const resetValues = () => {
        setFixedCosts(10000 / rate);
        setPricePerUnit(100 / rate);
        setCostPerUnit(40 / rate);
    };

    const faqs = [
        { question: "How is break-even calculated?", answer: "Break-even units equals Total Fixed Costs divided by (Price Per Unit minus Variable Cost Per Unit). The denominator is known as the Contribution Margin." },
        { question: "What is a fixed cost?", answer: "Costs that don't change regardless of how many units you sell. Example: Rent, Insurance, Software Subscriptions." },
        { question: "What is a variable cost?", answer: "Costs that increase exactly with each unit sold. Example: Materials, Shipping, Payment Processing Fees." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Break-Even Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate the exact number of units and revenue required to hit break-even."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Understanding the Break-Even Point</h2>
            <p>Your break-even point is the exact moment your total revenue perfectly equals your total costs. Every unit sold past this point generates pure profit (minus taxes and variable costs). Pricing too low, or carrying too much fixed overhead, extends your break-even horizon dangerously far into the future.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/startup-burn-rate-calculator">Startup Burn Rate</Link></li>
                <li><Link href="/tools/product-pricing-simulator">Pricing Simulator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <ToolLayout
            title="Break-Even Calculator"
            description="Calculate the exact number of units and revenue required to hit break-even."
            slug="break-even-calculator"
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
                        <label className="input-label">Total Fixed Costs ({symbol})</label>
                        <input type="number" className="input-field" value={fixedCosts ? Number((fixedCosts * rate).toFixed(2)) : 0} onChange={(e) => setFixedCosts((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Price per Unit ({symbol})</label>
                        <input type="number" className="input-field" value={pricePerUnit ? Number((pricePerUnit * rate).toFixed(2)) : 0} onChange={(e) => setPricePerUnit((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Variable Cost per Unit ({symbol})</label>
                        <input type="number" className="input-field" value={costPerUnit ? Number((costPerUnit * rate).toFixed(2)) : 0} onChange={(e) => setCostPerUnit((Number(e.target.value) || 0) / rate)} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Break-Even Units</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {breakEvenUnits === Infinity || breakEvenUnits < 0 ? "N/A" : formatNumber(breakEvenUnits)}
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid var(--accent-primary)`, backgroundColor: "var(--bg-tertiary)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>Break-Even Revenue</div>
                        <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            {breakEvenRevenue === Infinity || breakEvenRevenue < 0 ? "N/A" : formatCurrency(breakEvenRevenue * rate, currency)}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
