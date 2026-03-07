import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Business Valuation Multiples Explained',
    description: 'Understand the difference between EBITDA and Revenue multiples, and discover the exact industry valuation multiples used by buyers today.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/business-valuation-multiples',
    }
};

export default function BusinessValuationMultiples() {
    const faqs = [
        {
            q: "What is a good EBITDA multiple for a small business?",
            a: "For a typical small business (like a local service company, restaurant, or small agency) doing under $1M in EBITDA, a good multiple ranges from 2x to 4x. High risk, heavy owner-dependence, and lack of scale cap the upside."
        },
        {
            q: "Why do SaaS companies use revenue multiples instead of EBITDA?",
            a: "SaaS companies are designed for massive scale with near-zero marginal costs (high gross margins). Investors value top-line revenue because they assume that once the company stops aggressively acquiring market share, the revenue will naturally translate into massive EBITDA profits."
        },
        {
            q: "How do I increase my company's valuation multiple?",
            a: "You increase your multiple by removing risk. This means creating recurring revenue streams, documenting standard operating procedures (so the business runs without you), diversifying your customer base, and proving consistent year-over-year growth."
        },
        {
            q: "Do I use trailing 12 months (TTM) or forward-looking projections for my multiple?",
            a: "Buyers almost exclusively price deals based on Trailing Twelve Months (TTM) actuals. Forward-looking projections are useful for negotiating a higher multiple, but a buyer will rarely pay a multiple on revenue you haven't earned yet unless they structure it as an earn-out."
        },
        {
            q: "What is SDE and how is it different from EBITDA?",
            a: "Seller's Discretionary Earnings (SDE) is the total financial benefit a single owner-operator derives from a business. It adds back owner salary and personal expenses. EBITDA is strictly operational profit. Main street businesses under $1M in revenue are often valued on SDE, while larger companies are valued on EBITDA."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Business Valuation Multiples Explained',
                description: 'Understand the difference between EBITDA and Revenue multiples, and discover the exact industry valuation multiples used by buyers today.',
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
                <span style={{ color: 'var(--text-primary)' }}>Business Valuation Multiples Explained</span>
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Business Valuation Multiples Explained
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Multiples are the financial translation of business quality. They compress thousands of operational variables—growth, risk, market size, and margin—into a single, universally comparable number. But applying the wrong multiple can cost you millions in a deal.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
                <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>

                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Interactive Assessment</h3>
                        <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>Use our Business Valuation Calculator to apply these multiples to your specific revenue and margin profile instantly.</p>
                        <Link href="/tools/business-valuation-calculator" className="btn" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                            Business Valuation Calculator
                        </Link>
                    </div>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>What valuation multiples are</h2>
                        <p>At their core, valuation multiples are a heuristic—a shortcut to determine the Enterprise Value of a company without doing a massive, spreadsheet-heavy Discounted Cash Flow analysis. A multiple is simply a ratio that compares a company's financial metric (like revenue or profit) to its overall price tag. If a business generates $1,000,000 a year in profit and sells for $4,000,000, the buyer paid a "4x multiple." The multiple represents the buyer's confidence: they are confident the business will survive and grow for at least the next four years to return their capital. High multiples signify low risk and high growth; low multiples signify high risk and stagnation.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>EBITDA multiples</h2>
                        <p>EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is the most common denominator for valuing traditional, mature businesses. It represents the true operational cash-generating ability of the company, stripped of funky accounting or capital structure choices. Private equity firms and corporate acquirers almost exclusively use EBITDA multiples to value manufacturing, retail, service, and agency businesses. For companies generating between $1M and $10M in EBITDA, multiples typically range from 3x to 7x. A 5x EBITDA multiple is considered a benchmark for a solid, growing, mid-market business.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Revenue multiples</h2>
                        <p>Unlike traditional businesses, high-growth technology companies and startups are notoriously unprofitable because they reinvest every dollar into acquiring market share. Valuing these companies on a non-existent EBITDA is impossible. Instead, buyers use Revenue Multiples (often based on Annual Recurring Revenue, or ARR). Buyers are willing to pay, for example, 8x revenue today because they believe the gross margins are so high (typically 80%+) that once growth stabilizes, the company will print cash. Revenue multiples are almost exclusively reserved for highly scalable software, deep tech, and exceptional e-commerce brands.</p>
                    </section>

                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Stop Guessing Your Multiple</h3>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Are you an agency or a SaaS? Input your details and let our algorithm assign the correct tier.</p>
                        <Link href="/tools/business-valuation-calculator" className="btn" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
                            Use our Business Valuation Calculator to apply these multiples.
                        </Link>
                    </div>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Industry valuation multiples</h2>
                        <p>Not all revenue is created equal. A dollar generated by a construction company carries vastly different risk and scalability than a dollar generated by a cloud hosting provider. Consequently, multiples are highly stratified by industry. Market dynamics dictate these baselines. If you are operating in an industry with recurring revenue, high margins, and low barriers to scale, your multiple expands. If your industry is highly regulated, requires massive physical inventory, or depends completely on the founder's personal relationships, the market brutally compresses your multiple to account for that risk.</p>
                        <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ margin: 0 }}><strong>Deeper Understanding:</strong> If you are curious about how these metrics are evaluated dynamically by institutional capital, explore our deep dive on <Link href="/guides/how-investors-value-startups" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>how investors value startups</Link>.</p>
                        </div>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>SaaS multiples</h2>
                        <p>Software as a Service (SaaS) is the crown jewel of valuation multiples. Because revenue is subscription-based (highly predictable) and the cost to serve a new customer is negligible (highly scalable), buyers pay enormous premiums. In bull markets, top-tier B2B SaaS companies growing over 50% year-over-year can command 10x to 20x ARR (revenue, not profit). However, these multiples contract violently during economic downturns, often stabilizing around 5x to 8x ARR for competent companies. The "Rule of 40" (where growth rate plus profit margin exceeds 40%) is the ultimate benchmark to unlock a premium SaaS multiple.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Small business multiples</h2>
                        <p>For standard "Main Street" small businesses—landscaping, marketing agencies, auto repair shops—revenue multiples do not apply. These businesses are valued on Seller's Discretionary Earnings (SDE). They typically transact between 1.5x and 3x SDE. The harsh reality of small business M&A is that if the business cannot run without the founder actively managing daily operations, its multiple is essentially capped at 2x. Buyers are not buying a scalable system; they are buying an exhausting job, and they price that reality accordingly.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Public company comparisons</h2>
                        <p>Public markets provide the ultimate real-time data on industry multiples. While a private company cannot expect the exact same multiple as a publicly traded behemoth (because private shares are highly illiquid and carry more risk), public comps serve as the absolute ceiling. When preparing to sell a mid-market company, investment bankers will pull data from 5 similar public companies, calculate their average multiple, and apply an "illiquidity discount" (usually 20% to 30%) to estimate a fair private market value for your firm.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>How to choose the right multiple</h2>
                        <p>You do not get to unilaterally "choose" a multiple; the market dictates it. However, you can position your company to be evaluated under a superior framework. If you run a marketing agency (typically a 3x EBITDA multiple), but you package your services into a proprietary software platform with recurring billing, you can argue to be valued as a "tech-enabled service," which might bump your multiple to 6x. The goal of financial strategy is not just to grow revenue, but to systematically eliminate operational risks—client concentration, owner dependence, high churn—that trap your company in lower-tier multiples.</p>
                    </section>

                    <div style={{ padding: '3rem 2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center', marginTop: '2rem' }}>
                        <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Execute the Formula</h3>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Ready to see the math play out? Enter your parameters and calculate your company's enterprise value today.</p>
                        <Link href="/tools/business-valuation-calculator" className="btn" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                            Business Valuation Calculator
                        </Link>
                    </div>

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
