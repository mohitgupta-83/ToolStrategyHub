import { toolsRegistry } from '@/lib/toolsRegistry';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

const CATEGORY_PAGES: Record<string, { title: string, keyword: string, description: string, filters: (category: string) => boolean }> = {
    'startup-tools-india': {
        title: 'Top Free Startup Tools & Calculators in India',
        keyword: 'startup tools india',
        description: 'Building a startup in India? Use our free calculators to model your burn rate, rupee-adjusted SaaS margins, and startup valuation strictly calibrated for the Indian market.',
        filters: (cat) => cat === 'Idea Validation' || cat === 'Money & Pricing'
    },
    'free-business-tools': {
        title: '100% Free Business Strategy Tools & Validators',
        keyword: 'free business tools',
        description: 'Access the largest directory of entirely free business calculators, startup validators, and operational dashboards online. No accounts required.',
        filters: () => true // Entire catalog
    },
    'best-decision-tools': {
        title: 'Best Decision Matrices & Mathematical Frameworks',
        keyword: 'best decision tools',
        description: 'Stop using your intuition to guess. Use the best decision-making tools and weighted matrices designed to replace founder emotion with logic.',
        filters: (cat) => cat === 'Strategy' || cat === 'Research'
    },
    'tools-for-founders': {
        title: 'Essential Tools for Bootstrapped Founders',
        keyword: 'tools for founders',
        description: 'A curated directory of startup tools for founders who are bootstrapping and cannot afford expensive consultants.',
        filters: (cat) => cat === 'Idea Validation' || cat === 'Operations'
    },
    'tools-for-freelancers': {
        title: 'Pricing & Productivity Tools for Freelancers',
        keyword: 'tools for freelancers',
        description: 'Stop underpricing your hourly labor. Calculate your fully-burdened freelance rate, estimate project timelines, and defend your margins.',
        filters: (cat) => cat === 'Money & Pricing' || cat === 'Productivity'
    }
};

export function generateMetadata({ params }: { params: { slug: string } }) {
    const page = CATEGORY_PAGES[params.slug];
    if (!page) return {};

    return generatePageMetadata({
        title: `${page.title} | ToolStrategyHub`,
        description: page.description,
        path: `/category/${params.slug}`,
        keywords: [page.keyword, `best ${page.keyword}`, `${page.keyword} online`]
    });
}

export default function CategoryLandingPage({ params }: { params: { slug: string } }) {
    const pageData = CATEGORY_PAGES[params.slug];
    if (!pageData) notFound();

    const relatedTools = toolsRegistry.filter(t => pageData.filters(t.category));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": pageData.title,
        "description": pageData.description,
        "url": `https://toolstrategyhub.com/category/${params.slug}`
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <Link href="/tools" style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to Master Directory
                </Link>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    {pageData.title}
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                    {pageData.description}
                </p>
            </header>

            {/* Keyword Injected Paragraphs for SEO targeting */}
            <section className="stagger-2" style={{ maxWidth: '800px', margin: '0 auto 4rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p>When searching for the <strong>{pageData.keyword}</strong>, operators require immediate, frictionless mathematical validation. We designed this specific suite of {relatedTools.length} tools to execute inside your browser instantly.</p>
                <p>These frameworks combat cognitive bias by substituting theoretical guesses with hardcore algorithmic matrices. Browse the index below to execute our proprietary scripts.</p>
            </section>

            <section id="tool-grid" className="stagger-3" style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {relatedTools.sort((a, b) => b.popularityScore - a.popularityScore).map(tool => (
                        <Link href={`/tools/${tool.slug}`} key={tool.slug} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', transition: 'transform 0.2s', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                            <span className="pill" style={{ alignSelf: 'flex-start', marginBottom: '1rem', fontSize: '0.7rem' }}>{tool.category}</span>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{tool.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, flexGrow: 1 }}>
                                {tool.description}
                            </p>
                            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 'bold' }}>
                                Process Calculator <span>→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
}
