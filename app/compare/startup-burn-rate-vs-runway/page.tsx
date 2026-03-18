import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Burn Rate vs Runway: Cash Management for Startups | ToolStrategyHub',
    description: 'Understand the critical difference between startup burn rate and runway. Learn how to calculate both, avoid common cash flow mistakes, and extend your company life.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/compare/startup-burn-rate-vs-runway',
    }
};

export default function BurnRateVsRunwayCompare() {
    const faqs = [
        {
            q: "What is the difference between gross burn and net burn?",
            a: "Gross burn is the total amount of money your company spends in a month (salaries, servers, rent, marketing), ignoring revenue entirely. Net burn is the actual cash you lose each month after accounting for revenue (Gross Burn minus Revenue). Always use Net Burn to calculate runway."
        },
        {
            q: "Is a high burn rate always bad?",
            a: "Not necessarily. If you are extremely well-funded and using that cash to aggressively acquire market share with a highly profitable LTV:CAC ratio (like early Uber), a high burn rate is a strategic weapon. It's only bad if you are burning cash without measurable, scalable growth."
        },
        {
            q: "How much runway should a seed-stage startup have?",
            a: "The standard advice is to raise enough capital for 18 to 24 months of runway. It usually takes 12 to 18 months to hit the milestones required for your next round of funding, plus 6 months purely to run the fundraising process without running out of cash."
        },
        {
            q: "At what runway length should I start panicking?",
            a: "If you drop below 9 months of runway and are not close to profitability (Default Alive), you must immediately shift your focus to either raising more capital or drastically cutting costs. Fundraising when you have 3 months of cash left destroys your valuation leverage."
        },
        {
            q: "Can my runway be infinite?",
            a: "Yes. If your company reaches 'Default Alive' status—meaning your monthly revenue exceeds your monthly expenses (Gross Burn)—your Net Burn becomes zero or negative. At that point, your runway mathematically extends infinitely, and you control your own destiny."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Burn Rate vs Runway Explained',
                description: 'A critical guide for founders on managing cash burn, calculating runway, and avoiding startup death.',
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
                <Link href="/compare" style={{ color: 'var(--accent-primary)' }}>Comparisons</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>Burn Rate vs Runway</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Burn Rate vs Runway: The Metrics of Survival
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Cash is the oxygen of your business. Burn rate is how fast you are breathing it. Runway is how much oxygen is left in the tank. If you misunderstand the relationship between these two numbers, your company will die unexpectedly.
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
                    <li><a href="#burn-rate" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. What is Burn Rate?</a></li>
                    <li><a href="#runway" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. What is Runway?</a></li>
                    <li><a href="#relationship" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. The Relationship Between Them</a></li>
                    <li><a href="#calculations" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Example Calculations</a></li>
                    <li><a href="#mistakes" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Common Cash Management Mistakes</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="burn-rate" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Burn Rate Definition</h2>
                    <p>
                        Burn rate is the velocity at which your startup loses money. It is almost exclusively reported as a monthly figure. If your bank account dropped by $50,000 from March 1st to April 1st, your net burn rate is $50,000/month.
                    </p>
                    <p>
                        It is critical to distinguish between <strong>Gross Burn</strong> (every dollar that leaves the company) and <strong>Net Burn</strong> (the actual gap between your spending and your revenue). If you spend $100k but make $80k in sales, your net burn is $20k. Investors almost exclusively care about your net burn, because it is the true measure of your cash deficit.
                    </p>
                    <p>Track your monthly losses instantly with the <Link href="/tools/startup-burn-rate-calculator" style={{ color: 'var(--accent-primary)' }}>Burn Rate Calculator</Link>.</p>
                </section>

                <section id="runway" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Runway Definition</h2>
                    <p>
                        Runway is a measure of time. It tells you exactly how many months your company can survive before its cash balance hits zero, assuming your current burn rate remains completely unchanged.
                    </p>
                    <p>
                        If you have $500,000 in the bank, and your net burn rate is $50,000 a month, your runway is 10 months. You have 10 months to figure out how to increase revenue, decrease expenses, or convince investors to give you more money. If you fail to do one of those three things in 10 months, your company shuts down.
                    </p>
                    <p>Audit your survival timeline right now using the <Link href="/tools/startup-runway-calculator" style={{ color: 'var(--accent-primary)' }}>Startup Runway Calculator</Link>.</p>
                </section>

                <section id="relationship" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. The Relationship Between Them</h2>
                    <p>
                        Burn rate and runway are inversely proportional. As your burn rate goes up (usually through hiring or aggressive marketing), your runway violently shrinks. 
                    </p>
                    <p>
                        A common trap founders fall into is believing that successfully raising money means they have solved their problems. They raise a $2M seed round ("Wow, 40 months of runway!"). Feeling flush with cash, they immediately triple the size of the engineering team, lease a beautiful office, and hire a PR firm. Suddenly, their burn rate spikes from $50k to $250k a month. Their massive "40-month runway" collapses to just 8 months.
                    </p>
                    <p>
                        You must constantly adjust the dials between the two. If a recession hits or a funding round falls through, the immediate lever a founder pulls is laying off staff (decreasing burn) to artificially extend survival time (increasing runway).
                    </p>
                </section>

                <section id="calculations" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Example Calculations</h2>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Scenario A: The Bootstrapped SaaS</h3>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                        <li><strong>Cash in Bank:</strong> $30,000 (from founders savings)</li>
                        <li><strong>Gross Burn (Expenses):</strong> $4,000 / month (servers + software)</li>
                        <li><strong>Revenue:</strong> $1,000 / month</li>
                        <li><strong>Net Burn:</strong> $3,000 / month ($4k - $1k)</li>
                        <li><strong>Runway:</strong> $30,000 ÷ $3,000 = <strong>10 Months</strong></li>
                    </ul>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Scenario B: The Venture-Backed Rocketship</h3>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                        <li><strong>Cash in Bank:</strong> $5,000,000 (Series A funding)</li>
                        <li><strong>Gross Burn (Expenses):</strong> $650,000 / month (massive headcount, heavy ad spend)</li>
                        <li><strong>Revenue:</strong> $200,000 / month</li>
                        <li><strong>Net Burn:</strong> $450,000 / month ($650k - $200k)</li>
                        <li><strong>Runway:</strong> $5,000,000 ÷ $450,000 = <strong>11.1 Months</strong></li>
                    </ul>

                    <p>Notice the paradox: the company with $5 Million in the bank is actually closer to death (11.1 months) than the company with $30,000 (10 months) if neither changes their trajectory.</p>
                </section>

                <section id="mistakes" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Common Mistakes Founders Make</h2>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Mistake 1: Projecting "Hockey Stick" Revenue</h3>
                    <p>
                        Founders often calculate their runway assuming their monthly revenue will magically double every month for the next year. It rarely does. If you assume revenue will cover your burn, and sales fall flat, your 18-month runway can suddenly become a 6-month runway. Always calculate a "worst-case" flat-revenue runway model.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Mistake 2: Forgetting Annual Cash Collections</h3>
                    <p>
                        Your runway isn't just affected by monthly MRR. If a customer signs a $120,000 annual contract and pays upfront in January, your bank balance jumps significantly, dramatically extending your runway. Conversely, relying solely on monthly SaaS subscriptions drains cash faster.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Mistake 3: The "Default Dead" Trap</h3>
                    <p>
                        Paul Graham famously coined the terms "Default Alive" and "Default Dead." If you project your current burn rate and revenue growth forward, will you hit profitability before you run out of cash? If yes, you are Default Alive. If no, you are Default Dead. Knowing where you stand dictates your entire level of operational panic.
                    </p>

                    <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Audit Your Cash Position</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Stop guessing when you'll run out of money. Calculate your precise survival timeline right now.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                             <Link href="/tools/startup-burn-rate-calculator" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Find Your Burn</Link>
                             <Link href="/tools/startup-runway-calculator" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>Calculate Runway</Link>
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
                     <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>More Startup Finance Strategy</h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <li><Link href="/guides/startup-finance-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The Core Finance Hub</Link></li>
                         <li><Link href="/guides/how-to-calculate-break-even-point" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Calculate the Break-Even Point</Link></li>
                     </ul>
                </section>

            </article>
        </div>
    );
}
