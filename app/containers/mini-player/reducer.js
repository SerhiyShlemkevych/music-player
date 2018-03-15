import {
  SET_TRACK,
  RESUME,
  PAUSE,
  UPDATE_PROGRESS_BAR
} from './constants';

const secondsToText = (s) => `${
  Math.round(s / 60) || 0
  }:${
  Math.round(s % 60) > 9
    ? Math.round(s % 60) || '00'
    : '0' + (Math.round(s % 60) || 0)
  }`;

export default function (state = {
  currentProgress: 0,
  imageUrl: '/api/media/noimage/image',
  backgroundColor: [0, 0, 0]
}, action) {
  switch (action.type) {
    case SET_TRACK:
      return {
        ...state,
        trackUrl: `/api/media/${action.track.id}`,
        imageUrl: `/api/media/${action.track.id}/image`,
        title: action.track.title,
        artist: action.track.artist.join(),
        duration: action.track.duration,
        durationText: secondsToText(action.track.duration),
        currentProgress: 0,
        currentProgressText: '0:00',
        backgroundColor: action.color
      };
    case PAUSE:
      return {
        ...state,
        shouldPlay: false
      };
    case RESUME:
      return {
        ...state,
        shouldPlay: true
      };
    case UPDATE_PROGRESS_BAR:
      return {
        ...state,
        currentProgress: action.payload,
        currentProgressText: secondsToText(action.payload)
      }
    default: return state;
  }
};
