import { generatePageMetadata } from '@/lib/seo';
import { toolsRegistry } from '@/lib/toolsRegistry';
import { ARTICLE_TYPES, getAllArticleSlugs } from '@/lib/articleEngine';
import Link from 'next/link';

export const metadata = generatePageMetadata({
    title: 'Strategy Guides & SEO Articles | ToolStrategyHub',
    description: 'Browse 700+ strategy guides, beginner tutorials, tool comparisons, and authority pillars across startup validation, pricing, operations, and creator strategy.',
    path: '/blog',
    keywords: ['strategy guides', 'startup guides', 'pricing tutorials', 'business decision guides'],
});

const PILLAR_GUIDES = [
    { slug: 'startup-validation', title: 'The Ultimate Guide to Startup Validation', category: 'Idea Validation', description: 'Replace emotional validation with mathematical rigor.' },
    { slug: 'pricing-strategy', title: 'B2B SaaS & Freelancer Pricing Strategy Guide', category: 'Money & Pricing', description: 'The hard math behind profitable SaaS and agency pricing.' },
    { slug: 'creator-monetization', title: 'Creator Economy Monetization Strategies', category: 'Creators', description: 'Build a financially stable independent media machine.' },
    { slug: 'business-decision-making', title: 'Frameworks for Business Decision Making', category: 'Strategy', description: 'Force a rules-engine onto your strategic roadmap.' },
];

const ARTICLE_TYPE_LABELS: Record<string, string> = {
    'ultra-long-tail': '🎯 Mistake-Prevention',
    'beginner-guide': '📘 Beginner Guide',
    'how-to': '⚙️ How-To',
    'use-case': '👥 Use Case',
    'comparison': '⚡ vs Comparison',
    'industry-variant': '🏢 Industry Variant',
    'mistakes': '⚠️ Common Mistakes',
    'strategy': '📈 Strategy',
    'alternatives': '🔍 Alternatives',
    'ultimate-guide': '🏆 Ultimate Guide',
};

// Build article suffix helpers (must match articleEngine.ts)
const ARTICLE_SUFFIX_FNS: Array<(slug: string) => string> = [
    (s) => `how-to-use-${s}-without-mistakes`,
    (s) => `${s}-for-beginners`,
    (s) => `how-to-${s.replace(/-calculator$/, '').replace(/-builder$/, '').replace(/-tool$/, '')}-step-by-step`,
    (s) => `${s}-for-startups-and-freelancers`,
    (s) => `${s}-vs-spreadsheet`,
    (s) => `${s}-for-agencies-and-saas`,
    (s) => `common-mistakes-${s}`,
    (s) => `best-strategy-${s}`,
    (s) => `best-tools-for-${'' /* category based — not shown in preview */}`,
    (s) => `ultimate-guide-${s}`,
];

// Pick a sample of tools to feature (high popularity)
const FEATURED_TOOLS = toolsRegistry
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 12);

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Strategy Guides & SEO Articles | ToolStrategyHub',
    description: 'Browse 700+ strategy guides, comparisons, and authority pillars.',
    url: 'https://toolstrategyhub.com/blog',
};

export default function BlogIndexPage() {
    return (
        <div className="container" style={{ padding: '6rem 2rem' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Header */}
            <header className="stagger-1" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Knowledge Hub</div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    Strategy Guides &amp; Tool Articles
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Over 700 algorithmically-generated and hand-crafted guides covering startup validation, pricing, operations, creator strategy, and research. No fluff — just actionable frameworks.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
                    <Link href="/tools" className="btn" style={{ padding: '0.75rem 2rem' }}>Browse All Tools</Link>
                    <Link href="/startup-tools" style={{ padding: '0.75rem 2rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', color: 'var(--text-primary)', textDecoration: 'none' }}>Startup Hub</Link>
                    <Link href="/pricing-tools" style={{ padding: '0.75rem 2rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', color: 'var(--text-primary)', textDecoration: 'none' }}>Pricing Hub</Link>
                </div>
            </header>

            {/* PILLAR GUIDES */}
            <section className="stagger-2" style={{ marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Authority Pillar Guides</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Long-form, 3000+ word authority columns covering foundational strategy topics.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {PILLAR_GUIDES.map(guide => (
                        <Link href={`/guides/${guide.slug}`} key={guide.slug} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '2rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                            <span className="pill" style={{ alignSelf: 'flex-start', marginBottom: '1rem', fontSize: '0.7rem' }}>{guide.category}</span>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>{guide.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, flexGrow: 1 }}>{guide.description}</p>
                            <div style={{ marginTop: '1.25rem', color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.875rem' }}>Read Guide →</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ARTICLE TYPE EXPLANATION */}
            <section className="stagger-2" style={{ marginBottom: '5rem', padding: '3rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>The 10-Article Keyword Ladder</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '700px', lineHeight: 1.6 }}>
                    Every tool in our ecosystem has 10 dedicated articles, optimized to rank across the full keyword difficulty spectrum — from easy long-tail queries to high-competition authority keywords.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {ARTICLE_TYPES.map((type, i) => (
                        <div key={type} style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Article {i + 1}</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{ARTICLE_TYPE_LABELS[type]}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* BROWSE BY TOOL */}
            <section className="stagger-3" style={{ marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Browse Articles by Tool</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Each tool below has 10 articles from beginner guides to ultimate references.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                    {FEATURED_TOOLS.map(tool => (
                        <div key={tool.slug} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                            <span className="pill" style={{ fontSize: '0.65rem', marginBottom: '0.75rem', display: 'inline-block' }}>{tool.category}</span>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{tool.name}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <Link href={`/guides/${tool.slug}-for-beginners`} style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>📘 Beginner Guide</Link>
                                <Link href={`/guides/common-mistakes-${tool.slug}`} style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>⚠️ Common Mistakes</Link>
                                <Link href={`/guides/${tool.slug}-vs-spreadsheet`} style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>⚡ vs Spreadsheet</Link>
                                <Link href={`/guides/ultimate-guide-${tool.slug}`} style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>🏆 Ultimate Guide</Link>
                                <Link href={`/tools/${tool.slug}`} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>→ Launch Tool</Link>
                            </div>
                        </div>
                    ))}
                </div>

                {toolsRegistry.length > 12 && (
                    <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--text-secondary)' }}>
                        Showing 12 of {toolsRegistry.length} tools.{' '}
                        <Link href="/tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Browse all {toolsRegistry.length} tools →</Link>
                    </p>
                )}
            </section>

            {/* BOTTOM CTAs */}
            <section className="stagger-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {[
                    { href: '/startup-tools', label: 'Startup Tools Hub', desc: 'Idea validation, runway, and MVPs.' },
                    { href: '/pricing-tools', label: 'Pricing Tools Hub', desc: 'SaaS pricing, freelance rates, margins.' },
                    { href: '/creator-tools', label: 'Creator Tools Hub', desc: 'Audience growth, monetization, ROI.' },
                    { href: '/research-tools', label: 'Research Tools Hub', desc: 'Market sizing, pain points, TAM.' },
                ].map(({ href, label, desc }) => (
                    <Link href={href} key={href} style={{ display: 'block', padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{label} →</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{desc}</div>
                    </Link>
                ))}
            </section>
        </div>
    );
}
