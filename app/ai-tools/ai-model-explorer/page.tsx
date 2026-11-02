"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import AIToolLayout from "@/components/AIToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import { LLM_MODELS, type LLMModel } from "@/lib/llmModelsData";

/* ──────────────────────────────────────────────
   Types & Constants
   ────────────────────────────────────────────── */

type ViewMode = "cards" | "list" | "table";
type SortKey = "name" | "inputCost" | "outputCost" | "context" | "provider";
type SortDir = "asc" | "desc";
type Currency = "USD" | "INR";

const INR_RATE = 92.98;

const ALL_CAPABILITIES = [
    "Reasoning", "Tool calling", "Vision", "Structured output",
    "Code generation", "Function calling"
];

const ALL_BEST_FOR = ["Agents", "RAG", "Code", "Chat", "Multimodal", "Research", "Prototyping"];

const FREE_TIER_OPTIONS = [
    { value: "all", label: "All Pricing Tiers" },
    { value: "free", label: "100% Free Tiers" },
    { value: "freemium", label: "Freemium (Free with limits)" },
    { value: "trial", label: "Trial Credits" },
    { value: "paid", label: "Paid Only" },
];

const SPEED_COLORS: Record<string, string> = {
    instant: "#10B981",
    fast: "#34D399",
    standard: "#FBBF24",
    slow: "#F87171",
};

const SPEED_LABELS: Record<string, string> = {
    instant: "⚡ Instant (>200 t/s)",
    fast: "🚀 Fast (80-200 t/s)",
    standard: "⏱ Standard (30-80 t/s)",
    slow: "🐢 Slow (<30 t/s)",
};

const PROVIDER_ICONS: Record<string, string> = {
    "Google AI Studio": "🔷",
    "Groq": "⚡",
    "OpenRouter": "🧭",
    "GitHub Models": "🐙",
    "Mistral AI": "🌪️",
    "Hugging Face": "🤗",
    "Cerebras": "🧠",
    "OpenAI": "🟢",
    "Anthropic": "🟤",
    "DeepSeek": "🐋",
    "Cohere": "🌊",
    "Together AI": "🤝",
    "Fireworks AI": "🎆",
    "SambaNova": "🔶",
    "NVIDIA NIM": "💚",
};

/* ──────────────────────────────────────────────
   Formatting Helpers
   ────────────────────────────────────────────── */
