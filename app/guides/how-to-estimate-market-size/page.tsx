import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Estimate Market Size (TAM, SAM, SOM Guide)',
    description: 'A comprehensive guide for founders analyzing total addressable market. Differentiate between TAM, SAM, and SOM so investors take your projections seriously.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/how-to-estimate-market-size',
    }
};

export default function HowToEstimateMarketSize() {
    const faqs = [
        {
            q: "What is TAM SAM SOM?",
            a: "Total Addressable Market (TAM) is your maximum revenue if you captured 100% of the market. Serviceable Available Market (SAM) is the segment you can actually target. Serviceable Obtainable Market (SOM) is what you can realistically capture in the short term."
        },
        {
            q: "Why do investors care about market size?",
            a: "Venture capitalists need outlier, massive returns (50x or more). To get a 50x return on a multi-million-dollar valuation, the startup must generate hundreds of millions in revenue. This is mathematically impossible if the TAM is only $10M a year."
        },
        {
            q: "What's the difference between bottom-up and top-down market sizing?",
            a: "Top-down takes a giant macro industry metric ('Retail software is a $5B market!') and guesses a 1% capture rate. Bottom-up calculates how many exact customers exist in your niche, times the exact annual contract value you'll charge them."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'How to Estimate Market Size (TAM, SAM, SOM Guide)',
                description: 'A comprehensive guide for founders analyzing total addressable market. Differentiate between TAM, SAM, and SOM so investors take your projections seriously.',
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
                <span style={{ color: 'var(--text-primary)' }}>Estimate Market Size</span>
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    How to Estimate Market Size
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Throwing out arbitrary billion-dollar market figures in a pitch deck will instantly destroy your credibility as a founder. Learn exactly how to calculate TAM, SAM, and SOM correctly for serious investors.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
                <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>

                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Do the Math Quickly</h3>
                        <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>Need to calculate your addressable markets fast? Jump straight to our <Link href="/tools/market-size-estimator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Market Size Estimator</Link> or the <Link href="/tools/market-opportunity-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>TAM SAM SOM Calculator</Link>.</p>
                    </div>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>What market size means</h2>
                        <p>Market size is the absolute total revenue available to a business if they successfully captured 100% of the demand for their specific product. It answers a fundamental question: "How large can this company actually become?" If you are building payroll software for small cafes, your market size is the absolute number of small cafes multiplied by the price you charge for the software. Nothing more.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>TAM SAM SOM explained</h2>
                        <p>To accurately describe the market opportunity, professional analysts slice the market into three nested circles: <br/><br/>
                        <strong>Total Addressable Market (TAM):</strong> This is the total universal demand for your product. (e.g. Every cafe in the world that needs payroll software).<br/><br/>
                        <strong>Serviceable Available Market (SAM):</strong> The segment of the TAM within your geographical and logistical reach. (e.g. Only cafes in the US and Canada who use English-language software).<br/><br/>
                        <strong>Serviceable Obtainable Market (SOM):</strong> The realistic percentage of the SAM you can capture in the next 3 to 5 years, given competition and your marketing budget. (e.g. 5% of US cafes).
                        You can instantly visualize this with the <Link href="/tools/market-opportunity-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Market Opportunity Calculator</Link>.
                        </p>
                    </section>
                    
                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Top-down vs bottom-up market sizing</h2>
                        <p><strong>Top-down analysis:</strong> You look at a massive Gartner report declaring "The Global HR Software Market is $25 Billion." Then, you estimate your niche is 2% of that market, and you can capture 10% of that niche. This is incredibly inaccurate and highly frowned upon by investors.<br/><br/><strong>Bottom-up analysis:</strong> You identify the exact number of potential customers (e.g., 50,000 independent US cafes), and multiply it by their Annual Contract Value (ACV) for your software (e.g., $1,000 a year). 50,000 x $1,000 = A $50M TAM. This proves you understand the unit economics of your specific business engine.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Example market sizing</h2>
                        <p>If you launch a $50/month ($600/year) CRM specifically tailored for freelance wedding photographers:
                        <ul className="guide-list" style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                            <li><strong>TAM:</strong> 150,000 wedding photographers globally x $600/yr = $90M</li>
                            <li><strong>SAM:</strong> 50,000 photographers in English-speaking markets x $600/yr = $30M</li>
                            <li><strong>SOM:</strong> Assuming you can aggressively capture 10% of the SAM in 3 years = $3M in ARR.</li>
                        </ul>
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Market sizing mistakes</h2>
                        <ul className="guide-list" style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><strong>Conflating tangential markets:</strong> Selling a CRM for real estate agents does not mean your market size is the entirety of the "global real estate housing market." A $300,000 house sale is irrelevant to your $20/month software cost.</li>
                            <li><strong>Assuming a default 1% capture rate:</strong> Claiming "If we just capture 1% of a billion-dollar market..." is the hallmark of an amateur. Capturing 1% of an enterprise market against an entrenched incumbent could take five years and $20M in venture funding.</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>How investors evaluate market size</h2>
                        <p>A venture capitalist typically looks for a TAM of at least $1 Billion to $3 Billion. Why? Refer back to the venture math. If they want you to exit at a $500M valuation generating $50M in revenue, and your TAM is only $10M total, the investment mathematically cannot work no matter how flawless your software is. The ceiling is too low. Small TAM businesses make great bootstrapped "lifestyle" businesses, but poor venture capital vehicles.</p>
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
