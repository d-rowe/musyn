import React, { useState, useEffect } from 'react';
import Popup from './popup';
import ButtonWrapper from '../buttonWrapper';

const NewButton = () => {
  const [popupHasOpened, setPopupHasOpened] = useState(false);
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    if (popupHasOpened && !popupActive) {
      setPopupActive(true);
    }
  }, [popupActive]);

  return (
    <>
      <Popup active={popupActive} />
      <ButtonWrapper>

        <button
          type="button"
          className="button is-medium"
          onClick={() => {
            if (popupHasOpened) {
              setPopupActive(false);
            } else {
              setPopupActive(true);
              setPopupHasOpened(true);
            }
          }}
        >
          <span className="icon">
            <i className="fas fa-plus-circle" />
          </span>
          <span>New</span>
        </button>
      </ButtonWrapper>
    </>
  );
};

export default NewButton;
