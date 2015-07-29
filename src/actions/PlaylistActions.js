import ActionTypes from './ActionTypes';

export function changePlaylist(playlist) {
  return {
    type: ActionTypes.CHANGE_PLAYLIST,
    payload: playlist
  };
}

export function receivePlaylists(playlists) {
  return {
    type: ActionTypes.RECEIVE_PLAYLISTS,
    payload: playlists
  };
}
