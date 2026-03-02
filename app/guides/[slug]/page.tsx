import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo';
import { toolsRegistry } from '@/lib/toolsRegistry';
import { resolveArticle } from '@/lib/articleEngine';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────
// LEGACY PILLAR GUIDES (4 hand-crafted authority pillars)
// ─────────────────────────────────────────────────────────────────
const PILLAR_GUIDES: Record<string, {
    title: string; category: string; keyword: string;
    description: string; overview: string;
}> = {
    'startup-validation': {
        category: 'Idea Validation',
        title: 'The Ultimate Guide to Startup Validation',
        keyword: 'startup validation',
        description: 'A 3000-word deep dive into algorithmically validating your startup idea before writing code.',
        overview: '90% of startups fail because they build a product nobody wants. This guide maps out how to replace emotional validation with mathematical rigor using deterministic calculators and competitive matrices.',
    },
    'pricing-strategy': {
        category: 'Money & Pricing',
        title: 'B2B SaaS & Freelancer Pricing Strategy Guide',
        keyword: 'pricing strategy',
        description: 'Stop underpricing your labor. Learn the psychological algorithms and hard math behind profitable SaaS and agency pricing.',
        overview: 'Pricing is the most crucial lever in business operations, yet most founders and freelancers pick a number that "feels right." This pillar guide breaks down how to calculate unbillable churn, hardware depreciation, and margins.',
    },
    'creator-monetization': {
        category: 'Creators',
        title: 'Creator Economy Monetization Strategies',
        keyword: 'creator monetization',
        description: 'How to transition from renting attention on social algorithms to building a financially stable independent media machine.',
        overview: 'Views do not equal cash flow. A creator with 5,000 highly targeted B2B newsletter subs can out-earn a TikToker with 2 million followers. This guide explains how to calculate RPM, LTV, and funnel friction.',
    },
    'business-decision-making': {
        category: 'Strategy',
        title: 'Frameworks for Business Decision Making',
        keyword: 'business decision making',
        description: 'How to make multi-variable complex decisions rapidly using weighted matrices and operational logic.',
        overview: 'Decision fatigue kills founders. When faced with 10 competing priorities, your brain defaults to the easiest feature, not the most impactful. This guide forces a rules-engine onto your strategic roadmap.',
    },
};

const HUB_FROM_CATEGORY: Record<string, string> = {
    'Idea Validation': 'startup-tools',
    'Money & Pricing': 'pricing-tools',
    'Operations': 'operations-tools',
    'Productivity': 'operations-tools',
    'Creators': 'creator-tools',
    'Research': 'research-tools',
    'Strategy': 'startup-tools',
};

// ─────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────
export function generateMetadata({ params }: { params: { slug: string } }) {
    const pillar = PILLAR_GUIDES[params.slug];
    if (pillar) {
        return generatePageMetadata({
            title: `${pillar.title} | ToolStrategyHub`,
            description: pillar.description,
            path: `/guides/${params.slug}`,
            keywords: [pillar.keyword, `guide on ${pillar.keyword}`],
        });
    }

    const article = resolveArticle(params.slug);
    if (article) {
        return generatePageMetadata({
            title: `${article.title} | ToolStrategyHub Guides`,
            description: article.metaDescription,
            path: `/guides/${params.slug}`,
            keywords: [article.primaryKeyword, ...article.longTailKeywords.slice(0, 3)],
        });
    }

    return {};
}

// ─────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function GuidePage({ params }: { params: { slug: string } }) {
    // ── Try legacy pillar guide first ────────────────────────────────
    const pillar = PILLAR_GUIDES[params.slug];
    if (pillar) {
        return <PillarGuidePage slug={params.slug} guide={pillar} />;
    }

    // ── Try auto-generated article ───────────────────────────────────
    const article = resolveArticle(params.slug);
    if (article) {
        return <ArticlePage article={article} />;
    }

    notFound();
}

