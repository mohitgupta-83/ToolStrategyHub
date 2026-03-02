import { notFound } from 'next/navigation';
import {
    getAllArticles,
    getArticleBySlug,
    getToolBySlug,
    getToolsList,
} from '@/lib/contentRegistry';
import { toolsRegistry } from '@/lib/toolsRegistry';
import { generateArticleSchema, generateBreadcrumbSchema, generatePageMetadata } from '@/lib/seo';
import ScrollProgress from '@/components/ScrollProgress';
import Link from 'next/link';
import Script from 'next/script';

// ─────────────────────────────────────────────────────────────────
// UNIFIED HANDLER: handles BOTH the content registry articles
// (legacy) AND the new programmatic use-case long-tail pages
// ─────────────────────────────────────────────────────────────────

type Props = {
    params: {
        toolSlug: string;
        articleSlug: string;
    };
};

// Pre-computed use-case slugs so we know if a slug belongs to that system
const USE_CASE_SLUGS = new Set([
    'for-bootstrappers', 'non-technical-founders', 'b2b-saas',
    'for-agencies', 'for-freelancers', 'b2b-operations',
    'remote-teams', 'for-youtubers', 'for-indie-hackers',
    'content-monetization', 'niche-validation', 'market-analysis',
    'pain-point-discovery', 'for-solopreneurs', 'seed-stage',
    'bootstrapped-founders',
]);

function isUseCasePage(slug: string): boolean {
    return USE_CASE_SLUGS.has(slug);
}

function formatUseCase(slug: string): string {
    return slug
        .split('-')
        .map((w) => {
            if (['b2b', 'saas', 'seo', 'roi', 'mvp'].includes(w)) return w.toUpperCase();
            return w.charAt(0).toUpperCase() + w.slice(1);
        })
        .join(' ');
}

// ─────────────────────────────────────────────────────────────────
// generateStaticParams (optional — keep for legacy articles;
// use-case pages are fully dynamic)
// ─────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
    const articles = getAllArticles();
    return articles.map((article) => ({
        toolSlug: article.toolSlug,
        articleSlug: article.slug,
    }));
}

// ─────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props) {
    // Legacy article path
    const article = getArticleBySlug(params.articleSlug);
    if (article) {
        return generatePageMetadata({
            title: article.title,
            description: article.description,
            path: `/tools/${params.toolSlug}/${article.slug}`,
            keywords: [article.keyword],
        });
    }

    // Use-case path
    if (isUseCasePage(params.articleSlug)) {
        const tool = toolsRegistry.find((t) => t.slug === params.toolSlug);
        if (!tool) return {};
        const formattedUseCase = formatUseCase(params.articleSlug);
        return generatePageMetadata({
            title: `${tool.name} ${formattedUseCase} | ToolStrategyHub`,
            description: `How to use the ${tool.name} specifically for ${formattedUseCase.toLowerCase()}. Free calculator. No account required.`,
            path: `/tools/${params.toolSlug}/${params.articleSlug}`,
            keywords: [`${tool.name.toLowerCase()} ${formattedUseCase.toLowerCase()}`, `${formattedUseCase.toLowerCase()} strategy`],
        });
    }

    return {};
}

// ─────────────────────────────────────────────────────────────────
// PAGE COMPONENT — dispatches to the correct renderer
// ─────────────────────────────────────────────────────────────────
export default function ToolSubPage({ params }: Props) {
    // ── 1. Legacy content-registry article ───────────────────────────
    const article = getArticleBySlug(params.articleSlug);
    if (article) {
        const tool = getToolBySlug(params.toolSlug);
        if (!article || !tool) notFound();
        return <LegacyArticleRenderer article={article} tool={tool} />;
    }

    // ── 2. Programmatic use-case page ───────────────────────────────
    if (isUseCasePage(params.articleSlug)) {
        const tool = toolsRegistry.find((t) => t.slug === params.toolSlug);
        if (!tool) notFound();
        return <UseCaseRenderer tool={tool} useCase={params.articleSlug} />;
    }

    notFound();
}

