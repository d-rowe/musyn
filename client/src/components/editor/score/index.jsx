/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import ScoreModel from './models/score';
import ScoreView from './views/score';

const Score = () => {
  const container = React.createRef();
  const scoreModel = new ScoreModel(1);
  let view;

  useEffect(() => {
    view = new ScoreView(container.current, scoreModel);
  }, []);

  return (
    <Wrapper ref={container} />
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Score;
