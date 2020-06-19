import React from 'react';
import styled from 'styled-components';
import Measure from './components/measure';
import Clef from './components/clef';

const Score = ({ measureCount = 16 }) => {
  const Measures = [];

  for (let i = 0; i < measureCount; i += 1) {
    if (i === 0) {
      Measures.push(<Measure key={i} index={i} />);
    } else if (i % 4 === 0) {
      Measures.push(<Measure begBarline key={i} index={i} />);
    } else if (i === measureCount - 1) {
      Measures.push(<Measure isLastBar key={i} index={i} />);
    } else {
      Measures.push(<Measure key={i} index={i} />);
    }
  }

  return (
    <Wrapper>
      <Clef />
      {Measures}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2em;
`;

export default Score;
