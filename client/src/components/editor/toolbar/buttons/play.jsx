/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import { PlayArrow } from 'styled-icons/material/PlayArrow';

const PlayButton = () => (
  <Button className="button is-dark">
    <PlayArrow size="1.4em" />
  </Button>
);

const Button = styled.button`
  width: 2em;
  height: 2em;
  padding: 0.25em;
  margin: 0.25em;
`;

export default PlayButton;
