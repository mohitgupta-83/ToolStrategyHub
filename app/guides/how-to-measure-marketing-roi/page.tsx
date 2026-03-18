import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Measure Marketing ROI: Formulas & Mistakes | ToolStrategyHub',
    description: 'Learn exactly how to calculate Marketing Return on Investment (ROI). Discover the definitive formula, real campaign examples, and analyze channel comparisons to scale profitably.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/how-to-measure-marketing-roi',
    }
};

export default function MarketingRoiGuide() {
    const faqs = [
        {
            q: "What is a 'good' marketing ROI?",
            a: "A standard benchmark for marketing ROI is 5:1 (a 500% return). However, anything over a 2:1 is generally considered profitable, while a 10:1 ratio is considered elite and indicates extreme capital efficiency."
        },
        {
            q: "Does marketing ROI include the salaries of the marketing team?",
            a: "Usually, yes. When calculating true, fully-burdened ROI, the 'Total Marketing Investment' variable must include ad spend, agency fees, software tool subscriptions, and external contractor costs."
        },
        {
            q: "What is the difference between ROAS and Marketing ROI?",
            a: "ROAS (Return on Ad Spend) only looks at direct ad platform costs compared to direct campaign revenue. ROI is a much broader financial metric that accounts for overall gross profit minus total marketing expenditure."
        },
        {
            q: "How can I calculate ROI for a billboard or TV ad?",
            a: "Offline marketing requires attribution modeling. You can use vanity URLs, dedicated discount codes, QR codes, or generalized baseline tracking (comparing total sales during the campaign period versus historical average sales) to estimate the lift."
        },
        {
            q: "Why did my ROI plummet when I tripled my budget?",
            a: "This is known as the Law of Diminishing Returns. Ad platforms exhaust their highly-targeted, high-intent audiences first. As you scale spend, you naturally target colder audiences, which drives up acquisition costs and lowers the relative return."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'How to Measure Marketing ROI',
                description: 'The complete guide to calculating, tracking, and scaling Marketing Return on Investment.',
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
                <span style={{ color: 'var(--text-primary)' }}>Measure Marketing ROI</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    How to Measure Marketing ROI: The Definitive Guide
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    "Half the money I spend on advertising is wasted; the trouble is I don't know which half." Stop guessing. Marketing Return on Investment (ROI) is the mathematical compass that dictates where you allocate your budget. Here's how to measure it flawlessly.
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
                    <li><a href="#definition" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. ROI Definition</a></li>
                    <li><a href="#formula" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. The Core ROI Formula</a></li>
                    <li><a href="#examples" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Real Campaign Examples</a></li>
                    <li><a href="#channel-comparison" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Channel Comparison</a></li>
                    <li><a href="#mistakes" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Critical ROI Mistakes</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="definition" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Marketing ROI Definition</h2>
                    <p>
                        Marketing Return on Investment (ROI) is a performance measure used to evaluate the efficiency and profitability of a marketing campaign. It compares the amount of revenue generated directly by a campaign against the total cost it took to run that campaign.
                    </p>
                    <p>
                        A positive ROI means a campaign is generating more money than it costs. A negative ROI means you are bleeding cash. Modern growth leaders do not allocate budget based on "brand awareness" or "engagement." They allocate budget aggressively into channels where the ROI is definitively positive and measurable.
                    </p>
                    <p>
                        If you want to instantly audit your latest campaign without doing the manual math, use our <Link href="/tools/marketing-roi-calculator" style={{ color: 'var(--accent-primary)' }}>Marketing ROI Calculator</Link>.
                    </p>
                </section>

                <section id="formula" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. The Core ROI Formula</h2>
                    <p>
                        While there are complex attribution models, the core foundational formula for Marketing ROI is universal:
                    </p>
                    
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', margin: '2rem 0', fontFamily: 'monospace', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        Marketing ROI = [(Gross Profit from Campaign - Total Marketing Investment) ÷ Total Marketing Investment] × 100
                    </div>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Breaking Down the Variables</h3>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li><strong>Gross Profit from Campaign:</strong> You must subtract the Cost of Goods Sold (COGS) from the revenue generated by the campaign. If you sell a $1,000 laptop, but it cost you $800 to manufacture, the profit is only $200.</li>
                        <li><strong>Total Marketing Investment:</strong> This isn't just the $5,000 you paid Google for clicks. It is the $5,000 to Google, the $1,000 paid to the freelance copywriter, the $500 paid for the design assets, and the hourly rate of the marketing manager running the campaign.</li>
                    </ul>
                </section>

                <section id="examples" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Real Campaign Examples</h2>
                    <p>
                        Let's illustrate exactly how these variables interact in both a simple and complex environment.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Example 1: The Simple E-Commerce Ad</h3>
                    <p>
                        You spend $2,000 on TikTok ads promoting a $50 water bottle. The bottle costs $20 to manufacture and ship (Gross profit = $30 per unit). The campaign drives 200 sales.
                    </p>
                    <p>
                        Gross Profit from Campaign: 200 sales × $30 profit = $6,000.
                        <br/>
                        Total Investment: $2,000.
                    </p>
                    <p>
                        [($6,000 - $2,000) ÷ $2,000] × 100 = <strong>200% ROI</strong>. (A 2:1 ratio. Highly profitable and ready to scale.)
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Example 2: The SaaS Trade Show (Negative ROI)</h3>
                    <p>
                        A software company sponsors a booth at an industry conference for $10,000. They spend $2,000 flying the sales team out (hotels, food). Total cost: $12,000. They scan 500 badges, send an email sequence, and close 5 new accounts. The profit on a new account is $2,000 for the year.
                    </p>
                    <p>
                        Gross Profit from Campaign: 5 accounts × $2,000 = $10,000.
                        <br/>
                        Total Investment: $12,000.
                    </p>
                    <p>
                        [($10,000 - $12,000) ÷ $12,000] × 100 = <strong>-16.6% ROI</strong>. The company lost money on the conference in Year 1.
                    </p>
                </section>

                <section id="channel-comparison" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Channel Comparison</h2>
                    <p>
                        Comparing the ROI of different channels prevents you from blindly dumping cash into underperforming assets. The ultimate goal is to find arbitrage—where the cost of attention is drastically cheaper than the value it holds.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Paid Search (Google Ads vs Bing Ads)</h3>
                    <p>
                        Often, companies dump 100% of their search budget into Google because of the volume. However, a smart marketer might discover that while Google drives $100k in revenue at a 200% ROI, Bing Ads—despite lower volume—drives $15k in revenue at a massive 800% ROI.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>SEO vs Paid Ads</h3>
                    <p>
                        SEO usually has an initially terrible ROI. You might pay an agency $5,000 a month for six months with zero return. However, once the pages rank, the organic traffic is essentially "free." Over a three-year timeline, the ROI of SEO often eclipses paid ads by an order of magnitude, because the "investment" cost drops to near zero while the "gross profit" continues indefinitely.
                    </p>
                </section>

                <section id="mistakes" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Critical ROI Mistakes</h2>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Mistake 1: Relying on Ad Platform Dashboards</h3>
                    <p>
                        Facebook and Google are heavily incentivized to inflate your perceived return to keep you spending. They will often take credit for a sale if a user merely "saw" an ad three weeks before buying organically. Never rely solely on ROAS metrics inside the ad platform. Build an independent source of truth.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Mistake 2: Using Topline Revenue</h3>
                    <p>
                        As discussed in the formula section, calculating ROI based on gross revenue instead of gross margin is the fastest way to run out of money. You are treating the cost to fulfill the order as if it were pure profit. Always deduct COGS.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Mistake 3: The Short Attribution Window</h3>
                    <p>
                        If you sell high-ticket B2B services, the sales cycle might be 9 months. If you evaluate a LinkedIn ad campaign's ROI 30 days after it ends, it will naturally look like a catastrophic failure. ROI must be tied to the realistic length of your sales funnel.
                    </p>

                    <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Instant Marketing Audit</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Stop wrestling with spreadsheets. Enter your campaign spend, unit margins, and total sales into our engine to generate your true ROI instantly.</p>
                        <Link href="/tools/marketing-roi-calculator" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Launch Marketing ROI Calculator</Link>
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
                     <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Strategic Growth Guides</h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <li><Link href="/guides/marketing-metrics-calculators" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The Marketing Metrics Pillar Hub</Link></li>
                         <li><Link href="/guides/how-to-calculate-conversion-rate" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>How to Measure Conversion Rate Drop-Off</Link></li>
                     </ul>
                </section>

            </article>
        </div>
    );
}
