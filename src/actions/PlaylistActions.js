import createActions from '../utils/createActions';

export default createActions({

  changePlaylist(playlist) {
    return { playlist };
  },

  receivePlaylists(playlists) {
    return { playlists };
  }
});
