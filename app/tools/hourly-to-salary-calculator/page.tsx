"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function HourlyToSalaryCalculator() {
    const [mode, setMode] = useState<"hourly-to-salary" | "salary-to-hourly">("hourly-to-salary");
    const [hourlyRate, setHourlyRate] = useState<number>(50);
    const [salary, setSalary] = useState<number>(100000);
    const [weeksPerYear, setWeeksPerYear] = useState<number>(52);
    const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
    const [unpaidDays, setUnpaidDays] = useState<number>(15); // holidays + vacation days unpaid
    const [isContractor, setIsContractor] = useState<boolean>(false);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("hourly-to-salary-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    // Calculation logic
    // Total standard working hours = weeksPerYear * hoursPerWeek
    // If unpaid days exist, deduct them. 1 day = 8 hours
    const unpaidHours = unpaidDays * 8;
    const totalWorkingHours = Math.max(0, (weeksPerYear * hoursPerWeek) - unpaidHours);

    let calculatedSalary = 0;
    let calculatedHourly = 0;

    if (mode === "hourly-to-salary") {
        calculatedHourly = hourlyRate;
        calculatedSalary = hourlyRate * totalWorkingHours;
    } else {
        calculatedSalary = salary;
        calculatedHourly = totalWorkingHours > 0 ? salary / totalWorkingHours : 0;
    }

    // Contractor adjustment: if contractor, add a 30% premium to represent the employee equivalent value
    const contractorPremiumFactor = 1.30;
    const employeeEquivalentSalary = isContractor ? calculatedSalary / contractorPremiumFactor : calculatedSalary;

    const monthlyEquivalent = calculatedSalary / 12;
    const weeklyEquivalent = weeksPerYear > 0 ? calculatedSalary / weeksPerYear : 0;
    const dailyEquivalent = 5 * weeksPerYear > 0 ? calculatedSalary / (5 * weeksPerYear) : 0;

    const resetValues = () => {
        setHourlyRate(50 / rate);
        setSalary(100000 / rate);
        setWeeksPerYear(52);
        setHoursPerWeek(40);
        setUnpaidDays(15);
        setIsContractor(false);
    };

    const faqs = [
        { question: "Why is the hourly-to-salary conversion more than just hourly rate times 2,000?", answer: "Hourly rate times 2,080 assumes you work 40 hours every single week with no holidays, sick days, or vacation. In reality, most employees work closer to 1,880 to 1,920 hours due to paid time off. For contractors, time off is unpaid, which significantly reduces annualized earnings." },
        { question: "What is the Contractor Premium?", answer: "Contractors must cover their own health insurance, retirement contributions, self-employment taxes (the employer's 7.65% share), and business software. To earn the equivalent take-home of a W-2 salary, a contractor must charge a premium of 30% to 50% above their W-2 hourly equivalent." },
        { question: "How does the Self-Employment tax affect my rate conversion?", answer: "In the United States, self-employed contractors pay a 15.3% self-employment tax, whereas W-2 employees only pay 7.65% (the employer pays the other half). This calculator factors in this tax burden to give you a true side-by-side equivalent comparison." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Hourly to Salary Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Convert hourly wage to annual salary and vice-versa, factoring in unpaid leave, working hours, and W-2 vs. 1099 contractor economics."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Convert Between Hourly Rates and Annual Salaries Accurately</h2>
            <p>Whether you are evaluating a full-time job offer, negotiating a freelance contract, or calculating employee costs, simple multiplication fails to represent true financial equivalence. The <strong>Hourly to Salary Calculator</strong> factors in unpaid holidays, sick days, working hours per week, and the 1099 contractor tax burden to construct a side-by-side financial comparison.</p>
            <h3>Calculating W-2 Employee vs. 1099 Contractor Equivalence</h3>
            <p>If you transition from a full-time salary to contract work, you cannot simply divide your salary by 2,000 to find your hourly rate. Doing so ignores the cost of self-employment tax, lack of paid vacation, and zero health insurance benefits. Use this calculator to model the exact contractor premium required to keep your net take-home compensation equal.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/freelance-rate-calculator">Freelance Rate Calculator</Link></li>
                <li><Link href="/tools/freelance-project-pricing-matrix">Proposal Pricing Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number, maxDigits: number = 0) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: maxDigits }).format(num);
    };

    return (
        <ToolLayout
            title="Hourly To Salary Calculator"
            description="Convert hourly wage to equivalent annual salary (and vice-versa) accounting for vacation, holidays, and taxes."
            slug="hourly-to-salary-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {/* Inputs card */}
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button onClick={() => setMode("hourly-to-salary")} className="pill" style={{ cursor: "pointer", background: mode === "hourly-to-salary" ? "var(--accent-primary)" : "var(--bg-secondary)", color: mode === "hourly-to-salary" ? "white" : "var(--text-secondary)", border: "1px solid var(--border-color)" }}>
                                Hourly → Salary
                            </button>
                            <button onClick={() => setMode("salary-to-hourly")} className="pill" style={{ cursor: "pointer", background: mode === "salary-to-hourly" ? "var(--accent-primary)" : "var(--bg-secondary)", color: mode === "salary-to-hourly" ? "white" : "var(--text-secondary)", border: "1px solid var(--border-color)" }}>
                                Salary → Hourly
                            </button>
                        </div>
                        <button onClick={resetValues} className="pill" style={{ cursor: "pointer", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                            Reset
                        </button>
                    </div>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    {mode === "hourly-to-salary" ? (
                        <div className="input-group">
                            <label className="input-label">Hourly Rate ({symbol})</label>
                            <input type="number" className="input-field" value={hourlyRate ? Number((hourlyRate * rate).toFixed(2)) : 0} onChange={(e) => setHourlyRate((Number(e.target.value) || 0) / rate)} />
                        </div>
                    ) : (
                        <div className="input-group">
                            <label className="input-label">Annual Salary ({symbol})</label>
                            <input type="number" className="input-field" value={salary ? Number((salary * rate).toFixed(0)) : 0} onChange={(e) => setSalary((Number(e.target.value) || 0) / rate)} />
                        </div>
                    )}

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Working Weeks / Yr</label>
                            <input type="number" className="input-field" value={weeksPerYear} onChange={(e) => setWeeksPerYear(Number(e.target.value) || 0)} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Hours / Week</label>
                            <input type="number" className="input-field" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value) || 0)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Unpaid Time Off / Yr (Vacation + Holidays in Days)</label>
                        <input type="number" className="input-field" value={unpaidDays} onChange={(e) => setUnpaidDays(Number(e.target.value) || 0)} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                            Equivalent to {unpaidHours} hours of unpaid time.
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input type="checkbox" id="contractor-check" checked={isContractor} onChange={(e) => setIsContractor(e.target.checked)} style={{ width: "1.25rem", height: "1.25rem", cursor: "pointer" }} />
                        <label htmlFor="contractor-check" style={{ fontSize: "0.875rem", color: "var(--text-primary)", cursor: "pointer" }}>
                            I am a 1099 Contractor / Freelancer
                        </label>
                    </div>
                </div>

                {/* Outputs card */}
                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
                            {mode === "hourly-to-salary" ? "Equivalent Annual Salary" : "Equivalent Hourly Rate"}
                        </div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {mode === "hourly-to-salary" 
                                ? formatCurrency(calculatedSalary * rate, currency) 
                                : `${formatCurrency(calculatedHourly * rate, currency)}/hr`
                            }
                        </div>
                        {isContractor && (
                            <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.75rem" }}>
                                W-2 Salary Equivalent: <strong style={{ color: "var(--text-primary)" }}>{formatCurrency(employeeEquivalentSalary * rate, currency)}</strong>
                            </div>
                        )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <h4 className="input-label" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>Equivalents Breakdown</h4>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Monthly Earnings</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: "bold" }}>{formatCurrency(monthlyEquivalent * rate, currency)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Weekly Earnings</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{formatCurrency(weeklyEquivalent * rate, currency)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Daily Earnings</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{formatCurrency(dailyEquivalent * rate, currency)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-secondary)" }}>Total Annual Billable Hours</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{formatNumber(totalWorkingHours)} hrs</span>
                        </div>
                    </div>

                    {isContractor && (
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--border-color)", fontSize: "0.875rem", lineHeight: 1.5 }}>
                            <span style={{ fontWeight: "bold", color: "var(--accent-primary)" }}>Contractor Insight:</span> Since you pay your own self-employment taxes, health benefits, and unbillable overhead, your actual buying power matches a W-2 salary that is approximately 30% lower than your raw contracting revenue.
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
}
