'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────
// 1. TOKEN CONVERTER WIDGET
// ─────────────────────────────────────────────────────────────────
export function TokenConverterWidget() {
  const [text, setText] = useState('');
  const [textType, setTextType] = useState<'english' | 'technical' | 'code' | 'multilingual'>('english');

  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    let ratio = 1.33;
    if (textType === 'technical') ratio = 1.6;
    if (textType === 'code') ratio = 2.5;
    if (textType === 'multilingual') ratio = 3.5;

    const tokens = Math.ceil(words * ratio);

    // Approximate cost for 1k executions
    const costGpt4o = (tokens / 1000000) * 2.50;
    const costSonnet = (tokens / 1000000) * 3.00;
    const costGeminiFlash = (tokens / 1000000) * 0.075;

    return { chars, words, tokens, costGpt4o, costSonnet, costGeminiFlash };
  }, [text, textType]);

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '3rem' }}>
      <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Interactive Words-to-Tokens Converter</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Select Content Type</label>
          <select 
            value={textType} 
            onChange={(e: any) => setTextType(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
          >
            <option value="english">Standard English (1.33 tokens/word)</option>
            <option value="technical">Technical / Legal / Math (1.60 tokens/word)</option>
            <option value="code">JSON Payload / Code Syntax (2.50 tokens/word)</option>
            <option value="multilingual">Non-English / Multilingual (3.50 tokens/word)</option>
          </select>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your prompt, document, or code here to convert..."
        style={{ width: '100%', height: '150px', padding: '1rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontFamily: 'inherit', marginBottom: '1.5rem', resize: 'vertical' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Word Count</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stats.words.toLocaleString()}</div>
        </div>
        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Character Count</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stats.chars.toLocaleString()}</div>
        </div>
        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--accent-primary)' }}>Estimated Tokens</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{stats.tokens.toLocaleString()}</div>
        </div>
      </div>

      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Estimated API Input Cost (Per 1,000 Runs)</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>GPT-4o</span>
          <div style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginTop: '0.25rem' }}>${stats.costGpt4o.toFixed(4)}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>At $2.50 / Million Tokens</span>
        </div>
        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Claude 3.5 Sonnet</span>
          <div style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginTop: '0.25rem' }}>${stats.costSonnet.toFixed(4)}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>At $3.00 / Million Tokens</span>
        </div>
        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Gemini 1.5 Flash</span>
          <div style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginTop: '0.25rem' }}>${stats.costGeminiFlash.toFixed(5)}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>At $0.075 / Million Tokens</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 2. LLM PRICING MATRIX WIDGET
// ─────────────────────────────────────────────────────────────────
const MODEL_PRICING_DATA = [
  { name: 'DeepSeek V3', provider: 'DeepSeek', context: '128k', input: 0.14, output: 0.28, cacheHit: 0.014 },
  { name: 'GPT-4o-mini', provider: 'OpenAI', context: '128k', input: 0.15, output: 0.60, cacheHit: 0.075 },
  { name: 'Gemini 1.5 Flash', provider: 'Google', context: '2M', input: 0.075, output: 0.30, cacheHit: 0.037 },
  { name: 'GPT-4o', provider: 'OpenAI', context: '128k', input: 2.50, output: 10.00, cacheHit: 1.25 },
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', context: '200k', input: 3.00, output: 15.00, cacheHit: 0.30 },
  { name: 'Gemini 1.5 Pro', provider: 'Google', context: '2M', input: 1.25, output: 5.00, cacheHit: 0.625 },
  { name: 'Claude 3.5 Haiku', provider: 'Anthropic', context: '200k', input: 0.80, output: 4.00, cacheHit: 0.08 },
  { name: 'Mistral Large 2', provider: 'Mistral', context: '128k', input: 2.00, output: 6.00, cacheHit: 2.00 },
  { name: 'Llama 3.3 70B (Serverless)', provider: 'Meta', context: '128k', input: 0.35, output: 0.40, cacheHit: 0.35 }
];

