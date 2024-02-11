import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { HeaderBox, LayoutStyle } from 'styles/SharedStyle';
import logoImg from '../../image/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserDB } from '../../redux/modules/user';
import { useSelector } from 'react-redux';

const Header = () => {
  const [logoutBool, setLogoutBool] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const nowUser = useSelector((state) => state.user.nowUser);
  // 프로필사진
  const img = nowUser.user_img;

  // location의 정보에 로그인창, 회원가입창 이면 true
  const loginPage = location.pathname === '/login';
  const registerPage = location.pathname === '/register';

  // 로그인시 redux에 dispatch
  const signUser = () => {
    const userData = auth.currentUser;
    const user_id = userData.uid;
    const email = userData.email;
    const nickname = userData.displayName;
    const user_img = userData.photoURL;
    dispatch(
      setUserDB({
        user_id: user_id,
        email: email,
        nickname: nickname,
        user_img: user_img
      })
    );
    // 쿠키
    let todayDate = new Date();
    // 쿠키 1시간 유효기간 설정
    todayDate.setTime(todayDate.getTime() + 1 * 60 * 60 * 1000);
    document.cookie = `uid=${user_id}; expires=${todayDate.toUTCString()};path=/;`;
  };

  // 쿠키삭제
  const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/;';
  };

  // 로그아웃
  const logoutOnClick = () => {
    const logoutConfirm = window.confirm('로그아웃 하시겠습니까?');
    if (logoutConfirm) {
      //로그아웃
      signOut(auth)
        .then(() => {
          deleteCookie('uid');
          // Sign-out successful.
          alert('로그아웃이 되었어요!');
          navigate('/');
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    } else {
      return false;
    }
  };

  // 유저메뉴 열기 닫기
  const userIsActiveBtn = () => {
    setIsActive(!isActive);
  };

  // 다른곳 클릭 시 메뉴 끄기
  const userMenuOnBlur = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 200);
  };

  // 새글작성 이동
  const newPostBtnClick = () => {
    navigate('/write');
  };

  // 로그인 확인
  useEffect(() => {
    const loginCheck = () => {
      // 현재 유저가 로그인 되어있는지 확인
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLogoutBool(true);
          signUser();
        } else {
          setLogoutBool(false);
        }
      });
    };
    loginCheck();
  }, []);

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
              <>
                <NewPostBtn onClick={newPostBtnClick}>새 글 작성</NewPostBtn>
                <ImgStyle src={img} alt="프로필사진" />
                <UserMenuDiv onBlur={userMenuOnBlur}>
                  {/* 🔽 임시 */}
                  <UserBtn onClick={userIsActiveBtn}>🔽</UserBtn>
                  <UserUl isActive={isActive}>
                    <UserLi>
                      <StyledLink to="/mypage">마이페이지</StyledLink>
                    </UserLi>
                    <UserLi>
                      <Logout onClick={logoutOnClick}>로그아웃</Logout>
                    </UserLi>
                  </UserUl>
                </UserMenuDiv>
              </>
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
  display: flex;
  flex-direction: row;
`;

const Logout = styled.span`
  display: block;
  padding: 0.6rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const NewPostBtn = styled.button`
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: white;
  width: 5rem;
  height: 2rem;
  margin-right: 1rem;
  margin-top: 0.7rem;
  &:hover {
    transition-duration: 0.4s;
    background-color: black;
    color: white;
    border: none;
  }
`;

const ImgStyle = styled.img`
  width: 20%;
  height: 20%;
  object-fit: cover;
`;

const UserMenuDiv = styled.div`
  position: relative;
`;

const UserBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
`;

const UserUl = styled.ul`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  min-width: 160px;
  box-shadow: 0 0.5rem 2rem #f5f5f5;
  z-index: 1;
`;

const UserLi = styled.li`
  list-style: none;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 0.6rem;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #f5f5f5;
  }
`;
