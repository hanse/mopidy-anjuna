import Dispatcher from './Dispatcher';
import assign from 'object-assign';

class Actions {}

export default function createActions(actions) {
  var actionContainer = new Actions;

  if (actions.hasOwnProperty('voidActions')) {
    actions.voidActions.forEach(function(action) {
      actions[action] = function() {};
    });

    delete actions.voidActions;
  }

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
