import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Common Freelance Pricing Mistakes (2026 Guide)',
    description: 'Learn exactly why freelancers undercharge, fail to factor expenses, and ignore market demand in this comprehensive guide to independent contractor pricing.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/common-mistakes-in-freelance-pricing',
    }
};

export default function CommonFreelancePricingMistakes() {
    const faqs = [
        {
            q: "How do I ask for a higher rate as a freelancer?",
            a: "Quote your rate based on the project's return on investment (ROI). If your design will generate the client $100,000 in new sales over the next year, charging $10,000 is a steal."
        },
        {
            q: "Should I publish my rates on my website?",
            a: "Unless you are selling highly commoditized, productized services (e.g., '$500 for a 3-page template site'), no. Publishing rates limits your ability to implement value-based pricing for larger enterprise clients."
        },
        {
            q: "Why do clients always negotiate my prices down?",
            a: "Because you are communicating 'hours of labor' instead of 'business outcomes'. When you sell labor, clients look for the cheapest laborer. When you sell outcomes, pricing becomes an investment in their own business."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Common Freelance Pricing Mistakes (2026 Guide)',
                description: 'Learn exactly why freelancers undercharge, fail to factor expenses, and ignore market demand in this comprehensive guide to independent contractor pricing.',
                author: { '@type': 'Organization', name: 'ToolStrategyHub' },
            },
            {
                '@type': 'FAQPage',
                mainEntity: faqs.map(faq => ({
                    '@type': 'Question',
                    name: faq.q,
                    acceptedAnswer: { '@type': 'Answer', text: faq.a }
                }))
            }
        ]
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/" style={{ color: 'var(--accent-primary)' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/blog" style={{ color: 'var(--accent-primary)' }}>Guides</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>Common Freelance Mistakes</span>
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Common Freelance Pricing Mistakes
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Every day, highly skilled independent consultants work 60 hours a week only to struggle paying rent. It is almost never a skill issue; it is a pricing strategy issue.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
                <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>

                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Stop Guessing Your Value</h3>
                        <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>See exactly what your minimum baseline hourly rate must be by running the <Link href="/tools/freelance-rate-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Freelance Rate Calculator</Link> to secure your profitability.</p>
                    </div>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Undercharging</h2>
                        <p>Imposter syndrome is the most expensive psychological phenomenon in business. Freelancers routinely price their work at a level they personally feel "comfortable" asking for, rather than what the market dictates the service is actually worth. Consequently, charging $30/hr as a senior developer inherently signals to high-tier clients that the quality of your work is likely terrible, effectively preventing you from acquiring premium clients.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Charging hourly only</h2>
                        <p>The "Time and Materials" model puts an absolute cap on your earning potential. If you can only code 40 hours a week, and your rate is $50 an hour, your max weekly revenue is $2,000. It is impossible to exceed that limit without working nights and weekends. As discussed in our <Link href="/guides/freelance-pricing-for-beginners" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Beginner's Pricing Guide</Link>, as you become an expert, a task that took 10 hours will take 2 hours. If you charge hourly, your expertise is essentially punishing your bank account.</p>
                    </section>
                    
                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Not factoring expenses</h2>
                        <p>A $50/hour W2 job at a corporation pays you nearly $50/hour. A $50/hour freelance gig pays closer to $25/hour after you factor in self-employment taxes, professional invoice software, internet, healthcare, sick days, unpaid vacations, and the massive amount of unbillable time you spend generating leads and having sales calls. Use the <Link href="/tools/freelance-rate-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>calculators</Link> to ensure your gross rate actually covers your net living requirements.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Ignoring demand</h2>
                        <p>Many freelancers mistakenly set their rate once in January and never adjust it. If your schedule is 100% full for the next three months, and you are actively turning away clients, you are dramatically undercharging. A fully booked 3-month pipeline is the market screaming at you to immediately raise your prices by at least 25% for all incoming leads. Your goal is high-margin scarcity, not exhausting volume.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Not adjusting pricing over time</h2>
                        <p>Inflation compounds every year. If you have been working with a legacy client for three years and have never sent them a 10% rate-increase notice, you are actively losing purchasing power while delivering higher-quality, faster work to them. You must standardize a clause in your contracts that automatically increases your baseline rate by 5% to 10% annually to account for inflation and advanced expertise.</p>
                    </section>

                    <section id="faqs" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {faqs.map((faq, idx) => (
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
                </article>
            </div>
        </div>
    );
}
