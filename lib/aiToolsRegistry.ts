// Registry for AI ecosystem data

export interface LLMProvider {
    name: string;
    description: string;
    url: string;
    models: string[];
    limits: string;
    cost: 'Free' | 'Freemium' | 'Trial Credits';
    capabilities: string[];
}

export interface AgentSkill {
    name: string;
    source: 'Claude' | 'OpenClaw' | 'Community' | 'NemoClaw';
    description: string;
    useCase: string;
    url: string;
}

export interface FreeAPI {
    name: string;
    description: string;
    category: string;
    auth: 'None' | 'API Key' | 'OAuth';
    cost: 'Free' | 'Freemium';
    url: string;
}

export interface AIResource {
    name: string;
    description: string;
    type: 'Framework' | 'Tutorial' | 'Tool' | 'Collection';
    url: string;
}

export const LLM_PROVIDERS: LLMProvider[] = [
    {
        name: "OpenRouter",
        description: "A unified AI API router handling access to dozens of models, including completely free tier models like Gemma and Llama 3.",
        url: "https://openrouter.ai/",
        models: ["Gemma 3 12B/27B", "Llama 3.3 70B", "Mistral Small"],
        limits: "20 req/min, 200/day free",
        cost: "Free",
        capabilities: ["Text", "Code"]
    },
    {
        name: "Google AI Studio",
        description: "Direct API access to Google's Gemini models with a very generous free tier for developers.",
        url: "https://aistudio.google.com/",
        models: ["Gemini 1.5 Pro", "Gemini 1.5 Flash", "Gemini 1.0 Pro"],
        limits: "15 req/min, 1 million tokens/min",
        cost: "Freemium",
        capabilities: ["Text", "Vision", "Code", "Audio"]
    },
    {
        name: "Groq",
        description: "LPU-powered inference engine offering incredibly fast generation speeds for open-source models.",
        url: "https://console.groq.com/",
        models: ["Llama 3 70B", "Mixtral 8x7B", "Gemma 7B"],
        limits: "30 req/min, 14,400/day",
        cost: "Freemium",
        capabilities: ["Text", "Code"]
    },
    {
        name: "Cerebras",
        description: "Wafer-Scale Engine inference providing extreme token generation speeds for Llama models.",
        url: "https://cloud.cerebras.ai/",
        models: ["Llama 3.1 70B", "Llama 3.1 8B"],
        limits: "Trial credits available",
        cost: "Trial Credits",
        capabilities: ["Text", "Code"]
    },
    {
        name: "Hugging Face Inference",
        description: "Serverless inference APIs for thousands of open-weight models hosted on the Hugging Face hub.",
        url: "https://huggingface.co/docs/inference-providers/en/index",
        models: ["Various Open Models (<10GB)"],
        limits: "$0.10/month in credits free",
        cost: "Free",
        capabilities: ["Text", "Vision", "Code"]
    },
    {
        name: "Mistral (La Plateforme)",
        description: "Official API access to Mistral's open and proprietary models with an experiment tier.",
        url: "https://console.mistral.ai/",
        models: ["Mistral Small", "Codestral", "Mistral Nemo"],
        limits: "1 req/sec, 500k tokens/min",
        cost: "Freemium",
        capabilities: ["Text", "Code"]
    },
    {
        name: "GitHub Models",
        description: "Free prototyping access to premium models directly within the GitHub ecosystem.",
        url: "https://github.com/marketplace/models",
        models: ["OpenAI o1/o3", "Claude 3.5 Sonnet", "Llama 3.3"],
        limits: "Rate limited by Copilot tier",
        cost: "Freemium",
        capabilities: ["Text", "Vision", "Code"]
    },
    {
        name: "Cohere",
        description: "Enterprise-grade LLMs specialized in RAG, search, and multilingual generation.",
        url: "https://cohere.com/",
        models: ["Command R", "Command R+", "Aya"],
        limits: "20 req/min, 1000/month free",
        cost: "Freemium",
        capabilities: ["Text", "Search"]
    }
];

