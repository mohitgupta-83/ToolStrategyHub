import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Posting Frequency Optimizer | Data-Driven Execution Logic',
    description: 'Calculate your true capacity for content generation.',
    path: '/tools/posting-frequency-optimizer',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
