import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CompositionCounter = () => {
  const [count, setCount] = useState('');

  useEffect(() => {
    axios.get('/api/compositions')
      .then((response) => response.data.count)
      .then((countResp) => setCount(countResp));
  }, []);

  return (
    <Subtitle className="subtitle">
      {count ? `Home to ${count} compositions and counting` : null}
    </Subtitle>
  );
};

const Subtitle = styled.h2`
  margin-top: 2em;
  margin-bottom: 5em;
`;

export default CompositionCounter;
