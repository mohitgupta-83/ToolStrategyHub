import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Marketing Metrics Calculators | Conversion & ROI Hub',
    description: 'Calculate your marketing ROI, conversion rates, and lead generation costs with precision. The ultimate hub for data-driven marketers and founders.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/marketing-metrics-calculators',
    }
};

export default function MarketingMetricsHub() {
    const faqs = [
        {
            q: "What is the difference between ROI and ROAS?",
            a: "ROI (Return on Investment) considers the total cost of a campaign including labor and overhead, while ROAS (Return on Ad Spend) only considers the direct cost of the advertising. ROAS tells you if your ads are working; ROI tells you if your business is profitable."
        },
        {
            q: "What is a 'good' conversion rate?",
            a: "A 'good' conversion rate varies by industry and channel. For e-commerce, 2-3% is standard. For high-intent lead generation, 10-20% is possible. The most important metric is how your conversion rate compares to your own historical baseline."
        },
        {
            q: "How do I calculate the value of an email subscriber?",
            a: "Divide your total revenue from email marketing by your total number of active subscribers over a specific period (e.g., 12 months). Use our Email Outreach Calculator to model the impact of increasing your list size vs. increasing your click-through rate."
        },
        {
            q: "Why is CAC payback time more important than total CAC?",
            a: "CAC tells you how much you spent to get a customer, but payback time tells you how long your cash is 'trapped' before it returns to your bank account. A fast payback cycle allows you to reinvest your profits much more quickly, leading to exponential growth."
        },
        {
            q: "How can I improve my content ROI?",
            a: "Focus on 'high leverage' content that solves specific user problems. Use the Content ROI Calculator to determine which topics lead to the most conversions rather than just the most traffic."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Marketing Metrics Calculators',
                description: 'A comprehensive collection of calculators for conversion rates, ROI, and growth tracking.',
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
                <span style={{ color: 'var(--text-primary)' }}>Marketing Metrics</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Marketing Metrics Hub: Data-Driven Growth for Modern Brands
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Modern marketing is a game of math. If you can't measure your performance, you can't improve it. This hub provides the calculators needed to track conversion, ROI, and efficiency across every channel.
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
                    <li><a href="#conversion" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. Conversion Metrics</a></li>
                    <li><a href="#roi" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Campaign ROI Analysis</a></li>
                    <li><a href="#acquisition" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Customer Acquisition Metrics</a></li>
                    <li><a href="#leadgen" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Lead Generation Math</a></li>
                    <li><a href="#channels" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Channel-Specific Optimizers</a></li>
                    <li><a href="#directory" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Marketing Tool Directory</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>7. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="conversion" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Conversion Metrics</h2>
                    <p>
                        Conversion rate is the pulse of your marketing engine. A small increase in conversion can often be more effective than a massive increase in traffic.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Calculating Conversion</h3>
                    <p>
                        The <Link href="/tools/conversion-rate-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Conversion Rate Calculator</Link> allows you to analyze different stages of your funnel. Are people dropping off on the landing page, the checkout, or the post-purchase upsell? Identifying the bottleneck is the first step to optimization.
                    </p>
                    
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', margin: '2rem 0' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Case Study: Funnel Friction</h4>
                        <p>A client reduced their form fields from 7 to 3, resulting in a 45% increase in conversion. Use our calculator to see how much more revenue that would mean for your specific traffic levels.</p>
                    </div>
                </section>

                <section id="roi" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Campaign ROI Analysis</h2>
                    <p>
                        ROI is the ultimate metric. It tells you if your marketing is an investment or an expense.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Total Marketing ROI</h3>
                    <p>
                        Our <Link href="/tools/marketing-roi-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Marketing ROI Calculator</Link> takes into account all costs, providing a true picture of profitability. This is essential for reporting to stakeholders or deciding which campaigns to cut.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Content ROI</h3>
                    <p>
                        Content marketing is notoriously hard to measure. The <Link href="/tools/content-roi-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Content ROI Calculator</Link> assign values to engagement metrics and attribution models to help you see which articles and videos are actually driving the bottom line.
                    </p>
                </section>

                <section id="acquisition" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Customer Acquisition Metrics</h2>
                    <p>
                        How much are you paying for a customer? And how fast do you get that money back?
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>CAC Payback Time</h3>
                    <p>
                        The <Link href="/tools/cac-payback-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>CAC Payback Calculator</Link> is a favorite of venture capitalists. It measures the months required to recover the cost of acquiring a customer. For high-growth companies, keeping this under 12 months is often the goal.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>LTV Projection</h3>
                    <p>
                        The <Link href="/tools/customer-lifetime-value-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>LTV Calculator</Link> helps you predict the long-term revenue a customer will generate. This allows you to justify higher acquisition costs for high-value segments.
                    </p>
                </section>

                <section id="leadgen" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Lead Generation Math</h2>
                    <p>
                        B2B and service companies live on leads. Understanding the math of the "sales qualified lead" (SQL) is vital.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Lead ROI</h3>
                    <p>
                        The <Link href="/tools/lead-generation-roi-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Lead Generation ROI Calculator</Link> helps you work backward from your revenue targets to determine how many leads you need and what you can afford to pay for each.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Email Outreach Efficacy</h3>
                    <p>
                        Cold email and abandoned cart flows are highly measurable. Use the <Link href="/tools/email-outreach-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Email Outreach Calculator</Link> to optimize your open rates, click rates, and response rates.
                    </p>
                </section>

                <section id="channels" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Channel-Specific Optimizers</h2>
                    <p>
                        Every channel has its own rules. Social media requires different math than SEO.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Social Media and Viral Growth</h3>
                    <p>
                        Use the <Link href="/tools/social-media-roi-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Social Media ROI Calculator</Link> to see if your social presence is actually contributing to sales. Additionally, the <Link href="/tools/viral-potential-score" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Viral Potential Score</Link> helps you design campaigns that have the potential for organic, explosive reach.
                    </p>
                </section>

                <section id="directory" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>6. Marketing Tool Directory</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                        {[
                            { name: 'Conversion Rate Calc', path: '/tools/conversion-rate-calculator' },
                            { name: 'Marketing ROI Calc', path: '/tools/marketing-roi-calculator' },
                            { name: 'Lead Gen ROI Calc', path: '/tools/lead-generation-roi-calculator' },
                            { name: 'Content ROI Calc', path: '/tools/content-roi-calculator' },
                            { name: 'Email Outreach Calc', path: '/tools/email-outreach-calculator' },
                            { name: 'Social Media ROI Calc', path: '/tools/social-media-roi-calculator' },
                            { name: 'Keyword Opp Tool', path: '/tools/keyword-opportunity-calculator' },
                            { name: 'Viral Potential Score', path: '/tools/viral-potential-score' },
                            { name: 'CAC Payback Calc', path: '/tools/cac-payback-calculator' },
                            { name: 'LTV Calculator', path: '/tools/customer-lifetime-value-calculator' },
                            { name: 'Posting Freq Optimizer', path: '/tools/posting-frequency-optimizer' },
                            { name: 'Ad Spend Optimizer', path: '/tools/marketing-roi-calculator' }, // Alias
                            { name: 'Launch Timing Analzyer', path: '/tools/launch-timing-analyzer' },
                            { name: 'Audience Persona Builder', path: '/tools/audience-persona-builder' },
                            { name: 'Niche Saturation Score', path: '/tools/niche-saturation-score' },
                            { name: 'Market Size Estimator', path: '/tools/market-size-estimator' },
                            { name: 'Break-Even Calculator', path: '/tools/break-even-calculator' },
                            { name: 'SaaS Pricing Calc', path: '/tools/saas-pricing-calculator' },
                            { name: 'PMF Score', path: '/tools/product-market-fit-score' },
                            { name: 'Revenue Model Designer', path: '/tools/revenue-model-designer' }
                        ].map((tool, i) => (
                            <Link key={i} href={tool.path} style={{ 
                                padding: '1.5rem', 
                                backgroundColor: 'var(--bg-secondary)', 
                                border: '1px solid var(--border-color)', 
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }} className="hover-lift">
                                {tool.name}
                                <span style={{ color: 'var(--accent-primary)' }}>&rarr;</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section id="related-guides" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Strategic Guides</h2>
                    <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', listStyle: 'none', padding: 0 }}>
                        <li><Link href="/guides/best-startup-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Startup Tools Hub</Link></li>
                        <li><Link href="/guides/business-calculators" style={{ color: 'var(--accent-primary)' }}>&bull; Business Calculators Hub</Link></li>
                        <li><Link href="/guides/creator-growth-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Creator Economy Hub</Link></li>
                        <li><Link href="/guides/pricing-strategy-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Pricing Strategy Hub</Link></li>
                    </ul>
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

            </article>

            <footer style={{ marginTop: '6rem', padding: '4rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Stop Wasting Ad Spend</h2>
                <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                    Every click counts. Every impression costs. Ensure your marketing strategy is backed by standard mathematical frameworks.
                </p>
                <Link href="/tools" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                    Explore All Marketing Tools
                </Link>
            </footer>
        </div>
    );
}
