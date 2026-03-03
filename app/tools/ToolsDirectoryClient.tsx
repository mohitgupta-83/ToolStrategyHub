"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { toolsRegistry } from '@/lib/toolsRegistry';

const CATEGORIES = [
    "All Tools",
    "Idea Validation",
    "Money & Pricing",
    "Operations",
    "Creators",
    "Research",
    "Productivity",
    "Strategy"
];

export default function ToolsDirectoryClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Tools");

    const filteredTools = useMemo(() => {
        return toolsRegistry.filter(tool => {
            const matchesCategory = activeCategory === "All Tools" || tool.category === activeCategory;
            const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        }).sort((a, b) => b.popularityScore - a.popularityScore); // Sort by popularity
    }, [searchQuery, activeCategory]);

    return (
        <div className="container" style={{ padding: '6rem 2rem' }}>
            {/* HERO SECTION */}
            <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    All Strategic Decision Tools
                </h1>
                <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem' }}>
                    Explore 70+ tools designed to help founders, creators, and operators make smarter decisions.
                </p>

                {/* SEARCH BAR */}
                <div style={{ maxWidth: '600px', margin: '0 auto', position: 'sticky', top: '2rem', zIndex: 10 }}>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a tool, strategy, or calculator..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1.25rem 1rem 1.25rem 3rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            fontSize: '1.125rem',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                    />
                </div>
            </header>

            {/* CATEGORY FILTER SYSTEM */}
            <section id="categories" className="stagger-2 filter-container" style={{ marginBottom: '4rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                <style jsx>{`
                    .desktop-filters {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.75rem;
                        justify-content: center;
                    }
                    .mobile-filters {
                        display: none;
                        position: sticky;
                        top: 5rem;
                        z-index: 20;
                        width: 100%;
                    }
                    .mobile-filters select {
                        width: 100%;
                        padding: 1rem;
                        border-radius: var(--radius-md);
                        background-color: var(--bg-secondary);
                        border: 1px solid var(--border-color);
                        color: var(--text-primary);
                        font-size: 1rem;
                        font-family: var(--font-sans);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                        appearance: none;
                        -webkit-appearance: none;
                    }
                    @media (max-width: 768px) {
                        .desktop-filters {
                            display: none;
                        }
                        .mobile-filters {
                            display: block;
                        }
                    }
                `}</style>

                {/* Desktop View */}
                <div className="desktop-filters">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: activeCategory === category ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                                color: activeCategory === category ? 'var(--bg-primary)' : 'var(--text-secondary)',
                                border: `1px solid ${activeCategory === category ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                                fontSize: '0.875rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                minHeight: 'unset'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Mobile View */}
                <div className="mobile-filters">
                    <div style={{ position: 'relative' }}>
                        <select
                            value={activeCategory}
                            onChange={(e) => setActiveCategory(e.target.value)}
                        >
                            {CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }}>
                            ▼
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOL GRID */}
            <section className="stagger-3" style={{ marginBottom: '8rem', minHeight: '50vh' }}>
                {filteredTools.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                        <h3>No tools found matching "{searchQuery}"</h3>
                        <p>Try adjusting your search or selecting a different category.</p>
                        <button onClick={() => { setSearchQuery(""); setActiveCategory("All Tools"); }} className="btn btn-secondary" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Clear Filters</button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {filteredTools.map((tool) => (
                            <div key={tool.slug} className="card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', padding: '1.5rem', transition: 'transform 0.2s', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                                <Link
                                    href={`/categories/${tool.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                                    className="pill"
                                    style={{ zIndex: 10, position: 'relative', alignSelf: 'flex-start', marginBottom: '1rem', fontSize: '0.7rem', cursor: 'pointer' }}
                                    title={`View all ${tool.category} tools`}
                                >
                                    {tool.category}
                                </Link>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', position: 'relative', zIndex: 10 }}>
                                    <Link href={`/tools/${tool.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {tool.name}
                                    </Link>
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, flexGrow: 1, position: 'relative', zIndex: 2 }}>
                                    {tool.description}
                                </p>
                                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 'bold', position: 'relative', zIndex: 2 }}>
                                    Launch Tool <span>→</span>
                                </div>
                                <Link href={`/tools/${tool.slug}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }} aria-label={`Launch ${tool.name}`}></Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* SEO CONTENT SECTION */}
            <section className="stagger-4" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem', borderTop: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Why ToolStrategyHub Exists</h2>

                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p>Building a successful business—whether it’s a venture-backed SaaS, a solo freelance agency, or a massive creator audience—requires confronting unknown risks. Traditionally, founders and creators have operated on "gut feeling" or generic advice from mentors who succeeded in entirely different economic conditions.</p>

                    <p>We built <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>ToolStrategyHub</Link> to systematically eliminate guesswork. Every tool in this directory acts as a deterministic formula. By replacing emotion with mathematics, operators can identify fatal flaws in their business models before they waste years of capital and labor.</p>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>Making Better Business Decisions</h3>
                    <p>Decision fatigue kills momentum. When you are staring at a feature backlog, trying to decide what to build next, emotional attachment to your favorite feature often overrides logic. Using tools like our <Link href="/tools/decision-matrix-builder" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Decision Matrix Builder</Link>, you can assign weighted variables to objective criteria, surfacing the mathematically correct path forward.</p>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>Tools Built for Builders & Founders</h3>
                    <p>Founders face a unique set of constraints. Cash runway is always burning, and engineering bandwidth is completely tapped out. You do not have time to learn a complex enterprise SaaS platform just to estimate your costs. Our tools are built to load instantly, require zero account creation, and deliver actionable insights immediately. For instance, our <Link href="/tools/startup-runway-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Startup Runway Calculator</Link> tells you exactly when your cash will hit zero, allowing you to trigger fundraising activities with adequate lead time.</p>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>From Idea to Execution</h3>
                    <p>The graveyard of startups is filled with brilliantly engineered products that nobody wanted to buy. The most critical phase of business development is validation. Before you write a single line of code, you must confirm that a painful problem exists, and that the affected users have a willingness to pay to solve it. Our <Link href="/tools/startup-idea-validator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Startup Idea Validation Scorecard</Link> forces you to brutally assess your thesis against market realities.</p>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>Data Over Guesswork</h3>
                    <p>When freelancers attempt to scale, they usually realize they are trapping themselves in a cycle of underpricing. They calculate their rates based on desired salary, entirely ignoring business overhead, unbillable hours, and risk padding. The <Link href="/tools/freelance-rate-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Freelance Rate Calculator</Link> integrates these hidden costs so you can present fixed-bid proposals that actually generate net profit.</p>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>How Our Tools Work Together</h3>
                    <p>No single tool represents the entire picture. The most successful operators on our platform chain tools together. They start by finding friction in the market, validate the idea, use the <Link href="/tools/market-size-estimator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Market Size Estimator</Link> to pitch investors, and finally design a revenue engine using the <Link href="/tools/saas-pricing-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>SaaS Pricing Calculator</Link>.</p>

                    <p>By treating your execution strategy as a series of calculated algorithms, you vastly increase your likelihood of survival in a hyper-competitive landscape.</p>
                </div>
            </section>
        </div>
    );
}
