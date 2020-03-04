/* eslint-disable import/no-cycle */
import Vex from 'vexflow';
import { parseAndSortNotes } from '../utils/notes';
import scoreModel from '../models/score';

const VF = Vex.Flow;

let container;
let cursors;
let renderer;
let context;
let stave;
let voice;

const vexNotes = () => {
  // Add notes from score
  const beatCursors = cursors.beatFormat();
  const notes = [];

  for (let beatIndex = 0; beatIndex < scoreModel.length; beatIndex += 1) {
    const notesAtBeatIndex = scoreModel.notesAtIndex(beatIndex);
    const cursorsAtBeatIndex = beatCursors[beatIndex];
    let cursorNotesAtBeatIndex = [];

    const hasCursorAtBeatIndex = cursorsAtBeatIndex !== undefined;

    const deleteDisplayNotes = [];

    if (hasCursorAtBeatIndex) {
      cursorNotesAtBeatIndex = cursorsAtBeatIndex.map((c) => c.note);

      cursorNotesAtBeatIndex.forEach((cursorNote) => {
        if (notesAtBeatIndex.includes(cursorNote)) {
          deleteDisplayNotes.push(cursorNote);
        } else {
          notesAtBeatIndex.push(cursorNote);
        }
      });
    }

    const parsedAndSortedNotes = parseAndSortNotes(notesAtBeatIndex);

    if (parsedAndSortedNotes.length === 0) {
      notes.push(new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }));
    } else {
      const keys = parsedAndSortedNotes.map((parsedNote) => parsedNote.vexKey);
      const notenames = parsedAndSortedNotes.map((parsedNote) => parsedNote.notename);

      const currentStaveNotes = new VF.StaveNote(
        {
          clef: 'treble',
          keys,
          duration: 'q',
          auto_stem: true,
        },
      );


      if (hasCursorAtBeatIndex) {
        const isDeleteDisplay = deleteDisplayNotes.includes(cursorNotesAtBeatIndex[0]);
        const cursorKeyIndex = notenames.indexOf(cursorNotesAtBeatIndex[0]);
        const color = isDeleteDisplay ? 'rgba(237, 28, 36, 0.8)' : cursorsAtBeatIndex[0].color;
        currentStaveNotes.setKeyStyle(cursorKeyIndex, { fillStyle: color });

        if (currentStaveNotes.keys.length === 1) {
          currentStaveNotes.setStemStyle({ strokeStyle: color });
        }
      }

      notes.push(currentStaveNotes);
    }
  }

  return notes;
};

const draw = () => {
  context = renderer.getContext();
  // Scale svg to fit container
  const contextWidth = context.attributes.x;
  const contextHeight = context.attributes.y;
  context.setViewBox(5, contextHeight - 15, contextWidth, contextHeight);

  // Create a stave of width 250 at position 10, 70 on the canvas.
  stave = new VF.Stave(10, 70, 450);

  stave.setEndBarType(Vex.Flow.Barline.type.DOUBLE);

  // Add a clef and time signature.
  stave.addClef('treble').addTimeSignature('4/4');
  stave.setContext(context).draw();

  // Create a voice in 4/4 and add above notes
  voice = new VF.Voice({ num_beats: 8, beat_value: 4 });
  voice.addTickables(vexNotes());

  // Format and justify the notes to 200 pixels.
  new VF.Formatter().joinVoices([voice]).format([voice], 400);

  // Render voice
  voice.draw(context, stave);
};

const initializeAndRender = () => {
  renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);

  // Size context svg
  const contextSVG = renderer.ctx.svg;
  contextSVG.setAttribute('width', '100%');
  contextSVG.setAttribute('height', '100%');

  context = renderer.getContext();

  draw();
};

const clear = () => {
  renderer.ctx.clear();
};

const rerender = () => {
  clear();
  draw();
};

const init = (containerElement, cursorsModel) => {
  container = containerElement;
  cursors = cursorsModel;

  initializeAndRender();
};

export default {
  init,
  draw,
  initializeAndRender,
  rerender,
};
