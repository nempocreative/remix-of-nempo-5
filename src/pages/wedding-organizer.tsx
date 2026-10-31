import { useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "@/lib/wouter";
import {
  Heart, Church, Flower2, Camera, Mail, Music, Utensils, Shirt,
  Check, Plus, Minus, ArrowRight, Quote,
} from "lucide-react";

const themes = [
  { name: "Adat Sunda", tone: "Siger, sawer, huap lingkung", from: "#7a3b1f", to: "#c79a4a" },
  { name: "Modern Elegan", tone: "Putih, gold, kristal", from: "#3a1f2b", to: "#b4466a" },
  { name: "Rustic", tone: "Kayu, bunga kering, lampu hangat", from: "#5b4632", to: "#b08a5c" },
  { name: "Garden Party", tone: "Outdoor, hijau, bunga segar", from: "#2f5a43", to: "#8fbf8a" },
  { name: "Intimate", tone: "Keluarga inti, hangat, personal", from: "#6b3a4a", to: "#e3a6b6" },
];

const services = [
  { icon: Heart, title: "Lamaran & Tunangan", desc: "Dekor intimate, MC, seserahan, dan susunan acara keluarga." },
  { icon: Church, title: "Akad & Pemberkatan", desc: "Koordinasi KUA, penghulu, saksi, dan rundown akad yang khidmat." },
  { icon: Flower2, title: "Dekorasi & Pelaminan", desc: "Pelaminan adat maupun modern, photobooth, dan bunga segar." },
  { icon: Shirt, title: "Rias & Busana", desc: "MUA berpengalaman, busana pengantin, dan keluarga inti." },
  { icon: Utensils, title: "Katering", desc: "Menu prasmanan dan gubukan khas Sunda hingga nasional." },
  { icon: Camera, title: "Foto & Video", desc: "Prewedding, dokumentasi hari H, cinematic, dan drone." },
  { icon: Music, title: "Hiburan", desc: "Akustik, kecapi suling, degung, hingga band dan MC." },
  { icon: Mail, title: "Undangan Digital", desc: "Website undangan, RSVP, buku tamu QR, dan amplop digital." },
];

const journey = [
  { when: "H-8 bulan", title: "Kenalan & konsultasi", desc: "Ngobrol santai soal impian, tanggal, tamu, dan budget." },
  { when: "H-6 bulan", title: "Konsep & venue", desc: "Moodboard, pilihan venue, dan penawaran biaya transparan." },
  { when: "H-3 bulan", title: "Vendor & prewedding", desc: "Fitting busana, test food, dan sesi foto prewedding." },
  { when: "H-1 bulan", title: "Gladi & technical meeting", desc: "Rundown final bersama keluarga dan seluruh vendor." },
  { when: "Hari H", title: "Kalian tinggal bahagia", desc: "Tim kami menjaga setiap detik dari akad hingga resepsi." },
];

const packages = [
  { name: "Intimate", price: "Rp 15 jt", note: "Hingga 150 tamu", items: ["Konsultasi & rundown", "Koordinator hari H (5 crew)", "MC akad & resepsi", "Dekor pelaminan minimalis", "Dokumentasi foto", "Undangan digital"] },
  { name: "Signature", price: "Rp 45 jt", note: "Hingga 500 tamu", items: ["Semua fitur Intimate", "Tim lapangan 10 crew", "Dekor pelaminan & photobooth", "Rias & busana pengantin", "Foto + video cinematic", "Hiburan & sound system", "Buku tamu QR"] },
  { name: "Royal", price: "Custom", note: "Resepsi besar & adat lengkap", items: ["Semua fitur Signature", "Upacara adat Sunda lengkap", "Katering & venue pilihan", "Prewedding outdoor", "Drone & live streaming", "Wedding planner pribadi"] },
];

const stories = [
  { name: "Rina & Fajar", role: "Resepsi · Garut", text: "Dari lamaran sampai resepsi semua diurus rapi. Kami benar-benar tinggal menikmati hari bahagia." },
  { name: "Dewi & Ilham", role: "Adat Sunda · Tarogong", text: "Upacara adatnya khidmat dan keluarga besar senang. Timnya sabar dan sangat detail." },
  { name: "Salsa & Rizky", role: "Garden Party · Cipanas", text: "Dekor outdoor-nya cantik banget, undangan digital dan buku tamu QR bikin praktis." },
];

const faqs = [
  { q: "Kapan sebaiknya mulai booking?", a: "Idealnya 6–8 bulan sebelum hari H agar venue dan vendor favorit masih tersedia." },
  { q: "Boleh pakai vendor pilihan sendiri?", a: "Boleh. Kami tetap koordinasikan vendor pilihan kalian agar selaras dengan rundown." },
  { q: "Melayani upacara adat Sunda?", a: "Ya — siraman, ngeuyeuk seureuh, sawer, nincak endog, hingga huap lingkung." },
  { q: "Bagaimana sistem pembayaran?", a: "DP 30% untuk mengunci tanggal, 50% saat persiapan, dan pelunasan H-7 acara." },
];

const serif = "font-[family-name:var(--font-wed-serif)]";

export default function WeddingOrganizerPage() {
  const [pkg, setPkg] = useState(1);
  const [story, setStory] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const p = packages[pkg]!;
  const s = stories[story]!;

  return (
    <Layout>
      <div className="bg-wed-blush pb-14 text-wed-ink">
        {/* Hero — arch frame */}
        <section className="relative overflow-hidden px-6 pb-12 pt-10 text-center">
          <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-wed-rose/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-wed-gold/20 blur-3xl" />
          <p className="relative text-[11px] font-semibold uppercase tracking-[0.35em] text-wed-gold">NEMPO Wedding Organizer</p>
          <div className="relative mx-auto mt-6 max-w-[320px] rounded-t-[160px] border border-wed-gold/50 bg-card/70 px-6 pb-8 pt-14 shadow-[0_30px_60px_-30px_rgba(180,70,106,.45)] backdrop-blur">
            <div className="absolute inset-2 rounded-t-[150px] border border-wed-gold/25" />
            <p className={`${serif} relative text-sm italic text-wed-rose`}>Bersama keluarga, kami merayakan</p>
            <h1 className={`${serif} relative mt-3 text-[40px] font-bold leading-[1.05]`}>
              Kamu <span className="italic text-wed-rose">&</span> Dia
            </h1>
            <div className="relative mx-auto my-5 flex items-center justify-center gap-3 text-wed-gold">
              <span className="h-px w-10 bg-wed-gold/60" /><Heart className="h-4 w-4 fill-current" /><span className="h-px w-10 bg-wed-gold/60" />
            </div>
            <p className="relative text-[13px] leading-relaxed text-wed-ink/75">
              Dari lamaran, akad, hingga resepsi — modern maupun adat Sunda. Kami rawat setiap detailnya, kalian tinggal bahagia.
            </p>
          </div>
          <div className="relative mt-7 flex justify-center gap-3">
            <a href="#paket" className="rounded-full bg-wed-rose px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-wed-rose/30">Lihat Paket</a>
            <a href="#perjalanan" className="rounded-full border border-wed-ink/20 bg-card px-6 py-3 text-sm font-bold">Cara Kerja</a>
          </div>
          <div className="relative mt-8 grid grid-cols-3 gap-2 text-center">
            {[["80+", "pasangan"], ["30+", "vendor mitra"], ["5", "konsep tema"]].map(([v, l]) => (
              <div key={l}>
                <p className={`${serif} text-2xl font-bold text-wed-rose`}>{v}</p>
                <p className="text-[11px] text-wed-ink/60">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Themes carousel */}
        <section className="pt-4">
          <Head eyebrow="Pilih Nuansa" title="Konsep yang bercerita" className="px-6" />
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 [scrollbar-width:none]">
            {themes.map((t, i) => (
              <div
                key={t.name}
                className="relative flex h-52 w-40 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[28px] p-4 text-primary-foreground"
                style={{ background: `linear-gradient(160deg, ${t.to}, ${t.from})` }}
              >
                <span className={`${serif} absolute right-4 top-3 text-4xl italic opacity-30`}>0{i + 1}</span>
                <div className="absolute inset-x-6 top-6 h-20 rounded-t-full border border-primary-foreground/40" />
                <h3 className={`${serif} relative text-lg font-bold leading-tight`}>{t.name}</h3>
                <p className="relative mt-1 text-[11px] leading-snug opacity-85">{t.tone}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services — elegant list */}
        <section className="mx-4 mt-10 rounded-[32px] bg-card px-5 py-8 shadow-sm">
          <Head eyebrow="Layanan Lengkap" title="Semua dalam satu tangan" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {services.map((sv) => (
              <div key={sv.title}>
                <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-full border border-wed-gold/50 bg-wed-blush text-wed-rose">
                  <sv.icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="text-[13px] font-bold">{sv.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-wed-ink/60">{sv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Journey timeline */}
        <section id="perjalanan" className="scroll-mt-20 px-6 pt-12">
          <Head eyebrow="Perjalanan" title="Menuju hari bahagia" />
          <ol className="relative ml-3 border-l border-dashed border-wed-rose/40">
            {journey.map((j, i) => (
              <li key={j.when} className="relative pb-7 pl-7 last:pb-0">
                <span className={`absolute -left-[9px] top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full ${i === journey.length - 1 ? "bg-wed-rose" : "border-2 border-wed-rose bg-wed-blush"}`}>
                  {i === journey.length - 1 && <Heart className="h-2.5 w-2.5 fill-current text-primary-foreground" />}
                </span>
                <p className="text-[11px] font-bold uppercase tracking-widest text-wed-gold">{j.when}</p>
                <h3 className={`${serif} mt-0.5 text-lg font-bold`}>{j.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-wed-ink/65">{j.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Packages — tab selector */}
        <section id="paket" className="scroll-mt-20 px-4 pt-12">
          <Head eyebrow="Paket" title="Pilih cerita kalian" className="px-2" />
          <div className="mx-2 flex rounded-full bg-card p-1 shadow-sm">
            {packages.map((x, i) => (
              <button key={x.name} onClick={() => setPkg(i)}
                className={`flex-1 rounded-full py-2.5 text-xs font-bold transition-colors ${pkg === i ? "bg-wed-ink text-primary-foreground" : "text-wed-ink/60"}`}>
                {x.name}
              </button>
            ))}
          </div>
          <div className="relative mt-4 overflow-hidden rounded-[32px] bg-wed-ink p-6 text-primary-foreground">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-wed-rose/40 blur-2xl" />
            <p className="relative text-[11px] uppercase tracking-[0.25em] text-wed-gold">{p.note}</p>
            <p className={`${serif} relative mt-2 text-4xl font-bold`}>
              {p.price !== "Custom" && <span className="mr-1 text-sm font-normal opacity-70">mulai</span>}{p.price}
            </p>
            <div className="relative my-5 h-px bg-primary-foreground/15" />
            <ul className="relative space-y-2.5">
              {p.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-[13px]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-wed-gold" strokeWidth={2.5} /> {it}
                </li>
              ))}
            </ul>
            <Link href="/price-list" className="relative mt-6 flex items-center justify-center gap-2 rounded-full bg-wed-gold py-3.5 text-sm font-bold text-wed-ink">
              Pilih {p.name} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Story — single quote */}
        <section className="px-6 pt-12 text-center">
          <Quote className="mx-auto h-8 w-8 text-wed-rose/40" />
          <p className={`${serif} mt-3 min-h-[96px] text-lg italic leading-relaxed`}>“{s.text}”</p>
          <p className="mt-4 text-sm font-bold text-wed-rose">{s.name}</p>
          <p className="text-[11px] text-wed-ink/55">{s.role}</p>
          <div className="mt-4 flex justify-center gap-2">
            {stories.map((x, i) => (
              <button key={x.name} aria-label={x.name} onClick={() => setStory(i)}
                className={`h-2 rounded-full transition-all ${story === i ? "w-6 bg-wed-rose" : "w-2 bg-wed-rose/25"}`} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 pt-12">
          <Head eyebrow="Tanya Jawab" title="Yang sering ditanyakan" />
          <div className="divide-y divide-wed-ink/10 border-y border-wed-ink/10">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-semibold">
                  {f.q}
                  {open === i ? <Minus className="h-4 w-4 shrink-0 text-wed-rose" /> : <Plus className="h-4 w-4 shrink-0 text-wed-rose" />}
                </button>
                {open === i && <p className="pb-4 text-xs leading-relaxed text-wed-ink/65">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pt-12">
          <div className="rounded-t-[140px] rounded-b-[32px] bg-wed-rose px-6 pb-8 pt-14 text-center text-primary-foreground">
            <Heart className="mx-auto h-6 w-6 fill-current text-wed-gold" />
            <h2 className={`${serif} mt-3 text-2xl font-bold leading-snug`}>Mari rencanakan<br /><span className="italic">hari bahagia kalian</span></h2>
            <p className="mt-2 text-sm opacity-85">Konsultasi gratis, tanpa komitmen.</p>
            <Link href="/price-list" className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-bold text-wed-rose">
              Mulai Konsultasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function Head({ eyebrow, title, className = "" }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className={`mb-6 ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-wed-gold">{eyebrow}</p>
      <h2 className={`${serif} mt-1.5 text-[26px] font-bold leading-tight`}>{title}</h2>
    </div>
  );
}
