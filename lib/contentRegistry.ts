import { NEW_ARTICLES, NEW_TOOLS } from "./newContent";
import type { ToolMetadata, SEOArticle } from "./types";

export type { ToolMetadata, SEOArticle };

export const TOOLS: ToolMetadata[] = [
    {
        name: "Reddit Problem & Pain-Point Finder",
        slug: "reddit-pain-finder",
        description: "Analyze any Reddit thread for underlying frustrations, unmet needs, and problem signals using deterministic heuristics.",
        primaryKeyword: "reddit problem finder",
    },
    {
        name: "Subreddit Pain Frequency Analyzer",
        slug: "subreddit-pain-analyzer",
        description: "Process thousands of words to identify trending and recurring complaint themes within a niche.",
        primaryKeyword: "subreddit analyzer tool",
    },
    {
        name: "Freelance Rate Calculator",
        slug: "freelance-rate-calculator",
        description: "An advanced calculator integrating unbillable hours, true expenses, and profit margins.",
        primaryKeyword: "freelance rate calculator with taxes",
    },
    {
        name: "Construction Cost Estimator",
        slug: "construction-cost-estimator",
        description: "Estimate complex project costs accurately using dynamic risk buffers and material waste calculation.",
        primaryKeyword: "simple construction cost estimator",
    },
    {
        name: "Loan Scenario Comparator",
        slug: "loan-scenario-comparator",
        description: "Compare complex amortization scenarios side-by-side to understand compound interest and extra payments.",
        primaryKeyword: "compare loan scenarios side by side",
    }
];

