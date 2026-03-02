import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generatePageMetadata({
    title: 'About Us | ToolStrategyHub',
    description: 'Learn why ToolStrategyHub exists to help founders, creators, and operators replace guesswork with algorithmic confidence.',
    path: '/about',
    keywords: ['about toolstrategyhub', 'our mission', 'startup tools platform'],
});

export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header className="stagger-1" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    About ToolStrategyHub
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    We build data-driven tools to replace entrepreneurial guesswork with mathematical confidence.
                </p>
            </header>

            <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p>
                    Building a startup, scaling a freelance agency, or growing a massive audience requires executing hundreds of strategic decisions under conditions of extreme uncertainty. Traditionally, builders rely on intuition, generic advice from outdated paradigms, or subjective emotional validation.
                </p>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Problem with "Gut Feeling"</h2>

                <p>
                    "Gut feeling" is highly vulnerable to cognitive bias. When a founder wants to build a feature, they subconsciously ignore data that suggests the feature isn't viable. When a freelancer sets their hourly rate, imposter syndrome often causes them to underprice their labor, ignoring business overhead and self-employment taxes.
                </p>

                <p>
                    ToolStrategyHub was born out of a simple thesis: <strong>The riskiest aspects of early-stage business execution should be reduced to deterministic algorithms.</strong>
                </p>

                <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', marginTop: '1rem', marginBottom: '1rem' }}>
                    <p style={{ margin: 0, fontStyle: 'italic', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                        "If you cannot express your business strategy as a mathematical formula, you do not actually understand your business strategy."
                    </p>
                </div>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Our Mission</h2>

                <p>
                    We provide rigorous, client-side algorithms that allow operators to instantly simulate business scenarios. By moving computations exclusively to the client-side, your strategic data never touches our servers.
                </p>
                <p>
                    Our platform is built strictly for builders. We emphasize extreme performance, mobile-first design, deep subject-matter expertise, and uncompromising zero-paywall access.
                </p>

                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Ecosystem</h2>

                <p>
                    Currently housing over 70 proprietary calculators and validators, ToolStrategyHub acts as your virtual CFO, fractional CTO, and product strategist. Check out our <Link href="/tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Strategic Tool Directory</Link> to start executing smarter logic today.
                </p>
            </article>
        </div>
    );
}