// ─────────────────────────────────────────────────────────────────
// LEGACY PILLAR RENDERER
// ─────────────────────────────────────────────────────────────────
function PillarGuidePage({ slug, guide }: {
    slug: string;
    guide: (typeof PILLAR_GUIDES)[string];
}) {
    const relatedTools = toolsRegistry.filter(t => t.category === guide.category).slice(0, 10);
    const hubSlug = HUB_FROM_CATEGORY[guide.category] || 'startup-tools';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        author: { '@type': 'Organization', name: 'ToolStrategyHub' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://toolstrategyhub.com/guides/${slug}` },
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/blog" style={{ color: 'var(--accent-primary)' }}>Guides & Strategy</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                {guide.title}
            </nav>
            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Topical Authority Pillar</div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{guide.title}</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>{guide.overview}</p>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem', alignItems: 'start' }}>
                <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <p>The fundamental failure mode of early-stage operators is executing based on subjective emotional alignment. When learning {guide.keyword}, entrepreneurs frequently turn to generic advice from thought leaders who haven't built a company in a decade.</p>
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>The Baseline Mechanics</h2>
                    <p>To truly master {guide.keyword}, you must decouple your intuition from the mathematical realities of the market. This is why we engineered a suite of dedicated <Link href={`/${hubSlug}`} style={{ color: 'var(--accent-primary)' }}>{guide.category} Tools</Link>.</p>
                    {relatedTools.slice(0, 3).map(tool => (
                        <div key={tool.slug} style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Required Calculation: <Link href={`/tools/${tool.slug}`} style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>{tool.name}</Link></h3>
                            <p style={{ margin: 0, fontSize: '1rem' }}>When deploying this stage of your strategy, avoid skipping the {tool.name}. {tool.description}</p>
                        </div>
                    ))}
                    <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Full Tool Ecosystem</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {relatedTools.slice(3).map(tool => (
                            <Link href={`/tools/${tool.slug}`} key={tool.slug} style={{ display: 'block', padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{tool.name}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{tool.description}</div>
                            </Link>
                        ))}
                    </div>
                </article>
                <PillarSidebar currentSlug={slug} relatedToolSlug={relatedTools[0]?.slug} relatedToolName={relatedTools[0]?.name} />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
// AUTO-ARTICLE RENDERER
// ─────────────────────────────────────────────────────────────────
function ArticlePage({ article }: { article: NonNullable<ReturnType<typeof resolveArticle>> }) {
    const relatedTools = article.relatedToolSlugs.map(s => toolsRegistry.find(t => t.slug === s)).filter(Boolean);
    const wordsEstimate = article.sections.reduce((acc, s) => acc + s.body.split(' ').length, 0) + article.intro.split(' ').length;
    const readMinutes = Math.max(5, Math.round(wordsEstimate / 200));

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: article.h1,
                description: article.metaDescription,
                author: { '@type': 'Organization', name: 'ToolStrategyHub' },
                mainEntityOfPage: { '@type': 'WebPage', '@id': `https://toolstrategyhub.com/guides/${article.slug}` },
                keywords: [article.primaryKeyword, ...article.longTailKeywords].join(', '),
            },
            {
                '@type': 'FAQPage',
                mainEntity: article.faqs.map(faq => ({
                    '@type': 'Question',
                    name: faq.q,
                    acceptedAnswer: { '@type': 'Answer', text: faq.a },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolstrategyhub.com/' },
                    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://toolstrategyhub.com/blog' },
                    { '@type': 'ListItem', position: 3, name: article.h1, item: `https://toolstrategyhub.com/guides/${article.slug}` },
                ],
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Breadcrumb */}
            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/" style={{ color: 'var(--accent-primary)' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/blog" style={{ color: 'var(--accent-primary)' }}>Guides</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span>{article.h1.slice(0, 50)}{article.h1.length > 50 ? '…' : ''}</span>
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <span className="pill">{article.tool.category}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Article {article.typeIndex} of 10</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>⏱ {readMinutes} min read</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', padding: '2px 8px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                        Competition: {article.competitionLevel}
                    </span>
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    {article.h1}
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    {article.intro}
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '4rem', alignItems: 'start' }}>

                {/* MAIN CONTENT */}
                <div>
                    {/* Table of Contents */}
                    <div className="stagger-2" style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>Table of Contents</h2>
                        <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {article.toc.map((item, i) => (
                                <li key={i}>
                                    <a href={`#section-${i}`} style={{ color: 'var(--accent-primary)', fontSize: '0.95rem' }}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                            <li><a href="#faqs" style={{ color: 'var(--accent-primary)', fontSize: '0.95rem' }}>Frequently Asked Questions</a></li>
                        </ol>
                    </div>

                    {/* Sticky "Try Tool" Banner */}
                    <div style={{ position: 'sticky', top: '1rem', zIndex: 20, padding: '1rem 1.5rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-md)', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1rem' }}>
                            Ready to calculate? → {article.tool.name}
                        </span>
                        <Link href={`/tools/${article.tool.slug}`} className="btn" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                            Launch Free Tool
                        </Link>
                    </div>

                    {/* Article Sections */}
                    <article className="stagger-3" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        {article.sections.map((section, idx) => (
                            <section key={idx} id={`section-${idx}`}>
                                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                                    {section.heading}
                                </h2>
                                {/* Render markdown-like content (bold, links) as plain text for SSR safety */}
                                {section.body.split('\n\n').map((para, pIdx) => {
                                    if (para.startsWith('- ') || para.startsWith('1. ') || para.startsWith('**Step')) {
                                        return (
                                            <div key={pIdx} style={{ padding: '1rem 1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1rem', fontSize: '1rem' }}>
                                                <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{para.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\[(.*?)\]\((.*?)\)/g, '$1')}</pre>
                                            </div>
                                        );
                                    }
                                    if (para.startsWith('|')) {
                                        // Table rendering (simple)
                                        const rows = para.split('\n').filter(r => !r.match(/^[\|\-\s]+$/));
                                        return (
                                            <div key={pIdx} style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                    {rows.map((row, rIdx) => {
                                                        const cells = row.split('|').filter(c => c.trim());
                                                        const Tag = rIdx === 0 ? 'th' : 'td';
                                                        return (
                                                            <tr key={rIdx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                                {cells.map((cell, cIdx) => (
                                                                    <Tag key={cIdx} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: rIdx === 0 ? 'bold' : 'normal', color: rIdx === 0 ? 'var(--text-primary)' : 'inherit' }}>{cell.trim()}</Tag>
                                                                ))}
                                                            </tr>
                                                        );
                                                    })}
                                                </table>
                                            </div>
                                        );
                                    }
                                    // Inline link rendering (convert [text](href) to <a>)
                                    const parts = para.split(/(\[.*?\]\(.*?\))/g);
                                    return (
                                        <p key={pIdx}>
                                            {parts.map((part, partIdx) => {
                                                const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                                                if (linkMatch) {
                                                    return <Link key={partIdx} href={linkMatch[2]} style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>{linkMatch[1]}</Link>;
                                                }
                                                // Handle bold
                                                const boldParts = part.split(/(\*\*.*?\*\*)/g);
                                                return boldParts.map((bp, bpIdx) => {
                                                    const boldMatch = bp.match(/\*\*(.*?)\*\*/);
                                                    return boldMatch ? <strong key={bpIdx} style={{ color: 'var(--text-primary)' }}>{boldMatch[1]}</strong> : <span key={bpIdx}>{bp}</span>;
                                                });
                                            })}
                                        </p>
                                    );
                                })}

                                {/* Mid-article Related Tools (after section 2) */}
                                {idx === 2 && relatedTools.length > 0 && (
                                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginTop: '2rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Related Tools</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {relatedTools.map(t => t && (
                                                <Link href={`/tools/${t.slug}`} key={t.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                                                    <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>{t.name}</span>
                                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Launch →</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>
                        ))}
                    </article>

                    {/* FAQ Section */}
                    <section id="faqs" className="stagger-4" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {article.faqs.map((faq, idx) => (
                                <details key={idx} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                    <summary style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}>
                                        {faq.q}
                                    </summary>
                                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Bottom CTA */}
                    <div style={{ marginTop: '4rem', padding: '3rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Apply This Knowledge Now</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>Stop theorizing. Launch the {article.tool.name} and run your numbers in the next 3 minutes.</p>
                        <Link href={`/tools/${article.tool.slug}`} className="btn" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
                            Launch the {article.tool.name} — Free
                        </Link>
                    </div>
                </div>

                {/* SIDEBAR */}
                <aside style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Primary Tool CTA */}
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Execute This Strategy</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Free. No account. Instant calculation. All data stays in your browser.
                        </p>
                        <Link href={`/tools/${article.tool.slug}`} className="btn" style={{ padding: '0.75rem', width: '100%', textAlign: 'center', display: 'block', fontSize: '0.95rem' }}>
                            Launch {article.tool.name}
                        </Link>
                    </div>

                    {/* Keyword Intelligence */}
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>Keyword Focus</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>{article.primaryKeyword}</li>
                            {article.longTailKeywords.map((kw, i) => (
                                <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>• {kw}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Category Hub */}
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>More {article.tool.category} Resources</h4>
                        <Link href={`/${article.categoryHubSlug}`} style={{ display: 'block', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-primary)', fontWeight: 'bold', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                            Browse {article.tool.category} Hub →
                        </Link>
                    </div>

                    {/* Related Articles (in same 10-article set) */}
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                        <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>More on {article.tool.name}</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {[
                                { label: 'Beginner Guide', suffix: `${article.tool.slug}-for-beginners` },
                                { label: 'Common Mistakes', suffix: `common-mistakes-${article.tool.slug}` },
                                { label: 'Ultimate Guide', suffix: `ultimate-guide-${article.tool.slug}` },
                            ]
                                .filter(l => l.suffix !== article.slug)
                                .map((link) => (
                                    <li key={link.suffix}>
                                        <Link href={`/guides/${link.suffix}`} style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', textDecoration: 'underline' }}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
// PILLAR SIDEBAR (reused by legacy guides)
// ─────────────────────────────────────────────────────────────────
function PillarSidebar({ currentSlug, relatedToolSlug, relatedToolName }: {
    currentSlug: string; relatedToolSlug?: string; relatedToolName?: string;
}) {
    return (
        <aside style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {relatedToolSlug && (
                <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Execute This Strategy</h3>
                    <Link href={`/tools/${relatedToolSlug}`} className="btn" style={{ padding: '0.75rem', width: '100%', textAlign: 'center', display: 'block' }}>
                        Launch {relatedToolName}
                    </Link>
                </div>
            )}
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>Other Authority Guides</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {Object.entries(PILLAR_GUIDES)
                        .filter(([k]) => k !== currentSlug)
                        .map(([k, v]) => (
                            <li key={k}>
                                <Link href={`/guides/${k}`} style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', textDecoration: 'underline' }}>
                                    {v.title}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </aside>
    );
}
