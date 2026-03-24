/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

interface WorkflowCostResult {
    monthlyCost: number;
    yearlyCost: number;
    automationScore: number;
    priority: string;
}

export default function ManualWorkflowCostCalculator() {
    const [hoursPerTask, setHoursPerTask] = useState(2);
    const [frequencyPerWeek, setFrequencyPerWeek] = useState(5);
    const [hourlyCost, setHourlyCost] = useState(40);
    const [employees, setEmployees] = useState(3);

    const [result, setResult] = useState<WorkflowCostResult | null>(null);
    const tracked = useRef(false);

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
    const symbol = CURRENCY_RATES[currency].symbol;

    useEffect(() => {
        const weeklyHours = hoursPerTask * frequencyPerWeek * employees;
        const weeklyCost = weeklyHours * hourlyCost;
        const monthlyCost = weeklyCost * 4.33;
        const yearlyCost = weeklyCost * 52;

        let automationScore = Math.min(100, Math.round((yearlyCost / 100000) * 100));

        // Boost score if frequency is extremely high (boring tasks)
        if (frequencyPerWeek * employees > 20) {
            automationScore = Math.min(100, automationScore + 15);
        }

        let priority = "Low Priority (Monitor)";
        if (automationScore > 80) priority = "Critical: Immediate Automation Required";
        else if (automationScore > 50) priority = "High ROI Potential";
        else if (automationScore > 25) priority = "Moderate ROI";

        setResult({ monthlyCost, yearlyCost, automationScore, priority });

        if (!tracked.current) {
            trackUsage("workflow-cost-calculator");
            tracked.current = true;
        }
    }, [hoursPerTask, frequencyPerWeek, hourlyCost, employees]);

    const faqs = [
        {
            question: "Does hourly cost only mean the employee&apos;s wage?",
            answer: "No. You should use the &apos;Fully Burdened Rate&apos;. Take the employee&apos;s hourly wage and add 20-30% to account for payroll taxes, benefits, software licenses, and overhead. A $30/hr employee often costs the business $42/hr."
        },
        {
            question: "At what yearly cost should I build a custom internal tool vs buying SaaS?",
            answer: "If the yearly loss exceeds $20,000, and off-the-shelf software cannot solve the exact problem, paying a developer $10,000 to automate it via API or script yields an immediate 100% 1-year ROI."
        }
    ];

    const seoContent = (
        <>
            <h2>The Mathematics of Process Automation</h2>
            <p>Businesses bleed cash through &apos;data friction&apos;. When humans manually move files between systems, re-enter customer data, or generate manual PDF reports, the company loses twice: once in payroll, and again in opportunity cost.</p>
            <h3>Opportunity Cost is the Real Killer</h3>
            <p>If an employee spends 10 hours a week on manual data entry, that is 10 hours they are not spending closing sales or speaking to customers. If a script can do the task in 2 seconds, the ROI is mathematically undeniable.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/automation-roi-tool">Automation ROI Tool</Link></li>
                <li><Link href="/ai-tools">AI Developer Ecosystem</Link></li>
                <li><Link href="/ai-tools/resources">AI Automation Frameworks</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout
            title="Manual Workflow Cost Calculator"
            description="Calculate the silent financial drain of manual workflows and determine the exact ROI threshold for automating internal processes."
            slug="workflow-cost-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label">Hours Per Single Task execution</label>
                        <input type="number" step="0.5" className="input-field" value={hoursPerTask} onChange={(e) => setHoursPerTask(Number(e.target.value) || 0)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Frequency Per Week (Times task is run)</label>
                        <input type="number" className="input-field" value={frequencyPerWeek} onChange={(e) => setFrequencyPerWeek(Number(e.target.value) || 0)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Burdened Hourly Cost of Employee ({symbol})</label>
                        <input type="number" className="input-field" value={hourlyCost ? Number((hourlyCost * rate).toFixed(2)) : 0} onChange={(e) => setHourlyCost((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Number of Employees Doing This Task</label>
                        <input type="number" className="input-field" value={employees} onChange={(e) => setEmployees(Number(e.target.value) || 0)} />
                    </div>

                </div>

                {result && (
                    <div className="stagger-2">
                        <div className="card" style={{ borderColor: result.automationScore >= 80 ? "var(--error-color)" : "var(--border-focus)" }}>

                            <div style={{ marginBottom: "2rem", borderBottom: "1px dashed var(--border-color)", paddingBottom: "2rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                                    <span>Monthly Capital Drain</span>
                                    <span>Yearly Capital Drain (Loss)</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                                        {formatCurrency(result.monthlyCost * rate, currency)}
                                    </div>
                                    <div style={{ fontSize: "3rem", fontFamily: "var(--font-serif)", color: "var(--error-color)", lineHeight: 1 }}>
                                        {formatCurrency(result.yearlyCost * rate, currency)}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: "2rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                    <h3 className="input-label">Automation Priority Score</h3>
                                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{result.automationScore}/100</span>
                                </div>
                                <div className="score-bar">
                                    <div className="score-fill" style={{ width: `${result.automationScore}%`, backgroundColor: result.automationScore >= 80 ? "var(--error-color)" : "var(--accent-primary)" }}></div>
                                </div>
                                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                                    <div className="pill" style={{
                                        backgroundColor: result.automationScore >= 80 ? "rgba(255, 50, 50, 0.1)" : "var(--bg-secondary)",
                                        color: result.automationScore >= 80 ? "var(--error-color)" : "var(--text-primary)"
                                    }}>
                                        {result.priority}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout >
    );
}
