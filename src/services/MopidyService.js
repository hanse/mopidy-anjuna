import Mopidy from 'mopidy';
import * as MopidyActions from '../actions/MopidyActions';
import * as PlaylistActions from '../actions/PlaylistActions';
import config from '../../config';
import { store } from '../redux';

const mopidy = new Mopidy({
  autoConnect: true,
  webSocketUrl: config.webSocketUrl,
  callingConvention: 'by-position-or-by-name'
});

mopidy.on('state:online', () => {
  getPlaylists();
  getState();
  getCurrentTrack();
  getVolume();
  getTracklist();
  checkTimePosition();
  store.dispatch(MopidyActions.connected());
  mopidy.tracklist.setConsume({ value: true });
});

mopidy.on('state:offline', () => {
  store.dispatch(MopidyActions.disconnected());
});

mopidy.on('event:trackPlaybackStarted', () => {
  getCurrentTrack();
});

mopidy.on('event:trackPlaybackPaused', () => {
});

mopidy.on('event:volumeChanged', payload => {
  store.dispatch(MopidyActions.volumeChanged(payload.volume));
});

mopidy.on('event:playbackStateChanged', payload => {
  let newState = payload.new_state;
  if (typeof MopidyActions[newState] === 'function') {
    store.dispatch(MopidyActions[newState]());
  }
  checkTimePosition();
});

mopidy.on('event:playlistsLoaded', () => {
  getPlaylists();
});

mopidy.on('event:tracklistChanged', () => {
  getTracklist();
});

function getPlaylists() {
  return mopidy.playlists.getPlaylists().then(playlists => {
    store.dispatch(PlaylistActions.receivePlaylists(playlists || []));
  });
}

function getCurrentTrack() {
  mopidy.playback.getCurrentTrack().then(track => {
    store.dispatch(MopidyActions.getCurrentTrack(track || {}));
  });
}

function getTracklist() {
  mopidy.tracklist.getTlTracks().then(tracks => {
    store.dispatch(MopidyActions.tracklistReceived(tracks || []));
  });
}

function getState() {
  mopidy.playback.getState({}).then(payload => {
    store.dispatch(MopidyActions[payload]());
  });
}

function getVolume() {
  return mopidy.playback.getVolume().then(volume => {
    store.dispatch(MopidyActions.volumeChanged(volume));
  });
}

/**
 * Force a song to the start of the queue
 */
export function forcePlayTrack(track) {
  mopidy.playback.stop({clear_current_track: true})
    .then(() => {
      mopidy.tracklist.getTlTracks().then(tlTracks => {
        const tlTrackToPlay = tlTracks.filter(
          tlTrack => tlTrack.track.uri === track.uri
        )[0];

        mopidy.playback.changeTrack({ tl_track: tlTrackToPlay }).then(() => {
          mopidy.playback.play();
        });
      });
    });
}

export function playTrack(tlTrack) {
  mopidy.playback.stop({ clear_current_track: true })
    .then(() => {
      const removeableIds = [];
      for (let i = 0; i < tlTrack.tlid; i++) {
        removeableIds.push(i);
      }

      mopidy.tracklist.remove({ tlid: removeableIds }).then();
      mopidy.playback.changeTrack({ tl_track: tlTrack }).then(() => mopidy.playback.play());
    });
}

/**
 * Add a track to the end of the play queue.
 */
export function enqueueTrack(track) {
  mopidy.tracklist.add({ uri: track.uri });
}

export function nextTrack() {
  return mopidy.playback.next().then();
}

export function prevTrack() {
  return mopidy.playback.previous().then();
}

export function play() {
  return mopidy.playback.play().then();
}

export function pause() {
  return mopidy.playback.pause().then();
}

export function setVolume(volume) {
  return mopidy.playback.setVolume({volume: volume}).then();
}

export function clearTracklist() {
  return mopidy.tracklist.clear({}).then();
}

export function checkTimePosition() {
  mopidy.playback.getTimePosition().then(timePosition => {
    store.dispatch(MopidyActions.timePositionReceived(timePosition));
  });
}

export function seek(ms) {
  mopidy.playback.seek({ time_position: ms }).then();
}
