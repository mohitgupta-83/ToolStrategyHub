import { Metadata } from "next";

type MetadataProps = {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://toolstrategyhub.com";

export function generatePageMetadata({ title, description, path, keywords = [] }: MetadataProps): Metadata {
    const url = `${SITE_URL}${path}`;

    return {
        title: `${title} | ToolStrategyHub`,
        description,
        keywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "ToolStrategyHub",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export function generateArticleSchema(
    title: string,
    description: string,
    url: string,
    dateModified: string
) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        author: {
            "@type": "Organization",
            name: "ToolStrategyHub Expert Team",
        },
        publisher: {
            "@type": "Organization",
            name: "ToolStrategyHub",
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/logo.png`,
            },
        },
        datePublished: "2024-01-01",
        dateModified: dateModified,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}${url}`,
        },
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.url}`,
        })),
    };
}
