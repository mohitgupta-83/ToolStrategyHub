"use client";

import { useState, useRef, useEffect } from "react";
import AIToolLayout from "@/components/AIToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";
import pricingData from "@/lib/llmPricing.json";

export default function AIAgentCostCalculator() {
    const [users, setUsers] = useState(100);
    const [messagesPerUser, setMessagesPerUser] = useState(20);
    const [promptSize, setPromptSize] = useState(1500);
    const [outputSize, setOutputSize] = useState(400);
    const [modelSlug, setModelSlug] = useState("gpt-4o-mini");
    const [daysActive, setDaysActive] = useState(20);
    const [infraCost, setInfraCost] = useState(150); // hosting server (EC2, Render)
    const [dbCost, setDbCost] = useState(70); // Vector DB (Pinecone, Qdrant)
    const [growthRate, setGrowthRate] = useState(15); // Monthly user growth percentage
    
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("ai-agent-cost-calculator");
            tracked.current = true;
        }
    }, []);

    // Get current model specifications
    const currentModel = pricingData.find(m => m.slug === modelSlug) || pricingData[1];

    // Calculations
    const costPerMessage = (promptSize / 1_000_000) * currentModel.inputCostPerM +
                           (outputSize / 1_000_000) * currentModel.outputCostPerM;

    const dailyMessages = users * messagesPerUser;
    const dailyTokens = dailyMessages * (promptSize + outputSize);
    
    const dailyAPICost = dailyMessages * costPerMessage;
    const monthlyAPICost = dailyAPICost * daysActive;
    const yearlyAPICost = monthlyAPICost * 12;

    const monthlyInfraCost = infraCost + dbCost;
    const monthlyTotalCost = monthlyAPICost + monthlyInfraCost;
    const yearlyTotalCost = yearlyAPICost + (monthlyInfraCost * 12);

    const costPerUserPerMonth = users > 0 ? monthlyTotalCost / users : 0;

    // Growth Projections (Month 1, 3, 6, 12)
    const getProjectedCost = (months: number) => {
        const projectedUsers = users * Math.pow(1 + growthRate / 100, months);
        const projectedDailyMsgs = projectedUsers * messagesPerUser;
        const projectedMonthlyAPICost = projectedDailyMsgs * costPerMessage * daysActive;
        // Scale database and server infrastructure slowly with volume
        const scaleInfra = monthlyInfraCost * (1 + (projectedUsers / users - 1) * 0.15); 
        return {
            users: Math.round(projectedUsers),
            api: projectedMonthlyAPICost,
            infra: scaleInfra,
            total: projectedMonthlyAPICost + scaleInfra
        };
    };

    const projections = {
        m1: { users, api: monthlyAPICost, infra: monthlyInfraCost, total: monthlyTotalCost },
        m3: getProjectedCost(2), // month 3
        m6: getProjectedCost(5), // month 6
        m12: getProjectedCost(11) // month 12
    };

    const faqs = [
        {
            question: "Why do AI agent runs cost more than simple chat widgets?",
            question_id: "agent-q1",
            answer: "Autonomous agents use loops (like ReAct or Plan-and-Solve patterns) to run tasks. A single user query might trigger 5 to 10 sub-prompts where the agent reads files, searches vectors, and writes tool executions. This 'agent amplification' multiplies token volume per interaction."
        },
        {
            question: "How do vector databases affect AI agent infrastructure costs?",
            question_id: "agent-q2",
            answer: "Agents require semantic memory (long-term retrieval) to function. Vector databases store document embeddings and message histories. While APIs are billed per token, vector DBs require a continuous running server or index licensing, forming a fixed baseline infrastructure cost."
        },
        {
            question: "What is a reasonable LTV:CAC target for AI startups?",
            question_id: "agent-q3",
            answer: "Due to the variable cost of API usage, AI applications have lower gross margins (often 60-70%) than standard SaaS (80%+). Therefore, AI startups should target a higher LTV:CAC ratio (4:1 or 5:1) to offset variable model taxes."
        }
    ];

    const seoContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2>How Much Does an AI Agent Cost?</h2>
            <p>
                Estimating the budget for agentic systems requires modeling beyond static API calls. Unlike standard chat endpoints where a user sends one input and gets one output, an <strong>AI agent</strong> operates in an autonomous loop. It breaks goals down, executes tool functions, parses results, and refines strategies. 
            </p>

            <h3>The Token Amplification Problem</h3>
            <p>
                In agent loops, a single user session triggers multiple sequential API requests. This creates <strong>token amplification</strong>. For example, if a user requests a database report:
            </p>
            <ul style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Loop 1:</strong> System prompt + User input &rarr; LLM decides to view table schema. (Tool Call)</li>
                <li><strong>Loop 2:</strong> Table schema + History &rarr; LLM writes SQL. (Tool Call)</li>
                <li><strong>Loop 3:</strong> SQL result (data) + History &rarr; LLM summarizes report. (Completion)</li>
            </ul>
            <p>
                What looks like one transaction internally consumed 3 prompt inputs and 3 completions, quickly draining context space and budget.
            </p>

            <h3>Scaling Costs & Infrastructure Planning</h3>
            <p>
                To support production-grade agents, developers must plan:
            </p>
            <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>LLM API Costs:</strong> Variable expenses tied to user volume and loop counts.</li>
                <li><strong>Vector Database Hosting:</strong> Storing user embeddings (e.g. Pinecone, Qdrant indexes) at $50-$300/mo.</li>
                <li><strong>Application Servers:</strong> Hosting agent runtimes (e.g., EC2, Render, ECS containers) capable of executing long-lived asynchronous processes.</li>
            </ol>

            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/ai-tools" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>AI Developer Ecosystem Hub</Link></li>
                <li><Link href="/ai-tools/context-window-calculator" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Context Window Calculator</Link></li>
                <li><Link href="/guides/how-llm-pricing-works" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Deep Guide: How LLM Pricing Works</Link></li>
                <li><Link href="/guides/how-to-reduce-token-costs" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Deep Guide: Reducing Token Costs</Link></li>
            </ul>
        </div>
    );

    return (
        <AIToolLayout
            title="AI Agent Cost Calculator"
            description="Estimate the scaling cost of running autonomous AI agents, including LLM token amplification, hosting servers, and vector databases."
            slug="ai-agent-cost-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
                {/* Inputs area */}
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div className="input-group">
                            <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Active Users</span>
                            </label>
                            <input 
                                type="number" 
                                className="input-field" 
                                value={users} 
                                onChange={(e) => setUsers(Math.max(0, Number(e.target.value)))}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Days Active / Mo</span>
                            </label>
                            <input 
                                type="number" 
                                className="input-field" 
                                min="1"
                                max="30"
                                value={daysActive} 
                                onChange={(e) => setDaysActive(Math.min(30, Math.max(1, Number(e.target.value))))}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Select LLM API Model</span>
                        </label>
                        <select 
                            value={modelSlug} 
                            onChange={(e) => setModelSlug(e.target.value)}
                            className="input-field"
                        >
                            {pricingData.map(model => (
                                <option key={model.slug} value={model.slug}>
                                    {model.provider} - {model.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Average Messages / User / Day</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{messagesPerUser}</span>
                        </label>
                        <input 
                            type="range" 
                            min="1" 
                            max="100" 
                            value={messagesPerUser} 
                            onChange={(e) => setMessagesPerUser(Number(e.target.value))} 
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Average Input (Prompt) Tokens / Msg</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{promptSize}</span>
                        </label>
                        <input 
                            type="range" 
                            min="100" 
                            max="10000" 
                            step="100"
                            value={promptSize} 
                            onChange={(e) => setPromptSize(Number(e.target.value))} 
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Average Output (Response) Tokens / Msg</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{outputSize}</span>
                        </label>
                        <input 
                            type="range" 
                            min="50" 
                            max="4000" 
                            step="50"
                            value={outputSize} 
                            onChange={(e) => setOutputSize(Number(e.target.value))} 
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div className="input-group">
                            <label className="input-label">Server Cost ($/mo)</label>
                            <input 
                                type="number" 
                                className="input-field" 
                                value={infraCost} 
                                onChange={(e) => setInfraCost(Math.max(0, Number(e.target.value)))}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Vector DB ($/mo)</label>
                            <input 
                                type="number" 
                                className="input-field" 
                                value={dbCost} 
                                onChange={(e) => setDbCost(Math.max(0, Number(e.target.value)))}
                            />
                        </div>
                    </div>
                </div>

                {/* Outputs card */}
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 className="input-label">Monthly Operating Budget</h3>
                    
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Total Monthly Cost</div>
                        <div style={{ fontSize: "2.75rem", color: "var(--accent-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            ${monthlyTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>API Cost / Month</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                ${monthlyAPICost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Infra Cost / Month</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                ${monthlyInfraCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Cost / User / Mo</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                ${costPerUserPerMonth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Daily Messages</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                {dailyMessages.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Cost breakdown cards */}
                    <div style={{ padding: "1rem", backgroundColor: "rgba(16, 185, 129, 0.05)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)" }}>
                        <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--accent-primary)", letterSpacing: "0.5px" }}>Annual Operating Estimate</div>
                        <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-mono)", fontWeight: "bold", marginTop: "0.25rem" }}>
                            ${yearlyTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} / Year
                        </div>
                    </div>
                </div>
            </div>

            {/* Funnel-style Visualization */}
            <div className="card" style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                    Agentic Traffic & Cost Funnel
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>
                    Visualize how active user metrics convert into monthly token flows and infrastructure bills.
                </p>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", maxWidth: "600px", margin: "0 auto" }}>
                    {/* Funnel Step 1 */}
                    <div style={{ 
                        width: "100%", 
                        backgroundColor: "var(--bg-tertiary)", 
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-sm)", 
                        padding: "1rem", 
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem"
                    }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Step 1: Active Users</span>
                        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>{users.toLocaleString()} Monthly Users</span>
                    </div>

                    {/* Arrow SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>

                    {/* Funnel Step 2 */}
                    <div style={{ 
                        width: "90%", 
                        backgroundColor: "var(--bg-tertiary)", 
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-sm)", 
                        padding: "1rem", 
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem"
                    }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Step 2: Message Volume</span>
                        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)" }}>{(users * messagesPerUser).toLocaleString()} Daily Messages</span>
                    </div>

                    {/* Arrow SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>

                    {/* Funnel Step 3 */}
                    <div style={{ 
                        width: "80%", 
                        backgroundColor: "var(--bg-tertiary)", 
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-sm)", 
                        padding: "1rem", 
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem"
                    }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Step 3: Token Throughput</span>
                        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>
                            {dailyTokens.toLocaleString()} Daily Tokens
                        </span>
                    </div>

                    {/* Arrow SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>

                    {/* Funnel Step 4 */}
                    <div style={{ 
                        width: "70%", 
                        backgroundColor: "var(--accent-muted)", 
                        border: "1px solid var(--accent-primary)",
                        borderRadius: "var(--radius-sm)", 
                        padding: "1rem", 
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem"
                    }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--accent-primary)", textTransform: "uppercase" }}>Step 4: Monthly Cost</span>
                        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent-primary)" }}>${monthlyTotalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>

            {/* Growth Projections Section */}
            <div className="card" style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                    Future Growth Projections
                </h3>
                <div className="input-group" style={{ maxWidth: "350px", marginBottom: "2rem" }}>
                    <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Projected User Growth / Month</span>
                        <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{growthRate}%</span>
                    </label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={growthRate} 
                        onChange={(e) => setGrowthRate(Number(e.target.value))} 
                    />
                </div>

                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem", minWidth: "600px" }}>
                        <thead>
                            <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
                                <th style={{ padding: "0.75rem" }}>Timeline</th>
                                <th style={{ padding: "0.75rem" }}>Projected Users</th>
                                <th style={{ padding: "0.75rem" }}>API Cost / Mo</th>
                                <th style={{ padding: "0.75rem" }}>Infra Cost / Mo</th>
                                <th style={{ padding: "0.75rem" }}>Total Monthly Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { label: "Month 1 (Baseline)", data: projections.m1 },
                                { label: "Month 3", data: projections.m3 },
                                { label: "Month 6", data: projections.m6 },
                                { label: "Month 12", data: projections.m12 }
                            ].map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                    <td style={{ padding: "1rem", fontWeight: "bold" }}>{row.label}</td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-mono)" }}>{row.data.users.toLocaleString()}</td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-mono)" }}>${row.data.api.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-mono)" }}>${row.data.infra.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-mono)", fontWeight: "bold", color: "var(--accent-primary)" }}>
                                        ${row.data.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AIToolLayout>
    );
}
