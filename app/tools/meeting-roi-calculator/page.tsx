"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function MeetingRoiCalculator() {
    const [attendees, setAttendees] = useState<number>(8);
    const [avgSalary, setAvgSalary] = useState<number>(85000);
    const [durationMinutes, setDurationMinutes] = useState<number>(60);
    const [frequency, setFrequency] = useState<number>(4); // per month

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("meeting-roi-calculator");
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
    // Standard working hours per year = 2080
    const avgHourlyRate = avgSalary / 2080;
    
    // Meeting cost
    const costPerMeeting = attendees * avgHourlyRate * (durationMinutes / 60);
    const monthlyCost = costPerMeeting * frequency;
    const annualCost = monthlyCost * 12;

    const resetValues = () => {
        setAttendees(8);
        setAvgSalary(85000 / rate);
        setDurationMinutes(60);
        setFrequency(4);
    };

    const faqs = [
        { question: "How is the hourly cost of a meeting calculated?", answer: "We take the average annual salary of the attendees, convert it to an hourly rate (using 2,080 working hours per year), multiply it by the number of attendees, and scale it based on the duration of the meeting." },
        { question: "What is meeting opportunity cost?", answer: "Opportunity cost represents the value of what your employees *could* have produced if they were not in the meeting. For example, if 5 senior engineers spend an hour in a meeting, they are not writing code, fixing bugs, or shipping features. This double cost makes low-ROI meetings extremely expensive." },
        { question: "How can I reduce meeting overhead?", answer: "Implement strict meeting criteria: require an agenda, set a default duration of 20 or 40 minutes, limit attendees to decision-makers, and convert status-update meetings to async formats like Slack summaries or Loom videos." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Meeting ROI Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate the true financial and opportunity cost of recurring team meetings."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Calculate the True Financial Cost of Team Meetings</h2>
            <p>Every meeting on your corporate calendar represents a direct payroll expense and an indirect opportunity cost. In most modern organizations, meetings are scheduled without considering their financial impact. The <strong>Meeting ROI Calculator</strong> allows executives, product managers, and team leaders to calculate the true cost of pulling teams away from deep focus work.</p>
            <h3>Calculating Monthly and Annual Calendar Cost</h3>
            <p>A simple weekly 1-hour status meeting with eight attendees earning average salaries costs the company thousands of dollars annually. By exposing these figures, teams can evaluate which calendar invites are genuinely productive and which should be replaced with async communication methods.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/workflow-cost-calculator">Workflow Cost Calculator</Link></li>
                <li><Link href="/tools/hourly-to-salary-calculator">Hourly to Salary Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(num);
    };

    return (
        <ToolLayout
            title="Meeting ROI Calculator"
            description="Calculate the true hourly cost of every meeting based on attendee salaries and opportunity cost."
            slug="meeting-roi-calculator"
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
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Number of Attendees</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{attendees}</span>
                        </label>
                        <input type="range" min="2" max="100" step="1" value={attendees} onChange={(e) => setAttendees(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Average Annual Salary ({symbol})</label>
                        <input type="number" className="input-field" value={avgSalary ? Number((avgSalary * rate).toFixed(0)) : 0} onChange={(e) => setAvgSalary((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Duration (Minutes)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{durationMinutes} min</span>
                        </label>
                        <input type="range" min="5" max="240" step="5" value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Frequency per Month</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{frequency} times</span>
                        </label>
                        <input type="range" min="1" max="30" step="1" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} />
                    </div>
                </div>

                {/* Outputs card */}
                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Cost per Meeting</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatCurrency(costPerMeeting * rate, currency)}
                        </div>
                        <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                            Average hourly rate per person: {formatCurrency(avgHourlyRate * rate, currency)}/hr
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Monthly Cost</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatCurrency(monthlyCost * rate, currency)}
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Annualized Cost</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--error-color, #ef4444)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatCurrency(annualCost * rate, currency)}
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--border-color)" }}>
                        <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Meeting ROI Assessment</h4>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                            To justify this meeting, it must generate at least <strong>{formatCurrency(costPerMeeting * rate, currency)}</strong> in enterprise value per occurrence. If this is a recurring sync that rarely makes actionable decisions, consider replacing it with an asynchronous status update.
                        </p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
