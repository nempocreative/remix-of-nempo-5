import { useMemo, useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { PageLoader } from "@/components/page-loader";
import { SedangDipersiapkan } from "@/components/sedang-dipersiapkan";
import { CityUnavailable } from "@/components/city-unavailable";
import { Link } from "@/lib/wouter";
import { ALL_CITIES, useCityFilter } from "@/contexts/city-filter-context";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Search, Clock, TrendingUp,
  Newspaper, Eye, ChevronRight, Radio,
  UploadCloud, CheckCircle2, Send, FileText, X, ImageIcon,
  Heart, MessageCircle, Loader2, CalendarDays,
} from "lucide-react";

const API = import.meta.env.BASE_URL.replace(/\/$/, "") + "/../api";

const beritaCategories = [
  "Semua", "Pariwisata", "Budaya", "Kuliner", "Ekonomi", "Teknologi",
  "Tradisi", "Peringatan", "Pendidikan", "Olahraga", "Lingkungan", "Keagamaan",
];

const catDot: Record<string, string> = {
  Pariwisata: "bg-sky-500",
  Budaya:     "bg-violet-500",
  Kuliner:    "bg-[#0194f3]",
  Ekonomi:    "bg-emerald-500",
  Teknologi:  "bg-cyan-500",
  Tradisi:    "bg-blue-500",
  Peringatan: "bg-red-500",
  Pendidikan: "bg-indigo-500",
  Olahraga:   "bg-emerald-500",
  Lingkungan: "bg-lime-500",
  Keagamaan: "bg-amber-500",
};
const catText: Record<string, string> = {
  Pariwisata: "text-sky-700 bg-sky-50 border-sky-200",
  Budaya:     "text-violet-700 bg-violet-50 border-violet-200",
  Kuliner:    "text-[#0172B1] bg-blue-50 border-blue-200",
  Ekonomi:    "text-emerald-700 bg-emerald-50 border-emerald-200",
  Teknologi:  "text-cyan-700 bg-cyan-50 border-cyan-200",
  Tradisi:    "text-[#0172B1] bg-blue-50 border-blue-200",
  Peringatan: "text-red-700 bg-red-50 border-red-200",
  Pendidikan: "text-indigo-700 bg-indigo-50 border-indigo-200",
  Olahraga:   "text-emerald-700 bg-emerald-50 border-emerald-200",
  Lingkungan: "text-lime-700 bg-lime-50 border-lime-200",
  Keagamaan: "text-amber-700 bg-amber-50 border-amber-200",
};

function CatBadge({ cat, size = "sm" }: { cat: string; size?: "sm" | "xs" }) {
  const cls = catText[cat] ?? "text-gray-700 bg-gray-50 border-gray-200";
  return (
    <span className={`inline-flex items-center gap-1 border font-bold rounded-full ${
      size === "xs" ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-0.5"
    } ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${catDot[cat] ?? "bg-gray-500"}`} />
      {cat}
    </span>
  );
}

