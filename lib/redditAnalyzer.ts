export interface PainPoint {
    text: string;
    type: "frustration" | "unmet_need" | "problem_signal";
    intensity: number; // 0-100
}

export interface RedditAnalysisResult {
    extractedPoints: PainPoint[];
    overallScore: number;
    suggestions: string[];
    frequency: Record<string, number>;
}

const FRUSTRATION_PATTERNS = [
    /(?:i (?:hate|am sick of|am annoyed|am frustrated))/gi,
    /(?:can't stand|wish there|why doesn't|sucks|terrible|horrible)/gi,
    /(?:tired of|fed up|struggling with|too hard|so difficult)/gi,
];

const UNMET_NEED_PATTERNS = [
    /(?:looking for a way to|is there an app|anyone know a tool|wish i could|need something that)/gi,
    /(?:can anyone recommend|how do you guys handle|what do you use for)/gi,
    /(?:wish there was|would be great if|someone needs to build)/gi,
];

const PROBLEM_SIGNALS = [
    /(?:takes too much time|waste of time|too expensive|costs too much|breaks all the time)/gi,
    /(?:keeps crashing|always failing|never works|too complex|learning curve is)/gi,
];

function sumMatches(text: string): PainPoint[] {
    const points: PainPoint[] = [];
    const sentences = text.split(/[.!?\n]+/).filter(s => s.trim().length > 10);

    for (const sentence of sentences) {
        let matched = false;
        let type: PainPoint["type"] = "problem_signal";
        let localIntensity = 0;

        for (const pattern of FRUSTRATION_PATTERNS) {
            if (pattern.test(sentence)) {
                matched = true;
                type = "frustration";
                localIntensity += 30;
            }
        }
        for (const pattern of UNMET_NEED_PATTERNS) {
            if (pattern.test(sentence)) {
                matched = true;
                type = "unmet_need";
                localIntensity += 40;
            }
        }
        for (const pattern of PROBLEM_SIGNALS) {
            if (pattern.test(sentence)) {
                matched = true;
                type = "problem_signal";
                localIntensity += 20;
            }
        }

        if (matched) {
            points.push({
                text: sentence.trim(),
                type,
                intensity: Math.min(100, localIntensity + 20) // baseline 20 for being matched
            });
        }
    }

    return points;
}

export function analyzeRedditText(text: string): RedditAnalysisResult {
    if (!text || text.trim().length === 0) {
        return { extractedPoints: [], overallScore: 0, suggestions: [], frequency: { frustration: 0, unmet_need: 0, problem_signal: 0 } };
    }

    const points = sumMatches(text);

    const frequency: Record<string, number> = {
        frustration: 0,
        unmet_need: 0,
        problem_signal: 0
    };

    let totalIntensity = 0;
    points.forEach(p => {
        frequency[p.type] = (frequency[p.type] || 0) + 1;
        totalIntensity += p.intensity;
    });

    const avgIntensity = points.length > 0 ? totalIntensity / points.length : 0;
    const overallScore = Math.min(100, Math.round((points.length * 10) + (avgIntensity * 0.5)));

    const suggestions: string[] = [];
    if (frequency.unmet_need > 0) suggestions.push("High potential: Users are actively looking for a product in this space.");
    if (frequency.frustration > frequency.unmet_need) suggestions.push("Positioning: Focus your copy on relieving the pain they are expressing.");
    if (points.length === 0) suggestions.push("Low signal: Try pasting a thread with more active user complaints or questions.");
    else if (overallScore > 75) suggestions.push("Urgent problem detected. High likelihood of willingness to pay for a solution.");

    return {
        extractedPoints: points.sort((a, b) => b.intensity - a.intensity),
        overallScore,
        suggestions,
        frequency
    };
}
