import ActionTypes from './ActionTypes';

export function receivePlaylists(playlists) {
  return {
    type: ActionTypes.RECEIVE_PLAYLISTS,
    payload: playlists
  };
}

export function getCurrentTrack(track) {
  return {
    type: ActionTypes.GET_CURRENT_TRACK,
    payload: track
  };
}

export function volumeChanged(volume) {
  return {
    type: ActionTypes.VOLUME_CHANGED,
    payload: volume
  };
}

export function tracklistReceived(tracks) {
  return {
    type: ActionTypes.TRACKLIST_RECEIVED,
    payload: tracks
  };
}

export function timePositionReceived(timePosition) {
  return {
    type: ActionTypes.TIME_POSITION_RECEIVED,
    payload: timePosition
  };
}

export function requestTimePosition() {
  return (dispatch, getState) => {
    const delay = 1000;
    let n = 0;
    setInterval(() => {
      if (!getState().status.isPlaying) return;
      dispatch(timePositionReceived(getState().status.timePosition + delay));

      if (n++ === 10) {
        dispatch({ type: 'CHECK_TIME_POSITION' });
        n = 0;
      }
    }, delay);
  };
}

export const connected = () => ({ type: ActionTypes.CONNECTED });
export const disconnected = () => ({ type: ActionTypes.DISCONNECTED });
export const playing = () => ({ type: ActionTypes.PLAYING });
export const paused = () => ({ type: ActionTypes.PAUSED });
export const stopped = () => ({ type: ActionTypes.STOPPED });
