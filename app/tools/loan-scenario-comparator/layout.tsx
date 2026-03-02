import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Loan Scenario Comparator | Data-Driven Execution Logic',
    description: 'Compare up to 3 amortization scenarios side-by-side. See exactly how extra monthly payments wipe out years of compound interest.',
    path: '/tools/loan-scenario-comparator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
