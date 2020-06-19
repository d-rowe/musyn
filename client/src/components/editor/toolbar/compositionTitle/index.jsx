import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

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
  const inputEl = useRef(null);
  const [title, setTitle] = useState('Untitled Composition');
  const [editMode, setEditMode] = useState(false);

  const onBlur = () => {
    const text = inputEl.current.value;
    if (text.length > 0) {
      setTitle(text);
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
