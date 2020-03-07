import React, { useEffect } from 'react';
import styled from 'styled-components';
import View from './mvc/view';
import Controller from './mvc/controller';

const Measure = ({
  notes,
  clef = 'treble',
  displayClef = false,
  displayTimeSig = false,
  begBarline = false,
  isLastBar = false,
}) => {
  const container = React.createRef();
  let view;
  let controller = {
    onMove: () => { },
  };

  const updateBoundingBox = (boundingBox) => {
    controller.updateBoundingBox(boundingBox);
  };

  const onMount = () => {
    // Render view
    view = new View({
      container: container.current,
      clef,
      displayClef,
      displayTimeSig,
      begBarline,
      isLastBar,
      onBoundingBoxChange: updateBoundingBox,
    });

    const svgContext = view.context.parent;
    controller = new Controller(svgContext);

    view.render();
  };

  const noteUpdate = () => {
    // View rerender
  };


  useEffect(onMount, []);
  useEffect(noteUpdate, [notes]);

  return (
    <Wrapper
      ref={container}
      onMouseMove={(e) => controller.onMove(e)}
    />
  );
};

const Wrapper = styled.div`
  height: 7em;
  width: 15em;
  background-color: white;
`;

export default Measure;
