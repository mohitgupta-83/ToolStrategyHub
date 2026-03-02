const fs = require('fs');
const path = require('path');

const tools = [
    {
        name: "Idea Comparison Tool", slug: "idea-comparison-tool", desc: "Compare multiple startup ideas objectively.", kw: "startup idea comparison tool",
        content: `
import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function IdeaComparisonTool() {
  const [ideas, setIdeas] = useState([{ name: "Idea 1", market: 50, diff: 50, rev: 50, speed: 50 }]);
  const addIdea = () => setIdeas([...ideas, { name: "New Idea", market: 50, diff: 50, rev: 50, speed: 50 }]);
  const scored = ideas.map(i => ({ ...i, score: Math.round(i.market*0.3 + (100-i.diff)*0.2 + i.rev*0.3 + i.speed*0.2) })).sort((a,b)=>b.score-a.score);
  return (
    <ToolLayout title="Idea Comparison Tool" description="Compare multiple startup ideas objectively." slug="idea-comparison-tool" faqs={[]} seoContent={<p>SEO Content</p>}>
      <div className="card">
        {ideas.map((i, idx) => (
          <div key={idx} className="input-group">
            <input value={i.name} onChange={e => { const n = [...ideas]; n[idx].name = e.target.value; setIdeas(n); }} />
            <input type="range" value={i.market} onChange={e => { const n = [...ideas]; n[idx].market = Number(e.target.value); setIdeas(n); }} />
          </div>
        ))}
        <button className="button" onClick={addIdea}>Add Idea</button>
        <h3>Best Idea: {scored[0]?.name} ({scored[0]?.score})</h3>
      </div>
    </ToolLayout>
  );
}
`
    },
    // Add more tools here in next script execution or just write boilerplate for all
];

tools.forEach(t => {
    const dir = path.join(__dirname, 'app', 'tools', t.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'page.tsx'), t.content.trim());
});
