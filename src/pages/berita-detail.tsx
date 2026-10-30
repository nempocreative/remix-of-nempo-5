import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { useRoute, Link } from "@/lib/wouter";
import { useAuth } from "@/contexts/auth-context";
import {
  Calendar, ArrowLeft, Share2, BookmarkPlus,
  Clock, Eye, Tag, ExternalLink, ChevronRight,
  Newspaper, Radio, TrendingUp,
  Heart, MessageCircle, Send, Loader2, AlertCircle,
  Copy, Check, Twitter, Facebook,
} from "lucide-react";

const API = import.meta.env.BASE_URL.replace(/\/$/, "") + "/../api";

const catText: Record<string, string> = {
  Pariwisata: "text-sky-700 bg-sky-50 border-sky-200",
  Budaya:     "text-violet-700 bg-violet-50 border-violet-200",
  Kuliner:    "text-[#0172B1] bg-blue-50 border-blue-200",
  Ekonomi:    "text-emerald-700 bg-emerald-50 border-emerald-200",
  Teknologi:  "text-cyan-700 bg-cyan-50 border-cyan-200",
  Tradisi:    "text-[#0172B1] bg-blue-50 border-blue-200",
  Peringatan: "text-red-700 bg-red-50 border-red-200",
};
const catDot: Record<string, string> = {
  Pariwisata: "bg-sky-500", Budaya: "bg-violet-500", Kuliner: "bg-[#0194f3]",
  Ekonomi: "bg-emerald-500", Teknologi: "bg-cyan-500", Tradisi: "bg-blue-500",
  Peringatan: "bg-red-500",
};

function CatBadge({ cat }: { cat: string }) {
  const cls = catText[cat] ?? "text-gray-700 bg-gray-50 border-gray-200";
  return (
    <span className={`inline-flex items-center gap-1.5 border font-bold rounded-full text-[10px] px-2.5 py-1 ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${catDot[cat] ?? "bg-gray-400"}`} />
      {cat}
    </span>
  );
}

function AuthorAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const sz = size === "lg" ? "w-12 h-12 text-base" : size === "sm" ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-xs";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-[#0172B1] to-[#1BA0E2] flex items-center justify-center shrink-0 font-black text-white`}>
      {initials}
    </div>
  );
}

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 2) return "baru saja";
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

interface Berita {
  id: number; title: string; category: string; image: string;
  summary: string; content: string; author: string; date: string;
  featured: boolean; like_count: number; comment_count: number; slug: string;
  event_date?: string; photo_source?: string; source_name?: string; source_url?: string;
}

interface Comment {
  id: number; user_name: string; user_avatar: string | null; comment: string; created_at: string;
}

