/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import { Undo } from 'styled-icons/material/Undo';
import socket from '../score/models/socket';


const UndoButton = () => (
  <Button
    className="button is-outlined"
    onClick={() => socket.sendUndo()}
  >
    <Undo />
  </Button>
);

const Button = styled.button`
  display: absolute;
  right: 0;
  top: 0;
  width: 2em;
  height: 2em;
  padding: 0.25em;
`;

export default UndoButton;
