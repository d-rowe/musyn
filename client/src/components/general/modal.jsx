/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';

const Modal = ({ active = false, width = '25em', children }) => {
  const [isActive, setIsActive] = useState(active);

  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', handleEsc, true);
      setIsActive(false);
    }
  };

  useEffect(() => setIsActive(active), [active]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleEsc, true);
    }
  }, [isActive]);


  if (!isActive) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => setIsActive(false)} />
      <div className="modal-content" style={{ width }}>
        {children}
      </div>
      <button
        type="button"
        className="modal-close
          is-large"
        aria-label="close"
        onClick={() => setIsActive(false)}
      />
    </div>
  );
};

export default Modal;
