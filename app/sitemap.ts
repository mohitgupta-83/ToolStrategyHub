import { MetadataRoute } from 'next';
import { getToolsList, getAllArticles } from '@/lib/contentRegistry';
import { toolsRegistry } from '@/lib/toolsRegistry';
import { getAllArticleSlugs } from '@/lib/articleEngine';

const HUB_SLUGS = ['startup-tools', 'pricing-tools', 'operations-tools', 'creator-tools', 'research-tools'];
const GUIDE_SLUGS = ['startup-validation', 'pricing-strategy', 'creator-monetization', 'business-decision-making'];
const CATEGORY_SLUGS = ['startup-tools-india', 'free-business-tools', 'best-decision-tools', 'tools-for-founders', 'tools-for-freelancers'];
const CATEGORY_USE_CASES: Record<string, string[]> = {
    'Idea Validation': ['for-bootstrappers', 'non-technical-founders', 'b2b-saas'],
    'Money & Pricing': ['for-agencies', 'for-freelancers', 'b2b-operations'],
    'Operations': ['for-agencies', 'remote-teams', 'b2b-saas'],
    'Creators': ['for-youtubers', 'for-indie-hackers', 'content-monetization'],
    'Research': ['niche-validation', 'market-analysis', 'pain-point-discovery'],
    'Productivity': ['for-solopreneurs', 'for-agencies', 'b2b-saas'],
    'Strategy': ['seed-stage', 'bootstrapped-founders', 'for-agencies'],
};
const COMPARISON_TOPICS = ['spreadsheet', 'manual-method', 'alternative'];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://toolstrategyhub.com';
    const tools = getToolsList();
    const articles = getAllArticles();
    const engineArticleSlugs = getAllArticleSlugs(); // 700 auto-generated

    const now = new Date();

    return [
        // ── Core Pages ──────────────────────────────────────────────────
        { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'daily', priority: 0.96 },
        { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
        { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
        { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },

        // ── Authority Hubs ───────────────────────────────────────────────
        ...HUB_SLUGS.map(slug => ({ url: `${baseUrl}/${slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.95 })),

        // ── Pillar Guides ────────────────────────────────────────────────
        ...GUIDE_SLUGS.map(slug => ({ url: `${baseUrl}/guides/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 })),

        // ── 700 Auto-Generated Articles ───────────────────────────────────
        ...engineArticleSlugs.map(slug => ({ url: `${baseUrl}/guides/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 })),

        // ── Category Landing Pages ───────────────────────────────────────
        ...CATEGORY_SLUGS.map(slug => ({ url: `${baseUrl}/category/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 })),

        // ── Core Tool Pages ──────────────────────────────────────────────
        ...tools.map(tool => ({ url: `${baseUrl}/tools/${tool.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 })),

        // ── Long-Tail Use-Case Pages ─────────────────────────────────────
        ...toolsRegistry.flatMap(tool => {
            const useCases = CATEGORY_USE_CASES[tool.category] || CATEGORY_USE_CASES['Strategy'];
            return useCases.map(uc => ({ url: `${baseUrl}/tools/${tool.slug}/${uc}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 }));
        }),

        // ── Comparison Pages ─────────────────────────────────────────────
        ...toolsRegistry.flatMap(tool =>
            COMPARISON_TOPICS.map(topic => ({ url: `${baseUrl}/compare/${tool.slug}-vs-${topic}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 }))
        ),

        // ── How-To Problem Pages ─────────────────────────────────────────
        ...toolsRegistry.map(tool => {
            const prefix = tool.category === 'Money & Pricing' ? 'price-' : 'calculate-';
            return { url: `${baseUrl}/how-to/${prefix}${tool.slug.replace(/-calculator$/, '').replace(/-builder$/, '').replace(/-tool$/, '')}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 };
        }),

        // ── Legacy Content Articles ──────────────────────────────────────
        ...articles.map(article => ({ url: `${baseUrl}/tools/${article.toolSlug}/${article.slug}`, lastModified: new Date(article.lastUpdated), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ];
}
