import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Newsletter Growth Calculator | Calculate Free & instantly',
    description: 'Model subscriber list velocity against expected churn parameters.',
    path: '/tools/newsletter-growth-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
