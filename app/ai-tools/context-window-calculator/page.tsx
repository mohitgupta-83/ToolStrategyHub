"use client";

import { useState, useRef, useEffect } from "react";
import AIToolLayout from "@/components/AIToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import pricingData from "@/lib/llmPricing.json";

export default function ContextWindowCalculator() {
    const [modelSlug, setModelSlug] = useState("gpt-4o-mini");
    const [systemPrompt, setSystemPrompt] = useState(1000);
    const [userPrompt, setUserPrompt] = useState(5000);
    const [memoryTokens, setMemoryTokens] = useState(4000);
    const [expectedOutput, setExpectedOutput] = useState(1000);

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("context-window-calculator");
            tracked.current = true;
        }
    }, []);

    // Get current model specifications
    const currentModel = pricingData.find(m => m.slug === modelSlug) || pricingData[1];
    const limit = currentModel.contextWindow;

    // Calculations
    const totalUsed = systemPrompt + userPrompt + memoryTokens + expectedOutput;
    const remaining = limit - totalUsed;
    const percentageUsed = (totalUsed / limit) * 100;

    // Warning determination
    let warningLevel: "healthy" | "warning" | "danger" = "healthy";
    let warningMessage = "Your context window footprint is healthy. The model should have high recall accuracy.";

    if (percentageUsed >= 100) {
        warningLevel = "danger";
        warningMessage = `CRITICAL OVERFLOW: Your prompt utilizes ${percentageUsed.toFixed(0)}% of the context window, exceeding the model's limit by ${(totalUsed - limit).toLocaleString()} tokens. This request will fail with an API error.`;
    } else if (percentageUsed >= 80) {
        warningLevel = "warning";
        warningMessage = `ATTENTION REQUIRED: You are utilizing ${percentageUsed.toFixed(0)}% of the context window. Recall accuracy may degrade severely due to 'needle-in-a-haystack' retrieval issues.`;
    }

    // SVG Circular Gauge parameters
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (Math.min(100, percentageUsed) / 100) * circumference;

    const faqs = [
        {
            question: "What is a context window?",
            question_id: "context-q1",
            answer: "A context window is the maximum sum of input (prompt) and output (response) tokens that an LLM can process in a single request. If your prompt size exceeds this limit, the API returns a context length error."
        },
        {
            question: "How does context size affect model accuracy?",
            question_id: "context-q2",
            answer: "Although modern models boast massive context limits (e.g. Gemini 2M tokens), research shows recall accuracy degrades when key information is buried in the middle of long prompts. This is known as the 'lost in the middle' effect."
        },
        {
            question: "How can I avoid context window overflow?",
            question_id: "context-q3",
            answer: "You can compress prompt layouts, implement summarization loops for chat history (memory compression), prune vector search (RAG) results, or use a model with a larger native window limit."
        }
    ];

    const seoContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2>What Is a Context Window?</h2>
            <p>
                In machine learning, the <strong>context window</strong> defines the total buffer capacity of a Large Language Model. It is the boundary constraint of the neural network's attention mechanism. Every prompt instruction, system role description, vector retrieval segment, and conversation history node counts toward this token total.
            </p>

            <h3>How Context Size Affects Model Performance</h3>
            <p>
                As context size grows, the computational cost to execute attention equations increases quadratically: <code>O(N²)</code>, where <code>N</code> is the number of tokens. This leads to:
            </p>
            <ul>
                <li><strong>Latency Spikes:</strong> Time-to-first-token increases, slowing down agent loops.</li>
                <li><strong>Lost in the Middle:</strong> Models retrieve details at the absolute beginning or end of prompts with 99%+ accuracy, but recall drops to 50-60% for details embedded in the middle 50% of the context.</li>
                <li><strong>Financial Cost:</strong> Large prompts pull massive token volumes, accelerating API consumption rates.</li>
            </ul>

            <h3>Heuristic Strategies to Prevent Context Overflows</h3>
            <p>
                For developers building advanced RAG or agent loops:
            </p>
            <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Sliding Windows:</strong> Keep only the last N rounds of user messages in chat history.</li>
                <li><strong>Memory Summarization:</strong> Use a secondary cheap model to periodically summarize chat logs into a concise bullet list.</li>
                <li><strong>Rank-filtering (Reranking):</strong> Filter vector DB search results using a reranker to keep only high-relevance nodes, filtering out redundant tokens.</li>
            </ol>

            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/ai-tools" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>AI Developer Ecosystem Hub</Link></li>
                <li><Link href="/ai-tools/token-calculator" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Token Calculator</Link></li>
                <li><Link href="/guides/what-is-context-window" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Deep Guide: What Is a Context Window?</Link></li>
                <li><Link href="/guides/how-to-reduce-token-costs" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Deep Guide: Reducing Token Costs</Link></li>
            </ul>
        </div>
    );

    return (
        <AIToolLayout
            title="Context Window Calculator"
            description="Calculate context window footprint. Input prompts, memory systems, and completions to check capacity limits and avoid recall degradation."
            slug="context-window-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
                {/* Inputs card */}
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="input-group">
                        <label className="input-label">Select LLM Model</label>
                        <select 
                            value={modelSlug} 
                            onChange={(e) => setModelSlug(e.target.value)}
                            className="input-field"
                        >
                            {pricingData.map(model => (
                                <option key={model.slug} value={model.slug}>
                                    {model.provider} - {model.name} ({model.contextWindow.toLocaleString()} tokens)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>System Prompt Tokens</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>
                                {systemPrompt.toLocaleString()}
                            </span>
                        </label>
                        <input 
                            type="range" 
                            min="0" 
                            max="10000" 
                            step="100" 
                            value={systemPrompt} 
                            onChange={(e) => setSystemPrompt(Number(e.target.value))} 
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>User Prompt / RAG Tokens</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>
                                {userPrompt.toLocaleString()}
                            </span>
                        </label>
                        <input 
                            type="range" 
                            min="0" 
                            max={Math.min(limit, 100000)} 
                            step="200" 
                            value={userPrompt} 
                            onChange={(e) => setUserPrompt(Number(e.target.value))} 
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Memory / Chat History Tokens</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>
                                {memoryTokens.toLocaleString()}
                            </span>
                        </label>
                        <input 
                            type="range" 
                            min="0" 
                            max={Math.min(limit, 50000)} 
                            step="200" 
                            value={memoryTokens} 
                            onChange={(e) => setMemoryTokens(Number(e.target.value))} 
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Expected Output Tokens</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>
                                {expectedOutput.toLocaleString()}
                            </span>
                        </label>
                        <input 
                            type="range" 
                            min="0" 
                            max="8000" 
                            step="100" 
                            value={expectedOutput} 
                            onChange={(e) => setExpectedOutput(Number(e.target.value))} 
                        />
                    </div>
                </div>

                {/* Gauge and Output metrics card */}
                <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", justifyContent: "center" }}>
                    
                    {/* SVG Gauge */}
                    <div style={{ position: "relative", width: "200px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <svg width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
                            {/* Track circle */}
                            <circle 
                                cx="100" 
                                cy="100" 
                                r={radius} 
                                fill="transparent" 
                                stroke="var(--bg-tertiary)" 
                                strokeWidth="12" 
                            />
                            {/* Value circle */}
                            <circle 
                                cx="100" 
                                cy="100" 
                                r={radius} 
                                fill="transparent" 
                                stroke={warningLevel === "danger" ? "var(--error-color, #EF4444)" : warningLevel === "warning" ? "#F59E0B" : "var(--accent-primary)"} 
                                strokeWidth="12" 
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 0.3s ease, stroke 0.3s" }}
                            />
                        </svg>
                        <div style={{ position: "absolute", textAlign: "center", display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-mono)", color: warningLevel === "danger" ? "#EF4444" : warningLevel === "warning" ? "#F59E0B" : "var(--text-primary)" }}>
                                {percentageUsed.toFixed(0)}%
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Utilized</span>
                        </div>
                    </div>

                    {/* Numeric breakdown */}
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                            <span>Total Context Used:</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{totalUsed.toLocaleString()} / {limit.toLocaleString()}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                            <span>Remaining Space:</span>
                            <span style={{ fontFamily: "var(--font-mono)", color: remaining < 0 ? "#EF4444" : "var(--text-primary)" }}>
                                {remaining < 0 ? `Overflow: ${Math.abs(remaining).toLocaleString()}` : remaining.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Alert Message Box */}
                    <div style={{ 
                        padding: "1rem 1.25rem", 
                        borderRadius: "var(--radius-sm)", 
                        fontSize: "0.9rem",
                        lineHeight: "1.5",
                        backgroundColor: warningLevel === "danger" ? "rgba(239, 68, 68, 0.08)" : warningLevel === "warning" ? "rgba(245, 158, 11, 0.08)" : "rgba(16, 185, 129, 0.05)",
                        border: `1px solid ${warningLevel === "danger" ? "#EF4444" : warningLevel === "warning" ? "#F59E0B" : "var(--accent-primary)"}`,
                        width: "100%"
                    }}>
                        <div style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "0.75rem", color: warningLevel === "danger" ? "#EF4444" : warningLevel === "warning" ? "#F59E0B" : "var(--accent-primary)", marginBottom: "0.25rem" }}>
                            {warningLevel === "danger" ? "Overflow Alert" : warningLevel === "warning" ? "Capacity Warning" : "System Status"}
                        </div>
                        <p style={{ color: "var(--text-primary)", margin: 0 }}>{warningMessage}</p>
                    </div>
                </div>
            </div>
        </AIToolLayout>
    );
}
