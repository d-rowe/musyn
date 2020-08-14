import React, { useState } from 'react';
import styled from 'styled-components';
import paths from 'config/paths';

const imgLocation = paths.image;
const imgExtension = 'svg';

const ToneButton = ({toneOnClick}) => {
  return (
    <Button className='button is-light'
      onClick = {() => toneOnClick()}
      img = 'Keys_Piano' >
    </Button>
  )
}

const Button = styled.button`
  width: 2em;
  height: 2em;
  padding: 0.25em;
  margin: 0.25em;
  background-image: url(${imgLocation}${(props) => props.img}.${imgExtension});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export default ToneButton;