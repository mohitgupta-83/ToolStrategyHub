import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best Free LLM APIs for Developers (2026): Models, Limits & API Keys',
    description: 'Compare free LLM APIs for developers. Explore available models, rate limits, API key requirements, credit card requirements and free-tier restrictions. Updated November 2026.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/best-free-llm-apis',
    },
};

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const providers = [
    {
        name: 'Google AI Studio',
        badge: 'No Credit Card',
        badgeColor: 'var(--accent-primary)',
        bestFor: 'High context window, multimodal apps (text + images + audio)',
        models: ['Gemini 2.0 Flash', 'Gemini 2.0 Flash-Lite', 'Gemini 1.5 Pro'],
        rpm: '15',
        rpd: '1,500',
        context: '1M tokens',
        creditCard: 'Not required',
        openAICompat: false,
        dataTraining: true,
        limitation: 'On the free tier, Google may use your prompts to improve its models. Not suitable for private or business data.',
        url: 'https://aistudio.google.com',
    },
    {
        name: 'Groq Cloud',
        badge: 'Recommended',
        badgeColor: 'var(--accent-primary)',
        bestFor: 'Real-time apps, AI agents, OpenAI SDK drop-in replacement',
        models: ['Llama 3.3 70B', 'Gemma 2 9B', 'DeepSeek R1 Distill'],
        rpm: '30',
        rpd: '14,400',
        context: '128K tokens',
        creditCard: 'Not required',
        openAICompat: true,
        dataTraining: false,
        limitation: 'Free tier is suitable for development but rate limits are strict. Not for sustained production traffic.',
        url: 'https://console.groq.com',
    },
    {
        name: 'OpenRouter',
        badge: 'Most Model Variety',
        badgeColor: 'var(--text-secondary)',
        bestFor: 'Testing multiple models with one API key, dynamic model routing',
        models: ['Llama 3.3 70B', 'Gemma 3 27B', 'Mistral 7B Instruct'],
        rpm: '20',
        rpd: '200',
        context: 'Varies by model',
        creditCard: 'Not required',
        openAICompat: true,
        dataTraining: false,
        limitation: 'Daily request limit is low (200/day). Privacy policies vary by model — check per-model terms on openrouter.ai.',
        url: 'https://openrouter.ai',
    },
    {
        name: 'GitHub Models',
        badge: 'Premium Models Free',
        badgeColor: 'var(--text-secondary)',
        bestFor: 'Developers already in the GitHub ecosystem, prototyping only',
        models: ['GPT-4o', 'Llama 3.3 70B', 'Phi-4', 'Claude 3.5 Sonnet'],
        rpm: '~10',
        rpd: '~150',
        context: 'Varies by model',
        creditCard: 'GitHub account only',
        openAICompat: true,
        dataTraining: false,
        limitation: 'Strictly for prototyping — not production. Rate limits are very low. Copilot subscribers get higher quotas.',
        url: 'https://github.com/marketplace/models',
    },
    {
        name: 'Mistral La Plateforme',
        badge: 'OpenAI-Compatible',
        badgeColor: 'var(--text-secondary)',
        bestFor: 'European deployments, code generation, structured outputs',
        models: ['Mistral Small 3.1', 'Codestral', 'Mistral Nemo'],
        rpm: '1/sec',
        rpd: 'Generous',
        context: '128K tokens',
        creditCard: 'Not required',
        openAICompat: true,
        dataTraining: false,
        limitation: 'Lower RPM than Groq. The experiment tier is for non-commercial development use.',
        url: 'https://console.mistral.ai',
    },
    {
        name: 'Hugging Face Inference',
        badge: 'Widest Model Catalog',
        badgeColor: 'var(--text-secondary)',
        bestFor: 'Experimenting with niche and research models not available elsewhere',
        models: ['Various models under 10GB'],
        rpm: 'Varies',
        rpd: 'Varies',
        context: 'Varies',
        creditCard: 'Not required',
        openAICompat: false,
        dataTraining: false,
        limitation: 'Inference speeds vary widely by model and server load. Limited free quota (\$0.10/month in credits).',
        url: 'https://huggingface.co/docs/inference-providers',
    },
];

const decisionFramework = [
    { need: 'OpenAI SDK compatibility (drop-in replacement)', pick: 'Groq Cloud or OpenRouter' },
    { need: 'Longest context window (up to 1M tokens)', pick: 'Google AI Studio' },
    { need: 'Fastest generation speed (200+ tokens/sec)', pick: 'Groq Cloud' },
    { need: 'Access to the most models in one place', pick: 'OpenRouter' },
    { need: 'Privacy — prompts not used for training', pick: 'Groq Cloud, GitHub Models, or Mistral' },
    { need: 'Just exploring — no setup preference', pick: 'GitHub Models or OpenRouter' },
    { need: 'Multimodal apps (images, audio, video)', pick: 'Google AI Studio' },
    { need: 'European data residency requirements', pick: 'Mistral La Plateforme' },
];

