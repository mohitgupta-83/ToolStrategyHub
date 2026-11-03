import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Market Sizing Formula Explained: Bottom-Up & Top-Down Math (2026)',
    description: 'Learn the exact market sizing formulas for startups and businesses. Understand TAM, SAM, and SOM mathematics, review business model variations, and see worked examples.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/compare/market-sizing-formula-explained',
    },
    keywords: [
        'market sizing formula',
        'bottom up market sizing formula',
        'tam formula',
        'market sizing formula explained',
        'how to calculate market size formula',
        'top down market sizing formula',
    ],
};

export default function MarketSizingFormulaExplainedPage() {
    const faqs = [
        {
            q: 'What is the fundamental formula for market sizing?',
            a: 'The foundational formula for bottom-up market sizing is: Market Size (TAM) = Total Addressable Customers × Average Contract Value (ACV) or Average Revenue Per User (ARPU). For top-down sizing, the formula is: Market Size = Total Industry Market Value × Addressable Subsegment Percentage.'
        },
        {
            q: 'How does the market sizing formula change for B2B SaaS vs B2C apps?',
            a: 'For B2B SaaS, the unit is accounts or companies, and the multiplier is Annual Contract Value (ACV): Accounts × ACV. For B2C mobile apps, the unit is individual active users, and the multiplier is Average Revenue Per User (ARPU) plus monetization rate: Total Users × Conversion % × Annual Subscription or In-App Spend.'
        },
        {
            q: 'How do you incorporate churn into a market sizing formula?',
            a: 'TAM represents the static annual market cap, but when projecting obtainable market (SOM) over a multi-year horizon, net revenue retention (NRR) and churn must be factored into cumulative customer counts: SOM(Year t) = [Existing Customers × (1 - Churn Rate) + New Customer Acquisitions] × ACV.'
        },
        {
            q: 'What is market triangulation in sizing models?',
            a: 'Market triangulation is the practice of calculating market size using three distinct methodologies — bottom-up, top-down, and competitor revenue aggregation (value theory) — to cross-verify the results. If your bottom-up TAM is $150M and top-down is $8B, triangulation explains that you are capturing a distinct 1.8% niche slice.'
        },
        {
            q: 'What is the difference between revenue-based and volume-based market sizing formulas?',
            a: 'Volume-based sizing calculates the total physical units sold or transactions processed (e.g., 50 million packages delivered per year). Revenue-based sizing multiplies those units by the average take rate or dollar transaction fee to produce the actual addressable revenue pool.'
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Market Sizing Formula Explained: Bottom-Up & Top-Down Math (2026)',
                description: 'Detailed breakdown of the mathematical formulas used to estimate Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM).',
                author: { '@type': 'Organization', name: 'ToolStrategyHub', url: 'https://toolstrategyhub.com' },
                publisher: { '@type': 'Organization', name: 'ToolStrategyHub', url: 'https://toolstrategyhub.com' },
                url: 'https://toolstrategyhub.com/compare/market-sizing-formula-explained',
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
                    { '@type': 'ListItem', position: 3, name: 'Market Sizing Formula Explained', item: 'https://toolstrategyhub.com/compare/market-sizing-formula-explained' },
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
        lineHeight: 1.9,
        marginTop: '0.75rem',
        marginBottom: '1rem',
        overflowX: 'auto',
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
                <span style={{ color: 'var(--text-primary)' }}>Formula Explained</span>
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
                            Financial Formulas
                        </div>
                        <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.15, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                            Market Sizing Formula Explained: Bottom-Up &amp; Top-Down Math
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '720px' }}>
                            A market sizing estimate is only as credible as the arithmetic behind it. This guide deconstructs every market sizing formula, explains the unit economic variables, and shows how to model market potential across different business models.
                        </p>
                    </header>

                    {/* Section 1: The Core Formula Breakdown */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>1. The 4 Fundamental Market Sizing Formulas</h2>
                        <p style={pStyle}>
                            Regardless of your business model, institutional market sizing operates on four core algebraic structures:
                        </p>

                        <h3 style={h3Style}>Formula A: Bottom-Up TAM (Total Addressable Market)</h3>
                        <div style={formulaBoxStyle}>
                            <div>TAM = N × P</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                Where N = Total universe of addressable buyer units (accounts or people)<br />
                                Where P = Average annual revenue generated per buyer (ACV or annual ARPU)
                            </div>
                        </div>

                        <h3 style={h3Style}>Formula B: SAM (Serviceable Available Market)</h3>
                        <div style={formulaBoxStyle}>
                            <div>SAM = TAM × (G × V × T)</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                Where G = Geographic availability factor (e.g., 0.45 for North America only)<br />
                                Where V = Vertical suitability factor (e.g., 0.60 for tech &amp; finance)<br />
                                Where T = Tech stack compatibility (e.g., 0.50 running cloud infra)
                            </div>
                        </div>

                        <h3 style={h3Style}>Formula C: SOM (Serviceable Obtainable Market - Top-Down Lens)</h3>
                        <div style={formulaBoxStyle}>
                            <div>SOM = SAM × Realistic Market Share % (t = 1 to 3 years)</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                Typically modeled at 1% to 5% of SAM within the first 24–36 months.
                            </div>
                        </div>

                        <h3 style={h3Style}>Formula D: SOM (Serviceable Obtainable Market - Capacity Lens)</h3>
                        <div style={formulaBoxStyle}>
                            <div>SOM = (R × Q) + (W × C × P)</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                Where R = Number of quota-carrying Account Executives<br />
                                Where Q = Annual sales quota per rep ($ARR)<br />
                                Where W = Inbound website traffic or lead flow<br />
                                Where C = Inbound visitor-to-paid conversion rate %<br />
                                Where P = Average contract value (ACV)
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Formulas Across Business Models */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>2. Market Sizing Formulas by Business Model</h2>
                        <p style={pStyle}>
                            One formula does not fit all business types. A marketplace models take rates, whereas enterprise SaaS models seat tiers:
                        </p>

                        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>Business Model</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--accent-primary)', fontWeight: 700 }}>Formula</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>Primary Variables</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        [
                                            'B2B SaaS (Seat-Based)',
                                            'TAM = Companies × Avg Seats × Price/Seat/Yr',
                                            'Account count, departmental headcount, seat price'
                                        ],
                                        [
                                            'B2B SaaS (Usage-Based)',
                                            'TAM = Accounts × Avg Usage Units × Unit Cost',
                                            'Monthly API calls, tokens, gigabytes, transactions'
                                        ],
                                        [
                                            'Two-Sided Marketplace',
                                            'TAM = GMV × Take Rate %',
                                            'Gross Merchandise Value, supplier count, rake %'
                                        ],
                                        [
                                            'B2C Subscription',
                                            'TAM = Total Consumers × Purchase Rate × Sub/Yr',
                                            'Demographic size, intent conversion, annual price'
                                        ],
                                        [
                                            'E-Commerce D2C',
                                            'TAM = Target Audience × Order Frequency × AOV',
                                            'Customer base, annual orders, Average Order Value'
                                        ],
                                    ].map(([model, formula, vars], i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--bg-secondary)' }}>
                                            <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{model}</td>
                                            <td style={{ padding: '0.875rem 1rem', fontFamily: 'monospace', color: 'var(--accent-primary)', fontSize: '0.88rem' }}>{formula}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{vars}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 3: Worked Math Example */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>3. Step-by-Step Mathematical Walkthrough</h2>
                        <p style={pStyle}>
                            Let us calculate the exact figures for an AI-powered legal contract summarization tool targeting boutique law firms.
                        </p>

                        <div style={cardStyle}>
                            <h3 style={{ ...h3Style, marginTop: 0, fontSize: '1.2rem', color: 'var(--accent-primary)' }}>
                                Step 1: Quantify the Buyer Universe (N)
                            </h3>
                            <p style={{ ...pStyle, margin: 0 }}>
                                According to the American Bar Association and state bar licensing rosters, there are <strong>48,000 boutique law firms</strong> (5–50 attorneys) in the United States and Canada.
                            </p>
                        </div>

                        <div style={cardStyle}>
                            <h3 style={{ ...h3Style, marginTop: 0, fontSize: '1.2rem', color: 'var(--accent-primary)' }}>
                                Step 2: Determine Pricing (P)
                            </h3>
                            <p style={{ ...pStyle, margin: 0 }}>
                                The software charges $250/attorney/month. The average boutique firm has 8 target corporate attorneys:
                                <br />
                                8 attorneys × $250/mo = $2,000/mo → <strong>$24,000 Annual Contract Value (ACV)</strong>.
                            </p>
                        </div>

                        <div style={cardStyle}>
                            <h3 style={{ ...h3Style, marginTop: 0, fontSize: '1.2rem', color: 'var(--accent-primary)' }}>
                                Step 3: Run the TAM, SAM, and SOM Calculations
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>TAM = 48,000 × $24,000</span>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>$1,152,000,000 ($1.15B)</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>SAM (35% specializing in commercial M&amp;A contracts) = 16,800 × $24,000</span>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>$403,200,000 ($403M)</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>SOM Year 1 (3 sales reps closing 25 deals each = 75 firms × $24,000)</span>
                                    <span style={{ color: '#10B981', fontWeight: 800 }}>$1,800,000 ARR</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Triangulation */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>4. Triangulating Formulas to Prevent Blind Spots</h2>
                        <p style={pStyle}>
                            Top venture funds never rely on a single sizing model. They cross-examine bottom-up calculations with two additional checks:
                        </p>
                        <div style={cardStyle}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontSize: '1.05rem' }}>
                                        Check 1: Competitor Revenue Aggregation
                                    </h4>
                                    <p style={{ ...pStyle, margin: 0 }}>
                                        Sum the public and estimated revenues of the top 3–5 incumbent vendors in the space. If the top 3 players currently generate $300M in combined ARR, a bottom-up TAM of $400M–$600M is reasonable. A TAM of $50B would suggest severe overestimation.
                                    </p>
                                </div>
                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                                    <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontSize: '1.05rem' }}>
                                        Check 2: Value-Creation Share
                                    </h4>
                                    <p style={{ ...pStyle, margin: 0 }}>
                                        Software pricing typically captures between 5% and 20% of the financial value or cost reduction it creates. If your tool saves a firm $100,000 per year in paralegal contractor hours, a $24,000 annual price point is mathematically justified (24% value capture).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Interactive Tool CTA */}
                    <section style={{ marginBottom: '4rem', padding: '2.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Apply These Formulas to Your Business</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto 1.75rem auto' }}>
                            Skip the manual spreadsheet arithmetic. Use our free web calculator to model customer volume, contract value, and segment filters.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/tools/market-size-estimator" className="btn" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                                Open Market Size Estimator →
                            </Link>
                            <Link href="/compare/market-sizing-top-down-vs-bottom-up" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                                Top-Down vs Bottom-Up Comparison
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
                                    Top-Down vs Bottom-Up Main Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="/compare/bottom-up-market-sizing-example" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    Bottom-Up SaaS Example
                                </Link>
                            </li>
                            <li>
                                <Link href="/compare/how-to-calculate-tam-sam-som" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    How to Calculate TAM, SAM &amp; SOM
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/market-size-estimator" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    Market Size Estimator Tool
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div style={{ padding: '1.5rem', backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16,185,129,0.3)' }}>
                        <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Interactive Tool</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                            Execute the TAM, SAM, and SOM formulas instantly using our client-side estimator.
                        </p>
                        <Link href="/tools/market-size-estimator" style={{ display: 'block', textAlign: 'center', padding: '0.65rem 1rem', backgroundColor: 'var(--accent-primary)', color: '#000', fontWeight: 700, borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontSize: '0.875rem' }}>
                            Launch Estimator →
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}

