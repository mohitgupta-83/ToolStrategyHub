import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'LTV vs CAC Explained: Understanding the Startup Golden Ratio | ToolStrategyHub',
    description: 'Compare LTV vs CAC. Learn the key differences between Customer Lifetime Value and Customer Acquisition Cost, and how they define your business profitability.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/compare/ltv-vs-cac',
    }
};

export default function LtvVsCacCompare() {
    const faqs = [
        {
            q: "Which is more important to fix first, low LTV or high CAC?",
            a: "Usually, low LTV. If customers leave almost immediately after buying, no amount of cheap marketing will save the business. You have a retention or product-market fit problem. Only try to optimize CAC once your LTV is stable."
        },
        {
            q: "Is it possible to have a negative CAC?",
            a: "Mathematically, CAC is never exactly negative. However, if your business grows purely on viral referral mechanics (like early Dropbox) where users invite others to get more storage, your direct ad spend CAC drops to effectively $0."
        },
        {
            q: "How does inflation affect LTV vs CAC?",
            a: "Inflation usually drives CAC up immediately as ad platforms become more expensive. However, LTV only increases if you successfully pass those cost increases onto your existing customers by raising prices. Otherwise, your ratio compresses."
        },
        {
            q: "Can I ignore LTV if I sell a one-time product?",
            a: "Yes, to a degree. If you sell a highly durable good that people only buy once every 20 years (like a mattress), your LTV is essentially equal to your Average Order Value (AOV). In that case, you treat AOV as your numerator."
        },
        {
            q: "How often should I recalculate the LTV to CAC ratio?",
            a: "For post-PMF startups actively scaling paid spend, you should track it monthly. However, because LTV takes time to mature, use cohort analysis to track 30-day, 60-day, and 90-day LTV to predict the final ratio."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'LTV vs CAC Explained',
                description: 'A detailed comparison of Customer Lifetime Value and Customer Acquisition Cost.',
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
                <Link href="/compare" style={{ color: 'var(--accent-primary)' }}>Comparisons</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>LTV vs CAC</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    LTV vs CAC Explained: The Engine of Growth
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    They are the two most heavily scrutinized acronyms in venture capital. Understanding the fundamental tension between what a customer is worth (LTV) and what a customer costs (CAC) is the absolute prerequisite to scaling a business.
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
                    <li><a href="#definition-ltv" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. What LTV Is (The Ceiling)</a></li>
                    <li><a href="#definition-cac" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. What CAC Is (The Floor)</a></li>
                    <li><a href="#key-differences" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Key Differences Between Them</a></li>
                    <li><a href="#working-together" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. How They Work Together</a></li>
                    <li><a href="#ideal-ratio" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. The Ideal Ratio</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="definition-ltv" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. What LTV Is (The Ceiling)</h2>
                    <p>
                        Customer Lifetime Value (LTV) represents the total gross profit your business secures from a single customer over the entire duration of their relationship with you. It is the absolute maximum amount of money you could theoretically spend to acquire them without taking an operating loss.
                    </p>
                    <p>
                        LTV acts as your economic ceiling. If your LTV is $500, then your marketing budget per user is permanently capped at $499. If you want to spend more to outbid competitors on Google Ads, you must find a way to increase that ceiling by raising prices, upselling features, or decreasing churn. 
                    </p>
                    <p>You can instantly check your absolute ceiling using the <Link href="/tools/customer-lifetime-value-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>LTV Calculator</Link>.</p>
                </section>

                <section id="definition-cac" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. What CAC Is (The Floor)</h2>
                    <p>
                        Customer Acquisition Cost (CAC) is the total aggregated cost of convincing a potential customer to buy a product or service. This encompasses everything: Facebook ad spend, the monthly subscription for your CRM software, your SEO agency fees, and the salaries of your sales team.
                    </p>
                    <p>
                        CAC acts as your economic floor. You must jump over this floor with your LTV just to break even. An unchecked, poorly managed CAC will rapidly consume all cash reserves.
                    </p>
                    <p>To see how quickly you recover this cost, use the <Link href="/tools/cac-payback-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>CAC Payback Calculator</Link>.</p>
                </section>

                <section id="key-differences" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Key Differences</h2>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Origin of the Metric</h3>
                    <p>
                        CAC is an <strong>Acquisition Metric</strong>. It is owned entirely by the Sales and Marketing departments. It measures the efficiency of the front end of the funnel.
                    </p>
                    <p>
                        LTV is a <strong>Retention Metric</strong>. It is heavily influenced by Product, Engineering, and Customer Success departments. It measures the quality of the actual product being delivered.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Timing of the Data</h3>
                    <p>
                        CAC is relatively instantaneous. If you spend $10,000 in January and get 100 customers, your January CAC is $100.
                    </p>
                    <p>
                        LTV is a lagging indicator. You will not know the true "lifetime" value of a January cohort until that cohort finally churns, which could take years. Therefore, LTV is almost always an estimate based on historical churn averages.
                    </p>
                </section>

                <section id="working-together" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. How They Work Together</h2>
                    <p>
                        In a vacuum, high LTV is good and low CAC is good. But business does not happen in a vacuum. You cannot analyze one without the other. They are inherently tied together by market forces.
                    </p>
                    <p>
                        <strong>The Trade-Off:</strong> Usually, the channels that provide the cheapest CAC (like viral TikTok videos) yield customers with the lowest LTV (impulse buyers who churn quickly). High-LTV customers (like enterprise purchasing managers) require a vastly higher CAC (six-month sales cycles, steak dinners, expensive conferences).
                    </p>
                    <p>
                        The goal is not to minimize CAC entirely. The goal is to find an acquisition channel where the delta between the two numbers is highly profitable and infinitely repeatable.
                    </p>
                </section>

                <section id="ideal-ratio" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. The Ideal Ratio</h2>
                    <p>
                        When you divide your LTV by your CAC, you generate the LTV:CAC Ratio. 
                    </p>
                    <p>
                        The universally accepted benchmark for a healthy, scaling SaaS company is <strong>3:1</strong>.
                    </p>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                        <li><strong>&lt; 1:1 :</strong> Actively dying. You are paying more to get customers than they are worth.</li>
                        <li><strong>1:1 to 2:1 :</strong> Struggling. You are likely barely covering overhead.</li>
                        <li><strong>3:1 :</strong> Healthy. The business model works and you have a growth engine.</li>
                        <li><strong>5:1+ :</strong> Elite, but possibly under-investing in marketing. You should spend more to grow faster.</li>
                    </ul>

                    <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Uncover Your Growth Ratio</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Calculate your LTV and compare it to your CAC dynamically to identify your exact unit economics.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                             <Link href="/tools/customer-lifetime-value-calculator" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Calculate LTV</Link>
                             <Link href="/tools/cac-payback-calculator" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>Calculate Payback</Link>
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
                     <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Analysis Guides</h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <li><Link href="/guides/startup-finance-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The complete Startup Finance Tool Hub</Link></li>
                         <li><Link href="/guides/ltv-cac-ratio-explained" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Deep-dive into the LTV:CAC Equation</Link></li>
                     </ul>
                </section>

            </article>
        </div>
    );
}
