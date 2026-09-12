import type { Metadata } from "next";
import { Prose } from "@/components/prose";
import { getStaticPage } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

const page = getStaticPage("terms")!;

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold text-stone-900">{page.title}</h1>
      <div className="mt-6">
        <Prose markdown={page.body} />
      </div>
    </div>
  );
}
