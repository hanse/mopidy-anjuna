import Dispatcher from './Dispatcher';
import assign from 'object-assign';

class Actions {}

export default function createActions(actions) {
  const actionContainer = new Actions();

  Object.keys(actions).forEach((action) => {
    actionContainer[action] = (...args) => {
      const payload = assign({}, {
        type: action
      }, actions[action].apply(actionContainer, args));
      Dispatcher.handleAction(payload);
    };
  });

  return actionContainer;
}
