/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import axios from 'axios';
import view from '../views/score';
import socket from './socket';
import { playNote } from './audio';

const length = 8;
let notes = {};

const update = () => new Promise((resolve, reject) => {
  axios.get('/api/score')
    .then((response) => response.data)
    .then((scoreDat) => {
      notes = scoreDat;
      view.rerender();
      resolve();
    })
    .catch((err) => reject(err));
});

const notesAtIndex = (beatIndex) => {
  const beatNotes = notes[beatIndex];

  if (beatNotes !== undefined) {
    return [...beatNotes];
  }

  return [];
};

const hasNoteAtIndex = (notename, beatIndex) => {
  const beatNotes = notes[beatIndex];

  if (beatNotes === undefined) return false;

  return beatNotes.includes(notename);
};

const removeNote = (notename, beatIndex) => {
  const noteIndex = notes[beatIndex].indexOf(notename);

  if (noteIndex !== -1) {
    notes[beatIndex].splice(noteIndex, 1);
    socket.sendNoteDelete(notename, beatIndex);
    return true;
  }

  return false;
};

const addNote = (notename, beatIndex) => {
  const beatNotes = notes[beatIndex];

  if (hasNoteAtIndex(notename, beatIndex)) {
    removeNote(notename, beatIndex);
    return false;
  }

  if (beatNotes === undefined) {
    notes[beatIndex] = [notename];
  } else {
    beatNotes.push(notename);
  }

  playNote(notename);
  socket.sendNoteCreate(notename, beatIndex);
  return true;
};

const getNotes = () => ({ ...notes });

const init = () => {
  socket.on.update = () => update();
};

export default {
  init,
  notesAtIndex,
  removeNote,
  addNote,
  hasNoteAtIndex,
  length,
  update,
  getNotes,
};
