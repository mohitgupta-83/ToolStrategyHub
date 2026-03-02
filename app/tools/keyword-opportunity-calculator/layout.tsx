import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Keyword Opportunity Calculator | Calculate Free & instantly',
    description: 'Identify high-ROAS, low-KD organic targets.',
    path: '/tools/keyword-opportunity-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
