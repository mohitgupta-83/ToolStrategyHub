"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header style={{
            borderBottom: '1px solid var(--border-color)',
            padding: '1.25rem 0',
            marginBottom: '2rem',
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(15, 17, 21, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" className="brand-logo" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    zIndex: 101,
                    textDecoration: 'none'
                }}>
                    <div className="logo-icon-wrapper" style={{ display: 'flex', alignItems: 'center', transition: 'filter 0.3s ease' }}>
                        <Image
                            src="/brand/logo-main.png"
                            alt="ToolStrategyHub Icon"
                            width={32}
                            height={32}
                            style={{ width: 'auto' }}
                            className="logo-icon"
                        />
                    </div>
                    <span>ToolStrategy<span style={{ color: 'var(--accent-primary)' }}>Hub</span></span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-nav" style={{ display: 'none', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/" style={{ fontSize: '0.875rem', fontWeight: 500, color: pathname === '/' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>Home</Link>
                    <Link href="/tools" style={{ fontSize: '0.875rem', fontWeight: 500, color: pathname.includes('/tools') ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>Tools</Link>
                    <Link href="/tools#categories" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Categories</Link>
                    <Link href="/blog" style={{ fontSize: '0.875rem', fontWeight: 500, color: pathname.includes('/blog') ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>Guides</Link>
                    <Link href="/about" style={{ fontSize: '0.875rem', fontWeight: 500, color: pathname === '/about' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>About</Link>
                    <Link href="/tools" className="btn" style={{ padding: '0.5rem 1rem' }}>Explore All Tools</Link>
                </nav>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        zIndex: 101
                    }}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Navigation Panel */}
                <div
                    className="mobile-nav-panel"
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: isMobileMenuOpen ? 0 : '-100%',
                        width: '100%',
                        height: '100vh',
                        backgroundColor: 'var(--bg-primary)',
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '6rem 2rem 2rem',
                        gap: '1.5rem',
                        transition: 'right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 500, padding: '1rem 0', borderBottom: '1px solid var(--border-color)', color: pathname === '/' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>Home</Link>
                    <Link href="/tools" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 500, padding: '1rem 0', borderBottom: '1px solid var(--border-color)', color: pathname.includes('/tools') ? 'var(--accent-primary)' : 'var(--text-primary)' }}>All Tools</Link>
                    <Link href="/tools#categories" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 500, padding: '1rem 0', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>Categories</Link>
                    <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 500, padding: '1rem 0', borderBottom: '1px solid var(--border-color)', color: pathname.includes('/blog') ? 'var(--accent-primary)' : 'var(--text-primary)' }}>Guides & Strategy</Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 500, padding: '1rem 0', borderBottom: '1px solid var(--border-color)', color: pathname === '/about' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>About Us</Link>

                    <Link href="/tools" onClick={() => setIsMobileMenuOpen(false)} className="btn" style={{ marginTop: 'auto', padding: '1.25rem', fontSize: '1.125rem' }}>Explore All Tools</Link>
                </div>
            </div>

            <style jsx>{`
                .brand-logo:hover .logo-icon-wrapper {
                    filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.6));
                }
                .logo-icon {
                    height: 28px;
                    width: auto;
                }
                @media (min-width: 768px) {
                    .logo-icon {
                        height: 32px;
                    }
                    .desktop-nav {
                        display: flex !important;
                    }
                    .mobile-menu-toggle {
                        display: none !important;
                    }
                    .mobile-nav-panel {
                        display: none !important;
                    }
                }
            `}</style>
        </header>
    );
}
