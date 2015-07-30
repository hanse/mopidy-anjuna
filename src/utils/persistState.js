export default function persistState(key = 'redux') {
  return next => (reducer, initialState) => {
    let persistedState;
    let finalInitialState;

    try {
      persistedState = JSON.parse(localStorage.getItem(key));
      finalInitialState = persistedState ? persistedState : initialState;
    } catch (e) {
      console.warn('Failed to retrieve persisted state');
    }

    const store = next(reducer, finalInitialState);

    store.subscribe(() => {
      const state = store.getState();
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (e) {
        console.warn('Unable to persist state');
      }
    });

    return store;
  };
}
