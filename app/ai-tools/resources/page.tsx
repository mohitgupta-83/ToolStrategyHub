import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { AI_RESOURCES } from '@/lib/aiToolsRegistry';

export const metadata: Metadata = generatePageMetadata({
    title: "AI Development Resources & Frameworks",
    description: "Curated list of AI automation resources, frameworks like LangChain and CrewAI, tutorials, and local inference engines.",
    path: "/ai-tools/resources",
    keywords: ["AI automation resources", "best AI frameworks 2026", "LangChain alternatives", "AI agent tutorials"]
});

export default function AIResourcesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ItemList",
                "itemListElement": AI_RESOURCES.map((resource, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "SoftwareApplication",
                        "name": resource.name,
                        "description": resource.description,
                        "url": resource.url
                    }
                }))
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How do I start building AI agents?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Begin by downloading an accessible foundational framework like LangChain or Vercel AI SDK. Once you're comfortable structuring raw API prompts, move towards stateful orchestrated systems like AutoGen or CrewAI." }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the best AI framework for developers?",
                        "acceptedAnswer": { "@type": "Answer", "text": "For rapid frontend prototyping with React, the Vercel AI SDK is unmatched. For heavy data ingestion and multi-agent coordination in Python, LangChain and CrewAI are industry standards." }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I run large language models locally?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Tools like Ollama allow you to download and execute open-weights models (like Llama 3) entirely locally on consumer hardware, preserving complete data privacy." }
                    },
                    {
                        "@type": "Question",
                        "name": "Where can I find tutorials on AI tool integrations?",
                        "acceptedAnswer": { "@type": "Answer", "text": "We recommend the official Anthropic API docs natively for high-level reasoning, and the OpenAI Cookbook for generalized Python-based logic patterns." }
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
                <Link href="/ai-tools" style={{ color: 'var(--text-secondary)' }}>AI Ecosystem</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>Resources</span>
            </nav>

            <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Ecosystem Blueprints</div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    AI Frameworks & <br /><span style={{ color: 'var(--accent-primary)' }}>Developer Resources</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                    Scale your intelligent systems securely. A highly-curated list of foundational AI frameworks, orchestration tools, local inference runtime engines, and critical documentation.
                </p>
            </header>

            <section className="stagger-2" style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {AI_RESOURCES.map((resource) => (
                        <div key={resource.name} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{resource.name}</h3>
                                <span className="pill" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--accent-primary)', borderColor: 'var(--border-color)', margin: 0 }}>
                                    {resource.type}
                                </span>
                            </div>
                            
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, flexGrow: 1, marginBottom: '2rem' }}>
                                {resource.description}
                            </p>

                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                                View Resource Documentation ↗
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <article className="stagger-3 seo-content" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', lineHeight: 1.8 }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Structuring AI Product Workflows</h2>
                <p>
                    Connecting a single prompt to a <strong>Large Language Model API</strong> is functionally trivial. Architecting a multi-agent orchestration layer that reads complex contextual repositories, formulates autonomous sub-tasks, delegates requests to specialized intelligence models, and safely interprets JSON payloads? That requires utilizing standardized application <strong>ecosystem frameworks</strong>.
                </p>
                <p>
                    Whether you deploy LangChain for abstract structural integration or lean towards the ultra-scalable routing found within the Vercel AI SDK, adopting these standardized primitives drastically accelerates developer iteration. Rather than building API wrappers continuously, your operational time must transition to crafting resilient application-level reasoning loops.
                </p>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>Local Inference Architecture</h3>
                <p>
                    The transition towards <strong>local inference engines</strong> (like Ollama) fundamentally changes startup cost analysis. If you process sensitive institutional documents or simply want to eradicate cloud inference token costs entirely, deploying quantized models onto discrete local hardware prevents privacy breaches natively.
                </p>
                <p>
                    Deploying an LLM operation introduces operational hazards regarding hallucination and logic degradation. Validating whether an AI feature actually retains product-market-fit before investing $50,000 into proprietary fine-tuning is mandatory. Ensure you mathematically quantify your hypotheses utilizing the <Link href="/tools/startup-readiness-score" style={{ color: 'var(--accent-primary)' }}>Startup Readiness Score</Link> and heavily vet your overarching system using the <Link href="/tools/idea-risk-analyzer" style={{ color: 'var(--accent-primary)' }}>Idea Risk Analyzer</Link>.
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
