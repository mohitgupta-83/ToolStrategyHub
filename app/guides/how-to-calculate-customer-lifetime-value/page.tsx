import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Calculate Customer Lifetime Value (LTV) | ToolStrategyHub',
    description: 'Learn how to calculate Customer Lifetime Value (LTV) for SaaS and ecommerce. Discover formulas, real-world examples, and proven strategies to increase LTV.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/how-to-calculate-customer-lifetime-value',
    }
};

export default function LTVGuide() {
    const faqs = [
        {
            q: "What is a good Customer Lifetime Value (LTV)?",
            a: "A 'good' LTV is relative to your Customer Acquisition Cost (CAC). The gold standard for SaaS businesses is an LTV to CAC ratio of 3:1 or higher. Meaning, if you spend $100 to acquire a customer, their LTV should be at least $300."
        },
        {
            q: "How often should I calculate my LTV?",
            a: "For early-stage startups, calculating LTV quarterly is usually sufficient as data matures. For established businesses with high transaction volumes or subscriptions, monthly tracking is recommended to spot churn trends early."
        },
        {
            q: "Should I use Gross Revenue or Gross Margin for LTV?",
            a: "Always use Gross Margin. Using gross revenue inflates your LTV because it doesn't account for the direct costs of delivering the good or service (COGS). A customer paying $100/mo costs you money to support; you only keep the margin."
        },
        {
            q: "How do I calculate LTV if I just launched my product?",
            a: "If you have less than 6 months of data, use 'Predictive LTV' instead of 'Historical LTV'. Look at your early churn rates and industry benchmarks to estimate average customer lifespan, but treat these initial numbers as highly volatile assumptions."
        },
        {
            q: "Can LTV be infinite?",
            a: "Mathematically, if churn is 0%, LTV approaches infinity. However, in the real world, no customer lasts forever. Most financial models cap the maximum lifespan at 3 to 5 years (36 to 60 months) to prevent unrealistic valuations."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'How to Calculate Customer Lifetime Value (LTV)',
                description: 'A comprehensive guide on calculating and improving Customer Lifetime Value across different business models.',
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
                <span style={{ color: 'var(--text-primary)' }}>Calculate Customer Lifetime Value</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    How to Calculate Customer Lifetime Value (LTV): The Ultimate Guide
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Customer Lifetime Value (LTV) is the heartbeat of your business model. If you don't know how much a customer is worth, you don't know how much you can spend to acquire them. Here is exactly how to calculate, track, and improve your LTV.
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
                    <li><a href="#definition" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. What Customer Lifetime Value Means</a></li>
                    <li><a href="#formula" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. The LTV Formula Explained</a></li>
                    <li><a href="#examples" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Real-World LTV Examples</a></li>
                    <li><a href="#saas-vs-ecommerce" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. LTV for SaaS vs Ecommerce</a></li>
                    <li><a href="#improve-ltv" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. How to Improve Your LTV</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="definition" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. What Customer Lifetime Value (LTV) Means</h2>
                    <p>
                        Customer Lifetime Value—often abbreviated as LTV or CLV—is the total financial worth of a customer to your business over the entirety of their relationship with you. It represents the upper limit of what you can profitably spend to acquire a new user.
                    </p>
                    <p>
                        Why does this matter? If your marketing team spends $500 on Facebook ads to acquire a single customer (your CAC), but that customer only spends $100 before churning, your business is fundamentally broken. You are losing $400 per acquisition. Conversely, if that customer stays for 3 years paying $50 a month, their LTV is $1,800. In that scenario, paying $500 to acquire them is an excellent investment.
                    </p>
                    <p>
                        LTV forces you to look beyond the initial transaction and focus on long-term relationship building, customer retention, and overall unit economics. Try our <Link href="/tools/customer-lifetime-value-calculator" style={{ color: 'var(--accent-primary)' }}>Customer Lifetime Value Calculator</Link> to instantly see your baseline metrics without doing the math manually.
                    </p>
                </section>

                <section id="formula" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. The LTV Formula Explained</h2>
                    <p>
                        Calculating LTV might seem intimidating, but the core formula relies on three basic variables that most modern CRMs and billing software track automatically:
                    </p>
                    
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', margin: '2rem 0', fontFamily: 'monospace', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        LTV = (Average Order Value × Purchase Frequency) × Customer Lifespan
                    </div>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Breaking Down the Variables</h3>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li><strong>Standard Average Order Value (AOV):</strong> This is the total revenue divided by the number of orders. If you made $10,000 from 100 sales, your AOV is $100.</li>
                        <li><strong>Purchase Frequency (PF):</strong> This is the total number of orders divided by the number of unique customers. If 50 customers placed those 100 orders, the PF is 2.</li>
                        <li><strong>Customer Value (CV):</strong> Multiply AOV by PF. In our example, $100 × 2 = $200. This is what a customer is worth to you in a given timeframe (e.g., one year).</li>
                        <li><strong>Customer Lifespan:</strong> How long does a customer stick around? If they stay for an average of 3 years, your lifespan is 3.</li>
                    </ul>
                    <p>
                        Putting it together: A Customer Value of $200 per year multiplied by a 3-year lifespan gives you an LTV of $600.
                    </p>
                    <p><strong>The Margin Caveat:</strong> To be truly accurate, especially for SaaS valuation, LTV should account for Gross Margin. A $600 revenue LTV with a 70% gross margin means your <em>true</em> profit LTV is $420 ($600 x 0.70). Always aim to operate on Margin LTV.
                    </p>
                </section>

                <section id="examples" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Real-World LTV Examples</h2>
                    <p>
                        Let's look at how LTV works across different business environments. Theories are great, but real-world numbers provide the strategic context you need.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Example A: The Local Coffee Shop</h3>
                    <p>
                        A customer visits a local coffee shop twice a week. 
                        They spend $5 per visit (AOV). 
                        That’s $10 a week, or about $520 a year. 
                        If the average customer frequents the shop for 5 years before moving away, the gross revenue LTV is $520 × 5 = $2,600. 
                        If the coffee shop's profit margin on a $5 coffee is 20%, the true Gross Margin LTV is $520. That means the shop can realistically afford to spend $50 on local ads to acquire that regular customer and still be highly profitable.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Example B: B2B Enterprise Software</h3>
                    <p>
                        An enterprise software firm sells a license for $50,000 per year. 
                        Because switching enterprise software is painful, their churn rate is incredibly low—only 5% of companies cancel each year. 
                        To find customer lifespan from churn, you divide 1 by the churn rate (1 / 0.05 = 20 years).
                        Therefore, $50,000 × 20 years = $1,000,000 Gross LTV. 
                        This is why enterprise SaaS companies often fly salespeople across the country for expensive dinners just to close a single deal; the LTV easily justifies a $20,000 Customer Acquisition Cost.
                    </p>
                    
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', marginTop: '2rem' }}>
                        <p style={{ margin: 0 }}>To quickly map these out for your own business, use our <Link href="/tools/business-valuation-calculator" style={{ color: 'var(--accent-primary)' }}>Business Valuation Calculator</Link> to see how increasing LTV multiplies your company's exit value.</p>
                    </div>
                </section>

                <section id="saas-vs-ecommerce" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. LTV for SaaS vs Ecommerce</h2>
                    <p>
                        While the fundamental principle of LTV remains the same, the methodology for calculating it shifts depending on your business model. SaaS and ecommerce handle customer lifespans very differently.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>SaaS LTV Calculation</h3>
                    <p>
                        In Software-as-a-Service, revenue is recurring and predictable. 
                        Instead of calculating purchase frequency, SaaS companies focus heavily on ARPU (Average Revenue Per User) and Churn Rate (the percentage of users who cancel each month).
                    </p>
                    <p>
                        <strong>SaaS Formula:</strong> LTV = (ARPU × Gross Margin) / Churn Rate
                    </p>
                    <p>
                        If your software costs $100/mo, your margin is 80%, and churn is 5% per month:
                        ($100 × 0.80) / 0.05 = $1,600 True LTV. SaaS models are highly sensitive to churn. If you reduce churn from 5% to 4% in that example, LTV jumps to $2,000.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Ecommerce LTV Calculation</h3>
                    <p>
                        Ecommerce revenue is highly transactional. A customer might buy a pair of shoes today and not return for two years. This makes tracking "lifespan" much blurrier than a cancelled subscription.
                    </p>
                    <p>
                        Ecommerce relies heavily on analyzing distinct cohorts. You look at everyone who made their first purchase in Q1 2022, and track their repeat purchases over 12, 24, and 36 months. Ecommerce LTV is highly dependent on effective post-purchase email marketing and remarketing to pull customers back in.
                    </p>
                    <p>For a detailed breakdown of the relationship between acquisition and LTV, check out our guide on the <Link href="/guides/ltv-cac-ratio-explained" style={{ color: 'var(--accent-primary)' }}>LTV to CAC Ratio</Link>.</p>
                </section>

                <section id="improve-ltv" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. How to Improve Your LTV</h2>
                    <p>
                        Increasing LTV is the most sustainable way to grow a business. Acquiring new customers becomes more expensive every year due to rising ad costs, but retaining existing customers is almost entirely within your control.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Implement Upsells and Cross-Sells</h3>
                    <p>
                        McDonald's "Would you like fries with that?" is the most famous cross-sell in history, drastically increasing their AOV. In SaaS, this looks like tiered pricing limits. If a user hits the storage limit, prompt them to upgrade. Increasing the price customers pay (expansion revenue) directly inflates LTV.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Crush Customer Churn</h3>
                    <p>
                        Because lifespan is the multiplier in the LTV equation, reducing churn is the highest leverage activity you can perform. Improve your onboarding process. Call your best customers to ask what they hate about your product. Fix bugs urgently. A customer who stays for 4 years instead of 2 doubles your LTV instantly, with zero added marketing spend.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Transition to Subscriptions</h3>
                    <p>
                        If you are an ecommerce or service business, consider adding a recurring revenue component. Amazon does this brilliantly with "Subscribe & Save," guaranteeing future purchases. Turning unpredictable, one-off purchases into reliable subscriptions stabilizes your LTV logic. Compare models using our <Link href="/tools/saas-pricing-calculator" style={{ color: 'var(--accent-primary)' }}>SaaS Pricing Calculator</Link>.
                    </p>

                    <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Ready to Calculate Your Exact LTV?</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Stop guessing your most important metric. Use our free, advanced calculator to find your True Margin LTV in seconds.</p>
                        <Link href="/tools/customer-lifetime-value-calculator" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Launch LTV Calculator</Link>
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
                     <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Financial Guides</h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <li><Link href="/guides/startup-finance-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Startup Finance Tools Hub</Link></li>
                         <li><Link href="/guides/ltv-cac-ratio-explained" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The LTV to CAC Ratio Explained</Link></li>
                     </ul>
                </section>

            </article>
        </div>
    );
}
