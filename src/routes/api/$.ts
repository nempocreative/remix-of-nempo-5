import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

// Public read-only bridge: old site endpoints (/api/wisata, ...) served from the database.
const TABLES: Record<string, { table: string; order?: string; filter?: (q: any) => any }> = {
  wisata: { table: "wisata" },
  kuliner: { table: "kuliner" },
  cafe: { table: "kuliner", filter: (q) => q.ilike("category", "%cafe%") },
  penginapan: { table: "penginapan" },
  events: { table: "events" },
  "event-tickets": { table: "event_tickets", order: "sort_order" },
  berita: { table: "berita", order: "published_at" },
  banners: { table: "banners", order: "sort_order" },
  "promo-banners": { table: "promo_banners", order: "sort_order" },
  perlombaan: { table: "perlombaan" },
  "digital-services": { table: "digital_services" },
  "price-list": { table: "price_list", order: "sort_order" },
  transportasi: { table: "transportasi" },
  vouchers: { table: "vouchers" },
  talents: { table: "talents", order: "sort_order" },
  influencers: { table: "influencers", order: "sort_order" },
  partners: { table: "partners", order: "sort_order" },
  "kamus-sunda": { table: "kamus_sunda" },
  "site-settings": { table: "site_settings" },
};

const camel = (s: string) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
const toCamel = (row: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(row).map(([k, v]) => [camel(k), v]));

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "public, max-age=10" },
  });

function client() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const parts = (params._splat ?? "").split("/").filter(Boolean);
        const [name, idOrSlug] = parts;
        const sb = client();

        if (name === "stats") {
          const counts = await Promise.all(
            ["wisata", "kuliner", "penginapan", "events"].map(async (t) => {
              const { count } = await sb.from(t).select("*", { count: "exact", head: true });
              return [t, count ?? 0] as const;
            }),
          );
          return json(Object.fromEntries(counts));
        }

        const cfg = name ? TABLES[name] : undefined;
        if (!cfg) return json({ error: "Not found" }, 404);

        let q: any = sb.from(cfg.table).select("*");
        if (cfg.filter) q = cfg.filter(q);

        if (idOrSlug && parts.length === 2) {
          const isId = /^\d+$/.test(idOrSlug);
          const col = cfg.table === "site_settings" ? "key" : isId ? "id" : "slug";
          const { data, error } = await q.eq(col, idOrSlug).maybeSingle();
          if (error) return json({ error: "Gagal memuat data" }, 500);
          if (!data) return json({ error: "Not found" }, 404);
          return json(toCamel(data));
        }
        if (parts.length > 2) return json({ error: "Not found" }, 404);

        q = cfg.order
          ? q.order(cfg.order, { ascending: cfg.order === "sort_order" ? true : false })
          : cfg.table === "site_settings" ? q : q.order("id", { ascending: true });
        const { data, error } = await q;
        if (error) {
          console.error(error);
          return json({ error: "Gagal memuat data" }, 500);
        }
        return json((data ?? []).map(toCamel));
      },
    },
  },
});