function ReadMeta({ date, compact = false }: { date: string; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-gray-400 ${compact ? "text-[10px]" : "text-xs"}`}>
      <span className="inline-flex items-center gap-1">
        <Clock className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} />
        2 menit
      </span>
      <span className="opacity-40">·</span>
      <span>{date}</span>
    </div>
  );
}

function NewsImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    );
  }
  return (
    <div className={`${className} flex items-center justify-center bg-gradient-to-br from-[#00174F] via-[#0172B1] to-[#0194f3]`}>
      <Newspaper className="h-12 w-12 text-white/25" strokeWidth={1.2} />
    </div>
  );
}

interface DbBerita {
  id: number;
  title: string;
  category: string;
  image: string;
  summary: string;
  author: string;
  date: string;
  published_at: string | null;
  featured: boolean;
  active: boolean;
  like_count: number;
  comment_count: number;
  location?: string | null;
  source_name?: string | null;
  source_url?: string | null;
}

interface SubmitForm {
  judul: string; penulis: string; kontak: string;
  kategori: string; isi: string;
  fotoPreview: string | null; fotoName: string;
}

const FORM_INIT: SubmitForm = {
  judul: "", penulis: "", kontak: "", kategori: "Pariwisata",
  isi: "", fotoPreview: null, fotoName: "",
};

const views = ["1,2K", "890", "2,4K", "560", "3,1K", "745", "1,8K", "430"];

type DatePreset = "all" | "today" | "7days" | "30days" | "custom";

function localDateInputValue(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftLocalDate(date: Date, days: number): string {
  const shifted = new Date(date);
  shifted.setDate(shifted.getDate() + days);
  return localDateInputValue(shifted);
}

function publicationDate(item: Pick<DbBerita, "published_at">): string {
  return item.published_at?.slice(0, 10) ?? "";
}

export default function BeritaPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [query, setQuery]                   = useState("");
  const [datePreset, setDatePreset]         = useState<DatePreset>("all");
  const [dateFrom, setDateFrom]             = useState("");
  const [dateTo, setDateTo]                 = useState("");
  const [items, setItems]     = useState<DbBerita[]>([]);
  const [loading, setLoading] = useState(true);
  const { matchesCity, selectedCity } = useCityFilter();
  const cityLabel = selectedCity === ALL_CITIES ? "Jawa Barat" : selectedCity;

  useEffect(() => {
    fetch(`${API}/berita`, { cache: "no-store" })
      .then(r => r.ok ? r.json() : [])
      .then((data: DbBerita[]) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  /* ── Submit form ── */
  const [form, setForm]             = useState<SubmitForm>(FORM_INIT);
  const [submitDone, setSubmitDone] = useState(false);
  const [submitErr, setSubmitErr]   = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const setField = (k: keyof SubmitForm, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setSubmitErr("Ukuran foto maksimal 5 MB."); return; }
    const reader = new FileReader();
    reader.onload = ev => setForm(prev => ({ ...prev, fotoPreview: ev.target?.result as string, fotoName: file.name }));
    reader.readAsDataURL(file);
    setSubmitErr("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.judul.trim()) { setSubmitErr("Judul berita wajib diisi."); return; }
    if (!form.penulis.trim()) { setSubmitErr("Nama penulis wajib diisi."); return; }
    if (!form.isi.trim() || form.isi.trim().length < 50) { setSubmitErr("Isi berita minimal 50 karakter."); return; }
    setSubmitLoading(true); setSubmitErr("");
    try {
      const res = await fetch(`${API}/berita/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: form.judul, penulis: form.penulis, email: form.kontak,
           kategori: form.kategori, isi: form.isi, foto: form.fotoPreview || null,
           lokasi: selectedCity === ALL_CITIES ? "Garut" : selectedCity,
        }),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || "Gagal mengirim"); }
      setSubmitDone(true); setForm(FORM_INIT);
    } catch (err: any) {
      setSubmitErr(err.message || "Gagal mengirim berita. Coba lagi.");
    } finally { setSubmitLoading(false); }
  };

  const cityItems = useMemo(
    () => items.filter(b => matchesCity(b.location, "Garut")),
    [items, matchesCity],
  );
  const dateRange = useMemo(() => {
    if (datePreset === "today") {
      const today = localDateInputValue();
      return { from: today, to: today };
    }
    if (datePreset === "7days") {
      return { from: shiftLocalDate(new Date(), -6), to: localDateInputValue() };
    }
    if (datePreset === "30days") {
      return { from: shiftLocalDate(new Date(), -29), to: localDateInputValue() };
    }
    if (datePreset === "custom") {
      return { from: dateFrom, to: dateTo };
    }
    return { from: "", to: "" };
  }, [dateFrom, datePreset, dateTo]);
  const invalidDateRange = datePreset === "custom"
    && Boolean(dateFrom && dateTo && dateFrom > dateTo);
  const dateFilteredItems = useMemo(() => {
    if (datePreset === "all") return cityItems;
    if (invalidDateRange || (!dateRange.from && !dateRange.to)) return [];
    return cityItems.filter(item => {
      const publishedDate = publicationDate(item);
      if (!publishedDate) return false;
      return (!dateRange.from || publishedDate >= dateRange.from)
        && (!dateRange.to || publishedDate <= dateRange.to);
    });
  }, [cityItems, datePreset, dateRange, invalidDateRange]);
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return dateFilteredItems.filter(b => {
      const matchCat = activeCategory === "Semua" || b.category === activeCategory;
      return matchCat && (
        b.title.toLowerCase().includes(normalizedQuery) ||
        (b.summary || "").toLowerCase().includes(normalizedQuery)
      );
    });
  }, [activeCategory, dateFilteredItems, query]);

  const { featured, secondary, rest } = useMemo(() => {
    const nextFeatured = filtered.find(b => b.featured) ?? filtered[0];
    const nextSecondary = filtered.filter(b => b.id !== nextFeatured?.id).slice(0, 2);
    const secondaryIds = new Set(nextSecondary.map(item => item.id));
    const nextRest = filtered.filter(
      b => b.id !== nextFeatured?.id && !secondaryIds.has(b.id),
    );
    return { featured: nextFeatured, secondary: nextSecondary, rest: nextRest };
  }, [filtered]);

  const stats = useMemo(() => {
    const scopedItems = items.filter(b => matchesCity(b.location, "Garut"));
    const todayStr = localDateInputValue();
    const todayCount = scopedItems.filter(b => publicationDate(b) === todayStr).length;
    const trendingCount = scopedItems.filter(b => b.featured).length;
    return [
      { label: "Artikel",  value: scopedItems.length },
      { label: "Trending", value: trendingCount },
      { label: "Hari ini", value: todayCount },
    ];
  }, [items, matchesCity]);

  if (loading) {
    return <Layout><PageLoader text="Memuat berita terkini…" /></Layout>;
  }

  return (
    <Layout>
      <SEO
        title={`Berita ${cityLabel} — Kabar & Informasi Terkini ${cityLabel}`}
        description={`Baca berita terkini, kabar lokal, informasi pariwisata, dan cerita inspiratif dari ${cityLabel}.`}
        keywords={`berita ${cityLabel.toLowerCase()}, kabar ${cityLabel.toLowerCase()}, informasi ${cityLabel.toLowerCase()}, berita pariwisata ${cityLabel.toLowerCase()}`}
        path="/berita"
        type="article"
      />
      <div className="bg-[#F7F8FA]">

        {/* MASTHEAD */}
        <div className="relative overflow-hidden text-white"
          style={{ background: "linear-gradient(160deg,#00174F 0%,#00308F 45%,#0172B1 80%,#0194f3 100%)" }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage:"linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-20"
            style={{ background:"radial-gradient(circle,#38bdf8 0%,transparent 70%)" }} />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none opacity-10"
            style={{ background:"radial-gradient(circle,#818cf8 0%,transparent 70%)" }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2.5 border-b border-white/10 text-[10px] text-white/50">
              <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                    <span className="font-bold uppercase tracking-widest text-white/70">Ruang Redaksi</span>
                </span>
                <span className="h-3 w-px bg-white/15" />
                <span className="font-medium">
                  {new Date().toLocaleDateString("id-ID", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-5">
                {stats.map(s => (
                  <span key={s.label} className="flex items-center gap-1">
                    <span className="text-white font-bold text-[11px]">{s.value}</span>
                    <span>{s.label}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 pb-5 flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.18)", backdropFilter:"blur(8px)" }}>
                    <Newspaper className="h-5 w-5 text-white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">Nempo</span>
                      <span className="h-3 w-px bg-white/20" />
                      <Radio className="h-3 w-3 text-yellow-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Berita</span>
                    </div>
                    <h1 className="text-[26px] md:text-3xl font-black leading-tight tracking-tight">
                      Berita &amp; Informasi
                      <span className="ml-2 relative inline-block">
                        <span className="relative z-10">{cityLabel}</span>
                        <span className="absolute bottom-0.5 left-0 right-0 h-2.5 rounded-sm opacity-30 -z-0"
                          style={{ background:"linear-gradient(90deg,#FFC300,#FF6B00)" }} />
                      </span>
                    </h1>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["Pariwisata","Budaya","Ekonomi","Teknologi","Tradisi"].map(cat => (
                    <span key={cat} className="text-[9px] font-semibold text-white/50 border border-white/10 rounded px-2 py-0.5">{cat}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 md:w-80">
                <div className="flex items-center bg-white rounded-2xl shadow-xl border border-gray-100 pr-1.5 overflow-visible">
                  <div className="flex items-center justify-center shrink-0" style={{ marginLeft:2, marginTop:2 }}>
                    <DotLottieReact
                      src={`${import.meta.env.BASE_URL}animations/bird.json`}
                      loop autoplay
                      style={{ width:36, height:36 }}
                    />
                  </div>
                  <div className="w-px self-stretch my-2 mx-1.5 shrink-0 bg-gray-200" />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={`Cari berita ${cityLabel}...`}
                    className="flex-1 min-w-0 outline-none text-sm text-gray-700 placeholder-gray-400 font-medium bg-transparent py-3 px-1"
                  />
                  {query && (
                    <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 mr-1">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    className="shrink-0 active:scale-95 transition-all rounded-xl flex items-center justify-center gap-1.5"
                      style={{ background:"#0194f3", color:"#fff", boxShadow:"0 4px 12px rgba(1,148,243,0.35)", padding:"10px 12px" }}
                  >
                    <Search className="w-4 h-4 shrink-0" />
                    <span className="hidden md:inline text-sm font-bold">Cari</span>
                  </button>
                </div>
                <div className="flex sm:hidden items-center gap-4 px-1">
                  {stats.map(s => (
                    <span key={s.label} className="flex items-center gap-1 text-[10px] text-white/50">
                      <span className="text-white font-bold text-xs">{s.value}</span> {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Category tabs */}
            <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="flex gap-1.5 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 scrollbar-hide"
                style={{ WebkitOverflowScrolling:"touch" }}>
                {beritaCategories.map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className="flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all duration-200 whitespace-nowrap"
                      style={isActive ? {
                        background: "white", color: "#00308F",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.20)", transform: "translateY(-1px)",
                      } : {
                        background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.75)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}>
                      {cat}
                    </button>
                  );
                })}
                <span className="flex-shrink-0 w-4" />
              </div>
              <div className="absolute right-0 top-0 bottom-4 w-12 pointer-events-none"
                style={{ background:"linear-gradient(to right,transparent,#0172B1)" }} />
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-10">
          {items.length === 0 ? (
            <SedangDipersiapkan
              icon={Newspaper}
              iconGradient="linear-gradient(135deg, #0172B1 0%, #0194f3 100%)"
              dotColor1="#0172B1"
              dotColor2="#0194f3"
              title="Berita & Artikel"
              titleHighlight="Sedang Dipersiapkan"
               description={`Berita dan artikel seputar ${cityLabel} sedang kami siapkan. Pantau terus untuk informasi terkini!`}
              btn1Label="Jelajahi Wisata"
              btn1Href="/wisata"
              btn2Label="Lihat Event"
              btn2Href="/event"
            />
          ) : cityItems.length === 0 ? (
            <CityUnavailable accent="#0194f3" category="Berita dan artikel" />
          ) : (
           <>
           <div className="mb-5 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-[0_5px_18px_rgba(15,23,42,0.05)]">
             <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
               <div className="flex items-center gap-2">
                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0194f3]/10">
                   <CalendarDays className="h-4 w-4 text-[#0194f3]" />
                 </div>
                 <div>
                   <p className="text-xs font-extrabold text-gray-900">Filter tanggal</p>
                   <p className="text-[10px] text-gray-400">Tampilkan berita berdasarkan tanggal publikasi</p>
                 </div>
               </div>
               <div className="flex flex-wrap items-center gap-1.5">
                 {([
                   ["all", "Semua tanggal"],
                   ["today", "Hari ini"],
                   ["7days", "7 hari"],
                   ["30days", "30 hari"],
                   ["custom", "Pilih rentang"],
                 ] as [DatePreset, string][]).map(([value, label]) => (
                   <button
                     key={value}
                     type="button"
                     onClick={() => setDatePreset(value)}
                     className={`rounded-full border px-3 py-1.5 text-[10px] font-bold transition-colors ${
                       datePreset === value
                         ? "border-[#0194f3] bg-[#0194f3] text-white shadow-sm"
                         : "border-gray-200 bg-white text-gray-500 hover:border-[#0194f3]/50 hover:text-[#0172B1]"
                     }`}
                   >
                     {label}
                   </button>
                 ))}
               </div>
             </div>
             {datePreset === "custom" && (
               <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3 sm:flex-row sm:items-end">
                 <label className="flex flex-1 flex-col gap-1 text-[10px] font-bold text-gray-500">
                   Dari tanggal
                   <input
                     type="date"
                     value={dateFrom}
                     onChange={event => setDateFrom(event.target.value)}
                     className="h-9 rounded-lg border border-gray-200 px-2.5 text-xs font-medium text-gray-700 outline-none focus:border-[#0194f3] focus:ring-2 focus:ring-[#0194f3]/10"
                   />
                 </label>
                 <label className="flex flex-1 flex-col gap-1 text-[10px] font-bold text-gray-500">
                   Sampai tanggal
                   <input
                     type="date"
                     value={dateTo}
                     onChange={event => setDateTo(event.target.value)}
                     className="h-9 rounded-lg border border-gray-200 px-2.5 text-xs font-medium text-gray-700 outline-none focus:border-[#0194f3] focus:ring-2 focus:ring-[#0194f3]/10"
                   />
                 </label>
                 <button
                   type="button"
                   onClick={() => { setDateFrom(""); setDateTo(""); setDatePreset("all"); }}
                   className="h-9 rounded-lg px-3 text-xs font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                 >
                   Reset
                 </button>
               </div>
             )}
              {invalidDateRange ? (
               <p className="mt-2 text-[10px] font-semibold text-red-500">Tanggal awal tidak boleh melewati tanggal akhir.</p>
              ) : datePreset === "custom" && !dateFrom && !dateTo ? (
                <p className="mt-2 text-[10px] font-medium text-gray-400">
                  Pilih tanggal awal atau akhir untuk menampilkan berita.
                </p>
              ) : datePreset !== "all" && (
               <p className="mt-2 text-[10px] font-medium text-gray-400">
                  Menampilkan {filtered.length} artikel pada periode yang dipilih.
               </p>
             )}
           </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 flex flex-col gap-5">

              {/* Hero article */}
              {featured && (
                <Link href={`/berita/${(featured as any).slug || featured.id}`}>
                  <article className="group relative rounded-[26px] overflow-hidden cursor-pointer shadow-[0_14px_40px_rgba(15,23,42,0.16)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.22)] ring-1 ring-black/5 transition-all duration-300 h-[300px] sm:h-[390px] md:h-[440px]">
                    <NewsImage src={featured.image} alt={featured.title}
                      loading="eager" fetchPriority="high"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/95 via-[#07111f]/35 to-[#07111f]/5" />
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
                      <div className="flex gap-1.5 flex-wrap">
                      <CatBadge cat={featured.category} />
                      {featured.featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#0194f3] text-white px-2 py-0.5 rounded-full shadow">
                          <TrendingUp className="h-2.5 w-2.5" strokeWidth={2.5} /> Unggulan
                        </span>
                      )}
                      </div>
                      <span className="hidden sm:inline-flex items-center rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
                        Bacaan utama
                      </span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-7">
                      <h2 className="text-xl sm:text-2xl md:text-[2.15rem] font-black text-white leading-[1.08] line-clamp-3 mb-2 group-hover:text-yellow-300 transition-colors max-w-4xl">
                        {featured.title}
                      </h2>
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-3 hidden md:block max-w-2xl">{featured.summary}</p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white/60 text-[11px]">
                        <span className="font-semibold text-white/80">{featured.author}</span>
                        {featured.source_name && (
                          <>
                            <span className="opacity-40">·</span>
                            <span className="text-yellow-200/80">Sumber: {featured.source_name}</span>
                          </>
                        )}
                        <span className="opacity-40">·</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-2.5 w-2.5" />2 menit baca</span>
                        <span className="opacity-40">·</span>
                        <span>{featured.date}</span>
                        <span className="hidden sm:inline-flex items-center gap-1 ml-auto text-white/80 font-bold">Baca selengkapnya <ChevronRight className="h-3 w-3" /></span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Secondary 2-col */}
              {secondary.length > 0 && (
                 <div className="mobile-card-slider sm:grid sm:grid-cols-2 gap-3">
                  {secondary.map((b, i) => (
                    <Link key={b.id} href={`/berita/${(b as any).slug || b.id}`}>
                      <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_6px_20px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)] transition-all duration-200 cursor-pointer flex flex-row sm:flex-col">
                        <div className="relative overflow-hidden shrink-0 w-[108px] self-stretch sm:w-auto sm:h-[180px]">
                          <NewsImage src={b.image} alt={b.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 sm:bg-gradient-to-t sm:from-black/50 sm:to-transparent" />
                          <div className="absolute top-2 left-2 hidden sm:block">
                            <CatBadge cat={b.category} />
                          </div>
                        </div>
                        <div className="p-3 flex flex-col flex-1 min-w-0 gap-1">
                          <CatBadge cat={b.category} size="xs" />
                          <h3 className="font-bold text-gray-900 text-[13px] leading-snug line-clamp-2 group-hover:text-[#0194f3] transition-colors">{b.title}</h3>
                          <p className="text-gray-400 text-[11px] line-clamp-2 hidden sm:block">{b.summary}</p>
                          <div className="flex items-center gap-2 mt-auto pt-1">
                            <ReadMeta date={b.date} compact />
                            {b.source_name && <span className="text-[10px] text-[#0172B1] truncate max-w-[100px]">Sumber: {b.source_name}</span>}
                            <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 ml-auto shrink-0">
                              <Eye className="h-2.5 w-2.5" />{views[i % views.length]}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}

              {/* Divider */}
              {rest.length > 0 && (
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#0194f3] to-[#00308F]" />
                  <h2 className="font-extrabold text-gray-900 text-base tracking-tight">
                    {activeCategory === "Semua" ? "Berita Lainnya" : activeCategory}
                  </h2>
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 text-xs">{rest.length} artikel</span>
                </div>
              )}

              {/* Rest grid */}
              {rest.length === 0 && filtered.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <Newspaper className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                  <p className="font-bold text-gray-600">Berita tidak ditemukan</p>
                  <p className="text-sm text-gray-400 mt-1">Coba kata kunci atau kategori lain</p>
                </div>
              ) : (
                 <div className="mobile-card-slider sm:grid sm:grid-cols-1 flex flex-col gap-3">
                  {rest.map((b, i) => (
                    <Link key={b.id} href={`/berita/${(b as any).slug || b.id}`}>
                      <article className="group bg-white rounded-2xl border border-gray-100 shadow-[0_5px_18px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.10)] transition-all duration-200 cursor-pointer flex gap-4 p-3 sm:p-4">
                        <div className="relative overflow-hidden rounded-xl shrink-0 w-24 h-20 sm:w-32 sm:h-24">
                          <NewsImage src={b.image} alt={b.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <CatBadge cat={b.category} size="xs" />
                            <h3 className="font-bold text-gray-900 text-[13px] leading-snug line-clamp-2 mt-1 group-hover:text-[#0194f3] transition-colors">{b.title}</h3>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <ReadMeta date={b.date} compact />
                            {b.source_name && <span className="text-[10px] text-[#0172B1] truncate max-w-[120px]">Sumber: {b.source_name}</span>}
                            <div className="ml-auto flex items-center gap-2 text-[10px] text-gray-400 shrink-0">
                              <span className="flex items-center gap-1"><Heart className="h-2.5 w-2.5" />{b.like_count}</span>
                              <span className="flex items-center gap-1"><MessageCircle className="h-2.5 w-2.5" />{b.comment_count}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center shrink-0 self-center">
                          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#0194f3] transition-colors" />
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-5">

              {/* Trending */}
              {dateFilteredItems.slice(0, 5).length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)] overflow-hidden">
                  <div className="px-4 pt-4 pb-3 border-b border-gray-50 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#0194f3]/10 flex items-center justify-center">
                      <TrendingUp className="h-3.5 w-3.5 text-[#0194f3]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#0194f3]">Update lokal</p>
                      <h3 className="font-extrabold text-gray-900 text-sm">Berita Terbaru</h3>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {dateFilteredItems.slice(0, 5).map((b, i) => (
                      <Link key={b.id} href={`/berita/${(b as any).slug || b.id}`}>
                        <div className="group flex items-start gap-3 p-3.5 hover:bg-gray-50 transition-colors cursor-pointer">
                          <span className="text-2xl font-black text-gray-100 leading-none w-6 shrink-0 select-none">{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#0194f3] transition-colors">{b.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <CatBadge cat={b.category} size="xs" />
                              <span className="text-[9px] text-gray-400">{b.date}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Kirim Berita */}
              <div className="bg-gradient-to-br from-[#00174F] to-[#00308F] rounded-2xl overflow-hidden shadow-md">
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                      <UploadCloud className="h-3.5 w-3.5 text-white" />
                    </div>
                    <h3 className="font-extrabold text-white text-sm">Punya Berita?</h3>
                  </div>
                  <p className="text-white/60 text-[11px] leading-relaxed mb-3">
                     Kirim berita, cerita, atau informasi seputar {cityLabel} dan tim kami akan meninjaunya untuk dipublikasikan.
                  </p>

                  {submitDone ? (
                    <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-3 text-center mb-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
                      <p className="text-emerald-300 font-bold text-xs">Berhasil dikirim!</p>
                      <p className="text-emerald-400/70 text-[10px] mt-0.5">Kami akan meninjau kiriman kamu.</p>
                      <button onClick={() => setSubmitDone(false)} className="mt-2 text-[10px] text-white/50 hover:text-white underline transition-colors">
                        Kirim lagi
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-2 mb-3">
                      <input
                        required value={form.judul} onChange={e => setField("judul", e.target.value)}
                        placeholder="Judul berita *"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-white/30 text-xs outline-none focus:border-white/40 transition-colors"
                      />
                      <input
                        required value={form.penulis} onChange={e => setField("penulis", e.target.value)}
                        placeholder="Nama kamu *"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-white/30 text-xs outline-none focus:border-white/40 transition-colors"
                      />
                      <input
                        type="email" value={form.kontak} onChange={e => setField("kontak", e.target.value)}
                        placeholder="Email (opsional)"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-white/30 text-xs outline-none focus:border-white/40 transition-colors"
                      />
                      <select
                        value={form.kategori} onChange={e => setField("kategori", e.target.value)}
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-white/40 transition-colors"
                        style={{ colorScheme: "dark" }}
                      >
                        {beritaCategories.slice(1).map(c => (
                          <option key={c} value={c} style={{ background: "#00308F", color: "white" }}>{c}</option>
                        ))}
                      </select>
                      <textarea
                        required rows={3} value={form.isi} onChange={e => setField("isi", e.target.value)}
                        placeholder="Isi berita (min. 50 karakter) *"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-white/30 text-xs outline-none focus:border-white/40 transition-colors resize-none"
                      />
                      <div>
                        <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                        <button type="button" onClick={() => fileRef.current?.click()}
                          className="w-full flex items-center justify-center gap-2 bg-white/10 border border-white/15 border-dashed rounded-xl px-3 py-2 text-white/50 text-[10px] hover:bg-white/15 transition-colors">
                          {form.fotoPreview
                            ? <><img src={form.fotoPreview} alt="" className="w-5 h-5 rounded object-cover" /><span className="text-white/70 truncate max-w-[120px]">{form.fotoName}</span></>
                            : <><ImageIcon className="h-3.5 w-3.5" /><span>Tambah foto (opsional)</span></>
                          }
                        </button>
                      </div>
                      {submitErr && <p className="text-red-400 text-[10px]">{submitErr}</p>}
                      <button type="submit" disabled={submitLoading}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0194f3] hover:bg-[#0172B1] text-white font-bold text-xs transition-colors disabled:opacity-60">
                        {submitLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                        {submitLoading ? "Mengirim…" : "Kirim Berita"}
                      </button>
                    </form>
                  )}
                </div>
                <div className="px-4 pb-3 flex items-center gap-1.5 text-white/30 text-[9px]">
                  <FileText className="h-3 w-3 shrink-0" />
                  <span>Kiriman akan ditinjau tim editorial sebelum dipublikasikan</span>
                </div>
              </div>
            </div>
          </div>
           </>
          )}
        </div>
      </div>
    </Layout>
  );
}
