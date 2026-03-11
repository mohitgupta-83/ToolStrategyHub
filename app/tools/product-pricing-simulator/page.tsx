"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function ProductPricingSimulator() {
    const [costPerUnit, setCostPerUnit] = useState<number>(25);
    const [targetMargin, setTargetMargin] = useState<number>(60);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("product-pricing-simulator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    const marginDecimal = targetMargin / 100;
    const suggestedPrice = marginDecimal < 1 ? costPerUnit / (1 - marginDecimal) : Infinity;

    const resetValues = () => {
        setCostPerUnit(25 / rate);
        setTargetMargin(60);
    };

    const faqs = [
        { question: "How to calculate product price based on margin?", answer: "Divide your cost per unit by (1 - your desired gross margin percentage). If it costs $20 and you want a 50% margin, it's 20 / (1 - 0.50) = $40." },
        { question: "Margin vs Markup", answer: "Margin is a percentage of the selling price that is profit. Markup is a percentage of the cost added to get the selling price. A 50% markup on a $10 item makes it $15 (which is only a 33% margin)." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Product Pricing Simulator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate suggested product price to hit target gross margin."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Pricing Products Correctly</h2>
            <p>Do not confuse markup with margin. To ensure you remain profitable after Customer Acquisition Cost (CAC) and overhead, set an absolute margin target and let the math determine the minimum acceptable price.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/break-even-calculator">Break-Even Calculator</Link></li>
                <li><Link href="/tools/saas-pricing-calculator">SaaS Pricing Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout
            title="Product Pricing Simulator"
            description="Calculate suggested product price to hit target gross margin."
            slug="product-pricing-simulator"
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
                        <label className="input-label">Cost per Unit ({symbol})</label>
                        <input type="number" className="input-field" value={costPerUnit ? Number((costPerUnit * rate).toFixed(2)) : 0} onChange={(e) => setCostPerUnit((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Target Margin %</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{targetMargin}%</span>
                        </label>
                        <input type="range" min="1" max="99" step="1" value={targetMargin} onChange={(e) => setTargetMargin(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Suggested Product Price</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {suggestedPrice === Infinity ? "Infinity" : formatCurrency(suggestedPrice * rate, currency)}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
