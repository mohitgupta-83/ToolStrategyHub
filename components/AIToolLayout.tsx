"use client";

import type { ReactNode } from "react";
import Link from "next/link";

interface FAQ {
    question: string;
    answer: string;
}

interface AIToolLayoutProps {
    title: string;
    description: string;
    slug: string;
    faqs: FAQ[];
    seoContent?: ReactNode;
    children: ReactNode;
}

const AI_CALCULATORS = [
    {
        name: "Token Calculator",
        slug: "token-calculator",
        description: "Estimate LLM tokens from text and compare costs across providers."
    },
    {
        name: "LLM Cost Calculator",
        slug: "llm-cost-calculator",
        description: "Calculate API costs per request, day, month, and year."
    },
    {
        name: "AI Agent Cost Calculator",
        slug: "ai-agent-cost-calculator",
        description: "Estimate the scaling and operational costs of running autonomous agents."
    },
    {
        name: "Context Window Calculator",
        slug: "context-window-calculator",
        description: "Calculate context usage, warning triggers, and memory buffers."
    },
    {
        name: "LLM RAM Calculator",
        slug: "llm-ram-calculator",
        description: "Calculate local hardware memory (VRAM/RAM) requirements to run open models."
    }
];

const AI_GUIDES = [
    {
        title: "What Are AI Tokens? (Technical Explanation)",
        slug: "what-are-ai-tokens",
        description: "A deep dive into sub-word tokenization algorithms, vocabulary sizes, and word-to-token multipliers."
    },
    {
        title: "How LLM Pricing Works (Inference & Economics)",
        slug: "how-llm-pricing-works",
        description: "Understand the financial dynamics of modern LLM hosting, input vs output imbalances, and caching."
    },
    {
        title: "How to Reduce LLM API and Token Costs",
        slug: "how-to-reduce-token-costs",
        description: "Practical engineering strategies for prompt compression, token caching, and structured routing."
    },
    {
        title: "What Is a Context Window and How to Manage It",
        slug: "what-is-context-window",
        description: "Learn how context size affects LLM recall accuracy, needle-in-a-haystack limits, and scaling."
    },
    {
        title: "How Much RAM and Hardware for Local LLMs?",
        slug: "how-much-ram-for-local-llms",
        description: "A comprehensive hardware guide explaining parameters, quantization (GGUF/EXL2), and VRAM/RAM specs."
    }
];

export default function AIToolLayout({
    title,
    description,
    slug,
    faqs,
    seoContent,
    children,
}: AIToolLayoutProps) {
    const relatedTools = AI_CALCULATORS.filter(t => t.slug !== slug).slice(0, 3);
    const relatedGuides = AI_GUIDES.slice(0, 4); // Show 4 guides

    // 1. FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };

    // 2. SoftwareApplication Schema
    const appSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": title,
        "operatingSystem": "All",
        "applicationCategory": "DeveloperApplication",
        "browserRequirements": "Requires JavaScript. Runs entirely client-side in the browser.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    // 3. Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://toolstrategyhub.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "AI Ecosystem",
                "item": "https://toolstrategyhub.com/ai-tools"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": title,
                "item": `https://toolstrategyhub.com/ai-tools/${slug}`
            }
        ]
    };

    // 4. Organization Schema
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ToolStrategyHub",
        "url": "https://toolstrategyhub.com",
        "logo": "https://toolstrategyhub.com/brand/logo-main.png"
    };

    return (
        <article className="container stagger-1" style={{ position: 'relative', padding: '6rem 2rem' }}>
            <link rel="canonical" href={`https://toolstrategyhub.com/ai-tools/${slug}`} />
            
            {/* JSON-LD Schemas */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

            {/* Breadcrumb Navigation */}
            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/ai-tools" style={{ color: 'var(--text-secondary)' }}>AI Ecosystem</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>{title}</span>
            </nav>

            <header style={{ marginBottom: "3rem", maxWidth: "800px" }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>{title}</h1>
                <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)" }}>
                    {description}
                </p>
            </header>

            <section style={{ marginBottom: "5rem" }}>
                {children}
            </section>

            {faqs.length > 0 && (
                <section
                    style={{
                        marginBottom: "5rem",
                        padding: "3rem",
                        backgroundColor: "var(--bg-secondary)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                    }}
                >
                    <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
                        Frequently Asked Questions
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        {faqs.map((faq, index) => (
                            <details key={index} className="faq-accordion">
                                <summary>{faq.question}</summary>
                                <p>{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>
            )}

            {seoContent && (
                <section className="seo-content" style={{ maxWidth: "800px", margin: "0 auto 4rem auto" }}>
                    {seoContent}
                </section>
            )}

            {/* Related items */}
            <section style={{
                marginTop: "6rem",
                paddingTop: "4rem",
                borderTop: "1px solid var(--border-color)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "4rem"
            }}>
                {/* Related Tools */}
                <div>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "1px" }}>
                        AI Developer Calculators
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {relatedTools.map((t, idx) => (
                            <Link
                                key={idx}
                                href={`/ai-tools/${t.slug}`}
                                style={{
                                    padding: "1rem",
                                    backgroundColor: "var(--bg-secondary)",
                                    borderRadius: "var(--radius-sm)",
                                    border: "1px solid var(--border-color)",
                                    transition: "all 0.2s ease",
                                    display: "block"
                                }}
                                className="hover-lift"
                            >
                                <div style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "0.25rem" }}>{t.name}</div>
                                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{t.description}</div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Related Guides */}
                <div>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Engineering Guides
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {relatedGuides.map((g, idx) => (
                            <Link
                                key={idx}
                                href={`/guides/${g.slug}`}
                                style={{
                                    padding: "1rem",
                                    borderBottom: idx < relatedGuides.length - 1 ? "1px dashed var(--border-color)" : "none",
                                    display: "block"
                                }}
                            >
                                <div style={{ color: "var(--accent-primary)", fontWeight: "bold" }}>{g.title}</div>
                                <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{g.description}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mobile Sticky CTA */}
            <div className="mobile-sticky-cta">
                <Link href="/ai-tools" className="btn">
                    Explore AI Ecosystem
                </Link>
            </div>

            <style jsx>{`
                .hover-lift:hover {
                    border-color: var(--accent-primary) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
                }
            `}</style>
        </article>
    );
}