// ─────────────────────────────────────────────────────────────────
// LEGACY ARTICLE RENDERER (original design preserved exactly)
// ─────────────────────────────────────────────────────────────────
function LegacyArticleRenderer({
    article,
    tool,
}: {
    article: NonNullable<ReturnType<typeof getArticleBySlug>>;
    tool: NonNullable<ReturnType<typeof getToolBySlug>>;
}) {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: tool.name, url: `/tools/${tool.slug}` },
        { name: article.title, url: `/tools/${tool.slug}/${article.slug}` },
    ]);

    const articleSchema = generateArticleSchema(
        article.title,
        article.description,
        `/tools/${tool.slug}/${article.slug}`,
        article.lastUpdated
    );

    return (
        <>
            <ScrollProgress />
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

            <article className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', gap: '3rem' }}>
                <aside style={{ alignSelf: 'start', position: 'sticky', top: '6rem' }}>
                    <div style={{ marginBottom: '2rem', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
                        <Link href="/" style={{ color: 'var(--text-muted)' }}>&larr; Index</Link>
                        <br />
                        <Link href={`/tools/${tool.slug}`} style={{ color: 'var(--accent-primary)', marginTop: '0.5rem', display: 'inline-block' }}>
                            ↳ {tool.name}
                        </Link>
                    </div>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '1rem' }}>Related System</h4>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{tool.name}</div>
                        <p style={{ fontSize: '0.875rem', margin: '1rem 0', color: 'var(--text-secondary)' }}>{tool.description}</p>
                        <Link href={`/tools/${tool.slug}`} className="btn" style={{ width: '100%', textAlign: 'center', fontSize: '0.875rem', padding: '0.5rem' }}>
                            Launch Tool
                        </Link>
                    </div>
                </aside>

                <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                    <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
                        <h1 className="stagger-1" style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>{article.title}</h1>
                        <p className="stagger-2" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{article.description}</p>
                        <div className="stagger-3" style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            <span>Target Vector: <span style={{ color: 'var(--accent-primary)' }}>{article.keyword}</span></span>
                            <span>Last Synchronized: {article.lastUpdated}</span>
                            <span>Est. Read: {Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200))} min</span>
                        </div>
                    </header>
                    <div className="seo-article-content stagger-4" dangerouslySetInnerHTML={{ __html: article.content }} style={{ lineHeight: 1.8, fontSize: '1.1rem' }} />
                    <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Written by Toolkit Core Contributors</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>This guide was meticulously constructed by senior product engineers with thousands of hours of market validation experience.</p>
                        </div>
                    </div>
                </div>

                <aside style={{ alignSelf: 'start', position: 'sticky', top: '6rem' }}>
                    <div className="card" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                        <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--accent-primary)', marginBottom: '1rem' }}>Topical Cluster Nodes</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {getAllArticles().filter((a) => a.toolSlug === tool.slug && a.slug !== article.slug).slice(0, 4).map((related, idx) => (
                                <li key={idx} style={{ borderBottom: idx < 3 ? '1px solid var(--border-focus)' : 'none', paddingBottom: idx < 3 ? '1rem' : '0' }}>
                                    <Link href={`/tools/${tool.slug}/${related.slug}`} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.4, display: 'block' }}>
                                        {related.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '1rem' }}>Other System Tools</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {getToolsList().filter((t) => t.slug !== tool.slug).slice(0, 3).map((t, idx) => (
                                <Link key={idx} href={`/tools/${t.slug}`} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'underline', textDecorationStyle: 'dotted' }}>
                                    {t.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </article>
        </>
    );
}

