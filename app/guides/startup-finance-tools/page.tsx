import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Startup Finance Tools | Runway, Burn Rate & Valuation Hub',
    description: 'Master your startup finances with the ultimate collection of strategic calculators. Calculate runway, burn rate, LTV, CAC, and business valuation with accuracy.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/startup-finance-tools',
    }
};

export default function StartupFinanceHub() {
    const faqs = [
        {
            q: "What is 'Default Alive'?",
            a: "A startup is 'Default Alive' if its current cash on hand, plus projected future revenue growth, allows it to reach profitability before running out of money. If it requires a future fundraise to survive, it is 'Default Dead.' Use our Runway Calculator to see where you stand."
        },
        {
            q: "How do I lower my burn rate without firing people?",
            a: "Burning less doesn't always mean cutting staff. It can mean optimizing your ad spend (see Marketing ROI), automating manual workflows (see Workflow Costing), or renegotiating SaaS subscriptions. However, if your burn is unsustainable, acting early is better than waiting until you have weeks of runway left."
        },
        {
            q: "Why is gross margin so important for SaaS?",
            a: "Gross margin tells you how much of every dollar of revenue is left after covering the direct costs of delivering the service (server costs, support, etc.). High gross margins (70-90%) allow SaaS companies to reinvest heavily in Sales and R&D, driving exponential growth."
        },
        {
            q: "What is a 'Safe' amount of runway?",
            a: "Most venture-backed startups aim for 18-24 months of runway. This gives you 12 months to execute and 6-12 months to raise the next round. If you are bootstrapped, you should aim to be 'Default Alive' as quickly as possible."
        },
        {
            q: "How should I value my early-stage startup with no revenue?",
            a: "Valuing pre-revenue startups is more art than science. It's typically based on the team's pedigree, the size of the market opportunity, and the current 'temperature' of the VC market. Use our Valuation Calculator to see how your metrics might translate to a post-revenue valuation."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Startup Finance Tools Hub',
                description: 'The definitive hub for startup financial modeling, runway tracking, and valuation.',
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
                <span style={{ color: 'var(--text-primary)' }}>Startup Finance Tools</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Startup Finance Hub: Navigating the Math of Survival and Scale
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Cash is the oxygen of a startup. When you run out, the game ends. This hub provides the financial tools to ensure you stay in the game and scale toward a massive exit.
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
                    <li><a href="#runway" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. Runway and Burn Rate Management</a></li>
                    <li><a href="#valuation" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Valuation and Equity Planning</a></li>
                    <li><a href="#unit" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Unit Economics: LTV and CAC</a></li>
                    <li><a href="#modeling" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Financial and Revenue Modeling</a></li>
                    <li><a href="#ops" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Operational Efficiency and ROI</a></li>
                    <li><a href="#directory" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Essential Finance Tool Directory</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>7. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="runway" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Runway and Burn Rate Management</h2>
                    <p>
                        A startup is a race against time. Your runway is the amount of time you have to prove your business model before your cash runs out.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Calculating Your Runway</h3>
                    <p>
                        The <Link href="/tools/startup-runway-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Startup Runway Calculator</Link> provides a definitive date for when your bank account hits zero. You should check this at least once a month.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Controlling Burn</h3>
                    <p>
                        Burn rate is your monthly net loss. Use the <Link href="/tools/startup-burn-rate-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Startup Burn Rate Calculator</Link> to see how changes in your spending or revenue impact your survival timeline.
                    </p>
                </section>

                <section id="valuation" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Valuation and Equity Planning</h2>
                    <p>
                        Valuation is the price of your dream. It dictates how much of your company you own today, and how much you will own after an exit.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Valuation Calculator</h3>
                    <p>
                        Use the <Link href="/tools/business-valuation-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Business Valuation Calculator</Link> to estimate your enterprise value. This is critical for fundraising discussions and for setting employee option pools.
                    </p>
                    
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', margin: '2rem 0' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Case Study: The Dilution Trap</h4>
                        <p>A founder raised $1M at a $5M valuation, giving away 20%. In the next round, they raised $5M at a $15M valuation, giving away another 33%. Total dilution: 46% after just two rounds. Understanding valuation math early allows you to raise capital more strategically.</p>
                    </div>
                </section>

                <section id="unit" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Unit Economics: LTV and CAC</h2>
                    <p>
                        If you lose money on every customer, you can't "make it up on volume." That's the path to a faster bankruptcy.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>LTV:CAC Ratio</h3>
                    <p>
                        The relationship between <Link href="/tools/customer-lifetime-value-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Customer Lifetime Value (LTV)</Link> and <Link href="/tools/cac-payback-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>CAC Payback</Link> is the most important financial metric for growth. If your LTV is $1,000 and your CAC is $200, you have a 5:1 ratio—a very healthy, scalable business.
                    </p>
                </section>

                <section id="modeling" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Financial and Revenue Modeling</h2>
                    <p>
                        Modeling is about predicting the future. It allows you to test "what if" scenarios before they happen.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Designing for Revenue</h3>
                    <p>
                        Use the <Link href="/tools/revenue-model-designer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Revenue Model Designer</Link> and <Link href="/tools/saas-pricing-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>SaaS Pricing Calculator</Link> to find the configuration that maximizes your probability of hitting 'Default Alive' status.
                    </p>
                </section>

                <section id="ops" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Operational Efficiency and ROI</h2>
                    <p>
                        Finance isn't just about the bank account; it's about the efficiency of the capital you've deployed.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Return on Investment</h3>
                    <p>
                        Constanty audit your spends. The <Link href="/tools/marketing-roi-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Marketing ROI Calculator</Link> and <Link href="/tools/lead-generation-roi-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Lead Gen ROI Calculator</Link> ensure that your acquisition budget is being used effectively.
                    </p>

                    <p>
                        On the operations side, use the <Link href="/tools/workflow-cost-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Workflow Cost Calculator</Link> to identify where cash is being wasted on manual processes that could be automated.
                    </p>
                </section>

                <section id="directory" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>6. Essential Finance Tool Directory</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                        {[
                            { name: 'Runway Calculator', path: '/tools/startup-runway-calculator' },
                            { name: 'Burn Rate Calculator', path: '/tools/startup-burn-rate-calculator' },
                            { name: 'Valuation Calculator', path: '/tools/business-valuation-calculator' },
                            { name: 'Break-Even Calculator', path: '/tools/break-even-calculator' },
                            { name: 'LTV Calculator', path: '/tools/customer-lifetime-value-calculator' },
                            { name: 'CAC Payback Calculator', path: '/tools/cac-payback-calculator' },
                            { name: 'SaaS Pricing Calculator', path: '/tools/saas-pricing-calculator' },
                            { name: 'Loan Scenario Comparator', path: '/tools/loan-scenario-comparator' },
                            { name: 'Revenue Model Designer', path: '/tools/revenue-model-designer' },
                            { name: 'Marketing ROI Calc', path: '/tools/marketing-roi-calculator' },
                            { name: 'Lead Gen ROI Calc', path: '/tools/lead-generation-roi-calculator' },
                            { name: 'Workflow Cost Calc', path: '/tools/workflow-cost-calculator' },
                            { name: 'Team Capacity Planner', path: '/tools/team-capacity-planner' },
                            { name: 'Startup Readiness Score', path: '/tools/startup-readiness-score' },
                            { name: 'Validation Checklist', path: '/tools/validation-checklist-builder' },
                            { name: 'Business Model Selector', path: '/tools/business-model-selector' },
                            { name: 'Conversion Rate Calc', path: '/tools/conversion-rate-calculator' },
                            { name: 'Benefit Cost Calc', path: '/tools/automation-roi-tool' },
                            { name: 'Opportunity Ranking', path: '/tools/opportunity-ranking-tool' },
                            { name: 'Market Size Estimator', path: '/tools/market-size-estimator' }
                        ].map((tool, i) => (
                            <Link key={i} href={tool.path} style={{ 
                                padding: '1.5rem', 
                                backgroundColor: 'var(--bg-secondary)', 
                                border: '1px solid var(--border-color)', 
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }} className="hover-lift">
                                {tool.name}
                                <span style={{ color: 'var(--accent-primary)' }}>&rarr;</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section id="related-guides" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Strategic Guides</h2>
                    <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', listStyle: 'none', padding: 0 }}>
                        <li><Link href="/guides/business-calculators" style={{ color: 'var(--accent-primary)' }}>&bull; Business Calculators Hub</Link></li>
                        <li><Link href="/guides/best-startup-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Startup Tools Hub</Link></li>
                        <li><Link href="/guides/pricing-strategy-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Pricing Strategy Hub</Link></li>
                        <li><Link href="/guides/business-planning-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Business Planning Hub</Link></li>
                    </ul>
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

            </article>

            <footer style={{ marginTop: '6rem', padding: '4rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Secure Your Financial Future</h2>
                <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                    The most successful founders are the ones who master their math. Don't leave your finances to chance—use ToolStrategyHub to build a rock-solid financial foundation.
                </p>
                <Link href="/tools" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                    View All Finance Tools
                </Link>
            </footer>
        </div>
    );
}
