import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Business Strategy & Startup Guides | ToolStrategyHub',
    description: 'Master the frameworks of success. Deep-dive pillar guides on startup validation, pricing strategy, creator growth, and financial modeling.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides',
    }
};

const MAIN_PILLARS = [
    {
        title: 'Startup Tools Hub',
        slug: 'best-startup-tools',
        desc: 'The definitive collection of tools for validation, research, and early-stage strategy.',
        category: 'Startup'
    },
    {
        title: 'Business Calculators Hub',
        slug: 'business-calculators',
        desc: 'Master your unit economics with the most advanced business calculators available.',
        category: 'Finance'
    },
    {
        title: 'Pricing Strategy Hub',
        slug: 'pricing-strategy-tools',
        desc: 'Algorithmically optimize your SaaS, agency, or freelance pricing for maximum profit.',
        category: 'Pricing'
    },
    {
        title: 'Marketing Metrics Hub',
        slug: 'marketing-metrics-calculators',
        desc: 'Track and optimize every stage of your marketing funnel with data-driven models.',
        category: 'Marketing'
    },
    {
        title: 'Creator Economy Hub',
        slug: 'creator-growth-tools',
        desc: 'Strategic systems for creators looking to turn attention into a sustainable media empire.',
        category: 'Creators'
    },
    {
        title: 'Product Management Hub',
        slug: 'product-strategy-tools',
        desc: 'Frameworks for feature prioritization, product-market fit, and efficient roadmapping.',
        category: 'Product'
    },
    {
        title: 'Market Research Hub',
        slug: 'market-research-tools',
        desc: 'Quantify your market size, analyze competitors, and find underserved customer gaps.',
        category: 'Research'
    },
    {
        title: 'Business Planning Hub',
        slug: 'business-planning-tools',
        desc: 'Architect a sustainable business model and optimize your operational workflows.',
        category: 'Operations'
    },
    {
        title: 'Decision Making Hub',
        slug: 'decision-making-tools',
        desc: 'Eliminate bias and decide with certainty using weighted matrices and risk models.',
        category: 'Strategy'
    },
    {
        title: 'Startup Finance Hub',
        slug: 'startup-finance-tools',
        desc: 'Manage runway, burn rate, and valuation with institutional-grade financial modeling.',
        category: 'Finance'
    }
];

export default function GuidesIndex() {
    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--accent-muted)', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', fontWeight: 'bold' }}>
                    Topical Authority Center
                </div>
                <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Strategic Guides for Modern Builders
                </h1>
                <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.4rem)', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
                    Our pillar guides represent thousands of hours of strategic analysis. Each is designed to provide the mathematical baseline and logic frameworks necessary to win in your domain.
                </p>
            </header>

            <section style={{ marginBottom: '8rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                    {MAIN_PILLARS.map((pillar, i) => (
                        <Link href={`/guides/${pillar.slug}`} key={i} className="card hover-lift" style={{ 
                            padding: '2.5rem', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            height: '100%',
                            textDecoration: 'none',
                            color: 'inherit',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <span className="pill" style={{ 
                                alignSelf: 'flex-start', 
                                marginBottom: '1.5rem',
                                color: 'var(--accent-primary)',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid var(--accent-primary)',
                                padding: '0.25rem 0.75rem',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}>
                                {pillar.category}
                            </span>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{pillar.title}</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, flexGrow: 1 }}>
                                {pillar.desc}
                            </p>
                            <div style={{ marginTop: '2.5rem', color: 'var(--accent-primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Read Full Guide <span>&rarr;</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section style={{ padding: '5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-xl)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Search All Insights</h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                    Looking for a specific calculation or strategic framework? Explore our 70+ tools.
                </p>
                <Link href="/tools" className="btn btn-primary" style={{ padding: '1.25rem 4rem', fontSize: '1.25rem' }}>
                    Browse Tool Library
                </Link>
            </section>
        </div>
    );
}
