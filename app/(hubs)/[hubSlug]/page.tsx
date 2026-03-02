import { toolsRegistry } from '@/lib/toolsRegistry';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

const HUB_MAPPING: Record<string, { category: string[], title: string, keyword: string, description: string, overview: string }> = {
    'startup-tools': {
        category: ['Idea Validation', 'Strategy'],
        title: 'Startup Validation Tools & Strategy Calculators',
        keyword: 'startup tools',
        description: 'Explore our collection of free startup tools for validating ideas, testing product-market fit, and running strategic scenario matrices.',
        overview: 'Building a successful startup requires confronting extreme uncertainty. These calculators replace subjective founder intuition with rigorous, data-driven mathematical models. From determining your MVP scope to calculating if you have achieved product-market fit, use these frameworks to test hypotheses before burning your capital.'
    },
    'pricing-tools': {
        category: ['Money & Pricing'],
        title: 'Business Pricing Calculators & Revenue Models',
        keyword: 'pricing tools',
        description: 'Free pricing tools for SaaS founders, freelancers, and agencies. Calculate break-even points, SaaS margins, and psychological pricing tiers.',
        overview: 'Pricing is the single most important lever in your business. Most operators underprice their services because they fail to account for invisible overhead, unbillable hours, and risk padding. These financial tools help you design fixed-bid models, recurring revenue engines, and high-margin pricing structures.'
    },
    'operations-tools': {
        category: ['Operations', 'Productivity'],
        title: 'Operations & Workflow Productivity Tools',
        keyword: 'operations tools',
        description: 'Scale your team execution. Discover calculators for project timeline estimation, capacity planning, and automation ROI.',
        overview: 'Execution risk often destroys perfectly good businesses. When scaling a team or an agency, you must protect your delivery timelines against scope creep and burnout. Our operational tools calculate realistic throughput metrics, budget contingencies, and the true cost of manual workflows.'
    },
    'creator-tools': {
        category: ['Creators'],
        title: 'Creator Economy Tools & Audience Calculators',
        keyword: 'creator tools',
        description: 'Build your audience intelligently. Project newsletter growth, calculate monetization funnels, and plan content ROI.',
        overview: 'Attention is a commodity, but converting it into a sustainable lifestyle business requires structural planning. Creators often burn out due to misaligned monetization expectations. These calculators simulate audience growth velocity, allowing you to select the highest-leverage business model for your unique niche.'
    },
    'research-tools': {
        category: ['Research'],
        title: 'Market Research & Gap Analysis Tools',
        keyword: 'research tools',
        description: 'Analyze competitors, discover reddit pain points, and quantify niche saturation with our deep-dive research tools.',
        overview: 'Data is abundant, but actionable signal is rare. Instead of running expensive focus groups, these analytical frameworks help you scrape public sentiment, measure incumbent weaknesses, and score market gaps deterministically. Research smarter, not harder.'
    }
};

export function generateMetadata({ params }: { params: { hubSlug: string } }) {
    const hub = HUB_MAPPING[params.hubSlug];
    if (!hub) return {};

    return generatePageMetadata({
        title: `${hub.title} | ToolStrategyHub`,
        description: hub.description,
        path: `/${params.hubSlug}`,
        keywords: [hub.keyword, `${hub.keyword} free`, 'business calculators', 'strategy tools']
    });
}

