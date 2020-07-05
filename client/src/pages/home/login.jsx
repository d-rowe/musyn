import React from 'react';
import styled from 'styled-components';

const Login = () => (
  <Wrapper>
    <h2 className="subtitle">Login</h2>
    <SocialWrapper>
      <form action="/auth/github">
        <SocialButton type="submit" className="button is-medium">
          <span className="icon">
            <i className="fab fa-github fa-lg" />
          </span>
        </SocialButton>
      </form>
      <form action="/auth/google">
        <SocialButton type="submit" className="button is-medium">
          <span className="icon">
            <i className="fab fa-google fa-lg" />
          </span>
        </SocialButton>
      </form>
    </SocialWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 200px;
`;

const SocialWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SocialButton = styled.button`
  margin: 0 10px 0 10px;
`;

export default Login;
