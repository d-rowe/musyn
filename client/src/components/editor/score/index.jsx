/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import ScoreRenderer from './renderer';

const Score = () => {
  const container = React.createRef();
  let renderer;

  const initialize = () => {
    renderer = new ScoreRenderer(container.current);
  };

  useEffect(() => {
    initialize();
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
