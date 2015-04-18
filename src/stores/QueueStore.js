import createStore from '../utils/createStore';

let _tracks = [];

const QueueStore = createStore({

  getState() {
    return {
      tracks: _tracks
    }
  },

  actions: {
    tracklistReceived(action) {
      _tracks = action.tracks;
    }
  }
});

export default QueueStore;
