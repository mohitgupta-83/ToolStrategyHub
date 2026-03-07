import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Value a Business (Step-by-Step Guide)',
    description: 'Learn how to accurately value your business using the revenue multiple, EBITDA, and DCF methods. A comprehensive guide for founders and buyers.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/how-to-value-a-business',
    }
};

export default function HowToValueABusiness() {
    const faqs = [
        {
            q: "How do you value a small business quickly?",
            a: "The fastest way to value a small business is using a multiple of Seller's Discretionary Earnings (SDE) or EBITDA. Typically, small businesses sell for 2x to 4x their annual SDE or EBITDA depending on industry and growth."
        },
        {
            q: "Can I value my business based on revenue alone?",
            a: "Usually no, unless you are a high-growth SaaS or tech startup. For most traditional businesses like retail or agencies, buyers care about profitability (EBITDA). Revenue multiples are exclusively for highly scalable software."
        },
        {
            q: "What is the Discounted Cash Flow (DCF) method?",
            a: "The DCF method estimates the value of an investment based on its expected future cash flows. It involves forecasting cash flows and discounting them back to their present value using a discount rate, reflecting the risk of the investment."
        },
        {
            q: "Why do SaaS companies get higher valuations?",
            a: "SaaS companies have high gross margins (often 80-90%), recurring revenue, and exceptional scalability. A buyer values the predictability and the fact that adding new customers costs very little compared to service businesses."
        },
        {
            q: "Do physical assets increase my business valuation?",
            a: "They form the absolute floor of your valuation (asset-based valuation), but a profitable business is usually valued on cash flow or revenue. Assets don't add on top of a cash flow multiplier; they are either valued as a liquidation or baked into the operational capability."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'How to Value a Business (Step-by-Step Guide)',
                description: 'Learn how to accurately value your business using the revenue multiple, EBITDA, and DCF methods.',
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
                <span style={{ color: 'var(--text-primary)' }}>How to Value a Business</span>
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    How to Value a Business (Step-by-Step Guide)
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Understanding exactly what your business is worth is the most critical knowledge a founder can possess. Whether you are preparing to sell, seeking investment, or just tracking your net worth, this step-by-step guide will walk you through the math and the mechanics of modern business valuation.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
                <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>

                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Quick Estimation</h3>
                        <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>Want to skip the manual math? Use our Business Valuation Calculator to get an instant estimate of your company's enterprise value based on your industry, revenue, and margins.</p>
                        <Link href="/tools/business-valuation-calculator" className="btn" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                            Use our Business Valuation Calculator
                        </Link>
                    </div>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>What business valuation means</h2>
                        <p>At its core, business valuation is the process of determining the economic value of a whole business or company unit. It represents the price a willing buyer would pay a willing seller when both have reasonable knowledge of relevant facts and neither is under any compulsion to buy or sell. Valuation is not a single objective number; rather, it's a calculated estimate constrained by market conditions, asset leverage, and future cash flow potential. It translates years of hard work, intellectual property, and operational efficiency into a concrete financial metric.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Why business valuation matters</h2>
                        <p>Many founders build blindly for years without understanding what drives their terminal value. Valuation matters because it directly dictates how you make strategic decisions. If your industry values profit multiples over revenue multiples, spending millions to artificially acquire unprofitable customers will actively destroy your company's value. Valuation metrics dictate how much equity you must surrender during fundraising, how you compensate early employees, and what exit price you can reasonably expect when preparing for acquisition. Understanding this early prevents the severe disappointment of building a company that generates cash but is essentially unsellable.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>The most common valuation methods</h2>
                        <p>There is no "one size fits all" formula. The valuation of a local plumbing business requires entirely different math than the valuation of an artificial intelligence startup. Analysts use a variety of frameworks, but the most universally accepted methods fall into three broad categories: Multiple-based valuations (Revenue or EBITDA), Discounted Cash Flow approaches, and Asset-based valuations. Let's break down exactly how each works.</p>
                        <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ margin: 0 }}><strong>Note:</strong> If you are running an early-stage company that hasn't found consistent revenue yet, you should also read our deep dive on <Link href="/guides/startup-valuation-methods" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>startup valuation methods</Link>.</p>
                        </div>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Revenue multiple method</h2>
                        <p>The Revenue Multiple method assigns a valuation by multiplying the company's annual topline revenue by an industry-specific factor. This method is predominantly used for high-growth tech companies and SaaS (Software as a Service) businesses where gross margins are exceptionally high (often 80%+). In these industries, investors are willing to ignore current unprofitability because capturing market share guarantees massive future cash flows. A SaaS company doing $5M in Annual Recurring Revenue (ARR) with an 80% margin and 50% year-over-year growth might easily command a 5x to 10x revenue multiple, yielding a $25M - $50M valuation.</p>
                    </section>

                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Calculate Your Multiples Automatically</h3>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Stop guessing your industry multiple. Our calculator instantly applies the correct mathematical framework.</p>
                        <Link href="/tools/business-valuation-calculator" className="btn" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
                            Use our Business Valuation Calculator
                        </Link>
                    </div>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>EBITDA valuation method</h2>
                        <p>For 95% of traditional businesses—e-commerce, retail, agencies, manufacturing, and consulting—the EBITDA method is the gold standard. EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization. It is a proxy for the raw operational cash flow of the business. Buyers will look at your EBITDA and apply a multiple (often ranging from 2x to 6x) based on the risk and growth trajectory of your operation. A marketing agency generating $1M in revenue but only $150k in EBITDA might fetch a 3x multiple on EBITDA, valuing the company at $450k. EBITDA multiples discipline founders to focus on efficiency and actual profitability, not vanity topline revenue.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Discounted cash flow (DCF)</h2>
                        <p>The Discounted Cash Flow (DCF) method is the most mathematically rigorous approach, frequently used by private equity firms and investment banks. DCF attempts to calculate the present value of an investment based on its expected future cash flows. Analysts will forecast the company's free cash flow for the next 5 to 10 years, and then apply a "discount rate" (which accounts for the time value of money and the risk of the business) to bring those future cash flows back to today's dollars. Finally, a terminal value is added. While intellectually pure, DCF is highly sensitive to the assumptions made about growth rates and discount factors; a small tweak in a spreadsheet can swing the valuation by millions.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Asset based valuation</h2>
                        <p>The Asset-based valuation method is precisely what it sounds like. You calculate the value by subtracting the company’s total liabilities from its total fair market value of assets. This method is rarely used for thriving companies because it inherently assigns zero value to goodwill, operational momentum, intellectual property, and the cash-generating ability of the system. Asset-based valuation is typically reserved for companies facing liquidation, or businesses whose primary function is holding physical assets (like real estate holding companies or heavy equipment rentals).</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>When to use each method</h2>
                        <p>Choosing the correct method is a matter of business architecture. If you run a high-margin, highly scalable software operation focusing purely on landgrab, the <strong>Revenue Multiple</strong> is your standard. If you run an agency, service business, or e-commerce brand that requires proportionate labor/inventory to scale, the <strong>EBITDA format</strong> is non-negotiable. If you are a mature, stable business being acquired by a financial buyer, expect them to model a <strong>DCF</strong>. If your operation is failing and you simply need an exit, you default to the liquidation <strong>Asset-based</strong> method.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Example valuation calculation</h2>
                        <p>Let's take a hypothetical B2B SaaS startup. They generated $2,000,000 in Annual Recurring Revenue (ARR) over the last 12 months. They are operating at a slight loss (negative EBITDA) because they are reinvesting heavily into growth, currently doubling year-over-year. Since this is software, buyers look at the Revenue multiple. Given the specific industry and aggressive growth rate, the market assigns a 6x revenue multiple. <br /><br /><strong>Calculation:</strong> $2,000,000 ARR × 6x Multiple = $12,000,000 Enterprise Value. <br /><br />If they were a service business with the exact same revenue but generating $400k in EBITDA, a buyer might apply a 3.5x EBITDA multiple, resulting in a valuation of $1,400,000. Structure matters.</p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Common mistakes founders make</h2>
                        <p>The most pervasive error founders make is "Multiple Confusion"—hearing that a buzzy AI startup sold for 20x revenue and assuming their 10-person design agency is also worth 20x revenue. That is fundamentally incorrect. Agencies don't scale like software, and thus their risk and cash flow profiles are penalized with much lower EBITDA multiples. The second mistake is ignoring working capital; a $10M valuation means nothing if the buyer requires $2M to be left in the bank to run operations. Focus on your specific archetype, maximize margins where appropriate, and understand exactly what metrics acquirers in your space value most.</p>
                    </section>

                    <div style={{ padding: '3rem 2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center', marginTop: '2rem' }}>
                        <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Run Your Company's Math</h3>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Ready to see where you stand? Input your trailing 12-month revenue, margins, and industry to see what the market thinks you're worth.</p>
                        <Link href="/tools/business-valuation-calculator" className="btn" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                            Use our Business Valuation Calculator
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
