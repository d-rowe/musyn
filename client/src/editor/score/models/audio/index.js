/* eslint-disable no-console */
import { Sampler, Transport } from 'tone';
import samples from './config';


let piano;
let loaded = false;
Transport.bpm.value = 80;

export const setTempo = (bpm) => {
  Transport.bpm.value = bpm;
};

const init = () => new Promise((resolve) => {
  piano = new Sampler(
    samples,
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
