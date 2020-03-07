import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Flow } from 'vexflow';

const Clef = () => {
  const container = React.createRef();

  useEffect(() => {
    const renderer = new Flow.Renderer(container.current, Flow.Renderer.Backends.SVG);
    renderer.resize(35, 90);

    const context = renderer.getContext();
    context.svg.setAttribute('height', '100%');
    context.svg.setAttribute('width', '100%');

    context.setViewBox(0, 90, 29.6, 80);

    const stave = new Flow.Stave(0, 70, 30);
    stave.addClef('treble');
    stave.setEndBarType(Flow.Barline.type.NONE);
    stave.setContext(context).draw();
  });

  return (
    <Wrapper ref={container} />
  );
};

const Wrapper = styled.div`
  height: 7em;
  width: 2.2em;
`;

export default Clef;
