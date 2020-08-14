import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import paths from 'config/paths';

const imgLocation = '/assets/img/';
const imgExtension = 'svg';

const toneReducer = (state, action) => {
  switch(action.type) {
    case 'open':
      return {isOpen: true}
    case 'close':
      return {isOpen: false}
    default:
      throw new Error();
  }
  }

const ToneSelector = ({tones}) => {
  let l = tones.length;
  const EXTENSION = '.svg';
  return (
    <>
      <PopUp className='popUp' >
        <Circle className='circle'>
           {
             tones.map((tone,i)=>{
               let left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
               let top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
               let background = `url(${paths.image}${tone}${EXTENSION})`;
               let divStyle = {
               left: left,
               top: top,
               background: background
             };
             return (
               <Icon className='icon' id={tone} key={tone+i} style={divStyle} >
                <ToolTip>{tone}</ToolTip>
               </Icon>

             );
           })}
        </Circle>
      </PopUp>
    </>
  )
};

const PopUp = styled.nav`
  position: fixed;
  border-radius: 50%;
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
  opacity: 1;
`;

const Icon = styled.div`
    text-decoration: none;
    color: white;
    display: block;
    height: 35px;
    width: 35px;
    line-height: 40px;
    margin-left: -20px;
    margin-top: -20px;
    position: absolute;
    text-align: center;

  &:hover {
    color: blue;
  }`;

  const ToolTip = styled.span`
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  .icon:hover & {
    visibility: visible;
    opacity: 1;
  }
  `;

export { toneReducer };
export default ToneSelector;