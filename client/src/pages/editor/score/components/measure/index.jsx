/* eslint-disable no-confusing-arrow */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import View from './view';
import Controller from './controller';

const Measure = ({
  clef = 'treble',
  begBarline = false,
  isLastBar = false,
  index,
  width = '7.5em',
  height = '15em',
}) => {
  const container = React.createRef();
  let view;
  let controller = {
    onMove: () => { },
  };

  const initialize = () => {
    // Render view
    view = new View({
      container: container.current,
      clef,
      begBarline,
      isLastBar,
      measure: index,
    });

    const svgContext = view.context.parent;
    controller = new Controller(svgContext, index);

    view.render();
  };

  useEffect(initialize, []);

  return (
    <Wrapper
      ref={container}
      begBarline={begBarline}
      onMouseMove={(e) => controller.onMove(e)}
      onClick={() => controller.onClick()}
      onMouseLeave={() => controller.onBlur()}
      height={height}
      width={width}
    />
  );
};

const Wrapper = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

export default Measure;
