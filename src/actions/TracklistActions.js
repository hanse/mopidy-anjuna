var createActions = require('../createActions');
var MopidyService = require('../services/MopidyService');

var TracklistViewActions = createActions({
  sortTracks(property) {
    return {
      sortBy: property
    };
  },

  playTrack(track, others) {
    MopidyService.playTrack(track, others);
    return {
      track: track
    };
  }
});

module.exports = TracklistViewActions;
