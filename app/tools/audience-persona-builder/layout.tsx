import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Audience Persona Builder | Grow Your Audience Professionally',
    description: 'Quickly map out the precise characteristics of your target buyer.',
    path: '/tools/audience-persona-builder',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
