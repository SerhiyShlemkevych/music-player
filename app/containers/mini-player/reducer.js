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
  imageUrl: '/api/media/noimage/image'
 }, action) {
  switch (action.type) {
    case SET_TRACK:
      return {
        ...state,
        trackUrl: `/api/media/${action.payload.id}`,
        imageUrl: `/api/media/${action.payload.id}/image`,
        title: action.payload.title,
        artist: action.payload.artist.join(),
        duration: action.payload.duration,
        durationText: secondsToText(action.payload.duration),
        currentProgress: 0,
        currentProgressText: '0:00'
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
