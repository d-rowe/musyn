import cursors from '../../../models/cursors';

class Controller {
  constructor(svgContext, measureIndex = 0) {
    this.svgContext = svgContext;
    this.bounds = { x: 0, w: 200 };
    this.tickOffset = 4096 * measureIndex;
    this.mousePos = { x: -1, y: -1 };
  }

  onMove(e) {
    const matrix = this.svgContext.getScreenCTM();
    let p = this.svgContext.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    p = p.matrixTransform(matrix.inverse());
    this.mousePos = p;
    const voiceX = p.x - this.bounds.x;

    const measureTick = Math.floor((voiceX / this.bounds.w) * 4096);

    if (measureTick < 0) {
      cursors.update('local', -1, 'C4');
    } else {
      const globalTick = this.tickOffset + measureTick;

      cursors.update('local', globalTick, 'C4');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onClick() {
    cursors.commit();
  }
}

export default Controller;
