import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Research Discovery | Discover Untapped Market Gaps',
    description: 'A strategic decision tool to help you calculate and execute outcomes.',
    path: '/tools/research-discovery',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
