"use client";

import { useState, useRef, useEffect } from "react";
import AIToolLayout from "@/components/AIToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import pricingData from "@/lib/llmPricing.json";

export default function TokenCalculator() {
    const [text, setText] = useState("");
    const [textType, setTextType] = useState("english");
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("token-calculator");
            tracked.current = true;
        }
    }, []);

    // 1. Basic Metrics
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s/g, "").length;
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    // 2. Token Heuristics
    const estimates = {
        english: Math.ceil(charCount / 4.0),
        technical: Math.ceil(charCount / 3.3),
        code: Math.ceil(charCount / 2.5),
        json: Math.ceil(charCount / 2.2),
        markdown: Math.ceil(charCount / 3.5),
    };

    const estimatedTokens = estimates[textType as keyof typeof estimates] || 0;

    // Filter pricing data to GPT, Claude, Gemini, Llama, Mistral (omit DeepSeek for this specific table)
    const modelsToCompare = pricingData.filter(model => 
        model.provider === "OpenAI" || 
        model.provider === "Anthropic" || 
        model.provider === "Google" || 
        model.provider === "Meta" || 
        model.provider === "Mistral"
    );

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleClear = () => {
        setText("");
    };

    const faqs = [
        {
            question: "What is an LLM token?",
            question_id: "faq-q1",
            answer: "Tokens are the basic units of data processed by Large Language Models. Instead of reading word-by-word, LLMs break down text into sub-word segments (e.g., 'learning' might become 'learn' and 'ing')."
        },
        {
            question: "Why do different text types have different token counts?",
            question_id: "faq-q2",
            answer: "Tokenizers are trained on specific corpus distributions. Plain English is highly compressed (about 4 characters per token), while code, JSON, and technical terms are less common and require more tokens (often 2 to 2.5 characters per token) to represent the same length."
        },
        {
            question: "How accurate is this token estimator?",
            question_id: "faq-q3",
            answer: "Since different providers use different tokenization algorithms (like Tiktoken for OpenAI, LlamaTokenizer for Meta, etc.), this tool uses statistical heuristics. It is an estimation, usually accurate within 5-10% of the actual API token counts."
        }
    ];

    const seoContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2>What Are AI Tokens?</h2>
            <p>
                In natural language processing, a <strong>token</strong> is the fundamental unit of text that a language model reads or generates. LLMs do not comprehend text as strings of characters or entire words; instead, they split text into semantic sub-words. For instance, common words like "the" or "and" are typically represented as a single token, whereas rare words or code syntaxes are split into multiple tokens.
            </p>

            <h3>How Tokenization Works</h3>
            <p>
                Tokenizers use algorithms like Byte-Pair Encoding (BPE) or WordPiece to recursively merge characters that frequently appear together. When you input text, it is converted into a list of token IDs. In English, a general rule of thumb is that 1 token is equal to approximately 4 characters or 0.75 words.
            </p>

            <h3>How Token Costs Affect AI Applications</h3>
            <p>
                LLM APIs charge developers based on the number of tokens processed. Crucially, <strong>input tokens</strong> (prompts) are priced cheaper than <strong>output tokens</strong> (completions), often by a factor of 3x to 5x. When designing agentic systems that run continuously or RAG pipelines that pull massive document segments into the context window, token efficiency becomes a key operational metric. Over-allocating tokens directly degrades gross margins.
            </p>

            <h3>Tokens vs Words: A Reference Scale</h3>
            <p>
                - <strong>100 Words:</strong> ~135 Tokens (English)<br />
                - <strong>1 Page of Text:</strong> ~500 Words / ~675 Tokens<br />
                - <strong>Short Code Snippet (JSON):</strong> ~50 Words / ~110 Tokens (JSON notation consumes substantial tokens due to punctuation brackets).
            </p>

            <h3>Internal Links & Reference Resources</h3>
            <ul>
                <li><Link href="/ai-tools" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>AI Developer Ecosystem Hub</Link></li>
                <li><Link href="/ai-tools/llm-cost-calculator" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>LLM API Cost Calculator</Link></li>
                <li><Link href="/guides/what-are-ai-tokens" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Deep Guide: What Are AI Tokens?</Link></li>
                <li><Link href="/guides/how-llm-pricing-works" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Deep Guide: How LLM Pricing Works</Link></li>
            </ul>
        </div>
    );

    return (
        <AIToolLayout 
            title="AI Token Calculator" 
            description="Estimate LLM token weights from text and calculate prompt costs across major model providers in real-time."
            slug="token-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
                {/* Text input area */}
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Input Prompt / Text</span>
                            <select 
                                value={textType} 
                                onChange={(e) => setTextType(e.target.value)}
                                className="input-field" 
                                style={{ width: "auto", padding: "0.25rem 0.5rem", height: "auto", fontSize: "0.875rem" }}
                            >
                                <option value="english">Plain English</option>
                                <option value="technical">Technical Writing</option>
                                <option value="code">Source Code</option>
                                <option value="json">JSON Payload</option>
                                <option value="markdown">Markdown Document</option>
                            </select>
                        </label>
                        <textarea 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            placeholder="Paste your developer prompts, code, or data segments here to estimate token size..."
                            className="input-field"
                            style={{ minHeight: "220px", fontFamily: textType === "code" || textType === "json" ? "var(--font-mono)" : "inherit" }}
                        />
                    </div>
                    
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button className="btn" style={{ flexGrow: 1 }} onClick={handleCopy} disabled={charCount === 0}>
                            Copy Text
                        </button>
                        <button className="btn btn-secondary" style={{ flexGrow: 1 }} onClick={handleClear} disabled={charCount === 0}>
                            Clear
                        </button>
                    </div>
                </div>

                {/* Estimation and metrics display */}
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 className="input-label">Real-time Metrics</h3>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Estimated Tokens</div>
                            <div style={{ fontSize: "2rem", color: "var(--accent-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                {estimatedTokens.toLocaleString()}
                            </div>
                        </div>
                        <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Word Count</div>
                            <div style={{ fontSize: "2rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                {wordCount.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Characters</div>
                            <div style={{ fontSize: "1.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                {charCount.toLocaleString()}
                            </div>
                        </div>
                        <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Chars (No Spaces)</div>
                            <div style={{ fontSize: "1.5rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                {charNoSpaces.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: "bold", marginBottom: "0.5rem" }}>
                            Heuristics Comparison:
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>English text (~4.0 chars/tok):</span>
                                <span style={{ fontFamily: "var(--font-mono)" }}>{estimates.english}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Technical text (~3.3 chars/tok):</span>
                                <span style={{ fontFamily: "var(--font-mono)" }}>{estimates.technical}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Code (~2.5 chars/tok):</span>
                                <span style={{ fontFamily: "var(--font-mono)" }}>{estimates.code}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>JSON payload (~2.2 chars/tok):</span>
                                <span style={{ fontFamily: "var(--font-mono)" }}>{estimates.json}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Markdown (~3.5 chars/tok):</span>
                                <span style={{ fontFamily: "var(--font-mono)" }}>{estimates.markdown}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Token Cost Comparison Table */}
            <div className="card" style={{ overflowX: "auto", marginBottom: "3rem" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                    Token Pricing Comparison Table
                </h3>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem", minWidth: "800px" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
                            <th style={{ padding: "0.75rem 1rem", color: "var(--text-primary)" }}>Provider</th>
                            <th style={{ padding: "0.75rem 1rem", color: "var(--text-primary)" }}>Model</th>
                            <th style={{ padding: "0.75rem 1rem", color: "var(--text-primary)" }}>Context Window</th>
                            <th style={{ padding: "0.75rem 1rem", color: "var(--text-primary)" }}>Input Cost / M</th>
                            <th style={{ padding: "0.75rem 1rem", color: "var(--text-primary)" }}>Output Cost / M</th>
                            <th style={{ padding: "0.75rem 1rem", color: "var(--text-primary)" }}>Estimated Cost / M (Blended)</th>
                            <th style={{ padding: "0.75rem 1rem", color: "var(--text-primary)" }}>User Token Cost (Prompt)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modelsToCompare.map((model, i) => {
                            const blendedCost = (model.inputCostPerM * 0.8) + (model.outputCostPerM * 0.2);
                            const userCost = (estimatedTokens / 1_000_000) * model.inputCostPerM;
                            
                            return (
                                <tr key={i} style={{ borderBottom: "1px solid var(--border-color)", transition: "background-color 0.2s" }} className="table-row-hover">
                                    <td style={{ padding: "1rem" }}>{model.provider}</td>
                                    <td style={{ padding: "1rem", fontWeight: "bold", color: "var(--accent-primary)" }}>{model.name}</td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-mono)" }}>{model.contextWindow.toLocaleString()}</td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-mono)" }}>${model.inputCostPerM.toFixed(2)}</td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-mono)" }}>${model.outputCostPerM.toFixed(2)}</td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-mono)" }}>${blendedCost.toFixed(2)}</td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-mono)", fontWeight: "bold", color: userCost > 0 ? "var(--accent-primary)" : "var(--text-secondary)" }}>
                                        {userCost === 0 ? "$0.00" : userCost < 0.0001 ? "< $0.0001" : `$${userCost.toFixed(5)}`}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "1rem" }}>
                    * Blended cost assumes an 80% input (prompt) and 20% output (completion) split. User token cost represents the cost of executing the current text input as a prompt.
                </p>
            </div>
            
            <style jsx>{`
                .table-row-hover:hover {
                    background-color: var(--bg-tertiary);
                }
            `}</style>
        </AIToolLayout>
    );
}
