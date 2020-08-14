import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import './styles.scss';

axios.get('/api/tones')
  .then((tone)=> {
    ReactDOM.render(<App tones={tone.data} />, document.getElementById('root'));
  })
  .catch((err)=> err);
