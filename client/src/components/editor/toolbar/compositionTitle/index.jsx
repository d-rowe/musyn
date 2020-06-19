import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import messenger from '../../score/controller/messenger';
import getHash from '../../../../helpers/getHash';

const Title = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const EditTitle = styled.input`
  background-color: hsl(0, 0%, 21%);
  color: white;
  text-align: center;
`;

const CompositionTitle = () => {
  const hash = getHash();
  const inputEl = useRef(null);
  const [title, setTitle] = useState('');
  const [editMode, setEditMode] = useState(false);

  messenger.onRename((msg) => setTitle(msg.title));

  const fetchTitle = () => {
    axios.get(`/api/compositions/${hash}`)
      .then((response) => response.data)
      .then((comp) => setTitle(comp.title));
  };

  useEffect(fetchTitle, []);

  const onBlur = () => {
    const text = inputEl.current.value;

    if (text.length > 0) {
      setTitle(text);
      messenger.rename(text);
      axios.put(`/api/compositions/${hash}`, { title: text });
    }
    setEditMode(false);
  };

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  });


  if (editMode) {
    return (
      <Title>
        <EditTitle
          ref={inputEl}
          className="input"
          type="text"
          defaultValue={title}
          onBlur={() => onBlur()}
          onKeyDown={(e) => e.keyCode === 13 && inputEl.current.blur()}
        />
      </Title>
    );
  }

  return (
    <Title onClick={() => setEditMode(true)}>
      {title}
    </Title>
  );
};

export default CompositionTitle;