const rateLimitTerms = [
    {
        term: 'RPM',
        full: 'Requests Per Minute',
        explanation: 'How many API calls you can make per minute. Exceeding this returns a 429 error. Always implement exponential backoff retry logic to handle this gracefully.',
    },
    {
        term: 'TPM',
        full: 'Tokens Per Minute',
        explanation: 'Total tokens (input + output combined) processed across all your requests per minute. For agents making many sequential calls, TPM is often the binding constraint.',
    },
    {
        term: 'RPD',
        full: 'Requests Per Day',
        explanation: 'Hard daily cap. Once hit, API calls fail until midnight UTC resets the counter. For batch processing, RPD is typically the bottleneck.',
    },
    {
        term: 'Context',
        full: 'Context Window',
        explanation: 'Maximum tokens a single request can contain — input plus output combined. Groq supports 128K; Google AI Studio supports up to 1M tokens on Gemini 2.0 Flash.',
    },
];

const faqs = [
    {
        q: 'Which free LLM API does not require a credit card?',
        a: 'Google AI Studio, Groq Cloud, OpenRouter, and Mistral La Plateforme all offer free developer access with no credit card required. You only need to create an account.',
    },
    {
        q: 'Can I use a free LLM API for production?',
        a: "Free tiers are generally not suitable for production. They have strict rate limits, no SLA guarantees, and on some platforms (like Google AI Studio's free tier), your prompts may be used for model training. For production, upgrade to a paid tier or use a cheap paid provider like Gemini 2.0 Flash paid ($0.075/MTok input).",
    },
    {
        q: 'What is the best free LLM API for developers overall?',
        a: 'For most developers, Groq Cloud is the top recommendation. It offers Llama 3.3 70B for free, is fully OpenAI-compatible (easy SDK migration), does not train on your prompts, and delivers extremely fast generation speeds above 200 tokens per second.',
    },
    {
        q: 'What is the difference between a free tier and trial credits?',
        a: 'A permanent free tier gives you ongoing access with rate limits that never expire — for example, Google AI Studio and Groq. Trial credits are a one-time spending allocation (e.g. $5–$20) that expires, after which you must enter payment details to continue. Trial credits are not a sustainable free tier.',
    },
    {
        q: 'Is the OpenAI API free?',
        a: 'OpenAI does not offer a permanent free tier. New accounts receive a small credit allocation that expires. For free LLM access, use alternatives like Groq Cloud (Llama 3.3 70B, free) or GitHub Models (requires a GitHub account).',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            headline: 'Best Free LLM APIs for Developers (2026): Models, Limits & API Keys',
            description: 'Compare free LLM APIs for developers. Explore available models, rate limits, API key requirements, credit card requirements and free-tier restrictions.',
            author: { '@type': 'Organization', name: 'ToolStrategyHub' },
            dateModified: '2026-11-02',
            mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://toolstrategyhub.com/guides/best-free-llm-apis' },
        },
        {
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolstrategyhub.com/' },
                { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://toolstrategyhub.com/blog' },
                { '@type': 'ListItem', position: 3, name: 'Best Free LLM APIs', item: 'https://toolstrategyhub.com/guides/best-free-llm-apis' },
            ],
        },
    ],
};

