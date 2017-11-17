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

export function enqueue(track) {
  return dispatch => {
    dispatch(lookup(track));
    dispatch({ type: ActionTypes.ENQUEUE_TRACK, payload: track });
  };
}

export function clearQueue(track) {
  return {
    type: 'CLEAR_QUEUE',
    payload: track
  };
}
