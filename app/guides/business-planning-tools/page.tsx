import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Business Planning Tools | Strategy & Operations Hub',
    description: 'The ultimate guide to business planning. Create your business model canvas, design revenue models, plan team capacity, and optimize workflows.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/business-planning-tools',
    }
};

export default function BusinessPlanningHub() {
    const faqs = [
        {
            q: "What is a Business Model Canvas?",
            a: "The Business Model Canvas is a strategic management template for developing new or documenting existing business models. It visualizes the nine building blocks of a business: customer segments, value propositions, channels, customer relationships, revenue streams, key activities, key resources, key partners, and cost structure."
        },
        {
            q: "Why do I need a revenue model designer?",
            a: "A revenue model designer helps you simulate how different monetization strategies (subscriptions, one-time sales, freemium) will scale. It allows you to see the long-term impact of pricing and volume on your bottom line before you commit to a strategy."
        },
        {
            q: "How do I calculate workflow costs?",
            a: "By mapping out the steps in a process, assigning a time value to each step, and multiplying by the labor cost of the person performing the task. Our Workflow Cost Calculator automates this to help you identify processes that are ripe for automation."
        },
        {
            q: "How do I know when it's time to hire?",
            a: "Use the Team Capacity Planner. If your existing team is consistently operating at 90%+, quality will begin to slip. Hiring should happen when you can forecast that a new hire will pay for themselves within 3-6 months through increased output or sales."
        },
        {
            q: "What is the best tool stack for a small business?",
            a: "The 'best' stack depends on your industry. Our Small Business Tool Stack Builder recommends a curated list of software categories based on your business model, scale, and budget."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Business Planning Tools Hub',
                description: 'The definitive hub for strategic business planning and operational optimization.',
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
                <span style={{ color: 'var(--text-primary)' }}>Business Planning Tools</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Business Planning Hub: Designing a Sustainable Enterprise
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    A business plan shouldn't be a 50-page document that sits in a drawer. It should be a living, breathing strategy backed by data. This hub provides the tools to design, simulate, and optimize your business architecture.
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
                    <li><a href="#canvas" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. Business Model Architecture</a></li>
                    <li><a href="#revenue" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Designing Revenue Models</a></li>
                    <li><a href="#ops" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Operational and Workflow Planning</a></li>
                    <li><a href="#team" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Team Capacity and Hiring</a></li>
                    <li><a href="#stack" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Building Your Tool Stack</a></li>
                    <li><a href="#directory" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Essential Planning Tool Directory</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>7. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="canvas" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Business Model Architecture</h2>
                    <p>
                        The structure of your business defines its ceiling. Some models are inherently more scalable and profitable than others.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Canvas Builder</h3>
                    <p>
                        Our <Link href="/tools/business-model-canvas-builder" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Business Model Canvas Builder</Link> helps you map out the critical components of your enterprise. It's a visual way to see if your value proposition actually aligns with your cost structure and revenue streams.
                    </p>
                </section>

                <section id="revenue" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Designing Revenue Models</h2>
                    <p>
                        How you charge is as important as what you charge.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Revenue Model Designer</h3>
                    <p>
                        The <Link href="/tools/revenue-model-designer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Revenue Model Designer</Link> allows you to compare different monetization paths. For example, you can simulate a 'Freemium' vs. 'Free Trial' model to see which generates higher total lifetime value (LTV) for your specific churn and conversion rates.
                    </p>
                    
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', margin: '2rem 0' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Pro Tip: The Power of Recurring Revenue</h4>
                        <p>Businesses with recurring revenue are valued 3-5x higher than those with one-time sales. Use our designer to see if you can pivot a portion of your business to a subscription model.</p>
                    </div>
                </section>

                <section id="ops" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Operational and Workflow Planning</h2>
                    <p>
                        Operations are where the "real" work happens. Inefficient workflows are a silent tax on your profitability.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Workflow Costing</h3>
                    <p>
                        Use the <Link href="/tools/workflow-cost-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Workflow Cost Calculator</Link> to audit your most frequent tasks. If a task takes 5 hours a week and is performed by an employee earning $50/hr, that task costs you $13,000 a year. Suddenly, a $5,000 automation tool looks like a bargain. Use the <Link href="/tools/automation-roi-tool" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Automation ROI Tool</Link> to confirm.
                    </p>
                </section>

                <section id="team" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Team Capacity and Hiring</h2>
                    <p>
                        People are your most expensive and valuable resource. Managing their time is critical.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Capacity Planning</h3>
                    <p>
                        The <Link href="/tools/team-capacity-planner" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Team Capacity Planner</Link> helps you avoid burnout and under-utilization. Project your upcoming workload and see exactly when you will hit a capacity ceiling.
                    </p>
                </section>

                <section id="stack" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Building Your Tool Stack</h2>
                    <p>
                        Modern business is built on software. But too many tools lead to "SaaS bloat" and fragmented data.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Curated Stack</h3>
                    <p>
                        Use our <Link href="/tools/small-business-tool-stack-builder" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Small Business Tool Stack Builder</Link> to find the essential software categories for your specific stage of growth. We prioritize tools with high integration capabilities to ensure your data flows smoothly between systems.
                    </p>
                </section>

                <section id="directory" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>6. Essential Planning Tool Directory</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                        {[
                            { name: 'Business Model Canvas', path: '/tools/business-model-canvas-builder' },
                            { name: 'Revenue Model Designer', path: '/tools/revenue-model-designer' },
                            { name: 'Workflow Cost Calc', path: '/tools/workflow-cost-calculator' },
                            { name: 'Team Capacity Planner', path: '/tools/team-capacity-planner' },
                            { name: 'Model Selector', path: '/tools/business-model-selector' },
                            { name: 'Tool Stack Builder', path: '/tools/small-business-tool-stack-builder' },
                            { name: 'Weekly Planning Tool', path: '/tools/weekly-planning-tool' },
                            { name: 'Task Complexity Est', path: '/tools/task-complexity-estimator' },
                            { name: 'Automation ROI Tool', path: '/tools/automation-roi-tool' },
                            { name: 'Break-Even Calculator', path: '/tools/break-even-calculator' },
                            { name: 'LTV Calculator', path: '/tools/customer-lifetime-value-calculator' },
                            { name: 'Decision Matrix Builder', path: '/tools/decision-matrix-builder' },
                            { name: 'Idea Risk Analyzer', path: '/tools/idea-risk-analyzer' },
                            { name: 'Opportunity Ranking', path: '/tools/opportunity-ranking-tool' },
                            { name: 'Launch Timing Analyzer', path: '/tools/launch-timing-analyzer' },
                            { name: 'Project Risk Predictor', path: '/tools/project-risk-predictor' },
                            { name: 'Conversion Rate Calc', path: '/tools/conversion-rate-calculator' },
                            { name: 'PMF Score Tool', path: '/tools/product-market-fit-score' },
                            { name: 'Validation Checklist', path: '/tools/validation-checklist-builder' },
                            { name: 'Startup Readiness Score', path: '/tools/startup-readiness-score' }
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
                        <li><Link href="/guides/best-startup-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Startup Tools Hub</Link></li>
                        <li><Link href="/guides/business-calculators" style={{ color: 'var(--accent-primary)' }}>&bull; Business Calculators Hub</Link></li>
                        <li><Link href="/guides/product-strategy-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Product Management Hub</Link></li>
                        <li><Link href="/guides/decision-making-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Decision Making Hub</Link></li>
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
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Plan Your Path to Profit</h2>
                <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                    Don't just run a business—engineer one. ToolStrategyHub provides the architectural tools to build a company that lasts.
                </p>
                <Link href="/tools" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                    View All Planning Tools
                </Link>
            </footer>
        </div>
    );
}
