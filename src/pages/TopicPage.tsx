import React from 'react';
import { Volume2 } from 'lucide-react';
import { TOPICS, getTopicBySlug } from '../data/panchaTatvaData';
import { PageHeader } from '../components/PageHeader';
import { speechEngine, SpeechSegment } from '../services/speechEngine';
import { useSpeechState } from '../hooks/useAudioState';
import { soundEngine } from '../services/soundEngine';

interface TopicPageProps {
  slug: string;
  navigate: (to: string) => void;
}

export const TopicPage: React.FC<TopicPageProps> = ({ slug, navigate }) => {
  const topic = getTopicBySlug(slug);
  const speech = useSpeechState();

  if (!topic) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold">Chapter not found</h1>
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

  const idx = TOPICS.findIndex((t) => t.slug === slug);
  const nextTopic = TOPICS[(idx + 1) % TOPICS.length];

  const segments: SpeechSegment[] = [
    {
      id: `topic-intro-${topic.slug}`,
      title: topic.title,
      text: `${topic.title}. ${topic.summary}`,
    },
    ...topic.sections.map((sec, sIdx) => ({
      id: `topic-sec-${sIdx}`,
      title: sec.title,
      text: `${sec.title}. ${sec.body}`,
    })),
  ];

  const isTopicSpeaking =
    speech.isSpeaking && speech.pageTitle === topic.title;

  return (
    <div>
      <PageHeader
        eyebrow={`Chapter ${idx + 1} of ${TOPICS.length}`}
        title={topic.title}
        segments={segments}
      >
        {topic.summary}
      </PageHeader>

      <div className="mx-auto max-w-3xl space-y-6 px-4">
        {topic.sections.map((sec, sIdx) => {
          const isSpeakingThis =
            isTopicSpeaking &&
            speech.currentSegment?.id === `topic-sec-${sIdx}`;

          return (
            <section
              key={sec.title}
              className={`rounded-2xl border bg-card p-6 transition ${
                isSpeakingThis ? 'border-primary ring-1 ring-primary' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-semibold">{sec.title}</h2>
                <button
                  type="button"
                  onClick={() =>
                    speechEngine.speakSegments(segments, topic.title, sIdx + 1)
                  }
                  title={`Read "${sec.title}" aloud`}
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary shrink-0"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  Speak
                </button>
              </div>
              <p className="mt-2 leading-7 text-muted-foreground">{sec.body}</p>
            </section>
          );
        })}

        <a
          href={`/topics/${nextTopic.slug}`}
          onClick={(e) => {
            e.preventDefault();
            soundEngine.playUiTap(528);
            navigate(`/topics/${nextTopic.slug}`);
          }}
          className="block rounded-2xl border p-6 hover:border-primary"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Next chapter
          </p>
          <p className="font-display text-2xl">{nextTopic.title} →</p>
        </a>
      </div>
    </div>
  );
};
