import Link from 'next/link';
import { toolsRegistry } from '@/lib/toolsRegistry';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'Strategic Decision Tools for Builders & Founders',
  description: 'Data-driven tools to validate, calculate, and execute smarter business decisions. Free advanced calculators for freelancers, SaaS founders, and creators.',
  path: '/',
  keywords: ['business decision tools', 'startup validation tools', 'pricing calculator for founders', 'decision making tools online', 'business strategy calculators', 'free strategy tools'],
});

export default function Home() {
  const featuredTools = toolsRegistry.filter(t => t.featured).slice(0, 6);

  const faqs = [
    {
      q: "Are these tools really free to use?",
      a: "Yes, 100% free. We built ToolStrategyHub as a resource we wished we had when scaling our own companies. No paywalls, no hidden fees."
    },
    {
      q: "Do I need to create an account?",
      a: "No account is required. Our tools process logic directly in your browser, enabling instant analysis without you giving up personal data."
    },
    {
      q: "Can I trust the financial calculations?",
      a: "Our calculators use rigorous, standard financial formulas (such as fully burdened rate calculations and multi-variable SaaS margin equations). We encourage you to review the methodologies described on each tool's page."
    },
    {
      q: "Who is ToolStrategyHub for?",
      a: "Our platform is designed for founders, startup teams, agency owners, freelancers, and strategy professionals making high-stakes decisions."
    },
    {
      q: "How does the Startup Idea Validator work?",
      a: "It weighs variables like market urgency, willingness to pay, your distribution advantage, and competition scaling, rendering a deterministic risk score rather than emotional validation."
    },
    {
      q: "Where is my data stored?",
      a: "Nowhere. All calculations are executed via client-side JavaScript on your device. We do not transmit or store your inputted financial or strategy data."
    },
    {
      q: "How often are new tools added?",
      a: "We actively develop and launch new tools and calculators monthly, based on the evolving needs of modern digital businesses."
    },
    {
      q: "Can I request a specific tool?",
      a: "We prioritize tools that solve complex, multi-variable problems for builders. Check our guides for deep dives into how we construct these solutions."
    },
  ];

  // Schema for the homepage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolStrategyHub",
    "url": "https://toolstrategyhub.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://toolstrategyhub.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container" style={{ padding: '6rem 2rem' }}>

        {/* 1. HERO SECTION */}
        <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '6rem' }}>
          <div className="pill" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--accent-muted)', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', fontWeight: 'bold' }}>
            Data-Backed Confidence
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Strategic Decision Tools for Builders & Founders
          </h1>
          <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
            Data-driven tools to validate, calculate, and execute smarter business decisions. Stop guessing, start measuring.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tools" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Explore All Tools</Link>
          </div>
        </header>



        {/* 3. FEATURED TOOLS GRID */}
        <section id="featured-tools" className="stagger-3" style={{ marginBottom: '8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Most Important Tools</h2>
            <div style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>01</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {featuredTools.map((tool, idx) => (
              <Link href={`/tools/${tool.slug}`} key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
                <span className="pill" style={{ alignSelf: 'flex-start', marginBottom: '1rem', zIndex: 2 }}>{tool.category}</span>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', zIndex: 2 }}>{tool.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, zIndex: 2, flexGrow: 1 }}>
                  {tool.description}
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontWeight: 'bold', fontFamily: 'var(--font-mono)', zIndex: 2 }}>
                  Launch Tool <span>→</span>
                </div>
                {/* Subtle background icon/blur effect */}
                <div style={{ position: 'absolute', right: '-20%', bottom: '-20%', width: '200px', height: '200px', background: 'var(--accent-muted)', filter: 'blur(50px)', borderRadius: '50%', zIndex: 1, opacity: 0.5 }}></div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/tools" className="btn btn-secondary" style={{ padding: '1rem 3rem', fontSize: '1.125rem', border: '1px solid var(--accent-primary)', backgroundColor: 'transparent', color: 'var(--accent-primary)' }}>
              Explore All 70+ Tools →
            </Link>
          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION */}
        <section className="stagger-4" style={{ marginBottom: '8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '2.5rem', margin: 0 }}>How It Works</h2>
            <div style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>02</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-primary)', opacity: 0.5 }}>1.</div>
              <h3 style={{ fontSize: '1.5rem' }}>Define Your Scenario</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Identify the business challenge you're facing—whether testing a startup idea, calculating required profit margins, or budgeting a large software project.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-primary)', opacity: 0.5 }}>2.</div>
              <h3 style={{ fontSize: '1.5rem' }}>Analyze With Tools</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Input your variables into our specialized algorithms. All calculations happen instantly on your device, ensuring total privacy and extreme speed.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-primary)', opacity: 0.5 }}>3.</div>
              <h3 style={{ fontSize: '1.5rem' }}>Make Confident Decisions</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Receive a rigorous, mathematically supported conclusion. Eliminate guesswork, increase your win rates, and confidently execute your strategy.</p>
            </div>
          </div>
        </section>

        {/* 5. MOST USED CATEGORIES (Hub Links) */}
        <section className="stagger-1" style={{ marginBottom: '8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Strategy Categories</h2>
            <div style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>03</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {["Idea Validation", "Financial Planning", "Project Execution", "Research & Discovery"].map((category, idx) => (
              <Link href="#" key={idx} className="category-card" style={{ padding: '2rem 1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}
              >
                <h3 style={{ fontSize: '1.25rem', transition: 'color 0.2s' }}>{category}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* 7. FAQ SECTION */}
        <section className="stagger-2" style={{ marginBottom: '8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Frequently Asked Questions</h2>
            <div style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>04</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{faq.q}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>



        {/* 8. FINAL CTA SECTION */}
        <section className="stagger-4" style={{ textAlign: 'center', margin: '4rem auto 0', padding: '5rem 2rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-focus)' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Start Making Smarter Decisions Today.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Join thousands of founders and professionals utilizing our intelligent algorithms to construct superior business models.
          </p>
          <Link href="/tools" className="btn" style={{ padding: '1.25rem 3rem', fontSize: '1.25rem' }}>Explore All Tools</Link>
        </section>

      </div>
    </>
  );
}
