import Vex from 'vexflow';
import { parseAndSortNotes } from '../utils/notes';

const VF = Vex.Flow;

class ScoreView {
  constructor(containerElement, score, cursors) {
    this.container = containerElement;
    this.score = score;
    this.cursors = cursors;
    this.initializeAndRender();
  }

  initializeAndRender() {
    this.renderer = new VF.Renderer(this.container, VF.Renderer.Backends.SVG);

    // Size context svg
    const contextSVG = this.renderer.ctx.svg;
    contextSVG.setAttribute('width', '100%');
    contextSVG.setAttribute('height', '100%');

    this.context = this.renderer.getContext();

    this.draw();
  }

  draw() {
    this.context = this.renderer.getContext();
    // Scale svg to fit container
    const contextWidth = this.context.attributes.x;
    const contextHeight = this.context.attributes.y;
    this.context.setViewBox(5, contextHeight - 15, contextWidth, contextHeight);

    // Create a stave of width 250 at position 10, 40 on the canvas.
    this.stave = new VF.Stave(10, 40, 450);

    // Add a clef and time signature.
    this.stave.addClef('treble').addTimeSignature('4/4');
    this.stave.setContext(this.context).draw();

    // Create a voice in 4/4 and add above notes
    this.voice = new VF.Voice({ num_beats: 8, beat_value: 4 });
    this.voice.addTickables(this.vexNotes());

    // Format and justify the notes to 200 pixels.
    this.formatter = new VF.Formatter().joinVoices([this.voice]).format([this.voice], 400);

    // Render voice
    this.voice.draw(this.context, this.stave);
  }

  clear() {
    this.renderer.ctx.clear();
  }

  rerender() {
    this.clear();
    this.draw();
  }

  vexNotes() {
    // Add notes from score
    const notes = [];

    for (let i = 0; i < this.score.length; i += 1) {
      const currentNotenames = this.score.notesAtIndex(i);

      const cursor = this.cursors.users.local;

      let hasCursor = false;

      if (cursor.beatIndex === i) {
        currentNotenames.push(cursor.note);
        hasCursor = true;
      }

      const parsedAndSortedNotes = parseAndSortNotes(currentNotenames);

      if (parsedAndSortedNotes.length === 0) {
        notes.push(new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }));
      } else {
        const keys = parsedAndSortedNotes.map((parsedNote) => parsedNote.vexKey);
        const notenames = parsedAndSortedNotes.map((parsedNote) => parsedNote.notename);

        const currentStaveNotes = new VF.StaveNote({ clef: 'treble', keys, duration: 'q' });
        if (hasCursor) {
          const cursorKeyIndex = notenames.indexOf(cursor.note);
          currentStaveNotes.setKeyStyle(cursorKeyIndex, { fillStyle: cursor.color });

          if (currentStaveNotes.keys.length === 1) {
            currentStaveNotes.setStemStyle({ strokeStyle: cursor.color });
          }
        }

        notes.push(currentStaveNotes);
      }
    }

    return notes;
  }
}


export default ScoreView;
