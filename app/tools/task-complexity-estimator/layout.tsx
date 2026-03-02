import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Task Complexity Estimator | Calculate Free & instantly',
    description: 'Standardize story pointing by evaluating structural task complexity.',
    path: '/tools/task-complexity-estimator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
