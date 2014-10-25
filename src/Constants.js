/**
 * This file holds all the constants that are used in a Flux app
 *
 * Conventions:
 *   RECEIVE_* Something is coming from the server (server action)
 *   CLICK_* Something is clicked (view action)
 */

module.exports = {

  PlaylistActionTypes: {
    RECEIVE_PLAYLISTS: 'RECEIVE_PLAYLISTS',
    CHANGE_PLAYLIST: 'CHANGE_PLAYLIST'
  },

  MopidyActionTypes: {
    TRACK_CHANGED: 'TRACK_CHANGED',
  },
};
