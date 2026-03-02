import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Audience Growth Estimator | Calculate Free & instantly',
    description: 'Model the compound effect of consistent monthly follower growth.',
    path: '/tools/audience-growth-estimator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
