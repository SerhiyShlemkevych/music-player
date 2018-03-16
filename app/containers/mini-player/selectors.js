
const secondsToText = (s) => `${
    Math.round(s / 60) || 0
    }:${
    Math.round(s % 60) > 9
        ? Math.round(s % 60) || '00'
        : '0' + (Math.round(s % 60) || 0)
    }`;

export const getTrack = state => ({
    ...state.miniPlayer.track,
    url: state.miniPlayer.track.id
    ? `/api/media/${state.miniPlayer.track.id}`
    : null,
    imageUrl: `/api/media/${state.miniPlayer.track.id}/image`,
    color: state.miniPlayer.color
});
export const getShouldPlay = state => state.miniPlayer.shouldPlay;
export const getDuration = state => secondsToText(state.miniPlayer.duration);
export const getProgress = state => state.miniPlayer.progress;
export const getProgressText = state => secondsToText(state.miniPlayer.progress);