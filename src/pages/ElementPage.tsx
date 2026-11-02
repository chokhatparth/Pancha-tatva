import React, { useEffect, useState } from 'react';
import {
  ChevronDown,
  Type,
  Volume2,
  Headphones,
  Bell,
  Play,
  Pause,
} from 'lucide-react';
import {
  ELEMENTS,
  ELEMENT_STYLES,
  getElementBySlug,
  ElementImage,
} from '../data/panchaTatvaData';
import { soundEngine } from '../services/soundEngine';
import { speechEngine, SpeechSegment } from '../services/speechEngine';
import { useSoundState, useSpeechState } from '../hooks/useAudioState';

interface ElementPageProps {
  slug: string;
  navigate: (to: string) => void;
}

export const ElementPage: React.FC<ElementPageProps> = ({ slug, navigate }) => {
  const element = getElementBySlug(slug);
  const [scrollPct, setScrollPct] = useState(0);
  const [largeText, setLargeText] = useState(false);
  const [expandedMore, setExpandedMore] = useState<number | null>(null);

  const sound = useSoundState();
  const speech = useSpeechState();

  useEffect(() => {
    if (element) {
      soundEngine.syncWithElementIfEnabled(element.slug);
    }
  }, [element]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct =
        (doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight)) *
        100;
      setScrollPct(pct);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!element) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold">Element not found</h1>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Go home
          </button>
        </div>
      </div>
    );
  }

  const st = ELEMENT_STYLES[element.slug];
  const wordCount = element.sections.reduce(
    (sum, sec) =>
      sum +
      sec.body.join(' ').split(/\s+/).length +
      (sec.more ? sec.more.split(/\s+/).length : 0),
    0
  );
  const currentIdx = ELEMENTS.findIndex((e) => e.slug === element.slug);
  const nextElement = ELEMENTS[(currentIdx + 1) % ELEMENTS.length];

  const pageTitle = `${element.sanskrit} (${element.english}) — Pancha Tatva`;

  const buildSegments = (): SpeechSegment[] => [
    {
      id: `el-intro-${element.slug}`,
      title: `${element.sanskrit} (${element.english})`,
      text: `${element.sanskrit}, ${element.english}. ${element.tagline}. ${element.intro}`,
    },
    ...element.sections.map((sec, idx) => ({
      id: `s-${idx}`,
      title: `${idx + 1}. ${sec.title}`,
      text: `${sec.title}. ${sec.body.join(' ')} ${sec.more ? sec.more : ''}`,
    })),
    {
      id: 'facts',
      title: 'Knowledge Explorer',
      text: `Did you know? ${element.fact}`,
    },
  ];

  const isThisElementSpeaking =
    speech.isSpeaking && speech.pageTitle === pageTitle;
  const isThisElementAmbiance =
    sound.isPlaying && sound.currentSoundscape === element.slug;

  const handleSpeakAll = () => {
    soundEngine.playUiTap(528);
    if (isThisElementSpeaking) {
      speechEngine.togglePause();
    } else {
      speechEngine.speakSegments(buildSegments(), pageTitle, 0);
    }
  };

  return (
    <article>
      <div
        className={`fixed left-0 top-16 z-40 h-1 ${st.bg}`}
        style={{ width: `${scrollPct}%` }}
      />

      <header className="relative overflow-hidden">
        <img
          src={element.images[0].src}
          alt={element.images[0].alt}
          width={1200}
          height={800}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-24">
          <p className={`font-display text-2xl ${st.text}`}>
            {element.devanagari}
          </p>
          <h1 className="text-5xl font-bold md:text-7xl">{element.sanskrit}</h1>
          <p className="mt-1 text-lg uppercase tracking-[0.3em] text-muted-foreground">
            {element.english}
          </p>
          <p className="mt-4 max-w-2xl text-lg">{element.tagline}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            ≈ {wordCount} words · {Math.ceil(wordCount / 200)} min read ·{' '}
            {element.soundscapeDesc}
          </p>

          {/* Element Audio Sanctuary Toolbar */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSpeakAll}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                isThisElementSpeaking
                  ? `${st.bg} text-primary-foreground border-transparent shadow-md`
                  : 'glass hover:border-primary'
              }`}
            >
              {isThisElementSpeaking ? (
                speech.isPaused ? (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Resume Reading {element.sanskrit}
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5 fill-current" />
                    Pause Narration ({speech.currentIndex + 1}/
                    {speech.totalSegments})
                  </>
                )
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5" />
                  Speak · Read Full Study Aloud
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => soundEngine.togglePlay(element.slug)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                isThisElementAmbiance
                  ? `${st.bg} text-primary-foreground border-transparent shadow-md`
                  : 'glass hover:border-primary'
              }`}
            >
              <Headphones className="h-3.5 w-3.5" />
              {isThisElementAmbiance
                ? `${element.sanskrit} Ambiance Active`
                : `Play ${element.sanskrit} Ambiance`}
            </button>

            <button
              type="button"
              onClick={() => soundEngine.playElementChime(element.slug)}
              className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold glass hover:border-primary"
            >
              <Bell className="h-3.5 w-3.5" />
              Chime {element.attributes.bija} ({element.frequencyHz} Hz)
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 text-sm">
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Contents
            </p>
            {element.sections.map((sec, idx) => (
              <a
                key={sec.title}
                href={`#s-${idx}`}
                className="block py-1 text-muted-foreground hover:text-foreground"
              >
                {idx + 1}. {sec.title}
              </a>
            ))}
            <a
              href="#facts"
              className="block py-1 text-muted-foreground hover:text-foreground"
            >
              Knowledge explorer
            </a>
            <a
              href="#refs"
              className="block py-1 text-muted-foreground hover:text-foreground"
            >
              References
            </a>
            <button
              type="button"
              onClick={() => setLargeText(!largeText)}
              className="mt-4 flex items-center gap-2 rounded-md border px-3 py-1.5"
            >
              <Type className="h-4 w-4" />{' '}
              {largeText ? 'Normal text' : 'Larger text'}
            </button>
          </nav>
        </aside>

        <div className={largeText ? 'text-lg leading-8' : 'leading-7'}>
          <div
            className={`mb-10 grid grid-cols-2 gap-3 rounded-2xl border p-5 sm:grid-cols-3 ${st.soft}`}
          >
            {Object.entries(element.attributes).map(([key, val]) => (
              <div key={key}>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {key}
                </p>
                <p className="text-sm font-semibold">{val}</p>
              </div>
            ))}
          </div>

          {element.sections.map((sec, idx) => {
            const isSpeakingThisSection =
              isThisElementSpeaking &&
              speech.currentSegment?.id === `s-${idx}`;

            return (
              <section
                key={sec.title}
                id={`s-${idx}`}
                className={`mb-10 scroll-mt-24 rounded-2xl transition ${
                  isSpeakingThisSection ? `ring-1 ring-primary p-4 ${st.soft}` : ''
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-3xl font-semibold">
                    <span className={st.text}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>{' '}
                    {sec.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() =>
                      speechEngine.speakSegments(
                        buildSegments(),
                        pageTitle,
                        idx + 1
                      )
                    }
                    title={`Read "${sec.title}" aloud`}
                    className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary shrink-0"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Speak</span>
                  </button>
                </div>

                {sec.body.map((para, pIdx) => (
                  <p key={pIdx} className="mt-3 text-muted-foreground">
                    {para}
                  </p>
                ))}

                {sec.more && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMore(expandedMore === idx ? null : idx)
                      }
                      className={`flex items-center gap-1 text-sm font-semibold ${st.text}`}
                    >
                      More in depth{' '}
                      <ChevronDown
                        className={`h-4 w-4 transition ${
                          expandedMore === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedMore === idx && (
                      <p
                        className={`mt-2 rounded-xl border p-4 text-sm ${st.border} ${st.soft}`}
                      >
                        {sec.more}
                      </p>
                    )}
                  </div>
                )}

                {idx === 2 && <ElementFigure img={element.images[1]} />}
                {idx === 8 && <ElementFigure img={element.images[2]} />}
              </section>
            );
          })}

          <section id="facts" className="mb-10 scroll-mt-24">
            <h2 className="text-3xl font-semibold">Knowledge explorer</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {element.images.map((img) => (
                <ElementFigure key={img.caption} img={img} compact />
              ))}
            </div>
            <p className={`mt-6 rounded-xl p-4 ${st.soft}`}>
              💡 {element.fact}
            </p>
          </section>

          <section id="refs" className="mb-10 scroll-mt-24">
            <h2 className="text-3xl font-semibold">Research references</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-6 text-sm text-muted-foreground">
              {element.references.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ol>
          </section>

          <a
            href={`/elements/${nextElement.slug}`}
            onClick={(e) => {
              e.preventDefault();
              soundEngine.playElementChime(nextElement.slug);
              navigate(`/elements/${nextElement.slug}`);
            }}
            className="block rounded-2xl border p-6 hover:border-primary"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Next element
            </p>
            <p className="font-display text-3xl">
              {nextElement.sanskrit} — {nextElement.english} →
            </p>
          </a>
        </div>
      </div>
    </article>
  );
};

const ElementFigure: React.FC<{ img: ElementImage; compact?: boolean }> = ({
  img,
  compact,
}) => (
  <figure className={compact ? '' : 'my-6'}>
    <img
      src={img.src}
      alt={img.alt}
      loading="lazy"
      width={1200}
      height={800}
      className="w-full rounded-xl object-cover"
    />
    <figcaption className="mt-2 text-xs text-muted-foreground">
      {img.caption}{' '}
      <span className="opacity-70">· AI-generated illustration</span>
    </figcaption>
  </figure>
);
