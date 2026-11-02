import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Volume2,
  Headphones,
  Play,
  Pause,
  Bell,
} from 'lucide-react';
import {
  ELEMENTS,
  ELEMENT_STYLES,
  DAILY_FACTS,
  TOPICS,
  ElementSlug,
} from '../data/panchaTatvaData';
import {
  soundEngine,
  SOUNDSCAPES,
  SoundscapeId,
} from '../services/soundEngine';
import { speechEngine, SpeechSegment } from '../services/speechEngine';
import { useSoundState, useSpeechState } from '../hooks/useAudioState';

interface HomePageProps {
  navigate: (to: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [fact, setFact] = useState(DAILY_FACTS[0]);
  const sound = useSoundState();
  const speech = useSpeechState();

  useEffect(() => {
    const dayIndex = Math.floor(Date.now() / 86400000);
    setFact(DAILY_FACTS[dayIndex % DAILY_FACTS.length]);
  }, []);

  const orderedElements = [...ELEMENTS].reverse(); // space, air, fire, water, earth

  const buildHomeSegments = (): SpeechSegment[] => [
    {
      id: 'hero',
      title: 'Pancha Tatva — The Five Elements of Existence',
      text: 'Pancha Tatva. The Five Elements of Existence. A traditional Indian framework describing all of existence through five principles — Earth, Water, Fire, Air and Space — studied here through scripture, Ayurveda, yoga, architecture and modern science.',
    },
    ...orderedElements.map((el) => ({
      id: `el-${el.slug}`,
      title: `${el.sanskrit} (${el.english})`,
      text: `${el.sanskrit}, ${el.english}. ${el.tagline} ${el.intro} Did you know? ${el.fact}`,
    })),
    {
      id: 'fact-of-day',
      title: 'Knowledge of the Day',
      text: `Knowledge of the day: ${fact}`,
    },
    {
      id: 'connections',
      title: 'How the Elements Connect',
      text: 'How the elements connect. The Taittiriya Upanishad describes a chain of emanation: from the Self arose Space; from Space, Air; from Air, Fire; from Fire, Water; and from Water, Earth. Each later element carries the qualities of those before it — which is why Earth can be heard, felt, seen, tasted and smelled, while Space can only be heard. In Ayurveda, Vata is Space plus Air, Pitta is Fire plus Water, and Kapha is Water plus Earth.',
    },
    {
      id: 'traditions',
      title: 'Traditions and Perspectives',
      text:
        'Traditions and perspectives: ' +
        TOPICS.map((t) => `${t.title}: ${t.summary}`).join(' '),
    },
  ];

  const isHomeSpeaking =
    speech.isSpeaking &&
    speech.pageTitle === 'Pancha Tatva — The Five Elements of Existence';

  const handleSpeakHome = () => {
    soundEngine.playUiTap(528);
    if (isHomeSpeaking) {
      speechEngine.togglePause();
    } else {
      speechEngine.speakSegments(
        buildHomeSegments(),
        'Pancha Tatva — The Five Elements of Existence',
        0
      );
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <img
          src="/assets/hero-TC5rP6Ul.jpg"
          alt="Five glowing element symbols linked in a golden mandala against a starry sky"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            पञ्च तत्त्व
          </p>
          <h1 className="mt-4 text-6xl font-bold tracking-[0.08em] md:text-8xl">
            PANCHA TATVA
          </h1>
          <p className="mt-3 font-display text-2xl italic text-gradient md:text-3xl">
            The Five Elements of Existence
          </p>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            A traditional Indian framework describing all of existence through
            five principles — Earth, Water, Fire, Air and Space — studied here
            through scripture, Ayurveda, yoga, architecture and modern science.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#elements"
              onClick={() => soundEngine.playUiTap(528)}
              className="rounded-full bg-gradient-elements px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:opacity-95"
            >
              Explore the Five Elements
            </a>
            <a
              href="/topics/introduction"
              onClick={(e) => {
                e.preventDefault();
                soundEngine.playUiTap(528);
                navigate('/topics/introduction');
              }}
              className="rounded-full border px-6 py-3 text-sm font-semibold glass transition hover:border-primary"
            >
              Begin Your Journey
            </a>
            <a
              href="/library"
              onClick={(e) => {
                e.preventDefault();
                soundEngine.playUiTap(528);
                navigate('/library');
              }}
              className="rounded-full border px-6 py-3 text-sm font-semibold glass transition hover:border-primary"
            >
              Discover the Research
            </a>
          </div>

          {/* Ambiance & Read Aloud Quick Sanctuary Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => soundEngine.togglePlay()}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
                sound.isPlaying
                  ? 'border-primary bg-primary/20 text-primary shadow-md'
                  : 'glass text-muted-foreground hover:border-primary hover:text-foreground'
              }`}
            >
              <Headphones className="h-4 w-4" />
              {sound.isPlaying
                ? `Ambiance On · ${
                    SOUNDSCAPES.find((s) => s.id === sound.currentSoundscape)
                      ?.label || 'Sanctuary'
                  }`
                : 'Play Sacred Ambiance'}
            </button>

            <button
              type="button"
              onClick={handleSpeakHome}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
                isHomeSpeaking
                  ? 'border-primary bg-primary text-primary-foreground shadow-md'
                  : 'glass text-muted-foreground hover:border-primary hover:text-foreground'
              }`}
            >
              {isHomeSpeaking ? (
                speech.isPaused ? (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    Resume Reading Website
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4 fill-current" />
                    Pause Voice Narration
                  </>
                )
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  Speak · Read Website Aloud
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* The Five Great Elements */}
      <section id="elements" className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-center text-4xl font-semibold md:text-5xl">
          The Five Great Elements
        </h2>
        <p className="mt-2 text-center text-muted-foreground">
          Panchamahabhuta — in the order of creation, from subtle to gross.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {orderedElements.map((el) => {
            const st = ELEMENT_STYLES[el.slug];
            const isElementSoundPlaying =
              sound.isPlaying && sound.currentSoundscape === el.slug;

            return (
              <div
                key={el.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <a
                  href={`/elements/${el.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    soundEngine.playElementChime(el.slug);
                    navigate(`/elements/${el.slug}`);
                  }}
                  className="relative h-44 overflow-hidden block"
                >
                  <img
                    src={el.images[0].src}
                    alt={el.images[0].alt}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-lg ${st.bg} text-primary-foreground`}
                  >
                    {el.symbol}
                  </span>
                </a>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`font-display text-sm ${st.text}`}>
                        {el.devanagari}
                      </p>
                      <h3 className="text-2xl font-semibold">
                        <a
                          href={`/elements/${el.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            soundEngine.playElementChime(el.slug);
                            navigate(`/elements/${el.slug}`);
                          }}
                          className="hover:underline"
                        >
                          {el.sanskrit}
                        </a>
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {el.english}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => soundEngine.togglePlay(el.slug)}
                        title={`Play ${el.sanskrit} (${el.english}) ambiance sound`}
                        aria-label={`Play ${el.sanskrit} ambiance`}
                        className={`rounded-full border p-1.5 transition ${
                          isElementSoundPlaying
                            ? `${st.bg} text-primary-foreground border-transparent`
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Headphones className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          speechEngine.speakSingleSection(
                            `card-${el.slug}`,
                            `${el.sanskrit} (${el.english})`,
                            `${el.sanskrit}, ${el.english}. ${el.tagline} ${el.intro} Did you know? ${el.fact}`
                          )
                        }
                        title={`Read ${el.sanskrit} summary aloud`}
                        aria-label={`Speak ${el.sanskrit} summary`}
                        className="rounded-full border p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {el.intro}
                  </p>
                  <p className={`mt-3 rounded-lg p-2 text-xs ${st.soft}`}>
                    💡 {el.fact}
                  </p>
                  <a
                    href={`/elements/${el.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      soundEngine.playElementChime(el.slug);
                      navigate(`/elements/${el.slug}`);
                    }}
                    className={`mt-auto pt-4 text-sm font-semibold ${st.text} inline-block`}
                  >
                    Explore more →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Elemental Ambiance & Sound Sanctuary Strip */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border bg-card/70 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">
                Nada Brahma · Sacred Soundscapes
              </p>
              <h2 className="mt-1 text-2xl font-semibold md:text-3xl">
                Elemental Ambiance & Chakra Resonance
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Immerse in synthesized Web Audio soundscapes tuned to each
                element’s classical tanmatra and bija mantra frequency.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => soundEngine.strikeHarmonicBell(432, 0.2, 4.5)}
                className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold hover:border-primary hover:text-primary transition"
              >
                <Bell className="h-3.5 w-3.5" />
                Strike Singing Bowl
              </button>
              {sound.isPlaying && (
                <button
                  type="button"
                  onClick={() => soundEngine.stop()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-2 text-xs font-semibold text-destructive"
                >
                  Stop Sound
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {SOUNDSCAPES.map((sc) => {
              const active =
                sound.isPlaying && sound.currentSoundscape === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() =>
                    soundEngine.togglePlay(sc.id as SoundscapeId)
                  }
                  className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition ${
                    active
                      ? 'border-primary bg-primary/15 shadow-md'
                      : 'hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-display text-base font-semibold ${sc.colorClass}`}
                    >
                      {sc.sanskrit}
                    </span>
                    {active ? (
                      <span className="flex items-end gap-0.5 h-3">
                        <span className="w-0.5 h-full bg-primary rounded-full animate-soundbar-1" />
                        <span className="w-0.5 h-full bg-primary rounded-full animate-soundbar-2" />
                        <span className="w-0.5 h-full bg-primary rounded-full animate-soundbar-3" />
                      </span>
                    ) : (
                      <Play className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <p className="mt-2 text-sm font-semibold">{sc.label}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">
                    {sc.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Knowledge of the day */}
      <section className="mx-auto max-w-5xl px-4">
        <div className="rounded-2xl border glass p-6 md:p-8">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
              <Sparkles className="h-4 w-4" /> Knowledge of the day
            </p>
            <button
              type="button"
              onClick={() =>
                speechEngine.speakSingleSection(
                  'daily-fact',
                  'Knowledge of the day',
                  fact
                )
              }
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition"
            >
              <Volume2 className="h-3.5 w-3.5" />
              Read aloud
            </button>
          </div>
          <p className="mt-3 font-display text-2xl">{fact}</p>
          <button
            type="button"
            onClick={() => {
              soundEngine.playUiTap(640);
              setFact(
                DAILY_FACTS[Math.floor(Math.random() * DAILY_FACTS.length)]
              );
            }}
            className="mt-4 text-sm text-primary underline-offset-4 hover:underline"
          >
            Show another fact
          </button>
        </div>
      </section>

      {/* How the elements connect */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
        <ElementMandalaWheel />
        <div>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-4xl font-semibold">How the elements connect</h2>
            <button
              type="button"
              onClick={() =>
                speechEngine.speakSingleSection(
                  'how-elements-connect',
                  'How the elements connect',
                  'How the elements connect. The Taittiriya Upanishad describes a chain of emanation: from the Self arose Space; from Space, Air; from Air, Fire; from Fire, Water; and from Water, Earth. Each later element carries the qualities of those before it — which is why Earth can be heard, felt, seen, tasted and smelled, while Space can only be heard. Vata is Space plus Air. Pitta is Fire plus Water. Kapha is Water plus Earth.'
                )
              }
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-primary shrink-0"
            >
              <Volume2 className="h-3.5 w-3.5" />
              Speak
            </button>
          </div>
          <p className="mt-4 text-muted-foreground">
            The Taittiriya Upanishad describes a chain of emanation: from the
            Self arose Space; from Space, Air; from Air, Fire; from Fire, Water;
            and from Water, Earth. Each later element carries the qualities of
            those before it — which is why Earth can be heard, felt, seen,
            tasted and smelled, while Space can only be heard.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-xl border p-3">
              <p className="font-semibold">Vata</p>
              <p className="text-muted-foreground">Space + Air</p>
            </div>
            <div className="rounded-xl border p-3">
              <p className="font-semibold">Pitta</p>
              <p className="text-muted-foreground">Fire + Water</p>
            </div>
            <div className="rounded-xl border p-3">
              <p className="font-semibold">Kapha</p>
              <p className="text-muted-foreground">Water + Earth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Traditions & perspectives */}
      <section className="mx-auto max-w-7xl px-4">
        <h2 className="text-4xl font-semibold">Traditions & perspectives</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <a
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              onClick={(e) => {
                e.preventDefault();
                soundEngine.playUiTap(528);
                navigate(`/topics/${topic.slug}`);
              }}
              className="rounded-2xl border bg-card p-6 transition hover:border-primary"
            >
              <h3 className="text-2xl font-semibold">{topic.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {topic.summary}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

const ElementMandalaWheel: React.FC = () => {
  const order: ElementSlug[] = ['space', 'air', 'fire', 'water', 'earth'];
  const [selected, setSelected] = useState<ElementSlug>('space');
  const current = ELEMENTS.find((e) => e.slug === selected) || ELEMENTS[4];

  const handleSelect = (slug: ElementSlug, chime = false) => {
    setSelected(slug);
    if (chime) {
      soundEngine.playElementChime(slug);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <svg viewBox="0 0 300 300" className="w-full float-slow">
        <circle
          cx="150"
          cy="150"
          r="110"
          className="fill-none stroke-gold"
          strokeOpacity="0.4"
          strokeDasharray="4 6"
        />
        {order.map((slug, idx) => {
          const rad = ((-90 + idx * 72) * Math.PI) / 180;
          const cx = 150 + 110 * Math.cos(rad);
          const cy = 150 + 110 * Math.sin(rad);
          const fillClass = ELEMENT_STYLES[slug].fill;
          return (
            <g
              key={slug}
              className="cursor-pointer"
              onClick={() => handleSelect(slug, true)}
              onMouseEnter={() => handleSelect(slug, false)}
            >
              <circle
                cx={cx}
                cy={cy}
                r={selected === slug ? 30 : 24}
                className={`${fillClass} transition-all`}
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                className="fill-primary-foreground text-[11px] font-semibold"
              >
                {idx + 1}
              </text>
            </g>
          );
        })}
        <text
          x="150"
          y="145"
          textAnchor="middle"
          className="fill-foreground font-display text-[22px]"
        >
          {current.sanskrit.split(' ')[0]}
        </text>
        <text
          x="150"
          y="168"
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
        >
          {current.attributes.tanmatra}
        </text>
      </svg>
      <p className="text-center text-sm text-muted-foreground">
        Tap an element to hear its chime · {current.attributes.chakra} ·{' '}
        {current.attributes.bija}
      </p>
    </div>
  );
};
