/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import CurrencySelector from "@/components/CurrencySelector";
import { CurrencyCode, CURRENCY_RATES, formatCurrency } from "@/lib/currencyRates";

interface PricingResult {
    breakevenUsers: number;
    basePriceFloor: number;
    targetPrice: number;
    projectedRevenue: number;
    grossMargin: number;
    pricingTiers: {
        starter: number;
        pro: number;
        enterprise: number;
    }
}

export default function SaaSPricingCalculator() {
    const [fixedMonthlyCosts, setFixedMonthlyCosts] = useState(1500);
    const [variableCostPerUser, setVariableCostPerUser] = useState(2.50);
    const [targetProfitMargin, setTargetProfitMargin] = useState(70);
    const [expectedUsers, setExpectedUsers] = useState(500);

    const [result, setResult] = useState<PricingResult | null>(null);
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
        // Calculate the absolute minimum price per user to break even at current scale
        const totalCostsToBreakEven = fixedMonthlyCosts + (variableCostPerUser * expectedUsers);
        const basePriceFloor = expectedUsers > 0 ? totalCostsToBreakEven / expectedUsers : 0;

        // Calculate price needed to hit the target margin
        // Margin = (Revenue - COGS) / Revenue. So Revenue = COGS / (1 - Margin)
        // Note: targetProfitMargin is a percentage 0-99
        let safeMargin = targetProfitMargin >= 100 ? 99 : targetProfitMargin;
        safeMargin = safeMargin / 100;

        let targetPrice = basePriceFloor;
        if (safeMargin < 1) {
            targetPrice = variableCostPerUser / (1 - safeMargin);
            if (targetPrice < basePriceFloor * 1.5) {
                targetPrice = basePriceFloor * (1 / (1 - safeMargin));
            }
        }

        // Breakeven users at target price
        const profitPerUser = targetPrice - variableCostPerUser;
        const breakevenUsers = profitPerUser > 0 ? Math.ceil(fixedMonthlyCosts / profitPerUser) : 0;

        const projectedRevenue = expectedUsers * targetPrice;
        const totalCosts = fixedMonthlyCosts + (variableCostPerUser * expectedUsers);
        const grossMargin = projectedRevenue > 0 ? ((projectedRevenue - totalCosts) / projectedRevenue) * 100 : 0;

        const pricingTiers = {
            starter: Math.round(targetPrice * 0.5),
            pro: Math.round(targetPrice),
            enterprise: Math.round(targetPrice * 3)
        };

        setResult({ breakevenUsers, basePriceFloor, targetPrice, projectedRevenue, grossMargin, pricingTiers });

        if (!tracked.current) {
            trackUsage("saas-pricing-calculator");
            tracked.current = true;
        }
    }, [fixedMonthlyCosts, variableCostPerUser, targetProfitMargin, expectedUsers]);

    const faqs = [
        {
            question: "What shouldn&apos;t be included in fixed costs?",
            answer: "Fixed costs should be the absolute floor required to keep servers on (hosting base fees, domain, core required APIs). Do not include your own salary or optional marketing software here; those are operating expenses (OPEX), not COGS."
        },
        {
            question: "Why does the Pro tier match the Target Price?",
            answer: "We structure SaaS pricing so that the &apos;middle&apos; tier carries the financial weight of the business goals. The Starter tier is a low-friction acquisition channel (loss leader or low margin), while the Enterprise tier capitalizes on high willingness to pay."
        }
    ];

    const seoContent = (
        <>
            <h2>The Margin Crisis in SaaS Software</h2>
            <p>If you arbitrarily choose $9/month because &apos;Spotify costs ten dollars,&apos; but you have to pay $2 in LLM token usage per user query, scaling your business will bankrupt you. Software unit economics demand rigorous analysis.</p>
            <h3>Pricing for Expansion</h3>
            <p>Your subscription price must mathematically absorb your fixed server costs while leaving enough gross margin to weather churn and pay for customer acquisition (CAC). You cannot scale a B2B SaaS tool operating below a 70% gross software margin.</p>
            <h3>Related Tools & Resources</h3>
            <ul>
                <li><Link href="/ai-tools">AI Developer Ecosystem</Link></li>
                <li><Link href="/ai-tools/llm-apis">Free LLM APIs Directory</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout
            title="SaaS Pricing Calculator for B2B Startups"
            description="Engineer profitable pricing tiers. Calculate fixed infrastructure costs against variable per-user LLM taxes to find your absolute breakeven floor."
            slug="saas-pricing-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <CurrencySelector currency={currency} onChange={handleCurrencyChange} />

                    <div className="input-group">
                        <label className="input-label">Fixed Monthly Base Costs ({symbol})</label>
                        <input type="number" step="50" className="input-field" value={fixedMonthlyCosts ? Number((fixedMonthlyCosts * rate).toFixed(2)) : 0} onChange={(e) => setFixedMonthlyCosts((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Variable Cost Per User/Month ({symbol}) (Cloud/LLM APIs)</label>
                        <input type="number" step="0.5" className="input-field" value={variableCostPerUser ? Number((variableCostPerUser * rate).toFixed(2)) : 0} onChange={(e) => setVariableCostPerUser((Number(e.target.value) || 0) / rate)} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Expected MRR User Base</label>
                        <input type="number" step="10" className="input-field" value={expectedUsers} onChange={(e) => setExpectedUsers(Number(e.target.value) || 0)} />
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Target Gross Margin %</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{targetProfitMargin}%</span>
                        </div>
                        <input type="range" min="30" max="95" value={targetProfitMargin} onChange={(e) => setTargetProfitMargin(Number(e.target.value) || 0)} />
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", textAlign: "right" }}>80%+ Recommended for Software</div>
                    </div>

                </div>

                {result && (
                    <div className="stagger-2">
                        <div className="card" style={{ borderColor: result.grossMargin >= targetProfitMargin - 5 ? "var(--border-focus)" : "var(--error-color)" }}>

                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px dashed var(--border-color)" }}>
                                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Required Price Per User (Target)</div>
                                <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: "var(--accent-primary)", lineHeight: 1, margin: "1rem 0" }}>
                                    {formatCurrency(result.targetPrice * rate, currency)}
                                </div>
                                <div className="pill" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                                    Breakeven Floor: {formatCurrency(result.basePriceFloor * rate, currency)}
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", textAlign: "center", marginBottom: "2rem", backgroundColor: "var(--bg-tertiary)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>Starter</div>
                                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem" }}>{formatCurrency(result.pricingTiers.starter * rate, currency)}</div>
                                </div>
                                <div style={{ borderLeft: "1px solid var(--border-color)", borderRight: "1px solid var(--border-color)" }}>
                                    <div style={{ fontSize: "0.75rem", color: "var(--accent-primary)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>Pro (Target)</div>
                                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.5rem", color: "var(--accent-primary)" }}>{formatCurrency(result.pricingTiers.pro * rate, currency)}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>Enterprise</div>
                                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem" }}>{formatCurrency(result.pricingTiers.enterprise * rate, currency)}</div>
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px dashed var(--border-color)" }}>
                                <span className="input-label">Projected Monthly Revenue</span>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem" }}>{formatCurrency(result.projectedRevenue * rate, currency)}</span>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                <span className="input-label">Users Required to Break Even</span>
                                <span style={{ color: "var(--text-secondary)" }}>{result.breakevenUsers} subscribers</span>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span className="input-label">Estimated Gross Margin</span>
                                <span className="pill" style={{ margin: 0, backgroundColor: result.grossMargin >= targetProfitMargin - 5 ? "var(--bg-secondary)" : "rgba(255, 50, 50, 0.1)", color: result.grossMargin >= targetProfitMargin - 5 ? "var(--accent-primary)" : "var(--error-color)" }}>
                                    {Math.round(result.grossMargin)}%
                                </span>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
