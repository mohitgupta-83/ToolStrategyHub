import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Product Strategy Tools | Feature Prioritization & PMF Hub',
    description: 'Master your product roadmap with the ultimate strategic tools for PMs. Prioritize features, calculate MVP scope, and measure product-market fit.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/product-strategy-tools',
    }
};

export default function ProductManagementHub() {
    const faqs = [
        {
            q: "How do I choose which features to build next?",
            a: "Feature prioritization should be data-driven. Use the Feature Priority Matrix (based on RICE or Eisenhower frameworks) to score features based on Reach, Impact, Confidence, and Effort. This prevents personal bias from dictating the roadmap."
        },
        {
            q: "What is the most common mistake in defining MVP scope?",
            a: "The most common mistake is 'scope creep'—adding 'nice to have' features that delay launch and dilute the core value proposition. Use the MVP Scope Calculator to define the absolute minimum set of features required to solve the primary user problem."
        },
        {
            q: "How do I measure Product-Market Fit (PMF) accurately?",
            a: "One standard metric is the 'Sean Ellis' survey: 'How disappointed would you be if you could no longer use this product?' If 40% or more say 'very disappointed,' you likely have PMF. Our PMF Score tool helps you track this and other leading indicators like retention and referral rates."
        },
        {
            q: "How do I calculate the ROI of an automated feature?",
            a: "Use the Automation ROI Tool. It compares the development cost of the automation against the hours of manual labor it will save over its lifetime. If the payback period is less than 6 months, the feature is usually a high priority."
        },
        {
            q: "How do I manage risk in a complex product launch?",
            a: "The Project Risk Predictor allows you to input variables like team experience, technical complexity, and external dependencies to identify potential 'blow up' points before they happen. Effective PMing is about preemptive risk mitigation."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Product Strategy Tools Hub',
                description: 'The definitive collection of strategic tools for product managers and founders.',
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
                <span style={{ color: 'var(--text-primary)' }}>Product Strategy Tools</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Product Strategy Hub: Building Products People Actually Want
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    Great products aren't built on intuition; they're built on evidence. This hub provides the frameworks and tools needed to move from a backlog of ideas to a strategic product roadmap that drives growth.
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
                    <li><a href="#prioritization" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. Feature Prioritization Frameworks</a></li>
                    <li><a href="#pmf" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Measuring Product-Market Fit</a></li>
                    <li><a href="#mvp" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. MVP Scope and Planning</a></li>
                    <li><a href="#discovery" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Product Discovery and Validation</a></li>
                    <li><a href="#operations" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Operational Product Management</a></li>
                    <li><a href="#directory" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Essential Product Tool Directory</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>7. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="prioritization" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Feature Prioritization Frameworks</h2>
                    <p>
                        The hardest part of being a PM is saying "no." Every stakeholder has their own priority. Your job is to find the common thread that drives the highest value for the business and the user.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Priority Matrix</h3>
                    <p>
                        The <Link href="/tools/feature-priority-matrix" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Feature Priority Matrix</Link> is your shield. By assigning objective scores to impact and effort, you can transform emotional debates into logical discussions. Features in the "High Impact, Low Effort" quadrant are your immediate wins.
                    </p>
                    
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)', margin: '2rem 0' }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>Pro Tip: Always involve your engineering lead in the 'Effort' scoring. PMs notoriously underestimate technical complexity.</p>
                    </div>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Scoring Decision-Making</h3>
                    <p>
                        When choosing between high-level strategic directions (e.g., "Build a mobile app" vs. "Expand to enterprise"), use the <Link href="/tools/decision-matrix-builder" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Decision Matrix Builder</Link>. It allows you to weigh criteria like market size, strategic alignment, and technical debt to find the optimal path.
                    </p>
                </section>

                <section id="pmf" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Measuring Product-Market Fit</h2>
                    <p>
                        Product-Market Fit isn't a binary state; it's a spectrum. You need leading indicators to tell you if you're getting closer.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The PMF Score</h3>
                    <p>
                        The <Link href="/tools/product-market-fit-score" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Product-Market Fit Score</Link> aggregates survey data, retention rates, and net promoter scores (NPS) to give you a definitive pulse on your product's health. If your score is trending down, it's time to stop building new features and start fixing the core experience.
                    </p>
                </section>

                <section id="mvp" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. MVP Scope and Planning</h2>
                    <p>
                        An MVP is about learning, not about shipping. You want to ship the smallest possible thing that allows you to validate your core hypothesis.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Scope Calculation</h3>
                    <p>
                        Use the <Link href="/tools/mvp-scope-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>MVP Scope Calculator</Link> to audit your feature list. It forces you to categorize features as 'Critical,' 'Supporting,' or 'Nice-to-Have.' If a feature doesn't directly enable the primary user journey, it shouldn't be in the MVP.
                    </p>
                </section>

                <section id="discovery" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Product Discovery and Validation</h2>
                    <p>
                        Discovery is the process of figuring out what to build. This involves deep dives into user pain points.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Problem Severity</h3>
                    <p>
                        Before you solutionize, understand the problem. The <Link href="/tools/problem-severity-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Problem Severity Calculator</Link> helps you quantify how much pain a user is in. High-severity problems justify premium prices and drive high organic growth.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Customer Interviews</h3>
                    <p>
                        Don't lead the witness. The <Link href="/tools/customer-interview-script-generator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Customer Interview Script Generator</Link> helps you draft unbiased questions that uncover the true "jobs to be done" for your users.
                    </p>
                </section>

                <section id="operations" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Operational Product Management</h2>
                    <p>
                        Once building begins, the PM's role shifts to coordination and risk management.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Predicting Risk</h3>
                    <p>
                        Launches often fail not because of the product, but because of the process. The <Link href="/tools/project-risk-predictor" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Project Risk Predictor</Link> identifies bottlenecks in your development cycle before they delay your launch.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Team Capacity</h3>
                    <p>
                        Are you overworking your team? Or do you have idle hands? Use the <Link href="/tools/team-capacity-planner" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Team Capacity Planner</Link> to ensure your roadmap is actually achievable with your current resources.
                    </p>
                </section>

                <section id="directory" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>6. Essential Product Tool Directory</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                        {[
                            { name: 'Feature Priority Matrix', path: '/tools/feature-priority-matrix' },
                            { name: 'PMF Score Tool', path: '/tools/product-market-fit-score' },
                            { name: 'MVP Scope Calculator', path: '/tools/mvp-scope-calculator' },
                            { name: 'Decision Matrix Builder', path: '/tools/decision-matrix-builder' },
                            { name: 'Problem Severity Calc', path: '/tools/problem-severity-calculator' },
                            { name: 'Interview Script Gen', path: '/tools/customer-interview-script-generator' },
                            { name: 'Launch Timing Analyzer', path: '/tools/launch-timing-analyzer' },
                            { name: 'Workflow Cost Calc', path: '/tools/workflow-cost-calculator' },
                            { name: 'Team Capacity Planner', path: '/tools/team-capacity-planner' },
                            { name: 'Task Complexity Est', path: '/tools/task-complexity-estimator' },
                            { name: 'Project Risk Predictor', path: '/tools/project-risk-predictor' },
                            { name: 'Automation ROI Tool', path: '/tools/automation-roi-tool' },
                            { name: 'Reddit Pain Finder', path: '/tools/reddit-pain-finder' },
                            { name: 'Opportunity Ranking', path: '/tools/opportunity-ranking-tool' },
                            { name: 'Conversion Rate Calc', path: '/tools/conversion-rate-calculator' },
                            { name: 'Startup Readiness Score', path: '/tools/startup-readiness-score' },
                            { name: 'Validation Checklist', path: '/tools/validation-checklist-builder' },
                            { name: 'Idea Risk Analyzer', path: '/tools/idea-risk-analyzer' },
                            { name: 'Competitor Gap Analyzer', path: '/tools/competitor-gap-analyzer' },
                            { name: 'Market Trend Evaluator', path: '/tools/market-trend-evaluator' }
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
                        <li><Link href="/guides/market-research-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Market Research Hub</Link></li>
                        <li><Link href="/guides/best-startup-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Startup Tools Hub</Link></li>
                        <li><Link href="/guides/pricing-strategy-tools" style={{ color: 'var(--accent-primary)' }}>&bull; Pricing Strategy Hub</Link></li>
                        <li><Link href="/guides/marketing-metrics-calculators" style={{ color: 'var(--accent-primary)' }}>&bull; Marketing Metrics Hub</Link></li>
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
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Build with Precision</h2>
                <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                    ToolStrategyHub provides the logic needed to ship products that users love. Start prioritizing your backlog with our strategic matrices today.
                </p>
                <Link href="/tools" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                    View All Product Tools
                </Link>
            </footer>
        </div>
    );
}
