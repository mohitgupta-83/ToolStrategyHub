"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function AgencyProfitCalculator() {
    const [revenue, setRevenue] = useState<number>(30000);
    const [directCosts, setDirectCosts] = useState<number>(8000);
    const [totalHours, setTotalHours] = useState<number>(480);
    const [billableHours, setBillableHours] = useState<number>(320);
    const [overhead, setOverhead] = useState<number>(6000);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("agency-profit-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    // Calculation Logic
    const grossProfit = revenue - directCosts;
    const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
    
    const utilizationRate = totalHours > 0 ? (billableHours / totalHours) * 100 : 0;
    
    const netProfit = grossProfit - overhead;
    const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

    const hourlyRateRealized = billableHours > 0 ? revenue / billableHours : 0;
    const netProfitPerHour = billableHours > 0 ? netProfit / billableHours : 0;

    const resetValues = () => {
        setRevenue(30000 / rate);
        setDirectCosts(8000 / rate);
        setTotalHours(480);
        setBillableHours(320);
        setOverhead(6000 / rate);
    };

    const faqs = [
        { question: "What is utilization rate and why does it matter?", answer: "Utilization rate is the percentage of your team's total working hours that are billed directly to clients. For agencies, a healthy target utilization rate is between 70% and 85%. If your utilization is below 60%, you are paying too much for idle time or internal admin overhead." },
        { question: "What is a good gross margin for a service agency?", answer: "Digital and service agencies should target a gross margin of 60% to 70%. This leaves enough room to cover sales, administrative overhead, software stack licenses, and maintain a healthy net profit of 20% to 30%." },
        { question: "How does scope creep affect agency profitability?", answer: "Scope creep represents unpaid work that drains your billable hours. Working on unbilled tasks lowers your effective hourly realization rate, raising your direct costs without raising revenue, and directly crushing net margins." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Agency Profit Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate agency gross margins, employee utilization rates, overhead multipliers, and true net profitability metrics."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Optimize Your Agency margins and Billable Capacity</h2>
            <p>Running a service agency, software shop, or design studio requires strict financial control over billable time and delivery costs. Unlike SaaS, service delivery scales with human labor. The <strong>Agency Profit Calculator</strong> allows agency owners to input their monthly gross billing, contractor or direct fulfillment costs, team capacity, and admin overhead to analyze their operational efficiency.</p>
            <h3>Analyzing Utilization and Realized Hourly Rates</h3>
            <p>Utilization rate is the primary lever of service profitability. If your engineers or writers spend 40% of their day in internal meetings, your actual capacity is compressed. Measuring your net profit per billable hour exposes low-margin client retainers and signals when it is time to transition to project-based pricing or increase your pricing floor.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/freelance-rate-calculator">Freelance Rate Calculator</Link></li>
                <li><Link href="/tools/break-even-calculator">Break-Even Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <ToolLayout
            title="Agency Profit Calculator"
            description="Calculate agency gross margins, utilization rates, and client delivery economics."
            slug="agency-profit-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {/* Inputs card */}
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Inputs</h3>
                        <button onClick={resetValues} className="pill" style={{ cursor: "pointer", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                            Reset
                        </button>
                    </div>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label">Monthly Billing / Revenue ({symbol})</label>
                        <input type="number" className="input-field" value={revenue ? Number((revenue * rate).toFixed(2)) : 0} onChange={(e) => setRevenue((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Direct Cost of Delivery (Contractors, Freelancers) ({symbol})</label>
                        <input type="number" className="input-field" value={directCosts ? Number((directCosts * rate).toFixed(2)) : 0} onChange={(e) => setDirectCosts((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Total Staff Hours / Month</label>
                            <input type="number" className="input-field" value={totalHours} onChange={(e) => setTotalHours(Number(e.target.value) || 0)} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Billable Hours / Month</label>
                            <input type="number" className="input-field" value={billableHours} onChange={(e) => setBillableHours(Number(e.target.value) || 0)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Monthly Overhead (Admin, Software, Rent) ({symbol})</label>
                        <input type="number" className="input-field" value={overhead ? Number((overhead * rate).toFixed(2)) : 0} onChange={(e) => setOverhead((Number(e.target.value) || 0) / rate)} />
                    </div>
                </div>

                {/* Outputs card */}
                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Net profit</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatCurrency(netProfit * rate, currency)}
                        </div>
                        <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                            Net Margin: <strong style={{ color: netProfit >= 0 ? "var(--success-color, #22c55e)" : "var(--error-color, #ef4444)" }}>{formatNumber(netMargin)}%</strong>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Gross Margin</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatNumber(grossMargin)}%
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Utilization Rate</div>
                            <div style={{ fontSize: "1.25rem", color: utilizationRate >= 70 ? "var(--success-color, #22c55e)" : "#eab308", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatNumber(utilizationRate)}%
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Realized Hourly Rate</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatCurrency(hourlyRateRealized * rate, currency)}/hr
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Net Profit / Hour</div>
                            <div style={{ fontSize: "1.25rem", color: netProfitPerHour >= 0 ? "var(--success-color, #22c55e)" : "var(--error-color, #ef4444)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatCurrency(netProfitPerHour * rate, currency)}/hr
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
