import { createFileRoute } from "@tanstack/react-router";
import { NempoShell } from "@/components/nempo-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nempo Organizer — Destinasi Wisata, Kuliner & Budaya Jawa Barat" },
      {
        name: "description",
        content:
          "Temukan wisata alam, kuliner khas, penginapan, dan event budaya terbaik di Garut dan Jawa Barat.",
      },
      { property: "og:title", content: "Nempo Organizer — Wisata Garut & Jawa Barat" },
      {
        property: "og:description",
        content: "Wisata, kuliner, penginapan, dan event budaya terbaik di Garut dan Jawa Barat.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NempoShell,
});
