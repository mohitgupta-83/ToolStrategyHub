import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Creator Monetization Funnel | Model Your Profit Margins',
    description: 'Model your funnel from total followers to net revenue.',
    path: '/tools/creator-monetization-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
