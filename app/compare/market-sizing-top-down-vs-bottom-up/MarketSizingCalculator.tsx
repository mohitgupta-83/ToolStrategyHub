'use client';

import { useState } from 'react';

function formatCurrency(value: number): string {
    if (value >= 1_000_000_000) {
        return `$${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
        return `$${(value / 1_000).toFixed(1)}K`;
    }
    return `$${value.toLocaleString()}`;
}

export default function MarketSizingCalculator() {
    const [customers, setCustomers] = useState<string>('50000');
    const [arpu, setArpu] = useState<string>('1200');
    const [addressable, setAddressable] = useState<string>('40');
    const [penetration, setPenetration] = useState<string>('5');

    const customerCount = parseFloat(customers) || 0;
    const arpuVal = parseFloat(arpu) || 0;
    const addressablePct = parseFloat(addressable) / 100 || 0;
    const penetrationPct = parseFloat(penetration) / 100 || 0;

    const tam = customerCount * arpuVal;
    const sam = tam * addressablePct;
    const som = sam * penetrationPct;

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        marginBottom: '0.4rem',
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        fontWeight: 600,
    };

    const resultRowStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
    };

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
        }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                TAM / SAM / SOM Calculator
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Enter your market parameters below to calculate your addressable market size instantly.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                    <label style={labelStyle}>Total Target Customers</label>
                    <input
                        type="number"
                        value={customers}
                        onChange={e => setCustomers(e.target.value)}
                        placeholder="e.g. 50000"
                        style={inputStyle}
                        min="0"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>
                        e.g. companies in your target category
                    </span>
                </div>

                <div>
                    <label style={labelStyle}>Avg. Annual Revenue per Customer ($)</label>
                    <input
                        type="number"
                        value={arpu}
                        onChange={e => setArpu(e.target.value)}
                        placeholder="e.g. 1200"
                        style={inputStyle}
                        min="0"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>
                        Annual subscription or contract value
                    </span>
                </div>

                <div>
                    <label style={labelStyle}>Addressable Market % (SAM filter)</label>
                    <input
                        type="number"
                        value={addressable}
                        onChange={e => setAddressable(e.target.value)}
                        placeholder="e.g. 40"
                        style={inputStyle}
                        min="0"
                        max="100"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>
                        % you can realistically reach/serve
                    </span>
                </div>

                <div>
                    <label style={labelStyle}>Realistic Market Penetration % (SOM)</label>
                    <input
                        type="number"
                        value={penetration}
                        onChange={e => setPenetration(e.target.value)}
                        placeholder="e.g. 5"
                        style={inputStyle}
                        min="0"
                        max="100"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>
                        % of SAM you can realistically capture
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ ...resultRowStyle, borderColor: 'var(--border-color)' }}>
                    <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>TAM</span>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Total Addressable Market = {customers || '0'} customers × ${arpu || '0'}/yr
                        </p>
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {formatCurrency(tam)}
                    </span>
                </div>

                <div style={{ ...resultRowStyle, borderColor: 'var(--accent-primary)' }}>
                    <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SAM</span>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Serviceable Available Market = TAM × {addressable || '0'}%
                        </p>
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                        {formatCurrency(sam)}
                    </span>
                </div>

                <div style={{ ...resultRowStyle, borderColor: 'var(--accent-primary)', backgroundColor: 'rgba(16,185,129,0.07)' }}>
                    <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SOM</span>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Serviceable Obtainable Market = SAM × {penetration || '0'}%
                        </p>
                    </div>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                        {formatCurrency(som)}
                    </span>
                </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1.25rem', opacity: 0.7 }}>
                All calculations run locally in your browser. No data is sent to any server.
            </p>
        </div>
    );
}
