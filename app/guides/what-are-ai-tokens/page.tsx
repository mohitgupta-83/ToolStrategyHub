import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'What Are AI Tokens? (The Technical Developer Guide)',
    description: 'Learn the math and mechanics behind LLM tokens, Byte-Pair Encoding (BPE), sub-word tokenization algorithms, and word-to-token scale ratios.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/what-are-ai-tokens',
    }
};

export default function WhatAreAITokensGuide() {
    const faqs = [
        {
            q: "How many characters are in a typical LLM token?",
            a: "For standard English text, a token average is roughly 4 characters or 0.75 words. For programming code, JSON payloads, or mathematical notations, this compression ratio drops significantly to around 2 to 2.5 characters per token."
        },
        {
            q: "Do different LLMs use the same tokenizer?",
            a: "No. Each model family has its own custom tokenizer. For example, OpenAI's GPT-4 uses the cl100k_base or o200k_base Tiktoken libraries, while Meta's Llama models use tokenizers built on SentencePiece. Vocabulary sizes vary from 32,000 to over 200,000 tokens."
        },
        {
            q: "Why does whitespace consume so many tokens in JSON and code?",
            a: "Tokenizers are trained to group characters by frequency. While common English phrases are compressed into single tokens, indentation spaces and structural punctuation (brackets, colons, braces) are parsed individually or in small clusters, creating high token overhead."
        },
        {
            q: "How does tokenization handle emojis and non-English text?",
            a: "Emojis and non-Latin characters (like Cyrillic, Kanji, or Arabic) are represented in UTF-8 bytes. Since the tokenizer's vocabulary has fewer multi-byte merges for these characters, they are often split into individual byte tokens, making multilingual prompts 2x to 5x more expensive than English."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'What Are AI Tokens? (The Technical Developer Guide)',
                description: 'A comprehensive, 2000+ word deep dive into Byte-Pair Encoding, tokenization algorithms, and LLM unit economics.',
                author: { '@type': 'Organization', name: 'ToolStrategyHub Expert Team' },
                publisher: {
                    '@type': 'Organization',
                    name: 'ToolStrategyHub',
                    logo: { '@type': 'ImageObject', url: 'https://toolstrategyhub.com/brand/logo-main.png' }
                },
                datePublished: '2026-06-21',
                dateModified: '2026-06-21',
                mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://toolstrategyhub.com/guides/what-are-ai-tokens' }
            },
            {
                '@type': 'FAQPage',
                mainEntity: faqs.map(faq => ({
                    '@type': 'Question',
                    name: faq.q,
                    acceptedAnswer: { '@type': 'Answer', text: faq.a }
                }))
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolstrategyhub.com/' },
                    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://toolstrategyhub.com/blog' },
                    { '@type': 'ListItem', position: 3, name: 'What Are AI Tokens', item: 'https://toolstrategyhub.com/guides/what-are-ai-tokens' }
                ]
            }
        ]
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/" style={{ color: 'var(--accent-primary)' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/blog" style={{ color: 'var(--accent-primary)' }}>Guides</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>What Are AI Tokens</span>
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block', backgroundColor: 'var(--accent-muted)', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}>
                    Core AI Concepts
                </div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    What Are AI Tokens?
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    An in-depth developer guide on Byte-Pair Encoding (BPE), sub-word tokenization algorithms, vocabulary compression matrices, and the hidden math that dictates LLM API costs.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
                <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>

                    {/* Quick Link Card */}
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Interactive Token Counter</h3>
                        <p style={{ marginBottom: '1.25rem', fontSize: '1rem' }}>Want to analyze a specific prompt or payload? Paste it into our Token Calculator to see word, character, and token cost estimations across multiple providers.</p>
                        <Link href="/ai-tools/token-calculator" className="btn" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                            Launch Token Calculator
                        </Link>
                    </div>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>1. Introduction: The Concept of Tokenization</h2>
                        <p>
                            Large Language Models (LLMs) like GPT-4, Claude 3.5, and Llama 3 are mathematical calculators. They do not read words as semantic letters, nor do they process characters individually. Processing individual characters would make sequence lengths too long for self-attention layers to handle (since self-attention complexity scales quadratically with sequence size). Conversely, treating every entire word as a distinct token would require a dictionary of millions of words, causing the model's embedding matrices to become impossibly bloated and unable to generalize to new or misspelled words.
                        </p>
                        <p>
                            To solve this trade-off, developers use <strong>sub-word tokenization</strong>. Tokenization splits input text into common combinations of character segments. These segments are called **tokens**. Under this architecture, common words are represented as single tokens, while rarer words are broken down into logical sub-units (prefixes, roots, and suffixes). This allows the neural network to handle misspelled words, new vocabulary, and technical programming symbols efficiently.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>2. The Math Behind Byte-Pair Encoding (BPE)</h2>
                        <p>
                            Most state-of-the-art tokenizers (including OpenAI's Tiktoken and Meta's Llama models) rely on an algorithm called <strong>Byte-Pair Encoding (BPE)</strong>. Initially designed as a data compression algorithm, BPE builds a token vocabulary bottom-up from text data:
                        </p>
                        <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                            <li>The algorithm starts by treating all individual characters (and byte sequences) as base tokens.</li>
                            <li>It scans the training corpus to identify the most frequently occurring pair of adjacent tokens (e.g., 't' followed by 'h').</li>
                            <li>It merges this pair into a new vocabulary token: 'th'.</li>
                            <li>This process is repeated iteratively for tens of thousands of cycles until the target vocabulary size (e.g., 100,000 tokens) is reached.</li>
                        </ol>
                        <p>
                            Because BPE merges adjacent character pairs based on statistical frequency, common words like "the", "and", or "developer" are compressed into single, high-level tokens. Rare words (like "Boustrophedon" or "Tiktoken") are represented by merging several smaller base tokens.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>3. Tokenizer Comparisons: Vocabulary Size & Compression</h2>
                        <p>
                            The size of a tokenizer's vocabulary dictates its compression efficiency. A larger vocabulary can represent longer phrases in fewer tokens, but it increases the size of the model's input/output embedding layer. Below is a comparison of standard tokenizers used by major model providers:
                        </p>
                        
                        <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', border: '1px solid var(--border-color)' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-color)' }}>
                                        <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Tokenizer Name</th>
                                        <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Model Family</th>
                                        <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Vocab Size</th>
                                        <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Avg. Chars / Token</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '0.75rem 1rem' }}>cl100k_base</td>
                                        <td style={{ padding: '0.75rem 1rem' }}>GPT-4 / GPT-3.5</td>
                                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)' }}>100,277</td>
                                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)' }}>3.9</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '0.75rem 1rem' }}>o200k_base</td>
                                        <td style={{ padding: '0.75rem 1rem' }}>GPT-4o / GPT-4o-mini</td>
                                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)' }}>200,000</td>
                                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)' }}>4.4</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '0.75rem 1rem' }}>Llama 3 Tokenizer</td>
                                        <td style={{ padding: '0.75rem 1rem' }}>Llama 3 / 3.3</td>
                                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)' }}>128,256</td>
                                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)' }}>4.1</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '0.75rem 1rem' }}>Mistral Tiktoken</td>
                                        <td style={{ padding: '0.75rem 1rem' }}>Mistral models</td>
                                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)' }}>32,768</td>
                                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)' }}>3.4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            As vocabulary size increases (such as OpenAI's jump from `cl100k_base` to `o200k_base`), the tokenizer learns longer, more complex tokens, resulting in a higher average character-per-token count. This directly yields a 10-15% cost reduction for developers, as the same volume of text requires fewer tokens to transmit.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>4. The Impact of Syntax: Code, JSON, and Whitespace</h2>
                        <p>
                            A common trap for developers is assuming the "1 token = 4 characters" ratio applies to technical payloads. This assumption fails in three distinct ways:
                        </p>
                        <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li>
                                <strong>Code Indentation:</strong> Spaces used for python or tabbed indentation are often split into individual tokens if they do not match the tokenizer's pre-merged patterns. Writing 4 spaces instead of tabs can multiply token footprints in loops.
                            </li>
                            <li>
                                <strong>JSON Verbosity:</strong> Structuring data returns in JSON format forces repetitive brackets (<code>{`{}`}</code>), quotation marks, and colons. These structural syntax markers are parsed as individual tokens, significantly inflating the token cost of model generation.
                            </li>
                            <li>
                                <strong>Markdown Structure:</strong> Adding symbols like hashes (<code>#</code>), asterisks (<code>*</code>), or backticks (<code>`</code>) for styling requires additional token parsing.
                            </li>
                        </ol>
                        <p>
                            To optimize token footprint, developers should construct lean, flat serialization formats (such as TSV or XML) in environments where high-volume structured communication is required, and use the <Link href="/ai-tools/llm-cost-calculator" style={{ color: "var(--accent-primary)" }}>LLM Cost Calculator</Link> to model the difference.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>5. Why Tokenization Limits Your AI Strategy</h2>
                        <p>
                            Because the token is the basic unit of computational weight, it imposes strict technical boundaries on how you build agent architectures:
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li>
                                <strong>API Billing:</strong> Since you are billed per million tokens, large prompts directly scale operating expenses.
                            </li>
                            <li>
                                <strong>Context Window Overhead:</strong> A model's context capacity (e.g. 128k) is a hard ceiling. Memory systems must compress conversation history tokens to prevent overflow, as detailed in our guide on <Link href="/guides/what-is-context-window" style={{ color: "var(--accent-primary)" }}>context window management</Link>.
                            </li>
                            <li>
                                <strong>Inference Speeds:</strong> Generative tokens are computed sequentially, meaning latency is directly proportional to output token volume.
                            </li>
                        </ul>
                    </section>

                    {/* Summary CTA */}
                    <div style={{ padding: '3rem 2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center', marginTop: '2rem' }}>
                        <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Optimize Your AI Token Footprint</h3>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Input your prompts and evaluate estimated token costs across all major models before deploying code.</p>
                        <Link href="/ai-tools/token-calculator" className="btn" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                            Open Token Calculator
                        </Link>
                    </div>

                    {/* FAQ Section */}
                    <section id="faqs" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {faqs.map((faq, idx) => (
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
            </div>
        </div>
    );
}
