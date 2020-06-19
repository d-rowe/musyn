/* eslint-disable class-methods-use-this */
import cursors from '../../../model/cursors';
import pitchMap from '../../../../../../../../lib/pitchMap';

class Controller {
  constructor(svgContext, measure = 0) {
    this.svgContext = svgContext;
    this.bounds = { x: 0, w: 200 };
    this.measure = measure;
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
    const start = Math.floor((voiceX / this.bounds.w) * 4096);

    if (start < 0 || pitch === undefined) {
      cursors.hide('local');
    } else {
      cursors.update('local', pitch, this.measure, start);
    }
  }

  onBlur() {
    cursors.hide('local');
  }

  onClick() {
    cursors.commit();
  }
}

export default Controller;
