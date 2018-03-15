import {
  UPDATE_PROGRESS_BAR,
  SET_TRACK,
  PAUSE,
  RESUME,
  PREPARE_SET_TRACK
} from './constants';

export const setTrack = (track, color) => ({
  type: SET_TRACK,
  track,
  color
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

export const prepareSetTrack = (track) => ({
  type: PREPARE_SET_TRACK,
  track
});

