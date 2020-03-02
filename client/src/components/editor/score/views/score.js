import Vex from 'vexflow';

const VF = Vex.Flow;

class ScoreView {
  constructor(containerElement, score) {
    this.container = containerElement;
    this.score = score;
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

      if (keys.length === 0) {
        notes.push(new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }));
      } else {
        notes.push(new VF.StaveNote({ clef: 'treble', keys, duration: 'q' }));
      }
    }

    return notes;
  }

  vexKeysAtIndex(beatIndex) {
    const notes = this.score.notesAtIndex(beatIndex);

    if (notes.length === 0) return [];

    const noteRegEx = /([a-gA-G])([b|#|x]*)?([0-9])?/;

    return notes.map((note) => {
      const [, letter, accidental, octave] = (noteRegEx.exec(note));
      const undercaseLetter = letter.toLowerCase();
      return `${undercaseLetter}${accidental || ''}/${octave}`;
    });
  }
}

export default ScoreView;
