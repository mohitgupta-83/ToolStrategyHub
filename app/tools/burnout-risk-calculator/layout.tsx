import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Burnout Risk Calculator | Calculate Free & instantly',
    description: 'Compute the psychological drag coefficient on your team using task inputs.',
    path: '/tools/burnout-risk-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
