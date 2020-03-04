/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import scoreModel from './models/score';
import view from './views/score';
import ScoreController from './controllers/score';
import ScoreCursors from './models/cursors';
import './utils/uuid';

const Score = () => {
  const container = React.createRef();
  const cursors = new ScoreCursors();

  let controller = {
    move: () => { },
    click: () => { },
    blur: () => { },
  };

  useEffect(() => {
    scoreModel.init();

    view.init(
      container.current,
      cursors,
    );

    controller = new ScoreController(
      container.current,
      cursors,
      view,
    );

    scoreModel.update()
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
  min-height: 12em;
  padding: 1em;
`;

export default Score;
