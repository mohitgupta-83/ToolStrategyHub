import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Content Idea Profit Score | Test Before You Build',
    description: 'Calculate the expected profitability of a content idea based on market dynamics.',
    path: '/tools/content-idea-profit-score',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
