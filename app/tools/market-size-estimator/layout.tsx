import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Market Size Estimator | Calculate Free & instantly',
    description: 'Calculate TAM, SAM, and SOM rapidly for your investor pitch deck.',
    path: '/tools/market-size-estimator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
