"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { analyzeRedditText, RedditAnalysisResult } from "@/lib/redditAnalyzer";
import { trackUsage } from "@/lib/tracker";

export default function RedditPainFinder() {
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState<RedditAnalysisResult | null>(null);

    const handleAnalyze = () => {
        trackUsage("reddit-pain-finder");
        setResult(analyzeRedditText(inputText));
    };

    const faqs = [
        {
            question: "What is the Reddit Problem Finder?",
            answer: "A tool that uses NLP pattern matching to extract frustration, unmet needs, and problem signals from Reddit comments to help you validate product ideas."
        },
        {
            question: "Does it send my text to a server?",
            answer: "No. All text processing happens securely in your browser. No data is stored or sent to any server."
        }
    ];

    const seoContent = (
        <>
            <h2>How to extract business ideas from Reddit</h2>
            <p>Reddit is a goldmine for product research, but reading through hundreds of comments manually is time-consuming.</p>
            <h3>Look for Frustration</h3>
            <p>When users express strong negative emotions toward an existing tool or process, there is typically a willingness to pay for a better alternative.</p>
        </>
    );

    return (
        <ToolLayout
            title="Reddit Problem & Pain-Point Finder"
            description="Paste Reddit threads to instantly detect frustration phrases, unmet needs, and repeated problem signals."
            slug="reddit-pain-finder"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div className="card" style={{ marginBottom: "2rem" }}>
                <div className="input-group">
                    <label className="input-label">Paste Reddit Thread Text</label>
                    <textarea
                        className="input-field"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={"e.g. I am so tired of doing this manually. I wish there was a tool that..."}
                        style={{ minHeight: "200px" }}
                    />
                </div>
                <button className="btn" onClick={handleAnalyze}>
                    Analyze Pain Points
                </button>
            </div>

            {result && (
                <div className="stagger-1">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                        <div className="result-box">
                            <div className="input-label">Overall Pain Score</div>
                            <div className="result-value">{result.overallScore} / 100</div>
                            <div className="score-bar">
                                <div className="score-fill" style={{ width: `${result.overallScore}%` }}></div>
                            </div>
                        </div>

                        <div className="result-box">
                            <div className="input-label">Frequency</div>
                            <div style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>
                                <div>Frustration: {result.frequency.frustration}</div>
                                <div>Unmet Needs: {result.frequency.unmet_need}</div>
                                <div>Problems: {result.frequency.problem_signal}</div>
                            </div>
                        </div>
                    </div>

                    {result.suggestions.length > 0 && (
                        <div className="card" style={{ marginTop: "2rem", borderColor: "var(--accent-primary)" }}>
                            <h3 style={{ marginBottom: "1rem", color: "var(--accent-primary)" }}>Insights & Opportunities</h3>
                            <ul style={{ paddingLeft: "1.5rem", color: "var(--text-primary)" }}>
                                {result.suggestions.map((s, i) => (
                                    <li key={i} style={{ marginBottom: "0.5rem" }}>{s}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {result.extractedPoints.length > 0 && (
                        <div style={{ marginTop: "2rem" }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Extracted Statements</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {result.extractedPoints.map((point, index) => (
                                    <div key={index} className="card" style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ flex: 1, paddingRight: "1rem" }}>
                                            &ldquo;{point.text}&rdquo;
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <span className="pill" style={{ marginLeft: "auto", display: "inline-block" }}>
                                                {point.type.replace('_', ' ')}
                                            </span>
                                            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                                                Intensity: {point.intensity}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </ToolLayout>
    );
}
