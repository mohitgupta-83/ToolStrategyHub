import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo';
import { resolveAiResource, getAllAiResourceSlugs } from '@/lib/aiSeoRegistry';
import { 
  TokenConverterWidget, 
  LlmPricingMatrixWidget, 
  ContextLimitChartWidget, 
  GpuSpecRecommenderWidget 
} from '@/components/ResourceWidgets';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────
// METADATA & STATIC PARAMS
// ─────────────────────────────────────────────────────────────────
export function generateMetadata({ params }: { params: { slug: string } }) {
  const resource = resolveAiResource(params.slug);
  if (!resource) return {};

  return generatePageMetadata({
    title: `${resource.title} | ToolStrategyHub`,
    description: resource.metaDescription,
    path: `/resources/${params.slug}`,
    keywords: [resource.pill.toLowerCase(), `${resource.pill.toLowerCase()} spec sheet`, 'developer resources'],
  });
}

export function generateStaticParams() {
  return getAllAiResourceSlugs().map((slug) => ({ slug }));
}

// ─────────────────────────────────────────────────────────────────
// SERVER COMPONENT PAGE
// ─────────────────────────────────────────────────────────────────
export default function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = resolveAiResource(params.slug);
  if (!resource) {
    notFound();
  }

  // Determine which interactive widget to embed
  const renderWidget = () => {
    const slug = resource.slug;
    if (slug === 'token-conversion-chart' || slug === 'token-pricing-reference') {
      return <TokenConverterWidget />;
    }
    if (slug === 'llm-pricing-database' || slug === 'ai-api-cost-benchmarks') {
      return <LlmPricingMatrixWidget />;
    }
    if (slug === 'context-window-reference' || slug === 'context-limit-chart') {
      return <ContextLimitChartWidget />;
    }
    if (slug === 'model-hardware-requirements' || slug === 'llm-gpu-comparison-table') {
      return <GpuSpecRecommenderWidget />;
    }
    return null;
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://toolstrategyhub.com/resources/${resource.slug}`,
        name: resource.h1,
        description: resource.metaDescription,
      },
      {
        '@type': 'FAQPage',
        mainEntity: resource.faqs.map(faq => ({
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
        <span style={{ color: 'var(--text-primary)' }}>Developer Resources</span>
        <span style={{ margin: '0 0.5rem' }}>/</span>
        <span style={{ color: 'var(--text-secondary)' }}>{resource.h1.slice(0, 30)}...</span>
      </nav>

      <header className="stagger-1" style={{ marginBottom: '4rem' }}>
        <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block', backgroundColor: 'var(--accent-muted)', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}>
          {resource.pill}
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          {resource.h1}
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
          {resource.intro}
        </p>
      </header>

      {/* Embedding Interactive Widget */}
      <div className="stagger-2">
        {renderWidget()}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '4rem', alignItems: 'start', marginTop: '3rem' }}>
        <article className="stagger-3" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          {resource.sections.map((section, idx) => (
            <section key={idx}>
              <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>{section.heading}</h2>
              <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>{section.body}</p>
            </section>
          ))}

          {/* FAQ Section */}
          <section id="faqs" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {resource.faqs.map((faq, idx) => (
                <details key={idx} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                  <summary style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}>
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

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Related Calculator</h3>
            <Link href={`/ai-tools/${resource.targetToolSlug}`} className="btn" style={{ padding: '0.75rem', width: '100%', textAlign: 'center', display: 'block' }}>
              Launch {resource.targetToolName}
            </Link>
          </div>
          {resource.relatedSlugs && resource.relatedSlugs.length > 0 && (
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>Related Guides</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {resource.relatedSlugs.map((slug) => (
                  <li key={slug}>
                    <Link href={`/guides/${slug}`} style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', textDecoration: 'underline' }}>
                      {slug.replace(/-/g, ' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