export const AGENT_SKILLS: AgentSkill[] = [
    {
        name: "Puppeteer Web Scraper",
        source: "Claude",
        description: "Allows Claude to spin up a headless browser to extract dynamic JS-rendered website data.",
        useCase: "Data scraping & market research",
        url: "https://github.com/anthropics/skills"
    },
    {
        name: "File System Operator",
        source: "OpenClaw",
        description: "Permits agents to read, write, and manipulate local files within a sandboxed environment.",
        useCase: "Local codebase refactoring",
        url: "https://github.com/openclaw/skills"
    },
    {
        name: "Database SQL Executor",
        source: "Community",
        description: "Grants read-only SQL execution capabilities for agents to query PostgreSQL or MySQL schemas.",
        useCase: "Automated data analysis",
        url: "https://github.com/ComposioHQ/awesome-claude-skills"
    },
    {
        name: "GitHub PR Reviewer",
        source: "Claude",
        description: "Integrates with GitHub API to fetch PRs, read diffs, and post inline review comments.",
        useCase: "Automated code review",
        url: "https://github.com/anthropics/skills"
    },
    {
        name: "Slack Notifier",
        source: "NemoClaw",
        description: "Simple webhook skill to let agents ping specific Slack channels upon task completion.",
        useCase: "Workflow notifications",
        url: "https://github.com/VoltAgent/awesome-nemoclaw"
    },
    {
        name: "API Spec Generator",
        source: "OpenClaw",
        description: "Reads route files and automatically generates OpenAPI/Swagger documentation.",
        useCase: "Documentation automation",
        url: "https://github.com/openclaw/skills"
    },
    {
        name: "Jira Issue Manager",
        source: "Claude",
        description: "Creates, updates, and transitions Jira tickets based on conversation context.",
        useCase: "Project management",
        url: "https://github.com/anthropics/skills"
    },
    {
        name: "Docker Container Orchestrator",
        source: "Community",
        description: "Allows agents to build, run, and inspect local Docker containers.",
        useCase: "Environment testing",
        url: "https://github.com/VoltAgent/awesome-agent-skills"
    }
];

export const FREE_APIS: FreeAPI[] = [
    {
        name: "PokeAPI",
        description: "The RESTful Pokémon API. Excellent robust mock data for testing frontend frameworks.",
        category: "Entertainment",
        auth: "None",
        cost: "Free",
        url: "https://pokeapi.co/"
    },
    {
        name: "Open-Meteo",
        description: "Open-source weather API offering highly detailed forecast models with no API key required.",
        category: "Weather",
        auth: "None",
        cost: "Free",
        url: "https://open-meteo.com/"
    },
    {
        name: "DummyJSON",
        description: "Get dummy data in JSON format for e-commerce, user profiles, and posts.",
        category: "Dev Tools",
        auth: "None",
        cost: "Free",
        url: "https://dummyjson.com/"
    },
    {
        name: "IPTV Org",
        description: "Massive collection of publicly available IPTV channels from all over the world.",
        category: "Entertainment",
        auth: "None",
        cost: "Free",
        url: "https://github.com/iptv-org/iptv"
    },
    {
        name: "ExchangeRate-API",
        description: "Free currency conversion and exchange rate API with generous free tiers.",
        category: "Finance",
        auth: "API Key",
        cost: "Freemium",
        url: "https://www.exchangerate-api.com/"
    },
    {
        name: "REST Countries",
        description: "Get information about countries via a RESTful API. Good for geography apps.",
        category: "Data",
        auth: "None",
        cost: "Free",
        url: "https://restcountries.com/"
    },
    {
        name: "NASA Open APIs",
        description: "Access imagery, mars rover data, and asteroid tracking from NASA.",
        category: "Data",
        auth: "API Key",
        cost: "Freemium",
        url: "https://api.nasa.gov/"
    },
    {
        name: "JSONPlaceholder",
        description: "Fake online REST API for testing and prototyping.",
        category: "Dev Tools",
        auth: "None",
        cost: "Free",
        url: "https://jsonplaceholder.typicode.com/"
    },
    {
        name: "Polygon.io",
        description: "Stock market, forex, and crypto data APIs. Great developer experience.",
        category: "Finance",
        auth: "API Key",
        cost: "Freemium",
        url: "https://polygon.io/"
    },
    {
        name: "TMDB",
        description: "The Movie Database API. Industry standard for film and television metadata.",
        category: "Entertainment",
        auth: "API Key",
        cost: "Free",
        url: "https://www.themoviedb.org/documentation/api"
    }
];

export const AI_RESOURCES: AIResource[] = [
    {
        name: "LangChain",
        description: "A framework for developing applications powered by large language models.",
        type: "Framework",
        url: "https://python.langchain.com/"
    },
    {
        name: "CrewAI",
        description: "Framework for orchestrating role-playing, autonomous AI agents.",
        type: "Framework",
        url: "https://www.crewai.com/"
    },
    {
        name: "Anthropic API Docs",
        description: "Official documentation for building with Claude and tool use.",
        type: "Tutorial",
        url: "https://docs.anthropic.com/en/docs/tool-use"
    },
    {
        name: "Vercel AI SDK",
        description: "The TypeScript toolkit for building AI applications with React, Next.js, and Svelte.",
        type: "Framework",
        url: "https://sdk.vercel.ai/docs"
    },
    {
        name: "OpenAI Cookbook",
        description: "Examples and guides for using the OpenAI API.",
        type: "Collection",
        url: "https://cookbook.openai.com/"
    },
    {
        name: "Ollama",
        description: "Get up and running with large language models locally on your machine.",
        type: "Tool",
        url: "https://ollama.com/"
    },
    {
        name: "AutoGen",
        description: "A programming framework for agentic AI by Microsoft Research.",
        type: "Framework",
        url: "https://microsoft.github.io/autogen/"
    },
    {
        name: "LlamaIndex",
        description: "A data framework for building LLM applications over external data.",
        type: "Framework",
        url: "https://www.llamaindex.ai/"
    }
];
