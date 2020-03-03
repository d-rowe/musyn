/* eslint-disable no-console */
import { noteMap } from '../utils/notes';

class ScoreController {
  constructor(container, scoreModel, cursors, scoreView) {
    this.startX = 60;
    this.beatSpacing = 50;
    this.pitchSpacing = 5;
    this.container = container;
    this.scoreModel = scoreModel;
    this.cursors = cursors;
    this.scoreView = scoreView;
    [this.svgContext] = container.children;

    this.blur();
  }

  move(e) {
    const { x: prevX, y: prevY } = this.mousePos;
    this.updatePos(e);
    const { x, y } = this.mousePos;

    if (x === prevX && y === prevY) return;

    if (this.mousePos.x === -1) {
      this.cursors.remove('local');
      return;
    }

    const notename = noteMap[y];

    if (notename !== undefined) {
      this.cursors.update('local', notename, x);
    } else {
      this.cursors.remove('local');
    }

    this.scoreView.rerender();
  }

  blur() {
    this.mousePos = { x: -1, y: -1 };
    this.scoreView.rerender();
  }

  click(e) {
    this.updatePos(e);

    const { x, y } = this.mousePos;
    const notename = noteMap[y];

    if (notename !== undefined) {
      this.cursors.remove('local');
      this.scoreModel.addNote(notename, x);
      this.scoreView.rerender();
    }
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
