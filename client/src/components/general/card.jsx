/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const Card = (
  {
    title = 'Musyn',
    submitLabel = 'Go',
    onSubmit = () => { },
    children,
  },
) => (
  <div className="card">
    <header className="card-header is-dark">
      <p className="card-header-title">
        {title}
      </p>
      <a href="#" className="card-header-icon" aria-label="more options">
        <span className="icon">
          <i className="fas fa-angle-down" aria-hidden="true" />
        </span>
      </a>
    </header>
    <div className="card-content">
      <div className="content">
        {children}
      </div>
    </div>
    <footer className="card-footer">
      <a className="card-footer-item" onClick={onSubmit}>{submitLabel}</a>
      <a className="card-footer-item">Nevermind</a>
    </footer>
  </div>
);

export default Card;
