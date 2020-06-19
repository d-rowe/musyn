/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import styled from 'styled-components';
import { PlayArrow } from 'styled-icons/material/PlayArrow';
import { Stop } from 'styled-icons/material/Stop';
import { Transport } from 'tone';
import playback from '../../score/controller/playback';


const PlayButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  Transport.on('stop', () => setIsPlaying(false));
  Transport.on('start', () => setIsPlaying(true));

  const playIcon = isPlaying
    ? <Stop size="1.4em" />
    : <PlayArrow size="1.4em" />;

  const onClick = () => {
    if (isPlaying) {
      playback.stop();
      setIsPlaying(false);
    } else {
      playback.start();
      setIsPlaying(true);
    }
  };

  return (
    <Button className="button is-dark" onClick={() => onClick()}>
      {playIcon}
    </Button>
  );
};

const Button = styled.button`
  width: 2em;
  height: 2em;
  padding: 0.25em;
  margin: 0.25em;
`;

export default PlayButton;
