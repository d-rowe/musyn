/* eslint-disable no-console */
class ScoreController {
  constructor(container, scoreModel, scoreView) {
    this.startX = 60;
    this.beatSpacing = 50;
    this.pitchSpacing = 5;
    this.container = container;
    this.scoreModel = scoreModel;
    this.scoreView = scoreView;
    [this.svgContext] = container.children;

    this.noteMap = {
      29: 'G3',
      28: 'A3',
      27: 'B3',
      26: 'C4',
      25: 'D4',
      24: 'E4',
      23: 'F4',
      22: 'G4',
      21: 'A4',
      20: 'B4',
      19: 'C5',
      18: 'D5',
      17: 'E5',
      16: 'F5',
    };

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
    const { x, y } = this.mousePos;
    this.scoreModel.addNote(this.noteMap[y], x);
    this.scoreView.rerender();
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
