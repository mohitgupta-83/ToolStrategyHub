import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
    title: "AI Developer Tools & Calculators Ecosystem",
    description: "Free browser-side calculators and resources for AI developers, LLM builders, RAG engineers, and autonomous agent creators.",
    path: "/ai-tools",
    keywords: ["AI tools for developers", "LLM calculators", "context window tracker", "VRAM estimator", "AI agent pricing model"]
});

export default function AIToolsHubPage() {
    const faqs = [
        {
            question: "Are these AI developer tools free to use?",
            answer: "Yes, all our calculators run 100% locally in your web browser. We do not make external API requests or collect any text or parameters you input. They are entirely free and private."
        },
        {
            question: "How does the Token Calculator estimate token count?",
            answer: "The Token Calculator uses statistical averages based on character and word count ratios for different text types (English, technical text, JSON, markdown, and programming code) to estimate LLM token footprints."
        },
        {
            question: "What is the context window gauge?",
            answer: "The context window gauge is a visual indicator that measures how much memory a prompt, system message, history, and target output occupy relative to a specific model's context capacity, alerting you before you hit context overflows."
        },
        {
            question: "How do you calculate local LLM VRAM requirements?",
            answer: "We combine the model size (in billions of parameters), the bits-per-parameter (quantization level), and the KV cache memory size (dictated by context length and batch size) to estimate the VRAM needed to host the weights."
        }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": "AI Developer Tools & Calculators",
                "description": "A comprehensive directory of free token calculators, LLM cost estimators, context window tools, and RAM specs for developers.",
                "url": "https://toolstrategyhub.com/ai-tools"
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            }
        ]
    };

    const CALCULATORS = [
        {
            name: "Token Calculator",
            slug: "token-calculator",
            desc: "Estimate tokens from text in real-time, view breakdowns by language type, and evaluate dynamic token costs across major LLMs.",
            badge: "Popular"
        },
        {
            name: "LLM Cost Calculator",
            slug: "llm-cost-calculator",
            desc: "Model and compare API inference pricing per request, day, month, and year across GPT, Claude, Gemini, Mistral, and DeepSeek.",
            badge: "Essential"
        },
        {
            name: "AI Agent Cost Calculator",
            slug: "ai-agent-cost-calculator",
            desc: "Estimate agent running costs at scale. Factor in users, message loops, tokens, database storage, and infrastructure hosting.",
            badge: "Advanced"
        },
        {
            name: "Context Window Calculator",
            slug: "context-window-calculator",
            desc: "Calculate total context utilization. Prevent overflow by monitoring system, prompt, memory, and output parameters.",
            badge: "Warning System"
        },
        {
            name: "LLM RAM Calculator",
            slug: "llm-ram-calculator",
            desc: "Compute the VRAM and system memory required to run open models locally based on quantization and batch presets.",
            badge: "Local AI"
        }
    ];

    const DIRECTORIES = [
        {
            name: "LLM APIs",
            slug: "llm-apis",
            desc: "Access free and freemium Large Language Model inference endpoints from Google, Groq, Mistral, and unstructured open-source models."
        },
        {
            name: "Agent Skills",
            slug: "agent-skills",
            desc: "Equip your AI agents with real-world capabilities. Directory of Claude, OpenClaw, and NemoClaw skills for scraping, coding, and API chaining."
        },
        {
            name: "Free Public APIs",
            slug: "free-apis",
            desc: "A robust collection of completely free, publicly available APIs across finance, weather, and dev tools for testing and building agentic systems."
        },
        {
            name: "AI Resources",
            slug: "resources",
            desc: "Essential frameworks (LangChain, CrewAI, AutoGen), tutorials, and foundational learning resources for shipping production AI applications."
        }
    ];

    return (
        <div className="container" style={{ padding: '6rem 2rem' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>AI Ecosystem</span>
            </nav>

            <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '5rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block', backgroundColor: 'var(--accent-muted)', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}>
                    AI Developer Suite
                </div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    AI Developer Tools & <span style={{ color: 'var(--accent-primary)' }}>Calculators</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                    A dedicated technical utility suite for AI developers, LLM builders, RAG architects, and agent automation creators. Estimate token weights, evaluate API pricing, and check local memory limits.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="#calculators" className="btn" style={{ padding: '1rem 2rem' }}>
                        Launch Calculators
                    </Link>
                    <Link href="#directories" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
                        Browse API Directories
                    </Link>
                </div>
            </header>

            {/* Featured AI Calculators Grid */}
            <section id="calculators" className="stagger-2" style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '2.25rem', marginBottom: '2.5rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    Featured AI Utilities
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {CALCULATORS.map((calc) => (
                        <Link key={calc.slug} href={`/ai-tools/${calc.slug}`} className="card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>{calc.name}</h3>
                                <span className="pill" style={{ margin: 0, fontSize: '0.675rem', borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)', backgroundColor: 'var(--accent-muted)' }}>
                                    {calc.badge}
                                </span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', flexGrow: 1, marginBottom: '2rem' }}>
                                {calc.desc}
                            </p>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                Open Utility <span>&rarr;</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Developer Ecosystem Directories */}
            <section id="directories" className="stagger-3" style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '2.25rem', marginBottom: '2.5rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    Developer Ecosystem Directories
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {DIRECTORIES.map((dir) => (
                        <Link key={dir.slug} href={`/ai-tools/${dir.slug}`} className="card category-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>{dir.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem', flexGrow: 1 }}>
                                {dir.desc}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* In-depth Authority SEO Section */}
            <article className="stagger-4 seo-content" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', lineHeight: 1.8 }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>The Economics of Modern AI & LLM Systems</h2>
                <p>
                    Building software powered by large language models changes how we evaluate unit economics. Traditionally, SaaS companies enjoyed 80-90% gross margins because server compute scaled linearly and predictably. In the era of cognitive computing, every customer query triggers complex transformer calculations, introducing a variable <strong>LLM API tax</strong>.
                </p>
                <p>
                    For developers, this means optimizing code is no longer just a latency issue; it is a financial requirement. A poorly structured prompt that pulls unnecessary system instructions on every message can multiply your monthly bills. That is why understanding the mechanics of <strong>tokens</strong>, <strong>context windows</strong>, and <strong>local hardware requirements</strong> is critical for building sustainable systems.
                </p>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>Understanding Tokens and Context Boundaries</h3>
                <p>
                    LLMs do not see words the way humans do. They process text in chunks called <strong>tokens</strong>. An English word is roughly 1.3 to 1.4 tokens, but this ratio shifts dramatically when processing JSON payloads, programming source code, or Markdown formatting. 
                </p>
                <p>
                    Every model operates within a strict <strong>context window</strong> limit. This is the maximum sum of input and output tokens the network can process in a single execution loop. If your system prompt, user messages, agent memory (chat history), and the expected model output exceed this window, the model will fail or suffer from severe <strong>recall loss</strong>. 
                </p>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>Local Hosting vs. Closed APIs</h3>
                <p>
                    To bypass API costs, many builders opt for local hosting, utilizing open-weights models like Llama, DeepSeek, or Mistral. Local inference eliminates variable token costs, replacing them with fixed hardware amortizations. However, running a 70B parameter model locally requires massive VRAM capacities. Calculating whether your hardware can host a specific quantization (e.g. Q4_K_M or Q8) at a given batch size is the first step before purchasing graphics hardware.
                </p>
                <p>
                    Whether you are hosting models locally or chaining APIs across multiple agents, optimizing your resource utilization requires mathematical planning. You can explore our deep research guides to master these systems:
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1rem' }}>
                    <li><Link href="/guides/what-are-ai-tokens" style={{ color: 'var(--accent-primary)' }}>What Are AI Tokens & How to Calculate Them</Link></li>
                    <li><Link href="/guides/how-llm-pricing-works" style={{ color: 'var(--accent-primary)' }}>How LLM Pricing Schemes Work</Link></li>
                    <li><Link href="/guides/how-to-reduce-token-costs" style={{ color: 'var(--accent-primary)' }}>Optimizations to Reduce API & Token Overhead</Link></li>
                    <li><Link href="/guides/what-is-context-window" style={{ color: 'var(--accent-primary)' }}>Managing the Context Window Without Loss of Recall</Link></li>
                    <li><Link href="/guides/how-much-ram-for-local-llms" style={{ color: 'var(--accent-primary)' }}>Determining VRAM Requirements for Local LLMs</Link></li>
                </ul>
            </article>

            {/* FAQ Section */}
            <section style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)', maxWidth: '800px', margin: '5rem auto 0' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, idx) => (
                        <details key={idx} className="faq-accordion">
                            <summary>{faq.question}</summary>
                            <p>{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
