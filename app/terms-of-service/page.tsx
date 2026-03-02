import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generatePageMetadata({
    title: 'Terms of Service | ToolStrategyHub',
    description: 'Read the ToolStrategyHub Terms of Service. Understand the limitations, liabilities, and intellectual property governing our business calculators.',
    path: '/terms-of-service',
});

export default function TermsOfServicePage() {
    return (
        <div className="container" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header className="stagger-1" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                    Terms of Service
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                    Last Updated: March {new Date().getFullYear()}
                </p>
            </header>

            <article className="stagger-2" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p>
                    Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the ToolStrategyHub.com website (the "Service") operated by ToolStrategyHub ("us", "we", or "our").
                </p>

                <p>
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                </p>

                <p style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Informational Purposes Only (No Financial or Legal Advice)</h2>
                <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', marginTop: '1rem', marginBottom: '1rem' }}>
                    <p style={{ margin: 0, fontStyle: 'italic', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                        THE CALCULATORS, MATRICES, AND STRATEGY TOOLS PROVIDED ON TOOLSTRATEGYHUB ARE FOR EDUCATIONAL, THEORETICAL, AND INFORMATIONAL PURPOSES ONLY. THEY DO NOT CONSTITUTE BINDING FINANCIAL, LEGAL, OR BUSINESS ADVICE.
                    </p>
                </div>
                <p>
                    Your specific business circumstances—including tax liabilities, local regulations, market constraints, and hardware overhead—are entirely unique. While we attempt to use rigorously accurate algorithms (such as standard amortization formulas or SaaS margin calculations), you must consult a certified financial planner (CFP), accountant (CPA), or attorney before executing high-stakes decisions based on our models. We accept zero liability for any capital losses, strategic failures, or bankruptcies derived from the usage of our tools.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Use License and Intellectual Property</h2>
                <p>
                    Permission is granted to temporarily download one copy of the materials (information or frontend software) on ToolStrategyHub's website for personal, non-commercial transitory viewing only.
                </p>
                <p>
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>Modify, copy, or scrape the core HTML/CSS/JavaScript.</li>
                    <li>Attempt to decompile or reverse engineer the mathematical algorithms housed on ToolStrategyHub.</li>
                    <li>Remove any copyright, trademark, or other proprietary notations from the materials.</li>
                    <li>"Mirror" the materials on any other server or wholesale rip the calculator interfaces and claim them as your own agency's work product.</li>
                </ul>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Disclaimer of Warranties</h2>
                <p>
                    The materials on ToolStrategyHub's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p>
                    Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this platform.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Limitations on Liability</h2>
                <p>
                    In no event shall ToolStrategyHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ToolStrategyHub's website, even if ToolStrategyHub or a ToolStrategyHub authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>5. Accuracy of Materials</h2>
                <p>
                    The materials appearing on ToolStrategyHub's website could include technical, typographical, or mathematical errors. We do not warrant that any of the materials on its website are accurate, complete or current. We may make changes to the materials contained on its website at any time without notice.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>6. Links to Other Websites</h2>
                <p>
                    Our Service may contain links to third-party web sites or services that are not owned or controlled by ToolStrategyHub. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that ToolStrategyHub shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                </p>

                <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>7. Modification of Terms</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>
            </article>
        </div>
    );
}
