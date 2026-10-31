import type React from "react";
import { useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "@/lib/wouter";
import {
  Heart, Church, Sparkles, Flower2, Camera, Mail, CalendarHeart,
  MessageCircle, ClipboardList, Palette, FileCheck,
  Check, ChevronDown, ArrowRight,
} from "lucide-react";

const services = [
  { icon: Heart, color: "#DB2777", title: "Lamaran & Tunangan", desc: "Dekor intimate, MC, seserahan, dan susunan acara keluarga yang khidmat." },
  { icon: Church, color: "#6366F1", title: "Akad & Pemberkatan", desc: "Koordinasi KUA/gereja, penghulu, saksi, dan rundown akad yang tenang." },
  { icon: Sparkles, color: "#D97706", title: "Resepsi Pernikahan", desc: "Gedung, outdoor, atau rumah — dari 100 hingga 1.500 tamu." },
  { icon: Flower2, color: "#0F766E", title: "Dekorasi & Pelaminan", desc: "Pelaminan modern, adat Sunda, rustic, hingga garden party." },
  { icon: Camera, color: "#0EA5E9", title: "Foto & Video", desc: "Prewedding, dokumentasi hari H, cinematic highlight, dan drone." },
  { icon: Mail, color: "#8B5CF6", title: "Undangan Digital", desc: "Undangan website, RSVP online, buku tamu QR, dan amplop digital." },
];

const steps = [
  { icon: MessageCircle, color: "#DB2777", title: "Konsultasi Gratis", desc: "Ceritakan tanggal, jumlah tamu, konsep impian, dan budget kalian." },
  { icon: ClipboardList, color: "#6366F1", title: "Konsep & Anggaran", desc: "Kami susun moodboard, pilihan vendor, dan rincian biaya transparan." },
  { icon: Palette, color: "#D97706", title: "Persiapan & Fitting", desc: "Survey venue, fitting busana, test food, dan technical meeting keluarga." },
  { icon: CalendarHeart, color: "#0F766E", title: "Hari Bahagia", desc: "Tim kami mengatur akad hingga resepsi, kalian tinggal menikmati." },
  { icon: FileCheck, color: "#0EA5E9", title: "Dokumentasi & Album", desc: "Foto, video highlight, dan album diserahkan setelah acara." },
];

const packages = [
  { name: "Intimate", price: "Mulai Rp 15 jt", note: "Hingga 150 tamu", items: ["Konsultasi & rundown", "Koordinator hari H (5 crew)", "MC akad & resepsi", "Dekor pelaminan minimalis", "Dokumentasi foto", "Undangan digital"] },
  { name: "Signature", price: "Mulai Rp 45 jt", note: "Hingga 500 tamu", popular: true, items: ["Semua fitur Intimate", "Tim lapangan 10 crew", "Dekor pelaminan & photobooth", "Rias & busana pengantin", "Foto + video cinematic", "Sound system & entertainment", "Buku tamu QR"] },
  { name: "Royal", price: "Custom", note: "Resepsi besar & adat lengkap", items: ["Semua fitur Signature", "Upacara adat Sunda lengkap", "Katering & venue pilihan", "Prewedding outdoor", "Drone & live streaming", "Wedding planner pribadi"] },
];

const stats = [
  { value: "80+", label: "Pasangan bahagia" },
  { value: "30+", label: "Vendor mitra" },
  { value: "6", label: "Konsep tema" },
  { value: "Jabar", label: "Area layanan" },
];

const testimonials = [
  { name: "Rina & Fajar", role: "Resepsi, Garut", text: "Dari lamaran sampai resepsi semua diurus rapi. Kami benar-benar tinggal menikmati hari bahagia." },
  { name: "Dewi & Ilham", role: "Adat Sunda", text: "Upacara adatnya khidmat dan keluarga besar senang. Timnya sabar dan detail." },
  { name: "Salsa & Rizky", role: "Garden Party", text: "Dekor outdoor-nya cantik banget, undangan digital dan buku tamu QR bikin praktis." },
];

const faqs = [
  { q: "Berapa lama sebelum hari H sebaiknya booking?", a: "Idealnya 4–8 bulan sebelum hari H agar venue dan vendor favorit masih tersedia." },
  { q: "Apakah bisa memakai vendor pilihan sendiri?", a: "Bisa. Kami tetap koordinasikan vendor pilihan kalian agar selaras dengan rundown." },
  { q: "Apakah melayani upacara adat Sunda?", a: "Ya, termasuk siraman, ngeuyeuk seureuh, sawer, nincak endog, dan huap lingkung." },
  { q: "Bagaimana sistem pembayarannya?", a: "DP 30% untuk mengunci tanggal, 50% saat persiapan, dan pelunasan H-7 acara." },
];

function LuxIcon({ icon: Icon, color, size = "md", className = "" }: { icon: React.ElementType; color: string; size?: "sm" | "md"; className?: string }) {
  const box = size === "sm" ? "h-11 w-11 rounded-[14px]" : "h-[52px] w-[52px] rounded-[16px]";
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden ${box} ${className}`}
      style={{
        background: `linear-gradient(148deg, color-mix(in srgb, ${color} 55%, white) 0%, ${color} 58%, color-mix(in srgb, ${color} 72%, black) 100%)`,
        boxShadow: `0 4px 0 color-mix(in srgb, ${color} 82%, black), 0 8px 13px -9px ${color}88, inset 0 1px 0 rgba(255,255,255,.54)`,
      }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_27%_17%,rgba(255,255,255,.42),transparent_56%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/20" />
      <Icon className={`relative z-10 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,.25)] ${size === "sm" ? "h-5 w-5" : "h-6 w-6"}`} strokeWidth={2.2} />
    </span>
  );
}

export default function WeddingOrganizerPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <div className="bg-background pb-12">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand px-5 pb-16 pt-10 text-primary-foreground">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-orange/25 blur-3xl" />
          <span className="relative inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
            NEMPO Wedding Organizer
          </span>
          <h1 className="relative mt-5 text-[28px] font-extrabold leading-[1.15] tracking-tight">
            Hari bahagiamu,<br />
            <span className="text-brand-orange">kami rawat</span> sepenuh hati.
          </h1>
          <p className="relative mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            Wedding organizer asal Garut — dari lamaran, akad, hingga resepsi, modern maupun adat Sunda, di seluruh Jawa Barat.
          </p>
          <div className="relative mt-7 flex gap-3">
            <a href="#paket" className="flex-1 rounded-xl bg-brand-orange px-5 py-3.5 text-center text-sm font-bold text-primary-foreground shadow-lg shadow-brand-orange/30 active:scale-[0.98]">
              Lihat Paket
            </a>
            <Link href="/price-list" className="flex-1 rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-3.5 text-center text-sm font-bold backdrop-blur active:scale-[0.98]">
              Daftar Harga
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="relative -mt-9 px-4">
          <div className="grid grid-cols-4 divide-x divide-border rounded-2xl border border-border bg-card py-4 shadow-xl shadow-brand-navy/10">
            {stats.map((s) => (
              <div key={s.label} className="px-1 text-center">
                <p className="text-lg font-extrabold text-brand">{s.value}</p>
                <p className="mt-0.5 text-[10px] font-medium leading-tight text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="px-4 pt-10">
          <SectionHead eyebrow="Layanan" title="Semua kebutuhan pernikahan" />
          <div className="grid grid-cols-2 gap-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand/40">
                <LuxIcon icon={s.icon} color={s.color} className="mb-3.5" />
                <h3 className="text-[13px] font-bold leading-snug text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mt-10 bg-brand-sky px-4 py-10">
          <SectionHead eyebrow="Cara Kerja" title="5 langkah menuju hari H" />
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl bg-card p-4 shadow-sm">
                <LuxIcon icon={s.icon} color={s.color} size="sm" />
                <div>
                  <h3 className="flex items-center gap-1.5 text-sm font-bold text-brand-navy">
                    <span className="text-[11px] font-extrabold text-brand">{String(i + 1).padStart(2, "0")}</span> {s.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Packages */}
        <section id="paket" className="scroll-mt-20 px-4 pt-10">
          <SectionHead eyebrow="Paket" title="Pilih sesuai kebutuhanmu" sub="Harga indikatif, bisa disesuaikan dengan budget." />
          <div className="space-y-4">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`relative overflow-hidden rounded-2xl p-5 ${
                  p.popular
                    ? "bg-gradient-to-br from-brand-navy to-brand text-primary-foreground shadow-xl shadow-brand/25"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {p.popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-brand-orange px-2.5 py-1 text-[10px] font-bold tracking-wide text-primary-foreground">
                    PALING DIMINATI
                  </span>
                )}
                <h3 className="text-lg font-extrabold">{p.name}</h3>
                <p className={`text-xs ${p.popular ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{p.note}</p>
                <p className={`mt-3 text-2xl font-extrabold ${p.popular ? "" : "text-brand"}`}>{p.price}</p>
                <div className={`my-4 h-px ${p.popular ? "bg-primary-foreground/20" : "bg-border"}`} />
                <ul className="space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[13px]">
                      <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${p.popular ? "bg-brand-orange" : "bg-brand-sky"}`}>
                        <Check className={`h-2.5 w-2.5 ${p.popular ? "text-primary-foreground" : "text-brand"}`} strokeWidth={3} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/price-list"
                  className={`mt-5 block rounded-xl py-3 text-center text-sm font-bold ${
                    p.popular ? "bg-primary-foreground text-brand-navy" : "bg-brand text-primary-foreground"
                  }`}
                >
                  Pilih {p.name}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="pt-10">
          <div className="px-4"><SectionHead eyebrow="Testimoni" title="Cerita pasangan kami" /></div>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
            {testimonials.map((t) => (
              <div key={t.name} className="flex w-[78%] shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-5">
                <p className="flex-1 text-[13px] leading-relaxed text-foreground">“{t.text}”</p>
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-sky text-sm font-bold text-brand">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pt-10">
          <SectionHead eyebrow="FAQ" title="Pertanyaan umum" />
          <div className="space-y-2.5">
            {faqs.map((f, i) => (
              <div key={f.q} className={`rounded-2xl border bg-card transition-colors ${open === i ? "border-brand/40" : "border-border"}`}>
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-[13px] font-semibold text-brand-navy">
                  {f.q}
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${open === i ? "bg-brand text-primary-foreground" : "bg-brand-sky text-brand"}`}>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {open === i && <p className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pt-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-navy p-6 text-primary-foreground">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-orange/30 blur-2xl" />
            <h2 className="relative text-xl font-extrabold leading-snug">Siap merencanakan pernikahan impian?</h2>
            <p className="relative mt-2 text-sm text-primary-foreground/80">Konsultasi gratis — ceritakan konsep pernikahan kalian, kami bantu wujudkan.</p>
            <Link href="/price-list" className="relative mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-brand-orange/30">
              Mulai Konsultasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-orange">{eyebrow}</p>
      <h2 className="mt-1 text-[22px] font-extrabold leading-tight text-brand-navy">{title}</h2>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}
