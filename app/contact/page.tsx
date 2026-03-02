"use client";

import { useState } from 'react';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate an API call
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header className="stagger-1" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    Contact Us
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    Feedback, partnership opportunities, or feature requests. Reach out below.
                </p>
            </header>

            <div className="stagger-2" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
                <div style={{ padding: '3rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    {status === 'success' ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>✓</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Message Received</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>We'll process your inquiry and get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className="input-label" htmlFor="name" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Name</label>
                                <input id="name" type="text" required placeholder="Jane Doe" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                            </div>

                            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className="input-label" htmlFor="email" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Email Address</label>
                                <input id="email" type="email" required placeholder="jane@company.com" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                            </div>

                            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className="input-label" htmlFor="inquiryType" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Inquiry Type</label>
                                <select id="inquiryType" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                                    <option>General Support</option>
                                    <option>Tool Idea / Feature Request</option>
                                    <option>Partnership Inquiry</option>
                                    <option>Bug Report</option>
                                </select>
                            </div>

                            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label className="input-label" htmlFor="message" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Message</label>
                                <textarea id="message" required placeholder="How can we help you execute better decisions?" style={{ width: '100%', height: '150px', padding: '1rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', resize: 'vertical' }} />
                            </div>

                            <button type="submit" className="btn" disabled={status === 'submitting'} style={{ marginTop: '1rem', padding: '1rem 2rem', fontSize: '1.125rem', opacity: status === 'submitting' ? 0.7 : 1 }}>
                                {status === 'submitting' ? 'Processing...' : 'Send Transmission'}
                            </button>
                        </form>
                    )}
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Prefer Email?</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        You can bypass the form and email us directly at: <a href="mailto:hello@toolstrategyhub.com" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>hello@toolstrategyhub.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
