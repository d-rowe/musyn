import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cursors from '../score/model/cursors';

const imgLocation = '/assets/svg/';
const imgExtension = 'svg';

const NoteDurations = () => {
  const stateClasses = { active: 'is-link', nonActive: 'is-light' };
  const [duration, setDuration] = useState(1024);
  const eighth = 512;
  const quarter = 1024;
  const half = 2048;
  const whole = 4096;

  useEffect(() => {
    cursors.setDuration(duration);
  }, [duration]);

  return (
    <Wrapper>
      <Button
        className={`button ${duration === eighth ? stateClasses.active : stateClasses.nonActive}`}
        onClick={() => setDuration(eighth)}
        img="eighth_note"
      />
      <Button
        className={`button ${duration === quarter ? stateClasses.active : stateClasses.nonActive}`}
        onClick={() => setDuration(quarter)}
        img="quarter_note"
      />
      <Button
        className={`button ${duration === half ? stateClasses.active : stateClasses.nonActive}`}
        onClick={() => setDuration(half)}
        img="half_note"
      />
      <Button
        className={`button ${duration === whole ? stateClasses.active : stateClasses.nonActive}`}
        onClick={() => setDuration(whole)}
        img="whole_note"
      />
    </Wrapper>
  );
};

export default NoteDurations;

const Wrapper = styled.div`
  display: flex;
`;

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