export function LlmPricingMatrixWidget() {
  const [providerFilter, setProviderFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODEL_PRICING_DATA[3]);

  // Cost calculator states
  const [inputTokens, setInputTokens] = useState('1000');
  const [outputTokens, setOutputTokens] = useState('500');
  const [requestsPerDay, setRequestsPerDay] = useState('100');

  const filteredModels = useMemo(() => {
    return MODEL_PRICING_DATA.filter(m => {
      const matchProvider = providerFilter === 'All' || m.provider === providerFilter;
      const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchProvider && matchSearch;
    });
  }, [providerFilter, searchQuery]);

  const calculations = useMemo(() => {
    const inputs = parseFloat(inputTokens) || 0;
    const outputs = parseFloat(outputTokens) || 0;
    const dailyReq = parseFloat(requestsPerDay) || 0;

    const inputCost = (inputs / 1000000) * selectedModel.input;
    const outputCost = (outputs / 1000000) * selectedModel.output;
    const costPerCall = inputCost + outputCost;
    
    const dailyBill = costPerCall * dailyReq;
    const monthlyBill = dailyBill * 30;

    return { costPerCall, dailyBill, monthlyBill };
  }, [inputTokens, outputTokens, requestsPerDay, selectedModel]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
      <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Interactive LLM Pricing Specs Explorer</h3>
        
        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search model or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', minWidth: '200px' }}
          />
          <select
            value={providerFilter}
            onChange={(e: any) => setProviderFilter(e.target.value)}
            style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
          >
            <option value="All">All Providers</option>
            <option value="OpenAI">OpenAI</option>
            <option value="Anthropic">Anthropic</option>
            <option value="Google">Google</option>
            <option value="DeepSeek">DeepSeek</option>
            <option value="Mistral">Mistral</option>
            <option value="Meta">Meta</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left', backgroundColor: 'var(--bg-tertiary)' }}>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>Model Name</th>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>Provider</th>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>Context Size</th>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>Input / MTok</th>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>Output / MTok</th>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>Cached / MTok</th>
                <th style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((m, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: selectedModel.name === m.name ? 'var(--accent-muted)' : 'transparent' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{m.name}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{m.provider}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{m.context}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>${m.input.toFixed(3)}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>${m.output.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>${m.cacheHit.toFixed(3)}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <button
                      onClick={() => setSelectedModel(m)}
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-primary)', cursor: 'pointer' }}
                    >
                      Calculate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill Calculator */}
      <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Estimate Your Billing on: <span style={{ color: 'var(--accent-primary)' }}>{selectedModel.name}</span></h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Input Tokens / Query</label>
            <input
              type="number"
              value={inputTokens}
              onChange={(e) => setInputTokens(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Output Tokens / Query</label>
            <input
              type="number"
              value={outputTokens}
              onChange={(e) => setOutputTokens(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Queries / Day</label>
            <input
              type="number"
              value={requestsPerDay}
              onChange={(e) => setRequestsPerDay(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Cost Per Query</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '0.25rem' }}>${calculations.costPerCall.toFixed(4)}</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Daily Running Bill</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '0.25rem' }}>${calculations.dailyBill.toFixed(2)}</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--accent-primary)' }}>Monthly API Expense</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '0.25rem' }}>${calculations.monthlyBill.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 3. CONTEXT LIMIT CHART WIDGET
// ─────────────────────────────────────────────────────────────────
export function ContextLimitChartWidget() {
  const [contextInput, setContextInput] = useState(15000);

  const kvCacheVram = useMemo(() => {
    // Model assumptions: Llama 3 70B
    // KV Cache VRAM per token ≈ 2 * Layers * Heads * Dim * Precision
    // Approx 0.15 MB per token in 16-bit or Q4 implementations.
    const sizeMb = contextInput * 0.15;
    const sizeGb = sizeMb / 1024;
    return sizeGb;
  }, [contextInput]);

  const models = [
    { name: 'Gemini 1.5 Pro', size: 2000000, color: '#4285F4' },
    { name: 'Claude 3.5 Sonnet', size: 200000, color: '#D97706' },
    { name: 'GPT-4o', size: 128000, color: '#10B981' },
    { name: 'Llama 3.3 70B', size: 128000, color: '#047857' },
    { name: 'DeepSeek V3', size: 128000, color: '#3B82F6' },
    { name: 'Mistral Large 2', size: 128000, color: '#EF4444' }
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '3rem' }}>
      <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>LLM Context Window Limit Visualizer</h3>
      
      {/* Bars Chart */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
        {models.map((m, idx) => {
          // Logarithmic or proportional scale. Since 2M is huge, let's use percentage with a cut-off scale or standard width
          const pct = m.size === 2000000 ? 100 : Math.max(5, (m.size / 2000000) * 100);
          return (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{m.name}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{m.size.toLocaleString()} tokens</span>
              </div>
              <div style={{ width: '100%', height: '16px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', backgroundColor: m.color, borderRadius: 'var(--radius-full)' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* KV Cache Calculator */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Context KV Cache Memory Calculator</h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Filling the context window allocates active Key-Value (KV) memory on the GPU. Estimate KV Cache VRAM allocation for a 70B parameter model.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Active Context Length: {contextInput.toLocaleString()} tokens</label>
          <input
            type="range"
            min={1000}
            max={128000}
            step={1000}
            value={contextInput}
            onChange={(e) => setContextInput(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
          />
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Estimated KV Cache VRAM</span>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>For Llama 3 70B FP16 execution</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
            {kvCacheVram.toFixed(2)} GB
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 4. GPU SPEC RECOMMENDER WIDGET
// ─────────────────────────────────────────────────────────────────
export function GpuSpecRecommenderWidget() {
  const [paramSize, setParamSize] = useState('70');
  const [quantLevel, setQuantLevel] = useState('Q4');

  const stats = useMemo(() => {
    const size = parseFloat(paramSize) || 0;
    let multiplier = 2; // FP16
    if (quantLevel === 'Q8') multiplier = 1.05;
    if (quantLevel === 'Q4') multiplier = 0.55;
    if (quantLevel === 'Q2') multiplier = 0.32;

    const baseWeightsVram = size * multiplier;
    // Context buffer (average 8k tokens)
    const contextBuffer = 8000 * 0.15 / 1024;
    const minVram = baseWeightsVram + contextBuffer + 1.5; // system overhead

    let hardware = '';
    let tokensSec = '';
    
    if (minVram <= 6) {
      hardware = 'Nvidia RTX 4060 (8GB) or Mac M2/M3 Air';
      tokensSec = 'Fast (40-60 tokens/sec)';
    } else if (minVram <= 12) {
      hardware = 'Nvidia RTX 4070 (12GB) or Mac M2/M3 (16GB)';
      tokensSec = 'Fast (35-50 tokens/sec)';
    } else if (minVram <= 24) {
      hardware = '1x RTX 3090 / 4090 (24GB) or Mac Studio (32GB)';
      tokensSec = 'Fast (30-45 tokens/sec)';
    } else if (minVram <= 48) {
      hardware = '2x RTX 3090 / RTX 4090 (48GB VRAM total) or Mac Studio (64GB)';
      tokensSec = 'Medium (15-25 tokens/sec)';
    } else if (minVram <= 96) {
      hardware = '4x RTX 3090 (96GB) or Mac Studio 128GB Unified Memory';
      tokensSec = 'Medium (12-18 tokens/sec)';
    } else {
      hardware = 'Enterprise Cloud Node (1x A100 80GB / H100) or Mac Studio 192GB';
      tokensSec = 'Fast on GPU Cluster';
    }

    return { minVram, hardware, tokensSec };
  }, [paramSize, quantLevel]);

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '3rem' }}>
      <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Local LLM VRAM & GPU Specification Recommender</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Model Parameter Size</label>
          <select 
            value={paramSize} 
            onChange={(e: any) => setParamSize(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
          >
            <option value="8">8 Billion (e.g. Llama 3 8B)</option>
            <option value="14">14 Billion (e.g. Qwen 2.5 14B)</option>
            <option value="32">32 Billion (e.g. Qwen 2.5 32B)</option>
            <option value="70">70 Billion (e.g. Llama 3 70B)</option>
            <option value="405">405 Billion (e.g. Llama 3 405B)</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Quantization (Compression)</label>
          <select 
            value={quantLevel} 
            onChange={(e: any) => setQuantLevel(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
          >
            <option value="FP16">FP16 / BF16 (No accuracy loss - 16-bit)</option>
            <option value="Q8">Q8 / INT8 (Indistinguishable - 8-bit)</option>
            <option value="Q4">Q4 / GGUF Medium (Recommended - 4-bit)</option>
            <option value="Q2">Q2 / GGUF Low (Significant accuracy loss - 2-bit)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Minimum VRAM Required</span>
          <div style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '0.5rem' }}>{stats.minVram.toFixed(1)} GB</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Includes context cache & OS overhead</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Recommended GPU Configuration</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{stats.hardware}</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Estimated Inference Speeds</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '0.25rem' }}>{stats.tokensSec}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
