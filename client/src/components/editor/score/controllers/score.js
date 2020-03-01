/* eslint-disable no-console */
class ScoreController {
  constructor(container) {
    this.container = container;
    [this.svgContext] = container.children;
    this.pos = null;
  }

  move(e) {
    this.updatePos(e);
  }

  click() {
    console.log('click', this.pos);
  }

  updatePos(e) {
    const matrix = this.svgContext.getScreenCTM();
    let p = this.svgContext.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    p = p.matrixTransform(matrix.inverse());
    const point = {
      // START_X of 80, BEAT_SPACING of 20
      x: Math.floor((p.x - 80) / 20),
      // PITCH_SPACING of 5
      y: Math.round(p.y / 5),
    };

    this.pos = point;
    return point;
  }
}

export default ScoreController;
