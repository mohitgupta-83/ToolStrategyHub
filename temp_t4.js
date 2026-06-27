const fs = require('fs');
const path = require('path');

// Reconstruct discovered URLs
const toolsFile = fs.readFileSync(path.join(__dirname, 'lib', 'toolsRegistry.ts'), 'utf8');
const toolsJsonStr = toolsFile.substring(
    toolsFile.indexOf('export const toolsRegistry: ToolRegistryItem[] =') + 'export const toolsRegistry: ToolRegistryItem[] ='.length
).trim().replace(/;$/, '');
const toolsRegistry = eval(toolsJsonStr);

const ARTICLE_SUFFIX = {
    'ultra-long-tail': (t) => `how-to-use-${t.slug}-without-mistakes`,
    'beginner-guide': (t) => `${t.slug}-for-beginners`,
    'how-to': (t) => `how-to-${t.slug.replace(/-calculator$/, '').replace(/-builder$/, '').replace(/-tool$/, '')}-step-by-step`,
    'use-case': (t) => `${t.slug}-for-startups-and-freelancers`,
    'comparison': (t) => `${t.slug}-vs-spreadsheet`,
    'industry-variant': (t) => `${t.slug}-for-agencies-and-saas`,
    'mistakes': (t) => `common-mistakes-${t.slug}`,
    'strategy': (t) => `best-strategy-${t.slug}`,
    'alternatives': (t) => `best-tools-for-${t.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    'ultimate-guide': (t) => `ultimate-guide-${t.slug}`,
};

const ARTICLE_TYPES = [
    'ultra-long-tail',
    'beginner-guide',
    'how-to',
    'use-case',
    'comparison',
    'industry-variant',
    'mistakes',
    'strategy',
    'alternatives',
    'ultimate-guide',
];

const dynamicCategories = Array.from(new Set(
    toolsRegistry.map(t => t.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
));

// Legacy and new articles
const contentRegistryFile = fs.readFileSync(path.join(__dirname, 'lib', 'contentRegistry.ts'), 'utf8');
const newContentFile = fs.readFileSync(path.join(__dirname, 'lib', 'newContent.ts'), 'utf8');

function extractArticles(fileContent, varName) {
    const startIdx = fileContent.indexOf(`export const ${varName}`);
    if (startIdx === -1) return [];
    const eqIdx = fileContent.indexOf('=', startIdx);
    if (eqIdx === -1) return [];
    const openBracketIdx = fileContent.indexOf('[', eqIdx);
    if (openBracketIdx === -1) return [];
    let bracketCount = 0;
    let foundStart = false;
    let endIdx = -1;
    for (let i = openBracketIdx; i < fileContent.length; i++) {
        if (fileContent[i] === '[') {
            if (!foundStart) foundStart = true;
            bracketCount++;
        } else if (fileContent[i] === ']') {
            bracketCount--;
            if (foundStart && bracketCount === 0) {
                endIdx = i;
                break;
            }
        }
    }
    if (endIdx === -1) return [];
    try {
        return eval(fileContent.substring(openBracketIdx, endIdx + 1));
    } catch (e) {
        return [];
    }
}

const articles = extractArticles(contentRegistryFile, 'ARTICLES');
const newArticles = extractArticles(newContentFile, 'NEW_ARTICLES');
const allLegacyArticles = [...articles, ...newArticles];

// Static guides (physical folders)
const staticGuides = [
    'best-startup-tools',
    'best-strategy-for-startup-validation',
    'business-calculators',
    'business-planning-tools',
    'business-valuation-multiples',
    'common-mistakes-in-freelance-pricing',
    'common-startup-financial-mistakes',
    'creator-growth-tools',
    'decision-making-tools',
    'freelance-pricing-for-beginners',
    'how-investors-value-startups',
    'how-to-build-a-startup-financial-model',
    'how-to-calculate-break-even-point',
    'how-to-calculate-conversion-rate',
    'how-to-calculate-customer-lifetime-value',
    'how-to-calculate-startup-runway',
    'how-to-estimate-market-size',
    'how-to-measure-marketing-roi',
    'how-to-price-a-saas-product',
    'how-to-validate-startup-idea',
    'how-to-value-a-business',
    'ltv-cac-ratio-explained',
    'market-research-tools',
    'marketing-metrics-calculators',
    'pricing-strategy-tools',
    'product-strategy-tools',
    'saas-pricing-mistakes',
    'startup-finance-tools',
    'startup-financial-metrics',
    'startup-valuation-methods',
    'tools-every-startup-founder-needs',
    'tools-for-founders'
];

const BASE_URL = 'https://toolstrategyhub.com';

// Define the 20 indexed core URLs
const indexedUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/tools`,
    `${BASE_URL}/categories`,
    `${BASE_URL}/ai-tools`,
    `${BASE_URL}/guides`,
    `${BASE_URL}/startup-tools`,
    `${BASE_URL}/pricing-tools`,
    `${BASE_URL}/operations-tools`,
    `${BASE_URL}/creator-tools`,
    `${BASE_URL}/research-tools`,
    `${BASE_URL}/tools/startup-idea-validator`,
    `${BASE_URL}/tools/freelance-rate-calculator`,
    `${BASE_URL}/tools/saas-pricing-calculator`,
    `${BASE_URL}/tools/market-size-estimator`,
    `${BASE_URL}/tools/startup-runway-calculator`,
    `${BASE_URL}/tools/decision-matrix-builder`,
    `${BASE_URL}/tools/workflow-cost-calculator`,
    `${BASE_URL}/tools/keyword-opportunity-calculator`,
    `${BASE_URL}/tools/opportunity-ranking-tool`,
    `${BASE_URL}/tools/content-monetization-planner`
];

