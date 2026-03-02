import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'MVP Scope Calculator | Calculate Free & instantly',
    description: 'Match your feature ambitions against your actual bandwidth.',
    path: '/tools/mvp-scope-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
