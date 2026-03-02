import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: 'SaaS Pricing Calculator for B2B Startups | Calculate Free & instantly',
    description: 'Engineer profitable pricing tiers. Calculate fixed infrastructure costs against variable per-user LLM taxes to find your absolute breakeven floor.',
    path: '/tools/saas-pricing-calculator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
