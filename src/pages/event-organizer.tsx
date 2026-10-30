import { useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "@/lib/wouter";
import {
  PartyPopper, Heart, Building2, Music, GraduationCap, Trophy,
  MessageCircle, ClipboardList, Palette, Wrench, Sparkles, FileCheck,
  Check, ChevronDown, Star, Users, CalendarCheck, MapPin, ArrowRight,
} from "lucide-react";

const services = [
  { icon: MapPin, title: "Outing & Tour", desc: "Perjalanan wisata rombongan, outing kantor, dan tur komunitas dengan transportasi lengkap." },
  { icon: Building2, title: "Corporate Event", desc: "Gathering, launching produk, seminar, rapat kerja, dan family day perusahaan." },
  { icon: Music, title: "Konser & Festival", desc: "Produksi panggung, sound, lighting, tiketing digital, dan manajemen talent." },
  { icon: GraduationCap, title: "Event Sekolah & Kampus", desc: "Pensi, wisuda, perpisahan, seminar, dan buku tahunan digital." },
  { icon: Trophy, title: "Lomba & Turnamen", desc: "Registrasi online, penjurian, bracket, hingga penyerahan hadiah." },
  { icon: PartyPopper, title: "Ulang Tahun & Private Party", desc: "Pesta keluarga, sweet seventeen, dan acara komunitas yang berkesan." },
];

const steps = [
  { icon: MessageCircle, title: "Konsultasi Gratis", desc: "Ceritakan kebutuhan, tanggal, jumlah tamu, dan budget kamu." },
  { icon: ClipboardList, title: "Konsep & Penawaran", desc: "Kami susun konsep, rundown awal, dan rincian biaya transparan." },
  { icon: Palette, title: "Persiapan & Desain", desc: "Desain visual, vendor, venue, talent, dan technical meeting." },
  { icon: Wrench, title: "Eksekusi Hari H", desc: "Tim lapangan mengatur semua agar acara berjalan sesuai rundown." },
  { icon: FileCheck, title: "Laporan & Dokumentasi", desc: "Foto, video highlight, dan evaluasi acara diserahkan ke kamu." },
];

const packages = [
  { name: "Basic", price: "Mulai Rp 3,5 jt", note: "Acara intim hingga 100 tamu", items: ["Konsultasi & rundown", "Koordinator hari H (3 crew)", "MC profesional", "Dekor sederhana", "Dokumentasi foto"] },
  { name: "Premium", price: "Mulai Rp 12 jt", note: "Hingga 500 tamu", popular: true, items: ["Semua fitur Basic", "Tim lapangan 8 crew", "Dekor & backdrop custom", "Sound system & lighting", "Foto + video highlight", "Undangan & tiket digital"] },
  { name: "Exclusive", price: "Custom", note: "Festival, konser, corporate besar", items: ["Semua fitur Premium", "Produksi panggung penuh", "Manajemen talent & artis", "Tiketing & scan QR", "Sosmed & publikasi", "Laporan pasca acara"] },
];

const stats = [
  { icon: CalendarCheck, value: "150+", label: "Event terlaksana" },
  { icon: Users, value: "50rb+", label: "Peserta dilayani" },
  { icon: Star, value: "4.9", label: "Rating klien" },
  { icon: MapPin, value: "Jabar", label: "Area layanan" },
];

const testimonials = [
  { name: "Panitia Festival Pantai", role: "Festival, Garut", text: "Panggung, sound, sampai tiket digital semua diatur NEMPO. Ramai, aman, dan tepat waktu." },
  { name: "HRD PT Sinar Priangan", role: "Family Gathering", text: "Tim NEMPO responsif dan kreatif. Karyawan senang, acaranya rapi dari awal sampai akhir." },
  { name: "OSIS SMAN Garut", role: "Pentas Seni", text: "Tiket digital dan scan QR bikin antrean masuk lancar. Recommended!" },
];

const faqs = [
  { q: "Berapa lama sebelum acara sebaiknya booking?", a: "Idealnya 1–3 bulan untuk acara besar dan 2–4 minggu untuk acara kecil. Jadwal mendadak tetap bisa kami bantu bila tersedia." },
  { q: "Apakah bisa menyesuaikan budget?", a: "Bisa. Semua paket fleksibel; kami bantu menyusun prioritas sesuai anggaran kamu." },
  { q: "Apakah melayani di luar Garut?", a: "Ya, kami melayani seluruh Jawa Barat. Biaya transport tim menyesuaikan lokasi." },
  { q: "Bagaimana sistem pembayarannya?", a: "DP 30% untuk mengunci tanggal, 50% saat persiapan, dan pelunasan H-3 acara." },
];

export default function EventOrganizerPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <div className="bg-background pb-12">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand px-5 pb-16 pt-10 text-primary-foreground">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-orange/25 blur-3xl" />
          <span className="relative inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-orange" /> NEMPO Event Organizer
          </span>
          <h1 className="relative mt-5 text-[28px] font-extrabold leading-[1.15] tracking-tight">
            Acara impianmu,<br />
            <span className="text-brand-orange">kami yang urus</span> dari awal sampai akhir.
          </h1>
          <p className="relative mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            Event organizer asal Garut — konsep kreatif, vendor terpercaya, dan tim lapangan berpengalaman di seluruh Jawa Barat.
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
          <SectionHead eyebrow="Layanan" title="Satu tim untuk semua jenis acara" />
          <div className="grid grid-cols-2 gap-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand/40">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-sky">
                  <s.icon className="h-5 w-5 text-brand" />
                </div>
                <h3 className="text-[13px] font-bold leading-snug text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mt-10 bg-brand-sky px-4 py-10">
          <SectionHead eyebrow="Cara Kerja" title="5 langkah, tanpa ribet" />
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-extrabold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="flex items-center gap-1.5 text-sm font-bold text-brand-navy">
                    <s.icon className="h-4 w-4 text-brand" /> {s.title}
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
          <div className="px-4"><SectionHead eyebrow="Testimoni" title="Kata klien kami" /></div>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
            {testimonials.map((t) => (
              <div key={t.name} className="flex w-[78%] shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-5">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-brand-orange text-brand-orange" />)}
                </div>
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
            <h2 className="relative text-xl font-extrabold leading-snug">Siap bikin acara yang berkesan?</h2>
            <p className="relative mt-2 text-sm text-primary-foreground/80">Konsultasi gratis — ceritakan rencana acaramu, kami bantu wujudkan.</p>
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
