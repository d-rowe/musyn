/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { Sampler } from 'tone';
import C3 from './samples/C3.ogg';
import C4 from './samples/C4.ogg';
import C5 from './samples/C5.ogg';
import C6 from './samples/C6.ogg';
import A3 from './samples/A3.ogg';
import A4 from './samples/A4.ogg';
import A5 from './samples/A5.ogg';

let piano;
let loaded = false;

const init = () => new Promise((resolve) => {
  piano = new Sampler(
    {
      C3, C4, C5, C6, A3, A4, A5,
    },
    {
      onload: () => {
        console.log('Samples successfully loaded');
        loaded = true;
        resolve();
      },
      release: 0.5,
    },
  ).toMaster();
});

export const playNote = (notename) => {
  if (!loaded) {
    console.warn('Cannot play note before samples are loaded');
    return;
  }

  piano.triggerAttackRelease(notename, '4n');
};

init();
