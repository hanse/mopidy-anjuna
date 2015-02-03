var createStore = require('../createStore');

var _connected = false;

var ConnectionStore = createStore({

  isConnected() {
    return _connected;
  },

  actions: {
    connected() {
      _connected = true;
      this.emitChange();
    },

    disconnected() {
      _connected = false;
      this.emitChange();
    }
  }
});

module.exports = ConnectionStore;
