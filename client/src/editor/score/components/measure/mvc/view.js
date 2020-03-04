import { Flow } from 'vexflow';

class View {
  constructor({
    container,
    clef = 'treble',
    displayClef = false,
    displayTimeSig = false,
    timeSig = [4, 4],
    begBarline = false,
  }) {
    this.container = container;

    this.renderer = new Flow.Renderer(container, Flow.Renderer.Backends.SVG);

    const { width, height } = container.getBoundingClientRect();
    this.renderer.resize(width, height);
    this.containerSize = { width, height };

    this.context = this.renderer.getContext();
    this.context.setViewBox(0, 90, 201, 80);

    this.clef = clef;
    this.timeSig = timeSig;
    this.displayClef = displayClef;
    this.displayTimeSig = displayTimeSig;
    this.begBarline = begBarline;
  }

  render() {
    const stave = new Flow.Stave(0, 70, 200);
    if (this.displayClef) {
      stave.addClef('treble');
    }

    if (this.displayTimeSig) {
      // Time signature string e.g. 4/4
      const timeSigStr = this.timeSig.join('/');

      stave.addTimeSignature(timeSigStr);
    }

    if (!this.begBarline) {
      stave.setBegBarType(Flow.Barline.type.NONE);
    }

    // Render stave to screen
    stave.setContext(this.context).draw();

    // const [numBeats, beatValue] = this.timeSig;
    // const voice = new Flow.Voice({
    //   num_beats: numBeats,
    //   beat_value: beatValue,
    // });

    // voice.addTickables(this.getVexNotes());

    // new Flow.Formatter().joinVoices([voice]).format([voice], 400);
    // Render notes to screen
    // voice.draw(this.context, stave);
  }
}

export default View;
