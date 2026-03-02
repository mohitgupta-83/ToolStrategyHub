"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function ViralPotentialScore() {
    const [hook, setHook] = useState(50);
    const [trend, setTrend] = useState(50);
    const [emotion, setEmotion] = useState(50);
    const [shareability, setShareability] = useState(50);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("viral-potential-score");
            tracked.current = true;
        }
    }, []);

    // 40% hook, 20% trend, 20% emotion, 20% shareability
    const score = Math.round((hook * 0.4) + (trend * 0.2) + (emotion * 0.2) + (shareability * 0.2));

    let chance = "Low";
    if (score > 85) chance = "Extreme";
    else if (score > 70) chance = "High";
    else if (score > 50) chance = "Moderate";

    const faqs = [
        { question: "What makes content shareable?", answer: "Shareability is status. Will the person sharing this piece of content look smarter, funnier, or better informed to their peers? If yes, they share it." }
    ];

    const seoContent = (
        <>
            <h2>The Mathematics of Virality</h2>
            <p>Virality isn't luck; it's an algorithm. Without a hook, nobody stops. Without shareability, the algorithmic loop terminates.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/audience-growth-estimator">Audience Growth Estimator</Link></li>
                <li><Link href="/tools/content-idea-profit-score">Content Idea Profit Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Viral Potential Score" description="Rank your content's algorithmic hooks before hitting publish." slug="viral-potential-score" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>First 3 Seconds Hook (100 = Perfect)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{hook}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={hook} onChange={(e) => setHook(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Trend Relevance (100 = Peaking Now)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{trend}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={trend} onChange={(e) => setTrend(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Emotional Impact (Awe, Anger, Joy)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{emotion}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={emotion} onChange={(e) => setEmotion(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Shareability (Status Enhancement)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{shareability}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={shareability} onChange={(e) => setShareability(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div>
                        <h3 className="input-label" style={{ textAlign: "center" }}>Viral Probability Score</h3>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "0.25rem", margin: "1rem 0" }}>
                            <div style={{ fontSize: "6rem", fontFamily: "var(--font-serif)", color: score > 70 ? "var(--accent-primary)" : "var(--text-primary)", lineHeight: 1 }}>{score}</div>
                            <div style={{ fontSize: "1.5rem", color: "var(--text-secondary)" }}>/100</div>
                        </div>
                    </div>
                    <div style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "1.25rem", padding: "0.5rem 1.5rem", borderRadius: "2rem", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-secondary)", color: score > 70 ? "var(--accent-primary)" : "var(--text-primary)" }}>
                        {chance} Chance of Escape Velocity
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
