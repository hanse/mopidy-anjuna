var Store = require('./Store');
var AppDispatcher = require('../AppDispatcher');
var PlaylistStore = require('./PlaylistStore');
var CurrentlyPlayingStore = require('./CurrentlyPlayingStore');
var PlaylistActionTypes = require('../Constants').PlaylistActionTypes;
var TracklistActionTypes = require('../Constants').TracklistActionTypes;

var _sortBy = null;
var _direction = -1;

function getSortedTracks() {
  var playlist = PlaylistStore.getCurrent();
  if (!playlist) return [];

  var tracklist = playlist.tracks;
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

var TracklistStore = Store.create({
  getState: function() {
    return {
      sortBy: _sortBy,
      sortDirection: _direction,
      tracks: getSortedTracks()
    };
  }
});

TracklistStore.dispatchToken = AppDispatcher.register(function(payload) {

  AppDispatcher.waitFor([
    PlaylistStore.dispatchToken,
    CurrentlyPlayingStore.dispatchToken
  ]);

  var action = payload.action;
  switch (action.type) {
    case PlaylistActionTypes.CHANGE_PLAYLIST:
      TracklistStore.emitChange();
      break;

    case TracklistActionTypes.SORT_TRACKS:
      _sortBy = action.sortBy;
      _direction = -_direction;
      TracklistStore.emitChange();
      break;
  }

  return true;
});

module.exports = TracklistStore;
