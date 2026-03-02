import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Viral Potential Score | Data-Driven Execution Logic',
    description: 'Rank your content',
    path: '/tools/viral-potential-score',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
