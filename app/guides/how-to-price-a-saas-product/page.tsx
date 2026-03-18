import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Price a SaaS Product: Tiers, Psychology & Growth | ToolStrategyHub',
    description: 'A structural masterclass on how to price a Software-as-a-Service (SaaS) product. Learn value-based pricing, tier structuring, and strategic discounting.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/how-to-price-a-saas-product',
    }
};

export default function HowToPriceSaasGuide() {
    const faqs = [
        {
            q: "How many pricing tiers should my SaaS have?",
            a: "The industry standard dictates three tiers: a cheap entry tier, a middle 'Pro' tier, and an expensive 'Enterprise' tier. This exploits the Decoy Effect, visually pushing the majority of users into the middle tier, which serves as your anchor revenue point."
        },
        {
            q: "Should I end prices in .99 or flat numbers?",
            a: "For B2C (consumers), ending in .99 ($19.99) creates the psychological illusion of a bargain. For B2B (businesses), flat pricing ($20, $500, $5,000) is preferred. CFOs do not care about a penny discount, and flat numbers look more authoritative and premium."
        },
        {
            q: "When should I raise prices on existing customers?",
            a: "Ideally, when you significantly increase the tangible value of the product (adding major new AI features, for example). However, if you are terrified of churn, you can 'grandfather' in early adopters on their legacy plan forever, and only raise prices for new signups."
        },
        {
            q: "Is offering a lifetime deal (LTD) a good idea?",
            a: "Usually, no. LTDs pull future cash-flow forward, giving you a massive spike in revenue today, but saddling you with a user you have to pay server costs for forever. They are a dangerous drug. Only use them purely to raise a seed-round equivalent of cash for initial beta testing."
        },
        {
            q: "What is 'Value-Based Pricing'?",
            a: "Instead of charging based on what the software costs to make, or what competitors charge, Value-Based Pricing charges based on the exact ROI the software delivers. If your tool demonstrably saves a company $100,000 a year, you can easily charge them $10,000 a year, regardless of how cheap the tool was to build."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'How to Price a SaaS Product',
                description: 'The definitive framework on pricing strategy, value alignment, and package structuring for SaaS businesses.',
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
                <span style={{ color: 'var(--text-primary)' }}>How to Price a SaaS</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    How to Price a SaaS Product: The Strategy Guide
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    A 1% improvement in pricing increases operating profit by an average of 11%. Yet, most founders spend six months building a product and 30 seconds guessing the price. Here is how to construct a ruthless pricing architecture.
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
                    <li><a href="#value-pricing" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. The Power of Value-Based Pricing</a></li>
                    <li><a href="#tier-structures" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Architecting the "Good-Better-Best" Tiers</a></li>
                    <li><a href="#freemium" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Freemium vs Paid-Only Gates</a></li>
                    <li><a href="#discounting" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. The Annual Discount Strategy</a></li>
                    <li><a href="#psychology" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Pricing Psychology & Scarcity</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="value-pricing" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. The Power of Value-Based Pricing</h2>
                    <p>
                        There are three ways to pick a price. 
                        <strong>Cost-Plus</strong> (figure out server costs, add 20%), 
                        <strong>Competitor-Based</strong> (look at what HubSpot charges, charge $10 less), or 
                        <strong>Value-Based</strong> (charge according to the ROI the customer receives).
                    </p>
                    <p>
                        Value-based pricing is the only strategy that maximizes upside. To execute it, you must quantify the metric your software improves. Does your CRM save a rep 10 hours a week? If their time is worth $50/hour, your software is generating $2,000 of value a month. You can confidently charge $200 a month, because it represents an immediate 10x ROI for the buyer.
                    </p>
                </section>

                <section id="tier-structures" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Architecting the "Good-Better-Best" Tiers</h2>
                    <p>
                        Never offer a single price point. You force a binary "Yes/No" decision. By offering three tiers, the psychology shifts from "Do I buy this?" to "<em>Which one</em> of these do I buy?"
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Decoy Effect Structure</h3>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li><strong>Tier 1 (The Anchor):</strong> Basic features. $29/mo. It exists merely to set the floor.</li>
                        <li><strong>Tier 2 (The Target):</strong> Core features. Hit with a massive "Most Popular" badge. Priced at $79/mo. Visually, the jump in features from Tier 1 is huge, making this look like an aggressive bargain.</li>
                        <li><strong>Tier 3 (The Decoy/Enterprise):</strong> Unlimited everything. $299/mo. Very few buy this, but its existence makes Tier 2 ($79) look incredibly cheap by comparison.</li>
                    </ul>
                    <p>You can simulate how user distribution along these tiers impacts Total Revenue using the <Link href="/tools/product-pricing-simulator" style={{ color: 'var(--accent-primary)' }}>Pricing Simulator</Link>.</p>
                </section>

                <section id="freemium" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Freemium vs Paid-Only Matrix</h2>
                    <p>
                        We discussed this in our <Link href="/compare/saas-pricing-vs-freemium" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Freemium Comparison</Link>, but it bears repeating:
                    </p>
                    <p>
                        If your Marginal CAC (Cost to Acquire) and Server Costs are essentially $0, giving away a hyper-restricted Free Tier is the ultimate top-of-funnel marketing strategy. It lowers friction. It gets users invested in the dashboard. When the feature gate finally hits them, they upgrade because abandoning their saved data is too painful.
                    </p>
                </section>

                <section id="discounting" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. The Annual Discount Strategy</h2>
                    <p>
                        The most critical feature on any SaaS pricing page is the billing toggle: [Monthly | Annually]. 
                    </p>
                    <p>
                        You should aggressively incentivize annual plans by offering a minimum 20% discount (often touted as "Get 2 Months Free"). Why take a 20% haircut? Because monthly SaaS churn averages 5% a month. Over a year, you might lose half those users. An annual plan guarantees 12 months of survival, locks in the cash upfront (increasing your critical runway), and turns a wavering user into an embedded asset.
                    </p>
                </section>

                <section id="psychology" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Pricing Psychology & Scarcity</h2>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Value Metric (The "Per" Factor)</h3>
                    <p>
                        How you scale your price dictates scaling friction. Think of Slack. They don't charge "Per Channel," because that disincentivizes adopting new features. They charge "Per User." This perfectly aligns the price with the value the company gets. Find the core utility metric of your software and price along that axis (Per Seat, Per 1,000 Emails, Per GB).
                    </p>

                    <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Finalize Your Pricing Math</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Calculate expected recurring revenue from conversions across your tiered pricing model instantly.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/tools/saas-pricing-calculator" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Launch Price Calculator</Link>
                            <Link href="/tools/product-pricing-simulator" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>Run Traffic Simulate</Link>
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
                     <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Pricing Strategy Guides</h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <li><Link href="/guides/pricing-strategy-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The Core Pricing Hub</Link></li>
                         <li><Link href="/compare/fixed-pricing-vs-usage-pricing" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Fixed vs Usage Models</Link></li>
                         <li><Link href="/compare/saas-pricing-vs-freemium" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Freemium Trade-offs</Link></li>
                     </ul>
                </section>

            </article>
        </div>
    );
}
