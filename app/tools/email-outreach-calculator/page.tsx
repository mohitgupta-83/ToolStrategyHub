"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

export default function EmailOutreachCalculator() {
    const [domains, setDomains] = useState<number>(3);
    const [emailsPerDomain, setEmailsPerDomain] = useState<number>(3);
    const [emailsPerInboxPerDay, setEmailsPerInboxPerDay] = useState<number>(25);
    const [workingDays, setWorkingDays] = useState<number>(30);
    const [openRate, setOpenRate] = useState<number>(45);
    const [replyRate, setReplyRate] = useState<number>(20);
    const [positiveReplyRate, setPositiveReplyRate] = useState<number>(50);
    const [meetingBookedRate, setMeetingBookedRate] = useState<number>(50);
    const [showUpRate, setShowUpRate] = useState<number>(70);
    const [closeRate, setCloseRate] = useState<number>(50);
    const [dealValue, setDealValue] = useState<number>(1000);

    const [currency, setCurrency] = useState<CurrencyCode>("USD");
    const tracked = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("tool_currency") as CurrencyCode;
        if (saved && CURRENCY_RATES[saved]) {
            setCurrency(saved);
        }
        if (!tracked.current) {
            trackUsage("email-outreach-calculator");
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
    const inboxes = domains * emailsPerDomain;
    const totalEmailsSentPerDay = inboxes * emailsPerInboxPerDay;
    const totalEmailsSent = totalEmailsSentPerDay * workingDays;

    const opened = totalEmailsSent * (openRate / 100);
    const replies = totalEmailsSent * (replyRate / 100);
    const positiveReplies = replies * (positiveReplyRate / 100);
    const meetingsBooked = positiveReplies * (meetingBookedRate / 100);
    const meetingsShown = meetingsBooked * (showUpRate / 100);
    const dealsClosed = meetingsShown * (closeRate / 100);
    const revenue = dealsClosed * dealValue;

    const resetValues = () => {
        setDomains(3);
        setEmailsPerDomain(3);
        setEmailsPerInboxPerDay(25);
        setWorkingDays(30);
        setOpenRate(45);
        setReplyRate(20);
        setPositiveReplyRate(50);
        setMeetingBookedRate(50);
        setShowUpRate(70);
        setCloseRate(50);
        setDealValue(1000 / rate); // Maintain base conversion baseline
    };

    const faqs = [
        { question: "How does cold email outreach work?", answer: "Cold email outreach involves sending targeted emails to prospects who haven't previously interacted with your brand. By scaling across multiple domains and sending personalized daily limits, you can generate consistent B2B leads." },
        { question: "How do I estimate cold email ROI?", answer: "Estimate ROI by calculating the cost of your domains, inbox licenses, and lead data against your final closed revenue. The key is knowing your historical conversion rates at every stage of the funnel." },
        { question: "What reply rates are typical?", answer: "A healthy cold email campaign sees reply rates between 5% and 15%. Anything above 20% means you have exceptionally targeted data and a compelling offer. If your reply rate is under 2%, you have a deliverability or targeting problem." },
        { question: "How can I improve my email conversion rates?", answer: "Improve deliverability by warming up domains, verifying email lists, and avoiding spam words. Improve reply rates by writing shorter, highly personalized emails focused entirely on a specific pain point rather than a feature pitch." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Email Outreach Revenue Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Estimate revenue from cold email outreach campaigns. Calculate reply rates, meetings, and closed deals instantly."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Cold Email Revenue Calculator</h2>
            <p>Predicting the return on investment (ROI) for B2B outbound campaigns requires modeling every stage of your sales funnel. The <strong>Email Outreach Revenue Calculator</strong> allows sales teams and agency founders to input their domain architecture constraints to forecast exact revenue potential.</p>

            <h3>How Cold Email Outreach Works</h3>
            <p>Modern cold outreach relies on robust infrastructure. Instead of sending 1,000 emails from a single address and getting flagged as spam, businesses now utilize a multi-domain strategy. By purchasing secondary domains and creating multiple inbox aliases, you distribute the send volume safely. Connecting this infrastructure to an automated sending tool ensures you stay under the radar of Google and Microsoft spam filters while maintaining high deliverability.</p>

            <h3>How to Estimate Cold Email ROI</h3>
            <p>Estimating ROI is simply a mathematical function of your conversion rates. You start with the top of the funnel (Total Delivered) and apply your historical drop-offs. If your reply rate is strong but your positive reply rate is weak, your offer is polarizing. If your meetings booked rate is high but your show-up rate is low, your calendar reminders or perceived value is broken. Use this calculator to isolate which variable in your funnel delivers the highest marginal return.</p>

            <h3>What Reply Rates Are Typical?</h3>
            <p>A typical B2B outbound campaign yields a 5% to 15% reply rate. Within those replies, generally, 10-20% are positive or interested. This means out of 1,000 emails sent, you might receive 100 replies, yielding 10-20 potential meeting opportunities. Top-tier campaigns generated through extreme personalization or intent-based signaling can push reply rates over 30%.</p>

            <h3>How to Improve Email Conversion Rates</h3>
            <p>Conversion rates improve exclusively through relevance and brevity. Ensure your lead data is highly segmented. A message to a CEO must focus on strategic risk or enterprise value, whereas a message to a manager must focus on operational efficiency. Keep messages under 75 words, remove all formatting, and ask a single, low-friction question.</p>

            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/guides/cold-email-outreach-strategy">Cold Email Outreach Strategy</Link></li>
                <li><Link href="/guides/improve-email-reply-rates">How to Improve Email Reply Rates</Link></li>
                <li><Link href="/tools/freelance-rate-calculator">Freelance Rate Calculator</Link></li>
                <li><Link href="/tools/workflow-cost-calculator">Workflow Cost Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <ToolLayout
            title="Cold Email Revenue Calculator"
            description="Estimate revenue from cold email outreach campaigns. Calculate reply rates, meetings, and closed deals instantly."
            slug="email-outreach-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {/* Inputs Section */}
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Funnel Inputs</h3>
                        <button onClick={resetValues} className="pill" style={{ cursor: "pointer", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                            Reset Defaults
                        </button>
                    </div>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Domains</span>
                                <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{domains}</span>
                            </label>
                            <input type="range" min="1" max="50" step="1" value={domains} onChange={(e) => setDomains(Number(e.target.value))} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Emails / domain</span>
                                <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{emailsPerDomain}</span>
                            </label>
                            <input type="range" min="1" max="10" step="1" value={emailsPerDomain} onChange={(e) => setEmailsPerDomain(Number(e.target.value))} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Emails / inbox / day</span>
                                <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{emailsPerInboxPerDay}</span>
                            </label>
                            <input type="range" min="1" max="100" step="1" value={emailsPerInboxPerDay} onChange={(e) => setEmailsPerInboxPerDay(Number(e.target.value))} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Working days</span>
                                <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{workingDays}</span>
                            </label>
                            <input type="range" min="1" max="365" step="1" value={workingDays} onChange={(e) => setWorkingDays(Number(e.target.value))} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Open Rate %</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{openRate}%</span>
                        </label>
                        <input type="range" min="0" max="100" step="1" value={openRate} onChange={(e) => setOpenRate(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Reply rate %</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{replyRate}%</span>
                        </label>
                        <input type="range" min="0" max="100" step="1" value={replyRate} onChange={(e) => setReplyRate(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Positive reply rate %</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{positiveReplyRate}%</span>
                        </label>
                        <input type="range" min="0" max="100" step="1" value={positiveReplyRate} onChange={(e) => setPositiveReplyRate(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Meeting booked rate %</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{meetingBookedRate}%</span>
                        </label>
                        <input type="range" min="0" max="100" step="1" value={meetingBookedRate} onChange={(e) => setMeetingBookedRate(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Show up rate %</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{showUpRate}%</span>
                        </label>
                        <input type="range" min="0" max="100" step="1" value={showUpRate} onChange={(e) => setShowUpRate(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Close rate %</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{closeRate}%</span>
                        </label>
                        <input type="range" min="0" max="100" step="1" value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Deal Value ({symbol})</label>
                        <input type="number" className="input-field" value={dealValue ? Number((dealValue * rate).toFixed(2)) : 0} onChange={(e) => setDealValue((Number(e.target.value) || 0) / rate)} />
                    </div>

                </div>

                {/* Outputs & Funnel Section */}
                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Estimated Revenue Potential</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatCurrency(revenue * rate, currency)}
                        </div>
                        <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                            from {formatNumber(dealsClosed)} closed deals
                        </div>
                    </div>

                    {/* Visual Funnel Graph */}
                    <div style={{ background: "var(--bg-secondary)", border: "1px dashed var(--border-color)", borderRadius: "var(--radius-sm)", padding: "1.5rem", marginTop: "1rem" }}>
                        <h3 className="input-label" style={{ marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Outreach Funnel</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>

                            {/* Funnel Stage Component Generator */}
                            {[
                                { label: "Delivered", value: totalEmailsSent, percent: 100, color: "var(--text-secondary)" },
                                { label: "Opened", value: opened, percent: openRate, color: "var(--text-secondary)" },
                                { label: "Replied", value: replies, percent: replyRate, color: "var(--accent-muted)" },
                                { label: "Positive", value: positiveReplies, percent: positiveReplyRate, color: "var(--accent-muted)" },
                                { label: "Booked", value: meetingsBooked, percent: meetingBookedRate, color: "var(--accent-primary)" },
                                { label: "Shown up", value: meetingsShown, percent: showUpRate, color: "var(--accent-primary)" },
                                { label: "Closed", value: dealsClosed, percent: closeRate, color: "var(--success-color, #22c55e)" },
                            ].map((stage, i) => (
                                <div key={stage.label} style={{ display: "flex", flexDirection: "column" }}>

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
                                        <div style={{
                                            width: `${Math.max(10, stage.percent)}%`,
                                            background: stage.color,
                                            opacity: 0.15,
                                            height: "100%",
                                            position: "absolute",
                                            left: 0,
                                            borderRadius: "var(--radius-sm)",
                                            transition: "width 0.3s ease"
                                        }}></div>
                                        <div style={{ padding: "0.5rem 0.75rem", display: "flex", alignItems: "center", gap: "0.75rem", zIndex: 1 }}>
                                            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", width: "20px" }}>{i + 1}.</span>
                                            <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>{stage.label}</span>
                                        </div>
                                        <div style={{ padding: "0.5rem 0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-primary)", zIndex: 1, fontWeight: "bold" }}>
                                            {formatNumber(stage.value)}
                                        </div>
                                    </div>

                                    {i < 6 && (
                                        <div style={{ paddingLeft: "3rem", display: "flex", alignItems: "center", gap: "0.5rem", margin: "0.2rem 0" }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--border-focus)" }}>
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                                                convert {i === 0 ? openRate : stage.percent}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>

                    <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Total Inboxes</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontSize: "0.875rem" }}>{inboxes}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
                            <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Total Sent per Day</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontSize: "0.875rem" }}>{formatNumber(totalEmailsSentPerDay)}</span>
                        </div>
                    </div>

                </div>
            </div>
        </ToolLayout>
    );
}
