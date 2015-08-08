export default function loadState(key = 'redux') {
  return next => (reducer, initialState) => {
    let persistedState;
    let finalInitialState;

    try {
      persistedState = JSON.parse(localStorage.getItem(key));
      finalInitialState = persistedState ? persistedState : initialState;
    } catch (e) {
      console.warn('Failed to retrieve persisted state');
    }

    return next(reducer, finalInitialState);
  };
}
