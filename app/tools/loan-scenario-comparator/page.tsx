"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { trackUsage } from "@/lib/tracker";
import { calculateLoanScenario, LoanParams, LoanScenarioResult } from "@/lib/loanComparator";

export default function LoanScenarioComparator() {
    const defaultScenario = {
        amount: 300000,
        rate: 6.5,
        termYears: 30,
        extraPayment: 0
    };

    const [scenarios, setScenarios] = useState<LoanParams[]>([
        { ...defaultScenario, extraPayment: 0 },
        { ...defaultScenario, extraPayment: 200 },
        { ...defaultScenario, extraPayment: 500 }
    ]);

    const [results, setResults] = useState<LoanScenarioResult[]>([]);

    useEffect(() => {
        setResults(scenarios.map(s => calculateLoanScenario(s)));
    }, [scenarios]);

    const tracked = useRef(false);

    const updateScenario = (index: number, key: keyof LoanParams, value: number) => {
        if (!tracked.current) {
            trackUsage("loan-scenario-comparator");
            tracked.current = true;
        }
        const updated = [...scenarios];
        updated[index] = { ...updated[index], [key]: value || 0 };
        setScenarios(updated);
    };

    const faqs = [
        {
            question: "How do extra payments affect my loan?",
            answer: "Extra payments are applied directly to the principal balance (not the interest). This reduces the compound interest charged on the remaining balance over the lifetime of the loan."
        },
        {
            question: "Why should I compare these scenarios side-by-side?",
            answer: "Because humans are bad at intuitively understanding compound interest. A seemingly trivial $200 extra per month can shave years off a loan and save tens of thousands of dollars in pure interest."
        }
    ];

    const seoContent = (
        <>
            <h2>Understanding Compound Interest on Mortgages and Loans</h2>
            <p>When you take out a 30-year mortgage, you typically end up paying almost double the purchase price by the end of the term due to interest. The bank structures amortization tables so that your early payments are almost entirely interest, not principal.</p>
            <h3>The Power of Asymmetric Payoff</h3>
            <p>Any extra dollar you put toward the principal early in the loan prevents that dollar from compounding interest for 30 years. Using this side-by-side comparator allows you to find your specific inflection point—where a small sacrifice in monthly cash flow yields a life-changing reduction in total debt.</p>
        </>
    );

    return (
        <ToolLayout
            title="Loan Scenario Comparator"
            description="Compare up to 3 amortization scenarios side-by-side. See exactly how extra monthly payments wipe out years of compound interest."
            slug="loan-scenario-comparator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }}>

                {scenarios.map((scenario, index) => (
                    <div key={index} className={`card stagger-${index + 1}`} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>
                        <h3 style={{ position: "absolute", top: "-1rem", left: "2rem", backgroundColor: "var(--bg-secondary)", padding: "0 0.5rem", color: "var(--accent-primary)", fontSize: "0.875rem", textTransform: "uppercase" }}>
                            Scenario {index + 1}
                        </h3>

                        <div className="input-group" style={{ marginTop: "1rem" }}>
                            <label className="input-label">Principal Amount ($)</label>
                            <input type="number" className="input-field" value={scenario.amount} onChange={(e) => updateScenario(index, "amount", parseFloat(e.target.value))} />
                        </div>

                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div className="input-group" style={{ flex: 1 }}>
                                <label className="input-label">Rate (%)</label>
                                <input type="number" className="input-field" step="0.1" value={scenario.rate} onChange={(e) => updateScenario(index, "rate", parseFloat(e.target.value))} />
                            </div>
                            <div className="input-group" style={{ flex: 1 }}>
                                <label className="input-label">Term (Yrs)</label>
                                <input type="number" className="input-field" value={scenario.termYears} onChange={(e) => updateScenario(index, "termYears", parseInt(e.target.value))} />
                            </div>
                        </div>

                        <div className="input-group" style={{ backgroundColor: "rgba(204, 255, 0, 0.05)", padding: "1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-muted)" }}>
                            <label className="input-label" style={{ color: "var(--accent-primary)" }}>Extra Monthly Payment ($)</label>
                            <input type="number" className="input-field" value={scenario.extraPayment} style={{ borderColor: "var(--accent-primary)" }} onChange={(e) => updateScenario(index, "extraPayment", parseFloat(e.target.value))} />
                        </div>

                        {results[index] && (
                            <div style={{ borderTop: "1px dashed var(--border-color)", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

                                <div>
                                    <div className="input-label">Monthly Min. Payment</div>
                                    <div style={{ fontSize: "2rem", fontFamily: "var(--font-serif)" }}>${results[index].monthlyPaymentBase.toLocaleString()}</div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span className="input-label" style={{ color: "var(--text-primary)" }}>Total Actual Payment/mo</span>
                                    <span style={{ color: "var(--accent-primary)", fontWeight: "bold" }}>${(results[index].monthlyPaymentBase + scenario.extraPayment).toLocaleString()}</span>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "0.5rem" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>Total Interest Paid</span>
                                    <span style={{ color: "#ff8888" }}>${results[index].totalInterestPaid.toLocaleString()}</span>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>Payoff Time</span>
                                    <span>{results[index].payoffYears} Years</span>
                                </div>

                                {results[index].savingsFromExtra > 0 && (
                                    <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderLeft: "4px solid var(--accent-primary)" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                            <span className="input-label">Interest Saved</span>
                                            <span style={{ color: "var(--accent-primary)", fontWeight: "bold" }}>${results[index].savingsFromExtra.toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span className="input-label">Time Saved</span>
                                            <span style={{ color: "var(--text-primary)" }}>{Math.floor(results[index].timeSavedMonths / 12)}y {results[index].timeSavedMonths % 12}m</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </ToolLayout>
    );
}
