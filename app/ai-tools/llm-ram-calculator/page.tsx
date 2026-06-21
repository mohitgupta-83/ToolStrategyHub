"use client";

import { useState, useRef, useEffect } from "react";
import AIToolLayout from "@/components/AIToolLayout";
import Link from "next/link";
import { trackUsage } from "@/lib/tracker";

export default function LLMRAMCalculator() {
    const [modelSize, setModelSize] = useState(7); // Billions of parameters
    const [quantization, setQuantization] = useState(4); // bits per parameter (e.g. 4-bit)
    const [contextLength, setContextLength] = useState(8192);
    const [batchSize, setBatchSize] = useState(1);

    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            trackUsage("llm-ram-calculator");
            tracked.current = true;
        }
    }, []);

    // Preset handler
    const applyPreset = (size: number, quant: number = 4) => {
        setModelSize(size);
        setQuantization(quant);
    };

    // Core calculations
    // 1. Model Weights Memory: size in B * (quant bits / 8) * 1.15 (15% load overhead)
    const weightMemory = modelSize * (quantization / 8) * 1.15;
    
    // 2. KV Cache Memory (Empirical GQA-aware formula): Context * Batch * Size * 0.00000015
    const kvCacheMemory = contextLength * batchSize * modelSize * 0.00000015;

    // 3. Total Memory (Weights + KV Cache)
    const totalVRAMNeeded = weightMemory + kvCacheMemory;

    // 4. File Storage Size (Model GGUF file size on disk)
    const storageSize = modelSize * (quantization / 8) * 1.03;

    // 5. System RAM requirement (Minimum system RAM to load/run the weights)
    const systemRAMNeeded = Math.max(16, Math.ceil(totalVRAMNeeded * 1.25));

    // Hardware recommendations based on VRAM requirements
    const getGPURecommendation = (vram: number) => {
        if (vram <= 6) return "RTX 3060 6GB (Laptop) / GTX 1660 Super (Minimum)";
        if (vram <= 8) return "Nvidia RTX 4060 8GB / RTX 3070 8GB (Entry Local AI)";
        if (vram <= 12) return "Nvidia RTX 4070 12GB / RTX 3060 12GB (Budget Sweetspot)";
        if (vram <= 16) return "Nvidia RTX 4080 16GB / AMD RX 7800 XT 16GB (Developer Tier)";
        if (vram <= 24) return "Nvidia RTX 4090 24GB / RTX 3090 24GB / Apple Mac Studio 32GB (Pro Enthusiast)";
        if (vram <= 48) return "Dual RTX 3090/4090 24GB (48GB VRAM) / Apple Mac Studio 64GB (Multi-GPU/Workstation)";
        if (vram <= 96) return "Apple Mac Studio 128GB Unified Memory / Workstation with 4x RTX 4090s";
        return "Nvidia A100 80GB Node / H100 GPU Server Cluster (Enterprise Inference)";
    };

    const gpuRecommendation = getGPURecommendation(totalVRAMNeeded);

    const faqs = [
        {
            question: "How does quantization affect local LLM VRAM?",
            question_id: "ram-q1",
            answer: "Quantization compresses model weights from 16-bit floating points (FP16) down to smaller representations (like 4-bit or 5-bit). This cuts the memory footprint by up to 75% with a negligible loss in perplexity, allowing consumer cards to host massive models."
        },
        {
            question: "Why does context size increase VRAM usage?",
            question_id: "ram-q2",
            answer: "When processing a query, the model stores Key-Value (KV) tensors for every token in the context window (KV Cache) to avoid recomputing history. Large context lengths (e.g. 32k) or batch sizes multiply these tensors, taking up gigabytes of VRAM."
        },
        {
            question: "What is Apple Unified Memory and why is it popular for LLMs?",
            question_id: "ram-q3",
            answer: "Apple Silicon Macs use a unified architecture where CPU and GPU share the same memory pool. Because local LLM inference is limited by memory bandwidth, a Mac Studio with 128GB of Unified Memory can run large 70B parameters models that would otherwise require multiple expensive Nvidia GPUs."
        }
    ];

    const seoContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2>How Much RAM Does an LLM Need?</h2>
            <p>
                Hosting open weights models locally (e.g., Llama 3, DeepSeek, or Mistral) eliminates API costs, guarantees privacy, and operates offline. However, the first hurdle is <strong>hardware sizing</strong>. Sizing local models requires calculating weight files and attention KV cache buffers.
            </p>

            <h3>The Local LLM Math Checklist</h3>
            <p>
                To estimate local VRAM:
            </p>
            <ul style={{ paddingLeft: "1.5rem" }}>
                <li><strong>Model Parameters:</strong> The scale of the model (7B, 13B, 70B etc.).</li>
                <li><strong>Quantization Precision:</strong> The bit size representing weights. FP16 uses 2 bytes per param. Q4 uses 0.5 bytes (4-bits).</li>
                <li><strong>KV Cache Size:</strong> Tensors stored per prompt token. Multiplied by batch sizes.</li>
            </ul>

            <h3>Can My Computer Run a Model?</h3>
            <p>
                If the model size fits within your GPU's dedicated <strong>VRAM</strong>, inference is fast (15 to 80 tokens/sec). If the VRAM overflows, the runner (like llama.cpp or Ollama) offloads processing to CPU system RAM. System RAM bandwidth is up to 10x slower than VRAM, leading to slow output (1 to 3 tokens/sec).
            </p>

            <h3>VRAM Optimization Tips</h3>
            <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Use GGUF Format:</strong> The GGUF format allows partial GPU offloading, moving layers between VRAM and system memory.</li>
                <li><strong>Limit Context:</strong> Set your context length slider to 4096 or 8192 rather than 32k if you do not process massive documents.</li>
                <li><strong>Target Q4_K_M:</strong> 4-bit quantization (specifically Q4_K_M) represents the optimal balance of file size versus perplexity loss.</li>
            </ol>

            <h3>Internal Links</h3>
            <ul>
                <li><Link href="/ai-tools" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>AI Developer Ecosystem Hub</Link></li>
                <li><Link href="/ai-tools/token-calculator" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Token Calculator</Link></li>
                <li><Link href="/guides/how-much-ram-for-local-llms" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Deep Guide: VRAM & RAM for Local LLMs</Link></li>
            </ul>
        </div>
    );

    return (
        <AIToolLayout
            title="Local LLM RAM/VRAM Calculator"
            description="Calculate local hardware specs to run models. Compute VRAM, system RAM, and storage requirements based on quantization levels."
            slug="llm-ram-calculator"
            faqs={faqs}
            seoContent={seoContent}
        >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
                {/* Inputs Area */}
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div className="input-group">
                        <label className="input-label">Select Parameter Preset</label>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            <button className="btn btn-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", width: "auto" }} onClick={() => applyPreset(7, 4)}>7B (Llama/Mistral)</button>
                            <button className="btn btn-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", width: "auto" }} onClick={() => applyPreset(13, 4)}>13B (Classic)</button>
                            <button className="btn btn-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", width: "auto" }} onClick={() => applyPreset(30, 4)}>32B (Qwen/DeepSeek)</button>
                            <button className="btn btn-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", width: "auto" }} onClick={() => applyPreset(70, 4)}>70B (Llama 3)</button>
                            <button className="btn btn-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", width: "auto" }} onClick={() => applyPreset(140, 8)}>140B+ (Mixtral/Command)</button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Model Size (Billions of Params)</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{modelSize}B</span>
                        </label>
                        <input 
                            type="range" 
                            min="1" 
                            max="200" 
                            value={modelSize} 
                            onChange={(e) => setModelSize(Number(e.target.value))} 
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Quantization Level</label>
                        <select 
                            value={quantization} 
                            onChange={(e) => setQuantization(Number(e.target.value))}
                            className="input-field"
                        >
                            <option value={2}>2-bit (Extreme compression - Q2_K)</option>
                            <option value={3}>3-bit (High compression - Q3_K_M)</option>
                            <option value={4}>4-bit (Optimal Sweetspot - Q4_K_M)</option>
                            <option value={5}>5-bit (High fidelity - Q5_K_M)</option>
                            <option value={8}>8-bit (Original weight match - Q8_0)</option>
                            <option value={16}>16-bit (Unquantized - FP16)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Context Length</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{contextLength.toLocaleString()} tokens</span>
                        </label>
                        <input 
                            type="range" 
                            min="2048" 
                            max="131072" 
                            step="2048"
                            value={contextLength} 
                            onChange={(e) => setContextLength(Number(e.target.value))} 
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Batch Size</span>
                            <span style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{batchSize}</span>
                        </label>
                        <input 
                            type="range" 
                            min="1" 
                            max="32" 
                            value={batchSize} 
                            onChange={(e) => setBatchSize(Number(e.target.value))} 
                        />
                    </div>
                </div>

                {/* Outputs card */}
                <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <h3 className="input-label">Memory Allocations</h3>

                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", textAlign: "center" }}>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Estimated VRAM Required</div>
                        <div style={{ fontSize: "2.75rem", color: "var(--accent-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                            {totalVRAMNeeded.toFixed(2)} GB
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Model Weights VRAM</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                {weightMemory.toFixed(2)} GB
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>KV Cache VRAM</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                {kvCacheMemory.toFixed(2)} GB
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Min System RAM</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                {systemRAMNeeded} GB
                            </div>
                        </div>
                        <div style={{ padding: "1rem", backgroundColor: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Storage on Disk</div>
                            <div style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                                {storageSize.toFixed(2)} GB
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hardware recommendations table */}
            <div className="card" style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
                    Recommended Host Hardware Specs
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--bg-tertiary)", borderLeft: "4px solid var(--accent-primary)", borderRadius: "var(--radius-sm)" }}>
                        <div style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "var(--accent-primary)", letterSpacing: "0.5px" }}>Recommended GPU Tier</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginTop: "0.25rem", color: "var(--text-primary)" }}>{gpuRecommendation}</div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
                        <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <h4 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Mac Setup</h4>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                Mac Studio or MacBook Pro with <strong>{systemRAMNeeded > 96 ? "128GB" : systemRAMNeeded > 48 ? "96GB" : systemRAMNeeded > 32 ? "64GB" : "32GB"}</strong> Unified Memory. Mac unified memory supports high context bandwidth processing efficiently.
                            </p>
                        </div>
                        <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                            <h4 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>PC / Linux Setup</h4>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                Nvidia GPU with dedicated VRAM matching total requirements. Standard PC systems need at least <strong>{systemRAMNeeded}GB</strong> system RAM for model weights offloading.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AIToolLayout>
    );
}
