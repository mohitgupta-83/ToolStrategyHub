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

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // 1. Static Core Pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
        { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/ai-tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/ai-tools/llm-apis`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/ai-tools/agent-skills`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/ai-tools/free-apis`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/ai-tools/resources`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        ...HUB_SLUGS.map(slug => ({
            url: `${BASE_URL}/${slug}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))
    ];

    // 2. Tools Pages
    const toolPages: MetadataRoute.Sitemap = toolsRegistry.map((tool) => ({
        url: `${BASE_URL}/tools/${tool.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: tool.featured ? 0.8 : 0.7,
    }));

    // 3. Category Pages
    const dynamicCategories = Array.from(new Set(
        toolsRegistry.map(t => t.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    ));
    const categoryPages: MetadataRoute.Sitemap = dynamicCategories.map(slug => ({
        url: `${BASE_URL}/categories/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    // 4. Comparison Pages
    const comparisonPages: MetadataRoute.Sitemap = [
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

    // 5. Guides & Articles
    const engineArticleSlugs = getAllArticleSlugs();
    const legacyArticles = getAllArticles();

    const guidePages: MetadataRoute.Sitemap = [
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

    // Combined unique routes
    const allRoutes = [
        ...staticPages,
        ...toolPages,
        ...categoryPages,
        ...comparisonPages,
        ...guidePages
    ];

    // Final deduplication by URL
    const uniqueRoutesMap = new Map<string, MetadataRoute.Sitemap[0]>();
    for (const route of allRoutes) {
        uniqueRoutesMap.set(route.url, route);
    }

    return Array.from(uniqueRoutesMap.values());
}
