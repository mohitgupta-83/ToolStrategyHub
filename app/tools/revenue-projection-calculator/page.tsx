"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function RevenueProjectionCalculator() {
    const [startingMrr, setStartingMrr] = useState<number>(1000);
    const [newCustomersPerMonth, setNewCustomersPerMonth] = useState<number>(20);
    const [arpu, setArpu] = useState<number>(50);
    const [churnRate, setChurnRate] = useState<number>(3.5);
    const [expansionRate, setExpansionRate] = useState<number>(1.5);
    const [monthlyExpenses, setMonthlyExpenses] = useState<number>(8000);
    const [months, setMonths] = useState<number>(12);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("revenue-projection-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    // Generate Month-by-Month Projection Data
    interface MonthData {
        month: number;
        customers: number;
        mrr: number;
        arr: number;
        profit: number;
    }

    const projectionData: MonthData[] = [];
    let currentCustomers = startingMrr / arpu;
    let currentMrr = startingMrr;
    let breakEvenMonth = -1;

    for (let m = 1; m <= months; m++) {
        // Churn calculation
        const lostCustomers = currentCustomers * (churnRate / 100);
        
        // Net new customers
        currentCustomers = Math.max(0, currentCustomers - lostCustomers + newCustomersPerMonth);
        
        // MRR calculation (including expansion)
        const expansionMrr = currentMrr * (expansionRate / 100);
        const lostMrr = currentMrr * (churnRate / 100);
        const newMrr = newCustomersPerMonth * arpu;
        
        currentMrr = Math.max(0, currentMrr - lostMrr + expansionMrr + newMrr);
        const currentArr = currentMrr * 12;
        const currentProfit = currentMrr - monthlyExpenses;

        if (breakEvenMonth === -1 && currentMrr >= monthlyExpenses) {
            breakEvenMonth = m;
        }

        projectionData.push({
            month: m,
            customers: Math.round(currentCustomers),
            mrr: currentMrr,
            arr: currentArr,
            profit: currentProfit
        });
    }

    const finalMrr = projectionData[projectionData.length - 1]?.mrr || 0;
    const finalArr = finalMrr * 12;
    const totalCumulativeRevenue = projectionData.reduce((acc, curr) => acc + curr.mrr, 0);

    const resetValues = () => {
        setStartingMrr(1000 / rate);
        setNewCustomersPerMonth(20);
        setArpu(50 / rate);
        setChurnRate(3.5);
        setExpansionRate(1.5);
        setMonthlyExpenses(8000 / rate);
        setMonths(12);
    };

    const faqs = [
        { question: "What is the difference between MRR and ARR?", answer: "MRR is Monthly Recurring Revenue — the total amount of predictable subscription revenue you earn each month. ARR is Annual Recurring Revenue, calculated as MRR multiplied by 12. ARR represents your annual revenue run rate." },
        { question: "How does Churn Rate affect my revenue projection?", answer: "Churn is the rate at which customers cancel subscriptions. High churn (above 5% monthly) acts like a leaky bucket, requiring you to acquire huge numbers of new customers just to stay flat. Reducing churn yields exponential revenue improvements." },
        { question: "What is Expansion MRR?", answer: "Expansion MRR is additional revenue generated from existing customers through upsells, cross-sells, or account upgrades. Net Negative Churn occurs when your monthly Expansion MRR is greater than your lost churn MRR." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Revenue Projection Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate 12-month and 24-month SaaS revenue forecasts using starting MRR, user acquisition rate, pricing, churn, and expansion metrics."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Build Data-Driven Revenue Projections for Your SaaS Startup</h2>
            <p>Investors and operators analyze subscription business models through quantitative bottom-up metrics. Simple linear growth models fail to represent the compounding effects of customer churn and expansion revenue. This <strong>Revenue Projection Calculator</strong> allows founders to construct rigorous 12-month or 24-month revenue forecasts based on exact customer acquisition speed, retention metrics, and monthly burn limits.</p>
            <h3>How to Evaluate SaaS Growth Trajectories</h3>
            <p>Use this tool to forecast your break-even horizon. By adjusting your ARPU (Average Revenue Per User) and your churn target, you can immediately identify how price point adjustments change your cash flow needs. High-priced enterprise SaaS tools can break even on fewer customers, whereas low-priced consumer tools require extreme volume to offset standard acquisition friction.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/startup-burn-rate-calculator">Startup Burn Rate Calculator</Link></li>
                <li><Link href="/tools/customer-lifetime-value-calculator">Customer Lifetime Value Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <ToolLayout
            title="Revenue Projection Calculator"
            description="Build data-driven MRR and ARR revenue forecasts using churn, growth, and expense variables."
            slug="revenue-projection-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {/* Inputs card */}
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Model Inputs</h3>
                        <button onClick={resetValues} className="pill" style={{ cursor: "pointer", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                            Reset
                        </button>
                    </div>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label">Starting MRR ({symbol})</label>
                        <input type="number" className="input-field" value={startingMrr ? Number((startingMrr * rate).toFixed(2)) : 0} onChange={(e) => setStartingMrr((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">New Customers / Month</label>
                        <input type="number" className="input-field" value={newCustomersPerMonth} onChange={(e) => setNewCustomersPerMonth(Number(e.target.value) || 0)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Avg Revenue Per User (Monthly Price) ({symbol})</label>
                        <input type="number" className="input-field" value={arpu ? Number((arpu * rate).toFixed(2)) : 0} onChange={(e) => setArpu((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Churn Rate %</label>
                            <input type="number" step="0.1" className="input-field" value={churnRate} onChange={(e) => setChurnRate(Number(e.target.value) || 0)} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Expansion MRR %</label>
                            <input type="number" step="0.1" className="input-field" value={expansionRate} onChange={(e) => setExpansionRate(Number(e.target.value) || 0)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Monthly Operating Expenses ({symbol})</label>
                        <input type="number" className="input-field" value={monthlyExpenses ? Number((monthlyExpenses * rate).toFixed(2)) : 0} onChange={(e) => setMonthlyExpenses((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Projection Horizon (Months)</label>
                        <input type="range" min="3" max="24" step="1" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>{months} Months Projection</div>
                    </div>
                </div>

                {/* Outputs card */}
                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Month {months} ARR Run Rate</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatCurrency(finalArr * rate, currency)}
                        </div>
                        <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                            Month {months} MRR: <strong>{formatCurrency(finalMrr * rate, currency)}</strong>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Cumulative Revenue</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatCurrency(totalCumulativeRevenue * rate, currency)}
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Break-Even Month</div>
                            <div style={{ fontSize: "1.25rem", color: breakEvenMonth > 0 ? "var(--success-color, #22c55e)" : "var(--error-color, #ef4444)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {breakEvenMonth > 0 ? `Month ${breakEvenMonth}` : "Never"}
                            </div>
                        </div>
                    </div>

                    {/* Simple Table of projection */}
                    <div style={{ maxHeight: "250px", overflowY: "auto", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
                            <thead>
                                <tr style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                                    <th style={{ padding: "0.5rem" }}>Month</th>
                                    <th style={{ padding: "0.5rem" }}>Users</th>
                                    <th style={{ padding: "0.5rem" }}>MRR</th>
                                    <th style={{ padding: "0.5rem" }}>Cash Flow</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectionData.map((row) => (
                                    <tr key={row.month} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                        <td style={{ padding: "0.5rem" }}>M{row.month}</td>
                                        <td style={{ padding: "0.5rem" }}>{row.customers}</td>
                                        <td style={{ padding: "0.5rem", fontFamily: "var(--font-mono)" }}>{formatCurrency(row.mrr * rate, currency)}</td>
                                        <td style={{ padding: "0.5rem", fontFamily: "var(--font-mono)", color: row.profit >= 0 ? "var(--success-color, #22c55e)" : "var(--error-color, #ef4444)" }}>
                                            {row.profit >= 0 ? "+" : ""}{formatCurrency(row.profit * rate, currency)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
