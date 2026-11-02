import React from 'react';
import { Volume2, Square, Pause, Play } from 'lucide-react';
import { speechEngine, SpeechSegment } from '../services/speechEngine';
import { useSpeechState } from '../hooks/useAudioState';
import { soundEngine } from '../services/soundEngine';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  segments?: SpeechSegment[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  children,
  segments,
}) => {
  const speech = useSpeechState();
  const isThisPageSpeaking = speech.isSpeaking && speech.pageTitle === title;

  const handleSpeakClick = () => {
    soundEngine.playUiTap(528);
    if (isThisPageSpeaking) {
      speechEngine.togglePause();
    } else if (segments && segments.length > 0) {
      speechEngine.speakSegments(segments, title, 0);
    } else {
      speechEngine.speakCurrentPageFromDOM(title);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 pb-10 pt-16 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{title}</h1>
      {children && (
        <div className="mx-auto mt-4 max-w-2xl text-muted-foreground">{children}</div>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleSpeakClick}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
            isThisPageSpeaking
              ? 'border-primary bg-primary text-primary-foreground shadow-md'
              : 'glass hover:border-primary hover:text-primary'
          }`}
        >
          {isThisPageSpeaking ? (
            speech.isPaused ? (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                Resume Reading Page
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 fill-current" />
                Pause Reading ({speech.currentIndex + 1}/{speech.totalSegments})
              </>
            )
          ) : (
            <>
              <Volume2 className="h-3.5 w-3.5" />
              Speak · Read Page Aloud
            </>
          )}
        </button>
        {isThisPageSpeaking && (
          <button
            type="button"
            onClick={() => speechEngine.stop()}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium text-muted-foreground hover:border-destructive hover:text-destructive"
          >
            <Square className="h-3 w-3 fill-current" />
            Stop
          </button>
        )}
      </div>
    </section>
  );
};
