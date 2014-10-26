var AppDispatcher = require('../AppDispatcher');
var MopidyActionTypes = require('../Constants').MopidyActionTypes;
var MopidyService = require('../services/MopidyService');

module.exports = {

  next: function() {
    AppDispatcher.handleViewAction({
      type: MopidyActionTypes.NEXT_TRACK
    });

    MopidyService.nextTrack();
  },

  prev: function() {
    AppDispatcher.handleViewAction({
      type: MopidyActionTypes.PREV_TRACK
    });

    MopidyService.prevTrack();
  },

  play: function() {
    AppDispatcher.handleViewAction({
      type: MopidyActionTypes.PLAY
    });

    MopidyService.play();
  },

  pause: function() {
    AppDispatcher.handleViewAction({
      type: MopidyActionTypes.PAUSE
    });

    MopidyService.pause();
  },

  setVolume: function(volume) {
    AppDispatcher.handleViewAction({
      type: MopidyActionTypes.CHANGE_VOLUME,
      volume: volume
    });

    MopidyService.setVolume(volume);
  }
};
