import type { ReactNode } from "react";
import Link from "next/link";
import { getArticlesForTool, getToolsList } from "@/lib/contentRegistry";

interface FAQ {
    question: string;
    answer: string;
}

interface ToolLayoutProps {
    title: string;
    description: string;
    slug?: string;
    faqs: FAQ[];
    seoContent?: ReactNode;
    children: ReactNode;
}

export default function ToolLayout({
    title,
    description,
    slug,
    faqs,
    seoContent,
    children,
}: ToolLayoutProps) {
    const relatedArticles = slug ? getArticlesForTool(slug) : [];
    const relatedTools = getToolsList().filter(t => t.slug !== slug).slice(0, 3);
    // Generate structured data for FAQ
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    // Phase 6: Reading Progress Bar & Engagement
    // We'll add a simple client-side progress bar and sticky button

    const embedCode = `<iframe src="https://toolstrategyhub.com/tools/${slug}" width="100%" height="800px" frameborder="0" style="border:1px solid #eee; border-radius:8px;"></iframe>`;

    return (
        <article className="container stagger-1" style={{ position: 'relative' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <header style={{ marginBottom: "3rem", maxWidth: "800px" }}>
                {slug && getToolsList().find(t => t.slug === slug) && (() => {
                    const currentTool = getToolsList().find(t => t.slug === slug);
                    if (!currentTool || !currentTool.category) return null;
                    const catSlug = currentTool.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                        <nav style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            <Link href="/categories" style={{ color: 'var(--text-secondary)' }}>Categories</Link>
                            <span style={{ margin: '0 0.5rem' }}>/</span>
                            <Link href={`/categories/${catSlug}`} style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>{currentTool?.category}</Link>
                        </nav>
                    );
                })()}
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

            {slug && (
                <section style={{
                    marginTop: "6rem",
                    paddingTop: "4rem",
                    borderTop: "1px solid var(--border-color)",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "4rem"
                }}>
                    <div>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Deep Research Guides
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {relatedArticles.map((article, idx) => (
                                <Link
                                    key={idx}
                                    href={`/tools/${slug}/${article.slug}`}
                                    style={{
                                        padding: "1rem",
                                        backgroundColor: "var(--bg-secondary)",
                                        borderRadius: "8px",
                                        border: "1px solid transparent",
                                        transition: "border-color 0.2s"
                                    }}
                                    className="hover:border-accent"
                                >
                                    <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>{article.title}</div>
                                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{article.description}</div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Other Tool Interfaces
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {relatedTools.map((t, idx) => (
                                <Link
                                    key={idx}
                                    href={`/tools/${t.slug}`}
                                    style={{
                                        padding: "1rem",
                                        borderTop: idx > 0 ? "1px dashed var(--border-color)" : "none",
                                        display: "block"
                                    }}
                                >
                                    <div style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{t.name}</div>
                                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{t.description}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Mobile Sticky CTA */}
            <div className="mobile-sticky-cta">
                <Link href="/tools" className="btn">
                    Explore All Tools
                </Link>
            </div>
        </article>
    );
}
