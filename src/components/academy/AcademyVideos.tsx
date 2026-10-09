"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";

type Video = { src: string; poster: string; width: number; height: number; title: string; description: string };
/** auto: plays whenever it is on screen; play: started by the visitor; pause: stopped by the visitor */
type Intent = "auto" | "play" | "pause";

/**
 * Silent training clips as media tiles, not embedded players: muted, looped, inline, no controls.
 * A clip plays while it is on screen (IntersectionObserver), so off-screen clips cost nothing.
 * A click (or Enter/Space on the focused tile) pauses it, another click resumes it, and a paused
 * clip stays paused when it comes back into view. Reduced motion: nothing starts on its own.
 */
export function AcademyVideos({ videos }: { videos: readonly Video[] }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const intents = useRef<Intent[]>(videos.map(() => "auto"));
  const visible = useRef<boolean[]>(videos.map(() => false));
  const autoplay = useRef(false);
  const [intent, setIntentState] = useState<Intent[]>(() => videos.map(() => "auto"));
  const [playing, setPlaying] = useState<boolean[]>(() => videos.map(() => false));
  const [mode, setMode] = useState<"static" | "auto" | "manual">("static");

  const setIntent = (i: number, value: Intent) => {
    intents.current[i] = value;
    setIntentState((old) => (old[i] === value ? old : old.map((v, k) => (k === i ? value : v))));
  };
  const mark = (i: number, value: boolean) => setPlaying((old) => (old[i] === value ? old : old.map((v, k) => (k === i ? value : v))));

  const play = (i: number, video: HTMLVideoElement) =>
    video.play().catch((error: unknown) => {
      // autoplay refused (e.g. power saving): show the tile as paused so a click starts it
      if (error instanceof DOMException && error.name === "NotAllowedError") setIntent(i, "pause");
    });

  const sync = (i: number) => {
    const video = refs.current[i];
    if (!video) return;
    const wanted = intents.current[i] === "play" || (intents.current[i] === "auto" && autoplay.current);
    if (wanted && visible.current[i]) {
      if (video.paused) play(i, video);
    } else if (!video.paused) video.pause();
  };

  useEffect(() => {
    autoplay.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(autoplay.current ? "auto" : "manual");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = refs.current.indexOf(entry.target as HTMLVideoElement);
          if (i < 0) continue;
          visible.current[i] = entry.isIntersecting && entry.intersectionRatio >= 0.35;
          sync(i);
        }
      },
      { threshold: [0, 0.35, 0.7] }
    );
    refs.current.forEach((video) => {
      if (!video) return;
      video.muted = true; // the property, not only the attribute, is what autoplay policies check
      observer.observe(video);
    });
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => {
    const video = refs.current[i];
    if (!video) return;
    if (video.paused) {
      setIntent(i, "play");
      play(i, video);
    } else {
      setIntent(i, "pause");
      video.pause();
    }
  };

  return (
    <ul className="academy-videos" aria-label="Filmy ze szkoleń CUTZ ACADEMY" data-mode={mode}>
      {videos.map((video, index) => {
        const on = playing[index];
        // paused: stopped by the visitor (or never started under reduced motion) -> show the play mark
        const stopped = !on && (intent[index] === "pause" || (intent[index] === "auto" && mode === "manual"));
        const action = on ? "Zatrzymaj" : intent[index] === "pause" ? "Wznów" : "Odtwórz";
        return (
          <li className="academy-video" data-reveal="fade" data-state={on ? "playing" : stopped ? "paused" : "waiting"} key={video.src}>
            <figure>
              <div className="academy-video-frame">
                <video
                  ref={(node) => {
                    refs.current[index] = node;
                  }}
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={video.poster}
                  width={video.width}
                  height={video.height}
                  disablePictureInPicture
                  disableRemotePlayback
                  aria-hidden="true"
                  tabIndex={-1}
                  onPlay={() => mark(index, true)}
                  onPause={() => mark(index, false)}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                {mode !== "static" && (
                  <button
                    type="button"
                    className="academy-video-toggle"
                    aria-label={`${action} film: ${video.title}`}
                    aria-describedby={`academy-video-caption-${index}`}
                    onClick={() => toggle(index)}
                  >
                    <span className="academy-video-state" aria-hidden="true">
                      {on ? <Pause size={12} weight="fill" /> : <Play size={12} weight="fill" />}
                    </span>
                    <span className="academy-video-play" aria-hidden="true">
                      <Play size={22} weight="fill" />
                    </span>
                    <span className="academy-video-hint" aria-hidden="true">
                      {on ? "Kliknij, aby zatrzymać" : intent[index] === "pause" ? "Kliknij, aby wznowić" : "Kliknij, aby odtworzyć"}
                    </span>
                  </button>
                )}
              </div>
              <figcaption id={`academy-video-caption-${index}`}>
                <h3>{video.title}</h3>
                <p className="text-steel">{video.description}</p>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
