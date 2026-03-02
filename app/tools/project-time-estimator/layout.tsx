import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Project Time Estimation Calculator | Calculate Free & instantly',
    description: 'Generate realistic software project timelines by factoring in Brooks&apos;s law, team velocity, and dynamic uncertainty buffers.',
    path: '/tools/project-time-estimator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
