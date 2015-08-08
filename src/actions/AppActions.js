export function saveState(key = 'redux') {
  return (dispatch, getState) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(getState()));
    } catch (e) {
      console.warn('Unable to persist state');
    }
  };
}
