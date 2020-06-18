/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import { Undo } from 'styled-icons/material/Undo';
import messenger from '../../score/controller/messenger';

const UndoButton = () => (
  <Button
    className="button is-dark"
    onClick={() => messenger.undo()}
  >
    <Undo size="1.4em" />
  </Button>
);

const Button = styled.button`
  width: 2em;
  height: 2em;
  padding: 0.25em;
  margin: 0.25em;
`;

export default UndoButton;
