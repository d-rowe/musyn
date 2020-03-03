/* eslint-disable no-console */
import { Sampler, Transport } from 'tone';
import C3 from './samples/C3.ogg';
import C4 from './samples/C4.ogg';
import C5 from './samples/C5.ogg';
import C6 from './samples/C6.ogg';
import A3 from './samples/A3.ogg';
import A4 from './samples/A4.ogg';
import A5 from './samples/A5.ogg';

let piano;
let loaded = false;
Transport.bpm.value = 80;

export const setTempo = (bpm) => {
  Transport.bpm.value = bpm;
};

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

export const playScore = (notes) => new Promise((resolve) => {
  const beats = Object.keys(notes);
  const lastBeat = Math.max(...beats);


  Transport.start();
  let index = 0;

  const repeat = () => {
    if (index <= lastBeat) {
      const beatNotes = notes[index];

      if (beatNotes) {
        playNote(notes[index]);
      }

      index += 1;
    } else {
      Transport.stop();
      Transport.cancel();
      resolve();
    }
  };

  Transport.scheduleRepeat((time) => {
    repeat(time);
  }, '4n');
});

export const stop = () => {
  Transport.stop();
  Transport.cancel();
};

init();