export default function BeritaDetail() {
  const [, params] = useRoute("/berita/:id");
  const { user, token } = useAuth();

  const [berita, setBerita]   = useState<Berita | null>(null);
  const [related, setRelated] = useState<Berita[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(true);

  const slug = params?.id ?? "";
  const id = berita?.id ?? (/^\d+$/.test(slug) ? parseInt(slug) : NaN);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoadingArticle(false); return; }
    setLoadingArticle(true);
    fetch(`${API}/berita/${slug}`, { cache: "no-store" })
      .then(async r => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data: Berita | null) => {
        if (!data) return;
        setBerita(data);
        document.title = `${data.title} — Nempo Organizer`;
        return fetch(`${API}/berita`, { cache: "no-store" }).then(r => r.json()).then((all: Berita[]) => {
          setRelated(all.filter(b => b.id !== data.id && b.category === data.category).slice(0, 3));
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoadingArticle(false));
    return () => { document.title = "Nempo Organizer"; };
  }, [slug]);

  /* Like state */
  const [liked, setLiked]       = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  /* Comment state */
  const [comments, setComments]   = useState<Comment[]>([]);
  const [cmtLoading, setCmtLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!id || isNaN(id)) return;
    fetch(`${API}/berita/${id}/like-status`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) { setLiked(d.liked); setLikeCount(d.count); } })
      .catch(() => {});

    setCmtLoading(true);
    fetch(`${API}/berita/${id}/comments`)
      .then(r => r.ok ? r.json() : [])
      .then(setComments)
      .catch(() => setComments([]))
      .finally(() => setCmtLoading(false));
  }, [id, token]);

  // Sync like count from berita data
  useEffect(() => {
    if (berita && !likeCount) setLikeCount(berita.like_count ?? 0);
  }, [berita]);

  async function handleLike() {
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      const r = await fetch(`${API}/berita/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      const d = await r.json();
      setLiked(d.liked); setLikeCount(d.count);
    } catch {}
    setLikeLoading(false);
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    const name = user?.name || commentName.trim();
    if (!name) { setSubmitError("Masukkan nama kamu terlebih dahulu."); return; }
    setSubmitting(true); setSubmitError("");
    try {
      const r = await fetch(`${API}/berita/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ comment: commentText.trim(), user_name: name }),
      });
      if (!r.ok) throw new Error("Gagal");
      const newComment = await r.json();
      setComments(prev => [newComment, ...prev]);
      setCommentText(""); setCommentName("");
    } catch { setSubmitError("Gagal mengirim komentar. Coba lagi."); }
    setSubmitting(false);
  }

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  function getShareUrl() { return window.location.href; }

  async function handleCopyLink() {
    try { await navigator.clipboard.writeText(getShareUrl()); }
    catch {
      const el = document.createElement("textarea");
      el.value = getShareUrl();
      document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => { setCopied(false); setShowShareMenu(false); }, 1800);
  }

  function shareWhatsApp() { window.open(`https://wa.me/?text=${encodeURIComponent((berita?.title || "") + " " + getShareUrl())}`, "_blank"); setShowShareMenu(false); }
  function shareTwitter() { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(berita?.title || "")}&url=${encodeURIComponent(getShareUrl())}`, "_blank"); setShowShareMenu(false); }
  function shareFacebook() { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`, "_blank"); setShowShareMenu(false); }

  if (loadingArticle) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
          <Loader2 className="h-8 w-8 text-[#0194f3] animate-spin" />
          <p className="text-gray-400 text-sm">Memuat berita…</p>
        </div>
      </Layout>
    );
  }

  if (notFound || !berita) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
          <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center">
            <Newspaper className="h-8 w-8 text-gray-300" />
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-700 text-lg">Berita tidak ditemukan</p>
            <p className="text-gray-400 text-sm mt-1">Berita ini mungkin telah dihapus atau belum dipublikasikan.</p>
          </div>
          <Link href="/berita">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0194f3] text-white font-bold text-sm hover:bg-[#0172B1] transition-colors">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Berita
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  const contentParagraphs = (berita.content || "").split("\n\n").filter(Boolean);

  return (
    <Layout>
      <SEO
        title={berita.title}
        description={(berita.summary || berita.title).slice(0, 160)}
        image={berita.image}
        path={`/berita/${berita.id}`}
        type="article"
      />
      <div className="bg-[#F7F8FA] min-h-screen pb-20 md:pb-8">

        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
            <button onClick={() => window.history.back()}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#0194f3] transition-colors shrink-0">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
            <div className="hidden md:flex items-center gap-1 text-[11px] text-gray-400 min-w-0 overflow-hidden">
              <Link href="/berita"><span className="hover:text-[#0194f3] cursor-pointer transition-colors shrink-0">Berita</span></Link>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <CatBadge cat={berita.category} />
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="truncate text-gray-500">{berita.title}</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <div className="relative">
                <button onClick={() => setShowShareMenu(v => !v)}
                  className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
                    showShareMenu ? "bg-[#0194f3]/10 text-[#0194f3]" : "bg-gray-100 text-gray-500 hover:bg-[#0194f3]/10 hover:text-[#0194f3]"
                  }`}>
                  <Share2 className="h-4 w-4" />
                </button>
                {showShareMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
                    <div className="absolute right-0 top-11 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 w-52">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-1.5">Bagikan ke</p>
                      <button onClick={shareWhatsApp} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 text-left transition-colors">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{background:"#25D366"}}>
                          <span className="text-white font-black text-[10px]">WA</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">WhatsApp</span>
                      </button>
                      <button onClick={shareTwitter} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sky-50 text-left transition-colors">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-black">
                          <Twitter className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Twitter / X</span>
                      </button>
                      <button onClick={shareFacebook} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 text-left transition-colors">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{background:"#1877F2"}}>
                          <Facebook className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Facebook</span>
                      </button>
                      <div className="my-1.5 border-t border-gray-100" />
                      <button onClick={handleCopyLink} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${copied ? "bg-green-50 text-green-600" : "hover:bg-gray-50 text-gray-700"}`}>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${copied ? "bg-green-500" : "bg-gray-100"}`}>
                          {copied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4 text-gray-500" />}
                        </div>
                        <span className="text-sm font-semibold">{copied ? "Link Disalin!" : "Salin Link"}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
              <button className="h-9 w-9 rounded-xl bg-gray-100 text-gray-500 hover:bg-amber-50 hover:text-amber-500 flex items-center justify-center transition-colors">
                <BookmarkPlus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* MAIN ARTICLE */}
            <div className="lg:col-span-8 space-y-4">
              <article className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Hero image */}
                <div className="relative h-56 sm:h-80 md:h-[420px] overflow-hidden">
                  {berita.image ? (
                    <img src={berita.image} alt={berita.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#00174F] to-[#0194f3] flex items-center justify-center">
                      <Newspaper className="h-16 w-16 text-white/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    <CatBadge cat={berita.category} />
                    {berita.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#0194f3] text-white px-2.5 py-1 rounded-full shadow">
                        <TrendingUp className="h-2.5 w-2.5" strokeWidth={2.5} /> Unggulan
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5 md:p-7">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight mb-2 max-w-3xl">
                      {berita.title}
                    </h1>
                    <p className="text-white/75 text-sm leading-relaxed line-clamp-2 hidden sm:block max-w-2xl">
                      {berita.summary}
                    </p>
                  </div>
                </div>

                {/* Byline */}
                <div className="px-5 md:px-7 py-4 border-b border-gray-50 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <AuthorAvatar name={berita.author || "Nempo"} size="sm" />
                    <div>
                      <p className="font-black text-gray-800 text-sm leading-tight">{berita.author || "Nempo Organizer"}</p>
                      <p className="text-[10px] text-gray-400 leading-tight">Redaksi Nempo</p>
                    </div>
                  </div>
                  <span className="h-4 w-px bg-gray-200 shrink-0" />
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {berita.date}</span>
                    {berita.event_date && (
                      <span className="flex items-center gap-1 text-violet-500 font-semibold">
                        <Calendar className="h-3 w-3" />
                        Acara: {new Date(berita.event_date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    )}
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 2 menit baca</span>
                    <span className="flex items-center gap-1 text-rose-400 font-semibold"><Heart className="h-3 w-3 fill-rose-400" /> {likeCount}</span>
                    <span className="flex items-center gap-1 text-[#0194f3] font-semibold"><MessageCircle className="h-3 w-3" /> {comments.length}</span>
                  </div>
                </div>

                {/* Lead */}
                {berita.summary && (
                  <div className="px-5 md:px-7 pt-5">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium border-l-4 border-[#0194f3] pl-4 italic">
                      {berita.summary}
                    </p>
                  </div>
                )}

                {/* Body */}
                <div className="px-5 md:px-7 py-5 space-y-4">
                  {contentParagraphs.length > 0 ? (
                    contentParagraphs.map((para, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed text-[15px]">{para}</p>
                    ))
                  ) : (
                    <p className="text-gray-400 italic text-sm">Konten tidak tersedia.</p>
                  )}
                </div>

                {/* Author card */}
                <div className="mx-5 md:mx-7 mb-5 bg-gradient-to-br from-[#F0F7FF] to-[#E8F3FF] rounded-2xl border border-blue-100 p-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Tentang Penulis</p>
                  <div className="flex items-start gap-3">
                    <AuthorAvatar name={berita.author || "Nempo"} size="lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-gray-900 text-sm">{berita.author || "Nempo Organizer"}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Redaksi Nempo Organizer</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
                        <Newspaper className="h-3 w-3 text-[#0194f3]" />
                        <span>Sumber Foto: <span className="text-[#0194f3] font-semibold">{berita.photo_source || "Nempo Organizer"}</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                {berita.source_url && (
                  <div className="mx-5 md:mx-7 mb-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                        <ExternalLink className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">Sumber berita</p>
                        <p className="mt-1 text-sm font-bold text-gray-800">{berita.source_name || "Situs sumber"}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                          Informasi ini dirangkum dari sumber asli. Baca artikel lengkap melalui situs berikut.
                        </p>
                        <a
                          href={berita.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-amber-600"
                        >
                          Baca sumber asli
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Like + Share */}
                <div className="mx-5 md:mx-7 mb-6 flex items-center gap-3 flex-wrap">
                  <button onClick={handleLike} disabled={likeLoading}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.96] disabled:opacity-60 ${
                      liked ? "bg-rose-50 text-rose-500 border border-rose-200" : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-500 border border-transparent"
                    }`}>
                    {likeLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className={`h-4 w-4 transition-all ${liked ? "fill-rose-500" : ""}`} />}
                    <span>{likeCount} Suka</span>
                  </button>
                  <a href="#komentar"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-[#0194f3] border border-transparent transition-all">
                    <MessageCircle className="h-4 w-4" />
                    {comments.length} Komentar
                  </a>
                  <div className="relative ml-auto">
                    <button onClick={() => setShowShareMenu(v => !v)}
                      className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-2 rounded-xl transition-all ${
                        showShareMenu ? "bg-[#0172B1] text-white" : "bg-[#0194f3] text-white hover:opacity-90"
                      }`}>
                      <Share2 className="h-3.5 w-3.5" /> Bagikan
                    </button>
                  </div>
                </div>
              </article>

              {/* COMMENTS */}
              <div id="komentar" className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 md:p-7">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-[#0194f3]/10 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-[#0194f3]" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-gray-900 text-base leading-none">Komentar</h2>
                    <p className="text-[10px] text-gray-400 mt-0.5">{comments.length} komentar</p>
                  </div>
                </div>

                <form onSubmit={handleComment} className="mb-6">
                  <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 space-y-3">
                    {!user && (
                      <input
                        value={commentName}
                        onChange={e => setCommentName(e.target.value)}
                        placeholder="Nama kamu..."
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#0194f3] transition-colors"
                      />
                    )}
                    {user && (
                      <div className="flex items-center gap-2 px-1">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0172B1] to-[#1BA0E2] flex items-center justify-center text-white text-[10px] font-black shrink-0">
                          {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{user.name}</span>
                      </div>
                    )}
                    <textarea
                      rows={3} value={commentText} onChange={e => setCommentText(e.target.value)}
                      placeholder="Tulis komentar kamu..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#0194f3] transition-colors resize-none"
                    />
                    {submitError && (
                      <div className="flex items-center gap-1.5 text-red-500 text-xs">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {submitError}
                      </div>
                    )}
                    <button type="submit" disabled={submitting || !commentText.trim()}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0194f3] hover:bg-[#0172B1] text-white font-bold text-xs transition-colors disabled:opacity-50">
                      {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                      Kirim Komentar
                    </button>
                  </div>
                </form>

                {cmtLoading ? (
                  <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 text-[#0194f3] animate-spin" /></div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-10 w-10 text-gray-200 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Belum ada komentar. Jadilah yang pertama!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map(c => (
                      <div key={c.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-[10px] font-black shrink-0 mt-0.5">
                          {c.user_name?.charAt(0)?.toUpperCase() ?? "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-bold text-gray-800 text-sm">{c.user_name}</span>
                            <span className="text-gray-400 text-[10px]">{timeAgo(c.created_at)}</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-0.5 leading-relaxed">{c.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-4 space-y-5">
              {related.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-4 pt-4 pb-3 border-b border-gray-50 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#0194f3]/10 flex items-center justify-center">
                      <Radio className="h-3.5 w-3.5 text-[#0194f3]" />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-sm">Berita Terkait</h3>
                  </div>
                   <div className="mobile-card-slider sm:grid sm:grid-cols-1 divide-y divide-gray-50">
                     {related.map(b => (
                       <Link key={b.id} href={`/berita/${b.slug || b.id}`}>
                         <div className="group flex items-start gap-3 rounded-xl p-3.5 hover:bg-gray-50 transition-colors cursor-pointer">
                           {b.image && (
                             <div className="relative overflow-hidden rounded-xl shrink-0 w-16 h-12">
                               <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#0194f3] transition-colors">{b.title}</p>
                            <p className="text-[9px] text-gray-400 mt-1">{b.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-[#00174F] to-[#00308F] rounded-2xl p-4 text-center">
                <Radio className="h-8 w-8 text-yellow-400 mx-auto mb-2 animate-pulse" />
                <p className="text-white font-extrabold text-sm">Nempo Berita</p>
                <p className="text-white/60 text-[11px] mt-1 leading-relaxed">Portal berita terpercaya untuk warga dan wisatawan Jawa Barat</p>
                <Link href="/berita">
                  <button className="mt-3 flex items-center gap-1.5 mx-auto px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors">
                    Baca Semua Berita <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
