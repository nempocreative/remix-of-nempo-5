import { useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "@/lib/wouter";
import {
  PartyPopper, Heart, Building2, Music, GraduationCap, Trophy,
  MessageCircle, ClipboardList, Palette, Wrench, Sparkles, FileCheck,
  Check, ChevronDown, Star, Users, CalendarCheck, MapPin, ArrowRight,
} from "lucide-react";

const services = [
  { icon: Heart, title: "Wedding & Lamaran", desc: "Konsep adat Sunda hingga modern, dekor, MC, dokumentasi, dan koordinasi hari H." },
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
  { name: "Rina & Dimas", role: "Wedding, Garut", text: "Semua beres tanpa kami pusing. Dekor adat Sundanya cantik dan rundown tepat waktu." },
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
      <div className="pb-10">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary px-5 pt-8 pb-10 text-primary-foreground">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/10" />
          <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> NEMPO Organizer
          </span>
          <h1 className="relative mt-4 text-3xl font-extrabold leading-tight">
            Acara impianmu, kami yang urus dari awal sampai akhir.
          </h1>
          <p className="relative mt-3 text-sm opacity-90">
            Event & wedding organizer asal Garut — konsep kreatif, vendor terpercaya, dan tim lapangan berpengalaman.
          </p>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <a href="#paket" className="rounded-xl bg-background px-5 py-3 text-sm font-bold text-primary">Lihat Paket</a>
            <Link href="/price-list" className="rounded-xl border border-primary-foreground/40 px-5 py-3 text-sm font-bold">Daftar Harga</Link>
          </div>
        </section>

        {/* Stats */}
        <section className="-mt-6 px-4">
          <div className="grid grid-cols-4 gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-1 text-base font-extrabold text-foreground">{s.value}</p>
                <p className="text-[10px] leading-tight text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="px-4 pt-8">
          <h2 className="text-xl font-bold text-foreground">Layanan Kami</h2>
          <p className="mb-4 text-sm text-muted-foreground">Satu tim untuk berbagai jenis acara.</p>
          <div className="grid grid-cols-2 gap-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="px-4 pt-8">
          <h2 className="mb-4 text-xl font-bold text-foreground">Cara Kerja</h2>
          <ol className="relative space-y-4 border-l-2 border-primary/20 pl-6">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="absolute -left-[37px] flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                <div className="flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Packages */}
        <section id="paket" className="px-4 pt-8 scroll-mt-20">
          <h2 className="text-xl font-bold text-foreground">Pilihan Paket</h2>
          <p className="mb-4 text-sm text-muted-foreground">Harga indikatif, bisa disesuaikan kebutuhan.</p>
          <div className="space-y-3">
            {packages.map((p) => (
              <div key={p.name} className={`relative rounded-2xl border p-5 ${p.popular ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                {p.popular && <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold text-primary-foreground">PALING DIMINATI</span>}
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                  <p className="text-sm font-extrabold text-primary">{p.price}</p>
                </div>
                <p className="text-xs text-muted-foreground">{p.note}</p>
                <ul className="mt-3 space-y-1.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-xs text-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="pt-8">
          <h2 className="mb-4 px-4 text-xl font-bold text-foreground">Kata Klien</h2>
          <div className="flex snap-x gap-3 overflow-x-auto px-4 pb-2">
            {testimonials.map((t) => (
              <div key={t.name} className="w-64 shrink-0 snap-start rounded-2xl border border-border bg-card p-4">
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />)}
                </div>
                <p className="text-xs leading-relaxed text-foreground">"{t.text}"</p>
                <p className="mt-3 text-xs font-bold text-foreground">{t.name}</p>
                <p className="text-[10px] text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pt-8">
          <h2 className="mb-4 text-xl font-bold text-foreground">Pertanyaan Umum</h2>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-xl border border-border bg-card">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-sm font-semibold text-foreground">
                  {f.q}
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pt-8">
          <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
            <h2 className="text-xl font-bold">Siap bikin acara yang berkesan?</h2>
            <p className="mt-2 text-sm opacity-90">Konsultasi gratis — ceritakan rencana acaramu, kami bantu wujudkan.</p>
            <Link href="/price-list" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-bold text-primary">
              Mulai Konsultasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