export const ARTICLES: SEOArticle[] = [
    // REDDIT PROBLEM FINDER
    {
        title: "How to Find Startup Ideas on Reddit",
        slug: "how-to-find-startup-ideas",
        toolSlug: "reddit-pain-finder",
        description: "A comprehensive guide on utilizing Reddit's massive user base to mine for lucrative, unfulfilled startup ideas.",
        keyword: "find startup ideas on reddit",
        lastUpdated: "2024-05-01",
        content: `
      <h2>The Goldmine of Unfiltered Opinions</h2>
      <p>Finding a startup idea isn't about sitting in a room thinking of something clever. It is about actively listening to what people are complaining about. Reddit is arguably the largest repository of unfiltered human complaints on the internet.</p>
      
      <h3>Identifying High-Signal Communities</h3>
      <p>Rather than looking at broad subreddits like <code>/r/technology</code> or <code>/r/business</code>, the best ideas come from highly specific niche communities. Look for subreddits ending in 'Professionals' or 'Owners' (e.g., <code>/r/restaurantowners</code> or <code>/r/dentistry</code>).</p>
      
      <h3>Framework for Mining Ideas</h3>
      <ul>
        <li><strong>The "I Hate" Query:</strong> Search within a subreddit for "I hate", "I'm tired of", or "Why is it so hard to".</li>
        <li><strong>The "Workaround" Query:</strong> Look for users mentioning "My workaround is" or "I use this spreadsheet to". Spreadsheets are the precursors to SaaS.</li>
      </ul>

      <h3>Using Automated Tools</h3>
      <p>Manually reading through thousands of comments is incredibly tedious. By utilizing an automated parser like the <strong>Reddit Problem Finder</strong>, you can instantly strip away the noise and zero in on sentences strictly correlated with frustration and unmet needs.</p>

      <h2>The Validation Phase</h2>
      <p>Once you extract a potential pain point, cross-reference it. Do 10 other people in that same thread agree? Do they complain about the existing tools? That is your wedge into the market.</p>
    `
    },
    {
        title: "Validate Your Business Idea Using Reddit",
        slug: "validate-business-idea-reddit",
        toolSlug: "reddit-pain-finder",
        description: "Don't build before you validate. Learn how to test your business premise inside Reddit communities without getting banned.",
        keyword: "validate startup idea reddit",
        lastUpdated: "2024-05-15",
        content: `
      <h2>The Danger of Building in an Echo Chamber</h2>
      <p>Most founders build products based on intuition, spending months writing code before showing it to a single user. Reddit provides a rapid validation loop, provided you understand the culture of the platform. Redditors are notoriously hostile to overt self-promotion.</p>
      
      <h3>The "Help Me Understand" Post</h3>
      <p>Instead of pitching a product, pitch a problem. Write a post saying, <em>"I'm struggling with X. I've tried A, B, and C tools, but they all fail at Y. How do you guys handle this?"</em> If the community agrees and shares your frustration, the problem is real.</p>
      
      <h3>Analyzing The Pushback</h3>
      <p>Pay close attention to users who defend the current way of doing things. They will reveal the switching costs your future product needs to overcome.</p>
    `
    },
    {
        title: "Understanding Unmet Needs Online",
        slug: "reddit-problem-research-guide",
        toolSlug: "reddit-pain-finder",
        description: "The complete guide to qualitative market research using public forums and interpreting digital sentiment.",
        keyword: "discovering unmet needs online",
        lastUpdated: "2024-05-20",
        content: `<h2>Mastering Qualitative Analysis</h2><p>Qualitative analysis is identifying the 'why' behind user behavior...</p>`
    },
    {
        title: "How to Find User Pain Points Online",
        slug: "find-user-pain-points-online",
        toolSlug: "reddit-pain-finder",
        description: "Track user frustration across forums to build better products and target your marketing accurately.",
        keyword: "how to find pain points for business",
        lastUpdated: "2024-05-22",
        content: `<h2>The Psychology of a Pain Point</h2><p>People rarely buy software because they want new features; they buy to escape pain...</p>`
    },
    {
        title: "Startup Idea Validation Methods",
        slug: "startup-idea-validation-methods",
        toolSlug: "reddit-pain-finder",
        description: "Comparing 5 distinct methods of startup idea validation including Reddit, cold email, and landing pages.",
        keyword: "reddit product validation",
        lastUpdated: "2024-05-25",
        content: `<h2>Beyond the Landing Page Test</h2><p>While the classic landing page test measures intent to buy, Reddit testing measures the depth of the initial problem...</p>`
    },

    // FREELANCE RATE CALCULATOR
    {
        title: "How to Price Your Freelance Services",
        slug: "how-to-price-freelance-services",
        toolSlug: "freelance-rate-calculator",
        description: "Stop guessing your rates. A complete guide on value-based pricing, hourly structures, and covering hidden costs.",
        keyword: "how much should i charge as a freelancer",
        lastUpdated: "2024-06-01",
        content: `
      <h2>The Fatal Flaw in Hourly Pricing</h2>
      <p>Most beginners look at a standard W-2 salary, divide it by 2000 hours, and arrive at a catastrophic conclusion. If you want to make $100k, $50 an hour will bankrupt your freelance business. Why? Because it assumes 100% utilization, zero taxes, and zero overhead.</p>
      
      <h3>Calculating the "True" Hourly Rate</h3>
      <p>A sustainable freelance rate must account for:</p>
      <ul>
        <li><strong>Self-Employment Tax:</strong> You are responsible for both the employer and employee side of payroll taxes.</li>
        <li><strong>Unbillable Time:</strong> Accounting for marketing, sales calls, invoices, and email. You will realistically only bill 20-25 hours a week.</li>
        <li><strong>Overhead:</strong> Software, equipment, health insurance, and retirement.</li>
      </ul>

      <h3>Moving Toward Value-Based Pricing</h3>
      <p>Working hourly eventually caps your earning potential. Once you have used our Freelance Rate Calculator to establish your absolute minimum baseline floor, you should attempt to quote projects on a flat, value-basis.</p>
    `
    },
    {
        title: "Calculating Your Freelance Profit Margin",
        slug: "freelance-profit-margin-guide",
        toolSlug: "freelance-rate-calculator",
        description: "Why you need a profit margin on top of your 'salary' to run a successful freelance operation.",
        keyword: "freelance profit margin calculator",
        lastUpdated: "2024-06-05",
        content: `<h2>You Are A Business, Not Just An Employee</h2><p>Your salary pays you for doing the work. Your profit margin pays your business for taking the risk of existing...</p>`
    },
    {
        title: "The Hidden Costs of Freelancing",
        slug: "hidden-costs-of-freelancing",
        toolSlug: "freelance-rate-calculator",
        description: "Identifying the silent cash flow killers in your independent business.",
        keyword: "hidden costs of freelancing",
        lastUpdated: "2024-06-10",
        content: `<h2>The Leaky Bucket Syndrome</h2><p>Subscriptions, payment processing fees (Stripe 2.9%), and accounting costs rapidly drain what looks like a lucrative rate...</p>`
    },
    {
        title: "Managing Freelance Unbillable Hours",
        slug: "freelance-unbillable-hours",
        toolSlug: "freelance-rate-calculator",
        description: "How to track, minimize, and price in your administrative time so you don't work for free.",
        keyword: "freelance unbillable hours",
        lastUpdated: "2024-06-12",
        content: `<h2>The Myth of 40 Hours</h2><p>If you are billing 40 hours a week as a freelancer, you are likely working 60. Administrative drag is real...</p>`
    },
    {
        title: "Transitioning to a Freelance Salary Equivalent",
        slug: "w2-to-freelance-salary-equivalent",
        toolSlug: "freelance-rate-calculator",
        description: "The math required to leave a full-time job and maintain your current standard of living as an independent.",
        keyword: "transition to freelance salary equivalent",
        lastUpdated: "2024-06-15",
        content: `<h2>The X1.5 Rule</h2><p>As a rule of thumb, to maintain a W-2 standard of living, your gross freelance revenue must often be 30-50% higher than your old salary...</p>`
    },

    // LOAN COMPARATOR
    {
        title: "The True Impact of Compound Interest on Mortgages",
        slug: "compound-interest-mortgage-impact",
        toolSlug: "loan-scenario-comparator",
        description: "Understand the heavy front-loading of interest on 30-year mortgages and how to bypass it.",
        keyword: "compound interest mortgage impact",
        lastUpdated: "2024-07-01",
        content: `
      <h2>The Illusion of the Monthly Payment</h2>
      <p>Banks sell loans based on the monthly payment, blinding borrowers to the total cost of capital over a 30-year timeline. Due to the way amortization works, the payments in the first decade are deeply skewed toward pure interest.</p>
      
      <h3>How Amortization Traps You</h3>
      <p>In month one of a 30-year, $400k loan at 7%, your payment might be $2,661. However, $2,333 of that goes straight to the bank as interest. Only $328 actually pays down your debt. You are renting the money at an extraordinary premium.</p>
    `
    },
    {
        title: "How to Pay Off Your Mortgage Early",
        slug: "how-to-pay-off-mortgage-early",
        toolSlug: "loan-scenario-comparator",
        description: "Actionable strategies utilizing extra principal payments to shave decades off your loan.",
        keyword: "how to pay off mortgage early",
        lastUpdated: "2024-07-05",
        content: `<h2>The Power of Asymmetry</h2><p>Because early payments are mostly interest, making even tiny extra principal payments early in the loan prevents massive compounding chains from forming...</p>`
    },
    {
        title: "Amortization Schedules and Extra Payments",
        slug: "amortization-schedule-extra-payments",
        toolSlug: "loan-scenario-comparator",
        description: "A deep dive into how extra payments alter the amortization schedule mathematically.",
        keyword: "amortization schedule extra payments",
        lastUpdated: "2024-07-10",
        content: `<h2>Recalculating the Curve</h2><p>Every dollar mapped against the principal forces a recalculation of the compound interest owed in the subsequent month...</p>`
    },
    {
        title: "The True Cost of a 30 Year Mortgage",
        slug: "true-cost-of-30-year-mortgage",
        toolSlug: "loan-scenario-comparator",
        description: "Revealing the total payout amount and why a 30-year note often costs double the purchase price.",
        keyword: "true cost of 30 year mortgage",
        lastUpdated: "2024-07-15",
        content: `<h2>Double or Nothing</h2><p>At current interest rates, borrowing $500,000 for 30 years means you will often pay back over $1,000,000 in total. Understanding this macroeconomic reality is vital...</p>`
    },
    {
        title: "Comparing 15 vs 30 Year Mortgages",
        slug: "compare-15-vs-30-year-mortgage",
        toolSlug: "loan-scenario-comparator",
        description: "Analyze the cash flow trade-offs versus total interest savings when selecting a loan term length.",
        keyword: "compare 15 vs 30 year mortgage",
        lastUpdated: "2024-07-20",
        content: `<h2>Flexibility Vs Efficiency</h2><p>A 15-year mortgage enforces ruthless principal paydown but locks up liquidity. A 30-year mortgage offers cash flow flexibility but requires immense discipline to pay down early...</p>`
    },

    // SUBREDDIT ANALYZER
    {
        title: "How to Analyze Subreddit Sentiment",
        slug: "analyze-subreddit-sentiment",
        toolSlug: "subreddit-pain-analyzer",
        description: "Extract emotional trends and product sentiment algorithms from raw niche forum data.",
        keyword: "analyze subreddit sentiment",
        lastUpdated: "2024-08-01",
        content: `<h2>Scaling Empathy</h2><p>Reading 10 posts is manual empathy. Analyzing 10,000 posts is scaled sentiment tracking. Use tokenization to find recurring emotional distress signals.</p>`
    },
    {
        title: "Find Common Reddit Complaints",
        slug: "find-common-reddit-complaints",
        toolSlug: "subreddit-pain-analyzer",
        description: "A framework for targeting the highest-frequency, most unendurable complaints in any niche.",
        keyword: "find common complaints on reddit",
        lastUpdated: "2024-08-05",
        content: `<h2>Frequency vs Intensity</h2><p>A complaint mentioned 1,000 times might be a minor annoyance. A complaint mentioned 100 times with explicit emotional anger is a startup opportunity.</p>`
    },
    {
        title: "Niche Market Analysis via Reddit",
        slug: "niche-market-analysis-reddit",
        toolSlug: "subreddit-pain-analyzer",
        description: "Avoid expensive focus groups by leveraging preexisting segmented communities.",
        keyword: "niche market analysis reddit",
        lastUpdated: "2024-08-10",
        content: `<h2>The Ultimate Focus Group</h2><p>Reddit inherently segments users into hyper-specific demographic and psychographic groups natively via subreddits. It is free market research.</p>`
    },
    {
        title: "Reddit Audience Research Guide",
        slug: "reddit-audience-research-guide",
        toolSlug: "subreddit-pain-analyzer",
        description: "Build incredibly accurate user personas by algorithmically processing subreddit discourse.",
        keyword: "reddit audience research",
        lastUpdated: "2024-08-15",
        content: `<h2>Building Accurate Personas</h2><p>Forget generic 'Marketing Mary' personas. Look at the exact vernacular and tooling your prospective customers are actually discussing.</p>`
    },
    {
        title: "Extract Themes From Reddit Posts",
        slug: "extract-themes-reddit-posts",
        toolSlug: "subreddit-pain-analyzer",
        description: "Using bigram extraction and stop-word removal to classify unstructured text.",
        keyword: "extract themes from reddit posts",
        lastUpdated: "2024-08-20",
        content: `<h2>NLP for Business</h2><p>By extracting two-word combinations (bigrams), we can identify concepts like 'customer service' or 'software crashing' instantly.</p>`
    },

    // CONSTRUCTION ESTIMATOR
    {
        title: "Contractor Markup Calculator Guide",
        slug: "contractor-markup-calculator-guide",
        toolSlug: "construction-cost-estimator",
        description: "Stop underpricing your jobs. How to apply correct margin markup versus gross profit markup.",
        keyword: "contractor markup calculator",
        lastUpdated: "2024-09-01",
        content: `<h2>Margin vs Markup</h2><p>Applying a 20% markup to costs does NOT equal a 20% gross profit margin. This fundamental mathematical error bankrupts contractors daily.</p>`
    },
    {
        title: "How to Estimate Construction Jobs",
        slug: "how-to-estimate-construction-jobs",
        toolSlug: "construction-cost-estimator",
        description: "A structural process for estimating labor, materials, waste, and contingency overhead accurately.",
        keyword: "how to estimate construction jobs",
        lastUpdated: "2024-09-05",
        content: `<h2>The Phased Estimate</h2><p>Do not guess. Break the job down into materials (plus waste factor), highly buffered labor, equipment leasing, and risk contingency.</p>`
    },
    {
        title: "Calculate Material Waste Factor",
        slug: "calculate-material-waste-factor",
        toolSlug: "construction-cost-estimator",
        description: "Why failing to incorporate a 10-15% materials waste buffer guarantees a loss on complex jobs.",
        keyword: "calculate material waste factor",
        lastUpdated: "2024-09-10",
        content: `<h2>Expectation of Error</h2><p>Cuts are wrong. Materials arrive damaged. Angles aren't perfectly square. Always factor waste into the initial client bid.</p>`
    },
    {
        title: "Construction Contingency Budget",
        slug: "construction-contingency-budget",
        toolSlug: "construction-cost-estimator",
        description: "Protecting your bottom line against unforeseeable site conditions and weather delays.",
        keyword: "construction contingency budget",
        lastUpdated: "2024-09-15",
        content: `<h2>The Unknown Unknowns</h2><p>Whenever you open a wall or dig into the earth, assume there will be unmapped pipes or rot. A 5-10% contingency protects your baseline profit.</p>`
    },
    {
        title: "Estimating Labor Costs in Construction",
        slug: "estimating-labor-costs-construction",
        toolSlug: "construction-cost-estimator",
        description: "Accounting for labor burdens, taxes, insurance, and realistic productivity rates.",
        keyword: "estimating labor costs construction",
        lastUpdated: "2024-09-20",
        content: `<h2>The True Cost of Labor</h2><p>A $30/hr employee costs the company $45/hr when you factor in workers compensation, payroll taxes, and vehicle liability. Estimate based on the burdened rate.</p>`
    }
];

export function getToolsList(): ToolMetadata[] {
    return [...TOOLS, ...NEW_TOOLS];
}

export function getAllArticles(): SEOArticle[] {
    return [...ARTICLES, ...NEW_ARTICLES];
}

export function getArticlesForTool(toolSlug: string): SEOArticle[] {
    return getAllArticles().filter(a => a.toolSlug === toolSlug);
}

export function getArticleBySlug(articleSlug: string): SEOArticle | undefined {
    return getAllArticles().find(a => a.slug === articleSlug);
}

export function getToolBySlug(toolSlug: string): ToolMetadata | undefined {
    return getToolsList().find(t => t.slug === toolSlug);
}
