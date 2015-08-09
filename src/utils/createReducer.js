export default function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    const handler = handlers[action.type];

    if (typeof handler === 'function') {
      return handler(state, action);
    }

    return state;
  };
}