// ─────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────
export default function BestFreeLLMAPIsPage() {
    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '1060px', margin: '0 auto' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Breadcrumb */}
            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/" style={{ color: 'var(--accent-primary)' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/blog" style={{ color: 'var(--accent-primary)' }}>Guides</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>Best Free LLM APIs</span>
            </nav>

            {/* Header */}
            <header className="stagger-1" style={{ marginBottom: '4rem', maxWidth: '860px' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
                    Free LLM APIs
                </div>
                <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    Best Free LLM APIs for Developers (2026)
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '760px' }}>
                    Building AI applications without upfront costs is entirely possible — but you need to know which providers offer genuine free tiers versus temporary trial credits. This guide compares the best free LLM APIs available in 2026, covering rate limits, model quality, OpenAI compatibility, and data privacy.
                </p>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <span>Updated: November 2026</span>
                    <span style={{ color: 'var(--border-color)' }}>·</span>
                    <span>6 providers compared</span>
                    <span style={{ color: 'var(--border-color)' }}>·</span>
                    <span>⏱ 8 min read</span>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 260px', gap: '4rem', alignItems: 'start' }}>
                <article style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

                    {/* ── Section 1: Genuine free vs trial credits ── */}
                    <section>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            What makes a free LLM API genuinely free?
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                            Not all "free" LLM APIs are equal. There are two very different types:
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderTop: '3px solid var(--accent-primary)' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>✓ Permanent Free Tier</div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                    No credit card. No expiry date. Ongoing access with rate limits that reset daily. Examples: Google AI Studio, Groq Cloud, Mistral La Plateforme.
                                </p>
                            </div>
                            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderTop: '3px solid var(--text-secondary)' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>⚠ Trial Credits</div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                    One-time spending allocation ($5–$20) that expires after 30–90 days. A credit card is required once credits run out. Not a sustainable free tier. Example: OpenAI new-account credits.
                                </p>
                            </div>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                            This guide focuses exclusively on providers with <strong style={{ color: 'var(--text-primary)' }}>permanent free development access</strong> — no surprise billing, no expiry.
                        </p>
                    </section>

                    {/* ── Section 2: Comparison Table ── */}
                    <section>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                            Provider comparison table
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                            As of November 2026. Always verify on the provider's official docs before relying on these limits for production planning.
                        </p>

                        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        {['Provider', 'Free Models', 'RPM', 'RPD', 'Context', 'Credit Card', 'OpenAI-Compatible', 'Data Training'].map(h => (
                                            <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: '600', borderBottom: '1px solid var(--border-color)', whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {providers.map((p, i) => (
                                        <tr key={p.name} style={{ borderBottom: i < providers.length - 1 ? '1px solid var(--border-color)' : 'none', backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--bg-secondary)' }}>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-primary)', fontWeight: '600', whiteSpace: 'nowrap' }}>{p.name}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>{p.models.slice(0, 2).join(', ')}{p.models.length > 2 ? '…' : ''}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{p.rpm}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{p.rpd}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{p.context}</td>
                                            <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                                                <span style={{ color: 'var(--accent-primary)', fontWeight: '500' }}>Not required</span>
                                            </td>
                                            <td style={{ padding: '0.875rem 1rem', textAlign: 'center' }}>
                                                {p.openAICompat
                                                    ? <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>✓</span>
                                                    : <span style={{ color: 'var(--text-secondary)' }}>✗</span>}
                                            </td>
                                            <td style={{ padding: '0.875rem 1rem', textAlign: 'center' }}>
                                                {p.dataTraining
                                                    ? <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>Yes</span>
                                                    : <span style={{ color: 'var(--accent-primary)' }}>No</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            RPM = Requests Per Minute · RPD = Requests Per Day · OpenAI-Compatible = works as a drop-in with the <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.1em 0.3em', borderRadius: '3px' }}>openai</code> Python/JS package
                        </p>
                    </section>

                    {/* ── Section 3: Per-provider deep dives ── */}
                    <section>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            Provider deep-dives
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {providers.map((p) => (
                                <div key={p.name} style={{ padding: '1.75rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>{p.name}</h3>
                                        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: p.badgeColor, backgroundColor: 'var(--bg-tertiary)', border: `1px solid ${p.badgeColor}`, borderRadius: 'var(--radius-full)', padding: '0.2rem 0.75rem', whiteSpace: 'nowrap' }}>
                                            {p.badge}
                                        </span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                                        <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Best for</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{p.bestFor}</div>
                                        </div>
                                        <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Free models</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{p.models.join(' · ')}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                                            {p.rpm} RPM
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                                            {p.rpd} RPD
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                                            {p.context} context
                                        </span>
                                        {p.openAICompat && (
                                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', backgroundColor: 'var(--accent-muted)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--accent-primary)' }}>
                                                OpenAI-compatible
                                            </span>
                                        )}
                                        {!p.dataTraining && (
                                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', backgroundColor: 'var(--accent-muted)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--accent-primary)' }}>
                                                No data training
                                            </span>
                                        )}
                                    </div>

                                    <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--text-secondary)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                        <strong style={{ color: 'var(--text-primary)' }}>Key limitation:</strong> {p.limitation}
                                    </div>

                                    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--accent-primary)', textDecoration: 'none' }}>
                                        API documentation ↗
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Section 4: Decision Framework ── */}
                    <section>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                            How to choose: decision framework
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            Use this table to pick the right provider based on your specific requirement:
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {decisionFramework.map((row, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '1rem 1.25rem', backgroundColor: i % 2 === 0 ? 'var(--bg-secondary)' : 'transparent', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                                    <div>
                                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>If you need</span>
                                        <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{row.need}</span>
                                    </div>
                                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>Use</span>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: '600' }}>{row.pick}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--accent-primary)' }}>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                                Once your application outgrows free tier limits, see our{' '}
                                <Link href="/guides/cheapest-llm-api" style={{ color: 'var(--accent-primary)' }}>Cheapest LLM API guide</Link>{' '}
                                for the most cost-effective paid options — starting from as low as $0.075 per million tokens.
                            </p>
                        </div>
                    </section>

                    {/* ── Section 5: Rate Limits Explained ── */}
                    <section>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                            Rate limit terminology explained
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                            Understanding these terms is essential for building stable applications on free tiers.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {rateLimitTerms.map(t => (
                                <div key={t.term} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <code style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--accent-primary)', backgroundColor: 'var(--accent-muted)', padding: '0.1em 0.4em', borderRadius: '4px' }}>{t.term}</code>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.full}</span>
                                    </div>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{t.explanation}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── FAQ ── */}
                    <section style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            Frequently asked questions
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {faqs.map((faq, i) => (
                                <details key={i} style={{ padding: '1.25rem 1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                    <summary style={{ fontWeight: '600', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1.5 }}>
                                        {faq.q}
                                    </summary>
                                    <p style={{ marginTop: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: 0 }}>
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* ── Related pages ── */}
                    <section style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Continue reading</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { href: '/guides/cheapest-llm-api', label: 'Cheapest LLM API', desc: 'Cost-per-token comparison when you\'re ready to scale past free tiers' },
                                { href: '/guides/how-llm-pricing-works', label: 'How LLM Pricing Works', desc: 'Understand input tokens, output tokens, caching, and billing math' },
                                { href: '/ai-tools/llm-apis', label: 'LLM Provider Directory', desc: 'Browse all providers — free, freemium, and paid — in one place' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textDecoration: 'none', gap: '1rem' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '0.2rem' }}>{l.label}</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{l.desc}</div>
                                    </div>
                                    <span style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>→</span>
                                </Link>
                            ))}
                        </div>
                    </section>

                </article>

                {/* ── Sidebar ── */}
                <aside style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Table of contents */}
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '1rem' }}>On this page</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {[
                                'What makes a free API genuinely free?',
                                'Provider comparison table',
                                'Provider deep-dives',
                                'How to choose',
                                'Rate limit terminology',
                                'FAQs',
                            ].map((item, i) => (
                                <li key={i}>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: 'block' }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick pick */}
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-primary)' }}>
                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>Quick Pick (2026)</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                            For most developers, <strong style={{ color: 'var(--text-primary)' }}>Groq Cloud</strong> is the best starting point — free, fast, no credit card, and fully OpenAI-compatible.
                        </p>
                        <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="btn" style={{ display: 'block', textAlign: 'center', padding: '0.6rem 1rem', fontSize: '0.875rem' }}>
                            Get Groq API Key ↗
                        </a>
                    </div>

                    {/* AI Model Explorer CTA */}
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-primary)' }}>
                        <div className="pill" style={{ fontSize: '0.65rem', marginBottom: '0.5rem', display: 'inline-block' }}>New Interactive Tool</div>
                        <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>AI Model Explorer</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                            Search, filter, and compare 55+ AI models side-by-side with token costs, context sizes, and RPM limits.
                        </p>
                        <Link href="/ai-tools/ai-model-explorer" className="btn" style={{ display: 'block', textAlign: 'center', padding: '0.6rem 1rem', fontSize: '0.875rem' }}>
                            Launch Model Explorer ↗
                        </Link>
                    </div>

                    {/* LLM Cost Calculator CTA */}
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <h4 style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Planning to scale?</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                            Use our LLM Cost Calculator to project monthly API costs before upgrading from a free tier.
                        </p>
                        <Link href="/ai-tools/llm-cost-calculator" className="btn btn-secondary" style={{ display: 'block', textAlign: 'center', padding: '0.6rem 1rem', fontSize: '0.875rem' }}>
                            Launch LLM Cost Calculator
                        </Link>
                    </div>

                    {/* Related guides */}
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '1rem' }}>Related guides</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <li><Link href="/guides/cheapest-llm-api" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>Cheapest LLM API (paid tiers)</Link></li>
                            <li><Link href="/guides/how-llm-pricing-works" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>How LLM pricing works</Link></li>
                            <li><Link href="/ai-tools/llm-apis" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>LLM provider directory</Link></li>
                            <li><Link href="/guides/llm-cost-optimization" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>LLM cost optimization</Link></li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

