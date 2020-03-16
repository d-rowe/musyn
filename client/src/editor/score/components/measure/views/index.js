import { Flow } from 'vexflow';
import vexNote from '../models/vexNotes';
import scoreModel from '../../../models/score';
import cursors from '../../../models/cursors';

class View {
  constructor({
    container,
    clef = 'treble',
    timeSig = [4, 4],
    begBarline = false,
    isLastBar = false,
    measure,
  }) {
    this.container = container;

    this.renderer = new Flow.Renderer(container, Flow.Renderer.Backends.SVG);

    const { width, height } = container.getBoundingClientRect();
    this.renderer.resize(width, height);
    this.containerSize = { width, height };

    this.context = this.renderer.getContext();

    this.clef = clef;
    this.timeSig = timeSig;
    this.begBarline = begBarline;
    this.isLastBar = isLastBar;
    this.measure = measure;

    scoreModel.registerMeasureView(measure, this);
    cursors.registerMeasureView(measure, this);
  }

  renderStave() {
    this.context.setViewBox(0, 90, 202, 80);

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

    const measureCursors = cursors.getMeasure(this.measure);

    const tickables = [];

    for (let tick = 0; tick < 4096; tick += 1024) {
      const cursorsAtTick = [];

      measureCursors.forEach((cursor) => {
        if (cursor.tick === tick) {
          cursorsAtTick.push(cursor);
        }
      });

      if (cursorsAtTick.length === 0) {
        tickables.push(vexNote({ isRest: true, beatDuration: 1 }));
      } else {
        const { color, pitch, duration } = cursorsAtTick[0];
        tickables.push(vexNote({ pitches: [pitch], beatDuration: duration / 1024, color }));
      }
    }

    voice.addTickables(tickables);

    new Flow.Formatter().joinVoices([voice]).format([voice], 200);

    voice.draw(this.context, this.stave);
  }

  render() {
    this.renderStave();
    this.renderNotes();
  }

  clear() {
    this.renderer.ctx.clear();
  }

  rerender() {
    this.clear();
    this.render();
  }
}

export default View;
