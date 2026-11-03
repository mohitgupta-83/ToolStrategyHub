import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Bottom-Up Market Sizing Example for a SaaS Startup (2026 Guide)',
    description: 'Real-world bottom-up market sizing example for a B2B SaaS startup. Learn how to identify customer counts, calculate ACV, determine TAM/SAM/SOM, and present to investors.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/compare/bottom-up-market-sizing-example',
    },
    keywords: [
        'bottom up market sizing example',
        'bottom up market sizing saas',
        'how to calculate bottom up tam',
        'bottom up market analysis example',
        'market sizing example startup',
        'tam sam som saas example',
    ],
};

export default function BottomUpMarketSizingExamplePage() {
    const faqs = [
        {
            q: 'What is a real-world example of bottom-up market sizing for a SaaS company?',
            a: 'For an AI code review tool charging $150/month ($1,800/yr ACV) targeting US tech startups with 10–100 engineers: If there are 45,000 such companies in the US, TAM = 45,000 × $1,800 = $81,000,000. If 40% use GitHub Enterprise (SAM target), SAM = 18,000 × $1,800 = $32,400,000. If a 3-person sales team can close 250 accounts in Year 1 (SOM), Year 1 SOM = 250 × $1,800 = $450,000 ARR.'
        },
        {
            q: 'Where do I find real data on the number of potential customers?',
            a: 'Primary data sources include LinkedIn Sales Navigator (filter by industry, headcount, geography, and technology stack), US Census Bureau NAICS code databases, Bureau of Labor Statistics, industry trade associations, and platforms like Crunchbase, Apollo.io, and BuiltWith.'
        },
        {
            q: 'How does bottom-up sizing differ from top-down sizing?',
            a: 'Top-down sizing starts with a macro report (e.g., "$12B DevSecOps market") and guesses a percentage (e.g., "1% share = $120M"). Bottom-up sizing starts at the individual customer unit: verified customer headcount multiplied by your actual price point (e.g., 45,000 companies × $1,800/yr = $81M).'
        },
        {
            q: 'Why do VCs and angel investors demand bottom-up market sizing?',
            a: 'Investors demand bottom-up sizing because it forces the founder to demonstrate operational domain knowledge. It proves you understand who buys your product, what pricing they tolerate, and what marketing and sales capacity is required to capture revenue.'
        },
        {
            q: 'What should I do if my bottom-up TAM seems too small for venture capital?',
            a: 'If your TAM is under $1B, you have three levers: (1) Expand into adjacent customer verticals (e.g., healthcare tech in addition to fintech), (2) Increase ACV through add-ons, enterprise tiers, or usage-based pricing, or (3) Expand geographic scope (e.g., EMEA and APAC).'
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Bottom-Up Market Sizing Example for a SaaS Startup (2026 Guide)',
                description: 'A comprehensive, step-by-step bottom-up market sizing walkthrough for early-stage software companies and tech founders.',
                author: { '@type': 'Organization', name: 'ToolStrategyHub', url: 'https://toolstrategyhub.com' },
                publisher: { '@type': 'Organization', name: 'ToolStrategyHub', url: 'https://toolstrategyhub.com' },
                url: 'https://toolstrategyhub.com/compare/bottom-up-market-sizing-example',
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
                    { '@type': 'ListItem', position: 3, name: 'Bottom-Up Market Sizing Example', item: 'https://toolstrategyhub.com/compare/bottom-up-market-sizing-example' },
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
    const codeBlockStyle: React.CSSProperties = {
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        padding: '1.25rem 1.5rem',
        fontFamily: 'monospace',
        fontSize: '0.92rem',
        color: 'var(--text-primary)',
        lineHeight: 1.9,
        marginTop: '1rem',
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
                <span style={{ color: 'var(--text-primary)' }}>Bottom-Up Example</span>
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
                            SaaS Financial Modeling
                        </div>
                        <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.15, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                            Bottom-Up Market Sizing Example for a SaaS Startup
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '720px' }}>
                            Most pitch decks fail the first 5 minutes of investor scrutiny because their market size is built on generic analyst reports. Here is a complete, verifiable bottom-up model for a B2B SaaS startup with formulas, unit counts, and math you can copy.
                        </p>
                    </header>

                    {/* Section 1 */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>Why Bottom-Up Market Sizing Wins Over Top-Down</h2>
                        <p style={pStyle}>
                            Top-down market sizing is easy: you find a Gartner report declaring the global cybersecurity market is $200 billion, claim you will capture a "conservative 1%", and conclude your revenue ceiling is $2 billion.
                        </p>
                        <p style={pStyle}>
                            Experienced investors immediately disregard this logic because it reveals nothing about unit economics, sales cycles, or buyer persona boundaries. In contrast, <strong style={{ color: 'var(--text-primary)' }}>bottom-up market sizing</strong> answers three essential operational questions:
                        </p>
                        <div style={cardStyle}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>✓</span>
                                    <span style={{ color: 'var(--text-secondary)' }}><strong>Exact count:</strong> How many distinct organizations or buyers currently experience the problem you solve?</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>✓</span>
                                    <span style={{ color: 'var(--text-secondary)' }}><strong>Pricing ceiling:</strong> What is the verifiable Annual Contract Value (ACV) those buyers pay for comparable tools?</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>✓</span>
                                    <span style={{ color: 'var(--text-secondary)' }}><strong>Sales velocity:</strong> How many of those accounts can your go-to-market engine realistically close per quarter?</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 2: Walkthrough */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>Worked Example: "PulseQA" (B2B SaaS Walkthrough)</h2>
                        <p style={pStyle}>
                            Let us model a hypothetical developer-tooling startup called <strong style={{ color: 'var(--text-primary)' }}>PulseQA</strong>, an automated API regression testing and contract verification suite for microservices architectures.
                        </p>

                        <h3 style={h3Style}>Step 1: Define the Ideal Customer Profile (ICP)</h3>
                        <p style={pStyle}>
                            A valid bottom-up calculation requires strict exclusion criteria. PulseQA is not for "any company with software"; it targets:
                        </p>
                        <div style={codeBlockStyle}>
                            <div>• Geography: United States, Canada, and Western Europe</div>
                            <div>• Company Size: 20 to 500 total employees (Series A through Series C)</div>
                            <div>• Technical Filter: Engineering teams running Kubernetes or microservices</div>
                            <div>• Economic Buyer: VP of Engineering, Head of QA, or DevOps Lead</div>
                        </div>

                        <h3 style={h3Style}>Step 2: Source Verifiable Account Quantities</h3>
                        <p style={pStyle}>
                            Using LinkedIn Sales Navigator and Apollo.io data filters:
                        </p>
                        <div style={codeBlockStyle}>
                            <div>1. US &amp; Canada companies in Computer Software / Internet (20-500 emp): 62,400</div>
                            <div>2. UK &amp; Western Europe software companies in same tier: 41,200</div>
                            <div>3. Total ICP universe: 103,600 companies</div>
                            <div>4. Applying microservices adoption filter (~45% based on CNCF survey):</div>
                            <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginTop: '0.25rem' }}>
                                → Total Qualified Account Universe = 46,620 accounts
                            </div>
                        </div>

                        <h3 style={h3Style}>Step 3: Establish the Annual Contract Value (ACV)</h3>
                        <p style={pStyle}>
                            PulseQA prices on a tier-based model:
                        </p>
                        <div style={cardStyle}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Starter Tier</span>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>$240 / mo</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>$2,880 annual ACV</div>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Pro Tier (Average)</span>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>$650 / mo</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>$7,800 weighted average ACV</div>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Enterprise Tier</span>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>$1,800 / mo</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>$21,600 annual ACV</div>
                                </div>
                            </div>
                        </div>
                        <p style={pStyle}>
                            We use the realistic blended <strong style={{ color: 'var(--text-primary)' }}>$7,800 ACV</strong> for our baseline calculation.
                        </p>

                        <h3 style={h3Style}>Step 4: Calculate the Bottom-Up TAM, SAM, and SOM</h3>
                        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>Metric</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>Math Formula</th>
                                        <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--accent-primary)', fontWeight: 700 }}>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>TAM (Total Addressable)</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>46,620 companies × $7,800 ACV</td>
                                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, color: 'var(--text-primary)' }}>$363,636,000</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>SAM (Serviceable Available)</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>TAM × 40% (US-only active pipeline focus)</td>
                                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, color: 'var(--accent-primary)' }}>$145,454,400</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>SOM Year 1 (Obtainable)</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>180 closed customers via 2 AEs + PLG</td>
                                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, color: 'var(--accent-primary)' }}>$1,404,000 ARR</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>SOM Year 3 (Obtainable)</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>950 closed customers (5.1% of SAM)</td>
                                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, color: 'var(--text-primary)' }}>$7,410,000 ARR</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 3: Reconciling */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <h2 style={h2Style}>How to Defend This Bottom-Up Model in Investor Meetings</h2>
                        <p style={pStyle}>
                            When presenting this model to institutional investors, structure your slide around defensibility:
                        </p>
                        <div style={cardStyle}>
                            <ol style={{ paddingLeft: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                <li>
                                    <strong style={{ color: 'var(--text-primary)' }}>State your data source:</strong> "Our 46,620 count is verified via Apollo technology filters cross-checked against GitHub active repository metrics."
                                </li>
                                <li>
                                    <strong style={{ color: 'var(--text-primary)' }}>Justify your ACV:</strong> "Our $7,800 pricing aligns with Datadog and Postman mid-tier contract medians, confirmed during 35 customer discovery interviews."
                                </li>
                                <li>
                                    <strong style={{ color: 'var(--text-primary)' }}>Tie SOM directly to headcount:</strong> "Year 1 SOM ($1.4M ARR) assumes two quota-carrying account executives closing 7.5 deals per month each, supported by developer self-serve."
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* Section 4: Interactive Tool CTA */}
                    <section style={{ marginBottom: '4rem', padding: '2.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Calculate Your Own Bottom-Up Numbers</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto 1.75rem auto' }}>
                            Use our free interactive calculator to test customer volume, ACV ranges, and market penetration percentages in real time.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/tools/market-size-estimator" className="btn" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                                Open Market Size Estimator →
                            </Link>
                            <Link href="/compare/market-sizing-top-down-vs-bottom-up" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
                                View Top-Down vs Bottom-Up Comparison
                            </Link>
                        </div>
                    </section>

                    {/* FAQ */}
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
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cluster Resources</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li>
                                <Link href="/compare/market-sizing-top-down-vs-bottom-up" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    Top-Down vs Bottom-Up Main Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="/compare/how-to-calculate-tam-sam-som" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    How to Calculate TAM, SAM &amp; SOM
                                </Link>
                            </li>
                            <li>
                                <Link href="/compare/market-sizing-formula-explained" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    Market Sizing Formula Breakdown
                                </Link>
                            </li>
                            <li>
                                <Link href="/guides/how-to-estimate-market-size" style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                                    How to Estimate Market Size Guide
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div style={{ padding: '1.5rem', backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16,185,129,0.3)' }}>
                        <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Free Estimator Tool</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                            Run interactive TAM, SAM, and SOM calculations without building an Excel spreadsheet.
                        </p>
                        <Link href="/tools/market-size-estimator" style={{ display: 'block', textAlign: 'center', padding: '0.65rem 1rem', backgroundColor: 'var(--accent-primary)', color: '#000', fontWeight: 700, borderRadius: 'var(--radius-sm)', textDecoration: 'none', fontSize: '0.875rem' }}>
                            Launch Estimator Tool →
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}

