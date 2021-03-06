/* eslint-disable react/button-has-type */
import React from 'react';
import styled from 'styled-components';
import messenger from '../../score/controller/messenger';

const UndoButton = () => (
  <Button
    className="button is-light"
    onClick={() => messenger.undo()}
  >
    <i className="fas fa-undo" />
  </Button>
);

const Button = styled.button`
  width: 2em;
  height: 2em;
  padding: 0.25em;
  margin: 0.25em;
`;

export default UndoButton;
