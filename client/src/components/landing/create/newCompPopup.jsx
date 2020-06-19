/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../../general/modal';
import Card from '../../general/card';
import redirectToHash from '../../../helpers/redirectToHash';


const NewCompPopup = ({ active }) => {
  const [title, setTitle] = useState('');

  const createComposition = () => {
    axios.post('/api/compositions', { title })
      .then((response) => response.data)
      .then(({ hash }) => redirectToHash(hash))
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert('Encountered problem creating composition:', err);
      });
  };

  return (
    <Modal active={active}>
      <Card title="New Composition" submitLabel="Create" onSubmit={createComposition}>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label type="label" className="label">
              Title
            </label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Mahler Symphony No. 5"
                  defaultValue="Untitled Composition"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default NewCompPopup;
