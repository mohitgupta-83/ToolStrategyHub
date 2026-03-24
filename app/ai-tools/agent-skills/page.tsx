import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { AGENT_SKILLS } from '@/lib/aiToolsRegistry';

export const metadata: Metadata = generatePageMetadata({
    title: "AI Agent Skills, Workflows & Examples",
    description: "Equip your AI agents with real-world capabilities. Directory of Claude, OpenClaw, and NemoClaw skills for scraping, coding, and API chaining.",
    path: "/ai-tools/agent-skills",
    keywords: ["Claude skills", "AI agent skills examples", "OpenClaw skills", "AI automation workflows"]
});

export default function AgentSkillsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ItemList",
                "itemListElement": AGENT_SKILLS.map((skill, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "SoftwareApplication",
                        "name": skill.name,
                        "description": skill.description,
                        "url": skill.url
                    }
                }))
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is an AI agent skill?",
                        "acceptedAnswer": { "@type": "Answer", "text": "A skill is a functional tool given to an AI agent (like Claude or Custom GPTs) that allows it to interact with the outside world. This includes running code, querying databases, saving files, or navigating websites." }
                    },
                    {
                        "@type": "Question",
                        "name": "How do I add these skills to my AI?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Most skills operate through a standardized server protocol like MCP (Model Context Protocol). You download the repository, run the server locally, and point your LLM application architecture to the exposed system." }
                    },
                    {
                        "@type": "Question",
                        "name": "Are Claude and OpenClaw skills interoperable?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Generally, yes. Because tools and skills simply expose an OpenAPI-like schema, most orchestration layers (like LangChain or standard API polling) can format any skill to function with any sufficiently intelligent foundation model." }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the most useful agent skill?",
                        "acceptedAnswer": { "@type": "Answer", "text": "File System Operations and Web Browsing (via Puppeteer) are universally the most deployed skills, as they grant agents basic read/write access to both local context and live internet data." }
                    }
                ]
            }
        ]
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem' }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <nav style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <Link href="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/ai-tools" style={{ color: 'var(--text-secondary)' }}>AI Ecosystem</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--text-primary)' }}>Agent Skills</span>
            </nav>

            <header className="stagger-1" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
                <div className="pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Agent Tooling</div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    Agent Skills & <br /><span style={{ color: 'var(--accent-primary)' }}>Workflow Execution</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                    An LLM is just a text generator until you give it hands. Browse curated skills, tools, and executable functions that grant your autonomous agents real-world capabilities.
                </p>
            </header>

            <section className="stagger-2" style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {AGENT_SKILLS.map((skill) => (
                        <div key={skill.name} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{skill.name}</h3>
                                <span className="pill" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--accent-primary)', borderColor: 'var(--border-color)', margin: 0 }}>
                                    {skill.source}
                                </span>
                            </div>
                            
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, flexGrow: 1, marginBottom: '1.5rem' }}>
                                {skill.description}
                            </p>

                            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--accent-primary)' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Use Case:</strong> {skill.useCase}
                                </div>
                            </div>

                            <a href={skill.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                                View GitHub Repository ↗
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <article className="stagger-3 seo-content" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', lineHeight: 1.8 }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>What Exactly is an AI Agent Skill?</h2>
                <p>
                    A language model operating in total isolation is incredibly limited; it can only regurgitate patterns derived from its training set up to a cutoff date. However, a model transforms into an <strong>autonomous agent</strong> the precise moment it is granted the ability to execute code and interact with external systems. These functional capabilities are known as <strong>Agent Skills</strong>.
                </p>
                <p>
                    From Claude utilizing the Model Context Protocol to execute local bash scripts, to custom GPTs generating SQL queries via isolated containerized environments, skills bridge the gap between intelligence and execution. Determining which tools to map into an agent requires strict strategic parameters. Before building, prioritize the deployment backlog by employing our proprietary <Link href="/tools/feature-priority-matrix" style={{ color: 'var(--accent-primary)' }}>Feature Priority Matrix</Link> to objectively analyze engineering effort vs. operational impact.
                </p>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>The Economics of Autonomous Workflows</h3>
                <p>
                    The integration of these capabilities into your organizational infrastructure means entire categories of knowledge work—from routine GitHub pull request reviews to intensive market scraping operations—can be fully commoditized. 
                </p>
                <p>
                    But the process of chaining these skills securely isn't trivial. It demands rigorous sandboxing, explicit permission validation, and robust error-handling pipelines. When calculating whether implementing a complex web-scraping agent justifies the engineering time, ensure you cross-reference your internal human capital costs using the <Link href="/tools/workflow-cost-calculator" style={{ color: 'var(--accent-primary)' }}>Workflow Cost Calculator</Link>. If the automated deployment costs more than the manual friction, you are over-allocating engineering bandwidth unnecessarily.
                </p>

                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1rem' }}>Beginner-Friendly Component Deployment</h3>
                <p>
                    For developers entering the agentic ecosystem, the barrier to implementation is incredibly low. By leveraging the standardized repositories available via NemoClaw, OpenClaw, and the official Anthropic Skills libraries detailed above, you can clone, initiate, and map functional endpoints to your LLM architecture in minutes. Connect an agent to your file system, provide a multi-schema prompt, and watch the system execute objective routing autonomously.
                </p>
            </article>

            <section className="stagger-4" style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)', maxWidth: '800px', margin: '5rem auto 0' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(jsonLd["@graph"][1] as any).mainEntity.map((faq: any, idx: number) => (
                        <details key={idx} className="faq-accordion">
                            <summary>{faq.name}</summary>
                            <p>{faq.acceptedAnswer.text}</p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
