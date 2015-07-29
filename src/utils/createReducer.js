export default function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    const handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    if (typeof handler === 'function') {
      return handler(state, action);
    }

    if (action.status && handler[action.status]) {
      return handler[action.status](state, action);
    }

    return state;
  };
}
