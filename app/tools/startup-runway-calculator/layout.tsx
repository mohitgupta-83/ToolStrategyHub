import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Startup Runway Calculator | Calculate Free & instantly',
    description: 'Determine your net burn rate and exact cash runway before you run out of capital.',
    path: '/tools/startup-runway-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
