import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Validation Checklist Builder | Test Before You Build',
    description: 'Generate your exact go-to-market testing protocol.',
    path: '/tools/validation-checklist-builder',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
