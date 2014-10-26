var Store = require('./Store');
var AppDispatcher = require('../AppDispatcher');
var PlaylistStore = require('./PlaylistStore');
var PlaylistActionTypes = require('../Constants').PlaylistActionTypes;
var TracklistActionTypes = require('../Constants').TracklistActionTypes;

var _sortBy = null;
var _direction = -1;

var TracklistStore = Store.create({
  getAll: function() {
    var playlist = PlaylistStore.getCurrent();
    if (!playlist) return [];

    // var tracklist = playlist.tracks.map(function(track) {
    //   return {
    //     name: track.name,
    //     artist: track.artists.map(function(artist) {
    //       return artist.name;
    //     }).join(', '),
    //     duration: track.length
    //   };
    // });

    var tracklist = playlist.tracks;

    if (_sortBy) {
      tracklist = tracklist.sort(function(a, b) {
        if ('number' === typeof a[_sortBy])
          return _direction * (a[_sortBy] - b[_sortBy]);
        return _direction * a[_sortBy].localeCompare(b[_sortBy]);
      });
    }
    return tracklist;
  }
});

TracklistStore.dispatchToken = AppDispatcher.register(function(payload) {

  AppDispatcher.waitFor([
    PlaylistStore.dispatchToken
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
