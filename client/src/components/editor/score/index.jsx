/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Vex from 'vexflow';

const VF = Vex.Flow;

const Score = () => {
  const container = React.createRef();
  let renderer;
  let context;
  let stave;
  const notes = [];
  let voice;
  let formatter;

  const initialize = () => {
    // Create renderer
    renderer = new VF.Renderer(container.current, VF.Renderer.Backends.SVG);

    // Configure rendering context
    const contextSVG = renderer.ctx.svg;
    contextSVG.setAttribute('height', '100%');
    contextSVG.setAttribute('width', '100%');
    context = renderer.getContext();

    // Create a stave of width 250 at position 10, 40 on the canvas.
    stave = new VF.Stave(10, 40, 250);

    // Add a clef and time signature.
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();

    // Add quarter rests
    for (let i = 0; i < 4; i += 1) {
      notes.push(new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }));
    }

    // Create a voice in 4/4 and add above notes
    voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    formatter = new VF.Formatter().joinVoices([voice]).format([voice], 200);

    // Render voice
    voice.draw(context, stave);

    // Scale svg to fit container
    const contextWidth = context.attributes.x;
    const contextHeight = context.attributes.y;
    context.setViewBox(5, contextHeight - 15, contextWidth, contextHeight);
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
