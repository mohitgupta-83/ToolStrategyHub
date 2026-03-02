"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function NewsletterGrowthCalculator() {
    const [traffic, setTraffic] = useState(10000); // monthly traffic
    const [optIn, setOptIn] = useState(3); // %
    const [churn, setChurn] = useState(1); // monthly expected churn %
    
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("newsletter-growth-calculator");
            tracked.current = true;
        }
    }, []);

    const newSubsPerMonth = Math.round(traffic * (optIn / 100));
    
    // Simulate 12 months with churn
    let subs = 0;
    for(let i=0; i<12; i++){
        subs += newSubsPerMonth;
        subs = subs * (1 - (churn / 100)); // apply churn
    }
    const year1 = Math.round(subs);

    const faqs = [
        { question: "Why is churn so important?", answer: "Without factoring in users who naturally unsubscribe, your growth curve will look infinitely linear. High friction opt-ins usually yield lower churn." }
    ];

    const seoContent = (
        <>
            <h2>The Mathematics of the Inbox</h2>
            <p>An owned audience is your single greatest asset. Calculate how conversion rate optimizations radically shift your end-of-year subscriber count.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/audience-growth-estimator">Audience Growth Estimator</Link></li>
                <li><Link href="/tools/creator-business-model-picker">Creator Business Model Picker</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Newsletter Growth Calculator" description="Model subscriber list velocity against expected churn parameters." slug="newsletter-growth-calculator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Unique Traffic</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{traffic.toLocaleString()}</span>
                        </label>
                        <input type="range" min="1000" max="1000000" step="1000" value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Opt-In Conversion Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{optIn}%</span>
                        </label>
                        <input type="range" min="0.1" max="15" step="0.1" value={optIn} onChange={(e) => setOptIn(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Monthly Churn Rate (%)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{churn}%</span>
                        </label>
                        <input type="range" min="0" max="10" step="0.1" value={churn} onChange={(e) => setChurn(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div>
                        <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>New Monthly Subs (Gross)</h3>
                        <div style={{ fontSize: "3rem", fontFamily: "var(--font-mono)", color: "var(--text-primary)", lineHeight: 1 }}>{newSubsPerMonth.toLocaleString()}</div>
                    </div>
                    
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)" }}>
                        <div style={{ fontSize: "0.875rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Projected Year 1 Net Subs</div>
                        <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: "var(--text-primary)", fontWeight: "bold", lineHeight: 1 }}>{year1.toLocaleString()}</div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>*Factoring in {churn}% monthly decay</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
