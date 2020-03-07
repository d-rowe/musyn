class Controller {
  constructor(svgContext) {
    this.svgContext = svgContext;
    this.tick = -1;
  }

  onMove(e) {
    const matrix = this.svgContext.getScreenCTM();
    let p = this.svgContext.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    p = p.matrixTransform(matrix.inverse());
    const voiceX = p.x - this.xBounds.x;

    const tick = Math.floor((voiceX / this.xBounds.w) * 4096);
    if (tick >= 0) {
      this.tick = tick;
    } else {
      this.tick = -1;
    }
  }

  updateBoundingBox(boundingBox) {
    const { x, w } = boundingBox;
    this.xBounds = { x, w };
  }
}

export default Controller;
