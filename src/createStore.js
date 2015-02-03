var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Dispatcher = require('./Dispatcher');

var CHANGE_EVENT = 'change';

class Store {

  constructor() {
    assign(this, EventEmitter.prototype);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}

function createStore(methods) {
  var store = assign(new Store, methods);
  Dispatcher.registerStore(store);
  return store;
}

module.exports = createStore;
