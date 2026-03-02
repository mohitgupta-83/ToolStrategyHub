"use client";

import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { trackUsage } from "@/lib/tracker";
import { calculateConstructionEstimate, ConstructionParams, ConstructionResult } from "@/lib/constructionEstimator";

export default function ConstructionCostEstimator() {
    const [params, setParams] = useState<ConstructionParams>({
        materialCost: 5000,
        wasteFactor: 15,
        laborHours: 80,
        laborRate: 45,
        equipmentCost: 800,
        markup: 20,
        riskBuffer: 10
    });

    const [result, setResult] = useState<ConstructionResult | null>(null);

    useEffect(() => {
        setResult(calculateConstructionEstimate(params));
    }, [params]);

    const tracked = useRef(false);

    const updateParam = (key: keyof ConstructionParams, value: number) => {
        if (!tracked.current) {
            trackUsage("construction-cost-estimator");
            tracked.current = true;
        }
        setParams(prev => ({ ...prev, [key]: value || 0 }));
    };

    const handlePrint = () => {
        window.print();
    };

    const faqs = [
        {
            question: "Why add a waste factor to materials?",
            answer: "Materials are rarely used with 100% efficiency. Cuts, drops, defects, and mistakes happen. Adding a 10-20% waste factor ensures you aren't paying out of pocket for inevitabilities."
        },
        {
            question: "What is the difference between markup and risk buffer?",
            answer: "Markup is for overhead and pure company profit. Risk buffer is a contingency fund for this specific job (e.g., discovering rot behind a wall). If the risk buffer goes unused, it's bonus profit."
        }
    ];

    const seoContent = (
        <>
            <h2>Accurate Job Costing for General Contractors</h2>
            <p>Estimating construction jobs accurately is the difference between outlasting the competition and bankruptcy. The biggest mistake new contractors make is forgetting to bill for &apos;soft costs&apos; like driving time, planning, and inevitable project risks.</p>
            <h3>Protecting Your Margin</h3>
            <p>By explicitly separating hard costs (materials and labor) from your risk buffer and markup, you can confidently lower your price if a client pushes back without accidentally eating into your operational costs.</p>
        </>
    );

    return (
        <ToolLayout
            title="Construction Cost Estimator"
            description="Calculate job costs including material waste, labor, equipment, markup, and explicitly budgeted risk buffers to protect your margin."
            slug="construction-cost-estimator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>

                {/* Controls */}
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} id="calculator-controls">

                    <div className="input-group">
                        <label className="input-label">Base Material Cost ($)</label>
                        <input type="number" className="input-field" value={params.materialCost} onChange={(e) => updateParam("materialCost", parseInt(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Material Waste Factor</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{params.wasteFactor}%</span>
                        </div>
                        <input type="range" min="0" max="50" step="1" value={params.wasteFactor} onChange={(e) => updateParam("wasteFactor", parseInt(e.target.value))} />
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Labor Hours</label>
                            <input type="number" className="input-field" value={params.laborHours} onChange={(e) => updateParam("laborHours", parseInt(e.target.value))} />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Rate / Hour ($)</label>
                            <input type="number" className="input-field" value={params.laborRate} onChange={(e) => updateParam("laborRate", parseInt(e.target.value))} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Equipment Rentals / Permits ($)</label>
                        <input type="number" className="input-field" value={params.equipmentCost} onChange={(e) => updateParam("equipmentCost", parseInt(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Profit & Overhead Markup</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{params.markup}%</span>
                        </div>
                        <input type="range" min="0" max="100" step="1" value={params.markup} onChange={(e) => updateParam("markup", parseInt(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <label className="input-label">Risk Buffer (Contingency)</label>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{params.riskBuffer}%</span>
                        </div>
                        <input type="range" min="0" max="50" step="1" value={params.riskBuffer} onChange={(e) => updateParam("riskBuffer", parseInt(e.target.value))} />
                    </div>

                </div>

                {/* Results */}
                {result && (
                    <div className="stagger-2" id="printable-summary">
                        <div className="card" style={{ backgroundColor: "var(--bg-tertiary)", borderColor: "var(--accent-primary)" }}>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                                <h3 style={{ fontSize: "1.25rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    Estimate Summary
                                </h3>
                                <button className="btn btn-secondary" onClick={handlePrint} style={{ padding: "0.5rem 1rem", fontSize: "0.75rem" }}>
                                    Print / PDF
                                </button>
                            </div>

                            <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: "var(--accent-primary)", lineHeight: 1, marginBottom: "2rem" }}>
                                ${result.grandTotal.toLocaleString()}
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>Materials (w/ Waste)</span>
                                    <span>${result.totalMaterials.toLocaleString()}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>Labor</span>
                                    <span>${result.totalLabor.toLocaleString()}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--border-color)", paddingBottom: "0.5rem" }}>
                                    <span style={{ color: "var(--text-secondary)" }}>Equipment / Fees</span>
                                    <span>${result.totalEquipment.toLocaleString()}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginTop: "0.5rem" }}>
                                    <span style={{ color: "var(--text-primary)", fontWeight: "bold" }}>Hard Costs Subtotal</span>
                                    <span style={{ fontWeight: "bold" }}>${result.subtotal.toLocaleString()}</span>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--border-focus)", marginTop: "1rem" }}>
                                    <span>Overhead & Profit Markup</span>
                                    <span>+ ${result.markupAmount.toLocaleString()}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--border-focus)" }}>
                                    <span>Risk Contingency {params.riskBuffer}%</span>
                                    <span>+ ${result.riskAmount.toLocaleString()}</span>
                                </div>

                                <div style={{ padding: "1rem", backgroundColor: "rgba(204, 255, 0, 0.05)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-muted)", marginTop: "1.5rem" }}>
                                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Projected Profit Base</div>
                                    <div style={{ fontSize: "1.5rem", color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>
                                        ${result.profitProjection.toLocaleString()}
                                    </div>
                                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                                        Does not include unspent risk buffer.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <style dangerouslySetInnerHTML={{
                            __html: `
              @media print {
                body { background: white !important; color: black !important; }
                #calculator-controls, header, footer, .seo-content, .btn-secondary { display: none !important; }
                .card { border: 1px solid #ccc !important; background: white !important; box-shadow: none !important; }
                .bg-gradient { display: none !important; }
              }
            `}} />
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
