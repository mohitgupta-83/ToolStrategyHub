import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Startup Idea Validation Scorecard | Test Before You Build',
    description: 'Score your startup ideas using a weighted algorithmic scorecard analyzing urgency, audience size, and distribution.',
    path: '/tools/startup-idea-validator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
