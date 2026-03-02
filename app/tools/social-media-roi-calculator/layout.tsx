import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Social Media ROI Calculator | Calculate Free & instantly',
    description: 'Stop tracking vanity metrics. Calculate your actual financial return by factoring in labor, production costs, and lead conversion rates.',
    path: '/tools/social-media-roi-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
