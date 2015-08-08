import invariant from 'invariant';
import createReducer from '../utils/createReducer';
import ActionTypes from '../actions/ActionTypes';

const initialState = {
  sortBy: 'name',
  direction: -1,
  filter: '',
  selectedIndex: 0
};

const VALID_SORT_PROPERTIES = ['name', 'length'];

export function createSorter(state) {
  const { direction, sortBy } = state.tracklist;

  invariant(
    VALID_SORT_PROPERTIES.indexOf(sortBy) !== -1,
    `Invalid sort property ${sortBy}`
  );

  return function sorter(a, b) {
    if (typeof a[sortBy] === 'number') {
      return direction * (a[sortBy] - b[sortBy]);
    }
    return direction * a[sortBy].localeCompare(b[sortBy]);
  };
}

export function createFilter(state) {
  const { filter } = state.tracklist;
  return track => track.name.indexOf(filter) !== -1;
}

export default createReducer(initialState, {
  [ActionTypes.FILTER_TRACKS]: (state, action) => {
    return { ...state, filter: action.payload };
  },

  [ActionTypes.SELECT_TRACK]: (state, { payload }) => ({ ...state, selectedIndex: payload }),

  [ActionTypes.SORT_TRACKS]: (state, action) => {
    const { property } = action.payload;
    return { ...state, sortBy: property, direction: state.direction * -1 };
  }
});
