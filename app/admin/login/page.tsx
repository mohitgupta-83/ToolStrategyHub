"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
            }
        } catch {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <div className="admin-glass-panel" style={{ width: "100%", maxWidth: "400px" }}>
                <div className="admin-header-title" style={{ marginBottom: "2rem", justifyContent: "center" }}>
                    SYS.ADMIN.AUTH
                </div>

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <label className="admin-stat-label">Enter Passphrase</label>
                        <input
                            type="password"
                            className="admin-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••••"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div style={{ color: "#ff4444", fontSize: "0.875rem", fontFamily: "var(--admin-font-mono)", borderLeft: "2px solid #ff4444", paddingLeft: "0.5rem" }}>
                            ERR: {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="admin-btn"
                        style={{ marginTop: "1rem", width: "100%", padding: "0.75rem" }}
                        disabled={loading}
                    >
                        {loading ? "Authenticating..." : "Initialize Session"}
                    </button>
                </form>
            </div>
        </div>
    );
}
