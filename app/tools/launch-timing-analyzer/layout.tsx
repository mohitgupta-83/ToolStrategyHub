import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Launch Timing Analyzer | Discover Untapped Market Gaps',
    description: 'Identify the golden window for GTM deployment.',
    path: '/tools/launch-timing-analyzer',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
