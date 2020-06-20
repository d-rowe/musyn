/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled from 'styled-components';
import NewButton from './newButton';
import JoinButton from './joinButton';

const Landing = () => (
  <div>
    <section className="hero is-fullheight is-dark is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            Welcome to musyn
          </h1>
          <h2 className="subtitle">
            Let's create music together
          </h2>
          <ActionsWrapper>
            <NewButton />
            <JoinButton />
          </ActionsWrapper>
        </div>
      </div>
    </section>
  </div>
);

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Landing;
