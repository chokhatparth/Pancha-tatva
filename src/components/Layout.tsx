import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Bell,
  Square,
  Headphones,
  Share2,
  Check,
} from 'lucide-react';
import {
  ELEMENTS,
  ELEMENT_STYLES,
  TOPICS,
  ElementSlug,
} from '../data/panchaTatvaData';
import {
  soundEngine,
  SOUNDSCAPES,
  SoundscapeId,
} from '../services/soundEngine';
import { speechEngine } from '../services/speechEngine';
import { useSoundState, useSpeechState } from '../hooks/useAudioState';
import { NarrationBar } from './NarrationBar';

export const PanchaTatvaLogo: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const dots = [
    { c: 'fill-earth', a: -90 },
    { c: 'fill-fire', a: -18 },
    { c: 'fill-space', a: 54 },
    { c: 'fill-air', a: 126 },
    { c: 'fill-water', a: 198 },
  ];

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle
        cx="20"
        cy="20"
        r="13"
        className="fill-none stroke-gold"
        strokeWidth="1"
      />
      {dots.map((d, i) => {
        const rad = (d.a * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={20 + 13 * Math.cos(rad)}
            cy={20 + 13 * Math.sin(rad)}
            r="4.2"
            className={d.c}
          />
        );
      })}
      <circle cx="20" cy="20" r="2.5" className="fill-gold" />
    </svg>
  );
};

interface LayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

