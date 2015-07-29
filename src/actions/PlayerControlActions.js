import * as MopidyService from '../services/MopidyService';
import ActionTypes from './ActionTypes';

export function next() {
  return () => {
    MopidyService.nextTrack();
  };
}

export function prev() {
  return () => {
    MopidyService.prevTrack();
  };
}

export function play() {
  return ()=> {
    MopidyService.play();
  };
}

export function pause() {
  return () => {
    MopidyService.pause();
  };
}

export function setVolume(value) {
  return dispatch => {
    MopidyService.setVolume(value);
    dispatch({
      type: ActionTypes.SET_VOLUME,
      payload: value
    });
  };
}

export function seek(ms) {
  return dispatch => {
    MopidyService.seek(ms);
    dispatch({
      type: ActionTypes.SEEK,
      payload: ms
    });
  };
}
