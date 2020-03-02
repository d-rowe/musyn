/* eslint-disable no-console */
class ScoreController {
  constructor(container) {
    this.startX = 60;
    this.beatSpacing = 50;
    this.pitchSpacing = 5;
    this.container = container;
    [this.svgContext] = container.children;

    this.blur();
  }

  move(e) {
    this.updatePos(e);
  }

  blur() {
    this.mousePos = null;
  }

  click(e) {
    this.updatePos(e);
    console.log('click');
  }

  updatePos(e) {
    const matrix = this.svgContext.getScreenCTM();
    let p = this.svgContext.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    p = p.matrixTransform(matrix.inverse());
    const point = {
      x: Math.floor((p.x - this.startX) / this.beatSpacing),
      y: Math.round(p.y / this.pitchSpacing),
    };

    if (point.x >= 0) {
      this.mousePos = point;
    } else {
      this.blur();
    }
  }
}

export default ScoreController;
