import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SavedGuides } from "@/components/saved-guides";
import { getAllCards } from "@/lib/content/cards";

export const metadata: Metadata = {
  title: "Saved guides",
  description: "Guides you’ve bookmarked on this device.",
  robots: { index: false },
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <PageHeader eyebrow="Your workbench" title="Saved guides">
        Bookmarks live on this device only — no account needed.
      </PageHeader>
      <div className="mt-10">
        <SavedGuides entries={getAllCards()} />
      </div>
    </div>
  );
}
