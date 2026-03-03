"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { trackUsage } from "@/lib/tracker";
import { calculateFreelanceRate, FreelanceParams, FreelanceResult } from "@/lib/freelanceCalculator";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function FreelanceRateCalculator() {
    const [params, setParams] = useState<FreelanceParams>({
        desiredIncome: 100000,
        expenses: 15000,
        taxRate: 25,
        billableHoursPerWeek: 25,
        vacationWeeks: 4,
        profitMargin: 15
    });

    const [result, setResult] = useState<FreelanceResult | null>(null);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;

    useEffect(() => {
        setResult(calculateFreelanceRate(params));
    }, [params]);

    const tracked = useRef(false);

    const updateParam = (key: keyof FreelanceParams, value: number) => {
        if (!tracked.current) {
            trackUsage("freelance-rate-calculator");
            tracked.current = true;
        }
        setParams(prev => ({ ...prev, [key]: value }));
    };

    const faqs = [
        {
            question: "Why should I include a profit margin as a freelancer?",
            answer: "Your salary pays you for the work you do. The profit margin pays the business for taking risk, financing growth, and covering slow periods. Treat your freelance practice like a real company."
        },
        {
            question: "Why are my billable hours assumed to be lower than 40?",
            answer: "Because you also run the business. You must do marketing, sales calls, accounting, and admin work. Most freelancers average 20-25 billable hours maximum per week."
        }
    ];

    const seoContent = (
        <>
            <h2>The Real Cost of Freelancing</h2>
            <p>A common mistake is taking the total salary you want (e.g., $100k) and dividing it by 2000 hours (50 weeks * 40 hours) to get $50/hour. This fails to account for taxes, unbillable administrative work, equipment expenses, software subscriptions, healthcare, and vacation time.</p>
            <h3>Pricing for Sustainability</h3>
            <p>True hourly rates must be dramatically higher than typical W-2 hourly rates. If you price too low, you are subsidizing your client&apos;s business with your own lack of benefits and structural security.</p>
        </>
    );

    return (
        <ToolLayout
            title="Freelance Rate Calculator"
            description="Don't just divide your salary goals by 2,000 hours. Calculate your true hourly rate including expenses, taxes, unbillable time, and profit margin."
            slug="freelance-rate-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {/* Controls */}
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Desired Take-Home Income</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{formatCurrency(params.desiredIncome * rate, currency)}</span>
                        </div>
                        <input type="range" min="30000" max="300000" step="1000" value={params.desiredIncome} onChange={(e) => updateParam("desiredIncome", parseInt(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Yearly Expenses</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{formatCurrency(params.expenses * rate, currency)}</span>
                        </div>
                        <input type="range" min="0" max="100000" step="500" value={params.expenses} onChange={(e) => updateParam("expenses", parseInt(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Estimated Tax Rate</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{params.taxRate}%</span>
                        </div>
                        <input type="range" min="10" max="50" step="1" value={params.taxRate} onChange={(e) => updateParam("taxRate", parseInt(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Billable Hrs / Week</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{params.billableHoursPerWeek} hrs</span>
                        </div>
                        <input type="range" min="10" max="60" step="1" value={params.billableHoursPerWeek} onChange={(e) => updateParam("billableHoursPerWeek", parseInt(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Vacation & Sick Weeks</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{params.vacationWeeks} weeks</span>
                        </div>
                        <input type="range" min="0" max="12" step="1" value={params.vacationWeeks} onChange={(e) => updateParam("vacationWeeks", parseInt(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Profit Margin</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{params.profitMargin}%</span>
                        </div>
                        <input type="range" min="0" max="50" step="1" value={params.profitMargin} onChange={(e) => updateParam("profitMargin", parseInt(e.target.value))} />
                    </div>

                </div>

                {/* Results */}
                {result && (
                    <div className="stagger-2">
                        <div className="card" style={{ backgroundColor: "var(--bg-tertiary)", borderColor: "var(--accent-primary)" }}>
                            <h3 style={{ fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                Minimum Hourly Rate
                            </h3>
                            <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: "var(--accent-primary)", lineHeight: 1, marginBottom: "2rem" }}>
                                {formatCurrency(result.hourlyRate * rate, currency)}
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>Monthly Retainer (Equiv)</span>
                                    <span style={{ fontSize: "1.25rem" }}>{formatCurrency(result.monthlyRetainer * rate, currency)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>Standard Project (40h)</span>
                                    <span style={{ fontSize: "1.25rem" }}>{formatCurrency(result.projectRateSuggestion * rate, currency)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>Gross Target Revenue</span>
                                    <span style={{ fontSize: "1.25rem", color: "var(--border-focus)" }}>{formatCurrency(result.totalRevenueTarget * rate, currency)}</span>
                                </div>
                            </div>
                        </div>

                        {result.warnings.length > 0 && (
                            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {result.warnings.map((warn, idx) => (
                                    <div key={idx} style={{ padding: "1rem", backgroundColor: "rgba(255, 100, 100, 0.1)", borderLeft: "4px solid #ff6464", color: "#ff8888", fontSize: "0.875rem" }}>
                                        <strong>Warning:</strong> {warn}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
