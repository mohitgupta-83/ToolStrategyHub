"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function ColdEmailRevenueCalculator() {
    const [monthlySent, setMonthlySent] = useState<number>(5000);
    const [openRate, setOpenRate] = useState<number>(40);
    const [replyRate, setReplyRate] = useState<number>(8);
    const [meetingRate, setMeetingRate] = useState<number>(30); // of replies
    const [closeRate, setCloseRate] = useState<number>(25); // of meetings
    const [avgDealValue, setAvgDealValue] = useState<number>(3000);
    const [campaignCost, setCampaignCost] = useState<number>(800);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("cold-email-revenue-calculator");
            tracked.current = true;
        }
    }, []);

    const handleCurrencyChange = (c: CurrencyCode) => {
        setCurrency(c);
        localStorage.setItem("tool_currency", c);
    };

    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;

    // Calculations
    const opens = monthlySent * (openRate / 100);
    const totalReplies = monthlySent * (replyRate / 100);
    const meetingsBooked = totalReplies * (meetingRate / 100);
    const dealsClosed = meetingsBooked * (closeRate / 100);
    const monthlyRevenue = dealsClosed * avgDealValue;
    const annualRevenue = monthlyRevenue * 12;

    const cac = dealsClosed > 0 ? campaignCost / dealsClosed : 0;
    const campaignRoi = campaignCost > 0 ? ((monthlyRevenue - campaignCost) / campaignCost) * 100 : 0;

    const resetValues = () => {
        setMonthlySent(5000);
        setOpenRate(40);
        setReplyRate(8);
        setMeetingRate(30);
        setCloseRate(25);
        setAvgDealValue(3000 / rate);
        setCampaignCost(800 / rate);
    };

    const faqs = [
        { question: "How does this differ from the email outreach calculator?", answer: "The email outreach calculator models campaign parameters at the email inbox level (domains, aliases, and daily limits). This calculator functions at the high campaign level, allowing you to estimate CAC, campaign ROI, and final closed sales by inputting total monthly volume." },
        { question: "What are good benchmarks for B2B cold email?", answer: "Healthy B2B benchmarks are: Open rate: 30% to 50%, Reply rate: 5% to 15%, Meeting rate of replies: 20% to 40%, Close rate: 20% to 35%. If your rates fall below these ranges, you likely have deliverability issues or a weak offer." },
        { question: "How do I calculate cold email CAC?", answer: "Your Customer Acquisition Cost (CAC) for cold email is calculated by dividing your total campaign expenses (list data, verification tools, email sender subscriptions, copywriter costs, domain renewals) by the number of closed deals during the campaign period." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Cold Email Revenue Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate total revenue potential, customer acquisition cost (CAC), and campaign ROI for B2B cold email outreach."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Model the ROI and CAC of Your B2B Cold Email Campaigns</h2>
            <p>Cold email is one of the most capital-efficient acquisition channels for B2B startups and service agencies. However, running outreach without a mathematical model of your funnel leads to wasted sales development budget. The <strong>Cold Email Revenue Calculator</strong> lets you project deals closed, total revenue generated, customer acquisition costs, and net return on spend.</p>
            <h3>Analyzing funnel Drop-offs to Lower CAC</h3>
            <p>Small optimizations at the top of your funnel yield massive compounding returns on revenue. For example, lifting your reply rate from 5% to 8% can cut your CAC by nearly 40%. Use this simulator to locate bottlenecks in your pipeline and focus copy optimization where it matters most.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/email-outreach-calculator">Email Outreach Calculator</Link></li>
                <li><Link href="/tools/cac-payback-calculator">CAC Payback Period Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <ToolLayout
            title="Cold Email Revenue Calculator"
            description="Estimate closed deals, total revenue, CAC, and ROI for your outbound cold email campaigns."
            slug="cold-email-revenue-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {/* Inputs card */}
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Campaign Inputs</h3>
                        <button onClick={resetValues} className="pill" style={{ cursor: "pointer", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                            Reset
                        </button>
                    </div>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label">Total Emails Sent / Month</label>
                        <input type="number" className="input-field" value={monthlySent} onChange={(e) => setMonthlySent(Number(e.target.value) || 0)} />
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Open Rate %</label>
                            <input type="number" className="input-field" value={openRate} onChange={(e) => setOpenRate(Number(e.target.value) || 0)} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Reply Rate %</label>
                            <input type="number" className="input-field" value={replyRate} onChange={(e) => setReplyRate(Number(e.target.value) || 0)} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Meeting Rate % (of replies)</label>
                            <input type="number" className="input-field" value={meetingRate} onChange={(e) => setMeetingRate(Number(e.target.value) || 0)} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Close Rate % (of meetings)</label>
                            <input type="number" className="input-field" value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value) || 0)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Average Deal Value / ACV ({symbol})</label>
                        <input type="number" className="input-field" value={avgDealValue ? Number((avgDealValue * rate).toFixed(0)) : 0} onChange={(e) => setAvgDealValue((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Monthly Campaign Cost (Software, Leads, Domains) ({symbol})</label>
                        <input type="number" className="input-field" value={campaignCost ? Number((campaignCost * rate).toFixed(0)) : 0} onChange={(e) => setCampaignCost((Number(e.target.value) || 0) / rate)} />
                    </div>
                </div>

                {/* Outputs card */}
                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Projected Monthly Revenue</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatCurrency(monthlyRevenue * rate, currency)}
                        </div>
                        <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                            Annualized: <strong>{formatCurrency(annualRevenue * rate, currency)}</strong>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Deals Closed / Month</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatNumber(dealsClosed)}
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Estimated CAC</div>
                            <div style={{ fontSize: "1.25rem", color: cac <= avgDealValue ? "var(--success-color, #22c55e)" : "var(--error-color, #ef4444)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {dealsClosed > 0 ? formatCurrency(cac * rate, currency) : "N/A"}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Campaign ROI</div>
                            <div style={{ fontSize: "1.25rem", color: campaignRoi >= 100 ? "var(--success-color, #22c55e)" : "#eab308", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {campaignRoi.toFixed(0)}%
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                            <div className="input-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>Meetings Booked</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                                {formatNumber(meetingsBooked)}
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: "1rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--border-color)" }}>
                        <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Conversion Funnel Yield</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>1. Total Opens</span>
                                <span>{formatNumber(opens)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>2. Total Replies</span>
                                <span>{formatNumber(totalReplies)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>3. Booked Meetings</span>
                                <span>{formatNumber(meetingsBooked)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>4. Deals Closed</span>
                                <span>{formatNumber(dealsClosed)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
