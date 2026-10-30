import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Link } from "@/lib/wouter";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  CalendarDays,
  Dumbbell,
  GraduationCap,
  Handshake,
  Instagram,
  Leaf,
  Lightbulb,
  Music2,
  Palette,
  Store,
  Users,
} from "lucide-react";
import communityHeroImage from "@/assets/94d218d05080a6554bc7214283cb8a88_1789408730013.jpg";

const focusAreas = [
  {
    icon: Palette,
    title: "Karya dan talenta",
    description:
      "Tempat untuk memperkenalkan karya, mencoba ide baru, dan menemukan orang yang bisa diajak membuat sesuatu.",
  },
  {
    icon: CalendarDays,
    title: "Acara yang dekat",
    description:
      "Dari panggung kecil sampai kegiatan bersama, selalu ada alasan untuk bertemu dan mengisi waktu dengan baik.",
  },
  {
    icon: Lightbulb,
    title: "Cerita dan peluang",
    description:
      "Belajar dari pengalaman orang lain, berbagi pengetahuan, dan membuka jalan untuk kolaborasi berikutnya.",
  },
];

const communityTracks = [
  {
    icon: Music2,
    title: "Musik dan panggung",
    description:
      "Musisi, performer, DJ, dan orang-orang di balik panggung yang ingin berkarya bersama.",
    accent: "#b33a82",
    tag: "Berkarya",
  },
  {
    icon: Palette,
    title: "Seni dan budaya",
    description:
      "Ruang untuk seni rupa, teater, budaya Sunda, craft, dan ekspresi lokal Jawa Barat.",
    accent: "#6e4bb4",
    tag: "Ekspresi",
  },
  {
    icon: Camera,
    title: "Kreator dan digital",
    description:
      "Berbagi ide dengan content creator, fotografer, videografer, dan desainer.",
    accent: "#2563c7",
    tag: "Kolaborasi",
  },
  {
    icon: Store,
    title: "Wirausaha muda",
    description:
      "Saling belajar tentang bisnis, brand lokal, pemasaran, dan cara mengembangkan usaha.",
    accent: "#bd4d8b",
    tag: "Bertumbuh",
  },
  {
    icon: Dumbbell,
    title: "Olahraga dan lifestyle",
    description:
      "Temukan teman untuk bergerak, berlatih, dan membangun kebiasaan aktif bersama.",
    accent: "#3472be",
    tag: "Bergerak",
  },
  {
    icon: Leaf,
    title: "Lingkungan",
    description:
      "Ikut dalam aksi kecil yang menjaga ruang hidup, alam, dan masa depan Jawa Barat.",
    accent: "#5670b5",
    tag: "Berdampak",
  },
  {
    icon: GraduationCap,
    title: "Belajar dan berbagi",
    description:
      "Sesi sharing, kelas, dan percakapan yang membantu menemukan perspektif baru.",
    accent: "#4855a4",
    tag: "Insight",
  },
  {
    icon: BookOpen,
    title: "Sosial dan relawan",
    description:
      "Bertemu orang yang ingin hadir, membantu, dan membuat perubahan bersama.",
    accent: "#873d96",
    tag: "Aksi",
  },
];

const waysToJoin = [
  {
    number: "01",
    title: "Datang dan kenalan",
    description:
      "Ikuti kegiatan yang paling dekat dengan minatmu. Tidak perlu menunggu jadi ahli untuk mulai datang.",
  },
  {
    number: "02",
    title: "Bawa sesuatu",
    description:
      "Bisa karya, ide, pengalaman, atau sekadar waktu dan tenaga. Semua punya tempat di sini.",
  },
  {
    number: "03",
    title: "Ajak yang lain",
    description:
      "Komunitas tumbuh dari orang-orang yang mau saling mengenalkan, membantu, dan membuka ruang.",
  },
];

