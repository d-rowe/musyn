import { Flow } from 'vexflow';

class View {
  constructor({
    container,
    clef = 'treble',
    displayClef = false,
    displayTimeSig = false,
    timeSig = [4, 4],
    begBarline = false,
    isLastBar = false,
  }) {
    this.container = container;

    this.renderer = new Flow.Renderer(container, Flow.Renderer.Backends.SVG);

    const { width, height } = container.getBoundingClientRect();
    this.renderer.resize(width, height);
    this.containerSize = { width, height };

    this.context = this.renderer.getContext();
    this.context.setViewBox(0, 90, 202, 80);

    this.clef = clef;
    this.timeSig = timeSig;
    this.displayClef = displayClef;
    this.displayTimeSig = displayTimeSig;
    this.begBarline = begBarline;
    this.isLastBar = isLastBar;
  }

  renderStave() {
    this.stave = new Flow.Stave(0, 70, 200);

    if (this.displayClef) {
      this.stave.addClef(this.clef);
    }

    if (this.displayTimeSig) {
      const timeSigStr = this.timeSig.join('/');
      this.stave.addTimeSignature(timeSigStr === '4/4' ? 'C' : timeSigStr);
    }

    if (!this.begBarline) {
      this.stave.setBegBarType(Flow.Barline.type.NONE);
    }

    if (this.isLastBar) {
      this.stave.setEndBarType(Flow.Barline.type.DOUBLE);
    }

    this.stave.setContext(this.context).draw();
  }

  renderNotes() {
    const [numBeats, beatValue] = this.timeSig;
    const voice = new Flow.Voice({
      num_beats: numBeats,
      beat_value: beatValue,
    });

    voice.addTickables(this.getVexNotes());

    new Flow.Formatter().joinVoices([voice]).format([voice], 400);

    voice.draw(this.context, this.stave);
  }

  render() {
    this.renderStave();
  }
}

export default View;
