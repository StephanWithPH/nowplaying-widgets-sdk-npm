import { create } from "zustand";

interface NowPlayingData {
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  position: number; // current playback position in seconds
}

interface NowPlayingDataWrapper {
  detail: NowPlayingData | null;
  isPlaying: boolean;
}

interface EventState {
  data: NowPlayingDataWrapper; // Holds the received `NowPlayingData`
  resetData: () => void;
}

const useNowPlayingData = create<EventState>((set) => {
  const handleCustomEvent = (event: CustomEvent<NowPlayingData>) => {
    set({
      data: {
        detail: event.detail,
        isPlaying: true,
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (typeof window !== "undefined" && !window.__EVENT_LISTENER_ADDED__) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.__EVENT_LISTENER_ADDED__ = true;
    window.addEventListener("customEvent", handleCustomEvent as EventListener);
  }

  return {
    data: {
      detail: null,
      isPlaying: false,
    },
    resetData: () =>
      set({
        data: {
          detail: null,
          isPlaying: false,
        },
      }),
  };
});

export default useNowPlayingData;
