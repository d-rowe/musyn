/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import ScoreModel from './models/score';
import ScoreView from './views/score';
import ScoreController from './controllers/score';

const Score = () => {
  const container = React.createRef();
  const model = new ScoreModel(2);
  let view;
  let controller = {
    move: () => { },
    click: () => { },
    blur: () => { },
  };

  useEffect(() => {
    view = new ScoreView(container.current, model);
    controller = new ScoreController(container.current, model, view);
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
