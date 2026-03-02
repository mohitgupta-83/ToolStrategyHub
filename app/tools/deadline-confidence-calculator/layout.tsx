import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Deadline Confidence Calculator | Calculate Free & instantly',
    description: 'Compute the mathematical probability of project delivery failure.',
    path: '/tools/deadline-confidence-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
