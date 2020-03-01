import Vex from 'vexflow';

const VF = Vex.Flow;

class ScoreRenderer {
  constructor(containerElement) {
    this.container = containerElement;
    this.initializeAndRender();
  }

  initializeAndRender() {
    this.renderer = new VF.Renderer(this.container, VF.Renderer.Backends.SVG);

    // Size context svg
    const contextSVG = this.renderer.ctx.svg;
    contextSVG.setAttribute('width', '100%');
    contextSVG.setAttribute('height', '100%');

    this.context = this.renderer.getContext();

    // Create a stave of width 250 at position 10, 40 on the canvas.
    this.stave = new VF.Stave(10, 40, 250);

    // Add a clef and time signature.
    this.stave.addClef('treble').addTimeSignature('4/4');
    this.stave.setContext(this.context).draw();

    // Add quarter rests
    this.notes = [];
    for (let i = 0; i < 4; i += 1) {
      this.notes.push(new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }));
    }

    // Create a voice in 4/4 and add above notes
    this.voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    this.voice.addTickables(this.notes);

    // Format and justify the notes to 400 pixels.
    this.formatter = new VF.Formatter().joinVoices([this.voice]).format([this.voice], 200);

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
    this.initializeAndRender();
  }
}

export default ScoreRenderer;
