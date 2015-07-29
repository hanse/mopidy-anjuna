export default function loggerMiddleware() {
  return next => action => {
    const { type, payload, meta, status } = action;
    const args = ['[redux]', type, status, { payload, meta }];
    if (status === 'error') {
      console.error(...args);
    } else {
      console.log(...args);
    }
    return next(action);
  };
}
