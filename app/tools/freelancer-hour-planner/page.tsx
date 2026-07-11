"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function FreelancerHourPlanner() {
    const [totalHours, setTotalHours] = useState<number>(40);
    const [commsPercent, setCommsPercent] = useState<number>(15);
    const [adminPercent, setAdminPercent] = useState<number>(10);
    const [bizDevPercent, setBizDevPercent] = useState<number>(15);
    const [learningPercent, setLearningPercent] = useState<number>(10);
    const [hourlyRate, setHourlyRate] = useState<number>(75);
    const [hoursPerClient, setHoursPerClient] = useState<number>(5);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("freelancer-hour-planner");
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
    const unbillablePercent = commsPercent + adminPercent + bizDevPercent + learningPercent;
    const billablePercent = Math.max(0, 100 - unbillablePercent);
    
    const billableHours = (totalHours * billablePercent) / 100;
    const unbillableHours = totalHours - billableHours;

    const weeklyRevenue = billableHours * hourlyRate;
    const monthlyRevenue = weeklyRevenue * 4.33; // average weeks in a month
    const annualRevenue = weeklyRevenue * 48; // assumes 4 weeks unpaid leave

    const maxClients = hoursPerClient > 0 ? Math.floor(billableHours / hoursPerClient) : 0;

    const resetValues = () => {
        setTotalHours(40);
        setCommsPercent(15);
        setAdminPercent(10);
        setBizDevPercent(15);
        setLearningPercent(10);
        setHourlyRate(75 / rate);
        setHoursPerClient(5);
    };

    const faqs = [
        { question: "What are unbillable hours for freelancers?", answer: "Unbillable hours are all of the necessary tasks required to run your business that you cannot charge clients for. This includes marketing, writing proposals, sending invoices, administrative communications, updating your portfolio, and learning new software skills." },
        { question: "How does this planner prevent freelancer burnout?", answer: "Burnout occurs when freelancers commit to 30 or 40 billable hours per week, ignoring the additional 10 to 20 unbillable hours required to run the business. This planner exposes your true billable capacity so you set realistic boundaries." },
        { question: "What is a healthy freelancer utilization rate?", answer: "A healthy solo freelancer utilization rate is between 50% and 60%. If your billable rate is above 75%, you likely lack the time to market yourself, resulting in a 'feast or famine' cycle when current client contracts end." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Freelancer Hour Planner",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate your true freelance billable capacity, set workweek boundaries, and plan revenue limits."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Calculate Your True Freelance Billable Capacity</h2>
            <p>The single greatest operational error solo freelancers make is underestimating the volume of unbillable labor required to run their businesses. If you plan a standard 40-hour workweek, you cannot bill for 40 hours. The <strong>Freelancer Hour Planner</strong> lets you map out time spent on administration, prospecting, communication, and education to isolate your true billable hours.</p>
            <h3>Sustainably Planning Client Capacity and Revenue Limits</h3>
            <p>When you know your exact billable ceiling, you can calculate the minimum hourly or project rate required to hit your income targets. It also prevents overcommitting to client delivery, protecting your schedule for administrative tasks and professional development that compound your long-term value.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/freelance-rate-calculator">Freelance Rate Calculator</Link></li>
                <li><Link href="/tools/freelance-project-pricing-matrix">Proposal Pricing Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number, maxDigits: number = 1) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: maxDigits }).format(num);
    };

    return (
        <ToolLayout
            title="Freelancer Hour Planner"
            description="Plan your freelance workweek by mapping billable capacity against unbillable overhead to maximize revenue."
            slug="freelancer-hour-planner"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {/* Inputs card */}
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Weekly Time Allocation</h3>
                        <button onClick={resetValues} className="pill" style={{ cursor: "pointer", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                            Reset
                        </button>
                    </div>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Target Work Hours / Week</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{totalHours} hrs</span>
                        </label>
                        <input type="range" min="10" max="80" step="1" value={totalHours} onChange={(e) => setTotalHours(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Target Hourly Rate ({symbol})</label>
                        <input type="number" className="input-field" value={hourlyRate ? Number((hourlyRate * rate).toFixed(2)) : 0} onChange={(e) => setHourlyRate((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <h4 style={{ fontSize: "0.95rem", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.25rem", marginTop: "0.5rem" }}>Unbillable Overhead %</h4>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Client Comms %</label>
                            <input type="number" className="input-field" value={commsPercent} onChange={(e) => setCommsPercent(Number(e.target.value) || 0)} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Admin/Invoices %</label>
                            <input type="number" className="input-field" value={adminPercent} onChange={(e) => setAdminPercent(Number(e.target.value) || 0)} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Biz Dev/Sales %</label>
                            <input type="number" className="input-field" value={bizDevPercent} onChange={(e) => setBizDevPercent(Number(e.target.value) || 0)} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Learning %</label>
                            <input type="number" className="input-field" value={learningPercent} onChange={(e) => setLearningPercent(Number(e.target.value) || 0)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Avg Delivery Hours / Client</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{hoursPerClient} hrs</span>
                        </label>
                        <input type="range" min="1" max="30" step="1" value={hoursPerClient} onChange={(e) => setHoursPerClient(Number(e.target.value))} />
                    </div>
                </div>

                {/* Outputs card */}
                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Weekly Revenue Potential</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatCurrency(weeklyRevenue * rate, currency)}
                        </div>
                        <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                            Utilization Rate: <strong>{formatNumber(billablePercent)}%</strong>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Billable Hours</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatNumber(billableHours)} hrs
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Unbillable Hours</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--error-color, #ef4444)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatNumber(unbillableHours)} hrs
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Monthly Potential</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatCurrency(monthlyRevenue * rate, currency)}
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Annual Potential</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--success-color, #22c55e)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatCurrency(annualRevenue * rate, currency)}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Max Active Clients Recommended</div>
                            <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {maxClients}
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                                (at {hoursPerClient} delivery hours per client)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
