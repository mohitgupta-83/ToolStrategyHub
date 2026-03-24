import { MetadataRoute } from 'next';
import { getToolsList, getAllArticles } from '@/lib/contentRegistry';
import { toolsRegistry } from '@/lib/toolsRegistry';
import { getAllArticleSlugs } from '@/lib/articleEngine';

const BASE_URL = 'https://toolstrategyhub.com';

const HUB_SLUGS = [
    'startup-tools',
    'pricing-tools',
    'operations-tools',
    'creator-tools',
    'research-tools'
];

const PILLAR_GUIDES = [
    'startup-validation',
    'pricing-strategy',
    'creator-monetization',
    'business-decision-making'
];

const COMPARISON_TOPICS = ['spreadsheet', 'manual-method', 'alternative'];

// Folders found inside app/compare/
const HARDCODED_COMPARES = [
    'fixed-pricing-vs-usage-pricing',
    'ltv-vs-cac',
    'market-sizing-top-down-vs-bottom-up',
    'saas-pricing-vs-freemium',
    'saas-pricing-vs-one-time-pricing',
    'startup-burn-rate-vs-runway',
    'startup-runway-calculator-vs-spreadsheet',
    'saas-pricing-calculator-vs-excel',
    'decision-matrix-builder-vs-gut-feeling'
];

export function generateSitemaps() {
    return [
        { id: 'index' },
        { id: 'tools' },
        { id: 'guides' },
        { id: 'compare' },
        { id: 'categories' }
    ];
}

export default function sitemap({ id }: { id: string }): MetadataRoute.Sitemap {
    const now = new Date();

    if (id === 'tools') {
        const tools = getToolsList();
        return toolsRegistry.map((tool) => ({
            url: `${BASE_URL}/tools/${tool.slug}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: tool.featured ? 0.8 : 0.7,
        }));
    }

    if (id === 'guides') {
        const engineArticleSlugs = getAllArticleSlugs();
        const legacyArticles = getAllArticles();

        const routes: MetadataRoute.Sitemap = [
            ...PILLAR_GUIDES.map(slug => ({
                url: `${BASE_URL}/guides/${slug}`,
                lastModified: now,
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            })),
            ...engineArticleSlugs.map(slug => ({
                url: `${BASE_URL}/guides/${slug}`,
                lastModified: now,
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            })),
            ...legacyArticles.map(article => ({
                url: `${BASE_URL}/tools/${article.toolSlug}/${article.slug}`,
                lastModified: new Date(article.lastUpdated),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            })),
        ];

        // Deduplicate
        const uniqueRoutes = new Map<string, MetadataRoute.Sitemap[0]>();
        for (const route of routes) {
            uniqueRoutes.set(route.url, route);
        }
        return Array.from(uniqueRoutes.values());
    }

    if (id === 'compare') {
        const routes: MetadataRoute.Sitemap = [
            ...HARDCODED_COMPARES.map(slug => ({
                url: `${BASE_URL}/compare/${slug}`,
                lastModified: now,
                changeFrequency: 'monthly' as const,
                priority: 0.5,
            })),
            ...toolsRegistry.flatMap(tool =>
                COMPARISON_TOPICS.map(topic => ({
                    url: `${BASE_URL}/compare/${tool.slug}-vs-${topic}`,
                    lastModified: now,
                    changeFrequency: 'monthly' as const,
                    priority: 0.5,
                }))
            )
        ];

        const uniqueRoutes = new Map<string, MetadataRoute.Sitemap[0]>();
        for (const route of routes) {
            uniqueRoutes.set(route.url, route);
        }
        return Array.from(uniqueRoutes.values());
    }

    if (id === 'categories') {
        const dynamicCategories = Array.from(new Set(
            toolsRegistry.map(t => t.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
        ));

        return dynamicCategories.map(slug => ({
            url: `${BASE_URL}/categories/${slug}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        }));
    }

    // Default: id === 'index' (or anything else)
    return [
        {
            url: `${BASE_URL}/`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/tools`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/categories`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...HUB_SLUGS.map(slug => ({
            url: `${BASE_URL}/${slug}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))
    ];
}
