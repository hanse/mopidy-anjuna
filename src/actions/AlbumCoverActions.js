import AlbumCoverService from '../services/AlbumCoverService';
import ActionTypes from './ActionTypes';

export function albumCoverReceived(track, cover) {
  return {
    type: ActionTypes.ALBUM_COVER_RECEIVED,
    payload: { track, cover }
  };
}

export function lookup(track) {
  return dispatch => {
    AlbumCoverService.search(track).then(cover => {
      dispatch(albumCoverReceived(track, cover));
    }).catch(() => {
      dispatch(albumCoverReceived(track, 'http://cdn.last.fm/flatness/responsive/2/noimage/default_album_300_g4.png'));
    });
  };
}
