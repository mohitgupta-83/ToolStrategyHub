import { toolsRegistry } from '@/lib/toolsRegistry';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { slug: string } }) {
    // Attempt to map the problem slug to a tool
    // e.g., "calculate-startup-runway" -> "startup-runway-calculator" 
    const isCalculate = params.slug.startsWith('calculate-');
    const isPrice = params.slug.startsWith('price-');
    let toolTarget = "";

    if (params.slug.includes('runway')) toolTarget = 'startup-runway-calculator';
    else if (params.slug.includes('freelance') || params.slug.includes('rate')) toolTarget = 'freelance-rate-calculator';
    else if (params.slug.includes('idea') || params.slug.includes('validate')) toolTarget = 'startup-idea-validator';
    else if (params.slug.includes('margin') || params.slug.includes('pricing') || params.slug.includes('saas')) toolTarget = 'saas-pricing-calculator';
    else if (params.slug.includes('decision')) toolTarget = 'decision-matrix-builder';
    else toolTarget = toolsRegistry[0].slug;

    const tool = toolsRegistry.find(t => t.slug === toolTarget) || toolsRegistry[0];

    const formattedProblem = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return generatePageMetadata({
        title: `How to ${formattedProblem} | Step-by-Step Guide & Free Calculator`,
        description: `Struggling to figure out how to ${params.slug.replace(/-/g, ' ')}? Our comprehensive guide and algorithmic calculator eliminates the guesswork.`,
        path: `/how-to/${params.slug}`,
        keywords: [`how to ${params.slug.replace(/-/g, ' ')}`, `${tool.name.toLowerCase()}`, `guide to ${params.slug.replace(/-/g, ' ')}`]
    });
}

export default function HowToPage({ params }: { params: { slug: string } }) {
    let toolTarget = "";
    if (params.slug.includes('runway')) toolTarget = 'startup-runway-calculator';
    else if (params.slug.includes('freelance') || params.slug.includes('rate')) toolTarget = 'freelance-rate-calculator';
    else if (params.slug.includes('idea') || params.slug.includes('validate')) toolTarget = 'startup-idea-validator';
    else if (params.slug.includes('margin') || params.slug.includes('pricing') || params.slug.includes('saas')) toolTarget = 'saas-pricing-calculator';
    else if (params.slug.includes('decision')) toolTarget = 'decision-matrix-builder';
    else toolTarget = toolsRegistry[Math.floor(Math.random() * 5)].slug;

    const tool = toolsRegistry.find(t => t.slug === toolTarget) || toolsRegistry[0];
    const formattedProblem = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const hubSlug = tool.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === "money-pricing" ? "pricing-tools" : "startup-tools";

    const faqs = [
        { q: `What is the fastest way to ${params.slug.replace(/-/g, ' ')}?`, a: `Skip the spreadsheets. You can instantly run the exact mathematical framework by using our ${tool.name}. Simply input your variables.` },
        { q: `Why do most people fail when trying this?`, a: `They execute with cognitive bias and ignore hidden costs. The ${tool.name} specifically prevents margin illusion and runway decay.` },
        { q: `Is the ${tool.name} free?`, a: `Yes, 100% free with no forced account creation.` },
        { q: `Where is my data stored?`, a: `Nowhere. Our calculators process entirely within your local browser session.` }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "HowTo",
                "name": `How to ${formattedProblem}`,
                "description": `A programmatic guide on how to algorithmically ${params.slug.replace(/-/g, ' ')} using the ${tool.name}.`,
                "step": [
                    { "@type": "HowToStep", "name": "Identify Variables", "text": "Locate your historical baseline numbers and pessimistic assumptions." },
                    { "@type": "HowToStep", "name": "Load the Calculator", "text": `Access the dedicated ${tool.name} inside the ToolStrategyHub ecosystem.` },
                    { "@type": "HowToStep", "name": "Execute Operations", "text": "Input the variables to determine your exact mathematical boundary." }
                ]
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
                <Link href="/tools" style={{ color: 'var(--accent-primary)' }}>Ecosystem Directory</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                Playbooks & Guides
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Action Playbook</div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    How to {formattedProblem}
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
                    Stop guessing. Here is the step-by-step framework to deterministically solve this without wasting hours on spreadsheet architecture.
                </p>
            </header>

            <div className="stagger-2" style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Want the immediate answer?</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Skip the reading. We built the exact <strong>{tool.name}</strong> to calculate this for you right now.</p>
                <Link href={`/tools/${tool.slug}`} className="btn" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
                    Launch the {tool.name}
                </Link>
            </div>

            <article className="stagger-3" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Core Principle</h2>
                <p>
                    Understanding how to aggressively {params.slug.replace(/-/g, ' ')} is one of the most vital operations a founder or freelancer can execute. Most operators start by opening a blank spreadsheet.
                    They assume linear growth, ignore churn variables, and forget to buffer for cognitive taxes. This is a fatal mistake that creates a false margin of safety.
                </p>
                <p>
                    By deploying the <Link href={`/tools/${tool.slug}`} style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>{tool.name}</Link>, you enforce strict guardrails onto your operational assumptions. We recommend validating this metric inside our <Link href={`/${hubSlug}`} style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Category Ecosystem</Link> to cross-reference your results.
                </p>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3-Step Algorithmic Solution</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '1.5rem', borderLeft: '4px solid var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>1. Isolate the Baseline</h3>
                        <p style={{ margin: 0 }}>You cannot {params.slug.replace(/-/g, ' ')} if you do not know your current metrics. Gather exactly what your historical inputs are. If you have no data, utilize pessimistic industry averages.</p>
                        <Link href="/compare/decision-matrix-builder-vs-gut-feeling" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', textDecoration: 'underline', marginTop: '0.5rem', display: 'inline-block' }}>See Decision Variables</Link>
                    </div>

                    <div style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-primary)', backgroundColor: 'var(--bg-secondary)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>2. Input into the Matrix</h3>
                        <p style={{ margin: 0 }}>Route your variables into the <Link href={`/tools/${tool.slug}`} style={{ color: 'var(--accent-primary)' }}>{tool.name}</Link>. The core engine will instantly calculate the outcome entirely inside your client-side browser session.</p>
                    </div>

                    <div style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-secondary, #333)', backgroundColor: 'var(--bg-secondary)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>3. Scale the Output</h3>
                        <p style={{ margin: 0 }}>Vary the parameters randomly within the calculator. Determine where the mathematical breaking point sits. Do you have a 25% margin or a 5% margin? Now you have exact strategic leverage.</p>
                    </div>
                </div>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Sustaining the Strategy</h2>
                <p>
                    {tool.description} If you continually execute based on human intuition, you will fail to adapt when macroeconomic markers shift. Using our comparative matrices inside the <Link href="/startup-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Strategy Hubs</Link> ensures that your operations remain tightly coupled to reality.
                </p>
                <p>
                    Don't let manual errors destroy your unit economics. Compare your findings against our <Link href="/compare/saas-pricing-calculator-vs-excel" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>SaaS Baseline Frameworks</Link> or the generalized <Link href="/compare/decision-matrix-builder-vs-gut-feeling" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Decision Matrices</Link>.
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
