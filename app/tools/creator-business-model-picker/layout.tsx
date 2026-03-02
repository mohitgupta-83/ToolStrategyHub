import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Creator Business Model Picker | Grow Your Audience Professionally',
    description: 'Match your niche and audience to the highest leverage income stream.',
    path: '/tools/creator-business-model-picker',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
