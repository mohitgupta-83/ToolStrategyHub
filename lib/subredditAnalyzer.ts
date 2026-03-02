export interface Theme {
    name: string;
    frequency: number; // percentage
    urgency: number; // 0-100
    keywords: string[];
}

export interface SubredditAnalysisResult {
    themes: Theme[];
    totalPostsAnalyzed: number;
}

const STOP_WORDS = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at",
    "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could",
    "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for",
    "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's",
    "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm",
    "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't",
    "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours",
    "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't",
    "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there",
    "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too",
    "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't",
    "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why",
    "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours",
    "yourself", "yourselves", "just", "like", "really", "can", "will", "get", "one"
]);

const URGENCY_WORDS = new Set([
    "hate", "worst", "terrible", "horrible", "awful", "desperate", "fast", "asap",
    "sucks", "broken", "crashing", "fail", "failing", "expensive", "ruined", "sick", "tired"
]);

export function analyzeSubredditContent(text: string): SubredditAnalysisResult {
    if (!text || text.trim().length === 0) {
        return { themes: [], totalPostsAnalyzed: 0 };
    }

    // Rough estimation of posts by double newline or "---" separators
    const posts = text.split(/(?:\n\s*\n|---)/).filter(p => p.trim().length > 20);
    const totalPostsAnalyzed = Math.max(1, posts.length);

    // Tokenization & Bigram extraction
    const wordCounts: Record<string, { count: number; urgencyTokens: number }> = {};

    const tokens = text.toLowerCase()
        .replace(/[^\w\s]/gi, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2 && !STOP_WORDS.has(w));

    // Count bigrams to find themes rather than single words
    const bigrams: string[] = [];
    for (let i = 0; i < tokens.length - 1; i++) {
        const bi = `${tokens[i]} ${tokens[i + 1]}`;
        bigrams.push(bi);

        // Check urgency in context
        const isUrgent = URGENCY_WORDS.has(tokens[i]) || URGENCY_WORDS.has(tokens[i + 1]) ? 1 : 0;

        if (!wordCounts[bi]) {
            wordCounts[bi] = { count: 0, urgencyTokens: 0 };
        }
        wordCounts[bi].count++;
        wordCounts[bi].urgencyTokens += isUrgent;
    }

    // Merge overlapping or highly similar bigrams naively for "clustering"
    // E.g., if we see "too expensive" and "very expensive", group them roughly if they share the dominant noun

    // Sort by count
    const sortedBigrams = Object.entries(wordCounts)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 50);

    // Simple clustering: Take the top 5 distinct themes that don't share words
    const themes: Theme[] = [];
    const usedWords = new Set<string>();

    for (const [bi, stats] of sortedBigrams) {
        if (themes.length >= 5) break;

        const [w1, w2] = bi.split(' ');
        if (!usedWords.has(w1) && !usedWords.has(w2)) {
            // Create theme
            themes.push({
                name: bi.toUpperCase(),
                frequency: Math.min(100, Math.round((stats.count / Math.max(1, (tokens.length / 10))) * 100) + Math.round(stats.count * 2)),
                urgency: Math.min(100, Math.round((stats.urgencyTokens / stats.count) * 100) + (stats.count > 5 ? 20 : 0)),
                keywords: [w1, w2]
            });
            usedWords.add(w1);
            usedWords.add(w2);
        }
    }

    return {
        themes,
        totalPostsAnalyzed
    };
}
