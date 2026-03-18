import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Top 5 Startup Financial Mistakes That Kill Companies | ToolStrategyHub',
    description: 'Learn the five most common financial mistakes founders make, from premature scaling to ignoring CAC payback periods. Protect your cash runway.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/common-startup-financial-mistakes',
    }
};

export default function StartupFinancialMistakesGuide() {
    const faqs = [
        {
            q: "What is the number one reason startups fail financially?",
            a: "Running out of cash due to premature scaling. Founders raise money and immediately hire massive sales teams or spend heavily on marketing before they have proven Product-Market Fit (PMF) and stable unit economics."
        },
        {
            q: "Is it bad to offer deep discounts to early customers?",
            a: "It's fine to get the first 10 beta testers, but chronic underpricing is a fatal trap. If you charge $10 for a product that costs $15 to support (or acquire), you will mathematically scale yourself into bankruptcy. You must charge enough to cover CAC."
        },
        {
            q: "How fast should I recover my Customer Acquisition Cost (CAC)?",
            a: "The gold standard the best venture capitalists look for is a CAC payback period of under 12 months. If it takes you 3 years to earn back the marketing spend required to acquire a customer, you are acting as an incredibly inefficient bank."
        },
        {
            q: "Why is 'over-hiring' specifically dangerous?",
            a: "Salaries are fixed costs that compound. When you hire an engineer, you don't just pay their salary—you pay software licenses, benefits, and management overhead. If revenue dips, you can pause Google Ads instantly, but you cannot easily 'pause' a workforce without destroying morale."
        },
        {
            q: "Are founders too optimistic about LTV?",
            a: "Almost always. Founders assume a customer will stay subscribed for 5 years because their product is 'essential.' In reality, standard SaaS churn rates dictate most customers leave within 24 to 36 months unless the product is deeply integrated into daily operations."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Common Startup Financial Mistakes',
                description: 'A breakdown of the five fatal financial errors that destroy early-stage startups.',
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
                <Link href="/guides" style={{ color: 'var(--accent-primary)' }}>Guides</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>Financial Mistakes</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    The 5 Startup Financial Mistakes That Kill Companies
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Startups do not die because their code is bad. They die because they run out of money. These are the five most common, easily avoidable financial errors founders make that destroy their cash runway.
                </p>
            </header>

            <nav style={{ 
                padding: '2rem', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: 'var(--radius-md)', 
                marginBottom: '4rem',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Table of Contents</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li><a href="#premature-scaling" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. Premature Scaling</a></li>
                    <li><a href="#ignoring-cac" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Ignoring CAC Payback Periods</a></li>
                    <li><a href="#underpricing" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Chronic Underpricing</a></li>
                    <li><a href="#over-hiring" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Over-Hiring Engineers</a></li>
                    <li><a href="#bad-ltv" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Bad LTV Assumptions</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="premature-scaling" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Premature Scaling</h2>
                    <p>
                        This is the number one startup killer. A founder raises a $2 Million Seed Round based on a pitch deck and a prototype. Because they now have cash in the bank, they believe it is time to "grow." They hire three Account Executives, launch a $20,000/month LinkedIn ad campaign, and lease an office.
                    </p>
                    <p>
                        The problem? They haven't achieved Product Market Fit (PMF) yet. They are pouring gasoline into an engine that doesn't work. The marketing budget burns entirely through cash because the product lacks retention. Never scale spend until your unit economics (LTV to CAC ratio) are profitable.
                    </p>
                    <p>You can check the health of those economics instantly using our <Link href="/tools/startup-burn-rate-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Burn Rate Model</Link>.</p>
                </section>

                <section id="ignoring-cac" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Ignoring CAC Payback Periods</h2>
                    <p>
                        Founders love talking about their Customer Acquisition Cost (CAC), e.g. "We acquired them for $500!" But they ignore the <strong>Payback Period</strong>. If you charge $50 a month, it will take you 10 months just to break even on that $500 ad spend. 
                    </p>
                    <p>
                        During those 10 months, your startup is acting as an uncollateralized bank lending money to its marketing department. If a customer churns in month 6, you permanently lost $200. If your payback period is over 12 months, scaling your marketing budget will actively bankrupt you faster.
                    </p>
                </section>

                <section id="underpricing" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Chronic Underpricing</h2>
                    <p>
                        Most founders are secretly terrified of rejection, so they underprice their product to make selling it easier. They charge $15/month for software that saves a company 20 hours a week.
                    </p>
                    <p>
                        If your price is too low, you cannot afford to spend money on marketing. If your competitor charges $150/month, their Customer Lifetime Value is 10x higher than yours. That means they can spend $400 to acquire a click on Google Ads, while you can only afford to spend $40. They will outbid you, buy all the attention, and starve you out of the market.
                    </p>
                </section>

                <section id="over-hiring" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Over-Hiring Engineers and Management</h2>
                    <p>
                        Headcount is the heaviest anchor on a startup's balance sheet. When a technical roadblock occurs, a founder's instinct is to "throw bodies at the problem." Suddenly, a team of three becomes a team of twelve.
                    </p>
                    <p>
                        A massive team increases communication overhead, slows down iteration velocity, and skyrockets your fixed gross burn. When salaries hit $150k/month, the psychological pressure to raise another round of funding becomes deafening. Keep the team as small as surgically possible until product-market fit is proven.
                    </p>
                </section>

                <section id="bad-ltv" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Bad Customer Lifetime Value Assumptions</h2>
                    <p>
                        LTV is inherently a lagging indicator—you can't know exactly how long a cohort will stay until they finally leave. To appease investors, founders often hallucinate low churn rates. 
                    </p>
                    <p>
                        They project that an SMB customer will stay subscribed for 5 years, resulting in a theoretically massive LTV of $6,000. Based on that $6,000 assumption, they approve spending $2,000 to acquire new users. Six months later, the customers churn. The theoretical $6,000 never materializes, but the $2,000 was already spent in cash. The company dies.
                    </p>

                    <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Protect Your Cash Position Now</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Audit your exact payback timelines and burn rate to ensure you aren't committing these fatal errors.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/tools/startup-burn-rate-calculator" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Audit Burn Rate</Link>
                            <Link href="/tools/cac-payback-calculator" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>Check CAC Payback</Link>
                        </div>
                    </div>
                </section>

                <section id="faqs" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {faqs.map((faq, idx) => (
                            <details key={idx} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                <summary style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}>
                                    {faq.q}
                                </summary>
                                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>
                
                <section id="related-guides" style={{ marginTop: '4rem' }}>
                     <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Cash Management Guides</h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <li><Link href="/guides/startup-finance-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The Core Startup Finance Tools</Link></li>
                         <li><Link href="/guides/startup-financial-metrics" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The 6 Must-Know Financial Metrics</Link></li>
                         <li><Link href="/compare/ltv-vs-cac" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Understanding the LTV/CAC Ratio</Link></li>
                     </ul>
                </section>

            </article>
        </div>
    );
}
