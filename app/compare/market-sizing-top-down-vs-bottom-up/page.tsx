import { Metadata } from 'next';
import Link from 'next/link';
import MarketSizingCalculator from './MarketSizingCalculator';

export const metadata: Metadata = {
    title: 'Top-Down vs Bottom-Up Market Sizing: Formulas & Examples (2026)',
    description: 'Master top-down vs bottom-up market sizing. Learn formulas, see real startup examples, calculate TAM/SAM/SOM, and know exactly when to use each method.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/compare/market-sizing-top-down-vs-bottom-up',
    },
    keywords: [
        'top down vs bottom up market sizing',
        'bottom up market sizing example',
        'top down market sizing',
        'market sizing formula',
        'TAM SAM SOM calculator',
        'how to calculate market size',
        'market sizing methods',
    ],
};

export default function MarketSizingCompare() {
    const faqs = [
        {
            q: 'What is top-down market sizing?',
            a: 'Top-down market sizing starts with a large macro-market figure (e.g., total global CRM market = $80B) and works downward by applying percentage assumptions to estimate the share your company could capture. It uses published research reports as its data source rather than individual customer data.'
        },
        {
            q: 'What is bottom-up market sizing?',
            a: 'Bottom-up market sizing starts from the unit level — one customer — and scales up. You multiply your total number of addressable potential customers by your price point (ACV). The formula is: TAM = Total Potential Customers × Annual Contract Value. This approach requires knowing your exact customer profile.'
        },
        {
            q: 'Which method do investors prefer?',
            a: 'Sophisticated seed and Series A investors prefer bottom-up sizing because it demonstrates deep customer knowledge and operational clarity. Top-down is often used on the first slide to validate that you\'re in a large, growing market. The winning combo: top-down for market context, bottom-up to prove your go-to-market plan.'
        },
        {
            q: 'What is the market sizing formula for TAM, SAM, and SOM?',
            a: 'TAM = Total Target Customers × Annual Revenue Per Customer. SAM = TAM × Addressable % (geographic/vertical filter). SOM = SAM × Realistic Penetration % (what you can win given resources and competition). Example: 50,000 companies × $1,200/year = $60M TAM. $60M × 40% (US-only SAM filter) = $24M SAM. $24M × 5% (Year 1 SOM) = $1.2M SOM.'
        },
        {
            q: 'Can I use both methods in my pitch deck?',
            a: 'Yes, and you should. Lead with top-down to establish macro context (e.g., "The project management software market is $6.7B and growing at 12% annually."), then immediately follow with bottom-up math to show how you reach your first $5M in ARR. This combination is the gold standard for Series A decks.'
        },
        {
            q: 'How do I do bottom-up market sizing with no customers yet?',
            a: 'Pre-launch, use publicly available data: LinkedIn for total companies in a category, industry association reports for customer counts, and competitor pricing pages for ACV benchmarks. If you have a waitlist, extrapolate from your conversion data. Even rough estimates are credible if your logic is sound.'
        },
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Top-Down vs Bottom-Up Market Sizing: Formulas & Examples (2026)',
                description: 'Master top-down vs bottom-up market sizing. Learn formulas, see real startup examples, calculate TAM/SAM/SOM, and know exactly when to use each method.',
                author: { '@type': 'Organization', name: 'ToolStrategyHub', url: 'https://toolstrategyhub.com' },
                publisher: { '@type': 'Organization', name: 'ToolStrategyHub', url: 'https://toolstrategyhub.com' },
                url: 'https://toolstrategyhub.com/compare/market-sizing-top-down-vs-bottom-up',
                dateModified: '2026-11-01',
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
                    { '@type': 'ListItem', position: 3, name: 'Top-Down vs Bottom-Up Market Sizing', item: 'https://toolstrategyhub.com/compare/market-sizing-top-down-vs-bottom-up' },
                ]
            }
        ]
    };

    const h2Style: React.CSSProperties = { fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: 1.2 };
    const h3Style: React.CSSProperties = { fontSize: '1.35rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.75rem' };
    const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1rem' };
    const sectionStyle: React.CSSProperties = { marginBottom: '4rem' };
    const codeBlockStyle: React.CSSProperties = {
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        padding: '1.25rem 1.5rem',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        color: 'var(--text-primary)',
        lineHeight: 2,
        marginTop: '1rem',
        marginBottom: '1rem',
        overflowX: 'auto',
    };
    const pillStyle: React.CSSProperties = {
        display: 'inline-block',
        padding: '0.25rem 0.85rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'rgba(16,185,129,0.12)',
        color: 'var(--accent-primary)',
        fontSize: '0.8rem',
        fontWeight: 700,
        border: '1px solid rgba(16,185,129,0.3)',
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
                <span style={{ color: 'var(--text-primary)' }}>Top-Down vs Bottom-Up Market Sizing</span>
            </nav>

            {/* Two-column layout for article + sticky sidebar */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(0, 300px)', gap: '4rem', alignItems: 'start' }}>

                {/* ── MAIN CONTENT ── */}
                <main>
                    <header style={{ marginBottom: '3.5rem' }}>
                        <div style={{ ...pillStyle, marginBottom: '1.25rem' }}>Market Sizing Guide</div>
                        <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                            Top-Down vs Bottom-Up Market Sizing: Formulas &amp; Examples (2026)
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '700px' }}>
                            Both approaches serve a purpose — the mistake is using only one. This guide explains the formula for each method, shows when to apply each, walks through a real SaaS startup example, and gives you an interactive TAM/SAM/SOM calculator to run your own numbers.
                        </p>
                    </header>

                    {/* ── SECTION 1: TOP-DOWN ── */}
                    <section id="top-down" style={sectionStyle}>
                        <h2 style={h2Style}>1. Top-Down Market Sizing Explained</h2>
                        <p style={pStyle}>
                            Top-down market sizing begins with a published macro-market figure — typically sourced from research firms like Gartner, Forrester, IDC, or Statista — and progressively narrows it using percentage assumptions until arriving at your target market slice.
                        </p>
                        <p style={pStyle}>
                            The method is <strong style={{ color: 'var(--text-primary)' }}>fast and accessible</strong>. You do not need original data or customer surveys. If a credible analyst firm has published a figure for your market, you can build a top-down model in minutes.
                        </p>

                        <h3 style={h3Style}>The Top-Down Formula</h3>
                        <div style={codeBlockStyle}>
                            <div>TAM = Published Market Size × Relevant Segment %</div>
                            <div>SAM = TAM × Geographic / Vertical Filter %</div>
                            <div>SOM = SAM × Estimated Market Share % (Year N)</div>
                        </div>

                        <h3 style={h3Style}>Top-Down Example: Project Management SaaS</h3>
                        <p style={pStyle}>
                            Imagine you are building a project management tool specifically for remote engineering teams. A top-down analysis might look like this:
                        </p>
                        <div style={{
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            marginTop: '1rem',
                            marginBottom: '1.5rem',
                        }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                                        <th style={{ padding: '0.875rem 1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>Layer</th>
                                        <th style={{ padding: '0.875rem 1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>Assumption</th>
                                        <th style={{ padding: '0.875rem 1rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 700 }}>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['TAM', 'Global project management software market (2026 Gartner)', '$6.7B'],
                                        ['SAM', 'US & Canada English-speaking SaaS teams (~35% of global)', '$2.35B'],
                                        ['SOM', 'Remote-first engineering teams specifically (~8% of SAM)', '$188M'],
                                        ['Year 1 Target', '0.5% SOM with lean sales team', '$940K ARR'],
                                    ].map(([layer, assumption, value], i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--bg-secondary)' }}>
                                            <td style={{ padding: '0.875rem 1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{layer}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{assumption}</td>
                                            <td style={{ padding: '0.875rem 1rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h3 style={h3Style}>When to Use Top-Down</h3>
                        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 2, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Pitch deck slide 3–5:</strong> Establish market scale and growth rate to justify venture-scale ambition.</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Early-stage exploration:</strong> When you don't yet know who your customer is precisely, top-down gives directional confidence.</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>New/emerging markets:</strong> When no bottom-up customer list exists (e.g., a market that didn't exist 3 years ago).</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Macro validation:</strong> Confirming the ceiling is large enough to justify venture-scale investment.</li>
                        </ul>

                        <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 'var(--radius-sm)' }}>
                            <strong style={{ color: 'var(--accent-primary)' }}>⚠️ The 1% trap:</strong>
                            <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                                Never say "if we capture just 1% of a $6B market..." without bottom-up support. 1% of a large market can still mean acquiring 50,000+ customers — a massive operational challenge that dismissing as "conservative" will destroy your credibility.
                            </span>
                        </div>
                    </section>

                    {/* ── SECTION 2: BOTTOM-UP ── */}
                    <section id="bottom-up" style={sectionStyle}>
                        <h2 style={h2Style}>2. Bottom-Up Market Sizing Explained</h2>
                        <p style={pStyle}>
                            Bottom-up market sizing builds the market estimate from the ground up, starting with a single customer unit. You identify every potential customer who could buy your product, count them, and multiply by your price. The result is a market size derived from operational reality — not research reports.
                        </p>
                        <p style={pStyle}>
                            This method is <strong style={{ color: 'var(--text-primary)' }}>slower but more credible</strong>. It requires customer research: who are they, how many exist, what will they pay? The upside is that it simultaneously validates your GTM (go-to-market) strategy.
                        </p>

                        <h3 style={h3Style}>The Bottom-Up Formula</h3>
                        <div style={codeBlockStyle}>
                            <div>TAM = Total Addressable Customers × Annual Contract Value (ACV)</div>
                            <div>SAM = TAM × (Customers You Can Actually Reach %)</div>
                            <div>SOM = SAM × (Realistic Win Rate % Given Competition &amp; Resources)</div>
                        </div>

                        <h3 style={h3Style}>Bottom-Up Example: Same Project Management SaaS</h3>
                        <p style={pStyle}>
                            Same product, now modeled bottom-up. This approach requires knowing your customer profile precisely:
                        </p>
                        <div style={codeBlockStyle}>
                            <div><strong>Customer profile:</strong> US startups with 10–200 employees using remote-first engineering teams</div>
                            <div><strong>Total companies matching this profile (LinkedIn data):</strong> 87,000</div>
                            <div><strong>ACV (Annual Contract Value):</strong> $1,440/year ($120/month × 12)</div>
                            <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '0.75rem', paddingTop: '0.75rem' }}></div>
                            <div><strong>TAM</strong> = 87,000 companies × $1,440/yr = <span style={{ color: 'var(--accent-primary)' }}>$125.3M</span></div>
                            <div><strong>SAM</strong> = 87,000 × 60% (companies actively using project tools) × $1,440 = <span style={{ color: 'var(--accent-primary)' }}>$75.2M</span></div>
                            <div><strong>SOM Year 1</strong> = $75.2M × 2% (achievable with 3 SDRs + PLG) = <span style={{ color: 'var(--accent-primary)' }}>$1.5M ARR</span></div>
                        </div>

                        <p style={pStyle}>
                            Notice the difference: top-down gave us a $6.7B TAM; bottom-up gives us a $125M TAM. The bottom-up number is more credible precisely because it is grounded in real customer counts. A $125M TAM is still a strong venture opportunity for a seed-stage company.
                        </p>

                        <h3 style={h3Style}>When to Use Bottom-Up</h3>
                        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 2, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Investor due diligence:</strong> When a VC asks "how will you reach $10M ARR?" your bottom-up model is the answer.</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Sales capacity planning:</strong> Directly maps to how many SDRs or AEs you need to hire.</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Niche/vertical SaaS:</strong> When your customer is very specific and countable (e.g., pediatric dental clinics in the US).</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Financial modeling:</strong> The only method that connects market sizing to real revenue projections.</li>
                        </ul>
                    </section>

                    {/* ── SECTION 3: COMPARISON ── */}
                    <section id="comparison" style={sectionStyle}>
                        <h2 style={h2Style}>3. Side-by-Side Comparison</h2>
                        <p style={pStyle}>
                            Neither method is inherently superior. They answer different questions. Here is when each shines:
                        </p>

                        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>Dimension</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--accent-primary)', fontWeight: 700 }}>Top-Down</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 700 }}>Bottom-Up</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Starting point', 'Published research / analyst reports', 'Real customer count × price'],
                                        ['Data required', 'Macro market reports (Gartner, IDC)', 'Customer lists, ACV, sales data'],
                                        ['Time to build', '30 minutes', '2–5 days of customer research'],
                                        ['Credibility with VCs', 'Low to Medium (contextual only)', 'High (shows GTM clarity)'],
                                        ['Best for', 'Slide 1 context, emerging markets', 'Sales planning, investor Q&A'],
                                        ['Risk', '"1% of a big market" fallacy', 'Undercounts market if TAM is narrow'],
                                        ['Typical TAM result', 'Very large ($Bs)', 'Smaller, more realistic ($Ms to $100Ms)'],
                                        ['Investor reaction', 'Necessary but insufficient', 'Preferred for Series A+'],
                                    ].map(([dim, topDown, bottomUp], i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--bg-secondary)' }}>
                                            <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{dim}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{topDown}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{bottomUp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h3 style={h3Style}>Using Both Together: The Professional Approach</h3>
                        <p style={pStyle}>
                            The most sophisticated founders and analysts use a sandwich structure in their pitch decks and board reports:
                        </p>
                        <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 2, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Top-down first (macro context):</strong> "The $6.7B project management market is growing at 12% CAGR. Remote-first adoption is accelerating this."</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Bottom-up next (operational proof):</strong> "There are 87,000 US remote-first startups. At $1,440/year ACV, our TAM is $125M. With 3 SDRs running a PLG motion, Year 1 target is $1.5M ARR."</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Reconcile:</strong> Explain why the bottom-up number is smaller and why that's fine (you're serving a niche, not the whole market — focus is your moat).</li>
                        </ol>
                    </section>

                    {/* ── SECTION 4: CALCULATOR ── */}
                    <section id="calculator" style={sectionStyle}>
                        <h2 style={h2Style}>4. Interactive TAM / SAM / SOM Calculator</h2>
                        <p style={pStyle}>
                            Enter your bottom-up inputs below to calculate your market sizing in real time. This uses the standard bottom-up formula: <code style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.15rem 0.4rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>TAM = Customers × ACV</code>.
                        </p>
                        <MarketSizingCalculator />
                        <p style={{ marginTop: '1.25rem', ...pStyle }}>
                            Want a more advanced model with revenue projections and growth scenarios? Use the full{' '}
                            <Link href="/tools/market-size-estimator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
                                Market Size Estimator tool
                            </Link>.
                        </p>
                    </section>

                    {/* ── SECTION 5: STARTUP WALKTHROUGH ── */}
                    <section id="walkthrough" style={sectionStyle}>
                        <h2 style={h2Style}>5. Full Startup Walkthrough: "TaskFlow" SaaS</h2>
                        <p style={pStyle}>
                            Let's walk through a complete market sizing exercise for a fictional startup called <strong style={{ color: 'var(--text-primary)' }}>TaskFlow</strong> — a project management tool for distributed remote teams with async-first workflows.
                        </p>

                        <h3 style={h3Style}>Step 1: Define the ICP (Ideal Customer Profile)</h3>
                        <div style={codeBlockStyle}>
                            <div>Target: US-based tech startups, 10–200 employees</div>
                            <div>Characteristic: Fully remote, engineering-heavy, VC-backed</div>
                            <div>Pain point: Jira is too complex; Trello is too simple</div>
                            <div>Pricing: $12/seat/month → avg team size 15 seats → $180/month → $2,160 ACV</div>
                        </div>

                        <h3 style={h3Style}>Step 2: Count the Market (Bottom-Up TAM)</h3>
                        <div style={codeBlockStyle}>
                            <div>LinkedIn search: "Tech startup, 11–200 employees, US, remote" → 142,000 companies</div>
                            <div>Filter: VC-backed (AngelList/Crunchbase data) → 54,000 companies</div>
                            <div>Filter: Engineering team exists (GitHub activity proxy) → 38,000 companies</div>
                            <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '0.5rem', paddingTop: '0.5rem' }}></div>
                            <div><strong>Bottom-Up TAM</strong> = 38,000 × $2,160 = <span style={{ color: 'var(--accent-primary)' }}>$82M</span></div>
                        </div>

                        <h3 style={h3Style}>Step 3: Apply SAM and SOM Filters</h3>
                        <div style={codeBlockStyle}>
                            <div><strong>SAM:</strong> 38,000 companies actively seeking alternatives to Jira/Trello (50%) = 19,000 companies</div>
                            <div>SAM = 19,000 × $2,160 = <span style={{ color: 'var(--accent-primary)' }}>$41M</span></div>
                            <div style={{ marginTop: '0.5rem' }}></div>
                            <div><strong>SOM Year 1:</strong> PLG motion + 2 AEs → 350 customers target</div>
                            <div>SOM = 350 × $2,160 = <span style={{ color: 'var(--accent-primary)' }}>$756K ARR</span></div>
                            <div style={{ marginTop: '0.5rem' }}></div>
                            <div><strong>SOM Year 3:</strong> 10 AEs + PLG flywheel → 2,500 customers target</div>
                            <div>SOM Year 3 = 2,500 × $2,160 = <span style={{ color: 'var(--accent-primary)' }}>$5.4M ARR</span></div>
                        </div>

                        <h3 style={h3Style}>Step 4: Top-Down Sanity Check</h3>
                        <p style={pStyle}>
                            With the bottom-up model complete, validate with top-down: The global project management software market is $6.7B. The US is ~40% = $2.68B. Startups and SMBs are ~15% of enterprise = $402M. Task Flow is targeting a niche within that — $82M bottom-up TAM represents ~20% of the addressable SMB slice. This is coherent. The market is real, and the niche is focused enough to win.
                        </p>

                        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginTop: '1.5rem' }}>
                            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>💡 Key Insight</strong>
                            <p style={{ ...pStyle, marginBottom: 0 }}>
                                The bottom-up number ($82M TAM) is 98.8% smaller than the top-down number ($6.7B). This is expected and actually builds investor confidence — it shows you haven't just copy-pasted a market research number. A defensible $82M niche is a far better story than a vague claim on 1% of $6.7B.
                            </p>
                        </div>
                    </section>

                    {/* ── FAQs ── */}
                    <section id="faqs" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
                        <h2 style={h2Style}>Frequently Asked Questions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {faqs.map((faq, idx) => (
                                <details key={idx} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                    <summary style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}>
                                        {faq.q}
                                    </summary>
                                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Related Guides */}
                    <section style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ ...h3Style, marginTop: 0 }}>Related Market Sizing Guides</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li>
                                <Link href="/compare/bottom-up-market-sizing-example" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
                                    Bottom-Up Market Sizing: Step-by-Step SaaS Example
                                </Link>
                            </li>
                            <li>
                                <Link href="/compare/how-to-calculate-tam-sam-som" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
                                    How to Calculate TAM, SAM &amp; SOM (With Formulas)
                                </Link>
                            </li>
                            <li>
                                <Link href="/compare/market-sizing-formula-explained" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
                                    Market Sizing Formula Explained: Definitions &amp; Worked Example
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/market-size-estimator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
                                    Market Size Estimator Tool
                                </Link>
                            </li>
                        </ul>
                    </section>
                </main>

                {/* ── STICKY SIDEBAR ── */}
                <aside style={{ position: 'sticky', top: '6rem' }}>
                    {/* Table of Contents */}
                    <div style={{
                        padding: '1.5rem',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        marginBottom: '1.5rem',
                    }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Table of Contents</h2>
                        <nav>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {[
                                    ['#top-down', '1. Top-Down Explained'],
                                    ['#bottom-up', '2. Bottom-Up Explained'],
                                    ['#comparison', '3. Side-by-Side Comparison'],
                                    ['#calculator', '4. TAM/SAM/SOM Calculator'],
                                    ['#walkthrough', '5. Startup Walkthrough'],
                                    ['#faqs', '6. FAQs'],
                                ].map(([href, label]) => (
                                    <li key={href}>
                                        <a href={href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.4, display: 'block', transition: 'color 0.15s' }}>
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Calculator CTA */}
                    <div style={{
                        padding: '1.5rem',
                        backgroundColor: 'rgba(16,185,129,0.08)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Run Your Market Size</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                            Get TAM, SAM &amp; SOM in seconds with the full estimator tool.
                        </p>
                        <Link
                            href="/tools/market-size-estimator"
                            style={{
                                display: 'block',
                                padding: '0.75rem 1rem',
                                backgroundColor: 'var(--accent-primary)',
                                color: '#000',
                                fontWeight: 700,
                                borderRadius: 'var(--radius-sm)',
                                textDecoration: 'none',
                                fontSize: '0.875rem',
                            }}
                        >
                            Open Market Size Estimator →
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}