export default function KomunitasPage() {
  return (
    <Layout>
      <SEO
        title="Kala Muda — Komunitas Anak Muda Jawa Barat"
        description="Kala Muda adalah ruang anak muda Jawa Barat untuk menemukan karya, event, komunitas, dan peluang untuk berkarya bersama."
        keywords="Kala Muda, komunitas anak muda Jawa Barat, event Jawa Barat, karya anak muda"
        path="/komunitas"
      />

      <main className="min-h-screen overflow-hidden bg-[#f5f5ff] text-[#37215b]">
        <section className="border-b border-[#dce4fb] bg-[#eaf0ff]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-8 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-16 lg:pt-16">
            <div>
              <h1 className="mt-0 max-w-xl text-[clamp(2.4rem,5vw,4.5rem)] font-black leading-[1.02] tracking-[-0.045em] text-[#182b39]">
                Bikin sesuatu.
                <br />
                <span className="text-[#a62f78]">Bareng-bareng.</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-[#5f6b6f] sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
                Kala Muda adalah ruang untuk anak muda Jawa Barat yang suka berkarya,
                datang ke acara, bertemu orang baru, dan punya cerita untuk
                dibagikan.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <a
                  href="https://www.kalamuda.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#a62f78] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7b2866]/15 transition hover:-translate-y-0.5 hover:bg-[#862761] sm:w-auto"
                >
                  Kenali Kala Muda
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/kalamudacom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#c8c8e7] bg-white/80 px-5 py-3.5 text-sm font-bold text-[#49346e] transition hover:-translate-y-0.5 hover:border-[#a62f78]/50 hover:bg-white sm:w-auto"
                >
                  <Instagram className="h-4 w-4" />
                  Ikuti kabarnya
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#778084] sm:mt-8">
                <span>Karya</span>
                <span>Event</span>
                <span>Kolaborasi</span>
                <span>Peluang</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-full border border-[#cbd8fa] sm:-bottom-6 sm:-left-6" />
              <figure className="relative overflow-hidden rounded-[1.75rem] bg-[#dce8ff] shadow-[0_24px_60px_rgba(59,45,112,.16)]">
                <img
                  src={communityHeroImage}
                  alt="Anak muda berkumpul dan saling menyatukan tangan"
                  className="aspect-[1.04/1] h-full w-full object-cover object-center sm:aspect-[1.15/1]"
                />
                <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-[#39205f]/95 px-3 py-2.5 text-white sm:bottom-4 sm:left-4 sm:right-4 sm:px-4 sm:py-3">
                  <span className="text-[11px] font-semibold sm:text-xs">
                    Ruang untuk saling menemukan
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.14em] text-white/60 sm:text-[10px] sm:tracking-[0.18em]">
                    Jawa Barat
                  </span>
                </figcaption>
              </figure>
                <div className="absolute -right-1 -top-3 rounded-2xl border border-[#d8cfee] bg-white px-3 py-2.5 shadow-sm sm:-right-5 sm:-top-5 sm:px-4 sm:py-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#a62f78]">
                  Bukan penonton
                </p>
                <p className="mt-1 text-xs font-bold text-[#39205f] sm:text-sm">
                  Jadi bagian.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#e3dcd3] bg-white">
          <div className="mx-auto grid max-w-7xl gap-px bg-[#dfe5f8] px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {focusAreas.map((area) => (
              <article
                key={area.title}
                className="bg-white px-1 py-8 sm:px-6 sm:py-10 lg:px-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eee5fb] text-[#a62f78]">
                    <area.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-[#a62f78]">0{focusAreas.indexOf(area) + 1}</span>
                </div>
                <h2 className="mt-5 text-lg font-black text-[#37215b]">{area.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#62677c]">{area.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f5f5ff]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex flex-col gap-5 border-b border-[#dedff5] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="max-w-2xl text-2xl font-black leading-tight tracking-[-0.035em] text-[#37215b] sm:text-3xl lg:text-4xl">
                  Ada banyak cara untuk ikut bergerak.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#62677c]">
                Tidak harus punya komunitas sendiri. Mulai saja dari hal yang
                kamu suka, lalu lihat siapa yang bisa diajak jalan bersama.
              </p>
            </div>

            <div className="mt-8 grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {communityTracks.map((track, index) => (
                <article
                  key={track.title}
                  className="group relative border-t-2 bg-white p-5 shadow-[0_8px_25px_rgba(61,42,113,.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(61,42,113,.12)] sm:p-6"
                  style={{ borderTopColor: track.accent }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{
                        color: track.accent,
                        backgroundColor: `${track.accent}16`,
                      }}
                    >
                      <track.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#aaa9bf]">0{index + 1}</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-2">
                    <h3 className="text-base font-black text-[#37215b]">{track.title}</h3>
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: track.accent }}
                    >
                      {track.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#62677c]">{track.description}</p>
                  <div className="mt-5 flex items-center gap-1 text-xs font-bold text-[#aaa9bf] transition group-hover:text-[#a62f78]">
                    Segera hadir
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#d9daf3] bg-[#e8eaff]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-8">
            <div>
              <h2 className="max-w-md text-2xl font-black leading-tight tracking-[-0.04em] text-[#37215b] sm:text-3xl lg:text-4xl">
                Datang dengan rasa ingin tahu.
                <br />
                <span className="text-[#a62f78]">Pulang bawa cerita.</span>
              </h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-base font-semibold leading-7 text-[#3f3564] sm:text-lg sm:leading-8 lg:text-xl">
                Komunitas bukan sekadar tempat berkumpul. Ia dibangun dari
                obrolan kecil, orang yang mau membantu, dan keberanian untuk
                mulai memperkenalkan diri.
              </p>
              <p className="mt-5 text-sm leading-7 text-[#62677c]">
                Kala Muda membuka ruang untuk musik, seni, komunitas, dan
                ide-ide baru. Kegiatannya dibuat agar kamu bisa datang sebagai
                dirimu sendiri, mencoba hal baru, lalu menemukan orang-orang
                yang punya semangat serupa.
              </p>
              <a
                href="https://www.instagram.com/kalamudacom/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#a62f78] transition hover:gap-3"
              >
                Lihat kegiatan Kala Muda
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-xl">
              <h2 className="text-2xl font-black tracking-[-0.035em] text-[#37215b] sm:text-3xl lg:text-4xl">
                Tidak perlu menunggu semuanya siap.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#62677c]">
                Hal-hal baik biasanya dimulai dari langkah yang sederhana.
              </p>
            </div>
            <div className="mt-10 grid gap-0 border-y border-[#dedff5] md:grid-cols-3">
              {waysToJoin.map((way) => (
                <article
                  key={way.number}
                  className="border-b border-[#dedff5] py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <span className="text-sm font-bold text-[#a62f78]">{way.number}</span>
                  <h3 className="mt-5 text-lg font-black text-[#37215b]">{way.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#62677c]">{way.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#39205f] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-8">
            <div>
              <h2 className="max-w-2xl text-2xl font-black leading-tight tracking-[-0.04em] sm:text-3xl lg:text-4xl">
                Punya ide, karya, atau acara yang ingin dibawa ke lebih banyak
                orang?
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                Ceritakan ke kami. Bisa mulai dari pesan singkat di Instagram.
                Kami terbuka untuk bertemu dengan komunitas, kreator, dan anak
                muda yang ingin membuat sesuatu di Jawa Barat.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://www.instagram.com/kalamudacom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d85da4] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#c44791]"
                >
                  Sapa Kala Muda
                  <Instagram className="h-4 w-4" />
                </a>
                <Link
                  href="/event"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  Lihat event di Nempo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="border-l border-white/15 pl-6 lg:pl-10">
              <p className="text-4xl font-black leading-none tracking-[-0.06em] text-[#f0a9d0] sm:text-5xl lg:text-6xl">
                Ayo,
                <br />
                mulai.
              </p>
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
                Satu perkenalan bisa menjadi awal dari banyak hal yang baik.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}