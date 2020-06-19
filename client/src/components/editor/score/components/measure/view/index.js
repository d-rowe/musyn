import { Flow } from 'vexflow';
import globalScore from '../../../model/score';
import LocalScore from '../model/score';
import cursors from '../../../model/cursors';

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

    globalScore.registerMeasureView(measure, this);
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

  renderTickables() {
    const [numBeats, beatValue] = this.timeSig;
    const voice = new Flow.Voice({
      num_beats: numBeats,
      beat_value: beatValue,
    });

    voice.addTickables(new LocalScore(this.measure).vex());

    new Flow.Formatter().joinVoices([voice]).format([voice], 200);

    voice.draw(this.context, this.stave);
  }

  render() {
    this.renderStave();
    this.renderTickables();
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
