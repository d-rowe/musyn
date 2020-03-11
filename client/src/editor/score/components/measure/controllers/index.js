class Controller {
  constructor(svgContext) {
    this.svgContext = svgContext;
    this.tick = -1;
    this.bounds = { x: 0, w: 200 };
  }

  onMove(e) {
    const matrix = this.svgContext.getScreenCTM();
    let p = this.svgContext.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    p = p.matrixTransform(matrix.inverse());
    const voiceX = p.x - this.bounds.x;

    const tick = Math.floor((voiceX / this.bounds.w) * 4096);
    if (tick >= 0) {
      this.tick = tick;
    } else {
      this.tick = -1;
    }
  }
}

export default Controller;
