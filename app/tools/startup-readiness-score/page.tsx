"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function StartupReadinessScore() {
    const [clarity, setClarity] = useState(50);
    const [validation, setValidation] = useState(50);
    const [mvp, setMvp] = useState(50);
    const [team, setTeam] = useState(50);
    const [runway, setRunway] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("startup-readiness-score");
            tracked.current = true;
        }
    }, []);

    const score = Math.round((clarity * 0.15) + (validation * 0.3) + (mvp * 0.25) + (team * 0.15) + (runway * 0.15));

    let status = "Idea Stage - Keep validating.";
    if (score > 80) status = "Growth Stage - Pour gasoline on the fire. You are ready.";
    else if (score > 50) status = "MVP Stage - Focus on securing early beta testers and iterating.";
    else if (score > 30) status = "Pre-Launch - Build the minimum viable product.";

    const faqs = [
        { question: "Why is validation weighted so heavily?", answer: "A brilliant team with 5 years of runway building a product nobody wants will still fail. Validation is the only multiplier that matters." }
    ];

    const seoContent = (
        <>
            <h2>Premature Scaling will kill you</h2>
            <p>Scaling a startup before you have achieved Product-Market Fit is the leading cause of founder burnout and capital destruction.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/research-discovery">Research & Discovery Hub</Link></li>
                <li><Link href="/tools/launch-timing-analyzer">Launch Timing Analyzer</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Startup Readiness Score" description="Calculate if you are fundamentally ready to pour capital into growth." slug="startup-readiness-score" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Problem Clarity (Pinpointed Need)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{clarity}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={clarity} onChange={(e) => setClarity(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Market Validation (Pre-sales/Signups)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{validation}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={validation} onChange={(e) => setValidation(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>MVP Functionality (Working Logic)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{mvp}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={mvp} onChange={(e) => setMvp(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Team Capabilities / Velocity</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{team}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={team} onChange={(e) => setTeam(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Financial Runway / Survival Time</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{runway}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={runway} onChange={(e) => setRunway(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Overall Readiness</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    
                    <div style={{ marginTop: "2rem", width: "100%", padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "1.125rem", color: "var(--text-primary)", fontWeight: "bold" }}>{status}</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