// ─────────────────────────────────────────────────────────────────
// USE-CASE RENDERER (new programmatic long-tail pages)
// ─────────────────────────────────────────────────────────────────
function UseCaseRenderer({ tool, useCase }: { tool: typeof toolsRegistry[0]; useCase: string }) {
    const formattedUseCase = formatUseCase(useCase);
    const useCaseTarget = formattedUseCase.replace(/^For /, '');

    const HUB_MAP: Record<string, string> = {
        'Idea Validation': 'startup-tools',
        'Money & Pricing': 'pricing-tools',
        'Operations': 'operations-tools',
        'Productivity': 'operations-tools',
        'Creators': 'creator-tools',
        'Research': 'research-tools',
        'Strategy': 'startup-tools',
    };
    const hubSlug = HUB_MAP[tool.category] || 'startup-tools';
    const relatedTools = toolsRegistry.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3);

    const faqs = [
        { q: `Why use the ${tool.name} for ${useCaseTarget}?`, a: `${useCaseTarget} face deeply unique constraints — limited capital, specialized acquisition, or non-standard cost structures. The ${tool.name} models these deterministically rather than relying on generic averages.` },
        { q: `How does the ${tool.name} replace guesswork?`, a: 'It substitutes emotional intuition with rigid, algorithmic matrices. You input variables — it outputs a mathematical reality check.' },
        { q: `Is the ${tool.name} free to use?`, a: 'Yes, 100% free with no paywall or forced account creation.' },
        { q: `Can I export the data?`, a: 'Many tools offer TXT/CSV export directly from the client-side session. Your data is never saved on our servers.' },
        { q: `Where can I find more tools for ${tool.category} strategy?`, a: `Browse our dedicated hub at /${hubSlug} which houses dozens of calculators built for this category.` },
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: `${tool.name} ${formattedUseCase}`,
                description: tool.description,
                author: { '@type': 'Organization', name: 'ToolStrategyHub' },
            },
            {
                '@type': 'FAQPage',
                mainEntity: faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.q,
                    acceptedAnswer: { '@type': 'Answer', text: faq.a },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Tools', item: 'https://toolstrategyhub.com/tools' },
                    { '@type': 'ListItem', position: 2, name: tool.name, item: `https://toolstrategyhub.com/tools/${tool.slug}` },
                    { '@type': 'ListItem', position: 3, name: formattedUseCase, item: `https://toolstrategyhub.com/tools/${tool.slug}/${useCase}` },
                ],
            },
        ],
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/tools" style={{ color: 'var(--accent-primary)' }}>All Tools</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href={`/tools/${tool.slug}`} style={{ color: 'var(--accent-primary)' }}>{tool.name}</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span>{formattedUseCase}</span>
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    {tool.name} <span style={{ color: 'var(--accent-primary)' }}>{formattedUseCase}</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    A dedicated strategy guide on deploying the {tool.name} for {useCaseTarget} to eliminate cognitive bias and execute smarter decisions.
                </p>
            </header>

            <div className="stagger-2" style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '3rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Execute the Strategy Now</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Stop theorizing and run your numbers through the tool.</p>
                <Link href={`/tools/${tool.slug}`} className="btn" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
                    Launch Calculator
                </Link>
            </div>

            <article className="stagger-3" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Danger of Intuition for {useCaseTarget}</h2>
                <p>When {useCaseTarget.toLowerCase()} approach the problem of {tool.category.toLowerCase()}, they typically rely on gut instinct or advice tailored to entirely different business models. If you are operating under these specific constraints, generic frameworks can cause you to misallocate capital.</p>
                <p>The <strong>{tool.name}</strong> was engineered precisely to prevent this failure mode. {tool.description}</p>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Step-by-Step Execution Protocol</h2>
                <ol style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Isolate Your Constraints:</strong> Before opening the <Link href={`/tools/${tool.slug}`} style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>{tool.name}</Link>, note your worst-case scenario metrics. Assume higher acquisition costs, longer timelines, and heavier churn.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Input the Data:</strong> Feed pessimistic variables first. If the margin turns negative, your core thesis needs a pivot before execution.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Determine Scalability:</strong> Incrementally improve variables. Identify the exact tipping point where {useCaseTarget.toLowerCase()} generate asymmetric returns. That metric becomes your primary KPI.</li>
                </ol>

                <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', marginTop: '1rem', marginBottom: '1rem' }}>
                    <p style={{ margin: 0, fontStyle: 'italic', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                        "By substituting emotional attachment for cold, deterministic logic, users drastically increase their velocity to product-market fit."
                    </p>
                </div>

                <p>Continue your research by utilizing our <Link href={`/${hubSlug}`} style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>{tool.category} Category Hub</Link>, which houses interconnected algorithms designed to validate every vector of your strategy.</p>
            </article>

            <section className="stagger-4" style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, idx) => (
                        <details key={idx} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                            <summary style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', cursor: 'pointer' }}>{faq.q}</summary>
                            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            <section style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Related Strategy Tools</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {relatedTools.map((t) => (
                        <Link href={`/tools/${t.slug}`} key={t.slug} style={{ display: 'block', padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{t.name}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{t.description}</div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
