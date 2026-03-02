import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Customer Interview Script Generator | Data-Driven Execution Logic',
    description: 'Generate bias-free, structured interview questions to validate your startup idea using behavioral psychology.',
    path: '/tools/customer-interview-script-generator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
