import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Manual Workflow Cost Calculator | Calculate Free & instantly',
    description: 'Calculate the silent financial drain of manual workflows and determine the exact ROI threshold for automating internal processes.',
    path: '/tools/workflow-cost-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