export default function HubPage({ params }: { params: { hubSlug: string } }) {
    const hub = HUB_MAPPING[params.hubSlug];
    if (!hub) {
        notFound();
    }

    const hubTools = toolsRegistry.filter(t => hub.category.includes(t.category));

    // Internal link architecture
    const relatedLinks = Object.keys(HUB_MAPPING).filter(k => k !== params.hubSlug);

    const faqs = [
        { q: `What are the best ${hub.keyword} on this platform?`, a: `We recommend starting with our most popular calculators located at the top of the grid. They solve the most foundational problems in this category.` },
        { q: `Are these ${hub.keyword} free to use?`, a: `Yes, 100% free. No paywalls, no gated data.` },
        { q: `How do I know the data is accurate?`, a: "Calculations run via pure mathematical algorithms executing client-side on your device. We use standard economic, heuristic, and operational formulas." },
        { q: "Where does my inputted data go?", a: "Nowhere. It remains inside your active browser session and is never uploaded to our servers, ensuring your business strategy remains extremely private." },
        { q: "Do I need to sign up?", a: "No. Immediate value, zero friction. Start calculating." },
        { q: "Can I embed these tools?", a: "Currently, we do not offer iFrame embedding, but you are welcome to bookmark them for daily operational use." },
        { q: `Who builds these ${hub.keyword}?`, a: "Senior product architects and financial operators who recognized the danger of subjective 'gut feeling' business execution." },
        { q: "How often are they updated?", a: "Weekly. Check back frequently for algorithm improvements and new decision matrices." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": hub.title,
                "description": hub.description,
                "url": `https://toolstrategyhub.com/${params.hubSlug}`
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a
                    }
                }))
            }
        ]
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <Link href="/tools" style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to All Tools
                </Link>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    {hub.title}
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                    {hub.overview}
                </p>
            </header>

            {/* Table of Contents for SEO Structure */}
            <div className="stagger-2" style={{ maxWidth: '800px', margin: '0 auto 4rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>Directory Contents</h2>
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
                    <li><a href="#tool-grid" style={{ color: 'var(--accent-primary)' }}>1. Access {hubTools.length} Strategic Tools</a></li>
                    <li><a href="#understanding-category" style={{ color: 'var(--accent-primary)' }}>2. Tactical Implementation</a></li>
                    <li><a href="#related-hubs" style={{ color: 'var(--accent-primary)' }}>3. Explore Adjacent Frameworks</a></li>
                    <li><a href="#faqs" style={{ color: 'var(--accent-primary)' }}>4. Frequently Asked Questions</a></li>
                </ul>
            </div>

            <section id="tool-grid" className="stagger-3" style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {hubTools.sort((a, b) => b.popularityScore - a.popularityScore).map(tool => (
                        <Link href={`/tools/${tool.slug}`} key={tool.slug} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', transition: 'transform 0.2s', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                            <span className="pill" style={{ alignSelf: 'flex-start', marginBottom: '1rem', fontSize: '0.7rem' }}>{tool.category}</span>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{tool.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, flexGrow: 1 }}>
                                {tool.description}
                            </p>
                            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 'bold' }}>
                                Launch Calculator <span>→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section id="understanding-category" className="stagger-4" style={{ maxWidth: '900px', margin: '0 auto 6rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>How to Implement {hub.title}</h2>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p>Executing without data is equivalent to gambling. When attempting to scale, the variables are too complex to map mentally. The tools curated in our <strong>{hub.title}</strong> ecosystem operate as deterministic safety nets.</p>
                    <p>Every calculator acts as a framework. First, you must identify the primary bottleneck (e.g., pricing, validation, operations). Next, isolate your variables—such as fixed costs and estimated churn. Running these variables through our client-side models provides a rigid, bias-free conclusion.</p>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>Use Cases & Deployment</h3>
                    <p>Founders use these matrices in pitch decks. Freelancers run them before answering client RFPs. Creators test niches before purchasing equipment. By utilizing our <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Decision Hub</Link>, you elevate yourself from an emotional operator to a strategic architect.</p>

                    <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>Data-Driven Precision</h3>
                    <p>Remember, garbage in equals garbage out. You must be brutally honest when utilizing {hubTools[0]?.name || 'these algorithms'}. Do not artificially lower your estimated costs just to make the math look favorable.</p>
                </div>
            </section>

            <section id="faqs" className="stagger-4" style={{ maxWidth: '900px', margin: '0 auto 6rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, idx) => (
                        <details key={idx} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                            <summary style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}>
                                {faq.q}
                            </summary>
                            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </section>

            <section id="related-hubs" className="stagger-4" style={{ maxWidth: '900px', margin: '0 auto 4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Internal Network Graph</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                    {relatedLinks.map(link => (
                        <Link href={`/${link}`} key={link} className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)' }}>
                            {HUB_MAPPING[link].title}
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
}
