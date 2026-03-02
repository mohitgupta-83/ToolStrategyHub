import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generatePageMetadata({
    title: 'Privacy Policy | ToolStrategyHub',
    description: 'Read the ToolStrategyHub Privacy Policy. Discover how we protect your data during client-side computations.',
    path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    Privacy Policy
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                    Last Updated: March {new Date().getFullYear()}
                </p>
            </header>

            <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p>
                    ToolStrategyHub ("we", "our", or "us") operates the website located at ToolStrategyHub.com. This Privacy Policy outlines our uncompromising stance on data collection and user privacy. We designed our architecture explicitly to minimize data liability.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Client-Side Execution Guarantee</h2>
                <p>
                    The vast majority of our computational tools, calculators, and validators execute <strong>locally within your browser session</strong> (via client-side JavaScript). This means that any strategic or financial parameters you input into our tools (e.g., revenue models, idea specifics, burn rates) are never transmitted to, stored on, or processed by our backend servers.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Data We Do Not Collect</h2>
                <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Tool Inputs:</strong> We do not log or store the numbers, variables, or text you type into calculators.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Personally Identifiable Information (PII):</strong> Unless explicitly provided via our contact form or newsletter opt-in, we do not require accounts, logins, or PII.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Financial Information:</strong> We do not process payments directly on the frontend calculators.</li>
                </ul>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Data We Do Collect</h2>
                <p>
                    To operate effectively and improve our strategic algorithms, we collect anonymous, non-identifying metrics, including:
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Traffic Analytics:</strong> Page views, session duration, and referral sources (e.g., Google Analytics or similar cookieless telemetry).</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Tool Popularity:</strong> We track which tools are launched locally to understand which business logic categories are most in demand.</li>
                    <li><strong style={{ color: 'var(--text-primary)' }}>Contact Inquiries:</strong> If you voluntarily email us or submit a contact form, we retain that correspondence to fulfill your request.</li>
                </ul>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Cookies & Tracking Technologies</h2>
                <p>
                    We use standard web cookies to ensure basic site functionality and analyze aggregate traffic patterns. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Doing so will not break the mathematical algorithms powering the tools, though standard website features may be degraded.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>5. Third-Party Services</h2>
                <p>
                    We may employ third-party companies (e.g., Vercel for hosting, analytical providers) to facilitate our services. These third-parties have access to your raw network requests (e.g., User-Agent, IP address) only to perform infrastructure tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>6. Changes to This Policy</h2>
                <p>
                    We may update our Privacy Policy periodically. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>7. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us by visiting our <Link href="/contact" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Contact Page</Link>.
                </p>
            </article>
        </div>
    );
}
