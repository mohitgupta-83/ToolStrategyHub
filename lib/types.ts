export type ToolMetadata = {
    name: string;
    slug: string;
    description: string;
    primaryKeyword: string;
    category?: string;
};

export type SEOArticle = {
    title: string;
    slug: string;
    toolSlug: string;
    description: string;
    keyword: string;
    lastUpdated: string;
    content: string;
};
