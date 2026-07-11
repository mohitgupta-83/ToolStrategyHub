"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function OutreachFunnelCalculator() {
    const [revenueTarget, setRevenueTarget] = useState<number>(15000);
    const [dealValue, setDealValue] = useState<number>(3000);
    const [meetingToClose, setMeetingToClose] = useState<number>(25);
    const [replyToMeeting, setReplyToMeeting] = useState<number>(40);
    const [replyRate, setReplyRate] = useState<number>(8);
    const [workingDays, setWorkingDays] = useState<number>(22);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("outreach-funnel-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    // Calculation Logic (Working backwards)
    const newClientsNeeded = dealValue > 0 ? Math.ceil(revenueTarget / dealValue) : 0;
    
    // Meetings needed
    const meetingsNeeded = meetingToClose > 0 ? Math.ceil(newClientsNeeded / (meetingToClose / 100)) : 0;
    
    // Replies needed
    const repliesNeeded = replyToMeeting > 0 ? Math.ceil(meetingsNeeded / (replyToMeeting / 100)) : 0;
    
    // Total emails to send
    const emailsNeeded = replyRate > 0 ? Math.ceil(repliesNeeded / (replyRate / 100)) : 0;
    
    // Daily emails to send
    const dailyEmails = workingDays > 0 ? Math.ceil(emailsNeeded / workingDays) : 0;

    const resetValues = () => {
        setRevenueTarget(15000 / rate);
        setDealValue(3000 / rate);
        setMeetingToClose(25);
        setReplyToMeeting(40);
        setReplyRate(8);
        setWorkingDays(22);
    };

    const faqs = [
        { question: "Why should I calculate outreach volume backwards?", answer: "Most sales teams send a random volume of emails and hope they hit their goals. Working backwards from your revenue target ensures you know exactly how many leads you need to scrape, compile, and message daily to hit your targets deterministically." },
        { question: "What is a standard reply-to-meeting conversion rate?", answer: "For cold email, a reply-to-meeting booking rate of 30% to 50% is standard. If you get high reply rates but fail to book meetings, it means your initial hook is interesting but your call to action is too high-friction or irrelevant." },
        { question: "How do I calculate monthly working days?", answer: "A standard month contains 20 to 22 business days, excluding weekends. We use 22 working days as the default baseline for calculating daily outreach send volume requirements." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Outreach Funnel Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Reverse-engineer your cold outreach campaign volumes. Calculate emails, replies, and meetings needed to hit your monthly revenue target."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Reverse-Engineer Your Sales Funnel Activity Target</h2>
            <p>Hitting B2B revenue milestones is not a matter of luck; it is a math problem. When you understand your pipeline conversions, sales velocity becomes predictable. The <strong>Outreach Funnel Calculator</strong> allows agency owners and outbound sales teams to input their monthly target revenue and convert it into a daily sending limit.</p>
            <h3>Locating Funnel Bottlenecks to Maximize Revenue</h3>
            <p>If you need to double your monthly closed revenue, you do not necessarily need to double your outreach volume. Improving your meeting-to-close rate from 20% to 30% or refining your lead list to lift reply rates reduces the daily outbound capacity required. Use this simulator to locate the highest-leverage conversion metrics in your sales pipeline.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/cold-email-revenue-calculator">Cold Email Revenue Calculator</Link></li>
                <li><Link href="/tools/email-outreach-calculator">Email Outreach Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(num);
    };

    return (
        <ToolLayout
            title="Outreach Funnel Calculator"
            description="Calculate the exact outreach volume needed to hit your revenue target by working backwards through conversions."
            slug="outreach-funnel-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {/* Inputs card */}
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Model Targets</h3>
                        <button onClick={resetValues} className="pill" style={{ cursor: "pointer", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                            Reset
                        </button>
                    </div>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label">New Revenue Target / Month ({symbol})</label>
                        <input type="number" className="input-field" value={revenueTarget ? Number((revenueTarget * rate).toFixed(0)) : 0} onChange={(e) => setRevenueTarget((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Average Contract Value / Deal Size ({symbol})</label>
                        <input type="number" className="input-field" value={dealValue ? Number((dealValue * rate).toFixed(0)) : 0} onChange={(e) => setDealValue((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Meeting-to-Close %</label>
                            <input type="number" className="input-field" value={meetingToClose} onChange={(e) => setMeetingToClose(Number(e.target.value) || 0)} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Reply-to-Meeting %</label>
                            <input type="number" className="input-field" value={replyToMeeting} onChange={(e) => setReplyToMeeting(Number(e.target.value) || 0)} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Campaign Reply Rate %</label>
                            <input type="number" className="input-field" value={replyRate} onChange={(e) => setReplyRate(Number(e.target.value) || 0)} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Working Days / Month</label>
                            <input type="number" className="input-field" value={workingDays} onChange={(e) => setWorkingDays(Number(e.target.value) || 0)} />
                        </div>
                    </div>
                </div>

                {/* Outputs card */}
                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Daily Sending Volume Required</div>
                        <div style={{ fontSize: "3.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatNumber(dailyEmails)}
                        </div>
                        <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                            emails per business day (for {workingDays} days)
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", borderTop: "1px dashed var(--border-color)", paddingTop: "1.5rem" }}>
                        <h4 className="input-label" style={{ marginBottom: "0.5rem" }}>Outreach Targets Funnel</h4>
                        
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>1. New Clients Needed</span>
                            <strong style={{ color: "var(--text-primary)" }}>{newClientsNeeded}</strong>
                        </div>
                        
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>2. Meetings Needed</span>
                            <strong style={{ color: "var(--text-primary)" }}>{meetingsNeeded}</strong>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                            <span style={{ color: "var(--text-secondary)" }}>3. Positive Replies Needed</span>
                            <strong style={{ color: "var(--text-primary)" }}>{repliesNeeded}</strong>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "var(--text-secondary)" }}>4. Total Monthly Sends</span>
                            <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{formatNumber(emailsNeeded)}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
