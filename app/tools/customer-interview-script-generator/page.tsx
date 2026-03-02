"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function CustomerInterviewScriptGenerator() {
    const [productType, setProductType] = useState<"b2b_saas" | "b2c_app" | "service">("b2b_saas");
    const [audience, setAudience] = useState<"founders" | "managers" | "consumers">("founders");
    const [goal, setGoal] = useState<"problem_discovery" | "feature_validation" | "pricing_test">("problem_discovery");

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("customer-interview-script-generator");
            tracked.current = true;
        }
    }, []);

    const generateScript = () => {
        let title = "";
        let questions: string[] = [];
        let pitfalls: string[] = [];

        if (goal === "problem_discovery") {
            title = "Problem Discovery Script (The Mom Test Framework)";
            questions = [
                "1. Tell me about the last time you tried to solve [Problem Domain].",
                "2. What was the hardest part about doing that?",
                "3. Why was that specifically hard?",
                "4. What, if anything, have you done to try to solve this problem?",
                "5. What do you not love about the solutions you've tried?"
            ];
            pitfalls = [
                "Asking 'Would you use a product that does X?' (Forces them to lie to be polite)",
                "Asking about the future rather than past behavior.",
                "Pitching your solution before they finish explaining their workflow."
            ];
        } else if (goal === "feature_validation") {
            title = "Feature & Workflow Validation Script";
            questions = [
                "1. Can you walk me through how you currently handle [Specific Task]?",
                "2. If you could wave a magic wand and remove one step from this workflow, what would it be?",
                "3. How long does [Specific Task] currently take you on average?",
                "4. Show me exactly where this breaks down. Literally, share your screen and show me.",
                "5. If [Proposed Feature] existed, how would it change your day-to-day?"
            ];
            pitfalls = [
                "Telling them how the feature works instead of asking how they want it to work.",
                "Assuming they understand industry jargon.",
                "Not asking for screen-sharing to watch their actual friction points."
            ];
        } else {
            // pricing_test
            title = "Willingness to Pay (Van Westendorp Method)";
            questions = [
                "1. At what price would you consider this product to be so expensive that you would not consider buying it?",
                "2. At what price would you consider this product to be priced so low that you would feel the quality couldn't be very good?",
                "3. At what price would you consider this product starting to get expensive, so that it is not out of the question, but you would have to give some thought to buying it?",
                "4. At what price would you consider the product to be a bargain—a great buy for the money?",
                "5. Whose budget does this fall under, and what is the approval process for a purchase like this?"
            ];
            pitfalls = [
                "Asking 'How much would you pay?' (Always elicits a lowball answer)",
                "Not understanding their company's procurement limits (e.g., credit card vs invoice).",
                "Failing to anchor the price against their current losses."
            ];
        }

        if (audience === "consumers") {
            questions = questions.map(q => q.replace("company's procurement limits", "monthly household budget").replace("Whose budget", "How do you decide"));
        }

        return { title, questions, pitfalls };
    };

    const script = generateScript();

    const copyToClipboard = () => {
        const textToCopy = `=== ${script.title} ===\n\nQUESTIONS:\n${script.questions.join("\n")}\n\nPITFALLS TO AVOID:\n${script.pitfalls.join("\n")}`;
        navigator.clipboard.writeText(textToCopy);
        alert("Script copied to clipboard!");
    };

    const faqs = [
        { question: "What is 'The Mom Test'?", answer: "'The Mom Test' is a framework by Rob Fitzpatrick that states you should never ask people if your idea is good, because they will lie to you to protect your feelings. Instead, ask them about their life and their past behaviors." },
        { question: "Why avoid hypothetical questions?", answer: "Humans are terrible at predicting their future behavior. If you ask someone if they will go to the gym next week, they will say yes. If you ask them how many times they went last week, you get the truth." },
        { question: "How many interviews do I need?", answer: "Usually, patterns emerge after 5-10 targeted interviews. Once you can predict what the next person is going to complain about before they say it, you have validated the problem." }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Customer Interview Script Generator",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "0" },
        "description": "Generate structured, bias-free user interview scripts to validate startup ideas without getting false positives."
    };

    const seoContent = (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <h2>The Science of Talking to Users</h2>
            <p>Most startup founders ruin their user interviews within the first five minutes. By pitching their solution instead of extracting the user's pain, they solicit polite lies ("That sounds like a great idea!") rather than actionable data. The customer interview script generator relies on proven frameworks like The Mom Test and Van Westendorp pricing models to eliminate emotional bias from your product validation process. Do not build software without this.</p>
            <p>If you want to know if someone will buy your product, you must determine what they are already spending to solve the problem today. Our generator dynamically adjusts the questioning flow based on whether you are doing generative problem discovery, feature requirement gathering, or hard pricing tests. Essential reading includes how to conduct user interviews, avoiding false positives in product validation, structuring a B2B SaaS discovery call, determining user willingness to pay, and utilizing behavioral economics to price software products.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validation Scorecard</Link></li>
                <li><Link href="/tools/pricing-psychology-optimizer">Pricing Psychology Optimizer</Link></li>
                <li><Link href="/tools/idea-comparison-tool">Business Idea Scoring Matrix</Link></li>
                <li><Link href="/tools/market-size-estimator">TAM / SAM / SOM Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Customer Interview Script Generator" description="Generate bias-free, structured interview questions to validate your startup idea using behavioral psychology." slug="customer-interview-script-generator" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <div className="input-group">
                        <label className="input-label">Product Archetype</label>
                        <select value={productType} onChange={(e) => setProductType(e.target.value as any)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="b2b_saas">B2B SaaS / Enterprise</option>
                            <option value="b2c_app">B2C Mobile App / Consumer</option>
                            <option value="service">Productized Service / Agency</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Target Audience Persona</label>
                        <select value={audience} onChange={(e) => setAudience(e.target.value as any)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="founders">Founders / CEOs / Owners</option>
                            <option value="managers">Mid-Level Managers / Operators</option>
                            <option value="consumers">Everyday Consumers / General Public</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Primary Validation Goal</label>
                        <select value={goal} onChange={(e) => setGoal(e.target.value as any)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="problem_discovery">Stage 1: Problem Discovery (Does a painful problem exist?)</option>
                            <option value="feature_validation">Stage 2: Solution Validation (Does this specific workflow fix it?)</option>
                            <option value="pricing_test">Stage 3: Willingness to Pay / Pricing Extraction</option>
                        </select>
                    </div>

                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>
                    <button onClick={copyToClipboard} className="btn" style={{ position: "absolute", top: "1.5rem", right: "1.5rem", padding: "0.5rem 1rem", fontSize: "0.85rem", background: "var(--bg-tertiary)", color: "var(--accent-primary)", border: "1px solid var(--accent-primary)" }}>
                        Copy Script
                    </button>

                    <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.5rem", paddingRight: "100px" }}>{script.title}</h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <h4 style={{ color: "var(--accent-primary)", margin: 0, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px" }}>Core Questions</h4>
                        {script.questions.map((q, idx) => (
                            <div key={idx} style={{ padding: "1rem", backgroundColor: "var(--bg-secondary)", borderLeft: "3px solid var(--border-focus)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                                {q}
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                        <h4 style={{ color: "var(--error-color, #ef4444)", margin: "0 0 1rem 0", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px" }}>Critical Pitfalls to Avoid</h4>
                        <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                            {script.pitfalls.map((p, idx) => (
                                <li key={idx} style={{ lineHeight: 1.4 }}>{p}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </ToolLayout>
    );
}
