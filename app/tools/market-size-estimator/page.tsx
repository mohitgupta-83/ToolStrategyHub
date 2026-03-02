"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function MarketSizeEstimator() {
    const [customers, setCustomers] = useState(100000);
    const [price, setPrice] = useState(120);
    const [samPercent, setSamPercent] = useState(30);
    const [somPercent, setSomPercent] = useState(5);
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("market-size-estimator");
            tracked.current = true;
        }
    }, []);

    const tam = customers * price;
    const sam = tam * (samPercent / 100);
    const som = sam * (somPercent / 100);

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 });

    const faqs = [
        { question: "What is TAM SAM SOM?", answer: "TAM is Total Addressable Market. SAM is the Serviceable Available Market (your geographic or segmented reach). SOM is Serviceable Obtainable Market (the realistic portion you can capture in the near term)." }
    ];

    const seoContent = (
        <>
            <h2>Calculating TAM Properly</h2>
            <p>TAM is often inflated in pitch decks. Calculating realistic SAM and SOM is vital for accurate financial forecasting.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validator</Link></li>
                <li><Link href="/tools/problem-severity-calculator">Problem Severity Calculator</Link></li>
                <li><Link href="/tools/audience-persona-builder">Audience Persona Builder</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Market Size Estimator" description="Calculate TAM, SAM, and SOM rapidly for your investor pitch deck." slug="market-size-estimator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Total Potential Customers</label>
                        <input type="number" value={customers} onChange={(e) => setCustomers(Number(e.target.value))} style={{ width: "100%", padding: "0.5rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Average Revenue per User (Annual)</label>
                        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} style={{ width: "100%", padding: "0.5rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>SAM % (Serviceable Region)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{samPercent}%</span>
                        </label>
                        <input type="range" min="1" max="100" value={samPercent} onChange={(e) => setSamPercent(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>SOM % (Realistic Capture)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{somPercent}%</span>
                        </label>
                        <input type="range" min="1" max="100" value={somPercent} onChange={(e) => setSomPercent(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>TAM (Total Addressable Market)</div>
                        <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{formatter.format(tam)}</div>
                    </div>
                    <div>
                        <div className="input-label" style={{ marginBottom: "0.5rem" }}>SAM (Serviceable Available Market)</div>
                        <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{formatter.format(sam)}</div>
                    </div>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>SOM (Serviceable Obtainable Market)</div>
                        <div style={{ fontSize: "3rem", color: "var(--accent-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>{formatter.format(som)}</div>
                        <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                            This represents the realistic near-term revenue potential your startup can capture with its current resources.
                        </p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
