import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Freelance Rate Calculator | Calculate Free & instantly',
    description: 'Don',
    path: '/tools/freelance-rate-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
