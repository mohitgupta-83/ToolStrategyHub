import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Business Valuation Calculator | Calculate Free & instantly',
    description: 'Estimate your company',
    path: '/tools/business-valuation-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
