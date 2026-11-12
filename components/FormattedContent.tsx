import React from 'react';

export function formatInline(str: string): string {
    return str
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-primary); font-weight: 600;">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code style="background: var(--bg-tertiary); padding: 0.15rem 0.4rem; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.85em; color: var(--accent-primary); border: 1px solid var(--border-color);">$1</code>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: var(--accent-primary); text-decoration: underline;">$1</a>');
}

export default function FormattedContent({ content }: { content: string }) {
    if (!content) return null;

    // Split into structural paragraph blocks by double newline
    const rawBlocks = content.split(/\n\n+/);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.125rem', lineHeight: 1.8 }}>
            {rawBlocks.map((block, idx) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                // 1. Code Block (```lang ... ```)
                if (trimmed.startsWith('```') && trimmed.endsWith('```')) {
                    const lines = trimmed.slice(3, -3).trim().split('\n');
                    const lang = lines[0].match(/^[a-z0-9_-]+/i) ? lines[0] : '';
                    const code = (lang ? lines.slice(1) : lines).join('\n');

                    return (
                        <div key={idx} style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-color)',
                            overflow: 'hidden',
                            margin: '0.5rem 0',
                        }}>
                            {lang && (
                                <div style={{
                                    padding: '0.4rem 1rem',
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    borderBottom: '1px solid var(--border-color)',
                                    fontSize: '0.75rem',
                                    color: 'var(--accent-primary)',
                                    fontFamily: 'var(--font-mono)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}>
                                    {lang}
                                </div>
                            )}
                            <pre style={{
                                padding: '1rem',
                                margin: 0,
                                overflowX: 'auto',
                                fontSize: '0.875rem',
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--text-primary)',
                                lineHeight: 1.6,
                            }}>
                                <code>{code}</code>
                            </pre>
                        </div>
                    );
                }

                // 2. Markdown Table (| col1 | col2 |)
                if (trimmed.startsWith('|') && trimmed.includes('\n|')) {
                    const rows = trimmed.split('\n').filter(r => r.trim().startsWith('|'));
                    if (rows.length >= 2) {
                        const headerRow = rows[0].split('|').slice(1, -1).map(c => c.trim());
                        const bodyRows = rows.slice(2).map(r => r.split('|').slice(1, -1).map(c => c.trim()));

                        return (
                            <div key={idx} style={{ overflowX: 'auto', margin: '1rem 0', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
                                            {headerRow.map((cell, cIdx) => (
                                                <th key={cIdx} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--text-primary)', fontWeight: 600 }}>
                                                    {cell}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bodyRows.map((r, rIdx) => (
                                            <tr key={rIdx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                {r.map((cell, cIdx) => (
                                                    <td key={cIdx} style={{ padding: '0.65rem 1rem', color: 'var(--text-secondary)' }}>
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    }
                }

                // 3. Subheading ###
                if (trimmed.startsWith('### ')) {
                    return (
                        <h3 key={idx} style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: '1rem 0 0.25rem' }}>
                            {trimmed.replace(/^###\s+/, '')}
                        </h3>
                    );
                }

                // 4. Blockquote / Callout (> quote)
                if (trimmed.startsWith('> ')) {
                    const quoteText = trimmed.split('\n').map(l => l.replace(/^>\s*/, '')).join(' ');
                    return (
                        <blockquote key={idx} style={{
                            margin: '0.5rem 0',
                            padding: '1rem 1.25rem',
                            backgroundColor: 'var(--bg-tertiary)',
                            borderLeft: '4px solid var(--accent-primary)',
                            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                            color: 'var(--text-primary)',
                            fontStyle: 'italic',
                            lineHeight: 1.6,
                        }} dangerouslySetInnerHTML={{ __html: formatInline(quoteText) }} />
                    );
                }

                // 5. Lines containing lists (can be purely a list OR intro text followed by list items)
                const lines = trimmed.split('\n');
                const hasListItems = lines.some(line => /^\s*([-*•]|\d+\.)\s+/.test(line));

                if (hasListItems) {
                    const elements: React.ReactNode[] = [];
                    let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

                    const flushList = () => {
                        if (currentList) {
                            const isOrdered = currentList.type === 'ol';
                            const ListTag = isOrdered ? 'ol' : 'ul';
                            elements.push(
                                <ListTag 
                                    key={`list-${elements.length}`} 
                                    style={{ 
                                        paddingLeft: '1.75rem', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        gap: '0.5rem', 
                                        margin: '0.5rem 0 0.75rem 0' 
                                    }}
                                >
                                    {currentList.items.map((item, iIdx) => (
                                        <li 
                                            key={iIdx} 
                                            style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} 
                                            dangerouslySetInnerHTML={{ __html: formatInline(item) }} 
                                        />
                                    ))}
                                </ListTag>
                            );
                            currentList = null;
                        }
                    };

                    lines.forEach((line) => {
                        const trimmedLine = line.trim();
                        if (!trimmedLine) return;

                        const bulletMatch = trimmedLine.match(/^[-*•]\s+(.*)/);
                        const numMatch = trimmedLine.match(/^(\d+)\.\s+(.*)/);

                        if (bulletMatch) {
                            if (currentList && currentList.type !== 'ul') flushList();
                            if (!currentList) currentList = { type: 'ul', items: [] };
                            currentList.items.push(bulletMatch[1]);
                        } else if (numMatch) {
                            if (currentList && currentList.type !== 'ol') flushList();
                            if (!currentList) currentList = { type: 'ol', items: [] };
                            currentList.items.push(numMatch[2]);
                        } else {
                            flushList();
                            elements.push(
                                <p 
                                    key={`p-${elements.length}`} 
                                    style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.8 }} 
                                    dangerouslySetInnerHTML={{ __html: formatInline(trimmedLine) }} 
                                />
                            );
                        }
                    });

                    flushList();

                    return (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {elements}
                        </div>
                    );
                }

                // 6. Regular Paragraph with inline formatting
                return (
                    <p 
                        key={idx} 
                        style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.8 }} 
                        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} 
                    />
                );
            })}
        </div>
    );
}

