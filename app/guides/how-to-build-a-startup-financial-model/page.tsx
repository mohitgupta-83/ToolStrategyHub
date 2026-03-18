import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Build a Startup Financial Model (That VCs Trust) | ToolStrategyHub',
    description: 'Learn step-by-step how to build a rigorous startup financial model. Master revenue forecasting, expense planning, cash flow analysis, and scenario modeling.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/how-to-build-a-startup-financial-model',
    }
};

export default function StartupFinancialModelGuide() {
    const faqs = [
        {
            q: "How far into the future should my financial model forecast?",
            a: "Venture capitalists typically expect a 3-year to 5-year forecast. While Year 1 should be highly granular (month-by-month), Years 3, 4, and 5 can be aggregate annual approximations because the chance of them being perfectly accurate is zero."
        },
        {
            q: "Do I need to hire a CFO to build this for me?",
            a: "At the Seed or Series A stage, no. As a founder, you must build the first version yourself or you won't mathematically understand the levers of your own business. You can hire a fractional CFO to review it, but you must own the core assumptions."
        },
        {
            q: "What is the biggest mistake founders make in revenue modeling?",
            a: "Assuming arbitrary 'hockey-stick' growth and tying revenue directly to the passing of time, rather than tying it to operational inputs (like the number of salespeople hired, or the exact marketing budget multiplying by a historical conversion rate)."
        },
        {
            q: "How detailed should the expense forecast be?",
            a: "Headcount is the primary driver of expenses, so it must be exact. List every single role you plan to hire, their fully burdened salary (including taxes/benefits), and the exact month they start. General office supplies can be broad estimators."
        },
        {
            q: "What if an investor asks to see my 'Base Case' vs 'Downside Case'?",
            a: "This refers to Scenario Planning. Your model should have toggles. A 'Base Case' assumes you hit your targets. A 'Downside Case' assumes you only hit 50% of your revenue goals. If the downside case shows you running out of cash in six months, it's a massive red flag."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'How to Build a Startup Financial Model',
                description: 'A comprehensive guide to constructing a granular, defensible financial roadmap for early-stage startups.',
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
                <span style={{ color: 'var(--text-primary)' }}>Build a Financial Model</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    How to Build a Defensible Startup Financial Model
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    A financial model is not an accounting document; it is an operational roadmap. It proves to investors that you understand the mathematical physics required to scale your business from zero to $10 Million in ARR. 
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
                    <li><a href="#revenue" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. Revenue Modeling (Bottom-Up)</a></li>
                    <li><a href="#expenses" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Expense Forecasting (Fixed vs Variable)</a></li>
                    <li><a href="#cash-flow" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Cash Flow Analysis</a></li>
                    <li><a href="#scenario" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Multi-Case Scenario Planning</a></li>
                    <li><a href="#defending" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Defending the Model to Investors</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="revenue" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Revenue Modeling (The Bottom-Up Approach)</h2>
                    <p>
                        The most fatal mistake founders make is "Top-Down" revenue modeling. They say: "The market is $1 Billion, we will capture 1% by Year 3, so our revenue will equal $10 Million." Investors will immediately throw this in the trash. You must build a Bottom-Up model.
                    </p>
                    <p>
                        A Bottom-Up model mathematically proves how you acquire a single customer. 
                    </p>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', margin: '2rem 0' }}>
                        <li><strong>Input 1 (Traffic):</strong> We spend $10,000 a month on Google Ads, at a $2 CPC, driving 5,000 visits.</li>
                        <li><strong>Input 2 (Conversion):</strong> 2% of visits sign up for a demo (100 demos).</li>
                        <li><strong>Input 3 (Closing):</strong> The sales rep closes 20% of demos (20 new customers).</li>
                        <li><strong>Output (Revenue):</strong> 20 customers × $500/month subscription = $10,000 new MRR added that month.</li>
                    </ul>
                    <p>
                        To reach your Year 3 goals, you simply model out increasing the ad budget and headcount, keeping the conversion physics the exact same.
                    </p>
                </section>

                <section id="expenses" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Expense Forecasting (Fixed vs Variable)</h2>
                    <p>
                        Your expenses must be split aggressively between Fixed (Overhead) and Variable (COGS) costs. 
                    </p>
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Structuring Headcount</h3>
                    <p>
                        Salaries will encompass 70% to 80% of your total expenses. Do not just model a generic "$100k for engineering." Build a granular roster: "Senior Frontend Rep 1 starts Month 4 at $12k/mo. Junior Backend Rep 2 starts Month 8 at $8k/mo." Multiply all salaries by 1.2 to account for the "fully burdened" cost of employer taxes and benefits.
                    </p>
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Calculating Break-Even</h3>
                    <p>
                        By firmly keeping your Variable costs (Stripe fees, AWS usage) separate from your Fixed costs (Salaries, Rent), you can automatically calculate at exactly which month your Gross Profit overtakes your Overhead.
                    </p>
                    <p>
                        You can instantly visualize these crossover points using the <Link href="/tools/break-even-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Break-Even Target Calculator</Link>.
                    </p>
                </section>

                <section id="cash-flow" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Cash Flow Analysis</h2>
                    <p>
                        Revenue is not Cash. This is the difference between accounting and reality.
                    </p>
                    <p>
                        If you sign a $120,000 enterprise contract, your <em>Revenue</em> is recognized generally as $10,000 a month. However, if the client agreed to Net-90 payment terms, you will not receive a single dollar of actual <em>Cash</em> for three months. Meanwhile, you still have to pay your engineers' salaries every two weeks.
                    </p>
                    <p>
                        Your model must track the exact Cash Balance at the end of every month. The month the Cash Balance dips below $0 is the month your startup dies. 
                    </p>
                    <p>
                        Audit your exact cash cliff right now dynamically with the <Link href="/tools/startup-burn-rate-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Startup Burn Rate Calculator</Link>.
                    </p>
                </section>

                <section id="scenario" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Multi-Case Scenario Planning</h2>
                    <p>
                        No model survives contact with reality. Your 3-year projection is wrong before you even hit "Save." The value of the model is its ability to test variables through Scenario Planning.
                    </p>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', margin: '2rem 0' }}>
                        <li><strong>The Base Case:</strong> This is the plan you intend to execute. Reasonable growth, standard hiring.</li>
                        <li><strong>The Downside Case:</strong> What happens if CPCs double? What happens if it takes 6 months to close a deal instead of 3? You stress-test the model to ensure you have enough runway to survive a macroeconomic shock.</li>
                        <li><strong>The Burn-the-Boats Case:</strong> If you raise a massive Series A and want to grow 400% YoY, how much cash do you need to hire the required 40 sales reps tomorrow?</li>
                    </ul>
                </section>

                <section id="defending" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Defending the Model to Investors</h2>
                    <p>
                        When a VC opens your spreadsheet, they are looking for one thing: are your assumptions logical? 
                    </p>
                    <p>
                        If your model shows that a single junior sales rep is going to close $5 Million in ARR their first year, the investor knows you do not understand enterprise sales. If your model shows a Customer Acquisition Cost (CAC) of $10 but a Lifetime Value (LTV) of $10,000, you are hallucinating.
                    </p>
                    <p>
                        Treat your financial model as a mirror. If the numbers look suspiciously perfect, you have likely built an echo chamber rather than a business plan. Ensure every major driver (churn, conversion rates, click costs) aligns closely with SaaS industry benchmarks.
                    </p>
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
                     <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Financial Strategy Guides</h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <li><Link href="/guides/startup-finance-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The Core Startup Finance Tools</Link></li>
                         <li><Link href="/compare/startup-burn-rate-vs-runway" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Understand Burn Rate Dynamics</Link></li>
                         <li><Link href="/compare/market-sizing-top-down-vs-bottom-up" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Building Bottom-Up Sizing Models</Link></li>
                     </ul>
                </section>

            </article>
        </div>
    );
}
