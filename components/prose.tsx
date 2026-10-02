import { renderMarkdown } from "@/lib/markdown";

export function Prose({ markdown }: { markdown: string }) {
  return (
    <div
      className="prose prose-warm max-w-none prose-headings:font-semibold prose-a:font-medium prose-img:rounded-2xl"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
    />
  );
}
