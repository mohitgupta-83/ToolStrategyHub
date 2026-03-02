import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Product-Market Fit Score | Data-Driven Execution Logic',
    description: 'Are you ready to scale, or do you need to keep iterating? Calculate your PMF.',
    path: '/tools/product-market-fit-score',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
