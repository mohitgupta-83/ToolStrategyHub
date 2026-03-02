import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Feature Priority Matrix | Data-Driven Execution Logic',
    description: 'Find the high-impact quick wins in your feature backlog.',
    path: '/tools/feature-priority-matrix',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
