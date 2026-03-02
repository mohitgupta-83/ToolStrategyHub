import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Operations Productivity | Scale Your Execution',
    description: 'A strategic decision tool to help you calculate and execute outcomes.',
    path: '/tools/operations-productivity',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
