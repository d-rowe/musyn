import { Sampler } from 'tone';
import samples from './config';


class Instrument {
  constructor() {
    this.samplesLoaded = false;
    this.sampler = new Sampler(samples, {
      release: 0.5,
      // eslint-disable-next-line no-console
      onload: () => { this.samplesLoaded = true; },
    }).toMaster();
  }

  play(pitch, duration = '0:0:2') {
    if (!this.samplesLoaded) {
      // eslint-disable-next-line no-console
      console.warn('Cannot play notes with instrument before samples are loaded');
      return;
    }

    this.sampler.triggerAttackRelease(pitch, duration);
  }
}

export default new Instrument();