function fmtContext(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 0)}K`;
    return n.toString();
}

function fmtCostVal(usd: number, cur: Currency): string {
    if (usd === 0) return "Free";
    const val = cur === "INR" ? usd * INR_RATE : usd;
    const sym = cur === "INR" ? "₹" : "$";
    if (val < 0.01) return `${sym}${val.toFixed(3)}`;
    if (val < 1) return `${sym}${val.toFixed(2)}`;
    return `${sym}${val.toFixed(2)}`;
}

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
export default function AIModelExplorer() {
    // ── Tracking
    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("ai-model-explorer");
            tracked.current = true;
        }
    }, []);

    // ── Currency State
    const [currency, setCurrency] = useState<Currency>("USD");

    // ── Filter States
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortDir, setSortDir] = useState<SortDir>("asc");
    const [providerFilter, setProviderFilter] = useState("all");
    const [freeTierFilter, setFreeTierFilter] = useState("all");
    const [maxInputCost, setMaxInputCost] = useState<string>("");
    const [maxOutputCost, setMaxOutputCost] = useState<string>("");
    const [minContext, setMinContext] = useState<string>("");
    const [selectedCaps, setSelectedCaps] = useState<Set<string>>(new Set());
    const [creditCardFilter, setCreditCardFilter] = useState<"all" | "no" | "yes">("all");
    const [openAICompatFilter, setOpenAICompatFilter] = useState(false);
    const [openWeightsFilter, setOpenWeightsFilter] = useState(false);
    const [selectedBestFor, setSelectedBestFor] = useState<Set<string>>(new Set());

    // ── View States
    const [viewMode, setViewMode] = useState<ViewMode>("table");

    // ── Columns visibility toggles (reference image feature)
    const [visibleCols, setVisibleCols] = useState({
        provider: true,
        family: true,
        inputCost: true,
        outputCost: true,
        context: true,
        speed: true,
        capabilities: true,
        modalities: true,
        actions: true,
    });

    const toggleCol = (col: keyof typeof visibleCols) => {
        setVisibleCols(prev => ({ ...prev, [col]: !prev[col] }));
    };

    // ── Copy feedback
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1800);
    };

    // ── Comparison
    const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
    const [showCompare, setShowCompare] = useState(false);

    // ── Bookmarks
    const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
    const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

    // ── Quick Cost Estimator
    const [showCostEstimator, setShowCostEstimator] = useState(false);
    const [monthlyTokensM, setMonthlyTokensM] = useState(5);

    // Load bookmarks from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem("llm-finder-bookmarks");
            if (saved) setBookmarks(new Set(JSON.parse(saved)));
        } catch { /* ignore */ }
    }, []);

    const toggleBookmark = useCallback((id: string) => {
        setBookmarks(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            try {
                localStorage.setItem("llm-finder-bookmarks", JSON.stringify(Array.from(next)));
            } catch { /* */ }
            return next;
        });
    }, []);

    // ── Unique providers
    const allProviders = useMemo(() => {
        const provs = new Set<string>();
        LLM_MODELS.forEach(m => provs.add(m.provider));
        return Array.from(provs).sort();
    }, []);

    // ── Active filter count
    const activeFilterCount = useMemo(() => {
        let c = 0;
        if (search) c++;
        if (providerFilter !== "all") c++;
        if (freeTierFilter !== "all") c++;
        if (maxInputCost) c++;
        if (maxOutputCost) c++;
        if (minContext) c++;
        if (selectedCaps.size > 0) c++;
        if (creditCardFilter !== "all") c++;
        if (openAICompatFilter) c++;
        if (openWeightsFilter) c++;
        if (selectedBestFor.size > 0) c++;
        if (showBookmarksOnly) c++;
        return c;
    }, [search, providerFilter, freeTierFilter, maxInputCost, maxOutputCost, minContext, selectedCaps, creditCardFilter, openAICompatFilter, openWeightsFilter, selectedBestFor, showBookmarksOnly]);

    // ── Filter & Sort
    const filteredModels = useMemo(() => {
        let results = [...LLM_MODELS];

        // Search
        if (search) {
            const q = search.toLowerCase();
            results = results.filter(m =>
                m.name.toLowerCase().includes(q) ||
                m.provider.toLowerCase().includes(q) ||
                m.family.toLowerCase().includes(q) ||
                m.id.toLowerCase().includes(q) ||
                m.description.toLowerCase().includes(q)
            );
        }

        // Provider
        if (providerFilter !== "all") {
            results = results.filter(m => m.provider === providerFilter);
        }

        // Free tier
        if (freeTierFilter !== "all") {
            results = results.filter(m => m.freeTier === freeTierFilter);
        }

        // Max input cost
        if (maxInputCost) {
            const max = parseFloat(maxInputCost);
            if (!isNaN(max)) {
                const maxUsd = currency === "INR" ? max / INR_RATE : max;
                results = results.filter(m => m.inputCostPerM <= maxUsd);
            }
        }

        // Max output cost
        if (maxOutputCost) {
            const max = parseFloat(maxOutputCost);
            if (!isNaN(max)) {
                const maxUsd = currency === "INR" ? max / INR_RATE : max;
                results = results.filter(m => m.outputCostPerM <= maxUsd);
            }
        }

        // Min context
        if (minContext) {
            const min = parseFloat(minContext);
            if (!isNaN(min)) results = results.filter(m => m.contextWindow >= min);
        }

        // Capabilities
        if (selectedCaps.size > 0) {
            const capsArr = Array.from(selectedCaps);
            results = results.filter(m =>
                capsArr.every(cap => m.capabilities.includes(cap))
            );
        }

        // Credit card
        if (creditCardFilter !== "all") {
            const needsCard = creditCardFilter === "yes";
            results = results.filter(m => m.creditCardRequired === needsCard);
        }

        // OpenAI compatible
        if (openAICompatFilter) {
            results = results.filter(m => m.openAICompatible);
        }

        // Open weights
        if (openWeightsFilter) {
            results = results.filter(m => m.openWeights);
        }

        // Best for
        if (selectedBestFor.size > 0) {
            const bfArr = Array.from(selectedBestFor);
            results = results.filter(m =>
                bfArr.some(bf => m.bestFor.includes(bf))
            );
        }

        // Bookmarks only
        if (showBookmarksOnly) {
            results = results.filter(m => bookmarks.has(m.id));
        }

        // Sort
        results.sort((a, b) => {
            let cmp = 0;
            switch (sortKey) {
                case "name": cmp = a.name.localeCompare(b.name); break;
                case "inputCost": cmp = a.inputCostPerM - b.inputCostPerM; break;
                case "outputCost": cmp = a.outputCostPerM - b.outputCostPerM; break;
                case "context": cmp = a.contextWindow - b.contextWindow; break;
                case "provider": cmp = a.provider.localeCompare(b.provider); break;
            }
            return sortDir === "asc" ? cmp : -cmp;
        });

        return results;
    }, [search, sortKey, sortDir, providerFilter, freeTierFilter, maxInputCost, maxOutputCost, minContext, selectedCaps, creditCardFilter, openAICompatFilter, openWeightsFilter, selectedBestFor, showBookmarksOnly, bookmarks, currency]);

    // ── Stats
    const stats = useMemo(() => {
        const provs = new Set<string>();
        LLM_MODELS.forEach(m => provs.add(m.provider));
        return {
            total: LLM_MODELS.length,
            providers: provs.size,
            free: LLM_MODELS.filter(m => m.freeTier === "free" || m.inputCostPerM === 0).length,
            reasoning: LLM_MODELS.filter(m => m.capabilities.includes("Reasoning")).length,
            multimodal: LLM_MODELS.filter(m => m.modalities.length > 1).length,
        };
    }, []);

    // ── Reset all filters
    const resetFilters = () => {
        setSearch("");
        setProviderFilter("all");
        setFreeTierFilter("all");
        setMaxInputCost("");
        setMaxOutputCost("");
        setMinContext("");
        setSelectedCaps(new Set());
        setCreditCardFilter("all");
        setOpenAICompatFilter(false);
        setOpenWeightsFilter(false);
        setSelectedBestFor(new Set());
        setShowBookmarksOnly(false);
    };

    // ── Toggle compare
    const toggleCompare = (id: string) => {
        setCompareIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else if (next.size < 4) next.add(id);
            return next;
        });
    };

    const compareModels = useMemo(() =>
        LLM_MODELS.filter(m => compareIds.has(m.id)),
        [compareIds]
    );

    const toggleCap = (cap: string) => {
        setSelectedCaps(prev => {
            const next = new Set(prev);
            if (next.has(cap)) next.delete(cap);
            else next.add(cap);
            return next;
        });
    };

    const toggleBestFor = (bf: string) => {
        setSelectedBestFor(prev => {
            const next = new Set(prev);
            if (next.has(bf)) next.delete(bf);
            else next.add(bf);
            return next;
        });
    };

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    /* ── Styles ── */
    const s = {
        statsCard: {
            padding: "1rem 1.25rem",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-color)",
            textAlign: "center" as const,
        },
        statsNumber: {
            fontSize: "2rem",
            fontWeight: "bold" as const,
            fontFamily: "var(--font-mono)",
            color: "var(--accent-primary)",
            lineHeight: 1.1,
        },
        statsLabel: {
            fontSize: "0.7rem",
            color: "var(--text-secondary)",
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            marginTop: "0.25rem",
        },
        filterSection: {
            padding: "1.75rem",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-color)",
            marginBottom: "1.5rem",
        },
        filterLabel: {
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            textTransform: "uppercase" as const,
            letterSpacing: "0.05em",
            marginBottom: "0.4rem",
            display: "block" as const,
            fontWeight: 600 as const,
        },
        input: {
            width: "100%",
            padding: "0.6rem 0.85rem",
            backgroundColor: "var(--bg-tertiary)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-primary)",
            fontSize: "0.875rem",
            outline: "none",
        },
        select: {
            width: "100%",
            padding: "0.6rem 0.85rem",
            backgroundColor: "var(--bg-tertiary)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-primary)",
            fontSize: "0.875rem",
            outline: "none",
            cursor: "pointer",
        },
        chip: (active: boolean) => ({
            display: "inline-flex",
            alignItems: "center" as const,
            gap: "0.3rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.75rem",
            fontWeight: 500 as const,
            cursor: "pointer",
            border: active ? "1px solid var(--accent-primary)" : "1px solid var(--border-color)",
            backgroundColor: active ? "rgba(16, 185, 129, 0.15)" : "var(--bg-tertiary)",
            color: active ? "var(--accent-primary)" : "var(--text-secondary)",
            transition: "all 0.15s ease",
            userSelect: "none" as const,
        }),
        capBadge: {
            display: "inline-block",
            padding: "0.15rem 0.45rem",
            borderRadius: "4px",
            fontSize: "0.65rem",
            fontWeight: 500 as const,
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            color: "var(--accent-primary)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            whiteSpace: "nowrap" as const,
        },
    };

    /* ── FAQs ── */
    const faqs = [
        {
            question: "How do I choose the best free LLM API for my project?",
            answer: "If you prioritize generation speed and OpenAI SDK drop-in compatibility, Groq Cloud (Llama 3.3 70B at 250+ tokens/sec) is the best starting choice. If you require large context windows and multimodal inputs (PDFs, video, audio), Google AI Studio (Gemini 2.0 Flash with 1M context and 1,500 free daily requests) is the top recommendation. If you want to experiment across dozens of models without changing client code, OpenRouter's free routes provide the highest flexibility."
        },
        {
            question: "What does OpenAI-compatible API mean?",
            answer: "An OpenAI-compatible API adheres to the standard schema of OpenAI's /chat/completions endpoint. This means you can install the official `openai` library in Python or TypeScript, configure the `base_url` to point to Groq, OpenRouter, or Mistral, and keep the exact same function calling, streaming, and prompt syntax without rewriting your application code."
        },
        {
            question: "Can I use free LLM API tiers in production software?",
            answer: "Free tiers are built primarily for development, sandbox experimentation, and low-volume side projects. Because free tiers typically enforce rate limits between 15 to 30 requests per minute and occasionally permit provider data logging for model training, production systems handling sustained customer queries should budget for pay-as-you-go paid endpoints."
        },
        {
            question: "What is the difference between Open Weights and Closed Source models?",
            answer: "Open Weights models (like Meta's Llama 3.3, Mistral 7B, and DeepSeek R1) release their mathematical weights publicly, meaning you can self-host them locally on your own GPUs (e.g. using Ollama or vLLM) or use hosted inference providers. Closed Source models (like OpenAI's GPT-4o and Anthropic's Claude 3.5 Sonnet) can only be accessed via the creator's proprietary cloud endpoints."
        },
        {
            question: "How frequently is the pricing and rate limit data updated?",
            answer: "Our directory is audited monthly against official documentation from Google AI Studio, Groq, OpenRouter, GitHub Models, OpenAI, Anthropic, Mistral, and DeepSeek. Last verification cycle: November 2026."
        },
    ];

    /* ── SEO Content ── */
    const seoContent = (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <h2>Architecture Guide: Evaluating LLM APIs for Modern AI Applications</h2>
            <p>
                In 2026, developers no longer rely on a single model provider. Production AI architectures leverage <strong>dynamic model routing</strong>: sending low-complexity tasks (classification, entity extraction, intent detection) to ultra-fast, free or penny-tier models like <strong>Gemini 2.0 Flash-Lite</strong> or <strong>Groq Llama 3.1 8B</strong>, while reserving heavy reasoning and agent loops for frontier models like <strong>Claude 3.5 Sonnet</strong> or <strong>DeepSeek R1</strong>.
            </p>

            <h3>The Three Tiers of LLM API Access</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "0.5rem" }}>
                <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                    <h4 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>1. Permanent Free Tiers</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                        Providers like Google AI Studio (1,500 req/day) and Groq Cloud (14,400 req/day) maintain permanent free quotas without requiring credit cards.
                    </p>
                </div>
                <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                    <h4 style={{ color: "#3B82F6", marginBottom: "0.5rem" }}>2. Prototyping Sandboxes</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                        GitHub Models allows developers to test GPT-4o, Claude 3.5 Sonnet, and o3-mini within VS Code and Codespaces for free during development.
                    </p>
                </div>
                <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                    <h4 style={{ color: "#FBBF24", marginBottom: "0.5rem" }}>3. Low-Cost Pay-As-You-Go</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                        When graduating from free limits, providers like DeepSeek ($0.14/1M) and OpenAI mini models ($0.15/1M) offer enterprise stability at negligible cost.
                    </p>
                </div>
            </div>

            <h3>Key Evaluation Metrics for Builders</h3>
            <ul>
                <li><strong>Time to First Token (TTFT):</strong> Critical for conversational chat and interactive agent interfaces. LPU architectures (Groq) achieve TTFT under 150ms.</li>
                <li><strong>Tokens Per Second (t/s):</strong> Throughput rate. Groq and Cerebras lead with 250–2,000 t/s, dramatically reducing latency on multi-step reasoning chains.</li>
                <li><strong>Context Window Recall:</strong> Models with large contexts (1M–2M on Gemini) are ideal for RAG document stores, whole-repo codebase analysis, and audio/video processing.</li>
                <li><strong>Structured Outputs &amp; Tool Calling:</strong> Guaranteed JSON schemas and reliable function-call execution are essential for autonomous agent workflows.</li>
            </ul>

            <h3>Explore Related AI Utilities</h3>
            <ul>
                <li><Link href="/guides/best-free-llm-apis" style={{ color: "var(--accent-primary)" }}>Best Free LLM APIs (2026 Editorial Review)</Link> — Detailed guide on limits, setup, and key management</li>
                <li><Link href="/ai-tools/llm-cost-calculator" style={{ color: "var(--accent-primary)" }}>LLM Cost Calculator</Link> — Project monthly inference bills under custom traffic loads</li>
                <li><Link href="/ai-tools/token-calculator" style={{ color: "var(--accent-primary)" }}>Token Calculator</Link> — Estimate token counts for English, code, JSON, and markdown</li>
                <li><Link href="/ai-tools/llm-apis" style={{ color: "var(--accent-primary)" }}>LLM API Provider Directory</Link> — Directory of inference providers and endpoints</li>
            </ul>
        </div>
    );

    return (
        <AIToolLayout
            title="AI Model Explorer: LLM Pricing & Comparison"
            description="Browse, filter, and compare 55+ AI models and LLM APIs with real-time token pricing, context windows, speed benchmarks, and free tier limits."
            slug="ai-model-explorer"
            faqs={faqs}
            seoContent={seoContent}
        >
            {/* ─── Top Stats & Currency Header ─── */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                    gap: "0.75rem",
                    flex: "1 1 500px",
                }}>
                    {[
                        { n: stats.total, label: "Models" },
                        { n: stats.providers, label: "Providers" },
                        { n: stats.free, label: "Free Tiers" },
                        { n: stats.reasoning, label: "Reasoning" },
                        { n: stats.multimodal, label: "Multimodal" },
                    ].map((s_, i) => (
                        <div key={i} style={s.statsCard}>
                            <div style={s.statsNumber}>{s_.n}</div>
                            <div style={s.statsLabel}>{s_.label}</div>
                        </div>
                    ))}
                </div>

                {/* Currency Switcher */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "var(--bg-secondary)",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-color)",
                }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Currency:</span>
                    <button
                        onClick={() => setCurrency("USD")}
                        style={{
                            padding: "0.25rem 0.6rem",
                            borderRadius: "4px",
                            border: "none",
                            backgroundColor: currency === "USD" ? "var(--accent-primary)" : "transparent",
                            color: currency === "USD" ? "#0F1115" : "var(--text-secondary)",
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            cursor: "pointer",
                        }}
                    >
                        USD ($)
                    </button>
                    <button
                        onClick={() => setCurrency("INR")}
                        style={{
                            padding: "0.25rem 0.6rem",
                            borderRadius: "4px",
                            border: "none",
                            backgroundColor: currency === "INR" ? "var(--accent-primary)" : "transparent",
                            color: currency === "INR" ? "#0F1115" : "var(--text-secondary)",
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            cursor: "pointer",
                        }}
                    >
                        INR (₹)
                    </button>
                </div>
            </div>

            {/* ─── Search + Primary Filter Dashboard ─── */}
            <div style={s.filterSection}>
                {/* Search, Sort, Provider, Tier */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                }}>
                    {/* Search */}
                    <div>
                        <label style={s.filterLabel}>Search Models / Providers</label>
                        <input
                            type="text"
                            placeholder="Search models, providers, families (e.g. Llama, Gemini)..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={s.input}
                        />
                    </div>

                    {/* Sort */}
                    <div>
                        <label style={s.filterLabel}>Sort By</label>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <select
                                value={sortKey}
                                onChange={e => setSortKey(e.target.value as SortKey)}
                                style={{ ...s.select, flex: 1 }}
                            >
                                <option value="name">Model Name</option>
                                <option value="inputCost">Input Cost / 1M</option>
                                <option value="outputCost">Output Cost / 1M</option>
                                <option value="context">Context Window</option>
                                <option value="provider">Provider Name</option>
                            </select>
                            <button
                                onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
                                style={{
                                    ...s.select,
                                    width: "42px",
                                    flex: "none",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                                title={sortDir === "asc" ? "Ascending order" : "Descending order"}
                            >
                                {sortDir === "asc" ? "↑" : "↓"}
                            </button>
                        </div>
                    </div>

                    {/* Provider */}
                    <div>
                        <label style={s.filterLabel}>Inference Provider</label>
                        <select
                            value={providerFilter}
                            onChange={e => setProviderFilter(e.target.value)}
                            style={s.select}
                        >
                            <option value="all">All Providers ({allProviders.length})</option>
                            {allProviders.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    {/* Pricing Tier */}
                    <div>
                        <label style={s.filterLabel}>Pricing Access Tier</label>
                        <select
                            value={freeTierFilter}
                            onChange={e => setFreeTierFilter(e.target.value)}
                            style={s.select}
                        >
                            {FREE_TIER_OPTIONS.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Quantitative Thresholds Row */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                }}>
                    <div>
                        <label style={s.filterLabel}>Max Input Cost ({currency === "INR" ? "₹" : "$"} / 1M)</label>
                        <input
                            type="number"
                            placeholder={currency === "INR" ? "e.g. 50" : "e.g. 0.50"}
                            value={maxInputCost}
                            onChange={e => setMaxInputCost(e.target.value)}
                            style={s.input}
                            min="0"
                            step={currency === "INR" ? "10" : "0.1"}
                        />
                    </div>
                    <div>
                        <label style={s.filterLabel}>Max Output Cost ({currency === "INR" ? "₹" : "$"} / 1M)</label>
                        <input
                            type="number"
                            placeholder={currency === "INR" ? "e.g. 200" : "e.g. 2.00"}
                            value={maxOutputCost}
                            onChange={e => setMaxOutputCost(e.target.value)}
                            style={s.input}
                            min="0"
                            step={currency === "INR" ? "10" : "0.1"}
                        />
                    </div>
                    <div>
                        <label style={s.filterLabel}>Min Context Window</label>
                        <input
                            type="number"
                            placeholder="e.g. 128000 (128K)"
                            value={minContext}
                            onChange={e => setMinContext(e.target.value)}
                            style={s.input}
                            min="0"
                            step="16000"
                        />
                    </div>
                    <div>
                        <label style={s.filterLabel}>Payment / Credit Card</label>
                        <select
                            value={creditCardFilter}
                            onChange={e => setCreditCardFilter(e.target.value as "all" | "no" | "yes")}
                            style={s.select}
                        >
                            <option value="all">Any Payment Terms</option>
                            <option value="no">No Credit Card Required (True Free)</option>
                            <option value="yes">Credit Card Required</option>
                        </select>
                    </div>
                </div>

                {/* Capabilities Chips */}
                <div style={{ marginBottom: "1rem" }}>
                    <label style={s.filterLabel}>Filter by Capabilities</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {ALL_CAPABILITIES.map(cap => (
                            <span
                                key={cap}
                                onClick={() => toggleCap(cap)}
                                style={s.chip(selectedCaps.has(cap))}
                            >
                                {selectedCaps.has(cap) ? "✓ " : "+ "}{cap}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Best For Chips */}
                <div style={{ marginBottom: "1.25rem" }}>
                    <label style={s.filterLabel}>Filter by Recommended Use Case</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {ALL_BEST_FOR.map(bf => (
                            <span
                                key={bf}
                                onClick={() => toggleBestFor(bf)}
                                style={s.chip(selectedBestFor.has(bf))}
                            >
                                {selectedBestFor.has(bf) ? "✓ " : "+ "}{bf}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Checkbox Quick Filters */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    paddingTop: "1rem",
                    borderTop: "1px dashed var(--border-color)",
                }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={openAICompatFilter}
                            onChange={e => setOpenAICompatFilter(e.target.checked)}
                            style={{ accentColor: "var(--accent-primary)", width: "16px", height: "16px" }}
                        />
                        <span>OpenAI SDK Compatible (Drop-in endpoint)</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={openWeightsFilter}
                            onChange={e => setOpenWeightsFilter(e.target.checked)}
                            style={{ accentColor: "var(--accent-primary)", width: "16px", height: "16px" }}
                        />
                        <span>Open Weights Only (Meta, Mistral, Qwen, DeepSeek)</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={showBookmarksOnly}
                            onChange={e => setShowBookmarksOnly(e.target.checked)}
                            style={{ accentColor: "var(--accent-primary)", width: "16px", height: "16px" }}
                        />
                        <span style={{ color: bookmarks.size > 0 ? "#FBBF24" : "var(--text-secondary)" }}>
                            ★ Bookmarked Models ({bookmarks.size})
                        </span>
                    </label>
                </div>
            </div>

            {/* ─── Column Visibility Controls (Reference Image Feature) ─── */}
            <div style={{
                padding: "0.75rem 1.25rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-color)",
                marginBottom: "1.5rem",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.8rem",
            }}>
                <span style={{ color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.05em", fontWeight: 600 }}>
                    Columns:
                </span>
                {(
                    [
                        { key: "provider", label: "Provider" },
                        { key: "family", label: "Family" },
                        { key: "inputCost", label: "Input Cost" },
                        { key: "outputCost", label: "Output Cost" },
                        { key: "context", label: "Context" },
                        { key: "speed", label: "Speed" },
                        { key: "capabilities", label: "Capabilities" },
                        { key: "modalities", label: "Modalities" },
                    ] as { key: keyof typeof visibleCols; label: string }[]
                ).map(col => (
                    <label key={col.key} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", cursor: "pointer", color: visibleCols[col.key] ? "var(--text-primary)" : "var(--text-secondary)" }}>
                        <input
                            type="checkbox"
                            checked={visibleCols[col.key]}
                            onChange={() => toggleCol(col.key)}
                            style={{ accentColor: "var(--accent-primary)" }}
                        />
                        <span>{col.label}</span>
                    </label>
                ))}
            </div>

            {/* ─── Control Bar: Results count, Active Pills, View Toggles ─── */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "1.15rem", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                        {filteredModels.length} models
                    </span>
                    {activeFilterCount > 0 && (
                        <span style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "9999px",
                            backgroundColor: "rgba(16, 185, 129, 0.15)",
                            color: "var(--accent-primary)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                        }}>
                            {activeFilterCount} active filter{activeFilterCount !== 1 ? "s" : ""}
                        </span>
                    )}
                    {currency === "INR" && (
                        <span style={{
                            padding: "0.2rem 0.6rem",
                            borderRadius: "4px",
                            backgroundColor: "var(--bg-tertiary)",
                            color: "var(--text-secondary)",
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-mono)",
                        }}>
                            1 USD ≈ ₹{INR_RATE.toFixed(2)}
                        </span>
                    )}
                    {activeFilterCount > 0 && (
                        <button
                            onClick={resetFilters}
                            style={{
                                background: "none",
                                border: "none",
                                color: "var(--text-secondary)",
                                fontSize: "0.8rem",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Reset all
                        </button>
                    )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {/* Quick Cost Estimator toggle */}
                    <button
                        onClick={() => setShowCostEstimator(!showCostEstimator)}
                        style={{
                            padding: "0.45rem 0.85rem",
                            borderRadius: "var(--radius-sm)",
                            border: showCostEstimator ? "1px solid var(--accent-primary)" : "1px solid var(--border-color)",
                            backgroundColor: showCostEstimator ? "rgba(16, 185, 129, 0.15)" : "var(--bg-secondary)",
                            color: showCostEstimator ? "var(--accent-primary)" : "var(--text-primary)",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        💰 Token Cost Estimator
                    </button>

                    {/* Compare Button */}
                    {compareIds.size >= 2 && (
                        <button
                            onClick={() => setShowCompare(true)}
                            style={{
                                padding: "0.45rem 0.85rem",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid var(--accent-primary)",
                                backgroundColor: "var(--accent-primary)",
                                color: "#0F1115",
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            Compare Side-by-Side ({compareIds.size})
                        </button>
                    )}

                    {/* View mode toggle */}
                    <div style={{
                        display: "flex",
                        backgroundColor: "var(--bg-secondary)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                        overflow: "hidden",
                    }}>
                        {(["cards", "list", "table"] as ViewMode[]).map(v => (
                            <button
                                key={v}
                                onClick={() => setViewMode(v)}
                                style={{
                                    padding: "0.45rem 0.8rem",
                                    border: "none",
                                    backgroundColor: viewMode === v ? "rgba(16, 185, 129, 0.2)" : "transparent",
                                    color: viewMode === v ? "var(--accent-primary)" : "var(--text-secondary)",
                                    fontSize: "0.8rem",
                                    fontWeight: viewMode === v ? 700 : 500,
                                    cursor: "pointer",
                                    textTransform: "capitalize",
                                }}
                            >
                                {v === "cards" ? "Cards" : v === "list" ? "List" : "Table"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Copy Toast Notification ─── */}
            {copiedId && (
                <div style={{
                    position: "fixed",
                    bottom: "2rem",
                    right: "2rem",
                    zIndex: 2000,
                    backgroundColor: "var(--accent-primary)",
                    color: "#0F1115",
                    padding: "0.75rem 1.25rem",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                }}>
                    ✓ Copied model ID: <code>{copiedId}</code>
                </div>
            )}

            {/* ─── Monthly Cost Estimator Slider Panel ─── */}
            {showCostEstimator && (
                <div style={{
                    padding: "1.5rem",
                    backgroundColor: "var(--bg-secondary)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--accent-primary)",
                    marginBottom: "1.5rem",
                }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>💰 Real-Time Monthly Inference Cost Projector</h3>
                            <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                                Slide your estimated monthly volume to dynamically calculate what each provider will charge for your workload.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCostEstimator(false)}
                            style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "1.5rem", lineHeight: 1 }}
                        >
                            ×
                        </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: "250px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem" }}>
                                <span style={{ color: "var(--text-secondary)" }}>Monthly Total Tokens (75% input / 25% output split):</span>
                                <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)", fontWeight: "bold" }}>
                                    {monthlyTokensM} Million Tokens
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="100"
                                step="0.5"
                                value={monthlyTokensM}
                                onChange={e => setMonthlyTokensM(Number(e.target.value))}
                                style={{ width: "100%", accentColor: "var(--accent-primary)" }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Side-by-Side Comparison Modal ─── */}
            {showCompare && compareModels.length >= 2 && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.85)",
                    zIndex: 3000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1.5rem",
                }}>
                    <div style={{
                        backgroundColor: "var(--bg-primary)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        maxWidth: "1000px",
                        width: "100%",
                        maxHeight: "85vh",
                        overflow: "auto",
                        padding: "2rem",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Side-by-Side Model Comparison</h2>
                                <p style={{ margin: "0.25rem 0 0", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                                    Comparing {compareModels.length} models across pricing, context, architecture, and rate limits.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowCompare(false)}
                                style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "1.75rem", lineHeight: 1 }}
                            >
                                ×
                            </button>
                        </div>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-secondary)" }}>
                                        <th style={{ padding: "0.75rem 1rem", textAlign: "left", color: "var(--text-secondary)", fontWeight: 600 }}>Metric</th>
                                        {compareModels.map(m => (
                                            <th key={m.id} style={{ padding: "0.75rem 1rem", textAlign: "center", color: "var(--accent-primary)", fontWeight: 700 }}>
                                                {PROVIDER_ICONS[m.provider] || "🔹"} {m.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { label: "Provider", fn: (m: LLMModel) => m.provider },
                                        { label: "Family", fn: (m: LLMModel) => m.family },
                                        { label: `Input / 1M (${currency})`, fn: (m: LLMModel) => fmtCostVal(m.inputCostPerM, currency) },
                                        { label: `Output / 1M (${currency})`, fn: (m: LLMModel) => fmtCostVal(m.outputCostPerM, currency) },
                                        { label: "Context Window", fn: (m: LLMModel) => `${fmtContext(m.contextWindow)} tokens` },
                                        { label: "Max Output Tokens", fn: (m: LLMModel) => `${fmtContext(m.maxOutputTokens)} tokens` },
                                        { label: "Pricing Tier", fn: (m: LLMModel) => m.freeTier.toUpperCase() },
                                        { label: "Credit Card Needed", fn: (m: LLMModel) => m.creditCardRequired ? "Yes (Required)" : "No (Free to start)" },
                                        { label: "OpenAI SDK Compatible", fn: (m: LLMModel) => m.openAICompatible ? "✓ Yes" : "✗ Proprietary" },
                                        { label: "Open Weights", fn: (m: LLMModel) => m.openWeights ? "✓ Yes (Self-hostable)" : "✗ Closed API" },
                                        { label: "Data Training Policy", fn: (m: LLMModel) => m.dataTraining === "no" ? "Zero training (Private)" : m.dataTraining === "opt-out" ? "Opt-out available" : "Trains on prompts" },
                                        { label: "Inference Speed Tier", fn: (m: LLMModel) => SPEED_LABELS[m.speedTier] || m.speedTier },
                                        { label: "Free Tier Rate Limits", fn: (m: LLMModel) => (m.rpm || m.rpd) ? `${m.rpm ? `${m.rpm} RPM` : ""}${m.rpd ? ` · ${m.rpd} RPD` : ""}` : "Per-account tier" },
                                        { label: "Supported Modalities", fn: (m: LLMModel) => m.modalities.join(", ") },
                                        { label: "Key Capabilities", fn: (m: LLMModel) => m.capabilities.join(", ") },
                                        { label: "Best Recommended For", fn: (m: LLMModel) => m.bestFor.join(", ") },
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                            <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-secondary)" }}>{row.label}</td>
                                            {compareModels.map(m => (
                                                <td key={m.id} style={{ padding: "0.75rem 1rem", textAlign: "center", color: "var(--text-primary)" }}>
                                                    {row.fn(m)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <button
                                onClick={() => { setCompareIds(new Set()); setShowCompare(false); }}
                                style={{
                                    padding: "0.5rem 1.25rem",
                                    borderRadius: "var(--radius-sm)",
                                    border: "1px solid var(--border-color)",
                                    backgroundColor: "transparent",
                                    color: "var(--text-secondary)",
                                    cursor: "pointer",
                                    fontSize: "0.85rem",
                                }}
                            >
                                Clear Selection
                            </button>
                            <button
                                onClick={() => setShowCompare(false)}
                                style={{
                                    padding: "0.5rem 1.5rem",
                                    borderRadius: "var(--radius-sm)",
                                    border: "none",
                                    backgroundColor: "var(--accent-primary)",
                                    color: "#0F1115",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    fontSize: "0.85rem",
                                }}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Model Views ─── */}
            {filteredModels.length === 0 ? (
                <div style={{
                    padding: "4rem 2rem",
                    textAlign: "center",
                    backgroundColor: "var(--bg-secondary)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                    <h3 style={{ marginBottom: "0.5rem" }}>No LLM models match your filter criteria</h3>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                        Try clearing active filters or broadening your search keywords.
                    </p>
                    <button
                        onClick={resetFilters}
                        style={{
                            padding: "0.6rem 1.5rem",
                            borderRadius: "var(--radius-sm)",
                            border: "none",
                            backgroundColor: "var(--accent-primary)",
                            color: "#0F1115",
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        Reset All Filters
                    </button>
                </div>
            ) : viewMode === "table" ? (
                /* ─── DENSE TABLE VIEW ─── */
                <div style={{ overflowX: "auto", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.825rem" }}>
                        <thead>
                            <tr style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                                <th style={{ padding: "0.75rem 0.5rem", textAlign: "center", width: "36px" }}>
                                    <span title="Add to comparison" style={{ cursor: "default" }}>⚖</span>
                                </th>
                                <th style={{ padding: "0.75rem 0.5rem", textAlign: "center", width: "36px" }}>
                                    <span title="Bookmark" style={{ cursor: "default" }}>★</span>
                                </th>
                                <th
                                    onClick={() => handleSort("name")}
                                    style={{
                                        padding: "0.75rem 0.75rem",
                                        textAlign: "left",
                                        color: sortKey === "name" ? "var(--accent-primary)" : "var(--text-secondary)",
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        userSelect: "none",
                                    }}
                                >
                                    Model {sortKey === "name" && (sortDir === "asc" ? "↑" : "↓")}
                                </th>
                                {visibleCols.provider && (
                                    <th
                                        onClick={() => handleSort("provider")}
                                        style={{
                                            padding: "0.75rem 0.75rem",
                                            textAlign: "left",
                                            color: sortKey === "provider" ? "var(--accent-primary)" : "var(--text-secondary)",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            userSelect: "none",
                                        }}
                                    >
                                        Provider {sortKey === "provider" && (sortDir === "asc" ? "↑" : "↓")}
                                    </th>
                                )}
                                {visibleCols.family && (
                                    <th style={{ padding: "0.75rem 0.5rem", textAlign: "left", color: "var(--text-secondary)", fontWeight: 600 }}>Family</th>
                                )}
                                {visibleCols.inputCost && (
                                    <th
                                        onClick={() => handleSort("inputCost")}
                                        style={{
                                            padding: "0.75rem 0.75rem",
                                            textAlign: "left",
                                            color: sortKey === "inputCost" ? "var(--accent-primary)" : "var(--text-secondary)",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            userSelect: "none",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Input / 1M {sortKey === "inputCost" && (sortDir === "asc" ? "↑" : "↓")}
                                    </th>
                                )}
                                {visibleCols.outputCost && (
                                    <th
                                        onClick={() => handleSort("outputCost")}
                                        style={{
                                            padding: "0.75rem 0.75rem",
                                            textAlign: "left",
                                            color: sortKey === "outputCost" ? "var(--accent-primary)" : "var(--text-secondary)",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            userSelect: "none",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Output / 1M {sortKey === "outputCost" && (sortDir === "asc" ? "↑" : "↓")}
                                    </th>
                                )}
                                {visibleCols.context && (
                                    <th
                                        onClick={() => handleSort("context")}
                                        style={{
                                            padding: "0.75rem 0.75rem",
                                            textAlign: "left",
                                            color: sortKey === "context" ? "var(--accent-primary)" : "var(--text-secondary)",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            userSelect: "none",
                                        }}
                                    >
                                        Context {sortKey === "context" && (sortDir === "asc" ? "↑" : "↓")}
                                    </th>
                                )}
                                {visibleCols.speed && (
                                    <th style={{ padding: "0.75rem 0.5rem", textAlign: "left", color: "var(--text-secondary)", fontWeight: 600 }}>Speed</th>
                                )}
                                {visibleCols.capabilities && (
                                    <th style={{ padding: "0.75rem 0.5rem", textAlign: "left", color: "var(--text-secondary)", fontWeight: 600 }}>Capabilities</th>
                                )}
                                {visibleCols.modalities && (
                                    <th style={{ padding: "0.75rem 0.5rem", textAlign: "left", color: "var(--text-secondary)", fontWeight: 600 }}>Modalities</th>
                                )}
                                {showCostEstimator && (
                                    <th style={{ padding: "0.75rem 0.75rem", textAlign: "right", color: "var(--accent-primary)", fontWeight: 600, whiteSpace: "nowrap" }}>
                                        Est. /mo ({monthlyTokensM}M)
                                    </th>
                                )}
                                {visibleCols.actions && (
                                    <th style={{ padding: "0.75rem 0.75rem", textAlign: "right", color: "var(--text-secondary)", fontWeight: 600 }}>Docs</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredModels.map(m => {
                                const isFree = m.inputCostPerM === 0 && m.outputCostPerM === 0;
                                const isCompared = compareIds.has(m.id);
                                // Estimator calc: 75% input, 25% output
                                const estCost = (monthlyTokensM * 0.75 * m.inputCostPerM) + (monthlyTokensM * 0.25 * m.outputCostPerM);

                                return (
                                    <tr
                                        key={m.id}
                                        style={{
                                            borderBottom: "1px solid var(--border-color)",
                                            backgroundColor: isCompared ? "rgba(16, 185, 129, 0.05)" : "transparent",
                                            transition: "background-color 0.15s",
                                        }}
                                    >
                                        {/* Compare Checkbox */}
                                        <td style={{ padding: "0.6rem 0.5rem", textAlign: "center" }}>
                                            <input
                                                type="checkbox"
                                                checked={isCompared}
                                                onChange={() => toggleCompare(m.id)}
                                                style={{ accentColor: "var(--accent-primary)", cursor: "pointer" }}
                                                title="Add to comparison"
                                            />
                                        </td>

                                        {/* Bookmark */}
                                        <td style={{ padding: "0.6rem 0.5rem", textAlign: "center" }}>
                                            <span
                                                onClick={() => toggleBookmark(m.id)}
                                                style={{ cursor: "pointer", color: bookmarks.has(m.id) ? "#FBBF24" : "var(--text-secondary)", fontSize: "1.1rem" }}
                                                title={bookmarks.has(m.id) ? "Remove bookmark" : "Bookmark this model"}
                                            >
                                                {bookmarks.has(m.id) ? "★" : "☆"}
                                            </span>
                                        </td>

                                        {/* Model Name & ID */}
                                        <td style={{ padding: "0.6rem 0.75rem" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                <span style={{ fontSize: "1.1rem" }}>{PROVIDER_ICONS[m.provider] || "🔹"}</span>
                                                <div>
                                                    <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{m.name}</div>
                                                    <div
                                                        onClick={() => handleCopyId(m.id)}
                                                        style={{
                                                            fontSize: "0.7rem",
                                                            color: "var(--text-secondary)",
                                                            fontFamily: "var(--font-mono)",
                                                            cursor: "pointer",
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: "0.25rem",
                                                        }}
                                                        title="Click to copy model identifier"
                                                    >
                                                        <code>{m.id}</code>
                                                        <span style={{ fontSize: "0.65rem", opacity: 0.6 }}>📋</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Provider */}
                                        {visibleCols.provider && (
                                            <td style={{ padding: "0.6rem 0.75rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                                                {m.provider}
                                            </td>
                                        )}

                                        {/* Family */}
                                        {visibleCols.family && (
                                            <td style={{ padding: "0.6rem 0.5rem", color: "var(--text-secondary)", fontSize: "0.75rem" }}>
                                                {m.family}
                                            </td>
                                        )}

                                        {/* Input Cost */}
                                        {visibleCols.inputCost && (
                                            <td style={{
                                                padding: "0.6rem 0.75rem",
                                                fontFamily: "var(--font-mono)",
                                                fontWeight: 600,
                                                color: isFree ? "var(--accent-primary)" : "var(--text-primary)",
                                                whiteSpace: "nowrap",
                                            }}>
                                                {fmtCostVal(m.inputCostPerM, currency)}
                                            </td>
                                        )}

                                        {/* Output Cost */}
                                        {visibleCols.outputCost && (
                                            <td style={{
                                                padding: "0.6rem 0.75rem",
                                                fontFamily: "var(--font-mono)",
                                                fontWeight: 600,
                                                color: isFree ? "var(--accent-primary)" : "var(--text-primary)",
                                                whiteSpace: "nowrap",
                                            }}>
                                                {fmtCostVal(m.outputCostPerM, currency)}
                                            </td>
                                        )}

                                        {/* Context */}
                                        {visibleCols.context && (
                                            <td style={{ padding: "0.6rem 0.75rem", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                                                {fmtContext(m.contextWindow)}
                                            </td>
                                        )}

                                        {/* Speed */}
                                        {visibleCols.speed && (
                                            <td style={{ padding: "0.6rem 0.5rem", whiteSpace: "nowrap" }}>
                                                <span style={{ color: SPEED_COLORS[m.speedTier], fontSize: "0.75rem" }}>
                                                    {SPEED_LABELS[m.speedTier].split(" ")[0]} {m.speedTier}
                                                </span>
                                            </td>
                                        )}

                                        {/* Capabilities */}
                                        {visibleCols.capabilities && (
                                            <td style={{ padding: "0.6rem 0.5rem" }}>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                                                    {m.capabilities.slice(0, 2).map(c => (
                                                        <span key={c} style={s.capBadge}>{c}</span>
                                                    ))}
                                                    {m.capabilities.length > 2 && (
                                                        <span style={{ ...s.capBadge, backgroundColor: "transparent", border: "none", color: "var(--text-secondary)" }}>
                                                            +{m.capabilities.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        )}

                                        {/* Modalities */}
                                        {visibleCols.modalities && (
                                            <td style={{ padding: "0.6rem 0.5rem", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                                                {m.modalities.join(", ")}
                                            </td>
                                        )}

                                        {/* Cost Estimator Result */}
                                        {showCostEstimator && (
                                            <td style={{
                                                padding: "0.6rem 0.75rem",
                                                textAlign: "right",
                                                fontFamily: "var(--font-mono)",
                                                fontWeight: 700,
                                                color: estCost === 0 ? "var(--accent-primary)" : "var(--text-primary)",
                                            }}>
                                                {estCost === 0 ? "Free" : fmtCostVal(estCost, currency)}
                                            </td>
                                        )}

                                        {/* Actions */}
                                        {visibleCols.actions && (
                                            <td style={{ padding: "0.6rem 0.75rem", textAlign: "right" }}>
                                                <a
                                                    href={m.apiDocsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: "var(--accent-primary)",
                                                        textDecoration: "none",
                                                        fontSize: "0.8rem",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    API Docs ↗
                                                </a>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : viewMode === "list" ? (
                /* ─── LIST VIEW ─── */
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {filteredModels.map(m => {
                        const isFree = m.inputCostPerM === 0 && m.outputCostPerM === 0;
                        const isCompared = compareIds.has(m.id);
                        const estCost = (monthlyTokensM * 0.75 * m.inputCostPerM) + (monthlyTokensM * 0.25 * m.outputCostPerM);

                        return (
                            <div
                                key={m.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1.25rem",
                                    padding: "1rem 1.25rem",
                                    backgroundColor: isCompared ? "rgba(16, 185, 129, 0.05)" : "var(--bg-secondary)",
                                    borderRadius: "var(--radius-sm)",
                                    border: isCompared ? "1px solid var(--accent-primary)" : "1px solid var(--border-color)",
                                    flexWrap: "wrap",
                                }}
                            >
                                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                    <input
                                        type="checkbox"
                                        checked={isCompared}
                                        onChange={() => toggleCompare(m.id)}
                                        style={{ accentColor: "var(--accent-primary)", cursor: "pointer" }}
                                    />
                                    <span
                                        onClick={() => toggleBookmark(m.id)}
                                        style={{ cursor: "pointer", color: bookmarks.has(m.id) ? "#FBBF24" : "var(--text-secondary)", fontSize: "1.1rem" }}
                                    >
                                        {bookmarks.has(m.id) ? "★" : "☆"}
                                    </span>
                                </div>

                                <div style={{ flex: "1 1 220px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <span>{PROVIDER_ICONS[m.provider] || "🔹"}</span>
                                        <div style={{ fontWeight: 600, fontSize: "1rem" }}>{m.name}</div>
                                    </div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                                        {m.provider} · {m.family} · <code>{m.id}</code>
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                                    <div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Input</div>
                                        <div style={{ color: isFree ? "var(--accent-primary)" : "var(--text-primary)", fontWeight: 700 }}>
                                            {fmtCostVal(m.inputCostPerM, currency)}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Output</div>
                                        <div style={{ color: isFree ? "var(--accent-primary)" : "var(--text-primary)", fontWeight: 700 }}>
                                            {fmtCostVal(m.outputCostPerM, currency)}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Context</div>
                                        <div style={{ fontWeight: 700 }}>{fmtContext(m.contextWindow)}</div>
                                    </div>
                                </div>

                                <span style={{ color: SPEED_COLORS[m.speedTier], fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                                    {SPEED_LABELS[m.speedTier]}
                                </span>

                                <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                                    {m.capabilities.slice(0, 3).map(c => (
                                        <span key={c} style={s.capBadge}>{c}</span>
                                    ))}
                                </div>

                                {showCostEstimator && (
                                    <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.9rem", color: estCost === 0 ? "var(--accent-primary)" : "var(--text-primary)" }}>
                                        {estCost === 0 ? "Free" : `${fmtCostVal(estCost, currency)}/mo`}
                                    </div>
                                )}

                                <a
                                    href={m.apiDocsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                    style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}
                                >
                                    API Docs ↗
                                </a>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* ─── CARDS GRID VIEW ─── */
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
                    gap: "1.25rem",
                }}>
                    {filteredModels.map(m => {
                        const isFree = m.inputCostPerM === 0 && m.outputCostPerM === 0;
                        const isCompared = compareIds.has(m.id);
                        const estCost = (monthlyTokensM * 0.75 * m.inputCostPerM) + (monthlyTokensM * 0.25 * m.outputCostPerM);

                        return (
                            <div
                                key={m.id}
                                style={{
                                    padding: "1.5rem",
                                    backgroundColor: isCompared ? "rgba(16, 185, 129, 0.05)" : "var(--bg-secondary)",
                                    borderRadius: "var(--radius-md)",
                                    border: isCompared ? "1px solid var(--accent-primary)" : "1px solid var(--border-color)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                                        <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{PROVIDER_ICONS[m.provider] || "🔹"}</span>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{m.name}</h3>
                                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                                                {m.provider} · {m.family}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                        <span
                                            onClick={() => toggleBookmark(m.id)}
                                            style={{ cursor: "pointer", color: bookmarks.has(m.id) ? "#FBBF24" : "var(--text-secondary)", fontSize: "1.2rem" }}
                                            title={bookmarks.has(m.id) ? "Remove bookmark" : "Bookmark"}
                                        >
                                            {bookmarks.has(m.id) ? "★" : "☆"}
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={isCompared}
                                            onChange={() => toggleCompare(m.id)}
                                            style={{ accentColor: "var(--accent-primary)", cursor: "pointer" }}
                                            title="Add to comparison"
                                        />
                                    </div>
                                </div>

                                <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                                    {m.description}
                                </p>

                                {/* Cost Metrics Grid */}
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: "0.5rem",
                                }}>
                                    <div style={{ padding: "0.6rem 0.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                        <div style={{ fontSize: "0.6rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Input / 1M</div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.95rem", color: isFree ? "var(--accent-primary)" : "var(--text-primary)" }}>
                                            {fmtCostVal(m.inputCostPerM, currency)}
                                        </div>
                                    </div>
                                    <div style={{ padding: "0.6rem 0.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                        <div style={{ fontSize: "0.6rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Output / 1M</div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.95rem", color: isFree ? "var(--accent-primary)" : "var(--text-primary)" }}>
                                            {fmtCostVal(m.outputCostPerM, currency)}
                                        </div>
                                    </div>
                                    <div style={{ padding: "0.6rem 0.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                        <div style={{ fontSize: "0.6rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Context</div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.95rem" }}>
                                            {fmtContext(m.contextWindow)}
                                        </div>
                                    </div>
                                </div>

                                {/* Meta Tag Row */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", fontSize: "0.75rem" }}>
                                    <span style={{
                                        padding: "0.2rem 0.5rem",
                                        borderRadius: "4px",
                                        backgroundColor: m.freeTier === "free" ? "rgba(16, 185, 129, 0.15)" : m.freeTier === "freemium" ? "rgba(59, 130, 246, 0.15)" : m.freeTier === "trial" ? "rgba(251, 191, 36, 0.15)" : "rgba(107, 114, 128, 0.15)",
                                        color: m.freeTier === "free" ? "#10B981" : m.freeTier === "freemium" ? "#3B82F6" : m.freeTier === "trial" ? "#FBBF24" : "#9CA3AF",
                                        fontWeight: 700,
                                        textTransform: "capitalize",
                                    }}>
                                        {m.freeTier}
                                    </span>
                                    <span style={{ color: SPEED_COLORS[m.speedTier] }}>
                                        {SPEED_LABELS[m.speedTier]}
                                    </span>
                                    {m.openAICompatible && (
                                        <span style={{ color: "#3B82F6" }}>OpenAI SDK ✓</span>
                                    )}
                                    {m.openWeights && (
                                        <span style={{ color: "#A78BFA" }}>Open Weights</span>
                                    )}
                                    {!m.creditCardRequired && m.freeTier !== "paid" && (
                                        <span style={{ color: "var(--accent-primary)" }}>No CC</span>
                                    )}
                                </div>

                                {/* Rate limits */}
                                {(m.rpm || m.rpd) && (
                                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                                        {m.rpm && <span>{m.rpm} RPM</span>}
                                        {m.rpd && <span>{m.rpd.toLocaleString()} RPD</span>}
                                        <span>Max {fmtContext(m.maxOutputTokens)} out</span>
                                    </div>
                                )}

                                {/* Capabilities */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                                    {m.capabilities.map(c => (
                                        <span key={c} style={s.capBadge}>{c}</span>
                                    ))}
                                </div>

                                {/* Best For */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                                    {m.bestFor.map(bf => (
                                        <span key={bf} style={{
                                            padding: "0.15rem 0.45rem",
                                            borderRadius: "4px",
                                            fontSize: "0.65rem",
                                            backgroundColor: "rgba(139, 92, 246, 0.1)",
                                            color: "#A78BFA",
                                            border: "1px solid rgba(139, 92, 246, 0.2)",
                                        }}>
                                            {bf}
                                        </span>
                                    ))}
                                </div>

                                {/* Estimator Output */}
                                {showCostEstimator && (
                                    <div style={{
                                        padding: "0.5rem 0.75rem",
                                        backgroundColor: "var(--bg-tertiary)",
                                        borderRadius: "var(--radius-sm)",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}>
                                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                                            Est. {monthlyTokensM}M tokens/mo:
                                        </span>
                                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: estCost === 0 ? "var(--accent-primary)" : "var(--text-primary)" }}>
                                            {estCost === 0 ? "Free" : fmtCostVal(estCost, currency)}
                                        </span>
                                    </div>
                                )}

                                {/* Card Footer */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)" }}>
                                    <span
                                        onClick={() => handleCopyId(m.id)}
                                        style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", cursor: "pointer" }}
                                        title="Click to copy model ID"
                                    >
                                        <code>{m.id}</code> 📋
                                    </span>
                                    <a
                                        href={m.apiDocsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            fontSize: "0.825rem",
                                            color: "var(--accent-primary)",
                                            fontWeight: 600,
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "0.25rem",
                                        }}
                                    >
                                        API Docs ↗
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </AIToolLayout>
    );
}
