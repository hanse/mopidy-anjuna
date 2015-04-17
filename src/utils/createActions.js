import Dispatcher from './Dispatcher';
import assign from 'object-assign';

class Actions {}

export default function createActions(actions) {
  var actionContainer = new Actions;

  Object.keys(actions).forEach(function(action) {
    actionContainer[action] = (...args) => {
      var payload = assign({}, {
        type: action
      }, actions[action].apply(actionContainer, args));
      Dispatcher.handleAction(payload);
    };
  });

  return actionContainer;
}
