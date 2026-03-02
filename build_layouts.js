const fs = require('fs');
const path = require('path');

// Extract toolsRegistry from the TS file by naive parsing
const TSData = fs.readFileSync(path.join(__dirname, 'lib', 'toolsRegistry.ts'), 'utf8');
const match = TSData.match(/export const toolsRegistry: ToolRegistryItem\[\] = (\[[\s\S]*?\]);/);
let tools = [];
if (match) {
    tools = JSON.parse(match[1]);
} else {
    console.error("Failed to parse registry.");
    process.exit(1);
}

const getBenefitQualifier = (category, name) => {
    if (name.includes("Calculator") || name.includes("Estimator")) {
        return "Calculate Free & instantly";
    }
    if (category === "Idea Validation") return "Test Before You Build";
    if (category === "Money & Pricing") return "Model Your Profit Margins";
    if (category === "Operations") return "Scale Your Execution";
    if (category === "Creators") return "Grow Your Audience Professionally";
    if (category === "Research") return "Discover Untapped Market Gaps";
    if (category === "Strategy") return "Data-Driven Execution Logic";
    return "Make Smarter Decisions";
};

tools.forEach(tool => {
    const dir = path.join(__dirname, 'app', 'tools', tool.slug);
    if (!fs.existsSync(dir)) return;

    const qualifier = getBenefitQualifier(tool.category, tool.name);
    const title = `${tool.name} | ${qualifier}`;

    const layoutContent = `import { generatePageMetadata } from '@/lib/seo';
import React from 'react';

export const metadata = generatePageMetadata({
    title: '${title.replace(/'/g, "\\'")}',
    description: '${tool.description.replace(/'/g, "\\'")}',
    path: '/tools/${tool.slug}',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
`;

    fs.writeFileSync(path.join(dir, 'layout.tsx'), layoutContent);
});

console.log(`Generated tailored SEO Layouts for ${tools.length} tool pages.`);
