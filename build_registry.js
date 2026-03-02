const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'app', 'tools');
const registryPath = path.join(__dirname, 'lib', 'toolsRegistry.ts');

const folders = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory() && f !== '[toolSlug]');

const categories = [
    "Idea Validation",
    "Money & Pricing",
    "Operations",
    "Creators",
    "Research",
    "Productivity",
    "Strategy"
];

function assignCategory(slug) {
    if (slug.includes('pricing') || slug.includes('calculator') || slug.includes('cost') || slug.includes('revenue') || slug.includes('monetization')) return "Money & Pricing";
    if (slug.includes('validator') || slug.includes('idea') || slug.includes('validation')) return "Idea Validation";
    if (slug.includes('creator') || slug.includes('audience') || slug.includes('social')) return "Creators";
    if (slug.includes('research') || slug.includes('analyzer') || slug.includes('finder') || slug.includes('gap')) return "Research";
    if (slug.includes('team') || slug.includes('time') || slug.includes('workflow') || slug.includes('operations')) return "Operations";
    if (slug.includes('productivity') || slug.includes('planner')) return "Productivity";
    return "Strategy";
}

const featuredSlugs = [
    'startup-idea-validator',
    'freelance-rate-calculator',
    'saas-pricing-calculator',
    'market-size-estimator',
    'startup-runway-calculator',
    'decision-matrix-builder',
    'workflow-cost-calculator',
    'keyword-opportunity-calculator',
    'opportunity-ranking-tool',
    'content-monetization-planner'
];

let tools = folders.map(slug => {
    let name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    let description = "A strategic decision tool to help you calculate and execute outcomes.";
    let pagePath = path.join(toolsDir, slug, 'page.tsx');

    if (fs.existsSync(pagePath)) {
        const content = fs.readFileSync(pagePath, 'utf8');
        // Extract title
        let titleMatch = content.match(/title=["']([^"']+)["']/);
        if (titleMatch) name = titleMatch[1];

        let descMatch = content.match(/description=["']([^"']+)["']/);
        if (descMatch) description = descMatch[1];
    }

    return {
        name,
        slug,
        category: assignCategory(slug),
        description,
        featured: featuredSlugs.includes(slug),
        popularityScore: Math.floor(Math.random() * 50) + 50 // Random score between 50 and 99
    };
});

// Give featured tools a higher popularity score
tools.forEach(t => {
    if (t.featured) t.popularityScore = 90 + Math.floor(Math.random() * 10);
});

const content = `// Auto-generated Tools Registry
export interface ToolRegistryItem {
  name: string;
  slug: string;
  category: string;
  description: string;
  featured: boolean;
  popularityScore: number;
}

export const toolsRegistry: ToolRegistryItem[] = ${JSON.stringify(tools, null, 2)};
`;

fs.writeFileSync(registryPath, content);
console.log('Registry built successfully with ' + tools.length + ' tools.');
