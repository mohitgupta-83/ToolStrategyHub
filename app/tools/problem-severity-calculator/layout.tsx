import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Problem Severity Calculator | Calculate Free & instantly',
    description: 'Is your problem a vitamin or a painkiller? Calculate its actual severity.',
    path: '/tools/problem-severity-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
