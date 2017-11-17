import Mopidy from 'mopidy';
import ActionTypes from './actions/ActionTypes';
import * as MopidyActions from './actions/MopidyActions';
import * as PlaylistActions from './actions/PlaylistActions';
import config from './config';
import { lookup } from './actions/AlbumCoverActions';

export default function mopidyMiddleware() {
  return store => {
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

    mopidy.on('event:trackPlaybackPaused', () => {});

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

    function forcePlayTrack(track) {
      mopidy.playback.stop({ clear_current_track: true }).then(() => {
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

    function playTrack(tlTrack) {
      mopidy.playback.stop({ clear_current_track: true }).then(() => {
        const removeableIds = [];
        for (let i = 0; i < tlTrack.tlid; i++) {
          removeableIds.push(i);
        }

        mopidy.tracklist.remove({ tlid: removeableIds }).then();
        mopidy.playback
          .changeTrack({ tl_track: tlTrack })
          .then(() => mopidy.playback.play());
      });
    }

    function enqueueTrack(track) {
      mopidy.tracklist.add({ uri: track.uri });
    }

    function nextTrack() {
      return mopidy.playback.next().then();
    }

    function prevTrack() {
      return mopidy.playback.previous().then();
    }

    function play() {
      return mopidy.playback.play().then();
    }

    function pause() {
      return mopidy.playback.pause().then();
    }

    function setVolume(volume) {
      return mopidy.playback.setVolume({ volume: volume }).then();
    }

    function clearTracklist() {
      return mopidy.tracklist.clear({}).then();
    }

    function checkTimePosition() {
      return mopidy.playback.getTimePosition().then(timePosition => {
        store.dispatch(MopidyActions.timePositionReceived(timePosition));
      });
    }

    function seek(ms) {
      mopidy.playback.seek({ time_position: ms }).then();
    }

    return next => action => {
      switch (action.type) {
        case 'NEXT_TRACK':
          nextTrack();
          break;

        case 'PREV_TRACK':
          prevTrack();
          break;

        case 'PLAY':
          play();
          break;

        case 'PAUSE':
          pause();
          break;

        case 'SET_VOLUME':
          setVolume(action.payload);
          break;

        case 'SEEK':
          seek(action.payload);
          break;

        case ActionTypes.GET_CURRENT_TRACK:
          store.dispatch(lookup(action.payload));
          break;

        case ActionTypes.ENQUEUE_TRACK:
          enqueueTrack(action.payload);
          break;

        case 'CLEAR_QUEUE':
          clearTracklist(action.payload);
          break;

        case 'CHECK_TIME_POSITION':
          checkTimePosition();
          break;

        default:
          break;
      }

      return next(action);
    };
  };
}
