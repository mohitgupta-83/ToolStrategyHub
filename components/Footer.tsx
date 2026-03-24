import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const categories = ["Idea Validation", "Financial Planning", "Project Execution", "Research & Discovery"];

    return (
        <footer style={{ marginTop: '5rem', padding: '5rem 0', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                <div style={{ maxWidth: '300px' }}>
                    <Link href="/" style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.25rem',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '1rem',
                        opacity: 0.85,
                        textDecoration: 'none'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.3))' }}>
                            <Image
                                src="/brand/logo-main.png"
                                alt="ToolStrategyHub Icon"
                                width={24}
                                height={24}
                                style={{ width: 'auto', height: '24px' }}
                            />
                        </div>
                        <span>ToolStrategy<span style={{ color: 'var(--accent-primary)' }}>Hub</span></span>
                    </Link>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                        High-authority data-driven tools for founders, builders, and strategists to validate, calculate, and execute smarter business decisions.
                    </p>
                </div>

                <div>
                    <h4 style={{ marginBottom: '1.25rem', color: 'var(--text-primary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Tools</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><Link href="/tools/startup-idea-validator" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Startup Idea Validator</Link></li>
                        <li><Link href="/tools/saas-pricing-calculator" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>SaaS Pricing Calculator</Link></li>
                        <li><Link href="/tools/decision-matrix-builder" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Decision Matrix Builder</Link></li>
                        <li><Link href="/tools/workflow-cost-calculator" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Workflow Cost Calculator</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ marginBottom: '1.25rem', color: 'var(--text-primary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[
                            { name: "Idea Validation", slug: "idea-validation" },
                            { name: "Money & Pricing", slug: "money-pricing" },
                            { name: "Strategy", slug: "strategy" },
                            { name: "Operations", slug: "operations" },
                            { name: "Research", slug: "research" }
                        ].map(cat => (
                            <li key={cat.slug}><Link href={`/categories/${cat.slug}`} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>{cat.name}</Link></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 style={{ marginBottom: '1.25rem', color: 'var(--text-primary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Ecosystem</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><Link href="/ai-tools" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>AI Tools Hub</Link></li>
                        <li><Link href="/ai-tools/llm-apis" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Free LLM APIs</Link></li>
                        <li><Link href="/ai-tools/agent-skills" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Agent Skills</Link></li>
                        <li><Link href="/ai-tools/free-apis" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Free Developer APIs</Link></li>
                        <li><Link href="/ai-tools/resources" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>AI Resources</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ marginBottom: '1.25rem', color: 'var(--text-primary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resources</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><Link href="/blog" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Guides & Strategy</Link></li>
                        <li><Link href="/about" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>About</Link></li>
                        <li><Link href="/privacy-policy" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Privacy Policy</Link></li>
                        <li><Link href="/terms-of-service" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Terms of Service</Link></li>
                        <li><Link href="/contact" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Contact</Link></li>
                    </ul>
                </div>
            </div>

            <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} ToolStrategyHub. All rights reserved.
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    Designed for scale. Built for speed.
                </div>
            </div>
        </footer>
    );
}
