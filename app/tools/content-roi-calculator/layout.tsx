import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Content ROI Calculator | Calculate Free & instantly',
    description: 'Compute the real financial return on your creative hours.',
    path: '/tools/content-roi-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
