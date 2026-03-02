"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function PricingPsychologyOptimizer() {
    const [price, setPrice] = useState<number>(99);
    const [audience, setAudience] = useState<"b2b" | "b2c" | "luxury">("b2c");
    const [frequency, setFrequency] = useState<"one-time" | "subscription">("subscription");
    const [valuePerception, setValuePerception] = useState<"utility" | "status" | "convenience">("convenience");

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("pricing-psychology-optimizer");
            tracked.current = true;
        }
    }, []);

    const analyzePricing = () => {
        let suggestion = "";
        let anchoring = "";
        let tips = [];
        let recommendedPrice = price;

        if (audience === "luxury" || valuePerception === "status") {
            suggestion = "Premium Whole-Number Pricing";
            recommendedPrice = Math.ceil(price / 10) * 10;
            anchoring = "Anchor against the cost of NOT having status, or extreme premium alternatives (e.g. \"Costs less than a private consultant\").";
            tips = [
                "Remove cents and decimals entirely. $1,000 looks more prestigious than $999.99.",
                "Do not use discount codes. Status buyers perceive discounts as a loss of exclusivity.",
                "Emphasize scarcity and exclusivity over operational utility."
            ];
        } else if (audience === "b2b") {
            suggestion = "Value-Metric Tiering";
            recommendedPrice = Math.floor(price / 10) * 10 + 9; // e.g., 99, 149

            if (frequency === "subscription") {
                anchoring = "Anchor against the monthly salary of an employee who would perform this manually.";
                tips = [
                    "Offer an annual plan with 2 months free. B2B buyers have yearly budgets.",
                    "Highlight 'ROI within 30 days'. Businesses buy to save time or make money.",
                    "Use numbers ending in 9 or 0, depending on context (e.g., $49/mo)."
                ];
            } else {
                anchoring = "Anchor against alternative enterprise software or the total cost of ownership.";
                tips = [
                    "Make sure the price is below immediate procurement limits if possible.",
                    "Include a 'Contact Sales' tier to capture high-value leads.",
                    "Justify the price with concrete productivity gains."
                ];
            }
        } else {
            // B2C
            suggestion = "Charm Pricing (Left-Digit Effect)";
            recommendedPrice = Math.ceil(price) - 0.01;

            if (frequency === "subscription") {
                anchoring = "Anchor against daily trivial expenses (e.g., \"Less than a cup of coffee deeply\").";
                tips = [
                    "Use prices ending in .99 or .95. $9.99 feels significantly cheaper than $10.",
                    "Show the monthly cost instead of annual, even if billed annually.",
                    "Make the cancellation process visibly easy to lower commitment anxiety."
                ];
            } else {
                anchoring = "Anchor against the traditional retail price of competitors.";
                tips = [
                    "Use strikethrough pricing to create a sense of immediate savings.",
                    "Highlight urgency or limited-time availability.",
                    "Keep the final checkout price identical to the advertised price (no hidden fees)."
                ];
            }
        }

        return { suggestion, recommendedPrice, anchoring, tips };
    };

    const results = analyzePricing();

    const faqs = [
        { question: "What is Charm Pricing?", answer: "Charm pricing is the practice of ending prices in 9 or 99 to leverage the left-digit effect. Because we read left-to-right, $19.99 is perceived closer to $10 than $20 by the human brain." },
        { question: "When should I use whole numbers?", answer: "Whole numbers ($500) denote quality, luxury, and straightforwardness. Use them when your value proposition is high-status or enterprise B2B. Do not use charm pricing for luxury goods." },
        { question: "How does anchoring work?", answer: "Anchoring is presenting a high price initially (the anchor) to make a subsequent price seem like a massive bargain. It shifts the consumer's perception of value." }
    ];

    const seoContent = (
        <>
            <h2>The Psychology of the Price Tag</h2>
            <p>Pricing is not a math problem; it is a psychological one. The optimal price is the intersection of perceived value, competitive anchoring, and presentation formatting. Altering a price from $50.00 to $49.00 can increase conversion rates by over 10%.</p>
            <h3>Relevant Links</h3>
            <ul>
                <li><Link href="/">Homepage</Link></li>
                <li><Link href="/tools/saas-pricing-calculator">SaaS Pricing Calculator</Link></li>
                <li><Link href="/tools/startup-idea-validator">Startup Idea Validator</Link></li>
                <li><Link href="/tools/idea-comparison-tool">Business Idea Scoring Matrix</Link></li>
                <li><Link href="/tools/idea-validation">Idea & Validation Cluster Hub</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Pricing Psychology Optimizer" description="Calculate the optimal psychological pricing strategy based on human cognitive biases and value perception." slug="pricing-psychology-optimizer" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Target Base Price</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>${price}</span>
                        </label>
                        <input type="range" min="1" max="10000" step="1" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Target Audience</label>
                        <select value={audience} onChange={(e) => setAudience(e.target.value as any)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="b2c">B2C (Consumers)</option>
                            <option value="b2b">B2B (Businesses)</option>
                            <option value="luxury">Luxury / Premium</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Purchase Frequency</label>
                        <select value={frequency} onChange={(e) => setFrequency(e.target.value as any)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="subscription">Subscription (Recurring)</option>
                            <option value="one-time">One-Time Final Purchase</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Core Value Perception</label>
                        <select value={valuePerception} onChange={(e) => setValuePerception(e.target.value as any)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
                            <option value="utility">Utility (Saves money/time)</option>
                            <option value="convenience">Convenience (Removes friction)</option>
                            <option value="status">Status (Ego, luxury, exclusivity)</option>
                        </select>
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-primary)" }}>
                        <div className="input-label" style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Recommended Structural Price</div>
                        <div style={{ fontSize: "3rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            ${results.recommendedPrice.toLocaleString(undefined, { minimumFractionDigits: audience === "b2c" ? 2 : 0, maximumFractionDigits: 2 })}
                        </div>
                        <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "0.5rem" }}>Strategy: {results.suggestion}</div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", borderLeft: "4px solid var(--accent-secondary)" }}>
                            <h4 style={{ marginBottom: "0.5rem", color: "var(--text-primary)" }}>Anchoring Strategy</h4>
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{results.anchoring}</p>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: "0.75rem", color: "var(--text-primary)" }}>Conversion Improvement Tips</h4>
                            <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {results.tips.map((tip, idx) => (
                                    <li key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                                        <span style={{ color: "var(--accent-primary)", fontWeight: "bold" }}>→</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
