import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { LLM_PROVIDERS } from '@/lib/aiToolsRegistry';

export const metadata: Metadata = generatePageMetadata({
    title: "LLM API Provider Directory: Free, Freemium & Paid (2026)",
    description: "Browse all major LLM API providers — free tiers, freemium, and paid. Compare rate limits, models, OpenAI compatibility, and context windows across Google, Groq, Mistral, OpenRouter, and more.",
    path: "/ai-tools/llm-apis",
    keywords: ["LLM API providers directory", "compare LLM inference providers", "LLM API comparison 2026", "free and paid LLM APIs"]
});

export default function LLMAPIHubPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ItemList",
                "itemListElement": LLM_PROVIDERS.map((provider, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "SoftwareApplication",
                        "name": provider.name,
                        "description": provider.description,
                        "url": provider.url
                    }
                }))
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Are these LLM APIs really free?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Yes, many providers in our directory (like Google AI Studio and OpenRouter) offer entirely free inference tiers specifically to attract developers and hobbyists. However, data privacy rules differ on free tiers." }
                    },
                    {
                        "@type": "Question",
                        "name": "Which free LLM API is best for coding?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Groq and Mistral Codestral offer exceptionally fast token generation speeds and specific code-focused models." }
                    },
                    {
                        "@type": "Question",
                        "name": "What is OpenRouter?",
                        "acceptedAnswer": { "@type": "Answer", "text": "OpenRouter acts as a unified hub allowing you to access hundreds of localized endpoints (including high-quality free models like Llama 3) via a single normalized API format." }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use these for production workloads?",
                        "acceptedAnswer": { "@type": "Answer", "text": "While free tiers are excellent for prototyping AI agents and validating your MVP, production workloads will ultimately require upgrading to an enterprise, HIPAA, or SOC2 compliant endpoint to guarantee zero data-training." }
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
                <span style={{ color: 'var(--text-primary)' }}>LLM APIs</span>
            </nav>

            <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>LLM Provider Directory</div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    LLM API Providers — <br /><span style={{ color: 'var(--accent-primary)' }}>Free, Freemium & Paid</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                    A comprehensive directory of all major LLM inference providers. Compare free tiers, freemium plans, and paid APIs — including rate limits, models available, OpenAI compatibility, and context window sizes.
                </p>
            </header>

            <section className="stagger-2" style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {LLM_PROVIDERS.map((provider) => (
                        <div key={provider.name} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{provider.name}</h3>
                                <span className="pill" style={{ 
                                    backgroundColor: provider.cost === 'Free' ? 'var(--accent-muted)' : 'var(--bg-surface)', 
                                    color: provider.cost === 'Free' ? 'var(--accent-primary)' : 'var(--text-primary)',
                                    borderColor: provider.cost === 'Free' ? 'var(--accent-primary)' : 'var(--border-color)',
                                    margin: 0
                                }}>
                                    {provider.cost}
                                </span>
                            </div>
                            
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, flexGrow: 1, marginBottom: '1.5rem' }}>
                                {provider.description}
                            </p>

                            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                    <strong>Limits:</strong> {provider.limits}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                    <strong>Models:</strong> {provider.models.join(', ')}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                {provider.capabilities.map(cap => (
                                    <span key={cap} className="pill" style={{ fontSize: '0.7rem' }}>{cap}</span>
                                ))}
                            </div>

                            <a href={provider.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                                Access API Documentation ↗
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <article className="stagger-3 seo-content" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', lineHeight: 1.8 }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>How to Choose an LLM API Provider</h2>
                <p>
                    When prototyping intelligent applications or autonomous agents, optimizing your inference expenses is critical. The ecosystem contains essentially four tiers of <strong>LLM API providers</strong>: direct first-party providers (Google, OpenAI), massive serverless aggregators (Hugging Face, OpenRouter), local hardware cloud operators (Groq, Cerebras), and enterprise infrastructure providers (Cohere, Mistral).
                </p>
                <p>
                    For developers bootstrapping complex agent workflows, you must balance latency, token capacity, and context window logic. Selecting a provider that forces a hard rate limit of 10 requests a day breaks continuous CI/CD automated testing. Therefore, understanding the distinct operational <strong>freemium constraints</strong> of each endpoint dramatically alters your software architecture. To fully engineer your monetization thresholds regarding infrastructure, analyze your unit economics directly in the <Link href="/tools/saas-pricing-calculator" style={{ color: 'var(--accent-primary)' }}>SaaS Pricing Calculator</Link>.
                </p>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>The Hidden Mathematical Constraints</h3>
                <p>
                    Most free-tier LLM API keys mask a critical trade-off: <strong>Data Training.</strong> By allowing you to execute inference computation entirely for free, many infrastructure hosts retain the right to ingest your payload data to fine-tune subsequent open-source models.
                </p>
                <p>
                    If building HIPAA-compliant healthcare applications or ingesting proprietary B2B financial schemas, you cannot deploy utilizing standard free tiers. However, for executing public deterministic logic—such as evaluating GitHub repositories, classifying internet URLs, or driving an AI gaming agent—the free inference from resources like <strong>Google AI Studio</strong> provides an insurmountable prototype advantage.
                </p>
                
                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>Scaling Automation and Operational Cost</h3>
                <p>
                    Once your agent achieves product-market fit, testing is complete, and traffic ramps up, your free LLM limits will rapidly max out. Generating thousands of complex deterministic functions per hour requires establishing a realistic operating budget.
                </p>
                <p>
                    Calculating this ROI manually is tedious. Instead, leverage our deterministic <Link href="/tools/automation-roi-tool" style={{ color: 'var(--accent-primary)' }}>Automation ROI Calculator</Link> to measure if the human capital saved by the LLM exceeds the new infrastructure token burn rate. If the math mathematically warrants the transition to a paid LLM API, utilize an aggregator to route between models programmatically to prevent systemic vendor lock-in.
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

            {/* Cross-links */}
            <div style={{ marginTop: '4rem', padding: '1.5rem 2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', maxWidth: '800px', margin: '4rem auto 0' }}>
                <p style={{ margin: '0 0 0.75rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Related resources:</p>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li><Link href="/ai-tools/ai-model-explorer" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>AI Model Explorer & LLM Comparison Tool</Link> — interactive directory of 55+ models with live filter, search & side-by-side comparison</li>
                    <li><Link href="/guides/best-free-llm-apis" style={{ color: 'var(--accent-primary)' }}>Best Free LLM APIs for Developers</Link> — editorial picks with rate limit comparisons</li>
                    <li><Link href="/guides/cheapest-llm-api" style={{ color: 'var(--accent-primary)' }}>Cheapest LLM APIs</Link> — cost-per-token comparison for paid tiers</li>
                    <li><Link href="/ai-tools/free-apis" style={{ color: 'var(--accent-primary)' }}>Free Public REST APIs</Link> — public data APIs for AI agent workflows</li>
                </ul>
            </div>
        </div>
    );
}
