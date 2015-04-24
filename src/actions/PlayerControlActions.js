import createActions from '../utils/createActions';
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
    return { volume };
  },

  getTimePosition() {
    MopidyService.checkTimePosition();
  },

  seek(ms) {
    MopidyService.seek(ms);
    return { ms };
  }
});
