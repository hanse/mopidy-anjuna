import createActions from '../createActions';
import * as MopidyService from '../services/MopidyService';

export default createActions({

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
      volume
    };
  }
});
