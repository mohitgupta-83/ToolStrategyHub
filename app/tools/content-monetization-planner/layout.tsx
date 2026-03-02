import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Content Monetization Planner | Model Your Profit Margins',
    description: 'Map out a phased revenue strategy based on your audience size, host platform, and lifestyle preferences.',
    path: '/tools/content-monetization-planner',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
