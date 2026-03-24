import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
    title: "AI Tools, APIs & Agent Skills for Developers",
    description: "An ecosystem of free LLM APIs, AI agent skills, and automation resources designed explicitly for builders, founders, and developers.",
    path: "/ai-tools",
    keywords: ["AI tools for developers", "free LLM API directory", "AI agent tools 2026", "AI skills marketplace"]
});

export default function AIToolsHubPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": "AI Tools & Ecosystem",
                "description": "Directory of LLM APIs, agent skills, and automation resources.",
                "url": "https://toolstrategyhub.com/ai-tools"
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What are AI agent tools?",
                        "acceptedAnswer": { "@type": "Answer", "text": "AI agent tools (or skills) are functions and capabilities that allow large language models to interact with external systems, like reading files, browsing the web, or executing code." }
                    },
                    {
                        "@type": "Question",
                        "name": "Where can I find free LLM APIs?",
                        "acceptedAnswer": { "@type": "Answer", "text": "We maintain a curated directory of free and freemium LLM APIs from providers like Google, Groq, and OpenRouter." }
                    },
                    {
                        "@type": "Question",
                        "name": "How do developers use LLM APIs?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Developers integrate LLM APIs into applications to automate text generation, perform data extraction, or power autonomous agents." }
                    },
                    {
                        "@type": "Question",
                        "name": "Are these AI tools suitable for beginners?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Yes, we curate both advanced frameworks and beginner-friendly tutorials to help anyone start building with AI." }
                    },
                    {
                        "@type": "Question",
                        "name": "How does AI connect to business strategy?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Automation via AI directly reduces overhead. You can estimate this exact impact using our automation ROI and workflow cost calculators." }
                    }
                ]
            }
        ]
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>AI Ecosystem</span>
            </nav>

            <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Developer Ecosystem</div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    AI Tools, APIs & <span style={{ color: 'var(--accent-primary)' }}>Agent Skills</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                    A curated technical directory for AI developers, agent builders, and automation creators. Discover free LLM APIs, ready-to-use agent skills, and the frameworks necessary to scale autonomous systems.
                </p>
                <Link href="/ai-tools/llm-apis" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                    Explore LLM APIs
                </Link>
            </header>

            <section className="stagger-2" style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <Link href="/ai-tools/llm-apis" className="card category-card" style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>LLM APIs</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Access free and freemium Large Language Model inference endpoints from Google, Groq, Mistral, and unstructured open-source models.</p>
                    </Link>
                    <Link href="/ai-tools/agent-skills" className="card category-card" style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Agent Skills</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Equip your AI agents with real-world capabilities. Directory of Claude, OpenClaw, and NemoClaw skills for scraping, coding, and API chaining.</p>
                    </Link>
                    <Link href="/ai-tools/free-apis" className="card category-card" style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Free Public APIs</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>A robust collection of completely free, publicly available APIs across finance, weather, and dev tools for testing and building agentic systems.</p>
                    </Link>
                    <Link href="/ai-tools/resources" className="card category-card" style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Resources</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Essential frameworks (LangChain, CrewAI, AutoGen), tutorials, and foundational learning resources for shipping production AI applications.</p>
                    </Link>
                </div>
            </section>

            <article className="stagger-3 seo-content" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', lineHeight: 1.8 }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>What Are AI Tools and Agents?</h2>
                <p>
                    The landscape of artificial intelligence has shifted rapidly from simple chat interfaces to autonomous, goal-oriented systems. <strong>AI tools and agents</strong> represent programs powered by Large Language Models (LLMs) that can independently plan tasks, utilize external tools (skills), and execute complex workflows without constant human oversight.
                </p>
                <p>
                    For developers, this means the barrier to creating highly capable software has functionally vanished. However, the ecosystem is heavily fragmented. That is why we built this developer-focused AI layer: to centralize the highest-quality open-source assets, APIs, and frameworks required to build modern AI architecture. Before investing engineering time into building bespoke agents, you can use our <Link href="/tools/decision-matrix-builder" style={{ color: 'var(--accent-primary)' }}>Decision Matrix Builder</Link> to objectively framework your tech stack choices.
                </p>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>How Builders Use LLM APIs</h3>
                <p>
                    At the core of any agent relies an <strong>LLM API</strong>. Rather than spending tens of thousands of dollars training a proprietary model, builders leverage inference endpoints to instantly route human language inputs to intelligent processing engines.
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li><strong>Content Extraction:</strong> Parsing unstructured legacy data into clean JSON schemas.</li>
                    <li><strong>Autonomous Execution:</strong> Utilizing models like Claude to map complex multi-step objectives into executable code blocks.</li>
                    <li><strong>Customer Triage:</strong> Analyzing thousands of inbound tickets instantly to determine emotional sentiment and technical priority.</li>
                </ul>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>The Economics of AI Automation</h3>
                <p>
                    Integrating AI isn't simply a technical decision; it is fundamentally a financial strategy. The capability to deploy an agent to perform data entry, code review, or complex market research alters the unit economics of a startup. When you substitute human bandwidth for machine latency, your <strong>cost floor</strong> drops dramatically.
                </p>
                <p>
                    However, calculating the precise return on investment (ROI) of these integrations requires rigorous math, accounting for API token costs and server compute overhead. You can model these exact dynamics using our <Link href="/tools/automation-roi-tool" style={{ color: 'var(--accent-primary)' }}>Automation ROI Tool</Link> and the <Link href="/tools/workflow-cost-calculator" style={{ color: 'var(--accent-primary)' }}>Manual Workflow Cost Calculator</Link> to determine exactly how much capital an AI agent will save your operations.
                </p>
            </article>

            <section className="stagger-4" style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)', maxWidth: '800px', margin: '5rem auto 0' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(jsonLd["@graph"][1] as any).mainEntity.map((faq: any, idx: number) => (
                        <details key={idx} className="faq-accordion">
                            <summary>{faq.name}</summary>
                            <p>{faq.acceptedAnswer.text}</p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
