import { renderMarkdown } from "@/lib/markdown";

export function Prose({ markdown }: { markdown: string }) {
  return (
    <div
      className="prose prose-stone max-w-none prose-headings:font-semibold prose-a:text-amber-700"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
    />
  );
}
