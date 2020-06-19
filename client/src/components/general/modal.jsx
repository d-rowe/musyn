/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';

const Modal = ({ active = false, children }) => {
  const [isActive, setIsActive] = useState(active);
  useEffect(() => setIsActive(active), [active]);

  if (!isActive) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => setIsActive(false)} />
      <div className="modal-content">
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
