import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Competitor Gap Analyzer | Discover Untapped Market Gaps',
    description: 'Calculate the viability of competing against incumbents.',
    path: '/tools/competitor-gap-analyzer',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
