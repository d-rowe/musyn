/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NewButton from './newButton';
import JoinButton from './joinButton';
import Login from './login';

const Landing = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axios.get('/api/username')
      .then((response) => response.data)
      .then((name) => setUsername(name));
  }, []);

  return (
    <div>
      <section className="hero is-fullheight is-dark is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              Welcome to musyn
              {username ? `, ${username}` : null}
            </h1>
            <h2 className="subtitle">
              Let's make music together
            </h2>
            <ActionsWrapper>
              <NewButton />
              <JoinButton />
            </ActionsWrapper>
            {username
              ? null
              : (
                <LoginWrapper>
                  <Login />
                </LoginWrapper>
              )}
          </div>
        </div>
      </section>
    </div>
  );
};

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export default Landing;
