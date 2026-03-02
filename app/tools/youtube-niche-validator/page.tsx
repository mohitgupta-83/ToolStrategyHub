"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function YouTubeNicheValidator() {
    const [frequency, setFrequency] = useState(2); // uploads per week
    const [views, setViews] = useState(5000); // estimated views per video
    const [cpm, setCpm] = useState(8); // estimated CPM

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("youtube-niche-validator");
            tracked.current = true;
        }
    }, []);

    const monthlyViews = frequency * 4.33 * views;
    const monthlyAdSense = (monthlyViews / 1000) * cpm;
    
    // Viability Score based on reach & CPM
    let score = Math.round((cpm * 5) + Math.min(views / 1000, 50));
    if (score > 100) score = 100;

    let difficulty = "Medium";
    if (frequency > 3) difficulty = "Burnout Risk (High Volume)";
    else if (cpm < 5) difficulty = "High Volume Required (Low CPM)";
    else if (cpm > 15) difficulty = "Highly Competitive (High CPM)";

    const faqs = [
        { question: "Why is CPM important?", answer: "A $2 CPM channel needs 10x the views as a $20 CPM channel to make the exact same revenue. Niche selection dictates your required audience size." }
    ];

    const seoContent = (
        <>
            <h2>Validating Before Filming</h2>
            <p>Do the math before you buy the camera. A bad niche makes it mathematically impossible to make a living on AdSense alone.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/channel-profit-predictor">Channel Profit Predictor</Link></li>
                <li><Link href="/tools/audience-growth-estimator">Audience Growth Estimator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="YouTube Niche Validator" description="Validate your YouTube niche economics before committing to production." slug="youtube-niche-validator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Uploads Per Week</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{frequency}</span>
                        </label>
                        <input type="range" min="1" max="7" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Avg Views Per Upload</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{views.toLocaleString()}</span>
                        </label>
                        <input type="range" min="100" max="100000" step="1000" value={views} onChange={(e) => setViews(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Estimated CPM ($)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>${cpm}</span>
                        </label>
                        <input type="range" min="1" max="50" step="1" value={cpm} onChange={(e) => setCpm(Number(e.target.value))} />
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <h3 className="input-label">Viability Score</h3>
                        <div style={{ fontSize: "4rem", fontFamily: "var(--font-serif)", color: score >= 60 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{score}/100</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Monthly AdSense</div>
                            <div style={{ fontSize: "1.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>${Math.round(monthlyAdSense).toLocaleString()}</div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Growth Difficulty</div>
                            <div style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: "bold" }}>{difficulty}</div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
