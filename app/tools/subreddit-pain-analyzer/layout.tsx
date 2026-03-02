import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Subreddit Pain Frequency Analyzer | Discover Untapped Market Gaps',
    description: 'Paste 10+ Reddit posts to detect the top recurring complaint themes, ranked by frequency and urgency.',
    path: '/tools/subreddit-pain-analyzer',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
