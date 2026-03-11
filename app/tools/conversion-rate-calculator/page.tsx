"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ConversionRateCalculator() {
    const [visitors, setVisitors] = useState<number>(10000);
    const [conversions, setConversions] = useState<number>(250);

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("conversion-rate-calculator");
            tracked.current = true;
        }
    }, []);

    const conversionRate = visitors > 0 ? (conversions / visitors) * 100 : 0;

    const resetValues = () => {
        setVisitors(10000);
        setConversions(250);
    };

    const faqs = [
        { question: "How to calculate conversion rate?", answer: "Divide the total number of conversions by the total number of visitors, then multiply by 100 to get a percentage." },
        { question: "What is a conversion?", answer: "A conversion is any desired action: a purchase, an email signup, or a meeting booked." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Conversion Rate Calculator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Calculate conversion rate based on visitors and goals achieved."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>Understanding Conversion Rate</h2>
            <p>Your conversion rate shows how well your page turns visitors into active users or buyers.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/marketing-roi-calculator">Marketing ROI Calculator</Link></li>
            </ul>
        </>
    );

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(num);
    };

    return (
        <ToolLayout
            title="Conversion Rate Calculator"
            description="Calculate conversion rate based on visitors and goals achieved."
            slug="conversion-rate-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Inputs</h3>
                        <button onClick={resetValues} className="pill" style={{ cursor: "pointer", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                            Reset
                        </button>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Total Visitors</label>
                        <input type="number" className="input-field" value={visitors} onChange={(e) => setVisitors(Number(e.target.value) || 0)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Total Conversions</label>
                        <input type="number" className="input-field" value={conversions} onChange={(e) => setConversions(Number(e.target.value) || 0)} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)", textAlign: "center" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Conversion Rate</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold", lineHeight: 1 }}>
                            {formatNumber(conversionRate)}%
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
