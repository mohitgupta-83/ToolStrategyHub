import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Automation ROI Tool | Data-Driven Execution Logic',
    description: 'Calculate the payback period and financial return on your internal automation projects.',
    path: '/tools/automation-roi-tool',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
