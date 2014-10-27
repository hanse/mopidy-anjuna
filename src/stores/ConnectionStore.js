var Store = require('./Store');
var AppDispatcher = require('../AppDispatcher');
var MopidyActionTypes = require('../Constants').MopidyActionTypes;

var _connected = false;

var ConnectionStore = Store.create({
  isConnected: function() {
    return _connected;
  }
});

ConnectionStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {
    case MopidyActionTypes.CONNECTED:
      _connected = true;
      ConnectionStore.emitChange();
      break;

    case MopidyActionTypes.DISCONNECTED:
      _connected = false;
      ConnectionStore.emitChange();
      break;
  }

  return true;
});

module.exports = ConnectionStore;
