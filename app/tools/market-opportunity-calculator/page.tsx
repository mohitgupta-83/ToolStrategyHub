"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function MarketOpportunityCalculator() {
    const [totalMarketSize, setTotalMarketSize] = useState<number>(1000000);
    const [targetPercentage, setTargetPercentage] = useState<number>(5);
    const [capturePercentage, setCapturePercentage] = useState<number>(1);
    const [averagePrice, setAveragePrice] = useState<number>(500);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("market-opportunity-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    const tamUsers = totalMarketSize;
    const tamValue = tamUsers * averagePrice;

    const samUsers = tamUsers * (targetPercentage / 100);
    const samValue = samUsers * averagePrice;

    const somUsers = samUsers * (capturePercentage / 100);
    const somValue = somUsers * averagePrice;

    const resetValues = () => {
        setTotalMarketSize(1000000);
        setTargetPercentage(5);
        setCapturePercentage(1);
        setAveragePrice(500 / rate);
    };

    const faqs = [
        { question: "What is TAM, SAM, and SOM?", answer: "TAM (Total Addressable Market) is the entire revenue opportunity if you achieved 100% market share. SAM (Serviceable Available Market) is the segment of the TAM your product actually targets. SOM (Serviceable Obtainable Market) is the portion of the SAM you can realistically capture." },
        { question: "How to estimate target percentage?", answer: "Look at your specific niche limits. If you make software for dentists, but only for pediatric dentists, your target percentage limits your SAM to only that pediatric slice of the entire dental TAM." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Market Opportunity Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate your TAM, SAM, and SOM to estimate true market opportunity."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Calculate Your Market Opportunity</h2>
            <p>Don't pitch investors a generic $10 Billion market size. Use TAM, SAM, and SOM to mathematically prove your exact obtainable revenue slice based on your specific audience targeting and penetration models.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/startup-burn-rate-calculator">Startup Burn Rate</Link></li>
                <li><Link href="/tools/business-valuation-calculator">Business Valuation</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(num);
    };

    return (
        <ToolLayout
            title="Market Opportunity Calculator"
            description="Calculate your TAM, SAM, and SOM to estimate true market opportunity."
            slug="market-opportunity-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Market Inputs</h3>
                        <button onClick={resetValues} className="pill" style={{ cursor: "pointer", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                            Reset
                        </button>
                    </div>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label">Total Market Size (Users)</label>
                        <input type="number" className="input-field" value={totalMarketSize} onChange={(e) => setTotalMarketSize(Number(e.target.value) || 0)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Target Market % (SAM)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{targetPercentage}%</span>
                        </label>
                        <input type="range" min="0" max="100" step="0.5" value={targetPercentage} onChange={(e) => setTargetPercentage(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Estimated Capture % (SOM)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{capturePercentage}%</span>
                        </label>
                        <input type="range" min="0" max="100" step="0.5" value={capturePercentage} onChange={(e) => setCapturePercentage(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Average Price ({symbol})</label>
                        <input type="number" className="input-field" value={averagePrice ? Number((averagePrice * rate).toFixed(2)) : 0} onChange={(e) => setAveragePrice((Number(e.target.value) || 0) / rate)} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-muted)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>TAM (Total Addressable Market)</div>
                        <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", opacity: 0.8 }}>
                            {formatCurrency(tamValue * rate, currency)}
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>SAM (Serviceable Available Market)</div>
                        <div style={{ fontSize: "2.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatCurrency(samValue * rate, currency)}
                        </div>
                    </div>

                    <div style={{ padding: "1.5rem", borderLeft: `4px solid var(--success-color, #22c55e)`, backgroundColor: "var(--bg-tertiary)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>SOM (Serviceable Obtainable Market)</div>
                        <div style={{ fontSize: "2.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            {formatCurrency(somValue * rate, currency)}
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
