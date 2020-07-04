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
            Let's write music together
          </h2>
          <ActionsWrapper>
            <NewButton />
            <JoinButton />
          </ActionsWrapper>
          <br />
          <h2 className="subtitle">
            Login
          </h2>
          <form action="/auth/google">
            <button type="submit" className="button">
              <i className="fab fa-google" />
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
);

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default Landing;
