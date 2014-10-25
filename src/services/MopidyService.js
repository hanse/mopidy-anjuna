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
  mopidy.playback.getCurrentTrack().done(function(track) {
    console.log(track);
  });

  getPlaylists();
})


function getPlaylists() {
  return mopidy.playlists.getPlaylists().then(function(playlists) {
    PlaylistServerActionCreators.receivePlaylists(playlists);
  });
}
//
// function getTracklist() {
//   return mopidy.tracklist.getTracklist().then(function() {
//     console.log(arguments);
//   });
// }
