import * as MopidyService from '../services/MopidyService';
import { lookup } from './AlbumCoverActions';
import ActionTypes from './ActionTypes';

export function sort(property, direction) {
  return {
    type: ActionTypes.SORT_TRACKS,
    payload: { property, direction }
  };
}

export function select(index) {
  return (dispatch, getState) => {
    if (getState().tracklist.selectedIndex === index) {
      return;
    }

    dispatch({
      type: ActionTypes.SELECT_TRACK,
      payload: index
    });
  };
}

export function filter(value) {
  return {
    type: ActionTypes.FILTER_TRACKS,
    payload: value
  };
}

export function playTrack(track) {
  return (dispatch) => {
    MopidyService.playTrack(track);
    dispatch({ type: ActionTypes.PLAY_TRACK });
  };
}

export function enqueue(track) {
  return (dispatch) => {
    MopidyService.enqueueTrack(track);
    dispatch(lookup(track));
    dispatch({ type: ActionTypes.ENQUEUE_TRACK });
  };
}

export function clearQueue(track) {
  return () => {
    MopidyService.clearTracklist(track);
  };
}
