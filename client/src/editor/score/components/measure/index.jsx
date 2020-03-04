import React, { useEffect } from 'react';
import styled from 'styled-components';
import View from './mvc/view';

const Measure = ({
  notes,
  clef = 'treble',
  displayClef = false,
  displayTimeSig = false,
  begBarline = false,
}) => {
  const container = React.createRef();
  let view;

  const onMount = () => {
    // Render view
    view = new View({
      container: container.current,
      clef,
      displayClef,
      displayTimeSig,
      begBarline,
    });

    view.render();
    // Initialize controller
  };

  const onNoteUpdate = () => {
    // View rerender
  };

  useEffect(onMount, []);
  useEffect(onNoteUpdate, [notes]);

  return (
    <Wrapper ref={container} />
  );
};

const Wrapper = styled.div`
  height: 7em;
  width: 15em;
  background-color: white;
`;

export default Measure;
