import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Startup Readiness Score | Data-Driven Execution Logic',
    description: 'Calculate if you are fundamentally ready to pour capital into growth.',
    path: '/tools/startup-readiness-score',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
