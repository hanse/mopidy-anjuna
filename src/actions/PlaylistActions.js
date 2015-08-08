import ActionTypes from './ActionTypes';

export function changePlaylist(playlist) {
  return {
    type: ActionTypes.CHANGE_PLAYLIST,
    payload: playlist
  };
}

export function select(index) {
  return (dispatch, getState) => {
    if (getState().playlists.selectedIndex === index) {
      return;
    }

    dispatch({ type: ActionTypes.SELECT_PLAYLIST, payload: index });
    dispatch(changePlaylist(getState().playlists.items[index]));
  };
}

export function receivePlaylists(playlists) {
  return {
    type: ActionTypes.RECEIVE_PLAYLISTS,
    payload: playlists
  };
}
