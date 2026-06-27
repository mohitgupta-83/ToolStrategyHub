const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'seo_roadmap_data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const outDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\9064ff03-497c-4ad5-b5b8-60edada35949';

const { summary, top20, roadmap, clusters } = data;

// Generate Full Report
let report = `# ToolStrategyHub SEO Indexing & Priority Report\n\n`;

report += `## 1. URL Discovery & Status\n\n`;
report += `- **Total URLs Discovered:** ${summary.totalDiscovered}\n`;
report += `- **Total Indexed URLs:** ${summary.indexed}\n`;
report += `- **Total Non-Indexed URLs:** ${summary.nonIndexed}\n\n`;

report += `## 2. Priority Tiers (Non-Indexed URLs)\n\n`;
report += `- **Tier 1 (Highest Priority, Score >= 80):** ${summary.tier1} URLs (Pages most likely to generate impressions quickly)\n`;
report += `- **Tier 2 (Strong Support, Score 65-79):** ${summary.tier2} URLs\n`;
report += `- **Tier 3 (Topical Authority, Score 50-64):** ${summary.tier3} URLs\n`;
report += `- **Tier 4 (Low Urgency, Score < 50):** ${summary.tier4} URLs (Will not be prioritized for manual indexing)\n\n`;

report += `## 3. Cluster Analysis\n\n`;
clusters.sort((a, b) => b.count - a.count).forEach(c => {
    report += `- **${c.name}:** ${c.count} URLs\n`;
});
report += `\n*Recommendation: Prioritize indexing Tier 1 URLs in the highly commercial clusters (Startup Finance, Pricing, Startup Validation).* \n\n`;

report += `## 4. Missing Support Pages & Internal Linking Opportunities\n\n`;
report += `### Missing High-Opportunity Pages\n`;
report += `Many tools are missing their supporting \`how-to\` guides, \`beginner\` guides, \`alternatives\` comparisons, and \`vs-spreadsheet\` comparisons. Generating and interlinking these dynamically will provide significant topical authority.\n\n`;
report += `### Internal Linking Analysis\n`;
report += `- **Orphan Pages:** Many of the physical static guides (e.g., \`how-to-build-a-startup-financial-model\`, \`saas-pricing-mistakes\`) have 0 or 1 internal links.\n`;
report += `- **Weakly Linked Pages:** Hub pages should centrally link out to all tools in their category to distribute link equity.\n`;
report += `- **Recommendations:**\n  - Ensure every tool page links to at least 3 related supporting guides/articles.\n  - Ensure every guide links to the relevant primary tool.\n  - Create a "Related Tools" or "Alternative Methods" section on comparison pages.\n\n`;

report += `## 5. Top 20 URLs Most Likely to Rank First\n\n`;
top20.forEach((url, i) => {
    report += `${i + 1}. **[${url.url}](${url.url})**\n   - Score: ${url.score}\n   - Type: ${url.type}\n   - Cluster: ${url.cluster}\n\n`;
});

fs.writeFileSync(path.join(outDir, 'seo_report.md'), report);

// Generate Roadmap
let rm = `# Indexing Priority Roadmap\n\n`;
rm += `> [!IMPORTANT]\n> Submit these URLs to Google Search Console (GSC) at a rate of exactly 5 URLs per day, as outlined below.\n\n`;

roadmap.forEach(day => {
    rm += `### Day ${day.day}\n`;
    day.urls.forEach(u => {
        rm += `- [${u.url}](${u.url}) (Score: ${u.score} | ${u.cluster})\n`;
    });
    rm += `\n`;
});

fs.writeFileSync(path.join(outDir, 'indexing_roadmap.md'), rm);

console.log('Reports generated successfully in artifact directory.');
