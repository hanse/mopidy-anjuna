import createActions from '../utils/createActions';

export default createActions({

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

  timePositionReceived(timePosition) {
    return { timePosition };
  },

  connected() {},
  disconnected() {},
  playing() {},
  paused() {},
  stopped() {},
});
