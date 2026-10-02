import { Marked, type Tokens } from "marked";

export interface Heading {
  id: string;
  text: string;
  depth: number;
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-") || "section"
  );
}

/** Returns a slug unique within one document, suffixing -2, -3… on repeats. */
function createIdFactory() {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = slugify(text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  };
}

/** Renders markdown to HTML, giving every heading a stable `id` for anchor links. */
export function renderMarkdown(markdown: string): string {
  const nextId = createIdFactory();
  const marked = new Marked({
    gfm: true,
    breaks: false,
    renderer: {
      heading({ tokens, depth, text }: Tokens.Heading) {
        return `<h${depth} id="${nextId(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  return marked.parse(markdown, { async: false }) as string;
}

/** h2/h3 headings in document order, with ids matching `renderMarkdown` (including nested ones). */
export function extractHeadings(markdown: string): Heading[] {
  const nextId = createIdFactory();
  const marked = new Marked({ gfm: true });
  const headings: Heading[] = [];
  marked.walkTokens(marked.lexer(markdown), (token) => {
    if (token.type !== "heading") return;
    const id = nextId(token.text);
    if (token.depth === 2 || token.depth === 3) {
      headings.push({ id, text: plainText(token.text), depth: token.depth });
    }
  });
  return headings;
}

/** Strips inline markdown (links, emphasis, code) down to display text. */
function plainText(text: string): string {
  return text.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "");
}
