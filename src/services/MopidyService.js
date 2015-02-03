var Mopidy = require('mopidy');
var MopidyActions = require('../actions/MopidyActions');
var PlaylistActions = require('../actions/PlaylistActions');
var AlbumCoverService = require('./AlbumCoverService');
var config = require('../../config.json');

var mopidy = new Mopidy({
  autoConnect: false,
  webSocketUrl: config.webSocketUrl,
  callingConvention: 'by-position-or-by-name'
});

mopidy.connect();
mopidy.on(console.log.bind(console));

mopidy.on('state:online', function() {
  getPlaylists();
  getState();
  getCurrentTrack();
  getVolume();
  console.log('Server Action Creators', MopidyActions)
  MopidyActions.connected();
});

mopidy.on('state:offline', function() {
  MopidyActions.disconnected();
});

mopidy.on('event:trackPlaybackStarted', function(payload) {
  getCurrentTrack();
});

mopidy.on('event:trackPlaybackPaused', function() {
});

mopidy.on('event:playbackStateChanged', function(payload) {
});

mopidy.on('event:volumeChanged', function(payload) {
  MopidyActions.volumeChanged(payload.volume);
});

mopidy.on('event:playbackStateChanged', function(payload) {
  var newState = payload.new_state;
  if (MopidyActions.hasOwnProperty(newState)) {
    MopidyActions[newState]();
  }
});

mopidy.on('event:playlistsLoaded', function() {
  getPlaylists();
});

mopidy.on('event:tracklistChanged', function(payload) {

});


function playTrack(track, others) {
  mopidy.playback.stop({clear_current_track: true}).then(function() {
    mopidy.tracklist.clear();
  }).then(function() {
    mopidy.tracklist.add({tracks: others});
  }).then(function() {
    mopidy.tracklist.getTlTracks().then(function(tlTracks) {
      var tlTrackToPlay = tlTracks.filter(function(tlTrack) {
        return tlTrack.track.uri === track.uri;
      })[0];

      console.log(tlTrackToPlay)
      mopidy.playback.changeTrack({tl_track: tlTrackToPlay}).then(function() {
        mopidy.playback.play();
      });
    });
  });
}

/**
 * Get all available playlists from the server
 */
function getPlaylists() {
  return mopidy.playlists.getPlaylists().then(function(playlists) {
    PlaylistActions.receivePlaylists(playlists);
  });
}

/**
 * Get info about the current track
 */
function getCurrentTrack() {
  mopidy.playback.getCurrentTrack().then(function(track) {
    MopidyActions.getCurrentTrack(track);
    AlbumCoverService.search(track);
  });
}

/**
 * Get the current playing state (playing, paused, stopped)
 * @return void
 */
function getState() {
  mopidy.playback.getState({}).then(function(payload) {
    MopidyActions[payload]();
  });
}

/**
 * Play the next track
 */
function nextTrack() {
  return mopidy.playback.next().then(noop);
}

/**
 * Play the previous track
 */
function prevTrack() {
  return mopidy.playback.previous().then(noop);
}

/**
 * Play
 */
function play() {
  return mopidy.playback.play().then(noop);
}

/**
 * Pause
 */
function pause() {
  return mopidy.playback.pause().then(noop);
}

function getVolume() {
  return mopidy.playback.getVolume().then(function(volume) {
    MopidyActions.volumeChanged(volume);
  });
}

function setVolume(volume) {
  return mopidy.playback.setVolume({volume: volume}).then();
}

function noop() {
  return console.log.bind(console);
}

/**
 * Expose the service API
 */
module.exports = {
  nextTrack: nextTrack,
  prevTrack: prevTrack,
  play: play,
  pause: pause,
  playTrack: playTrack,
  setVolume: setVolume
};
