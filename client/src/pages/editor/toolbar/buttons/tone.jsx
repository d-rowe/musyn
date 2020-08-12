import React, { useState } from 'react';
import styled from 'styled-components';

const imgLocation = '/assets/img/';
const imgExtension = 'svg';

const ToneButton = ({toneOnClick}) => {
  return (
    <Button className='button is-light'
      onClick = {() => toneOnClick()}
      img = 'piano_keys' >
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