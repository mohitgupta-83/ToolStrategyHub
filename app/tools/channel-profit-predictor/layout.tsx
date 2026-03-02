import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'Channel Profit Predictor | Data-Driven Execution Logic',
    description: 'Calculate forward-looking 12-month trailing earnings.',
    path: '/tools/channel-profit-predictor',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
