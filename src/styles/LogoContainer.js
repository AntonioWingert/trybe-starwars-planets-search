import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo-sw.svg';
import Circle from '../assets/circle.svg';

function LogoContainer() {
  return (
    <Container>
      <img
        src={ Logo }
        alt="logo-star-wars"
        className="logo"
      />
    </Container>
  );
}

export default LogoContainer;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: no-repeat;
  background-image: url(${Circle});
  background-size: 790px 700px cover;
  background-position: center 0;
  height: 900px;

  .logo {
    position: relative;
    top: 15vh;
  }
`;
