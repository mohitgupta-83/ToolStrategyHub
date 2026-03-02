import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Freelance Project Pricing Matrix | Model Your Profit Margins',
    description: 'Calculate the perfect fixed-bid project price by injecting risk buffers, complexity multipliers, and overhead metrics into your raw time estimate.',
    path: '/tools/freelance-project-pricing-matrix',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
