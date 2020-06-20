import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Measure from './components/measure';
import Clef from './components/clef';

const Score = ({ measureCount = 32 }) => {
  const MEASURE_WIDTH = 240;

  const measureHeight = MEASURE_WIDTH / 2;
  const measureWidthStr = `${MEASURE_WIDTH}px`;
  const measureHeightStr = `${measureHeight}px`;

  const wrapperEl = React.createRef();
  const [Measures, setMeasures] = useState([]);
  const [hasRendered, setHasRendered] = useState(false);
  const measuresArray = [];

  const renderMeasures = () => {
    const wrapperWidth = wrapperEl.current.clientWidth;
    const measuresPerLine = Math.floor(wrapperWidth / MEASURE_WIDTH);

    for (let i = 0; i < measureCount; i += 1) {
      if (i === 0) {
        measuresArray.push(
          <Measure key={i} index={i} height={measureHeightStr} width={measureWidthStr} />,
        );
      } else if (i === measureCount - 1) {
        measuresArray.push(
          <Measure key={i} index={i} height={measureHeightStr} width={measureWidthStr} isLastBar />,
        );
      } else if (i % measuresPerLine === 0) {
        measuresArray.push(
          <Measure
            key={i}
            index={i}
            height={measureHeightStr}
            width={measureWidthStr}
            begBarline
          />,
        );
      } else {
        measuresArray.push(
          <Measure key={i} index={i} height={measureHeightStr} width={measureWidthStr} />,
        );
      }
    }

    setMeasures(measuresArray);
  };

  useEffect(() => {
    renderMeasures();
    setHasRendered(true);
  }, []);

  return (
    <Wrapper ref={wrapperEl}>
      {hasRendered ? <Clef /> : null}
      {Measures}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  padding-left: 2em;
`;

export default Score;
