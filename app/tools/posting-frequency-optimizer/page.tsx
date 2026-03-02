"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function PostingFrequencyOptimizer() {
    const [hours, setHours] = useState(10);
    const [complexity, setComplexity] = useState(2); // 1 = Short, 3 = High
    const [platform, setPlatform] = useState("twitter");

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("posting-frequency-optimizer");
            tracked.current = true;
        }
    }, []);

    let hoursPerAsset = 1;
    if (platform === "youtube") hoursPerAsset = complexity === 1 ? 4 : (complexity === 2 ? 8 : 16);
    else if (platform === "newsletter") hoursPerAsset = complexity === 1 ? 2 : (complexity === 2 ? 4 : 8);
    else if (platform === "twitter" || platform === "linkedin") hoursPerAsset = complexity === 1 ? 0.25 : (complexity === 2 ? 0.5 : 1.5);

    const postsPerWeek = Math.floor(hours / hoursPerAsset);
    let recommendation = "Maintain consistency.";
    if (postsPerWeek === 0) recommendation = "Impossible cadence. You must dedicate more hours or reduce content complexity.";
    else if (postsPerWeek > 14) recommendation = "High output possible. Focus on quality over extreme volume to prevent burnout.";

    const faqs = [
        { question: "Why map hours to complexity?", answer: "Creators burn out because they plan YouTube channels on Twitter timelines. A high-production video takes 16 hours. Be realistic." }
    ];

    const seoContent = (
        <>
            <h2>Avoiding Creator Burnout</h2>
            <p>Consistency is key, but only if the cadence is physically possible given your constraints.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/youtube-niche-validator">YouTube Niche Validator</Link></li>
                <li><Link href="/tools/content-idea-profit-score">Content Idea Profit Score</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Posting Frequency Optimizer" description="Calculate your true capacity for content generation." slug="posting-frequency-optimizer" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Available Content Hours / Week</label>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <span></span><span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{hours}h</span>
                        </div>
                        <input type="range" min="1" max="40" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Primary Platform</label>
                        <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="twitter">Short Form Text (Twitter/LinkedIn)</option>
                            <option value="newsletter">Long Form Text (Newsletter/Blog)</option>
                            <option value="youtube">High Production Video (YouTube)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Content Complexity</label>
                        <select value={complexity} onChange={(e) => setComplexity(Number(e.target.value))} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value={1}>Low (Fast / Raw / Repurposed)</option>
                            <option value={2}>Medium (Standard Editing / Research)</option>
                            <option value={3}>High (Deep Dives / Cinematic)</option>
                        </select>
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "0.5rem" }}>Sustainable Cadence</h3>
                    <div style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: postsPerWeek > 0 ? "var(--accent-primary)" : "var(--error-color)", lineHeight: 1 }}>{postsPerWeek}</div>
                    <div style={{ color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2rem" }}>Posts Per Week</div>
                    
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center", width: "100%" }}>
                        <p style={{ color: "var(--text-primary)", fontSize: "1rem", lineHeight: 1.5 }}>{recommendation}</p>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem" }}>Est. Time Per Asset: {hoursPerAsset}h</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
