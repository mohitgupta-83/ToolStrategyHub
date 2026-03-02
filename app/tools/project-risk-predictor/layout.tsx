import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Project Risk Predictor | Data-Driven Execution Logic',
    description: 'Synthesize qualitative project variables into a rigid risk index.',
    path: '/tools/project-risk-predictor',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
