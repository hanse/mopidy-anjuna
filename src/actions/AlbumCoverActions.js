import AlbumCoverService from '../services/AlbumCoverService';
import ActionTypes from './ActionTypes';

export function albumCoverReceived(cover) {
  return {
    type: ActionTypes.ALBUM_COVER_RECEIVED,
    payload: cover
  };
}

export function lookup(track) {
  return dispatch => {
    AlbumCoverService.search(track).then(cover => {
      dispatch(albumCoverReceived(cover));
    }).catch(() => {});
  };
}
