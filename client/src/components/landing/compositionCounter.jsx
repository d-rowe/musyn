import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompositionCounter = () => {
  const [count, setCount] = useState('');

  useEffect(() => {
    axios.get('/api/compositions')
      .then((response) => response.data.count)
      .then((countResp) => setCount(countResp));
  }, []);

  return (
    <h2 className="subtitle has-text-centered">
      {count ? `home to ${count} compositions and counting` : null}
    </h2>
  );
};

export default CompositionCounter;
