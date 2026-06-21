import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How Much RAM for Local LLMs? (Hardware Sizing Guide)',
    description: 'Learn the hardware sizing math to run open-weight LLMs locally. Calculate model VRAM, unified Mac memory, quantization levels, and GPU configurations.',
    alternates: {
        canonical: 'https://toolstrategyhub.com/guides/how-much-ram-for-local-llms',
    }
};

export default function HowMuchRAMForLocalLLMsGuide() {
    const faqs = [
        {
            q: "What happens if a model size exceeds my GPU's VRAM?",
            a: "Popular runners like Ollama or llama.cpp will offload the remaining layers to system CPU RAM. While the model will still run, CPU memory bandwidth is 5x to 10x slower than GPU VRAM, causing output speed to crawl (often below 2 tokens/sec)."
        },
        {
            q: "Which quantization bit level represents the best sweetspot?",
            a: "4-bit quantization (specifically the Q4_K_M GGUF format) is the universal developer standard. It reduces model file sizes by over 70% with negligible reasoning degradation, allowing consumer GPUs to host advanced weights."
        },
        {
            q: "Why are Apple Silicon Macs so popular for local LLMs?",
            a: "Macs use unified memory, meaning the CPU and integrated GPU share the same high-speed RAM. A Mac Studio with 128GB of Unified Memory can run a massive 70B parameter model at 8-bit precision, a feat that would require multiple expensive Nvidia GPUs on a PC."
        },
        {
            q: "How does batch size affect local VRAM requirements?",
            a: "Batch size multiplies the KV cache memory footprint. For single-user local prototyping (batch size 1), cache memory is small (under 1 GB). For multi-user servers, high batch sizes (e.g. 16 or 32) can consume 10GB+ of additional VRAM."
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                headline: 'How Much RAM for Local LLMs? (Hardware Sizing Guide)',
                description: 'The definitive 2000+ word hardware optimization manual explaining local LLM RAM/VRAM math, quantization levels, and GPU setups.',
                author: { '@type': 'Organization', name: 'ToolStrategyHub Expert Team' },
                publisher: {
                    '@type': 'Organization',
                    name: 'ToolStrategyHub',
                    logo: { '@type': 'ImageObject', url: 'https://toolstrategyhub.com/brand/logo-main.png' }
                },
                datePublished: '2026-06-21',
                dateModified: '2026-06-21',
                mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://toolstrategyhub.com/guides/how-much-ram-for-local-llms' }
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
                    { '@type': 'ListItem', position: 3, name: 'How Much RAM for Local LLMs', item: 'https://toolstrategyhub.com/guides/how-much-ram-for-local-llms' }
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
                <span style={{ color: 'var(--text-primary)' }}>Local LLM Hardware</span>
            </nav>

            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block', backgroundColor: 'var(--accent-muted)', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}>
                    Local AI Hosting
                </div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                    How Much RAM for Local LLMs?
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
                    An engineering guide on quantization levels (GGUF/EXL2), KV Cache memory allocation, GPU VRAM requirements, and hardware configuration tiers.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem', alignItems: 'start' }}>
                <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>

                    {/* Quick Link Card */}
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Calculate Your Hardware Sizing</h3>
                        <p style={{ marginBottom: '1.25rem', fontSize: '1rem' }}>Sizing a specific local model? Use our LLM RAM Calculator to select parameters and find recommended GPU / VRAM specifications instantly.</p>
                        <Link href="/ai-tools/llm-ram-calculator" className="btn" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                            Launch RAM Calculator
                        </Link>
                    </div>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>1. The Hardware Bottleneck: VRAM vs. System RAM</h2>
                        <p>
                            When self-hosting open-weight models (like Llama 3 or Mistral), output speed is dictated by **memory bandwidth**. During inference, the GPU must fetch billions of parameters from memory to process each word. Dedicated graphics memory (VRAM) operates at massive bandwidths: an Nvidia RTX 4090 moves data at 1,008 GB/sec. Standard system RAM, however, operates at only 50 to 90 GB/sec.
                        </p>
                        <p>
                            If a model's size fits entirely inside VRAM, generation is extremely fast (30 to 80 tokens per second). If the model exceeds the VRAM ceiling and spills into system RAM, the GPU must fetch weights over the slow PCIe system bus, causing output speed to crawl to 1-3 tokens per second—making it unusable for real-time applications.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>2. The Math of Model Compression: Quantization</h2>
                        <p>
                            By default, models are trained at 16-bit precision (FP16), consuming 2 bytes of memory per parameter. A 7B parameter model at FP16 requires 14 GB of memory just to load the weights. A 70B parameter model requires 140 GB, putting it far out of reach for consumer GPUs.
                        </p>
                        <p>
                            <strong>Quantization</strong> solves this by converting 16-bit float values into lower-bit representations (like 4-bit or 5-bit integers) using mapping algorithms. This reduces memory footprint dramatically:
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><strong>16-bit (FP16):</strong> 2.0 bytes per parameter. (7B model = 14.0 GB weights)</li>
                            <li><strong>8-bit (Q8_0):</strong> 1.0 byte per parameter. (7B model = 7.0 GB weights)</li>
                            <li><strong>4-bit (Q4_K_M):</strong> ~0.5 bytes per parameter. (7B model = 3.5 GB weights)</li>
                            <li><strong>2-bit (Q2_K):</strong> ~0.25 bytes per parameter. (7B model = 1.75 GB weights)</li>
                        </ul>
                        <p>
                            Quantization reduces file sizes on disk and in memory, but introduces a slight math rounding error (measured as "perplexity loss"). Empirically, <strong>4-bit quantization</strong> provides the ultimate sweet spot—reducing file size by 75% with a perplexity increase that is virtually imperceptible in conversation.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>3. The KV Cache Memory Formula</h2>
                        <p>
                            In addition to model weights, runners must store Key-Value (KV) tensors for every token processed in the context window. This memory buffer is called the <strong>KV Cache</strong>. It prevents the model from re-evaluating conversation history from scratch on every turn.
                        </p>
                        <p>
                            The memory size of the KV cache scales linearly with context length and batch size:
                        </p>
                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', fontFamily: 'var(--font-mono)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                            {`KV_VRAM (GB) ≈ 2 * Layers * KV_Heads * (HiddenSize / AttentionHeads) * Context_Length * Batch_Size * 2 bytes (FP16) / 1024^3`}
                        </div>
                        <p>
                            For modern Grouped-Query Attention (GQA) models, a quick empirical estimate is:<br />
                            <code>KV_VRAM ≈ Context_Length × Batch_Size × Model_Size × 0.00000015 GB</code>.
                        </p>
                        <p>
                            At 8,192 context length and batch size 1, a 70B model's KV Cache consumes ~1.0 GB of memory. However, if running a multi-user server at batch size 16 with 32,000 context limits, the KV Cache alone consumes over 16 GB of VRAM, requiring developers to size their graphics hardware accordingly.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>4. Recommended Hardware Configuration Tiers</h2>
                        <p>
                            Sizing your hardware configuration depends on which parameter scales you plan to run:
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
                            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Budget / Entry Tier</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    <strong>Run 7B / 8B models (4-bit).</strong> Requires 8GB VRAM. <br />
                                    GPU: Nvidia RTX 4060 8GB / RTX 3060 12GB. Standard 16GB System RAM.
                                </p>
                            </div>
                            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Developer / Pro Tier</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    <strong>Run 13B / 32B models (4-bit).</strong> Requires 16GB-24GB VRAM. <br />
                                    GPU: Nvidia RTX 4090 24GB / RTX 3090 24GB / Mac Studio 32GB Unified Memory.
                                </p>
                            </div>
                            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Workstation / Server Tier</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    <strong>Run 70B+ models (4-bit).</strong> Requires 48GB+ VRAM. <br />
                                    GPU: Dual RTX 3090/4090 (48GB VRAM) / Mac Studio 64GB or 128GB Unified Memory.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Summary CTA */}
                    <div style={{ padding: '3rem 2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center', marginTop: '2rem' }}>
                        <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Run Your Model Weights Math</h3>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Input custom parameters, context buffers, and quantization levels to calculate VRAM limits instantly.</p>
                        <Link href="/ai-tools/llm-ram-calculator" className="btn" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                            Open RAM Calculator
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
