
var createActions = require('../createActions');
var MopidyService = require('../services/MopidyService');

var PlayerControlActions = createActions({

  next() {
    MopidyService.nextTrack();
  },

  prev() {
    MopidyService.prevTrack();
  },

  play() {
    MopidyService.play();
  },

  pause() {
    MopidyService.pause();
  },

  setVolume(volume) {
    MopidyService.setVolume(volume);
    return {
      volume: volume
    };
  }
});

module.exports = PlayerControlActions;
