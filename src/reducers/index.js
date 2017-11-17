import { combineReducers } from 'redux';
import playlists from './playlists';
import queue from './queue';
import status from './status';
import tracklist from './tracklist';

export default combineReducers({
  playlists,
  queue,
  status,
  tracklist
});
