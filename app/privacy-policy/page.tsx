import type { Metadata } from "next";
import { Prose } from "@/components/prose";
import { getStaticPage } from "@/lib/content/loader";
import { pageMetadata } from "@/lib/seo";

const page = getStaticPage("privacy-policy")!;

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold text-ink">{page.title}</h1>
      <div className="mt-6">
        <Prose markdown={page.body} />
      </div>
    </div>
  );
}
