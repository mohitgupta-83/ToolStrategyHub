import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Common SaaS Pricing Mistakes Founders Make',
    description: 'Avoid the most dangerous SaaS pricing errors like underpricing, too many tiers, and ignoring willingness to pay. A guide for startup founders.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/saas-pricing-mistakes',
    }
};

export default function SaaSPricingMistakes() {
    const faqs = [
        {
            q: "How often should a SaaS company change its pricing?",
            a: "Most successful SaaS companies re-evaluate their pricing every 6 to 9 months, and execute a price change or packaging restructure at least once a year."
        },
        {
            q: "Is freemium a pricing strategy?",
            a: "No, freemium is a customer acquisition strategy, not a pricing model. It serves to widen the top of the marketing funnel, but doesn't solve monetization on its own."
        },
        {
            q: "How many pricing tiers should I have?",
            a: "Three tiers is standard (Good, Better, Best). Giving customers more than 4 choices actively decreases conversion rates due to decision fatigue."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Common SaaS Pricing Mistakes Founders Make',
                description: 'Avoid the most dangerous SaaS pricing errors like underpricing, too many tiers, and ignoring willingness to pay. A guide for startup founders.',
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
                <span style={{ color: 'var(--text-primary)' }}>SaaS Pricing Mistakes</span>
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Common SaaS Pricing Mistakes Founders Make
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Pricing is the most powerful yet most neglected lever for growth in Software as a Service. Here are the most prevalent pricing mistakes that choke cash flow and stunt enterprise value.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
                <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>

                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Structure Your SaaS Tiers</h3>
                        <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>Test your tier architecture and revenue potential before committing code using our robust <Link href="/tools/saas-pricing-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>SaaS Pricing Calculator</Link>.</p>
                    </div>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Why SaaS pricing is difficult</h2>
                        <p>Unlike physical goods, software has a marginal cost approaching zero. It doesn't cost an extra $50 in materials to give a new user access; it costs fractions of a cent in server compute. This lack of cost-basis makes it incredibly difficult for founders to understand what their product is worth. Without a hard cost anchoring the price, founders often resort to guessing or blindly copying competitors—both of which leave immense amounts of money on the table.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Undervaluing your product</h2>
                        <p>This is the cardinal sin of early-stage SaaS. Insecure founders price their product at $9/mo because they just want *someone* to use it. But charging low prices signals low value to enterprise buyers. Worse, low price points make your business economically unviable because Customer Acquisition Cost (CAC) remains high. If it costs $100 in Facebook ads to acquire a user, your $9/mo plan will require nearly a year just to achieve a <Link href="/tools/cac-payback-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>CAC Payback</Link>.</p>
                    </section>
                    
                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Too many pricing tiers</h2>
                        <p>Offering a "Starter", "Basic", "Pro", "Advanced", "Elite", and "Enterprise" plan does not capture more of the market. It paralyzes users with choice. Psychological studies repeatedly prove decision fatigue lowers conversion rates. By offering three distinct tiers targeting three distinct buyer personas, you force the user into a simpler binary choice: "Am I a beginner or a pro?"</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Not validating willingness to pay</h2>
                        <p>Founders often spend 9 months building a product and 9 minutes picking a price. They never actually ask target customers the Van Westendorp pricing questions to find the price point where the product is considered a bargain vs getting too expensive. Knowing your customer's <i>Willingness to Pay (WTP)</i> is paramount before committing to a pricing page.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Pricing based on competitors</h2>
                        <p>Just because your biggest competitor charges $49/mo does not mean that is the correct price. How do you know their pricing strategy isn't also a mistake? Furthermore, if you just clone their price, you sacrifice differentiation. A better method is to utilize a value metric—charging based on the ROI they derive from the software (like charging per email sent, rather than a flat fee per month). For alternative approaches, read our breakdown of <Link href="/compare/saas-pricing-vs-one-time-pricing" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>SaaS Pricing vs One-Time Pricing</Link>.</p>
                    </section>
                    
                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>How to test pricing</h2>
                        <p>Pricing is not a "set and forget" feature. Treat your pricing page as a living product experiment. The easiest test is to simply raise prices by 20% for all new visitors over a two-week period. If conversion rates stay the same, you just generated a massive permanent increase in margin and lifetime value. Grandfather your existing customers in to maintain goodwill, but consistently push the boundaries of price elasticity with new cohorts. Model these models cleanly via the <Link href="/tools/saas-pricing-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>SaaS Pricing Calculator</Link>.</p>
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
