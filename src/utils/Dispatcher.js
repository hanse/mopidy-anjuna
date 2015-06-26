import {Dispatcher} from 'flux';
import invariant from 'flux/lib/invariant';
import assign from 'object-assign';

/**
 * The Application Dispatcher
 *
 * See Flux App Dispatchers for more info.
 */
export default assign(new Dispatcher(), {

  handleAction(action) {
    this.dispatch({ action });
  },

  registerStore(store) {
    invariant(!store.dispatchToken, 'The store is already registered');

    store.dispatchToken = this.register((payload) => {
      const action = payload.action;
      if (!store.hasOwnProperty('actions')) return;

      let handlerName = action.type;
      let handler = store.actions[handlerName];

      // the store doesn't care about this action
      if (!handler) return;

      if (typeof handler === 'string') {
        handlerName = handler;
        handler = store[handler];
      }

      invariant(
        typeof handler === 'function',
        '%s is not a function', handlerName
      );

      if (store.waitFor) {
        this.waitFor(store.waitFor);
      }

      if (handler.call(store, action) !== false) {
        store.emitChange();
      }
    });
  }
});
