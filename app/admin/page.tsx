/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchStats = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/stats");
            if (res.status === 401) {
                router.push("/admin/login");
                return;
            }
            const json = await res.json();
            if (json.success) setData(json.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const handleExportCSV = () => {
        if (!data) return;
        const headers = "Slug,Name,Views,Usage,Conversion Rate %,Last Active Activity\n";
        const rows = data.topTools.map((t: any) => `${t.slug},${t.name},${t.views},${t.usage},${t.conversion},"${t.lastActive}"`).join("\n");
        const blob = new Blob([headers + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `toolkit_export_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const drawSVGSpline = (timeseries: any[]) => {
        if (!timeseries || timeseries.length === 0) return null;

        // Sort oldest to newest for the graph
        const sorted = [...timeseries].reverse();
        const maxViews = Math.max(...sorted.map((d: any) => d.views), 1);

        // SVG is 1000px wide, 200px tall
        const w = 1000;
        const h = 200;
        const xStep = w / (sorted.length - 1);

        // Create Polyline points
        const points = sorted.map((d: any, i: number) => {
            const x = i * xStep;
            // y = 0 is top of SVG. Data starts from bottom (h)
            const y = h - ((d.views / maxViews) * h * 0.9); // 10% padding
            return `${x},${y}`;
        });

        // Create a polygon base for the glow
        const polygonPoints = `0,${h} ${points.join(" ")} ${w},${h}`;

        return (
            <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
                <defs>
                    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--admin-accent)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--admin-accent)" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Fill Area with Animation Delay style */}
                <polygon
                    points={polygonPoints}
                    fill="url(#glow)"
                    style={{ animation: "slideUp 1s ease forwards" }}
                />

                {/* Connecting Line */}
                <polyline
                    points={points.join(" ")}
                    fill="none"
                    stroke="var(--admin-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        filter: "drop-shadow(0px 0px 8px var(--admin-accent-glow))"
                    }}
                />

                {/* Hover Points */}
                {sorted.map((d: any, i: number) => {
                    const x = i * xStep;
                    const y = h - ((d.views / maxViews) * h * 0.9);
                    return (
                        <g key={i} className="chart-bar-wrap">
                            {/* Invisible exact point for hover triggering via CSS or JS. SVG hover is trickier pure CSS without breaking. We'll skip complex tooltips here for brevity or just use circles */}
                            <circle cx={x} cy={y} r="5" fill="#000" stroke="var(--admin-accent)" strokeWidth="2" style={{ cursor: "crosshair", transition: "all 0.2s" }} />
                            <text x={x} y={y - 15} fill="#fff" fontSize="12" textAnchor="middle" opacity="0.8">
                                {d.views > 0 ? d.views : ""}
                            </text>
                        </g>
                    );
                })}
            </svg>
        );
    }

    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "var(--admin-accent)" }}>[ CONNECTING TO DATABANK... ]</div>;
    }

    if (!data) return <div>Failed to load stats.</div>;

    const maxToolUsage = Math.max(...data.topTools.map((t: any) => t.usage), 1);

    return (
        <>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--admin-border)", paddingBottom: "1rem" }}>
                <div className="admin-header-title" style={{ display: "flex", alignItems: "center", gap: "12px", margin: 0 }}>
                    <img
                        src="/brand/logo-main.png"
                        alt="Logo"
                        style={{ width: '28px', height: 'auto', filter: 'drop-shadow(0 0 8px var(--admin-accent))' }}
                    />
                    SYS.ADMIN.DASHBOARD
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={fetchStats} className="admin-btn">Reroute Feed</button>
                    <button onClick={handleExportCSV} className="admin-btn">Extract Datadump (CSV)</button>
                    <Link href="/" className="admin-btn" style={{ borderColor: "var(--admin-border)", color: "var(--admin-text-muted)" }}>&larr; Exit Net</Link>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="admin-grid">
                <div className="admin-glass-panel">
                    <div className="admin-stat-label">Total Unique Entities</div>
                    <div className="admin-stat-value">{data.globalVisitors.toLocaleString()}</div>
                </div>
                <div className="admin-glass-panel">
                    <div className="admin-stat-label">Total Node Views</div>
                    <div className="admin-stat-value">{data.globalViews.toLocaleString()}</div>
                </div>
                <div className="admin-glass-panel">
                    <div className="admin-stat-label">Total Algorithm Executions</div>
                    <div className="admin-stat-value">{data.globalUsage.toLocaleString()}</div>
                </div>
                <div className="admin-glass-panel" style={{ borderColor: "var(--admin-accent)", boxShadow: "0 0 15px rgba(0, 240, 255, 0.1) inset" }}>
                    <div className="admin-stat-label" style={{ color: "var(--admin-accent)" }}>System Conversion Rate</div>
                    <div className="admin-stat-value admin-stat-highlight">{data.conversionRate}%</div>
                </div>
            </div>

            {/* Main Charts Grid */}
            <div className="admin-grid" style={{ gridTemplateColumns: "2fr 1fr" }}>

                {/* Timeseries SVG */}
                <div className="admin-glass-panel">
                    <div className="admin-stat-label" style={{ marginBottom: "2rem" }}>Network Flow: Node Views (T-minus 30 Days)</div>
                    <div style={{ width: "100%", height: "250px", position: "relative" }}>
                        {drawSVGSpline(data.timeseries)}
                    </div>
                </div>

                {/* Top Tools Bar Chart */}
                <div className="admin-glass-panel" style={{ display: "flex", flexDirection: "column" }}>
                    <div className="admin-stat-label" style={{ marginBottom: "1rem" }}>Top Node Executions</div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>
                        {data.topTools.slice(0, 5).map((tool: any, i: number) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "100px", fontSize: "0.75rem", color: "var(--admin-text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {tool.name}
                                </div>
                                <div style={{ flex: 1, height: "8px", backgroundColor: "#000", border: "1px solid var(--admin-border)", borderRadius: "4px", overflow: "hidden" }}>
                                    <div
                                        style={{
                                            width: `${Math.max((tool.usage / maxToolUsage) * 100, 2)}%`,
                                            height: "100%",
                                            backgroundColor: "var(--admin-accent)",
                                            boxShadow: "0 0 8px var(--admin-accent)",
                                            transition: "width 1s ease"
                                        }}
                                    />
                                </div>
                                <div style={{ width: "40px", textAlign: "right", fontSize: "0.875rem", fontFamily: "var(--admin-font-mono)", color: "var(--admin-accent)" }}>
                                    {tool.usage}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Data Table */}
            <div className="admin-glass-panel" style={{ marginTop: "1.5rem" }}>
                <div className="admin-stat-label">Detailed Tool Matrix</div>
                <div style={{ overflowX: "auto" }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Identifier</th>
                                <th>Views</th>
                                <th>Executions</th>
                                <th>Conversion (%)</th>
                                <th>Last Ping</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.topTools.map((t: any, idx: number) => (
                                <tr key={idx}>
                                    <td style={{ color: "#fff", fontWeight: "bold" }}>/{t.slug}</td>
                                    <td style={{ fontFamily: "var(--admin-font-mono)" }}>{t.views.toLocaleString()}</td>
                                    <td style={{ fontFamily: "var(--admin-font-mono)", color: "var(--admin-accent)" }}>{t.usage.toLocaleString()}</td>
                                    <td style={{ fontFamily: "var(--admin-font-mono)" }}>{t.conversion}%</td>
                                    <td style={{ fontFamily: "var(--admin-font-mono)", color: "var(--admin-text-muted)" }}>{t.lastActive}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
