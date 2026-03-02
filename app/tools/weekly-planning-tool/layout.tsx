import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Weekly Planning Constraints | Data-Driven Execution Logic',
    description: 'Force constraints onto your task list to separate reality from optimism.',
    path: '/tools/weekly-planning-tool',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
