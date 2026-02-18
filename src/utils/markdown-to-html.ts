/**
 * Lightweight markdown-to-HTML converter for PDF print windows.
 * Handles headers, bold, italic, inline code, code blocks, lists, and blockquotes.
 */
export function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    // Code blocks (fenced)
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        out.push('</pre>');
        inCodeBlock = false;
      } else {
        out.push('<pre style="background:#f4f4f5;padding:12px;border-radius:6px;overflow-x:auto;font-size:13px">');
        inCodeBlock = true;
      }
      continue;
    }
    if (inCodeBlock) {
      out.push(esc(line));
      continue;
    }

    // Headers
    const hMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (hMatch) {
      const level = hMatch[1].length;
      out.push(`<h${level} style="margin:16px 0 8px">${inline(hMatch[2])}</h${level}>`);
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      out.push(`<blockquote style="border-left:3px solid #d1d5db;padding-left:12px;color:#6b7280;margin:8px 0">${inline(line.slice(2))}</blockquote>`);
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^[-*]\s+(.+)/);
    if (ulMatch) {
      out.push(`<li style="margin:2px 0;margin-left:20px">${inline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)/);
    if (olMatch) {
      out.push(`<li style="margin:2px 0;margin-left:20px">${inline(olMatch[1])}</li>`);
      continue;
    }

    // Blank line
    if (!line.trim()) {
      out.push('<br/>');
      continue;
    }

    // Paragraph
    out.push(`<p style="margin:4px 0">${inline(line)}</p>`);
  }

  if (inCodeBlock) out.push('</pre>');
  return out.join('\n');
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s: string): string {
  let r = esc(s);
  r = r.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  r = r.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  r = r.replace(/`([^`]+)`/g, '<code style="background:#f4f4f5;padding:1px 4px;border-radius:3px;font-size:0.9em">$1</code>');
  return r;
}
