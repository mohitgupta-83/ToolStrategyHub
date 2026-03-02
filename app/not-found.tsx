import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <Image
                src="/brand/logo-main.png"
                alt="ToolStrategyHub Icon"
                width={64}
                height={64}
                style={{ width: 'auto', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.4))' }}
            />
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>404 - Page Not Found</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '500px' }}>
                We couldn't find the strategy tool or resource you're looking for. It might have been moved or doesn't exist.
            </p>
            <Link href="/" className="btn" style={{ padding: '0.75rem 2rem' }}>
                Return to Dashboard
            </Link>
        </div>
    );
}
