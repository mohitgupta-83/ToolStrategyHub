import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Calculate Startup Runway (2026 Guide)',
    description: 'Learn what startup runway means, why it matters for founders, and how to calculate it using the runway formula and burn rate.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/how-to-calculate-startup-runway',
    }
};

export default function HowToCalculateStartupRunway() {
    const faqs = [
        {
            q: "What is startup runway?",
            a: "Startup runway is the number of months your startup has before it runs out of cash, assuming your current burn rate remains constant."
        },
        {
            q: "How do you calculate runway?",
            a: "Runway = Total Cash in Bank / Monthly Net Burn Rate. For example, if you have $500,000 in the bank and burn $50,000 a month, your runway is 10 months."
        },
        {
            q: "What is a good startup runway?",
            a: "For early stage startups, 18 to 24 months of runway is considered standard and healthy, giving you enough time to hit the next major milestone before raising capital again."
        },
        {
            q: "How can I extend my startup's runway?",
            a: "You can extend runway by either decreasing your monthly expenses (cutting burn) or increasing your monthly revenue (generating more cash flow to offset expenses)."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'How to Calculate Startup Runway',
                description: 'Learn what startup runway means, why it matters for founders, and how to calculate it using the runway formula and burn rate.',
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
                <span style={{ color: 'var(--text-primary)' }}>Calculate Startup Runway</span>
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    How to Calculate Startup Runway
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Understanding how much time your business has before it runs out of cash is the most critical survival skill for any founder. This guide explains the startup runway formula, burn rate, and how to extend your company's lifespan.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
                <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>

                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Want to calculate it instantly?</h3>
                        <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>Skip the spreadsheets. Use our free <Link href="/tools/startup-runway-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Startup Runway Calculator</Link> or the <Link href="/tools/startup-burn-rate-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Burn Rate Calculator</Link> for rapid modeling of different spending scenarios.</p>
                    </div>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>What startup runway means</h2>
                        <p>Startup runway is the projected amount of time (usually measured in months) that a company has before it depletes its cash reserves entirely. If your startup is not yet profitable—what investors call "default dead"—the runway represents your operational lifeline. When the runway hits zero, you must either raise more funding, reach profitability, or shut down.</p>
                    </section>
                    
                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Why runway matters for founders</h2>
                        <p>Founders naturally optimize for product development and marketing, often avoiding the harsh reality of their bank accounts. Knowing your runway intimately prevents catastrophic decisions. If a founder knows they only have 4 months left, they can either begin fundraising immediately (which typically takes 3 to 6 months) or execute extreme cost-cutting measures. Waiting until you have 1 month of runway left puts you in a severely disadvantaged negotiating position with investors.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>The Runway formula explained</h2>
                        <p>The mathematical equation for calculating your runway is straightforward:</p>
                        <blockquote style={{ margin: '1rem 0', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderLeft: '3px solid var(--accent-muted)', fontFamily: 'var(--font-mono)' }}>Runway (Months) = Total Cash in Bank / Monthly Net Burn Rate</blockquote>
                        <p>If you have money coming in, it is vital to deduct your monthly revenue from your monthly expenses to find your <strong>Net Burn Rate</strong>. If you only use your expenses (Gross Burn Rate), your runway calculation will be artificially short.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Burn rate vs runway</h2>
                        <p>While often used interchangeably by junior operators, burn rate and runway are distinct metrics. Your <strong>burn rate</strong> is a measure of velocity—the speed at which you are losing money every 30 days. Your <strong>runway</strong> is a measure of time—the total distance you can travel at that current velocity before hitting a wall. You can read more about tracking this in our guide to <Link href="/guides/tools-for-founders" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>financial planning tools for founders</Link>.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Example runway calculation</h2>
                        <p>Let's map out a real world scenario. "TechFlow Inc." has $1,500,000 sitting in their checking account after a successful seed round. Every month, their payroll, cloud hosting, and marketing costs equal $180,000 (Gross Burn). However, they also make $30,000 a month in subscription revenue. <br/><br/>Their Net Burn is $150,000 ($180k - $30k). <br/><br/>Runway = $1,500,000 / $150,000 = 10 Months. TechFlow has exactly 10 months to reach their next milestone or raise Series A funding.</p>
                    </section>
                    
                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Common mistakes founders make</h2>
                        <ul className="guide-list" style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><strong>Ignoring one-off annual expenses:</strong> Many founders forget to include massive yearly SaaS renewals or corporate taxes, causing their actual runway to be shorter than their modeled runway.</li>
                            <li><strong>Assuming revenue will save them:</strong> Calculating your runway on "optimistic projected revenue" instead of "historical average revenue" is dangerous. Always calculate runway based on realistic, conservative assumptions.</li>
                            <li><strong>Starting the fundraise too late:</strong> Fundraising takes time. If you have 6 months of runway, you needed to start fundraising yesterday.</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>How to extend runway</h2>
                        <p>If you are approaching the end of your runway, there are mathematically only two levers to pull: increase incoming cash or decrease outgoing cash. Extending runway often involves laying off non-essential staff, moving to cheaper office spaces, cutting experimental marketing budgets, or accelerating sales cycles to pull cash forward (e.g., offering discounts for annual upfront payments). If you want to see how these adjustments affect your survival directly, use our <Link href="/tools/startup-runway-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Startup Runway Calculator</Link> to visualize alternative scenarios.</p>
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