// Let's list all URLs in sitemap
const staticPages = [
    `${BASE_URL}/`,
    `${BASE_URL}/tools`,
    `${BASE_URL}/categories`,
    `${BASE_URL}/ai-tools`,
    `${BASE_URL}/ai-tools/llm-apis`,
    `${BASE_URL}/ai-tools/agent-skills`,
    `${BASE_URL}/ai-tools/free-apis`,
    `${BASE_URL}/ai-tools/resources`,
    'startup-tools', 'pricing-tools', 'operations-tools', 'creator-tools', 'research-tools'
].map(p => p.startsWith('http') ? p : `${BASE_URL}/${p}`);

const toolPages = toolsRegistry.map(t => `${BASE_URL}/tools/${t.slug}`);
const categoryPages = dynamicCategories.map(slug => `${BASE_URL}/categories/${slug}`);

const COMPARISON_TOPICS = ['spreadsheet', 'manual-method', 'alternative'];
const HARDCODED_COMPARES = [
    'fixed-pricing-vs-usage-pricing',
    'ltv-vs-cac',
    'market-sizing-top-down-vs-bottom-up',
    'saas-pricing-vs-freemium',
    'saas-pricing-vs-one-time-pricing',
    'saas-pricing-calculator-vs-excel',
    'startup-runway-calculator-vs-spreadsheet',
    'startup-burn-rate-vs-runway',
    'decision-matrix-builder-vs-gut-feeling'
];

const comparisonPages = [
    ...HARDCODED_COMPARES.map(slug => `${BASE_URL}/compare/${slug}`),
    ...toolsRegistry.flatMap(tool =>
        COMPARISON_TOPICS.map(topic => `${BASE_URL}/compare/${tool.slug}-vs-${topic}`)
    )
];

const PILLAR_GUIDES = [
    'startup-validation',
    'pricing-strategy',
    'creator-monetization',
    'business-decision-making'
];

const engineArticleSlugs = [];
for (const tool of toolsRegistry) {
    for (const type of ARTICLE_TYPES) {
        engineArticleSlugs.push(ARTICLE_SUFFIX[type](tool));
    }
}
const uniqueEngineArticleSlugs = Array.from(new Set(engineArticleSlugs));

