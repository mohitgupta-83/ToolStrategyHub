"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { analyzeSubredditContent, SubredditAnalysisResult } from "@/lib/subredditAnalyzer";
import { trackUsage } from "@/lib/tracker";

export default function SubredditPainAnalyzer() {
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState<SubredditAnalysisResult | null>(null);

    const handleAnalyze = () => {
        trackUsage("subreddit-pain-analyzer");
        setResult(analyzeSubredditContent(inputText));
    };

    const faqs = [
        {
            question: "How does the Subreddit Analyzer work?",
            answer: "It uses natural language processing (tokenization, stop-word removal, and bigram extraction) to identify recurring themes and phrases across multiple Reddit posts."
        },
        {
            question: "Why focus on repeated phrases?",
            answer: "A single complaint is an anecdote, but a cluster of similar complaints reveals a systemic, unmet market need. This tool helps quantify qualitative data."
        }
    ];

    const seoContent = (
        <>
            <h2>Finding B2B and B2C SaaS Ideas in Subreddits</h2>
            <p>Subreddits are specialized communities where passionate users gather to discuss their niche. When tools fail them or workflows become too manual, they complain on Reddit.</p>
            <h3>The Art of Listening to Complaints</h3>
            <p>By dumping top weekly posts from a specific subreddit into this analyzer, you can rapidly identify what the community hates doing. The frequency score tells you how widespread the problem is, while the urgency score indicates their level of frustration (and indirectly, their willingness to pay for a solution).</p>
        </>
    );

    return (
        <ToolLayout
            title="Subreddit Pain Frequency Analyzer"
            description="Paste 10+ Reddit posts to detect the top recurring complaint themes, ranked by frequency and urgency."
            slug="subreddit-pain-analyzer"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div className="card" style={{ marginBottom: "2rem" }}>
                <div className="input-group">
                    <label className="input-label">Paste Multiple Reddit Posts (separated by newlines or ---)</label>
                    <textarea
                        className="input-field"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Post 1: ...\n\n---\n\nPost 2: ..."
                        style={{ minHeight: "300px" }}
                    />
                </div>
                <button className="btn" onClick={handleAnalyze}>
                    Extract Top Themes
                </button>
            </div>

            {result && (
                <div className="stagger-1">
                    <div style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
                        Analyzed {result.totalPostsAnalyzed} discrete posts. Found {result.themes.length} dominant themes.
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {result.themes.length === 0 ? (
                            <div className="card" style={{ textAlign: "center" }}>
                                Not enough data to extract meaningful themes. Try pasting more text.
                            </div>
                        ) : (
                            result.themes.map((theme, idx) => (
                                <div key={idx} className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            <span style={{ fontSize: "2rem", color: "var(--border-focus)", fontWeight: "bold" }}>
                                                #{idx + 1}
                                            </span>
                                            <h3 style={{ fontSize: "1.5rem", color: "var(--accent-primary)" }}>
                                                {theme.name}
                                            </h3>
                                        </div>
                                        <div className="pill" style={{ margin: 0 }}>
                                            Urgency: {theme.urgency}/100
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", gap: "2rem" }}>
                                        <div style={{ flex: 1 }}>
                                            <div className="input-label" style={{ marginBottom: "0.5rem" }}>Frequency Estimate</div>
                                            <div className="score-bar">
                                                <div className="score-fill" style={{ width: `${theme.frequency}%` }}></div>
                                            </div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div className="input-label" style={{ marginBottom: "0.5rem" }}>Keywords Used</div>
                                            <div style={{ color: "var(--text-secondary)" }}>
                                                {theme.keywords.join(", ")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </ToolLayout>
    );
}
