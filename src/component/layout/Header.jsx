import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { HeaderBox, LayoutStyle } from 'styles/SharedStyle';
import logoImg from '../../image/logo.gif';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Header = () => {
  const [logoutBool, setLogoutBool] = useState(false);
  const nav = useNavigate();
  const location = useLocation();

  // location의 정보에 로그인창, 회원가입창 이면 true
  const loginPage = location.pathname === '/login';
  const registerPage = location.pathname === '/register';

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

  // 로그아웃
  const logoutOnClick = () => {
    const logoutConfirm = window.confirm('로그아웃 하시겠습니까?');
    if (logoutConfirm) {
      //로그아웃
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
          {/* location의 정보를 통해 로그인창 띄우기 */}
          {!loginPage && !registerPage ? (
            logoutBool ? (
              <Logout onClick={logoutOnClick}>로그아웃</Logout>
            ) : (
              <Link to="/login">로그인</Link>
            )
          ) : null}
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

const Logout = styled.span`
  cursor: pointer;
`;
