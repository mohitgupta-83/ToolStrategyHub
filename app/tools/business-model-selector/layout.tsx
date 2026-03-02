import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Business Model Selector | Data-Driven Execution Logic',
    description: 'Choose the right monetization mechanics based on your audience.',
    path: '/tools/business-model-selector',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
