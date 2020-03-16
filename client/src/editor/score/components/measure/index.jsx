/* eslint-disable no-confusing-arrow */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import View from './views';
import Controller from './controllers';

const Measure = ({
  notes,
  clef = 'treble',
  begBarline = false,
  isLastBar = false,
  index,
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

  const noteUpdate = () => {
    // View rerender
  };


  useEffect(initialize, []);
  useEffect(noteUpdate, [notes]);

  return (
    <Wrapper
      ref={container}
      begBarline={begBarline}
      onMouseMove={(e) => controller.onMove(e)}
      onClick={() => controller.onClick()}
    />
  );
};

const Wrapper = styled.div`
  height: 7em;
  width: 15em;
  background-color: white;
  margin-left: ${(props) => props.begBarline ? '1.1em' : 0}
`;

export default Measure;