const NAV_LINKS = [
  { to: '/compare', label: 'Compare' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/library', label: 'Library' },
  { to: '/references', label: 'References' },
  { to: '/about', label: 'About' },
];

export const Layout: React.FC<LayoutProps> = ({
  currentPath,
  navigate,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ambianceOpen, setAmbianceOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const ambianceRef = useRef<HTMLDivElement>(null);

  const shareableUrl = `${window.location.origin}/pancha-tatva${
    currentPath === '/' ? '' : currentPath
  }`;

  const handleCopyUrl = () => {
    soundEngine.playUiTap(640);
    navigator.clipboard.writeText(shareableUrl).catch(() => {});
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const sound = useSoundState();
  const speech = useSpeechState();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const dark = !saved || saved === 'dark';
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ambianceRef.current &&
        !ambianceRef.current.contains(e.target as Node)
      ) {
        setAmbianceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    soundEngine.playUiTap(640);
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const handleGlobalSpeak = () => {
    soundEngine.playUiTap(528);
    if (speech.isSpeaking) {
      speechEngine.stop();
    } else {
      speechEngine.speakCurrentPageFromDOM();
    }
  };

  const activeSoundscapeMeta =
    SOUNDSCAPES.find((s) => s.id === sound.currentSoundscape) || SOUNDSCAPES[0];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass border-x-0 border-t-0">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <a
            href="/pancha-tatva"
            onClick={(e) => {
              e.preventDefault();
              soundEngine.playUiTap(432);
              setMobileMenuOpen(false);
              navigate('/');
            }}
            className="flex items-center gap-2.5 shrink-0"
          >
            <PanchaTatvaLogo className="h-8 w-8 shrink-0" />
            <div className="flex flex-col">
              <span className="font-display text-xl font-semibold tracking-[0.2em] leading-none whitespace-nowrap">
                PANCHA TATVA
              </span>
              <span className="text-[10px] tracking-[0.18em] text-muted-foreground leading-none mt-1 hidden sm:inline">
                pancha-tatva.sacred
              </span>
            </div>
          </a>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground whitespace-nowrap"
              >
                Elements <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 top-full w-64 rounded-xl border bg-popover p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                {ELEMENTS.map((el) => (
                  <a
                    key={el.slug}
                    href={`/elements/${el.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      soundEngine.playElementChime(el.slug);
                      navigate(`/elements/${el.slug}`);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${ELEMENT_STYLES[el.slug].bg}`}
                    />
                    <span className="text-sm">
                      {el.sanskrit}{' '}
                      <span className="text-muted-foreground">
                        — {el.english}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground whitespace-nowrap"
              >
                Traditions <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 top-full w-72 rounded-xl border bg-popover p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                {TOPICS.map((topic) => (
                  <a
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      soundEngine.playUiTap(528);
                      navigate(`/topics/${topic.slug}`);
                    }}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  >
                    {topic.title}
                  </a>
                ))}
              </div>
            </div>

            {NAV_LINKS.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => {
                  e.preventDefault();
                  soundEngine.playUiTap(528);
                  navigate(link.to);
                }}
                className={`rounded-md px-3 py-2 text-sm transition-colors whitespace-nowrap ${
                  currentPath === link.to
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Audio Controls & Utilities */}
          <div className="ml-auto flex items-center gap-1.5 lg:ml-2">
            {/* Ambiance Soundscape Mixer Dropdown */}
            <div className="relative" ref={ambianceRef}>
              <button
                type="button"
                onClick={() => setAmbianceOpen(!ambianceOpen)}
                aria-label="Sacred Ambiance Soundscapes"
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition whitespace-nowrap ${
                  sound.isPlaying
                    ? 'border-primary/60 bg-primary/15 text-primary shadow-sm'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Headphones className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {sound.isPlaying ? activeSoundscapeMeta.label.split(' · ')[0] : 'Ambiance'}
                </span>
                {sound.isPlaying && (
                  <span
                    className="flex items-end gap-0.5 h-3"
                    aria-hidden="true"
                  >
                    <span className="w-0.5 h-full bg-primary rounded-full animate-soundbar-1" />
                    <span className="w-0.5 h-full bg-primary rounded-full animate-soundbar-2" />
                    <span className="w-0.5 h-full bg-primary rounded-full animate-soundbar-3" />
                  </span>
                )}
              </button>

              {ambianceOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border bg-popover p-4 shadow-2xl z-50">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="text-sm font-semibold">Sacred Ambiance</p>
                      <p className="text-xs text-muted-foreground">
                        Elemental soundscapes & resonance
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => soundEngine.togglePlay()}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                        sound.isPlaying
                          ? 'bg-primary text-primary-foreground'
                          : 'border hover:border-primary text-foreground'
                      }`}
                    >
                      {sound.isPlaying ? 'Playing · Pause' : 'Start Ambiance'}
                    </button>
                  </div>

                  <div className="mt-3 space-y-1.5 max-h-60 overflow-y-auto pr-1">
                    {SOUNDSCAPES.map((sc) => {
                      const active = sound.currentSoundscape === sc.id;
                      return (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => {
                            if (active && sound.isPlaying) {
                              soundEngine.stop();
                            } else {
                              soundEngine.start(sc.id as SoundscapeId);
                            }
                          }}
                          className={`w-full flex items-center justify-between rounded-xl border p-2.5 text-left transition ${
                            active
                              ? 'border-primary bg-primary/10'
                              : 'border-transparent hover:bg-muted'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-display text-sm font-semibold ${sc.colorClass}`}
                              >
                                {sc.sanskrit}
                              </span>
                              <span className="text-xs font-semibold">
                                {sc.label}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                              {sc.subtitle}
                            </p>
                          </div>
                          <span className="text-xs font-medium text-primary shrink-0">
                            {active && sound.isPlaying ? 'Active' : 'Play'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 border-t pt-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          soundEngine.setVolume(sound.volume > 0 ? 0 : 0.45)
                        }
                        aria-label="Mute or unmute ambiance"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {sound.volume === 0 ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.02}
                        value={sound.volume}
                        onChange={(e) =>
                          soundEngine.setVolume(parseFloat(e.target.value))
                        }
                        aria-label="Ambiance volume"
                        className="w-full accent-[var(--primary)] cursor-pointer"
                      />
                      <span className="text-xs text-muted-foreground tabular-nums w-9 text-right">
                        {Math.round(sound.volume * 100)}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
                        <input
                          type="checkbox"
                          checked={sound.autoSyncElement}
                          onChange={(e) =>
                            soundEngine.setAutoSyncElement(e.target.checked)
                          }
                          className="rounded accent-[var(--primary)]"
                        />
                        Auto-sync sound with Element
                      </label>

                      <button
                        type="button"
                        onClick={() => soundEngine.strikeHarmonicBell(432, 0.18, 4.5)}
                        className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                      >
                        <Bell className="h-3 w-3" />
                        Chime Bowl
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Speak / Read Website Out Aloud Button */}
            <button
              type="button"
              onClick={handleGlobalSpeak}
              aria-label={
                speech.isSpeaking
                  ? 'Stop reading website aloud'
                  : 'Read website out aloud'
              }
              title={
                speech.isSpeaking
                  ? 'Stop reading website aloud'
                  : 'Speak — Read current page out aloud'
              }
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition whitespace-nowrap ${
                speech.isSpeaking
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {speech.isSpeaking ? (
                <>
                  <Square className="h-3 w-3 fill-current" />
                  <span>Stop Speak</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Speak</span>
                </>
              )}
            </button>

            {/* Copy / Share Pancha Tatva Web URL Button */}
            <button
              type="button"
              onClick={handleCopyUrl}
              title={shareableUrl}
              aria-label="Copy Pancha Tatva Website URL"
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition whitespace-nowrap ${
                copiedUrl
                  ? 'border-success bg-success/15 text-foreground'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {copiedUrl ? (
                <>
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span>URL Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Copy URL</span>
                </>
              )}
            </button>

            <button
              type="button"
              aria-label="Search"
              onClick={() => {
                soundEngine.playUiTap(528);
                setSearchOpen(true);
              }}
              className="rounded-md p-2 hover:bg-muted"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="rounded-md p-2 hover:bg-muted"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 hover:bg-muted lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="max-h-[80vh] overflow-y-auto border-t bg-background px-4 pb-6 lg:hidden">
            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
              Elements
            </p>
            {ELEMENTS.map((el) => (
              <a
                key={el.slug}
                href={`/elements/${el.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  soundEngine.playElementChime(el.slug);
                  navigate(`/elements/${el.slug}`);
                }}
                className="flex items-center gap-3 py-2"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${ELEMENT_STYLES[el.slug].bg}`}
                />{' '}
                {el.sanskrit} — {el.english}
              </a>
            ))}

            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
              Traditions
            </p>
            {TOPICS.map((topic) => (
              <a
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  navigate(`/topics/${topic.slug}`);
                }}
                className="block py-2"
              >
                {topic.title}
              </a>
            ))}

            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
              Explore
            </p>
            {NAV_LINKS.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  navigate(link.to);
                }}
                className="block py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigate('/contact');
              }}
              className="block py-2"
            >
              Contact
            </a>
          </div>
        )}

        {searchOpen && (
          <SearchModal
            onClose={() => setSearchOpen(false)}
            navigate={(to) => {
              setSearchOpen(false);
              navigate(to);
            }}
          />
        )}
      </header>

      <main className="flex-1">{children}</main>

      <NarrationBar />

      <footer className="mt-24 border-t">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <PanchaTatvaLogo className="h-8 w-8" />
              <span className="font-display text-xl tracking-[0.2em]">
                PANCHA TATVA
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Ancient Wisdom. Modern Knowledge. Five Elements. One Universe.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Web Sanctuary: <span className="font-mono text-primary">pancha-tatva</span> · Equipped with elemental Web Audio ambiance & voice narration.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              Elements
            </p>
            {ELEMENTS.map((el) => (
              <a
                key={el.slug}
                href={`/elements/${el.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  soundEngine.playElementChime(el.slug);
                  navigate(`/elements/${el.slug}`);
                }}
                className="block py-1 text-sm hover:text-primary"
              >
                {el.sanskrit}
              </a>
            ))}
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              Research
            </p>
            <a
              href="/library"
              onClick={(e) => {
                e.preventDefault();
                navigate('/library');
              }}
              className="block py-1 text-sm hover:text-primary"
            >
              Library
            </a>
            <a
              href="/references"
              onClick={(e) => {
                e.preventDefault();
                navigate('/references');
              }}
              className="block py-1 text-sm hover:text-primary"
            >
              References
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigate('/about');
              }}
              className="block py-1 text-sm hover:text-primary"
            >
              About the project
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
              className="block py-1 text-sm hover:text-primary"
            >
              Contact / Feedback
            </a>
          </div>
        </div>
        <p className="pb-8 text-center text-xs text-muted-foreground">
          Pancha Tatva · An educational research project · Images are AI-generated illustrations
        </p>
      </footer>
    </div>
  );
};

interface SearchModalProps {
  onClose: () => void;
  navigate: (to: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, navigate }) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const list: {
      kind: 'el' | 'topic';
      slug: string;
      title: string;
      snippet: string;
    }[] = [];

    for (const el of ELEMENTS) {
      for (const sec of el.sections) {
        const joined = sec.body.join(' ');
        const idx = joined.toLowerCase().indexOf(q);
        if (idx >= 0 || sec.title.toLowerCase().includes(q)) {
          list.push({
            kind: 'el',
            slug: el.slug,
            title: `${el.sanskrit} · ${sec.title}`,
            snippet: joined.slice(Math.max(0, idx - 40), idx + 100),
          });
        }
      }
    }

    for (const topic of TOPICS) {
      for (const sec of topic.sections) {
        const idx = sec.body.toLowerCase().indexOf(q);
        if (idx >= 0 || sec.title.toLowerCase().includes(q)) {
          list.push({
            kind: 'topic',
            slug: topic.slug,
            title: `${topic.title} · ${sec.title}`,
            snippet: sec.body.slice(Math.max(0, idx - 40), idx + 100),
          });
        }
      }
    }

    return list.slice(0, 20);
  }, [query]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-background/80 p-4 pt-20 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border bg-popover p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b pb-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Agni, Vastu, chakra, dosha…"
            className="w-full bg-transparent outline-none"
          />
          <button type="button" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 max-h-[60vh] overflow-y-auto">
          {query.length >= 2 && results.length === 0 && (
            <p className="p-3 text-sm text-muted-foreground">No results.</p>
          )}
          {results.map((r, i) => (
            <a
              key={i}
              href={
                r.kind === 'el' ? `/elements/${r.slug}` : `/topics/${r.slug}`
              }
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  r.kind === 'el' ? `/elements/${r.slug}` : `/topics/${r.slug}`
                );
              }}
              className="block rounded-lg p-3 hover:bg-muted"
            >
              <p className="text-sm font-semibold">{r.title}</p>
              <p className="text-xs text-muted-foreground">…{r.snippet}…</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
