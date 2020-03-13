import cursors from '../../../models/cursors';

class Controller {
  constructor(svgContext) {
    this.svgContext = svgContext;
    this.bounds = { x: 0, w: 200 };
  }

  onMove(e) {
    const matrix = this.svgContext.getScreenCTM();
    let p = this.svgContext.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    p = p.matrixTransform(matrix.inverse());
    const voiceX = p.x - this.bounds.x;

    let tick = Math.floor((voiceX / this.bounds.w) * 4096);
    if (tick < 0) {
      tick = -1;
    }

    cursors.update('local', tick, 'C4');
  }
}

export default Controller;
