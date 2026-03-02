import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Idea Comparison Tool | Test Before You Build',
    description: 'Rank multiple ideas side-by-side to find the ultimate winner.',
    path: '/tools/idea-comparison-tool',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
