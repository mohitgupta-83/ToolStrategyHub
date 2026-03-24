import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { FREE_APIS } from '@/lib/aiToolsRegistry';

export const metadata: Metadata = generatePageMetadata({
    title: "Free Public APIs for Developers",
    description: "A categorized directory of free, open-source, and public APIs perfect for developers to test AI agents or prototype applications.",
    path: "/ai-tools/free-apis",
    keywords: ["free public APIs for developers", "free API directory", "open source apis", "testing apis"]
});

export default function FreeAPIPage() {
    const categories = Array.from(new Set(FREE_APIS.map(api => api.category)));

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ItemList",
                "itemListElement": FREE_APIS.map((api, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "SoftwareApplication",
                        "name": api.name,
                        "description": api.description,
                        "url": api.url
                    }
                }))
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Why use public APIs for AI testing?",
                        "acceptedAnswer": { "@type": "Answer", "text": "When building an AI agent that hits networks, you want safe, idempotent endpoints to let your LLM test its reasoning logic without mutating real production data." }
                    },
                    {
                        "@type": "Question",
                        "name": "Do these APIs require authentication?",
                        "acceptedAnswer": { "@type": "Answer", "text": "We categorize APIs explicitly by authentication requirements. Many of these (like PokeAPI or DummyJSON) require no auth strings at all." }
                    },
                    {
                        "@type": "Question",
                        "name": "Are there hidden costs?",
                        "acceptedAnswer": { "@type": "Answer", "text": "APIs tagged as 'Free' cost nothing. APIs tagged 'Freemium' offer generous developer tiers but may require a credit card if you exceed extreme volume limits." }
                    },
                    {
                        "@type": "Question",
                        "name": "How to handle API rate limits in production?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Public APIs aggressively rate limit requests. If your agent scales, you must implement exponential backoff retry algorithms or upgrade to enterprise SaaS tiers." }
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
                <span style={{ color: 'var(--text-primary)' }}>Free APIs</span>
            </nav>

            <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Testing Infrastructure</div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    Free Developer & <br /><span style={{ color: 'var(--accent-primary)' }}>Public API Directory</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                    A robust collection of curated public APIs across finance, weather, and dev tools—perfect for supplying reliable data feeds to your AI workflows or MVP applications.
                </p>
            </header>

            <div className="stagger-2" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}>
                {categories.map(cat => (
                    <span key={cat} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: 'var(--radius-full)' }}>
                        {cat}
                    </span>
                ))}
            </div>

            <section className="stagger-2" style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {FREE_APIS.map((api) => (
                        <div key={api.name} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{api.name}</h3>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                <span className="pill" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', margin: 0, fontSize: '0.7rem' }}>
                                    {api.category}
                                </span>
                                <span className="pill" style={{ backgroundColor: 'var(--bg-tertiary)', color: api.cost === 'Free' ? 'var(--accent-primary)' : 'var(--text-primary)', borderColor: 'var(--border-color)', margin: 0, fontSize: '0.7rem' }}>
                                    {api.cost}
                                </span>
                                <span className="pill" style={{ backgroundColor: 'var(--bg-tertiary)', color: api.auth === 'None' ? 'var(--accent-primary)' : 'var(--text-secondary)', borderColor: 'var(--border-color)', margin: 0, fontSize: '0.7rem' }}>
                                    Auth: {api.auth}
                                </span>
                            </div>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, flexGrow: 1, marginBottom: '1.5rem' }}>
                                {api.description}
                            </p>

                            <a href={api.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                                View API Documentation ↗
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <article className="stagger-3 seo-content" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', lineHeight: 1.8 }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Why Developers Need Public APIs</h2>
                <p>
                    Regardless of whether you are hand-coding a React dashboard or prompting an autonomous Claude agent to deploy an infrastructure workflow, your software requires realistic contextual data. Testing algorithms via mocked interior variables forces blind spots into your application lifecycle. Utilizing <strong>free public APIs</strong> allows developers to safely hit third-party servers, fetch volatile REST payloads, and design error-handling protocols robustly without fear of exceeding expensive production quotas.
                </p>
                <p>
                    From the massively detailed taxonomic data found in the <strong>PokeAPI</strong> to the macro-economic currency fluctuations returned by the <strong>ExchangeRate-API</strong>, these public endpoints furnish raw data cheaply. 
                </p>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>The Hidden Operational Costs</h3>
                <p>
                    Free software is rarely free regarding execution. While a free API doesn't charge per-request latency overhead, integrating unpredictable architectures into your primary application pipeline induces technical debt.
                </p>
                <p>
                    Before scaling a business idea atop a public API endpoint, you must rigorously calculate the financial viability of replacing it with an enterprise SLA if the public instance suffers an outage. Use our <Link href="/tools/small-business-tool-stack-builder" style={{ color: 'var(--accent-primary)' }}>Small Business Tool Stack Builder</Link> to analyze your dependencies correctly. Alternatively, if your fundamental customer acquisition relies entirely on content data scraped via free endpoints, the <Link href="/tools/content-roi-calculator" style={{ color: 'var(--accent-primary)' }}>Content ROI Calculator</Link> determines mathematically how tightly your margins are bound to that external server operating dynamically.
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
