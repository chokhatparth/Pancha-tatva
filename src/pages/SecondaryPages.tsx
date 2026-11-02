import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import {
  ELEMENTS,
  ELEMENT_STYLES,
  TOPICS,
  QUIZ_QUESTIONS,
  ABOUT_SECTIONS,
  PRIMARY_SOURCES,
  SECONDARY_SCHOLARSHIP,
  ElementSlug,
  ElementAttributes,
} from '../data/panchaTatvaData';
import { PageHeader } from '../components/PageHeader';
import { soundEngine } from '../services/soundEngine';
import { speechEngine, SpeechSegment } from '../services/speechEngine';

const ATTRIBUTE_LABELS: Record<keyof ElementAttributes, string> = {
  tanmatra: 'Subtle essence',
  sense: 'Sense organ',
  organ: 'Organ of action',
  action: 'Action',
  chakra: 'Chakra',
  bija: 'Bija mantra',
  dosha: 'Dosha',
  shape: 'Yantra symbol',
  quality: 'Qualities',
  state: 'Modern analogy',
};

export const ComparePage: React.FC<{ navigate: (to: string) => void }> = ({
  navigate,
}) => {
  const [leftSlug, setLeftSlug] = useState<ElementSlug>('earth');
  const [rightSlug, setRightSlug] = useState<ElementSlug>('space');

  const leftEl = ELEMENTS.find((e) => e.slug === leftSlug) || ELEMENTS[0];
  const rightEl = ELEMENTS.find((e) => e.slug === rightSlug) || ELEMENTS[4];

  const attrKeys = Object.keys(ATTRIBUTE_LABELS) as (keyof ElementAttributes)[];

  const segments: SpeechSegment[] = [
    {
      id: 'compare-pair',
      title: `Comparing ${leftEl.sanskrit} and ${rightEl.sanskrit}`,
      text:
        `Comparing ${leftEl.sanskrit} (${leftEl.english}) and ${rightEl.sanskrit} (${rightEl.english}). ` +
        attrKeys
          .map(
            (k) =>
              `${ATTRIBUTE_LABELS[k]}: ${leftEl.sanskrit} is ${leftEl.attributes[k]}, while ${rightEl.sanskrit} is ${rightEl.attributes[k]}.`
          )
          .join(' '),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Relationship explorer"
        title="Compare the Elements"
        segments={segments}
      />

      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { v: leftSlug, set: setLeftSlug },
            { v: rightSlug, set: setRightSlug },
          ].map((col, cIdx) => (
            <div key={cIdx} className="flex flex-wrap gap-2">
              {ELEMENTS.map((el) => (
                <button
                  key={el.slug}
                  type="button"
                  onClick={() => {
                    soundEngine.playElementChime(el.slug);
                    col.set(el.slug);
                  }}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    col.v === el.slug
                      ? `${ELEMENT_STYLES[el.slug].bg} text-primary-foreground`
                      : 'hover:border-primary'
                  }`}
                >
                  {el.sanskrit.split(' ')[0]}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-left">Attribute</th>
                <th className={`p-3 text-left ${ELEMENT_STYLES[leftSlug].text}`}>
                  {leftEl.sanskrit}
                </th>
                <th
                  className={`p-3 text-left ${ELEMENT_STYLES[rightSlug].text}`}
                >
                  {rightEl.sanskrit}
                </th>
              </tr>
            </thead>
            <tbody>
              {attrKeys.map((key) => (
                <tr key={key} className="border-t">
                  <td className="p-3 text-muted-foreground">
                    {ATTRIBUTE_LABELS[key]}
                  </td>
                  <td className="p-3">{leftEl.attributes[key]}</td>
                  <td className="p-3">{rightEl.attributes[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-16 text-3xl font-semibold">All five at a glance</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-left">Attribute</th>
                {ELEMENTS.map((el) => (
                  <th
                    key={el.slug}
                    className={`p-3 text-left ${ELEMENT_STYLES[el.slug].text}`}
                  >
                    <a
                      href={`/elements/${el.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        soundEngine.playElementChime(el.slug);
                        navigate(`/elements/${el.slug}`);
                      }}
                      className="hover:underline"
                    >
                      {el.english}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attrKeys.map((key) => (
                <tr key={key} className="border-t">
                  <td className="p-3 text-muted-foreground">
                    {ATTRIBUTE_LABELS[key]}
                  </td>
                  {ELEMENTS.map((el) => (
                    <td key={el.slug} className="p-3">
                      {el.attributes[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const LibraryPage: React.FC<{ navigate: (to: string) => void }> = ({
  navigate,
}) => {
  const segments: SpeechSegment[] = [
    {
      id: 'lib-elements',
      title: 'Element Studies',
      text:
        'Element studies in the Pancha Tatva Research Library: ' +
        ELEMENTS.map((e) => `${e.sanskrit} (${e.english}): ${e.tagline}`).join(
          ' '
        ),
    },
    {
      id: 'lib-chapters',
      title: 'Thematic Chapters',
      text:
        'Thematic chapters: ' +
        TOPICS.map(
          (t, i) => `Chapter ${i + 1}, ${t.title}: ${t.summary}`
        ).join(' '),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Research"
        title="Research Library"
        segments={segments}
      >
        Read the project chapter by chapter.
      </PageHeader>

      <div className="mx-auto max-w-5xl space-y-10 px-4">
        <div>
          <h2 className="text-2xl font-semibold">Element studies</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {ELEMENTS.map((el) => (
              <a
                key={el.slug}
                href={`/elements/${el.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  soundEngine.playElementChime(el.slug);
                  navigate(`/elements/${el.slug}`);
                }}
                className="flex items-center gap-4 rounded-xl border p-4 hover:border-primary"
              >
                <img
                  src={el.images[0].src}
                  alt={el.images[0].alt}
                  loading="lazy"
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div>
                  <p className={`text-sm ${ELEMENT_STYLES[el.slug].text}`}>
                    {el.english}
                  </p>
                  <p className="font-display text-xl">{el.sanskrit}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Thematic chapters</h2>
          <ol className="mt-4 space-y-2">
            {TOPICS.map((topic, idx) => (
              <li key={topic.slug}>
                <a
                  href={`/topics/${topic.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    soundEngine.playUiTap(528);
                    navigate(`/topics/${topic.slug}`);
                  }}
                  className="flex gap-4 rounded-xl border p-4 hover:border-primary"
                >
                  <span className="font-display text-2xl text-primary">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="font-semibold">{topic.title}</span>
                    <br />
                    <span className="text-sm text-muted-foreground">
                      {topic.summary}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export const QuizPage: React.FC = () => {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const finished = qIdx >= QUIZ_QUESTIONS.length;
  const current = QUIZ_QUESTIONS[Math.min(qIdx, QUIZ_QUESTIONS.length - 1)];

  const handleChoose = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
    if (optIdx === current.answer) {
      soundEngine.strikeHarmonicBell(528, 0.16, 2.5);
      setScore((s) => s + 1);
    } else {
      soundEngine.strikeHarmonicBell(220, 0.1, 1.2);
    }
  };

  const speakCurrentQuestion = () => {
    const text = `Question ${qIdx + 1} of ${QUIZ_QUESTIONS.length}. ${
      current.q
    } Options: ${current.options
      .map((o, i) => `${i + 1}, ${o}`)
      .join('. ')}. ${selected !== null ? current.explain : ''}`;
    speechEngine.speakSingleSection(
      `quiz-q-${qIdx}`,
      `Question ${qIdx + 1}`,
      text
    );
  };

  return (
    <div>
      <PageHeader eyebrow="Interactive" title="Knowledge Quiz">
        Ten questions across scripture, Ayurveda, yoga and architecture.
      </PageHeader>

      <div className="mx-auto max-w-2xl px-4">
        {finished ? (
          <div className="rounded-2xl border bg-card p-8 text-center">
            <p className="font-display text-6xl text-gradient">
              {score} / {QUIZ_QUESTIONS.length}
            </p>
            <p className="mt-2 text-muted-foreground">
              {score >= 8
                ? 'Excellent — a true scholar of the tattvas.'
                : score >= 5
                ? 'Good grounding. Revisit a few element pages.'
                : 'Keep exploring — the elements await.'}
            </p>
            <button
              type="button"
              onClick={() => {
                soundEngine.playUiTap(528);
                setQIdx(0);
                setScore(0);
                setSelected(null);
              }}
              className="mt-6 rounded-full bg-primary px-6 py-2 text-primary-foreground"
            >
              Retake quiz
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border bg-card p-6">
            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-elements"
                style={{ width: `${(qIdx / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Question {qIdx + 1} of {QUIZ_QUESTIONS.length} · Score {score}
              </p>
              <button
                type="button"
                onClick={speakCurrentQuestion}
                className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Volume2 className="h-3.5 w-3.5" />
                Read Question
              </button>
            </div>
            <h2 className="mt-2 text-2xl font-semibold">{current.q}</h2>
            <div className="mt-5 grid gap-2">
              {current.options.map((opt, idx) => {
                const stateClass =
                  selected === null
                    ? 'border-border hover:border-primary'
                    : idx === current.answer
                    ? 'border-success bg-success/10'
                    : idx === selected
                    ? 'border-destructive bg-destructive/10'
                    : 'border-border opacity-60';
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChoose(idx)}
                    className={`rounded-xl border p-3 text-left transition ${stateClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {selected !== null && (
              <>
                <p className="mt-4 text-sm text-muted-foreground">
                  {current.explain}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playUiTap(528);
                    setQIdx(qIdx + 1);
                    setSelected(null);
                  }}
                  className="mt-4 rounded-full bg-primary px-6 py-2 text-primary-foreground"
                >
                  {qIdx + 1 === QUIZ_QUESTIONS.length ? 'See result' : 'Next'}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const ReferencesPage: React.FC = () => {
  const segments: SpeechSegment[] = [
    {
      id: 'refs-primary',
      title: 'Primary Sources',
      text: 'Primary sources: ' + PRIMARY_SOURCES.join(' '),
    },
    {
      id: 'refs-secondary',
      title: 'Secondary Scholarship',
      text: 'Secondary scholarship: ' + SECONDARY_SCHOLARSHIP.join(' '),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Bibliography"
        title="References"
        segments={segments}
      />
      <div className="mx-auto max-w-3xl space-y-10 px-4">
        {(
          [
            ['Primary sources', PRIMARY_SOURCES],
            ['Secondary scholarship', SECONDARY_SCHOLARSHIP],
          ] as const
        ).map(([heading, items]) => (
          <section key={heading}>
            <h2 className="text-2xl font-semibold">{heading}</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-muted-foreground">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        ))}
        <p className="text-sm text-muted-foreground">
          Image note: all photographs on this site are AI-generated
          illustrations created for educational use.
        </p>
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  const segments: SpeechSegment[] = ABOUT_SECTIONS.map(
    ([heading, body], idx) => ({
      id: `about-${idx}`,
      title: heading,
      text: `${heading}. ${body}`,
    })
  );

  return (
    <div>
      <PageHeader
        eyebrow="The project"
        title="About the Research"
        segments={segments}
      />
      <div className="mx-auto max-w-3xl space-y-4 px-4">
        {ABOUT_SECTIONS.map(([heading, body], idx) => (
          <section key={heading} className="rounded-2xl border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-semibold">{heading}</h2>
              <button
                type="button"
                onClick={() =>
                  speechEngine.speakSegments(
                    segments,
                    'About the Research',
                    idx
                  )
                }
                className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary shrink-0"
              >
                <Volume2 className="h-3.5 w-3.5" />
                Speak
              </button>
            </div>
            <p className="mt-2 leading-7 text-muted-foreground">{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <PageHeader eyebrow="Get in touch" title="Contact & Feedback" />
      <div className="mx-auto max-w-xl px-4">
        {submitted ? (
          <p className="rounded-2xl border bg-card p-8 text-center">
            Thank you — your feedback has been noted.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              soundEngine.strikeHarmonicBell(528, 0.16, 3.0);
              setSubmitted(true);
            }}
            className="space-y-4 rounded-2xl border bg-card p-6"
          >
            <input
              required
              placeholder="Your name"
              className="w-full rounded-lg border bg-background p-3"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border bg-background p-3"
            />
            <textarea
              required
              rows={5}
              placeholder="Your message"
              className="w-full rounded-lg border bg-background p-3"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-elements py-3 font-semibold text-primary-foreground"
            >
              Send feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC<{ navigate: (to: string) => void }> = ({
  navigate,
}) => (
  <div className="flex min-h-[60vh] items-center justify-center px-4">
    <div className="max-w-md text-center">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This page has dissolved back into Akasha.
      </p>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Go home
      </button>
    </div>
  </div>
);
