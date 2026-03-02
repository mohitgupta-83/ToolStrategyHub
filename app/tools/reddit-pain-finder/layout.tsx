import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Reddit Problem & Pain-Point Finder | Discover Untapped Market Gaps',
    description: 'Paste Reddit threads to instantly detect frustration phrases, unmet needs, and repeated problem signals.',
    path: '/tools/reddit-pain-finder',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
