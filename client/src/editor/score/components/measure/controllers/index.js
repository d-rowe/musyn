import cursors from '../../../models/cursors';
import { pitchMap } from '../../../utils/notes';

class Controller {
  constructor(svgContext, measureIndex = 0) {
    this.svgContext = svgContext;
    this.bounds = { x: 0, w: 200 };
    this.tickOffset = 4096 * measureIndex;
  }

  onMove(e) {
    const matrix = this.svgContext.getScreenCTM();
    let p = this.svgContext.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    p = p.matrixTransform(matrix.inverse());
    const voiceX = p.x - this.bounds.x;
    const y = Math.floor(p.y / 5);

    const pitch = pitchMap[y];

    const measureTick = Math.floor((voiceX / this.bounds.w) * 4096);

    if (measureTick < 0) {
      cursors.update('local', -1, pitch);
    } else {
      const globalTick = this.tickOffset + measureTick;

      cursors.update('local', globalTick, pitch);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onClick() {
    cursors.commit();
  }
}

export default Controller;
