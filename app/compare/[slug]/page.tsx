import { toolsRegistry } from '@/lib/toolsRegistry';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { slug: string } }) {
    if (!params.slug.includes('-vs-')) return {};
    const [toolSlug, topic] = params.slug.split('-vs-');

    const tool = toolsRegistry.find(t => t.slug === toolSlug);
    if (!tool) return {};

    const formattedTopic = topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return generatePageMetadata({
        title: `${tool.name} vs ${formattedTopic} | Detailed 2026 Comparison`,
        description: `Compare ${tool.name} against ${formattedTopic}. Why using mathematical algorithms beats traditional ${formattedTopic.toLowerCase()} to save time and money.`,
        path: `/compare/${params.slug}`,
        keywords: [`${tool.name.toLowerCase()} vs ${formattedTopic.toLowerCase()}`, `alternative to ${formattedTopic.toLowerCase()}`]
    });
}

export default function ComparePage({ params }: { params: { slug: string } }) {
    if (!params.slug.includes('-vs-')) {
        notFound();
    }

    const [toolSlug, topic] = params.slug.split('-vs-');
    const tool = toolsRegistry.find(t => t.slug === toolSlug);

    if (!tool) {
        notFound();
    }

    const formattedTopic = topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const hubSlug = tool.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === "money-pricing" ? "pricing-tools" : "startup-tools";

    const faqs = [
        { q: `What is the main difference between the ${tool.name} and ${formattedTopic}?`, a: `The ${tool.name} provides deterministic, algorithmic certainty based on client-side math, whereas ${formattedTopic.toLowerCase()} relies on subjective assumptions, high cognitive overhead, and potential bias.` },
        { q: `Why should I use arithmetic models instead of a standard ${formattedTopic}?`, a: `Because human intuition degrades across multi-variable problems. If you execute a strategy based on a flawed ${formattedTopic}, your unit economics will collapse.` },
        { q: `Is the ${tool.name} free?`, a: `Yes, 100% free with no forced account creation.` },
        { q: `How often is the underlying algorithm patched for the ${tool.name}?`, a: `Routinely, as macroeconomic variables and business costs evolve.` }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "headline": `${tool.name} vs ${formattedTopic}`,
                "description": `Detailed analysis of ${tool.name} compared to ${formattedTopic}.`,
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
                }))
            }
        ]
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/tools" style={{ color: 'var(--accent-primary)' }}>Tools Directory</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                Compare Context
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>VS Breakdown</div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    {tool.name} <br /><span style={{ color: 'var(--text-secondary)' }}>vs</span> {formattedTopic}
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
                    A transparent analysis on why substituting manual {formattedTopic.toLowerCase()} with deterministic <strong>algorithms</strong> increases your probability of success by eliminating fatal execution errors.
                </p>
            </header>

            <div className="stagger-2" style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Ready to Test the Math?</h2>
                <Link href={`/tools/${tool.slug}`} className="btn" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
                    Launch the {tool.name}
                </Link>
            </div>

            <article className="stagger-3" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Hidden Cost of {formattedTopic}</h2>
                <p>
                    When assessing constraints, operators frequently drift towards their comfort zone: <strong>{formattedTopic.toLowerCase()}</strong>. While initially comfortable, this approach introduces compounding systemic friction. Variables aren't rigidly connected. Margin decay goes unnoticed until cash reserves are literally empty.
                </p>
                <p>
                    By deploying the <Link href={`/tools/${tool.slug}`} style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>{tool.name}</Link> instead, you enforce strict rules engines upon your assumptions. Try utilizing tools within our <Link href={`/${hubSlug}`} style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Category Ecosystem</Link> to cross-reference your results.
                </p>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Feature Breakdown Grid</h2>

                <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                <th style={{ padding: '1rem', color: 'var(--text-primary)', width: '33%' }}>Capability</th>
                                <th style={{ padding: '1rem', color: 'var(--text-primary)', width: '33%' }}>{tool.name}</th>
                                <th style={{ padding: '1rem', color: 'var(--text-secondary)', width: '33%' }}>{formattedTopic}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>Cognitive Bias</td>
                                <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>Eliminated (Pure Math)</td>
                                <td style={{ padding: '1rem' }}>Highly susceptible</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>Execution Speed</td>
                                <td style={{ padding: '1rem' }}>Milliseconds (Client-Side)</td>
                                <td style={{ padding: '1rem' }}>Hours / Days</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>Systemic Liability</td>
                                <td style={{ padding: '1rem' }}>Negligible</td>
                                <td style={{ padding: '1rem' }}>Compounding Errors</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>Privacy</td>
                                <td style={{ padding: '1rem', color: 'var(--accent-primary)' }}>100% Local Browser Processing</td>
                                <td style={{ padding: '1rem' }}>Often requires cloud sync/sharing</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Why Operators Transition Away from {formattedTopic}</h2>
                <p>
                    {tool.description} If you continually execute based on {formattedTopic.toLowerCase()}, you ignore edge cases like unbillable churn, hardware depreciation, and psychological willingness to pay. Using our comparative matrices inside the <Link href="/startup-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Startup Hub</Link> can reveal these gaps instantly.
                </p>
                <p>
                    Don't let manual errors destroy a great business premise. Transition your logic to objective frameworks. Compare your findings against our <Link href="/compare/saas-pricing-calculator-vs-excel" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>SaaS Model Comparisons</Link> or the generalized <Link href="/compare/decision-matrix-builder-vs-gut-feeling" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Decision Frameworks</Link>.
                </p>
            </article>

            <section className="stagger-4" style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, idx) => (
                        <details key={idx} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                            <summary style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}>
                                {faq.q}
                            </summary>
                            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
