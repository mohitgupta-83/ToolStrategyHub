import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Niche Saturation Score | Data-Driven Execution Logic',
    description: 'Calculate the relative density of competitors against market demand.',
    path: '/tools/niche-saturation-score',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
