var AppDispatcher = require('../AppDispatcher');
var TracklistActionTypes = require('../Constants').TracklistActionTypes;
var MopidyService = require('../services/MopidyService');

module.exports = {

  sortBy: function(property) {
    AppDispatcher.handleViewAction({
      type: TracklistActionTypes.SORT_TRACKS,
      sortBy: property
    });
  },

  playTrack: function(track, others) {
    AppDispatcher.handleViewAction({
      type: TracklistActionTypes.PLAY_TRACK,
      track: track
    });

    MopidyService.playTrack(track, others);
  }
};
