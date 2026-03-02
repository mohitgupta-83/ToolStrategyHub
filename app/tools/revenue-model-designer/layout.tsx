import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Revenue Model Designer | Model Your Profit Margins',
    description: 'Architect the correct monetization strategy based on your audience, product type, and acquisition vector.',
    path: '/tools/revenue-model-designer',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
