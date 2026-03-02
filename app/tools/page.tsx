import { generatePageMetadata } from '@/lib/seo';
import ToolsDirectoryClient from './ToolsDirectoryClient';
import { toolsRegistry } from '@/lib/toolsRegistry';

export const metadata = generatePageMetadata({
    title: 'All Business Decision Tools | ToolStrategyHub',
    description: 'Explore 70+ free strategic decision tools for founders, freelancers, and creators. Data-driven calculators to validate, execute, and scale your business.',
    path: '/tools',
    keywords: ['all business decision tools', 'startup calculators', 'freelancer pricing tools', 'strategy tools', 'tool ecosystem'],
});

export default function ToolsDirectoryPage() {

    const itemListElement = toolsRegistry.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "SoftwareApplication",
            "name": tool.name,
            "url": `https://toolstrategyhub.com/tools/${tool.slug}`,
            "description": tool.description,
            "applicationCategory": "BusinessApplication"
        }
    }));

    // Comprehensive Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ItemList",
                "name": "All Business Decision Tools",
                "description": "A comprehensive directory of business strategy calculators and validators.",
                "url": "https://toolstrategyhub.com/tools",
                "itemListElement": itemListElement
            },
            {
                "@type": "Organization",
                "name": "ToolStrategyHub",
                "url": "https://toolstrategyhub.com",
                "logo": "https://toolstrategyhub.com/icon.png",
                "description": "Data-driven tools to validate, calculate, and execute smarter business decisions."
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://toolstrategyhub.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Tools",
                        "item": "https://toolstrategyhub.com/tools"
                    }
                ]
            }
        ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <ToolsDirectoryClient />
        </>
    );
}
