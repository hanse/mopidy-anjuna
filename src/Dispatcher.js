var Dispatcher = require('flux').Dispatcher;
var invariant = require('flux/lib/invariant');
var assign = require('object-assign');

/**
 * The Application Dispatcher
 *
 * See Flux App Dispatchers for more info.
 */

module.exports = assign(new Dispatcher(), {

  handleAction(action) {
    console.log('Dispatched Action', action);
    this.dispatch({
      action: action
    });
  },

  registerStore(store) {
    invariant(!store.dispatchToken, 'The store is already registered');

    store.dispatchToken = this.register(function(payload) {
      var action = payload.action;
      if (!store.hasOwnProperty('actions')) return;
      console.log(store.actions, action.type)
      var handler = store.actions[action.type];
      var handlerName = action.type;

      // the store doesn't care about this action
      if (!handler) return;

      if ('string' === typeof handler) {
        handlerName = handler;
        handler = store[handler];
      }

      invariant(
        typeof handler === 'function',
        '%s is not a function', handlerName
      );

      handler.call(store, action);
    })
  }
});
