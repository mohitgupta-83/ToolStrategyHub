"use client";
import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function WeeklyPlanningTool() {
    const [tasks, setTasks] = useState([{ id: 1, name: "Strategic Deep Work", hours: 10, priority: 1 }]);
    const [availableHours, setAvailableHours] = useState(40);

    const tracked = useRef(false);
    useEffect(() => {
        if (!tracked.current) {
            trackUsage("weekly-planning-tool");
            tracked.current = true;
        }
    }, []);

    const addTask = () => {
        const id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        setTasks([...tasks, { id, name: `Task ${id}`, hours: 2, priority: 2 }]);
    };

    const updateTask = (id: number, field: string, value: string | number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);

    let consumedHours = 0;
    const computedTasks = sortedTasks.map(task => {
        const startsAt = consumedHours;
        const fits = startsAt < availableHours;
        const partialFit = startsAt < availableHours && (startsAt + task.hours) > availableHours;
        consumedHours += task.hours;

        const status = fits ? (partialFit ? "Partial Fit" : "Will Complete") : "Over Capacity";
        return { ...task, status, startsAt };
    });

    const isOverloaded = consumedHours > availableHours;

    const faqs = [
        { question: "Why map hours strictly to priority?", answer: "Humans routinely plan 60 hours of work for a 40 hour week. By sorting rigidly by priority, the system explicitly shows you exactly which low-priority tasks will fail." }
    ];

    const seoContent = (
        <>
            <h2>Defeating the Planning Fallacy</h2>
            <p>A to-do list without hour constraints is a wishlist. True execution requires budgeting time the same way you budget capital.</p>
            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/tools/operations-productivity">Operations & Productivity Hub</Link></li>
                <li><Link href="/tools/team-capacity-planner">Team Capacity Planner</Link></li>
                <li><Link href="/tools/deadline-confidence-calculator">Deadline Confidence Calculator</Link></li>
                <li><Link href="/tools/decision-matrix-builder">Decision Matrix Builder</Link></li>
            </ul>
        </>
    );

    return (
        <ToolLayout title="Weekly Planning Constraints" description="Force constraints onto your task list to separate reality from optimism." slug="weekly-planning-tool" faqs={faqs} seoContent={seoContent}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
                <div className="card stagger-1" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h3 className="input-label" style={{ margin: 0 }}>Task Input</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Weekly Hour Limit:</span>
                            <input type="number" value={availableHours} onChange={(e) => setAvailableHours(Number(e.target.value))} style={{ width: "80px", padding: "0.5rem", borderRadius: "1rem", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)", fontFamily: "var(--font-mono)", textAlign: "center" }} />
                        </div>
                    </div>

                    {tasks.map(t => (
                        <div key={t.id} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <input type="text" value={t.name} onChange={(e) => updateTask(t.id, "name", e.target.value)} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.25rem", border: "none", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }} placeholder="Task name" />

                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Priority</label>
                                <input type="number" min="1" max="100" value={t.priority} onChange={(e) => updateTask(t.id, "priority", Number(e.target.value))} style={{ width: "60px", padding: "0.5rem", borderRadius: "0.25rem", border: "none", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", textAlign: "center" }} />
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Hours</label>
                                <input type="number" min="1" value={t.hours} onChange={(e) => updateTask(t.id, "hours", Number(e.target.value))} style={{ width: "60px", padding: "0.5rem", borderRadius: "0.25rem", border: "none", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", textAlign: "center" }} />
                            </div>

                            <button onClick={() => removeTask(t.id)} style={{ color: "var(--error-color)", background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", padding: "0.25rem" }}>×</button>
                        </div>
                    ))}

                    <button onClick={addTask} className="pill hover:border-accent" style={{ background: "var(--bg-secondary)", border: "1px dashed var(--border-color)", padding: "1rem", width: "100%", cursor: "pointer", color: "var(--text-secondary)" }}>+ Add Task</button>
                </div>

                <div className="card stagger-2 sticky" style={{ top: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
                        <h3 className="input-label" style={{ margin: 0 }}>Reality Check execution</h3>
                        <div style={{ fontSize: "1.25rem", fontFamily: "var(--font-mono)", color: isOverloaded ? "var(--error-color)" : "var(--accent-primary)", fontWeight: "bold" }}>
                            {consumedHours} / {availableHours} hrs
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {computedTasks.map((t, idx) => {
                            let statusColor = "var(--text-secondary)";
                            let bgColor = "var(--bg-tertiary)";
                            let border = "1px solid var(--border-color)";
                            let applyOpacity = false;

                            if (t.status === "Will Complete") {
                                statusColor = "var(--accent-primary)";
                                bgColor = "rgba(35, 134, 255, 0.05)";
                                border = "1px solid rgba(35, 134, 255, 0.3)";
                            } else if (t.status === "Over Capacity") {
                                statusColor = "var(--error-color)";
                                applyOpacity = true;
                            } else if (t.status === "Partial Fit") {
                                statusColor = "#f59e0b"; // Warning amber
                            }

                            return (
                                <div key={idx} style={{ padding: "1rem", backgroundColor: bgColor, borderRadius: "var(--radius-sm)", border: border, opacity: applyOpacity ? 0.6 : 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <div style={{ color: "var(--text-primary)", fontWeight: "bold" }}>{t.name}</div>
                                        <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Priority: {t.priority} • {t.hours} hrs</div>
                                    </div>
                                    <div style={{ fontSize: "0.875rem", fontWeight: "bold", textTransform: "uppercase", color: statusColor, padding: "0.25rem 0.5rem", borderRadius: "1rem", border: `1px solid ${statusColor}` }}>
                                        {t.status}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
