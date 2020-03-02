import Vex from 'vexflow';

const VF = Vex.Flow;

const noteToVexKey = (notename) => {
  if (notename === null) return null;

  const noteRegEx = /([a-gA-G])([b|#|x]*)?([0-9])?/;

  const [, letter, accidental, octave] = (noteRegEx.exec(notename));
  const undercaseLetter = letter.toLowerCase();
  return `${undercaseLetter}${accidental || ''}/${octave}`;
};

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

    // Scale svg to fit container
    const contextWidth = this.context.attributes.x;
    const contextHeight = this.context.attributes.y;
    this.context.setViewBox(5, contextHeight - 15, contextWidth, contextHeight);
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
      const keys = this.vexKeysAtIndex(i);

      const cursor = this.cursors.users.local;
      const cursorKey = noteToVexKey(cursor.note);

      let hasCursor = false;

      if (cursor.beatIndex === i) {
        keys.push(cursorKey);
        hasCursor = true;
      }

      if (keys.length === 0) {
        notes.push(new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }));
      } else {
        const currentNotes = new VF.StaveNote({ clef: 'treble', keys, duration: 'q' });

        if (hasCursor) {
          const cursorIndex = currentNotes.keys.indexOf(cursorKey);

          currentNotes.setKeyStyle(cursorIndex, { fillStyle: cursor.color });

          if (currentNotes.keys.length === 1) {
            currentNotes.setStemStyle({ strokeStyle: cursor.color });
          }
        }

        notes.push(currentNotes);
      }
    }

    return notes;
  }

  vexKeysAtIndex(beatIndex) {
    const notes = this.score.notesAtIndex(beatIndex);

    if (notes.length === 0) return [];

    return notes.map((notename) => noteToVexKey(notename));
  }
}


export default ScoreView;
