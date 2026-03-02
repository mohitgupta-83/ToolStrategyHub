import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Pricing Psychology Optimizer | Model Your Profit Margins',
    description: 'Calculate the optimal psychological pricing strategy based on human cognitive biases and value perception.',
    path: '/tools/pricing-psychology-optimizer',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
