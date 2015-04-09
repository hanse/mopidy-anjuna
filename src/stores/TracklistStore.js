import createStore from '../createStore';
import PlaylistStore from './PlaylistStore';
import CurrentlyPlayingStore from './CurrentlyPlayingStore';

var _sortBy = null;
var _direction = -1;

function getSortedTracks() {
  var playlist = PlaylistStore.getCurrent();
  if (!playlist) return [];

  var tracklist = playlist.tracks;
  if (!tracklist) return [];

  var currentTrack = CurrentlyPlayingStore.getCurrentTrack();
  var tracklist = playlist.tracks.map(function(track) {
    track.artist = track.artists.map(function(artist) {
      return artist.name;
    }).join(', ');
    return track;
  });

  if (_sortBy) {
    tracklist = tracklist.sort(function(a, b) {
      if ('number' === typeof a[_sortBy])
        return _direction * (a[_sortBy] - b[_sortBy]);
      return _direction * a[_sortBy].localeCompare(b[_sortBy]);
    });
  }
  return tracklist;
}

var TracklistStore = createStore({
  getState() {
    return {
      sortBy: _sortBy,
      sortDirection: _direction,
      tracks: getSortedTracks()
    }
  },

  waitFor: [PlaylistStore.dispatchToken, CurrentlyPlayingStore.dispatchToken],
  actions: {
    changePlaylist() {
      this.emitChange();
    },

    sortTracks(action) {
      _sortBy = action.sortBy;
      _direction = -_direction;
      this.emitChange();
    }
  }
});

export default TracklistStore;
