var Mopidy = require('mopidy');
var MopidyServerActionCreators = require('../actions/MopidyServerActionCreators');
var PlaylistServerActionCreators = require('../actions/PlaylistServerActionCreators');
var MopidyActionTypes = require('../constants').MopidyActionTypes;

var mopidy = new Mopidy({
  autoConnect: false,
  webSocketUrl: 'ws://localhost:6680/mopidy/ws/',
  callingConvention: 'by-position-or-by-name'
});

mopidy.connect();
mopidy.on(console.log.bind(console));

mopidy.on('state:online', function() {
  getPlaylists();
  getState();
  getCurrentTrack();

  MopidyServerActionCreators.connected();
});

mopidy.on('state:offline', function() {
  MopidyServerActionCreators.disconnected();
});

mopidy.on('event:trackPlaybackStarted', function(payload) {
  getCurrentTrack();
});

mopidy.on('event:trackPlaybackPaused', function() {
});

mopidy.on('event:playbackStateChanged', function(payload) {
});

mopidy.on('event:volumeChanged', function(payload) {
  // setVolume(payload['volume']);
});

mopidy.on('event:playbackStateChanged', function(payload) {
  switch (payload.new_state) {
    case 'playing':
      MopidyServerActionCreators.playing();
      break;

    case 'paused':
      MopidyServerActionCreators.paused();
      break;
  }
});

mopidy.on('event:tracklistChanged', function(payload) {

});


function getPlaylists() {
  return mopidy.playlists.getPlaylists().then(function(playlists) {
    PlaylistServerActionCreators.receivePlaylists(playlists);
  });
}

function getCurrentTrack() {
  mopidy.playback.getCurrentTrack().then(function(track) {
    MopidyServerActionCreators.getCurrentTrack(track);
  });
}

function getState() {
  mopidy.playback.getState({}).then(function(payload) {
    MopidyServerActionCreators[payload]();
  });
}

function nextTrack() {
  return mopidy.playback.next().then(noop);
}

function prevTrack() {
  return mopidy.playback.previous().then(noop);
}

function play() {
  return mopidy.playback.play().then(noop);
}

function pause() {
  return mopidy.playback.pause().then(noop);
}

function noop() {
  return console.log.bind(console);
}

module.exports = {
  nextTrack: nextTrack,
  prevTrack: prevTrack,
  play: play,
  pause: pause
};
