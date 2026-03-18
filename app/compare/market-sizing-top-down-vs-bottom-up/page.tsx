import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Top-Down vs Bottom-Up Market Sizing: Which is Better? | ToolStrategyHub',
    description: 'Compare Top-Down vs Bottom-Up market sizing. Learn why investors hate Top-Down, how to build an accurate Bottom-Up model, and see real calculation examples.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/compare/market-sizing-top-down-vs-bottom-up',
    }
}

export default function MarketSizingCompare() {
    const faqs = [
        {
            q: "Why do investors generally dislike Top-Down market sizing?",
            a: "Investors dislike Top-Down sizing because it relies on grand, unverifiable assumptions (e.g., 'If we capture just 1% of a $100 billion market...'). It demonstrates a lack of understanding regarding the actual operational mechanics required to acquire a single customer."
        },
        {
            q: "Can I use both methods in my pitch deck?",
            a: "Yes. Many founders use a Top-Down approach on an early slide to establish that the macro market is massive and growing, followed immediately by a rigorous Bottom-Up analysis to prove they have a mathematically sound go-to-market strategy to capture their slice."
        },
        {
            q: "What defines the Total Addressable Market (TAM)?",
            a: "TAM is the total revenue opportunity if a business achieved 100% market share in a specific sector. It assumes infinite capital and zero competition, serving mainly as an indicator of the theoretical ceiling of an industry."
        },
        {
            q: "How do I do Bottom-Up sizing if I don't have historical sales data?",
            a: "If you pre-launch, use industry benchmarks for conversion rates and ad costs. Estimate your marketing budget, divide by typical platform CAC, and multiply by your planned subscription price. It won't be perfect, but the logic will be sound."
        },
        {
            q: "What is SAM vs SOM?",
            a: "Serviceable Available Market (SAM) is the segment of the TAM within your geographical and logistical reach. Serviceable Obtainable Market (SOM) is the hyper-realistic slice of the SAM you can actually capture given your current funding, team, and competitors."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'Top-Down vs Bottom-Up Market Sizing',
                description: 'A detailed explanation of how to accurately estimate market size using both Top-Down and Bottom-Up models.',
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
                <Link href="/" style={{ color: 'var, --accent-primary)' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/compare" style={{ color: 'var(--accent-primary)' }}>Comparisons</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>Market Sizing Methods</span>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Top-Down vs Bottom-Up Market Sizing
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    There are two ways to estimate the size of a market. One makes you look like a visionary who hasn't done the work; the other makes you look like an operational sniper ready for capital. You must master both.
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
                    <li><a href="#top-down" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>1. Top-Down Market Sizing Explained</a></li>
                    <li><a href="#bottom-up" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>2. Bottom-Up Market Sizing Explained</a></li>
                    <li><a href="#comparison" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>3. Accuracy and Investor Perspective</a></li>
                    <li><a href="#examples" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>4. Example Calculations</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>5. Frequently Asked Questions</a></li>
                </ul>
            </nav>

            <article style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                
                <section id="top-down" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>1. Top-Down Explained: The Optimist's View</h2>
                    <p>
                        Top-Down market sizing starts by looking at the largest possible macro-economic figure (usually pulled from a Gartner or Forrester research report) and slicing it down into a smaller, assumed percentage that your startup "could reasonably capture."
                    </p>
                    <p>
                        The logic usually sounds like this: "According to Forbes, the global pet care market is $200 Billion. If our new dog walking app captures just a conservative 1% of that market, we will be a $2 Billion dollar company overnight."
                    </p>
                    <p>
                        This approach requires zero original data. It is entirely theoretical.
                    </p>
                    <p>Run your own Top Down assumptions in our <Link href="/tools/market-size-estimator" style={{ color: 'var(--accent-primary)' }}>Market Size Estimator</Link>.</p>
                </section>

                <section id="bottom-up" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>2. Bottom-Up Explained: The Operator's View</h2>
                    <p>
                        Bottom-Up market sizing starts from the absolute ground floor: your product and a single customer. You calculate your market size by multiplying the total number of perfectly addressable customers by the exact price you intend to charge them.
                    </p>
                    <p>
                        The logic sounds like this: "There are 5,000 independent pediatric dentist clinics in the United States. We sell our specialized scheduling software for $200 a month ($2,400/yr). If we acquire 100% of those clinics, our absolute maximum revenue is $12 Million per year."
                    </p>
                    <p>
                        This approach requires intimate knowledge of your customer base and strict unit economic models. It reveals the harsh realities of niche markets.
                    </p>
                </section>

                <section id="comparison" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>3. Accuracy and Investor Perspective</h2>
                    <p>
                        To put it bluntly, sophisticated investors hate pure Top-Down market sizing. It is the hallmark of an amateur pitch deck. Assuming you can capture "1%" of a massive global market sounds conservative, but 1% of China's population is 14 million people. Acquiring 14 million people is astronomically difficult.
                    </p>
                    <p>
                        Bottom-Up sizing proves to an investor that you understand your sales funnel. It shows you know exactly who the buyer is, exactly how many of them exist, and exactly what they are willing to pay. However, Bottom-Up often results in much smaller, scarier numbers.
                    </p>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>The Solution: Combining Them</h3>
                    <p>
                        The best founders use both. They use a Top-Down metric to prove they are operating in a fast-growing, multi-billion dollar sector (which VCs require for venture-scale returns). Then, they use a rigorous Bottom-Up model to prove how they will acquire their first $10M in revenue.
                    </p>
                </section>

                <section id="examples" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>4. Example Calculations</h2>
                    
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Top-Down Example for a CRM</h3>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                        <li><strong>TAM:</strong> The global CRM software market is $60 Billion.</li>
                        <li><strong>SAM:</strong> The US market accounts for roughly 40% ($24 Billion).</li>
                        <li><strong>SOM:</strong> We are targeting small medical practices in the US, which comprises roughly 5% of US businesses ($1.2 Billion).</li>
                        <li><strong>Conclusion:</strong> We are targeting a $1.2B market.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Bottom-Up Example for the same CRM</h3>
                    <ul style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                        <li><strong>ACV:</strong> We charge $1,000 per year per practice.</li>
                        <li><strong>Target Accounts:</strong> There are 250,000 small medical practices in the US.</li>
                        <li><strong>Sales Capacity:</strong> Our 5 sales reps can each close 4 deals a month (240 deals a year).</li>
                        <li><strong>Conclusion:</strong> Unconstrained TAM is $250 Million ($1k x 250,000). But our realistic SOM for Year 1 is only $240,000 based on our sales velocity.</li>
                    </ul>

                    <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Calculate Your TAM, SAM & SOM</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Are you pitching a unicorn or a lifestyle business? Run the math.</p>
                        <Link href="/tools/market-size-estimator" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Launch Market Size Estimator</Link>
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
                     <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Related Market Research Guides</h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <li><Link href="/guides/market-research-tools" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>The Market Research Tools Hub</Link></li>
                     </ul>
                </section>

            </article>
        </div>
    );
}
