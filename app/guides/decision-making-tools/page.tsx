import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Decision Making Tools for Founders | Strategic Frameworks Hub',
    description: 'Master the art of high-stakes decision making. Use weighted scoring systems, risk analysis tools, and decision frameworks to build with certainty.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/decision-making-tools',
    }
};

export default function DecisionMakingHub() {
    const faqs = [
        {
            q: "What is a Weighted Decision Matrix?",
            a: "A weighted decision matrix is a tool that allows you to evaluate multiple options against a set of criteria, where each criterion has a specific importance (weight). This provides a more nuanced comparison than a simple pros-and-cons list, as it accounts for the relative importance of factors like cost, speed, and long-term impact."
        },
        {
            q: "How can I reduce bias in my business decisions?",
            a: "Bias is reduced through external validation and objectivity. Using tools like the Opportunity Ranking Tool forces you to assign numbers to your assumptions. Additionally, 'Pre-mortems' (imaging the decision failed and working backward) can surface hidden risks."
        },
        {
            q: "What is an 'Idea Risk Analyzer'?",
            a: "The Idea Risk Analyzer looks at factors like technical complexity, market saturation, and regulatory hurdles to assign a risk score to a concept. High-risk ideas aren't necessarily bad, but they require a different strategy and higher capital reserves than low-risk ones."
        },
        {
            q: "How do I know if I'm ready to launch?",
            a: "The Startup Readiness Score audits your business across product, marketing, finance, and legal. If you score low in a critical area, it's often better to delay the launch by a few weeks rather than failing in the public eye."
        },
        {
            q: "How do I manage burnout during high-decison periods?",
            a: "Decision fatigue is real. Use the Burnout Risk Calculator to track your stress levels and workload. Effective founders automate routine decisions and reserve their mental energy for high-leverage strategic pivots."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Decision Making Tools for Founders',
                description: 'The premier hub for strategic decision-making frameworks and tools.',
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
                <span style={{ color: 'var(--text-primary)' }}>Decision Making Tools</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Decision Hub: Master the Art of High-Stakes Strategy
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    A founder's only real job is to make decisions. The quality of your life and the success of your business depend on the quality of those choices. This hub provide the logic-driven frameworks to decide with absolute certainty.
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
                    <li><a href="#matrices" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. Decision Matrices and Scoring</a></li>
                    <li><a href="#risk" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Risk Analysis and Mitigation</a></li>
                    <li><a href="#opportunity" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Opportunity Comparison</a></li>
                    <li><a href="#readiness" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Launch Readiness and Timing</a></li>
                    <li><a href="#fatigue" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Managing Decision Fatigue</a></li>
                    <li><a href="#directory" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Essential Decision Tool Directory</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>7. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="matrices" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Decision Matrices and Scoring</h2>
                    <p>
                        When facing complex choices, the human brain is easily overwhelmed by variables. Systematizing the process is the only way to maintain objectivity.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Decision Matrix Builder</h3>
                    <p>
                        The <Link href="/tools/decision-matrix-builder" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Decision Matrix Builder</Link> is a universal tool for comparing anything from a new vendor to a strategic pivot. By weighing your criteria, you ensure that the most important factors carry the most influence over the final score.
                    </p>
                </section>

                <section id="risk" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Risk Analysis and Mitigation</h2>
                    <p>
                        Risk is not the enemy; unmanaged risk is. Great entrepreneurs are not risk-takers; they are risk-mitigators.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Idea Risk Analysis</h3>
                    <p>
                        Before committing resources, use the <Link href="/tools/idea-risk-analyzer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Idea Risk Analyzer</Link>. It audits your concept for flaws in market-demand, technical feasibility, and legal compliance.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Project Risk</h3>
                    <p>
                        Complexity is a breeding ground for risk. The <Link href="/tools/project-risk-predictor" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Project Risk Predictor</Link> helps you identify the 'Critical Path' and potential failure points in your execution timeline.
                    </p>
                </section>

                <section id="opportunity" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Opportunity Comparison</h2>
                    <p>
                        Opportunity cost is the hidden killer of startups. Choosing to do 'A' means you cannot do 'B'.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Ranking Opportunities</h3>
                    <p>
                        The <Link href="/tools/opportunity-ranking-tool" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Opportunity Ranking Tool</Link> and <Link href="/tools/idea-comparison-tool" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Idea Comparison Tool</Link> allow you to stack your options against each other. This is particularly useful during the 'Ideation' phase or when deciding which market to expand into next.
                    </p>
                </section>

                <section id="readiness" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Launch Readiness and Timing</h2>
                    <p>
                        Timing is the most underestimated factor in success. Launch too early, and you break your reputation. Launch too late, and the market passes you by.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Ready or Not?</h3>
                    <p>
                        The <Link href="/tools/startup-readiness-score" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Startup Readiness Score</Link> provides a comprehensive audit. If your score is above 80%, you are in the 'Green Zone' for launch. If it's below 50%, you are at high risk of a public failure. Use the <Link href="/tools/launch-timing-analyzer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Launch Timing Analyzer</Link> to find the optimal week to go live.
                    </p>
                </section>

                <section id="fatigue" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Managing Decision Fatigue</h2>
                    <p>
                        A tired founder makes bad decisions. Managing your own mental health is a strategic business requirement.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Burnout Monitoring</h3>
                    <p>
                        Use the <Link href="/tools/burnout-risk-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Burnout Risk Calculator</Link> to stay aware of your operational limits. High stress leads to 'tunnel vision'—making it harder to see the innovative solutions that your business needs.
                    </p>
                </section>

                <section id="directory" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>6. Essential Decision Tool Directory</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                        {[
                            { name: 'Decision Matrix Builder', path: '/tools/decision-matrix-builder' },
                            { name: 'Idea Comparison Tool', path: '/tools/idea-comparison-tool' },
                            { name: 'Idea Risk Analyzer', path: '/tools/idea-risk-analyzer' },
                            { name: 'Opportunity Ranking', path: '/tools/opportunity-ranking-tool' },
                            { name: 'Problem Severity Calc', path: '/tools/problem-severity-calculator' },
                            { name: 'Idea Validator', path: '/tools/startup-idea-validator' },
                            { name: 'Launch Timing Analyzer', path: '/tools/launch-timing-analyzer' },
                            { name: 'Readiness Score', path: '/tools/startup-readiness-score' },
                            { name: 'Project Risk Predictor', path: '/tools/project-risk-predictor' },
                            { name: 'Burnout Risk Calc', path: '/tools/burnout-risk-calculator' },
                            { name: 'Deadline Confidence Calc', path: '/tools/deadline-confidence-calculator' },
                            { name: 'PMF Score Tool', path: '/tools/product-market-fit-score' },
                            { name: 'Feature Priority Matrix', path: '/tools/feature-priority-matrix' },
                            { name: 'Validation Checklist', path: '/tools/validation-checklist-builder' },
                            { name: 'Market Trend Evaluator', path: '/tools/market-trend-evaluator' },
                            { name: 'Gap Analyzer', path: '/tools/competitor-gap-analyzer' },
                            { name: 'Business Model Selector', path: '/tools/business-model-selector' },
                            { name: 'SaaS Pricing Calc', path: '/tools/saas-pricing-calculator' },
                            { name: 'Break-Even Calculator', path: '/tools/break-even-calculator' },
                            { name: 'LTV Calculator', path: '/tools/customer-lifetime-value-calculator' }
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
                        <li><Link href="/guides/business-planning-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Business Planning Hub</Link></li>
                        <li><Link href="/guides/best-startup-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Startup Tools Hub</Link></li>
                        <li><Link href="/guides/product-strategy-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Product Management Hub</Link></li>
                        <li><Link href="/guides/market-research-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Market Research Hub</Link></li>
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
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Decide with Conviction</h2>
                <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                    ToolStrategyHub provides the logic-driven frameworks you need to make the right call, every time. Start your decision-making journey today.
                </p>
                <Link href="/tools" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                    Explore All Decision Tools
                </Link>
            </footer>
        </div>
    );
}
