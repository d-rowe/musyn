/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const Card = ({
  title = 'Musyn',
  submitLabel = 'Go',
  onSubmit = () => { },
  children,
}) => (
  <article className="message is-link">
    <div className="message-header">
      {title}
    </div>
    <div className="message-body">
      {children}
      <button type="button" className="button is-success is-fullwidth" onClick={onSubmit}>
        {submitLabel}
      </button>
    </div>
  </article>
);

export default Card;
