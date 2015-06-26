import createStore from '../utils/createStore';
import PlaylistStore from './PlaylistStore';
import { artistsAsString } from '../helpers';

let _sortBy = null;
let _direction = -1;
let _filter = '';

function sortByNumberOrString(sortBy, direction) {
  return (a, b) => {
    if (typeof a[sortBy] === 'number') {
      return direction * (a[sortBy] - b[sortBy]);
    }
    return direction * a[sortBy].localeCompare(b[sortBy]);
  };
}

function getTracks() {
  const playlist = PlaylistStore.getCurrent();
  if (!playlist) return [];

  let tracklist = playlist.tracks;
  if (!tracklist) return [];

  tracklist = tracklist.map(track => {
    track.artistName = artistsAsString(track);
    return track;
  });

  if (_sortBy) {
    tracklist = tracklist.sort(sortByNumberOrString(_sortBy, _direction));
  }

  const regex = new RegExp(_filter, 'i');
  return tracklist.filter(track =>
    ~track.name.search(regex) || ~track.artistName.search(regex)
  );
}

const TracklistStore = createStore({

  getState() {
    return {
      sortBy: _sortBy,
      sortDirection: _direction,
      tracks: getTracks()
    };
  },

  actions: {
    changePlaylist() {
    },

    sortTracks(action) {
      _sortBy = action.sortBy;
      _direction = -_direction;
    },

    filterTracks(action) {
      _filter = action.filter;
    }
  }
});

export default TracklistStore;
