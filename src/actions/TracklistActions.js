import * as MopidyService from '../services/MopidyService';
import ActionTypes from './ActionTypes';

export function sort(property, direction) {
  return {
    type: ActionTypes.SORT_TRACKS,
    payload: { property, direction }
  };
}

export function filter(value) {
  return {
    type: ActionTypes.FILTER_TRACKS,
    payload: value
  };
}

export function playTrack(track) {
  return () => {
    MopidyService.playTrack(track);
  };
}

export function enqueue(track) {
  return () => {
    MopidyService.enqueueTrack(track);
  };
}

export function clearQueue(track) {
  return () => {
    MopidyService.clearTracklist(track);
  };
}
