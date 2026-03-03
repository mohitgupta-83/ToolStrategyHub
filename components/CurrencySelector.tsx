"use client";

import { useEffect, useState } from "react";
import { CurrencyCode, CURRENCY_RATES } from "@/lib/currencyRates";

interface CurrencySelectorProps {
    currency: CurrencyCode;
    onChange: (currency: CurrencyCode) => void;
}

export default function CurrencySelector({ currency, onChange }: CurrencySelectorProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem", fontWeight: 600 }}>
                Currency
            </label>
            <div style={{ position: "relative" }}>
                <select
                    value={currency}
                    onChange={(e) => onChange(e.target.value as CurrencyCode)}
                    style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        backgroundColor: "var(--bg-tertiary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                        fontFamily: "var(--font-sans)",
                        appearance: "none",
                        cursor: "pointer",
                        outline: "none",
                    }}
                >
                    {Object.keys(CURRENCY_RATES).map((code) => (
                        <option key={code} value={code}>
                            {code} ({CURRENCY_RATES[code as CurrencyCode].symbol})
                        </option>
                    ))}
                </select>
                <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-secondary)" }}>
                    ▼
                </div>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Calculations are processed in USD internally for consistency.
            </p>
        </div>
    );
}
