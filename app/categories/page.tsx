import Link from 'next/link';
import { toolsRegistry } from '@/lib/toolsRegistry';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
    title: 'Business Tool Categories | ToolStrategyHub',
    description: 'Explore tools by category including startup validation, pricing, research, and strategic planning.',
    path: '/categories',
    keywords: ['business tool categories', 'startup tool categories', 'strategic planning tools'],
});

export default function CategoriesIndex() {
    const categoryStats = Object.values(toolsRegistry.reduce((acc, tool) => {
        if (!acc[tool.category]) {
            acc[tool.category] = {
                name: tool.category,
                count: 0,
                slug: tool.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                desc: ''
            };
            if (tool.category === 'Idea Validation') acc[tool.category].desc = 'Scorecards to objectively test startup ideas before writing code.';
            else if (tool.category === 'Money & Pricing') acc[tool.category].desc = 'Calculators to engineer profitable pricing and manage cash flow.';
            else if (tool.category === 'Strategy') acc[tool.category].desc = 'Frameworks to make calculated, bias-free business decisions.';
            else if (tool.category === 'Operations') acc[tool.category].desc = 'Systems to optimize workflow, capacity, and execution speed.';
            else if (tool.category === 'Creators') acc[tool.category].desc = 'Tools to grow, engage, and monetize a digital audience.';
            else if (tool.category === 'Research') acc[tool.category].desc = 'Data-driven tools to analyze markets and outsmart competitors.';
            else acc[tool.category].desc = `Explore ${tool.category} calculation models.`;
        }
        acc[tool.category].count++;
        return acc;
    }, {} as Record<string, { name: string, count: number, slug: string, desc: string }>));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Business Tool Categories",
        "description": "Explore tools by category including startup validation, pricing, research, and strategic planning.",
        "url": "https://toolstrategyhub.com/categories"
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="container" style={{ padding: '6rem 2rem' }}>
                <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '6rem' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                        Explore Tools by Strategy Category
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                        Browse our comprehensive directory of decision-making frameworks, calculators, and validators grouped by business function.
                    </p>
                </header>

                <section className="stagger-2" style={{ maxWidth: '800px', margin: '0 auto 4rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <p>
                        At ToolStrategyHub, we believe that high-quality business logic should be accessible instantly.
                        Whether you are calculating pricing margins, validating a startup idea before writing code, or
                        measuring operational bottlenecks, our proprietary algorithms are categorized to help you execute faster.
                        Below is our full classification. Find the optimal mathematical model for your specific stage of growth.
                    </p>
                </section>

                <section className="stagger-3" style={{ marginBottom: '8rem' }}>
                    <div className="category-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {categoryStats.sort((a, b) => b.count - a.count).map((cat, idx) => (
                            <Link href={`/categories/${cat.slug}`} key={idx} className="category-card" style={{
                                padding: '2.5rem 2rem',
                                backgroundColor: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                                    <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>{cat.name}</h3>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                                        {cat.count} tools
                                    </span>
                                </div>
                                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, zIndex: 2 }}>
                                    {cat.desc}
                                </p>
                                <div style={{ marginTop: 'auto', paddingTop: '1rem', color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.875rem', zIndex: 2 }}>
                                    Explore Category &rarr;
                                </div>
                                <div className="hover-glow" style={{ position: 'absolute', right: '-20%', bottom: '-50%', width: '200px', height: '200px', background: 'var(--accent-muted)', filter: 'blur(50px)', borderRadius: '50%', zIndex: 1, opacity: 0, transition: 'opacity 0.3s' }}></div>
                            </Link>
                        ))}
                    </div>
                    <style dangerouslySetInnerHTML={{
                        __html: `
            .category-card:hover {
                border-color: var(--accent-primary) !important;
                transform: translateY(-4px);
            }
            .category-card:hover .hover-glow {
                opacity: 0.5 !important;
            }
            @media (min-width: 1024px) {
                .category-grid { grid-template-columns: repeat(3, 1fr) !important; }
            }
          `}} />
                </section>
            </div>
        </>
    );
}
