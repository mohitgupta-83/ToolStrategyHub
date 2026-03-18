import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Calculate Your Break-Even Point: Formulas & Examples | ToolStrategyHub',
    description: 'Learn the exact mathematical break-even point formula for business. Compare fixed vs variable costs, analyze real examples, and avoid common pricing mistakes.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/how-to-calculate-break-even-point',
    }
};

export default function BreakEvenGuide() {
    const faqs = [
        {
            q: "What is the primary difference between a break-even point in units vs dollars?",
            a: "Units tell you exactly how many items (or subscriptions) you need to sell to hit zero profit. Dollars tell you the absolute gross revenue you must generate to cover all expenses. Both are critical depending on whether you are tracking sales quotas or overall financial health."
        },
        {
            q: "Is marketing a fixed or variable cost?",
            a: "This is a common debate. General brand marketing (like sponsoring a podcast or paying a PR firm a monthly retainer) is a fixed cost because it doesn't change based on how many units you sell. However, direct-response performance marketing (like Facebook ads where you pay $50 per acquisition) acts like a variable cost."
        },
        {
            q: "How often should I recalculate my break-even point?",
            a: "Anytime a major variable changes: hiring a new full-time employee, signing a new office lease, launching a new product line, or changing your pricing. For stable businesses, an annual audit is sufficient."
        },
        {
            q: "Can my break-even point be negative?",
            a: "No. If your formula outputs a negative number, it mathematically means your variable costs are higher than your sale price. You are losing money on the unit economics of every single sale, and you will never break even."
        },
        {
            q: "What happens after breaking even?",
            a: "Once you surpass your break-even point, you enter 'the zone of profit.' Because your fixed costs are already paid for the month, the entire contribution margin of every subsequent sale drops straight to your bottom line, causing profits to accelerate rapidly."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'How to Calculate Your Break-Even Point',
                description: 'The definitive guide to break-even analysis, fixed vs variable costs, and how to price your products for profitability.',
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
                <span style={{ color: 'var(--text-primary)' }}>Calculate Break-Even Point</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    How to Calculate Your Break-Even Point: Formulas & Mistakes
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    The break-even point is the exact moment your business stops bleeding cash and starts generating profit. If you don't know this number, you are flying blind. Here is how to lock down your unit economics.
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
                    <li><a href="#what-it-means" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. What Does Break-Even Mean?</a></li>
                    <li><a href="#fixed-vs-variable" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Fixed vs. Variable Costs</a></li>
                    <li><a href="#formula" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. The Break-Even Formula Explained</a></li>
                    <li><a href="#examples" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Real-World Calculation Examples</a></li>
                    <li><a href="#mistakes" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Common Pricing Mistakes</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>6. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="what-it-means" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. What Does Break-Even Mean?</h2>
                    <p>
                        In accounting, the break-even point is the production level where total revenues equal total expenses. Simply put: it’s the exact target you need to hit so you don't lose money, but you haven't made any profit yet either.
                    </p>
                    <p>
                        Knowing this number is the foundation of your pricing strategy. If your break-even point is 100 units a month, but your total market size in your ZIP code is only 50 people, your business model is geographically impossible. You must either raise prices or lower fixed costs. Use our <Link href="/tools/break-even-calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Break-Even Calculator</Link> to bypass the manual math and visualize your profitability timeline.
                    </p>
                    <p>
                        There are two formats for break-even: "Break-Even in Units" (how many items you need to sell) and "Break-Even in Sales Dollars" (the revenue needed).
                    </p>
                </section>

                <section id="fixed-vs-variable" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Fixed vs. Variable Costs</h2>
                    <p>
                        The number one reason founders miscalculate this metric is a failure to properly classify their expenses. You must split your costs into two rigid categories: Fixed and Variable.
                    </p>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Fixed Costs (The Overhead)</h3>
                    <p>
                        Fixed costs stay the same regardless of whether you sell zero units or a million units. You owe these bills every month, no matter what.
                    </p>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                        <li><strong>Rent / Office Space</strong></li>
                        <li><strong>Full-time Employee Salaries</strong> (not commissions)</li>
                        <li><strong>Software Subscriptions</strong> (AWS bases, CRM, web hosting)</li>
                        <li><strong>Insurance and Legal Fees</strong></li>
                    </ul>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Variable Costs (The COGS)</h3>
                    <p>
                        Variable costs increase proportionally with every single unit you sell. If you don't sell a unit, you don't incur this cost.
                    </p>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                        <li><strong>Raw Materials or Manufacturing Costs</strong></li>
                        <li><strong>Shipping and Fulfillment Fees</strong></li>
                        <li><strong>Payment Gateway Fees</strong> (Stripe's 2.9% + 30¢)</li>
                        <li><strong>Sales Commissions</strong></li>
                    </ul>
                </section>

                <section id="formula" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. The Break-Even Formula Explained</h2>
                    <p>
                        Once your costs are segmented, the math is straightforward. First, you need to find your "Contribution Margin."
                    </p>
                    
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', margin: '2rem 0', fontFamily: 'monospace', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        Contribution Margin = Selling Price per Unit – Variable Cost per Unit
                    </div>

                    <p>
                        The Contribution Margin is the amount of money from every sale that "contributes" directly to paying down your fixed overhead. Once overhead is covered, it contributes directly to profit.
                    </p>

                    <p>
                        Now, divide your total fixed costs by that contribution margin:
                    </p>

                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', margin: '2rem 0', fontFamily: 'monospace', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        Break-Even (Units) = Total Fixed Costs ÷ Contribution Margin
                    </div>
                </section>

                <section id="examples" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Real-World Calculation Examples</h2>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Example 1: The Artisan Coffee Shop</h3>
                    <p>
                        Imagine opening a small coffee roaster.
                    </p>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                        <li><strong>Fixed Costs:</strong> Rent ($4k), Manager Salary ($4k), Equipment Lease ($2k). Total Fixed Costs = $10,000 / month.</li>
                        <li><strong>Variable Costs:</strong> Wholesale coffee beans, cups, lids, and milk cost $1.50 per cup.</li>
                        <li><strong>Selling Price:</strong> You charge $5.00 for a latte.</li>
                    </ul>
                    <p>
                        <strong>Contribution Margin:</strong> $5.00 - $1.50 = $3.50. Every time they sell a latte, they have $3.50 to put toward the rent.
                    </p>
                    <p>
                        <strong>Break-Even Units:</strong> $10,000 ÷ $3.50 = 2,857 lattes.
                    </p>
                    <p>
                        To not go bankrupt, this shop must sell 2,857 lattes a month (about 95 lattes a day). Latte number 2,858 is sheer profit.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Example 2: The B2B Software Subscription (SaaS)</h3>
                    <p>
                        Software has notoriously low variable costs, which is why VCs love it.
                    </p>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                        <li><strong>Fixed Costs:</strong> Developer team ($50k), Office ($5k), Base AWS Architecture ($5k). Total Fixed Costs = $60,000 / month.</li>
                        <li><strong>Variable Costs:</strong> Onboarding support, Stripe fees, and incremental server usage: $10 per account.</li>
                        <li><strong>Selling Price:</strong> $99 / month subscription.</li>
                    </ul>
                    <p>
                        <strong>Contribution Margin:</strong> $99.00 - $10.00 = $89.00.
                    </p>
                    <p>
                        <strong>Break-Even Units:</strong> $60,000 ÷ $89.00 = 674 active subscribers.
                    </p>

                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', marginTop: '2rem' }}>
                        <p style={{ margin: 0 }}>To run these scenarios dynamically with sliders, use our <Link href="/tools/break-even-calculator" style={{ color: 'var(--accent-primary)' }}>Free Break-Even Calculator</Link>.</p>
                    </div>
                </section>

                <section id="mistakes" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>5. Common Pricing Mistakes</h2>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. The "Cost-Plus" Trap</h3>
                    <p>
                        Many founders simply calculate their variable cost and add a 20% markup. If a t-shirt costs $10 to make, they sell it for $12. This leaves a tiny $2 contribution margin. If their fixed costs are $5,000 a month, they need to sell 2,500 shirts just to break even! Cost-plus pricing ignores customer willingness to pay and often traps businesses in volume-dependent nightmares.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Forgetting Hidden Variable Costs</h3>
                    <p>
                        Founders often forget merchant processing fees (roughly 3%). If you sell a high-ticket item for $2,000, Stripe takes $60. If your margin was already thin, that hidden $60 variable cost can destroy your profitability model.
                    </p>

                    <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Run Your Numbers Now</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Input your fixed costs, variable costs, and target price to instantly generate your break-even chart and profitability timelines.</p>
                        <Link href="/tools/break-even-calculator" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Launch Break-Even Calculator</Link>
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
                     <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Pricing & Financial Guides</h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <li><Link href="/guides/pricing-strategy-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The Pricing Strategy Hub</Link></li>
                         <li><Link href="/guides/business-calculators" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The Business Calculators Hub</Link></li>
                     </ul>
                </section>

            </article>
        </div>
    );
}
