/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import styled from 'styled-components';
import { PlayArrow } from 'styled-icons/material/PlayArrow';
import { Stop } from 'styled-icons/material/Stop';
import scoreModel from '../../score/models/score';
import { playScore, stop } from '../../score/models/audio';

const PlayButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playIcon = isPlaying
    ? <Stop size="1.4em" />
    : <PlayArrow size="1.4em" />;

  const onClick = () => {
    const notes = scoreModel.getNotes();

    if (Object.keys(notes).length === 0) return;

    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playScore(notes).then(() => setIsPlaying(false));
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
