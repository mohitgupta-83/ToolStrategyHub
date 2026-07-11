"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function ShopifyProfitCalculator() {
    const [revenue, setRevenue] = useState<number>(20000);
    const [cogs, setCogs] = useState<number>(6000);
    const [plan, setPlan] = useState<"basic" | "shopify" | "advanced">("basic");
    const [transactionFeePercent, setTransactionFeePercent] = useState<number>(2.0);
    const [adSpend, setAdSpend] = useState<number>(5000);
    const [returnsPercent, setReturnsPercent] = useState<number>(5);
    const [shippingCost, setShippingCost] = useState<number>(1500);
    const [appCosts, setAppCosts] = useState<number>(300);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("shopify-profit-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    // Plan fee translation
    const planFees = {
        basic: 29,
        shopify: 79,
        advanced: 299,
    };

    const monthlyPlanCost = planFees[plan] / rate;

    // Returns deduction
    const returnsCost = revenue * (returnsPercent / 100);
    const effectiveRevenue = revenue - returnsCost;

    // Transaction fees
    const transactionFees = effectiveRevenue * (transactionFeePercent / 100);

    // Totals
    const totalExpenses = cogs + monthlyPlanCost + transactionFees + adSpend + shippingCost + appCosts;
    const grossProfit = effectiveRevenue - cogs;
    const netProfit = effectiveRevenue - totalExpenses;
    const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

    // Break-even ROAS
    // Margin of product before ad spend = (Effective Revenue - COGS - other variables) / Effective Revenue
    const marginBeforeAds = effectiveRevenue > 0 ? (effectiveRevenue - cogs - monthlyPlanCost - transactionFees - shippingCost - appCosts) / effectiveRevenue : 0;
    const breakEvenRoas = marginBeforeAds > 0 ? 1 / marginBeforeAds : 0;
    const actualRoas = adSpend > 0 ? revenue / adSpend : 0;

    const resetValues = () => {
        setRevenue(20000 / rate);
        setCogs(6000 / rate);
        setPlan("basic");
        setTransactionFeePercent(2.0);
        setAdSpend(5000 / rate);
        setReturnsPercent(5);
        setShippingCost(1500 / rate);
        setAppCosts(300 / rate);
    };

    const faqs = [
        { question: "Why does my Shopify dashboard show higher profits than this calculator?", answer: "The Shopify dashboard shows Gross Sales and sometimes Cost of Goods Sold if you input them. However, it does not factor in external expenses like ad spend, merchant transaction fees, return rates, shipping deficits, monthly app costs, and the true cost of your theme or subscriptions. This calculator gives you your true net take-home profit." },
        { question: "What is break-even ROAS?", answer: "Break-even ROAS (Return on Ad Spend) is the minimum multiple of revenue you must generate from every dollar spent on ads to not lose money. For example, a break-even ROAS of 2.5 means you must generate $2.50 in revenue for every $1.00 spent on marketing to break even." },
        { question: "How does return rate affect my store margins?", answer: "Returns represent a double financial hit: you lose the high-margin revenue of the sale, and you are still liable for the cost of return shipping and payment gateway fees, plus the potential loss of the physical item inventory cost if it cannot be restocked." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Shopify Profit Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate true Shopify store profit margins by modeling COGS, ad spend, return rates, transaction fees, and app expenses."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Calculate the True Bottom Line of Your Shopify Store</h2>
            <p>Running a Shopify business successfully requires looking past top-line vanity metrics. High gross sales figures in your admin dashboard look impressive, but the only metric that guarantees survival is <strong>net profit</strong>. By modeling variable product costs, ad budgets, returns, transaction costs, and software app overhead, this calculator isolates your true profit margins and your exact marketing target thresholds.</p>
            <h3>How to Use Shopify Profit Metrics</h3>
            <p>To scale your business sustainably, you must measure your Break-Even ROAS. If your average product cost is high, you need a much higher Return on Ad Spend to run profitable campaigns. Use this simulator to model different price points and shipping fees to find the sweet spot that maximizes customer acquisition without eroding margins.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/break-even-calculator">Break-Even Calculator</Link></li>
                <li><Link href="/tools/marketing-roi-calculator">Marketing ROI Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <ToolLayout
            title="Shopify Profit Calculator"
            description="Calculate true Shopify store net profit by factoring in COGS, transaction fees, ad spend, and returns."
            slug="shopify-profit-calculator"
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
                        <label className="input-label">Gross Revenue ({symbol})</label>
                        <input type="number" className="input-field" value={revenue ? Number((revenue * rate).toFixed(2)) : 0} onChange={(e) => setRevenue((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Cost of Goods Sold (COGS) ({symbol})</label>
                        <input type="number" className="input-field" value={cogs ? Number((cogs * rate).toFixed(2)) : 0} onChange={(e) => setCogs((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Ad Spend (Facebook, Google, TikTok) ({symbol})</label>
                        <input type="number" className="input-field" value={adSpend ? Number((adSpend * rate).toFixed(2)) : 0} onChange={(e) => setAdSpend((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Shopify Plan</label>
                            <select value={plan} onChange={(e) => setPlan(e.target.value as any)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                                <option value="basic">Basic ($29)</option>
                                <option value="shopify">Shopify ($79)</option>
                                <option value="advanced">Advanced ($299)</option>
                            </select>
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Gateway Fee %</label>
                            <input type="number" step="0.1" className="input-field" value={transactionFeePercent} onChange={(e) => setTransactionFeePercent(Number(e.target.value) || 0)} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Return Rate %</label>
                            <input type="number" className="input-field" value={returnsPercent} onChange={(e) => setReturnsPercent(Number(e.target.value) || 0)} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Shipping Deficit ({symbol})</label>
                            <input type="number" className="input-field" value={shippingCost ? Number((shippingCost * rate).toFixed(2)) : 0} onChange={(e) => setShippingCost((Number(e.target.value) || 0) / rate)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">App Costs & Other Overhead ({symbol})</label>
                        <input type="number" className="input-field" value={appCosts ? Number((appCosts * rate).toFixed(2)) : 0} onChange={(e) => setAppCosts((Number(e.target.value) || 0) / rate)} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Net Profit</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatCurrency(netProfit * rate, currency)}
                        </div>
                        <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                            Net Margin: <strong style={{ color: netProfit >= 0 ? "var(--success-color, #22c55e)" : "var(--error-color, #ef4444)" }}>{formatNumber(profitMargin)}%</strong>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Gross Profit</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatCurrency(grossProfit * rate, currency)}
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Returns Deficit</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--error-color, #ef4444)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatCurrency(returnsCost * rate, currency)}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Break-Even ROAS</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {breakEvenRoas === Infinity || breakEvenRoas <= 0 ? "N/A" : breakEvenRoas.toFixed(2)}x
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Actual ROAS</div>
                            <div style={{ fontSize: "1.25rem", color: actualRoas >= breakEvenRoas ? "var(--success-color, #22c55e)" : "var(--error-color, #ef4444)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {actualRoas.toFixed(2)}x
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: "1rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--border-color)" }}>
                        <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Monthly Costs Breakdown</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.875rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--text-secondary)" }}>Plan Subscription</span>
                                <span style={{ color: "var(--text-primary)" }}>{formatCurrency(monthlyPlanCost * rate, currency)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--text-secondary)" }}>Transaction Fees</span>
                                <span style={{ color: "var(--text-primary)" }}>{formatCurrency(transactionFees * rate, currency)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "var(--text-secondary)" }}>App Expenses</span>
                                <span style={{ color: "var(--text-primary)" }}>{formatCurrency(appCosts * rate, currency)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
