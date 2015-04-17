import createStore from '../utils/createStore';

var _tracks = [];

var QueueStore = createStore({

  getState() {
    return {
      tracks: _tracks
    }
  },

  getTracks() {
    return _tracks;
  },

  actions: {
    tracklistReceived(action) {
      _tracks = action.tracks;
      this.emitChange();
    }
  }
});

export default QueueStore;
