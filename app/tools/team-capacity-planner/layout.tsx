import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Team Capacity Planner | Scale Your Execution',
    description: 'Measure true engineering throughput and avoid delivery failure.',
    path: '/tools/team-capacity-planner',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
