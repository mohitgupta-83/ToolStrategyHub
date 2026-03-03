import { toolsRegistry } from '@/lib/toolsRegistry';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Metadata } from 'next';

export function generateStaticParams() {
    // Generate valid slugs from registry based on category name
    const slugs = new Set(toolsRegistry.map(t => t.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')));
    return Array.from(slugs).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const tools = toolsRegistry.filter(t => t.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === params.slug);
    if (tools.length === 0) return {};

    const categoryName = tools[0].category;

    return generatePageMetadata({
        title: `${categoryName} Tools & Calculators | ToolStrategyHub`,
        description: `Explore our collection of ${tools.length} rigorous ${categoryName} tools. Stop guessing, use algorithmic mathematical frameworks designed for founders.`,
        path: `/categories/${params.slug}`,
        keywords: [`${categoryName} tools`, `best ${categoryName} calculators`, `${categoryName} strategy online`]
    });
}

export default function DynamicCategoryPage({ params }: { params: { slug: string } }) {
    const tools = toolsRegistry.filter(t => t.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === params.slug);
    if (tools.length === 0) notFound();

    const categoryName = tools[0].category;

    // Auto-generate some keyword text
    const keywordText = `${categoryName} tools`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${categoryName} Tools`,
        "description": `Data-driven ${categoryName} calculators for founders.`,
        "url": `https://toolstrategyhub.com/categories/${params.slug}`
    };

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/categories" style={{ color: 'var(--text-secondary)' }}>Categories</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>{categoryName}</span>
            </nav>

            <header className="stagger-1" style={{ maxWidth: '900px', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    {categoryName} Tools
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', lineHeight: 1.6 }}>
                    Execute smarter business decisions with our suite of specialized {categoryName.toLowerCase()} algorithms, calculators, and frameworks.
                </p>
            </header>

            <section className="stagger-2" style={{ maxWidth: '800px', marginBottom: '4rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p>When searching for the <strong>best {keywordText}</strong>, operators require immediate, frictionless mathematical validation. We designed this specific suite of {tools.length} calculators to execute inside your browser instantly.</p>
                <p>These frameworks combat cognitive bias by substituting theoretical guesses with hardcore algorithmic matrices. Browse the index below to execute our proprietary scripts without any sign-ups or paywalls.</p>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                    The Strategic Imperative of {categoryName}
                </h2>
                <p>
                    Regardless of your business model—whether bootstrapping a lean SaaS, running a performance marketing agency, or scaling a creator audience—effective <strong>{keywordText}</strong> act as the ultimate defensive moat against capital loss. The primary reason startups fail isn't due to poor engineering or bad marketing; it is fundamentally an issue of executing on false premises. Utilizing structured {categoryName.toLowerCase()} algorithms ensures that your operational thesis is anchored in mathematical reality rather than founder intuition.
                </p>
                <p>
                    In modern markets, speed is a commodity, but accuracy is an advantage. By deploying systematic calculators for {categoryName.toLowerCase()}, operational velocity increases. You no longer have to debate with co-founders or stakeholders over qualitative factors. Instead, you plug your variables into our localized matrices. If the output yields a negative margin, a high risk coefficient, or an unsustainable burn rate, the decision is made for you.
                </p>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                    How to Utilize Our {categoryName} Suite
                </h2>
                <p>
                    Every tool within the directory below operates entirely client-side. This means the <strong>{categoryName.toLowerCase()} models</strong> execute zero-latency calculations using your device's processing power. No financial, strategic, or operational data is ever transmitted back to our servers, ensuring pristine operational security (OpSec) for early-stage ventures in stealth mode.
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li><strong>Identify the Bottleneck:</strong> Start by diagnosing the specific unknown variable in your {categoryName.toLowerCase()} workflow.</li>
                    <li><strong>Select the specific calculator:</strong> Do not use generic tools. Choose the exact calculation module designed for your specific friction point.</li>
                    <li><strong>Input pessimistic variables:</strong> Always calculate your downside risk. If the model succeeds under stress, it will thrive in reality.</li>
                    <li><strong>Iterate on the outputs:</strong> Use the deterministic output to adjust your core hypotheses and re-run the algorithm until you reach operational viability.</li>
                </ul>
                <p>
                    Our {categoryName} calculators are continuously updated by senior strategists to reflect current market constraints, capital flow dynamics, and attention economics. We remove the cognitive load of building spreadsheets from scratch so you can focus exclusively on execution.
                </p>
            </section>

            <section id="tool-grid" className="stagger-3" style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {tools.sort((a, b) => b.popularityScore - a.popularityScore).map(tool => (
                        <Link href={`/tools/${tool.slug}`} key={tool.slug} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', transition: 'transform 0.2s', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                            <span className="pill" style={{ alignSelf: 'flex-start', marginBottom: '1rem', fontSize: '0.75rem' }}>{tool.category}</span>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{tool.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, flexGrow: 1 }}>
                                {tool.description}
                            </p>
                            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 'bold' }}>
                                Launch Tool <span>→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="stagger-4" style={{ marginBottom: '6rem', backgroundColor: 'var(--bg-secondary)', padding: '3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Are these {categoryName.toLowerCase()} tools completely free?</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Yes. ToolStrategyHub provides completely unrestricted access to our entire suite of {categoryName.toLowerCase()} calculators without any paywalls or account creation requirements.</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Is my {categoryName.toLowerCase()} data stored on your servers?</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Absolutely not. All proprietary business variables, financial assumptions, and tactical data entered into these matrices are processed entirely locally within your browser's memory using client-side JavaScript.</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>How do I choose the right {categoryName.toLowerCase()} framework?</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Identify the precise nature of the unknown variable blocking your execution. Browse the descriptions of the {tools.length} calculators above to find the model that mathematically targets that specific friction point.</p>
                    </div>
                </div>
            </section>

            {/* Related Categories */}
            <section className="stagger-4" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    Explore Related Architectures
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {Array.from(new Set(toolsRegistry.filter(t => t.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') !== params.slug).map(t => t.category))).slice(0, 5).map(catName => {
                        const relSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        return (
                            <Link href={`/categories/${relSlug}`} key={relSlug} style={{
                                padding: '1rem 2rem',
                                backgroundColor: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-full)',
                                color: 'var(--text-secondary)',
                                transition: 'all 0.2s ease',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}>
                                {catName} &rarr;
                            </Link>
                        );
                    })}
                </div>
            </section>

        </div>
    );
}
