import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  /* display: flex; */
  padding: 0 4em 0 4em;
  flex-direction: column;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
`;

export default ({ message, backgroundColor = 'white', color = 'black' }) => (
  <Wrapper className="modal is-active" backgroundColor={backgroundColor} color={color}>
    <h2 className="subtitle is-3">{message}</h2>
    <i className="fas fa-compact-disc fa-spin fa-5x" />
  </Wrapper>
);
