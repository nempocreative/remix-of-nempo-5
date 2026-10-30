import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import creator01 from "@/assets/generated_images/nempo-creator-01.jpg";
import creator02 from "@/assets/generated_images/nempo-creator-02.jpg";
import creator03 from "@/assets/generated_images/nempo-creator-03.jpg";
import creator04 from "@/assets/generated_images/nempo-creator-04.jpg";
import creator05 from "@/assets/generated_images/nempo-creator-05.jpg";
import creator06 from "@/assets/generated_images/nempo-creator-06.jpg";
import creator07 from "@/assets/generated_images/nempo-creator-07.jpg";
import creator08 from "@/assets/generated_images/nempo-creator-08.jpg";
import creator09 from "@/assets/generated_images/nempo-creator-09.jpg";
import creator10 from "@/assets/generated_images/nempo-creator-10.jpg";
import weddingCreator01 from "@/assets/lib/nempo-kenalan-deck/src/assets/deck/creator-wcc-ai.jpg";
import weddingCreator02 from "@/assets/lib/nempo-kenalan-deck/src/assets/deck/creator-daily-ai.jpg";
import weddingCreator03 from "@/assets/lib/nempo-kenalan-deck/src/assets/deck/creator-travel-ai.jpg";
import weddingCreator04 from "@/assets/lib/nempo-kenalan-deck/src/assets/deck/creator-influencer-ai.jpg";
import { NEMPO_INSTAGRAM_DM_URL } from "@/lib/contact";
import "./nempo-creator-team-card.css";

const creatorImages = [
  creator01,
  creator02,
  creator03,
  creator04,
  creator05,
  creator06,
  creator07,
  creator08,
  creator09,
  creator10,
];

const creatorNames = [
  "Nara",
  "Aksa",
  "Kirana",
  "Raka",
  "Sora",
  "Aruna",
  "Ravi",
  "Naya",
  "Dava",
  "Keira",
];

const creatorFields = [
  { label: "Creator", color: "linear-gradient(135deg, #2563eb, #1d4ed8)" },
  { label: "Designer", color: "linear-gradient(135deg, #8b5cf6, #6d28d9)" },
  { label: "Developer", color: "linear-gradient(135deg, #475569, #1e293b)" },
  { label: "Photographer", color: "linear-gradient(135deg, #db2777, #be185d)" },
  { label: "Videographer", color: "linear-gradient(135deg, #ea580c, #c2410c)" },
  { label: "Video Editor", color: "linear-gradient(135deg, #4f46e5, #3730a3)" },
  { label: "Social Media", color: "linear-gradient(135deg, #059669, #047857)" },
  { label: "Creative Lead", color: "linear-gradient(135deg, #0891b2, #0e7490)" },
  { label: "Event Creator", color: "linear-gradient(135deg, #d97706, #b45309)" },
  { label: "Wedding Creator", color: "linear-gradient(135deg, #e11d48, #be123c)" },
];

const creativeStudioProfileIndexes = [1, 2, 3, 5, 6, 7];
const artsAndEntertainmentProfileIndexes = [0, 4, 8, 9];

const creativeStudioProfiles = creativeStudioProfileIndexes.map((index) => ({
  image: creatorImages[index],
  name: creatorNames[index],
  field: creatorFields[index],
}));

const artsAndEntertainmentProfiles = artsAndEntertainmentProfileIndexes.map((index) => ({
  image: creatorImages[index],
  name: creatorNames[index],
  field: creatorFields[index],
}));

const weddingCreatorProfiles = [
  {
    image: weddingCreator01,
    name: "Maya",
    field: "Wedding Creator",
    color: "linear-gradient(135deg, #e11d48, #be123c)",
  },
  {
    image: weddingCreator02,
    name: "Faris",
    field: "Videographer",
    color: "linear-gradient(135deg, #ea580c, #c2410c)",
  },
  {
    image: weddingCreator03,
    name: "Laras",
    field: "Photographer",
    color: "linear-gradient(135deg, #db2777, #be185d)",
  },
  {
    image: weddingCreator04,
    name: "Evan",
    field: "Content Creator",
    color: "linear-gradient(135deg, #2563eb, #1d4ed8)",
  },
];

