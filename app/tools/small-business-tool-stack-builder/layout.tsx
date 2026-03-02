import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Small Business Tool Stack Builder | Data-Driven Execution Logic',
    description: 'Stop paying for bloatware. Generate a custom, lean software stack based on your exact business archetype and budget.',
    path: '/tools/small-business-tool-stack-builder',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
