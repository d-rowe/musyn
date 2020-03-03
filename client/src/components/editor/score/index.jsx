/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import ScoreModel from './models/score';
import view from './views/score';
import ScoreController from './controllers/score';
import ScoreCursors from './models/cursors';
import './utils/uuid';

const Score = () => {
  const container = React.createRef();
  const model = new ScoreModel(2);
  const cursors = new ScoreCursors();

  let controller = {
    move: () => { },
    click: () => { },
    blur: () => { },
  };

  useEffect(() => {
    view.init(
      container.current,
      model,
      cursors,
    );

    controller = new ScoreController(
      container.current,
      model,
      cursors,
      view,
    );

    model.update()
      .then(() => view.rerender())
      .catch((err) => console.error(err));
  }, []);

  return (
    <Wrapper
      ref={container}
      onMouseMove={(e) => controller.move(e, container.current)}
      onClick={(e) => controller.click(e, container.current)}
      onMouseLeave={() => controller.blur()}
    />
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Score;
