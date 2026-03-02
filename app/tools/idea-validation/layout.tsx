import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Idea Validation | Test Before You Build',
    description: 'A strategic decision tool to help you calculate and execute outcomes.',
    path: '/tools/idea-validation',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
