import React, { useState } from 'react';
import NewCompPopup from './newCompPopup';

const CreateButton = () => {
  const [popupActive, setPopupActive] = useState(false);

  return (
    <>
      <NewCompPopup active={popupActive} />
      <button
        type="button"
        className="button is-link"
        onClick={() => {
          setPopupActive(true);
        }}
      >
        New Composition
      </button>
    </>
  );
};

export default CreateButton;
