import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Opportunity Ranking Board | Data-Driven Execution Logic',
    description: 'Rank multiple opportunities against one another.',
    path: '/tools/opportunity-ranking-tool',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