const guidePages = [
    ...PILLAR_GUIDES.map(slug => `${BASE_URL}/guides/${slug}`),
    ...uniqueEngineArticleSlugs.map(slug => `${BASE_URL}/guides/${slug}`),
    ...allLegacyArticles.map(article => `${BASE_URL}/tools/${article.toolSlug}/${article.slug}`)
];

const missingPhysicalPages = [
    `${BASE_URL}/about`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/privacy-policy`,
    `${BASE_URL}/terms-of-service`,
    ...staticGuides.map(slug => `${BASE_URL}/guides/${slug}`),
    // Plus the 10 tools that were missing from toolsRegistry
    ...[
        'break-even-calculator',
        'cac-payback-calculator',
        'conversion-rate-calculator',
        'customer-lifetime-value-calculator',
        'email-outreach-calculator',
        'lead-generation-roi-calculator',
        'market-opportunity-calculator',
        'marketing-roi-calculator',
        'product-pricing-simulator',
        'startup-burn-rate-calculator'
    ].map(slug => `${BASE_URL}/tools/${slug}`)
];

const allDiscoveredUrls = Array.from(new Set([
    ...staticPages,
    ...toolPages,
    ...categoryPages,
    ...comparisonPages,
    ...guidePages,
    ...missingPhysicalPages
]));

// Categorize URLs
const categorizeUrl = (url) => {
    if (url === `${BASE_URL}/`) return 'Homepage';
    if (url.includes('/tools/')) {
        const parts = url.split('/tools/');
        if (parts[1].includes('/')) return 'Legacy Custom Article'; // tools/tool-slug/article-slug
        return 'Tool Page';
    }
    if (url.includes('/compare/')) return 'Comparison Page';
    if (url.includes('/categories/')) return 'Category Page';
    if (url.includes('/guides/')) {
        const slug = url.split('/guides/')[1];
        if (PILLAR_GUIDES.includes(slug)) return 'Dynamic Pillar Guide';
        if (staticGuides.includes(slug)) return 'Static Guide Page';
        return 'Dynamic Engine Article';
    }
    if (url.includes('/ai-tools/')) return 'AI Section Sub-page';
    if (url === `${BASE_URL}/ai-tools`) return 'AI Section Page';
    if (url === `${BASE_URL}/tools`) return 'Directory Page';
    if (url === `${BASE_URL}/categories`) return 'Directory Page';
    if (url === `${BASE_URL}/guides`) return 'Directory Page';
    if (url === `${BASE_URL}/blog`) return 'Directory Page';
    if (['about', 'contact', 'privacy-policy', 'terms-of-service'].some(x => url.endsWith('/' + x))) return 'Utility Page';
    if (HUB_SLUGS.some(x => url.endsWith('/' + x))) return 'Hub Page';
    return 'Other';
};

// Internal linking counts (for static guides, from previous script)
const staticGuideRefsCount = {
    'best-startup-tools': 9,
    'best-strategy-for-startup-validation': 1,
    'business-calculators': 6,
    'business-planning-tools': 3,
    'business-valuation-multiples': 3,
    'common-mistakes-in-freelance-pricing': 1,
    'common-startup-financial-mistakes': 1,
    'creator-growth-tools': 2,
    'decision-making-tools': 1,
    'freelance-pricing-for-beginners': 1,
    'how-investors-value-startups': 3,
    'how-to-build-a-startup-financial-model': 0,
    'how-to-calculate-break-even-point': 1,
    'how-to-calculate-conversion-rate': 1,
    'how-to-calculate-customer-lifetime-value': 1,
    'how-to-calculate-startup-runway': 0,
    'how-to-estimate-market-size': 0,
    'how-to-measure-marketing-roi': 1,
    'how-to-price-a-saas-product': 1,
    'how-to-validate-startup-idea': 1,
    'how-to-value-a-business': 3,
    'ltv-cac-ratio-explained': 2,
    'market-research-tools': 6,
    'marketing-metrics-calculators': 8,
    'pricing-strategy-tools': 11,
    'product-strategy-tools': 5,
    'saas-pricing-mistakes': 0,
    'startup-finance-tools': 9,
    'startup-financial-metrics': 2,
    'startup-valuation-methods': 3,
    'tools-every-startup-founder-needs': 0,
    'tools-for-founders': 1
};

// Clusters
const getClusterName = (url) => {
    const lower = url.toLowerCase();
    
    // Check path or keywords
    if (lower.includes('validation') || lower.includes('idea') || lower.includes('readiness')) return 'Startup Validation';
    if (lower.includes('runway') || lower.includes('burn-rate') || lower.includes('valuation') || lower.includes('finance') || lower.includes('loan') || lower.includes('debt') || lower.includes('amortization')) return 'Startup Finance';
    if (lower.includes('pricing') || lower.includes('freelance-rate') || lower.includes('markup') || lower.includes('break-even') || lower.includes('cost-calculator') || lower.includes('ltv') || lower.includes('cac')) return 'Pricing';
    if (lower.includes('creator') || lower.includes('audience') || lower.includes('monetization') || lower.includes('youtube') || lower.includes('newsletter') || lower.includes('viral') || lower.includes('channel-profit') || lower.includes('posting-frequency')) return 'Creator Economy';
    if (lower.includes('operations') || lower.includes('automation') || lower.includes('capacity') || lower.includes('deadline') || lower.includes('task-complexity') || lower.includes('burnout') || lower.includes('workflow') || lower.includes('productivity') || lower.includes('time-estimator') || lower.includes('weekly-planning')) return 'Operations';
    if (lower.includes('marketing') || lower.includes('conversion') || lower.includes('roi') || lower.includes('outreach') || lower.includes('lead-generation') || lower.includes('keyword') || lower.includes('roas') || lower.includes('competitor') || lower.includes('niche-saturation') || lower.includes('trend')) return 'Marketing Metrics';
    if (lower.includes('research') || lower.includes('reddit') || lower.includes('subreddit') || lower.includes('sentiment') || lower.includes('pain-finder') || lower.includes('market-size') || lower.includes('market-opportunity') || lower.includes('tam-sam-som')) return 'Market Research';
    if (lower.includes('ai-tools') || lower.includes('llm') || lower.includes('agent') || lower.includes('api')) return 'AI Tools';
    if (lower.includes('decision') || lower.includes('matrix') || lower.includes('ranking') || lower.includes('priority') || lower.includes('prioritizing') || lower.includes('bias') || lower.includes('eisenhower')) return 'Decision Making';
    
    // Default by category if matching tool can be found
    const tool = toolsRegistry.find(t => lower.includes(t.slug));
    if (tool) {
        if (tool.category === 'Idea Validation') return 'Startup Validation';
        if (tool.category === 'Money & Pricing') return 'Pricing';
        if (tool.category === 'Operations') return 'Operations';
        if (tool.category === 'Creators') return 'Creator Economy';
        if (tool.category === 'Research') return 'Market Research';
        if (tool.category === 'Strategy') return 'Decision Making';
    }
    
    return 'General / Unclustered';
};

// SEO Score calculation (1-100)
const calculateSeoScore = (url, type) => {
    let searchIntent = 5; // default informational
    let commercialIntent = 4; // default low
    let longTailOpportunity = 5;
    let internalLinkSupport = 5;
    let clusterStrength = 5;
    let contentDepth = 5;
    let calculatorValue = 3;
    let rankingPotential = 5;

    const lower = url.toLowerCase();

    // 1. Type specific adjustments
    if (type === 'Tool Page') {
        searchIntent = 10; // transactional/high intent
        commercialIntent = 9;
        longTailOpportunity = 7;
        contentDepth = 8;
        calculatorValue = 10; // has interactive tool
        rankingPotential = 8; // high conversion potential
        
        // Find popularity score
        const slug = url.split('/tools/')[1];
        const tool = toolsRegistry.find(t => t.slug === slug);
        if (tool && tool.featured) {
            commercialIntent = 10;
            internalLinkSupport = 8;
            rankingPotential = 9;
        }
    } else if (type === 'Dynamic Pillar Guide' || type === 'Static Guide Page') {
        searchIntent = 8; // high educational search intent
        commercialIntent = 7;
        longTailOpportunity = 6;
        contentDepth = 10; // very deep content
        calculatorValue = 7; // links to tools
        
        const slug = url.split('/guides/')[1];
        const refs = staticGuideRefsCount[slug] || 0;
        if (refs === 0) {
            internalLinkSupport = 1; // orphan
        } else if (refs < 3) {
            internalLinkSupport = 3; // weakly linked
        } else {
            internalLinkSupport = 8; // well linked
        }
    } else if (type === 'Dynamic Engine Article') {
        searchIntent = 6;
        commercialIntent = 5;
        longTailOpportunity = 9; // specific long-tail keywords
        contentDepth = 7;
        calculatorValue = 8; // has CTA to launch tool
        
        // Check dynamic article type
        if (lower.includes('without-mistakes') || lower.includes('common-mistakes')) {
            longTailOpportunity = 10; // very specific
            rankingPotential = 9; // low competition
        } else if (lower.includes('vs-spreadsheet') || lower.includes('vs-excel')) {
            commercialIntent = 8; // high intent alternative comparison
            longTailOpportunity = 8;
            rankingPotential = 8;
        } else if (lower.includes('ultimate-guide')) {
            contentDepth = 9;
            rankingPotential = 4; // high competition
        }
    } else if (type === 'Comparison Page') {
        searchIntent = 9; // very high comparison intent
        commercialIntent = 8;
        longTailOpportunity = 8;
        contentDepth = 6;
        calculatorValue = 8;
        rankingPotential = 7;
    } else if (type === 'Category Page') {
        searchIntent = 4;
        commercialIntent = 6;
        longTailOpportunity = 3;
        contentDepth = 4;
        calculatorValue = 6;
    } else if (type === 'Hub Page') {
        searchIntent = 5;
        commercialIntent = 7;
        longTailOpportunity = 4;
        contentDepth = 6;
        calculatorValue = 7;
        internalLinkSupport = 9;
    }

    // 2. Specific cluster adjustments
    const cluster = getClusterName(url);
    if (cluster === 'Startup Validation' || cluster === 'Startup Finance' || cluster === 'Pricing') {
        clusterStrength = 9; // highly valuable commercial clusters
    } else if (cluster === 'Creator Economy' || cluster === 'Marketing Metrics' || cluster === 'Market Research') {
        clusterStrength = 7;
    }

    // 3. Weighting the factors
    // Score = weighted average of factors (normalized to 1-100)
    // Weights:
    // Search Intent: 15%
    // Commercial Intent: 15%
    // Long-tail Opportunity: 15%
    // Internal Link Support: 10%
    // Existing Topical Cluster: 10%
    // Content Depth: 10%
    // Calculator Value: 15%
    // Ranking Potential: 10%
    
    const score = (
        searchIntent * 15 +
        commercialIntent * 15 +
        longTailOpportunity * 15 +
        internalLinkSupport * 10 +
        clusterStrength * 10 +
        contentDepth * 10 +
        calculatorValue * 15 +
        rankingPotential * 10
    ) / 10; // returns 1-100

    return Math.round(score);
};

// Generate list of non-indexed URLs with details and scores
const nonIndexedData = allDiscoveredUrls
    .filter(url => !indexedUrls.includes(url))
    .map(url => {
        const type = categorizeUrl(url);
        const score = calculateSeoScore(url, type);
        const cluster = getClusterName(url);
        return { url, type, score, cluster };
    });

// Sort by score desc
nonIndexedData.sort((a, b) => b.score - a.score);

// Assign Tiers
// Tier 1: score >= 80
// Tier 2: 70-79
// Tier 3: 50-69
// Tier 4: <50
const tiers = {
    1: nonIndexedData.filter(d => d.score >= 80),
    2: nonIndexedData.filter(d => d.score >= 65 && d.score < 80),
    3: nonIndexedData.filter(d => d.score >= 50 && d.score < 65),
    4: nonIndexedData.filter(d => d.score < 50)
};

console.log('\nTIER SUMMARY:');
console.log(`Tier 1 (Highest Priority, Score >=80):`, tiers[1].length);
console.log(`Tier 2 (Strong Support, Score 65-79):`, tiers[2].length);
console.log(`Tier 3 (Topical Authority, Score 50-64):`, tiers[3].length);
console.log(`Tier 4 (Low Urgency, Score <50):`, tiers[4].length);

// Let's print the top 20 non-indexed URLs
console.log('\nTOP 20 NON-INDEXED URLS BY SEO SCORE:');
nonIndexedData.slice(0, 20).forEach((d, idx) => {
    console.log(`${idx+1}. Score: ${d.score} | Cluster: ${d.cluster} | Type: ${d.type} | URL: ${d.url}`);
});

// Group by Cluster for report
const clusterGroups = {};
nonIndexedData.forEach(d => {
    if (!clusterGroups[d.cluster]) clusterGroups[d.cluster] = [];
    clusterGroups[d.cluster].push(d);
});
console.log('\nCLUSTER SIZES:');
Object.entries(clusterGroups).forEach(([name, list]) => {
    console.log(`- ${name}: ${list.length} non-indexed URLs`);
});

// Build Daily Indexing Roadmap starting at Day 15
// Requirements: Day 15: 5 URLs, Day 16: 5 URLs, Day 17: 5 URLs, etc.
// Never exceed 8 URLs per day.
// Let's schedule all worthwhile pages (Tier 1, Tier 2, and Tier 3) - Tier 4 pages are low-value and should not be prioritized or index-requested.
// Worthwhile pages = Tier 1 + Tier 2 + Tier 3
const worthwhilePages = [...tiers[1], ...tiers[2], ...tiers[3]];
// Let's sort worthwhilePages: Tier 1 first, then Tier 2, then Tier 3, ordered by score descending.
worthwhilePages.sort((a, b) => b.score - a.score);

const dailyRoadmap = [];
let currentPageIdx = 0;
let currentDay = 15;
while (currentPageIdx < worthwhilePages.length) {
    // We can schedule 5-8 URLs per day. Let's schedule exactly 5 URLs per day as requested: "Day 15: 5 URLs, Day 16: 5 URLs...".
    // Wait, the prompt says "Day 15: 5, Day 16: 5, Day 17: 5... Continue until all worthwhile pages are scheduled. Never exceed 8 URLs per day."
    // Let's use 5 URLs per day.
    const dayUrls = worthwhilePages.slice(currentPageIdx, currentPageIdx + 5);
    dailyRoadmap.push({
        day: currentDay,
        urls: dayUrls
    });
    currentPageIdx += 5;
    currentDay++;
}

console.log(`\nRoadmap covers Days 15 to ${currentDay-1} (${dailyRoadmap.length} days of indexing requests)`);
console.log(`First few days of roadmap:`);
dailyRoadmap.slice(0, 5).forEach(dayData => {
    console.log(`Day ${dayData.day}:`);
    dayData.urls.forEach(u => console.log(`  - ${u.url} (Score: ${u.score}, Type: ${u.type})`));
});

// Save the full analysis data to file
fs.writeFileSync('seo_roadmap_data.json', JSON.stringify({
    summary: {
        totalDiscovered: allDiscoveredUrls.length,
        indexed: indexedUrls.length,
        nonIndexed: nonIndexedData.length,
        tier1: tiers[1].length,
        tier2: tiers[2].length,
        tier3: tiers[3].length,
        tier4: tiers[4].length
    },
    top20: nonIndexedData.slice(0, 20),
    roadmap: dailyRoadmap.map(d => ({
        day: d.day,
        urls: d.urls.map(u => ({ url: u.url, score: u.score, type: u.type, cluster: u.cluster }))
    })),
    clusters: Object.entries(clusterGroups).map(([name, list]) => ({
        name,
        count: list.length
    }))
}, null, 2));
console.log('Wrote seo_roadmap_data.json');

console.log(JSON.stringify(tiers[4].map(t=>t.url), null, 2));