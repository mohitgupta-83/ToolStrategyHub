import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Idea Risk Analyzer | Test Before You Build',
    description: 'Identify the weak points in your startup thesis.',
    path: '/tools/idea-risk-analyzer',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
