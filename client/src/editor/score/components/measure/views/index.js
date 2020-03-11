import { Flow } from 'vexflow';
import vexNote from '../models/vexNotes';

class View {
  constructor({
    container,
    clef = 'treble',
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
    this.begBarline = begBarline;
    this.isLastBar = isLastBar;
  }

  renderStave() {
    this.stave = new Flow.Stave(0, 70, 200);

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

    const tickables = [
      vexNote({ isRest: true, beatDuration: 4 }),
    ];

    voice.addTickables(tickables);

    new Flow.Formatter().joinVoices([voice]).format([voice], 200);

    voice.draw(this.context, this.stave);
  }

  render() {
    this.renderStave();
    this.renderNotes();
  }
}

export default View;
