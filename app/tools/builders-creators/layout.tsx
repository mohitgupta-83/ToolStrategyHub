import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Builders Creators | Grow Your Audience Professionally',
    description: 'A strategic decision tool to help you calculate and execute outcomes.',
    path: '/tools/builders-creators',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
