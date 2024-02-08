import React from 'react';
import { HeaderBox } from 'styles/SharedStyle';
import logoImg from '../../image/logo.gif';

const Header = () => {
  return (
    <HeaderBox>
      <img src={logoImg} alt="로고" />
    </HeaderBox>
  );
};

export default Header;