export function NempoCreatorTeamCard() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [maxSlide, setMaxSlide] = useState(creativeStudioProfiles.length - 4);
  const [stepWidth, setStepWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!viewport || !track || !(firstCard instanceof HTMLElement)) return;

    const measure = () => {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      const count = Math.max(1, Math.floor((viewport.clientWidth + gap) / (cardWidth + gap)));
      setVisibleCount(count);
      setMaxSlide(Math.max(0, creativeStudioProfiles.length - count));
      setStepWidth(cardWidth + gap);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    setActiveSlide((current) => Math.min(current, maxSlide));
  }, [maxSlide]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || maxSlide === 0) return;

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActiveSlide((current) => (current >= maxSlide ? 0 : current + 1));
      }
    }, 5200);

    return () => window.clearInterval(interval);
  }, [activeSlide, isPaused, maxSlide, prefersReducedMotion]);

  return (
    <section
      id="creator-team"
      aria-label="Wedding Content Creator, Creative Studio, dan Arts & Entertainment Nempo"
      className="nempo-creator-team"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setIsPaused(false);
        }
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
    >
      <section
        className="nempo-creator-team__wedding-section"
        aria-labelledby="wedding-content-creator-title"
      >
        <header className="nempo-creator-team__header">
          <div className="nempo-creator-team__intro">
            <h2
              className="nempo-creator-team__title"
              id="wedding-content-creator-title"
            >
              Wedding Content Creator
            </h2>
            <p className="nempo-creator-team__service">Wedding · Event · konten acara</p>
          </div>

          <a
            className="nempo-creator-team__contact"
            href={NEMPO_INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi Nempo melalui Instagram"
          >
            <MessageCircle aria-hidden="true" />
            <span>Tanya tim</span>
          </a>
        </header>

        <div className="nempo-creator-team__wedding-grid">
          {weddingCreatorProfiles.map((profile) => (
            <article
              className="nempo-creator-team__card"
              key={profile.name}
              aria-label={`${profile.name}, ${profile.field}, profil contoh AI`}
            >
              <div className="nempo-creator-team__portrait">
                <img
                  src={profile.image}
                  alt="Potret contoh AI, bukan anggota tim Nempo"
                  loading="eager"
                  draggable={false}
                />
                <span
                  className="nempo-creator-team__role-flag"
                  style={{ background: profile.color }}
                >
                  {profile.field}
                </span>
              </div>
              <p className="nempo-creator-team__name">{profile.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="nempo-creator-team__category"
        aria-labelledby="creative-studio-title"
      >
        <header className="nempo-creator-team__category-heading">
          <h2 className="nempo-creator-team__title" id="creative-studio-title">
            Creative Studio
          </h2>
          <p className="nempo-creator-team__service">Konten · desain · digital</p>
        </header>

        <div
          className="nempo-creator-team__carousel-row"
          aria-label="Creative Studio"
          aria-roledescription="carousel"
        >
          <div className="nempo-creator-team__viewport" ref={viewportRef}>
            <div
              className="nempo-creator-team__track"
              ref={trackRef}
              style={{
                transform: `translate3d(-${activeSlide * stepWidth}px, 0, 0)`,
                transition: prefersReducedMotion ? "none" : undefined,
              }}
            >
              {creativeStudioProfiles.map((profile, index) => {
                const isVisible = index >= activeSlide && index < activeSlide + visibleCount;
                return (
                  <article
                    className="nempo-creator-team__card"
                    key={profile.image}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${profile.name}, ${profile.field.label}, profil contoh AI ${index + 1} dari ${creativeStudioProfiles.length}`}
                    aria-hidden={!isVisible}
                  >
                    <div className="nempo-creator-team__portrait">
                      <img
                        src={profile.image}
                        alt="Potret contoh AI, bukan anggota tim Nempo"
                        loading={index < visibleCount ? "eager" : "lazy"}
                        draggable={false}
                      />
                      <span
                        className="nempo-creator-team__role-flag"
                        style={{ background: profile.field.color }}
                      >
                        {profile.field.label}
                      </span>
                    </div>
                    <p className="nempo-creator-team__name">{profile.name}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        className="nempo-creator-team__category"
        aria-labelledby="arts-entertainment-title"
      >
        <header className="nempo-creator-team__category-heading">
          <h2 className="nempo-creator-team__title" id="arts-entertainment-title">
            Arts &amp; Entertainment
          </h2>
          <p className="nempo-creator-team__service">Creator · event · hiburan</p>
        </header>

        <div className="nempo-creator-team__wedding-grid">
          {artsAndEntertainmentProfiles.map((profile) => (
            <article
              className="nempo-creator-team__card"
              key={profile.image}
              aria-label={`${profile.name}, ${profile.field.label}, profil contoh AI`}
            >
              <div className="nempo-creator-team__portrait">
                <img
                  src={profile.image}
                  alt="Potret contoh AI, bukan anggota tim Nempo"
                  loading="lazy"
                  draggable={false}
                />
                <span
                  className="nempo-creator-team__role-flag"
                  style={{ background: profile.field.color }}
                >
                  {profile.field.label}
                </span>
              </div>
              <p className="nempo-creator-team__name">{profile.name}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
