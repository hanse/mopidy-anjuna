import Mopidy from 'mopidy';
import MopidyActions from '../actions/MopidyActions';
import PlaylistActions from '../actions/PlaylistActions';
import AlbumCoverActions from '../actions/AlbumCoverActions';
import config from '../../config';

var mopidy = new Mopidy({
  autoConnect: true,
  webSocketUrl: config.webSocketUrl,
  callingConvention: 'by-position-or-by-name'
});

mopidy.on(console.log.bind(console));

mopidy.on('state:online', function() {
  getPlaylists();
  getState();
  getCurrentTrack();
  getVolume();
  getTracklist();
  MopidyActions.connected();
  mopidy.tracklist.setConsume({ value: true });
});

mopidy.on('state:offline', function() {
  MopidyActions.disconnected();
});

mopidy.on('event:trackPlaybackStarted', function(payload) {
  getCurrentTrack();
});

mopidy.on('event:trackPlaybackPaused', function() {
});

mopidy.on('event:volumeChanged', function(payload) {
  MopidyActions.volumeChanged(payload.volume);
});

mopidy.on('event:playbackStateChanged', function(payload) {
  var newState = payload.new_state;
  if ('function' === typeof MopidyActions[newState]) {
    MopidyActions[newState]();
  }
});

mopidy.on('event:playlistsLoaded', function() {
  getPlaylists();
});

mopidy.on('event:tracklistChanged', function() {
  getTracklist();
});

function getPlaylists() {
  return mopidy.playlists.getPlaylists().then(playlists => {
    PlaylistActions.receivePlaylists(playlists);
  });
}

function getCurrentTrack() {
  mopidy.playback.getCurrentTrack().then(track => {
    MopidyActions.getCurrentTrack(track);
    AlbumCoverActions.lookup(track);
  });
}

function getTracklist() {
  mopidy.tracklist.getTlTracks().then(tracks => {
    MopidyActions.tracklistReceived(tracks);
  });
}

function getState() {
  mopidy.playback.getState({}).then(payload => {
    MopidyActions[payload]();
  });
}

function getVolume() {
  return mopidy.playback.getVolume().then(volume => {
    MopidyActions.volumeChanged(volume);
  });
}

/**
 * Force a song to the start of the queue
 */
export function forcePlayTrack(track) {
  mopidy.playback.stop({clear_current_track: true})
    .then(function() {
      mopidy.tracklist.getTlTracks().then(function(tlTracks) {
        var tlTrackToPlay = tlTracks.filter(function(tlTrack, i) {
          return tlTrack.track.uri === track.uri;
        })[0];

        var trackCount = tlTracks.length;
        mopidy.playback.changeTrack({tl_track: tlTrackToPlay}).then(function(data) {
          mopidy.playback.play();
        });
      });
  });
}

export function playTrack(tlTrack) {
  mopidy.playback.stop({ clear_current_track: true })
    .then(() => {
      const removeableIds = [];
      for (let i = 0; i < tlTrack.tlid; i++)
        removeableIds.push(i);
      mopidy.tracklist.remove({tlid: removeableIds}).then();
      mopidy.playback.changeTrack({ tl_track: tlTrack }).then(data => mopidy.playback.play())
    });
}

/**
 * Add a track to the end of the play queue.
 */
export function enqueueTrack(track) {
  mopidy.tracklist.add({ uri: track.uri });
}

export function nextTrack() {
  return mopidy.playback.next().then(noop);
}

export function prevTrack() {
  return mopidy.playback.previous().then(noop);
}

export function play() {
  return mopidy.playback.play().then(noop);
}

export function pause() {
  return mopidy.playback.pause().then(noop);
}

export function setVolume(volume) {
  return mopidy.playback.setVolume({volume: volume}).then();
}

export function clearTracklist() {
  return mopidy.tracklist.clear({}).then();
}

function noop() {
  return console.log.bind(console);
}
