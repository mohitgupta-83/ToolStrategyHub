"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function CreatorBusinessModelPicker() {
    const [audienceType, setAudienceType] = useState("B2B"); // B2B, B2C, Entertainment
    const [size, setSize] = useState("Micro"); // Micro, Mid, Huge
    const [skills, setSkills] = useState("Writing"); // Writing, Video, Code, Coaching

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("creator-business-model-picker");
            tracked.current = true;
        }
    }, []);

    let recommendation = "";
    let desc = "";

    if (audienceType === "B2B") {
        if (size === "Micro") {
            recommendation = "High-Ticket Consulting";
            desc = "With a small, highly targeted B2B audience, you cannot make money on ads. You must sell your direct expertise for large retainers.";
        } else {
            recommendation = "B2B SaaS / Paid Newsletter";
            desc = "A large B2B audience is the holy grail. Convert attention into recurring software subscriptions or premium intel reports.";
        }
    } else if (audienceType === "B2C") {
        if (size === "Micro") {
            recommendation = "Digital Products / Courses";
            desc = "To monetize a small B2C audience, you need high margins. Sell $50-$150 digital courses to your true fans.";
        } else {
            recommendation = "Sponsorships / Memberships";
            desc = "Leverage volume. Sell highly targeted sponsorships and build a low-cost ($5-$10/mo) membership community.";
        }
    } else {
        // Entertainment
        if (size === "Huge") {
            recommendation = "AdSense + Brand Merch";
            desc = "Entertainment audiences are notoriously hard to convert to high-ticket items. Rely on massive volume AdSense, integrated sponsorships, and merch.";
        } else {
            recommendation = "Patreon / Crowdfunding";
            desc = "A small entertainment audience requires extreme loyalty. Use patronage models where super-fans fund your continued art.";
        }
    }

    const faqs = [
        { question: "Why does B2B differ from Entertainment?", answer: "A B2B follower might use your knowledge to make $10,000. They will gladly pay $500 for a course. An entertainment follower is just killing time and is unlikely to buy anything above $20." }
    ];

    const seoContent = (
        <>
            <h2>Stop Mixing Models</h2>
            <p>You cannot use a Mr. Beast monetization model (AdSense volume) on a highly technical B2B channel. Align the model to the audience archetype.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/builders-creators">Creators & Builders Hub</Link></li>
                <li><Link href="/tools/creator-monetization-calculator">Creator Monetization Calculator</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Creator Business Model Picker" description="Match your niche and audience to the highest leverage income stream." slug="creator-business-model-picker" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Audience Archetype</label>
                        <select value={audienceType} onChange={(e) => setAudienceType(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="B2B">B2B (Professionals, Founders, Tech)</option>
                            <option value="B2C">B2C (Fitness, Finance, Hobbyists)</option>
                            <option value="Entertainment">Entertainment (Comedy, Gaming, Vlogs)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Current Audience Size</label>
                        <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="Micro">Micro (under 10k engaged)</option>
                            <option value="Mid">Mid-Size (10k - 100k engaged)</option>
                            <option value="Huge">Huge Mass Market (100k+)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Core Creator Skillset</label>
                        <select value={skills} onChange={(e) => setSkills(e.target.value)} style={{ width: "100%", padding: "0.75rem", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <option value="Writing">Writing / Synthesis</option>
                            <option value="Video">Video Production / Speaking</option>
                            <option value="Code">Coding / Building Tools</option>
                            <option value="Coaching">1-on-1 Communication / Coaching</option>
                        </select>
                    </div>
                </div>

                <div className="card stagger-2" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 className="input-label" style={{ marginBottom: "1rem" }}>Optimal Monetization Engine</h3>
                    <div style={{ backgroundColor: "rgba(35, 134, 255, 0.1)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--accent-primary)", textAlign: "center", width: "100%" }}>
                        <div style={{ fontSize: "1.75rem", fontWeight: "bold", color: "var(--accent-primary)", marginBottom: "1rem" }}>{recommendation}</div>
                        <p style={{ color: "var(--text-primary)", fontSize: "1.125rem", lineHeight: 1.6 }}>{desc}</p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
