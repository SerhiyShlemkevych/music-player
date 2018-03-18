const secondsToText = s => `${
    Math.round(s / 60) || 0
    }:${
    Math.round(s % 60) > 9
        ? Math.round(s % 60) || '00'
        : '0' + (Math.round(s % 60) || 0)
    }`;

export const getTrackList = state => state.nowPlaying.trackList;
export const getCurrentTrack = state => ({
    ...state.nowPlaying.track,
    url: state.nowPlaying.track.id
        ? `/api/media/${state.nowPlaying.track.id}`
        : null,
    imageUrl: `/api/media/${state.nowPlaying.track.id}/image`
});
export const getIsNowPlaying = state => state.nowPlaying.isNowPlaying;
export const getDuration = state => secondsToText(state.nowPlaying.duration);
export const getProgress = state => state.nowPlaying.progress;
export const getProgressText = state => secondsToText(state.nowPlaying.progress);
export const getIsVisible = state => state.nowPlaying.isVisible;