import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Weighted Decision Matrix Builder | Data-Driven Execution Logic',
    description: 'Make objective, bias-free decisions by scoring competing options against weighted criteria mathematically.',
    path: '/tools/decision-matrix-builder',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
