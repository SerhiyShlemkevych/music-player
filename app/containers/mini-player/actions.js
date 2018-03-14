import {
  UPDATE_PROGRESS_BAR,
  SET_TRACK,
  PAUSE,
  RESUME
} from './constants';

export const setTrack = (track) => ({
  type: SET_TRACK,
  payload: track
});

export const pause = () => ({
  type: PAUSE
});

export const resume = () => ({
  type: RESUME
});

export const updateProgressBar = (current, duration) => ({
  type: UPDATE_PROGRESS_BAR,
  payload: current / duration * 100
});


