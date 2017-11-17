export function next() {
  return {
    type: 'NEXT_TRACK'
  };
}

export function prev() {
  return {
    type: 'PREV_TRACK'
  };
}

export function play() {
  return {
    type: 'PLAY'
  };
}

export function pause() {
  return {
    type: 'PAUSE'
  };
}

export function setVolume(value) {
  return {
    type: 'SET_VOLUME',
    payload: value
  };
}

export function seek(ms) {
  return {
    type: 'SEEK',
    payload: ms
  };
}
