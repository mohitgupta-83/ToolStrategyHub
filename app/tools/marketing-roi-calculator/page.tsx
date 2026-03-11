"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function MarketingROICalculator() {
    const [campaignCost, setCampaignCost] = useState<number>(5000);
    const [revenueGenerated, setRevenueGenerated] = useState<number>(20000);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("marketing-roi-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    const profit = revenueGenerated - campaignCost;
    const roi = campaignCost > 0 ? ((revenueGenerated - campaignCost) / campaignCost) * 100 : 0;

    let scoreColor = "var(--success-color, #22c55e)";
    if (roi < 0) scoreColor = "var(--error-color, #ef4444)";

    const resetValues = () => {
        setCampaignCost(5000 / rate);
        setRevenueGenerated(20000 / rate);
    };

    const faqs = [
        { question: "How to calculate Marketing ROI?", answer: "Marketing ROI is calculated by subtracting the cost of a campaign from the revenue it generated, and dividing that profit by the campaign cost. Express as a percentage." },
        { question: "What is a good Marketing ROI?", answer: "A 5:1 ratio (500% ROI) is generally considered exceptionally good, while a 2:1 ratio is barely profitable considering overhead." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Marketing ROI Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate Marketing ROI and profit generated from campaigns."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Evaluating Marketing Campaign Success</h2>
            <p>Know if your marketing acts as an investment or an expense. Return on Investment (ROI) is the ultimate metric for ad spend.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/cac-payback-calculator">CAC Payback</Link></li>
                <li><Link href="/tools/content-roi-calculator">Content ROI Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <ToolLayout
            title="Marketing ROI Calculator"
            description="Calculate Marketing ROI and profit generated from campaigns."
            slug="marketing-roi-calculator"
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
                        <label className="input-label">Campaign Cost ({symbol})</label>
                        <input type="number" className="input-field" value={campaignCost ? Number((campaignCost * rate).toFixed(2)) : 0} onChange={(e) => setCampaignCost((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Revenue Generated ({symbol})</label>
                        <input type="number" className="input-field" value={revenueGenerated ? Number((revenueGenerated * rate).toFixed(2)) : 0} onChange={(e) => setRevenueGenerated((Number(e.target.value) || 0) / rate)} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>ROI %</div>
                        <div style={{ fontSize: "3rem", color: scoreColor, fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatNumber(roi)}%
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid ${scoreColor}`, backgroundColor: "var(--bg-tertiary)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>Profit Generated</div>
                        <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            {formatCurrency(profit * rate, currency)}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
