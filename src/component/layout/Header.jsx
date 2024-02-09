import styled from 'styled-components';
import React from 'react';
import { HeaderBox, LayoutStyle } from 'styles/SharedStyle';
import logoImg from '../../image/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderBox>
      <LayoutStyle>
        <Link to="/">
          <Logo src={logoImg} alt="로고" />
        </Link>
        <RightMenu>
          <Link to="/login">로그인</Link>
          <Link to="/register">회원가입</Link>
        </RightMenu>
      </LayoutStyle>
    </HeaderBox>
  );
};

export default Header;

const Logo = styled.img`
  width: 15rem;
`;

const RightMenu = styled.div`
  & a {
    padding: 0.5rem;
  }
`;
