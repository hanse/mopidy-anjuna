import createActions from '../createActions';

export default createActions({

  //voidActions: ['connected', 'disconnected', 'playing', 'paused', 'stopped'],

  receivePlaylists(playlists) {
    return { playlists };
  },

  getCurrentTrack(track) {
    return { track };
  },

  volumeChanged(volume) {
    return { volume };
  },

  tracklistReceived(tracks) {
    return { tracks };
  },

  connected() {},
  disconnected() {},
  playing() {},
  paused() {},
  stopped() {},
});
