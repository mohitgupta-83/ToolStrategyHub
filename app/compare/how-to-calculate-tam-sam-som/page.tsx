import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Calculate TAM, SAM and SOM: Formulas, Definitions & Examples',
    description: 'Master how to calculate TAM, SAM, and SOM for your startup or business. Learn the formulas, review real-world software examples, and avoid common investor mistakes.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/compare/how-to-calculate-tam-sam-som',
    },
    keywords: [
        'how to calculate tam sam som',
        'tam sam som formula',
        'tam sam som definition',
        'calculate tam sam som startup',
        'tam sam som market sizing',
        'serviceable obtainable market formula',
    ],
};

export default function HowToCalculateTamSamSomPage() {
    const faqs = [
        {
            q: 'What is the fastest formula to calculate TAM, SAM, and SOM?',
            a: 'TAM = Total Customer Count × Annual Price. SAM = Segment Customer Count (within your geo/product reach) × Annual Price. SOM = Attainable Customer Count (based on sales capacity and conversion rate) × Annual Price. For example: 100,000 potential businesses × $1,000/yr = $100M TAM. 30,000 reachable businesses × $1,000/yr = $30M SAM. 1,500 obtainable customers in Year 1 × $1,000/yr = $1.5M SOM.'
        },
        {
            q: 'What is the main difference between SAM and SOM?',
            a: 'SAM (Serviceable Available Market) represents the entire subset of customers you could technically serve today if you had unlimited sales capacity and zero competition. SOM (Serviceable Obtainable Market) is the realistic slice of the SAM that you can actually close given your current budget, headcount, marketing channels, and competitors.'
        },
        {
            q: 'Why do investors care so much about SOM rather than just TAM?',
            a: 'TAM shows the macro ceiling of the industry, but SOM proves whether you have a realistic go-to-market plan. An investor wants to see how you will generate your first $1M to $5M in Annual Recurring Revenue (ARR) using your specific sales team and marketing spend.'
        },
        {
            q: 'Can a startup have a TAM that is too big?',
            a: 'Yes. Claiming a $500B TAM for a seed-stage company usually indicates that the founder has not defined their customer segment. If your target is "everyone with a computer," you have no clear distribution channel and no wedge into the market.'
        },
        {
            q: 'How often should a business recalculate its TAM, SAM, and SOM?',
            a: 'Recalculate annually, or whenever you change pricing tiers, launch an enterprise sales motion, enter a new geography, or expand your product line into adjacent categories.'
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'How to Calculate TAM, SAM and SOM: Formulas, Definitions & Examples',
                description: 'Complete step-by-step tutorial on calculating Total Addressable Market, Serviceable Available Market, and Serviceable Obtainable Market.',
                author: { '@type': 'Organization', name: 'ToolStrategyHub', url: 'https://toolstrategyhub.com' },
                publisher: { '@type': 'Organization', name: 'ToolStrategyHub', url: 'https://toolstrategyhub.com' },
                url: 'https://toolstrategyhub.com/compare/how-to-calculate-tam-sam-som',
                dateModified: '2026-11-03',
            },
            {
                '@type': 'FAQPage',
                mainEntity: faqs.map(faq => ({
                    '@type': 'Question',
                    name: faq.q,
                    acceptedAnswer: { '@type': 'Answer', text: faq.a }
                }))
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolstrategyhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Comparisons', item: 'https://toolstrategyhub.com/compare' },
                    { '@type': 'ListItem', position: 3, name: 'How to Calculate TAM, SAM and SOM', item: 'https://toolstrategyhub.com/compare/how-to-calculate-tam-sam-som' },
                ]
            }
        ]
    };

    const h2Style: React.CSSProperties = { fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: 1.25 };
    const h3Style: React.CSSProperties = { fontSize: '1.35rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' };
    const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1rem', fontSize: '1.05rem' };
    const cardStyle: React.CSSProperties = {
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1.75rem',
        marginBottom: '2rem',
    };
    const formulaBoxStyle: React.CSSProperties = {
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        padding: '1.25rem 1.5rem',
        fontFamily: 'monospace',
        fontSize: '0.95rem',
        color: 'var(--accent-primary)',
        lineHeight: 1.8,
        marginTop: '0.75rem',
        marginBottom: '1rem',
    };

    return (
        <div style={{ padding: '5rem 2rem', maxWidth: '1080px', margin: '0 auto' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Breadcrumb */}
            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/compare" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Comparisons</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/compare/market-sizing-top-down-vs-bottom-up" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Market Sizing</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>Calculate TAM SAM SOM</span>
            </nav>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(0, 300px)', gap: '4rem', alignItems: 'start' }}>
                <main>
                    <header style={{ marginBottom: '3.5rem' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.85rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'rgba(16,185,129,0.12)',
                            color: 'var(--accent-primary)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            border: '1px solid rgba(16,185,129,0.3)',
                            marginBottom: '1.25rem'
                        }}>
                            Strategic Framework
                        </div>
                        <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.15, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                            How to Calculate TAM, SAM &amp; SOM: Formulas, Definitions &amp; Examples
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '720px' }}>
                            TAM, SAM, and SOM are the three standard metrics founders use to quantify market opportunity. Here is the mathematical framework for calculating all three accurately, with clear formulas, realistic SaaS figures, and an investor-ready presentation structure.
                        </p>
                    </header>

                    {/* Section 1: Visual Overview */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>Understanding the 3 Concentric Rings of Market Sizing</h2>
                        <p style={pStyle}>
                            Think of TAM, SAM, and SOM as three nested circles. Each circle represents a progressively more realistic, operationally grounded tier of your commercial opportunity:
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ ...cardStyle, borderLeft: '4px solid var(--text-primary)', marginBottom: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>1. TAM — Total Addressable Market</h3>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Theoretical Ceiling</span>
                                </div>
                                <p style={{ ...pStyle, margin: 0 }}>
                                    The total revenue available if your company achieved 100% market share with zero competitors. Used by venture funds to evaluate whether the overall space can support an outlier business.
                                </p>
                            </div>

                            <div style={{ ...cardStyle, borderLeft: '4px solid var(--accent-primary)', marginBottom: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--accent-primary)' }}>2. SAM — Serviceable Available Market</h3>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Target Segment</span>
                                </div>
                                <p style={{ ...pStyle, margin: 0 }}>
                                    The segment of the TAM targeted by your current product version, geography, regulatory compliance, and language support. Answers: "Who can actually buy our product right now?"
                                </p>
                            </div>

                            <div style={{ ...cardStyle, borderLeft: '4px solid #10B981', backgroundColor: 'rgba(16,185,129,0.06)', marginBottom: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>3. SOM — Serviceable Obtainable Market</h3>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Near-Term Target</span>
                                </div>
                                <p style={{ ...pStyle, margin: 0 }}>
                                    The realistic revenue you can capture in the next 12 to 36 months based on your current budget, sales headcount, marketing pipeline, and competitive presence.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Formulas */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>The Core Mathematical Formulas</h2>
                        <p style={pStyle}>
                            While many pitch decks use subjective guesses, the standard institutional method uses deterministic unit economics:
                        </p>

                        <h3 style={h3Style}>Formula 1: TAM (Total Addressable Market)</h3>
                        <div style={formulaBoxStyle}>
                            TAM = Total Potential Accounts in Market × Annual Contract Value (ACV)
                        </div>
                        <p style={pStyle}>
                            <em>Example:</em> 120,000 mid-sized accounting firms globally × $3,000 annual subscription = <strong>$360,000,000 TAM</strong>.
                        </p>

                        <h3 style={h3Style}>Formula 2: SAM (Serviceable Available Market)</h3>
                        <div style={formulaBoxStyle}>
                            SAM = TAM × Geographical &amp; Segment Compatibility %
                        </div>
                        <p style={pStyle}>
                            <em>Example:</em> If your software initially only complies with US GAAP accounting standards (40% of global accounting firms): $360,000,000 × 40% = <strong>$144,000,000 SAM</strong> (48,000 firms).
                        </p>

                        <h3 style={h3Style}>Formula 3: SOM (Serviceable Obtainable Market)</h3>
                        <div style={formulaBoxStyle}>
                            SOM = Available SAM Accounts × Realistic Penetration Rate % (Year 1–3)
                        </div>
                        <p style={pStyle}>
                            Or, more credibly, calculated from sales capacity:
                        </p>
                        <div style={formulaBoxStyle}>
                            SOM = Number of Sales Reps × Quota Capacity × ACV
                        </div>
                        <p style={pStyle}>
                            <em>Example:</em> With 4 account executives closing 30 firms per year each (120 new clients/yr) + inbound self-serve (80 clients/yr) = 200 clients × $3,000 ACV = <strong>$600,000 Year 1 SOM</strong>.
                        </p>
                    </section>

                    {/* Section 3: Comparison Grid */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>TAM vs SAM vs SOM Comparison Matrix</h2>
                        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>Feature</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>TAM</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--accent-primary)', fontWeight: 700 }}>SAM</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>SOM</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Time Horizon', 'Long-term (10+ years)', 'Medium-term (3–5 years)', 'Short-term (1–2 years)'],
                                        ['Competitors', 'Assumes 0 competitors', 'Accounts for segment rivals', 'Reflects direct head-to-head battles'],
                                        ['Primary Audience', 'Late-stage VCs, IPO analysts', 'Series A/B venture investors', 'Founders, Sales Leaders, Seed Angels'],
                                        ['Typical SaaS Range', '$500M – $50B+', '$50M – $1B', '$1M – $20M'],
                                        ['Failure Mode', 'Overly generic (market too broad)', 'Ignoring technical limitations', 'Overestimating sales velocity'],
                                    ].map(([feat, tam, sam, som], i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--bg-secondary)' }}>
                                            <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{feat}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{tam}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{sam}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{som}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 4: Investor Mistakes */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>3 Fatal Mistakes Founders Make When Calculating TAM/SAM/SOM</h2>
                        <div style={cardStyle}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <h4 style={{ color: '#ef4444', margin: '0 0 0.35rem 0', fontSize: '1.05rem' }}>Mistake 1: The "1% of China / 1% of Global Market" Fallacy</h4>
                                    <p style={{ ...pStyle, margin: 0 }}>
                                        Stating that you only need 1% of a $50B market sounds humble, but capturing 1% of a crowded market often requires hundreds of millions in marketing capital. Bottom-up accounts are required.
                                    </p>
                                </div>
                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                                    <h4 style={{ color: '#ef4444', margin: '0 0 0.35rem 0', fontSize: '1.05rem' }}>Mistake 2: Conflating Users with Paying Customers</h4>
                                    <p style={{ ...pStyle, margin: 0 }}>
                                        Free tier users, student accounts, and hobbyist developers are not part of your commercial TAM unless you have verified unit conversion rates and positive monetization math.
                                    </p>
                                </div>
                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                                    <h4 style={{ color: '#ef4444', margin: '0 0 0.35rem 0', fontSize: '1.05rem' }}>Mistake 3: Static Pricing Assumptions</h4>
                                    <p style={{ ...pStyle, margin: 0 }}>
                                        Assuming every client pays the same ACV distorts the model. Enterprise tiers typically subsidize SMB accounts. Use a weighted average ACV rather than your lowest introductory price.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Calculator Link */}
                    <section style={{ marginBottom: '4rem', padding: '2.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Test Your TAM, SAM &amp; SOM Math</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto 1.75rem auto' }}>
                            Put your customer volume and average annual revenue per user into our interactive calculator to project your exact market dimensions.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/tools/market-size-estimator" className="btn" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                                Launch Free Market Size Tool →
                            </Link>
                            <Link href="/compare/bottom-up-market-sizing-example" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                                Read SaaS Bottom-Up Example
                            </Link>
                        </div>
                    </section>

                    {/* FAQs */}
                    <section style={{ paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)' }}>
                        <h2 style={h2Style}>Frequently Asked Questions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {faqs.map((faq, idx) => (
                                <details key={idx} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                    <summary style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}>
                                        {faq.q}
                                    </summary>
                                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 0 }}>
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Sidebar */}
                <aside style={{ position: 'sticky', top: '5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Market Sizing Cluster</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li>
                                <Link href="/compare/market-sizing-top-down-vs-bottom-up" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    Top-Down vs Bottom-Up Comparison
                                </Link>
                            </li>
                            <li>
                                <Link href="/compare/bottom-up-market-sizing-example" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    Bottom-Up SaaS Example
                                </Link>
                            </li>
                            <li>
                                <Link href="/compare/market-sizing-formula-explained" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    Formulas &amp; Math Explained
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/market-size-estimator" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    Interactive Market Sizer
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div style={{ padding: '1.5rem', backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16,185,129,0.3)' }}>
                        <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Instant Calculation</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                            Use our client-side estimator to model TAM, SAM, and SOM in under 60 seconds.
                        </p>
                        <Link href="/tools/market-size-estimator" style={{ display: 'block', textAlign: 'center', padding: '0.65rem 1rem', backgroundColor: 'var(--accent-primary)', color: '#000', fontWeight: 700, borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontSize: '0.875rem' }}>
                            Run Calculation →
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}

