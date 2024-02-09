import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { HeaderBox, LayoutStyle } from 'styles/SharedStyle';
import logoImg from '../../image/logo.gif';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Header = () => {
  const [logoutBool, setLogoutBool] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const loginCheck = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLogoutBool(true);
        } else {
          setLogoutBool(false);
        }
      });
    };
    loginCheck();
  }, []);

  const logoutOnClick = () => {
    const logoutConfirm = window.confirm('로그아웃 하시겠습니까?');
    if (logoutConfirm) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          alert('로그아웃이 되었어요!');
          nav('/');
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    } else {
      return false;
    }
  };

  return (
    <HeaderBox>
      <LayoutStyle>
        <Link to="/">
          <Logo src={logoImg} alt="로고" />
        </Link>
        <RightMenu>
          {logoutBool ? <span onClick={logoutOnClick}>로그아웃</span> : <Link to="/login">로그인</Link>}
        </RightMenu>
      </LayoutStyle>
    </HeaderBox>
  );
};

export default Header;

const Logo = styled.img`
  width: 8rem;
`;

const RightMenu = styled.div`
  & a {
    padding: 0.5rem;
  }
`;
