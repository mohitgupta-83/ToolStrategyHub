import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Construction Cost Estimator | Calculate Free & instantly',
    description: 'Calculate job costs including material waste, labor, equipment, markup, and explicitly budgeted risk buffers to protect your margin.',
    path: '/tools/construction-cost-estimator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
