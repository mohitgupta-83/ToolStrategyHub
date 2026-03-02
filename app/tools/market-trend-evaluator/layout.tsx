import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Market Trend Evaluator | Data-Driven Execution Logic',
    description: 'Quantify trend longevity.',
    path: '/tools/market-trend-evaluator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
