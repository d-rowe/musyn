import React, { useState } from 'react';
import styled from 'styled-components';

const imgLocation = '/assets/img/';
const imgExtension = 'svg';

const toneReducer = (state, action) => {
  switch(action.type) {
    case 'open':
      return {isOpen: true}
    case 'close':
      return {isOpen: false}
    default :
      throw new Error();
  }

}
const ToneSelector = () => {


  return (
    <>
      <PopUp className='popUp' onClick = {() => onClick()}>
        <Circle className='circle' />
      </PopUp>
    </>
  )
}

const PopUp = styled.nav`
  position: fixed;
  background-color: white;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  bottom: auto;
  right: auto;
  display: block;
  transform: translate(-50%,-50%);
  z-index: 10104;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.35);
`;

const Circle = styled.div`
  width: 250px;
  height: 250px;
  opacity: 0;

  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  transform: scale(0);

  -webkit-transition: all 0.4s ease-out;
  -moz-transition: all 0.4s ease-out;
  transition: all 0.4s ease-out;


.open.& {
  opacity: 1;

  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  transform: scale(1);
}

& a {
  text-decoration: none;
  color: white;
  display: block;
  height: 40px;
  width: 40px;
  line-height: 40px;
  margin-left: -20px;
  margin-top: -20px;
  position: absolute;
  text-align: center;

}

& a:hover {
  color: #eef;
}

`;

const menuButton = styled.div`
  & {
    position: absolute;
    top: calc(50% - 30px);
    left: calc(50% - 30px);
    text-decoration: none;
    text-align: center;
    color: #444;
    border-radius: 50%;
    display: block;
    height: 40px;
    width: 40px;
    line-height: 40px;
    padding: 10px;
    background: #dde;
  }

  &:hover {
    background-color: #eef;
  }
`;

export { toneReducer };
export default ToneSelector;