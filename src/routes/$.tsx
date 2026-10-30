import { createFileRoute } from "@tanstack/react-router";
import { NempoShell } from "@/components/nempo-shell";

// All NEMPO pages (wisata, kuliner, event, berita, digital services, ...) are
// matched inside the app itself; this catch-all hands every path to it.
export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Nempo Organizer — Garut & Jawa Barat" },
      {
        name: "description",
        content: "Platform digital pariwisata Garut: wisata, kuliner, penginapan, dan event.",
      },
      { property: "og:title", content: "Nempo Organizer — Garut & Jawa Barat" },
      {
        property: "og:description",
        content: "Wisata, kuliner, penginapan, dan event Garut.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NempoShell,
});
