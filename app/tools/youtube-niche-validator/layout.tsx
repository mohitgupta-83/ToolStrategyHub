import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'YouTube Niche Validator | Test Before You Build',
    description: 'Validate your YouTube niche economics before committing to production.',
    path: '/tools/youtube-niche-validator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
