function constants(data) {
  return data.reduce(function(map, constant) {
    map[constant] = constant;
    return map;
  }, {});
}

module.exports = {

  PlaylistActionTypes: {
    RECEIVE_PLAYLISTS: 'RECEIVE_PLAYLISTS',
    CHANGE_PLAYLIST: 'CHANGE_PLAYLIST'
  },

  TracklistActionTypes: {
    SORT_TRACKS: 'SORT_TRACKS',
    PLAY_TRACK: 'PLAY_TRACK'
  },

  MopidyActionTypes: {
    TRACK_CHANGED: 'TRACK_CHANGED',
    NEXT_TRACK: 'NEXT_TRACK',
    PREV_TRACK: 'PREV_TRACK',
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    CHANGE_VOLUME: 'CHANGE_VOLUME',
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    GET_CURRENT_TRACK: 'GET_CURRENT_TRACK'
  },
};
