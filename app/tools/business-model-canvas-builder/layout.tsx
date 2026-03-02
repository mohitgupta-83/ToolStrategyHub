import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Business Model Canvas Builder | Data-Driven Execution Logic',
    description: 'Map, discuss, and design your entire operational business model on a single visual dashboard before you write code.',
    path: '/tools/business-model-canvas-builder',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
