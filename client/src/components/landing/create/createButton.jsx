import React, { useState, useEffect } from 'react';
import NewCompPopup from './newCompPopup';

const CreateButton = () => {
  const [popupHasOpened, setPopupHasOpened] = useState(false);
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    if (popupHasOpened && !popupActive) {
      setPopupActive(true);
    }
  }, [popupActive]);

  return (
    <>
      <NewCompPopup active={popupActive} />
      <button
        type="button"
        className="button is-link"
        onClick={() => {
          if (popupHasOpened) {
            setPopupActive(false);
          } else {
            setPopupActive(true);
            setPopupHasOpened(true);
          }
        }}
      >
        New Composition
      </button>
    </>
  );
};

export default CreateButton;
