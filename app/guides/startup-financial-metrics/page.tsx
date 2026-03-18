import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Startup Financial Metrics Every Founder Must Know | ToolStrategyHub',
    description: 'The master guide to the 6 financial metrics that dictate startup survival: LTV, CAC, Burn Rate, Runway, Break-Even, and Marketing ROI.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/startup-financial-metrics',
    }
};

export default function StartupFinancialMetricsGuide() {
    const faqs = [
        {
            q: "Which metric should I focus on first?",
            a: "If you are pre-product-market fit, focus exclusively on Burn Rate and Runway. Surviving long enough to iterate is priority one. Once you have a working product, shift immediately to Customer Lifetime Value (LTV)."
        },
        {
            q: "What is a 'good' gross margin for a software startup?",
            a: "Software is famous for its massive gross margins. A healthy SaaS company should operate at roughly 75% to 85% gross margin. This means for every dollar of revenue, it only costs 15 to 25 cents to deliver the service (servers, support)."
        },
        {
            q: "Do venture capitalists care about profitability?",
            a: "Historically, no. They cared about top-line revenue growth (scaling). However, in the current macroeconomic environment, 'efficient growth' is mandatory. VCs now heavily scrutinize your LTV:CAC ratio and your path to the Break-Even point."
        },
        {
            q: "How often should I review these metrics?",
            a: "Runway and Burn Rate should be reviewed weekly or bi-weekly. LTV, CAC, and ROI are best reviewed monthly or quarterly across cohorts to smooth out volatility and spot structural trends."
        },
        {
            q: "Can I ignore these if I'm a solo bootstrapper?",
            a: "Absolutely not. Bootstrappers actually need these metrics more than VC-backed companies, because bootstrappers cannot rely on a bailout check if they accidentally miscalculate their cash flow."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Startup Financial Metrics Every Founder Must Know',
                description: 'A comprehensive crash-course in the mandatory financial equations that dictate the life or death of a software startup.',
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
                <span style={{ color: 'var(--text-primary)' }}>Startup Financial Metrics</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    6 Startup Financial Metrics Every Founder Must Know
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    You don't need an MBA to run a startup. But if you don't intimately understand these six numbers, you are driving a racecar blindfolded. Master these equations, or the market will master you.
                </p>
            </header>

            <nav style={{ 
                padding: '2rem', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: 'var(--radius-md)', 
                marginBottom: '4rem',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>The Core Metric Stack</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <li><a href="#ltv" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. Customer Lifetime Value (LTV)</a></li>
                    <li><a href="#cac" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Customer Acquisition Cost (CAC)</a></li>
                    <li><a href="#burn-rate" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Monthly Burn Rate</a></li>
                    <li><a href="#runway" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Startup Runway</a></li>
                    <li><a href="#break-even" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. The Break-Even Point</a></li>
                    <li><a href="#roi" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Marketing ROI</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>7. FAQs</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="ltv" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Customer Lifetime Value (LTV)</h2>
                    <p>
                        LTV is the total gross profit your business secures from a single customer over the entire duration they stay with you. It is the ceiling of your unit economics. If your LTV is $1,000, you cannot spend more than $1,000 to acquire a customer, ever. 
                    </p>
                    <p>
                        It is calculated by multiplying your Average Revenue Per User (adjusted for gross margin) by their expected lifespan (months before they churn).
                    </p>
                    <Link href="/tools/customer-lifetime-value-calculator" className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Calculate LTV Engine →</Link>
                </section>

                <section id="cac" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Customer Acquisition Cost (CAC)</h2>
                    <p>
                        CAC is the total aggregated cost of convincing a potential customer to buy your product. This includes all marketing spend, agency retainers, CRM software, and the salaries of the sales team. It acts as the floor of your unit economics.
                    </p>
                    <p>
                        When dividing your LTV by your CAC, your goal is a 3:1 ratio (you make $3 for every $1 spent). Getting cash back rapidly is mathematically tracked via Payback Periods.
                    </p>
                    <Link href="/tools/cac-payback-calculator" className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Calculate CAC Payback →</Link>
                </section>

                <section id="burn-rate" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Monthly Burn Rate</h2>
                    <p>
                        Your Net Burn Rate is the exact amount of cash you lose every single month. It is calculated rigidly: Total Cash Outflows minus Total Cash Inflows. If you spend $100k but process $25k in revenue, your net burn is $75,000.
                    </p>
                    <p>
                        Venture capital is essentially just financing your burn rate until you can structurally alter the LTV:CAC economics to become profitable.
                    </p>
                </section>

                <section id="runway" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Startup Runway</h2>
                    <p>
                        Runway is how many months your company has left before it DIES. It is the most terrifying and clarifying metric on this list.
                    </p>
                    <p>
                        Runway = Total Bank Balance ÷ Net Monthly Burn Rate. If you have $750,000 and burn $75,000 a month, you have exactly 10 months to save the company through growth, cost-cutting, or fundraising.
                    </p>
                    <Link href="/tools/startup-runway-calculator" className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Track Survival Runway →</Link>
                </section>

                <section id="break-even" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. The Break-Even Point</h2>
                    <p>
                        The Break-Even point is the exact unit sales volume at which your Total Revenue equals your Total Fixed Costs. You are no longer bleeding cash, but you are not yet making a profit.
                    </p>
                    <p>
                        Knowing this number prevents catastrophic pricing errors. If your break-even requires you to sell 5,000 sweaters a month, but your total market size in your city is 2,000 people, your business model mathematically cannot exist.
                    </p>
                    <Link href="/tools/break-even-calculator" className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Find The Break-Even Target →</Link>
                </section>

                <section id="roi" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>6. Marketing ROI</h2>
                    <p>
                        Finally, Marketing Return on Investment (ROI) helps you decide where to deploy cash. It calculates the gross profit of a specific campaign relative to its cost. 
                    </p>
                    <p>
                        If a $5,000 Google Ads campaign nets $15,000 in gross profit, the ROI is 200%. Your job as a founder is to turn off campaigns with negative ROI and pour fuel onto the engines with the highest positive ROI.
                    </p>
                    <Link href="/tools/marketing-roi-calculator" className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Audit Marketing ROI →</Link>
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
                     <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Financial Strategy</h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <li><Link href="/guides/startup-finance-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The Core Startup Finance Hub</Link></li>
                         <li><Link href="/compare/startup-burn-rate-vs-runway" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Deep Dive: Burn vs Runway</Link></li>
                         <li><Link href="/compare/ltv-vs-cac" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Deep Dive: LTV vs CAC</Link></li>
                     </ul>
                </section>

            </article>
        </div>
    );
}
