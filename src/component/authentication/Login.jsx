import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Section } from 'styles/SharedStyle';
import { auth } from '../../firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import styled from 'styled-components';
import gitIcon from '../../image/github-mark-white.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  // 로그인
  const formOnSubmit = async (event) => {
    event.preventDefault();
    try {
      // signInWithEmailAndPassword 현재 입력된 이메일이 파이어베이스에 있는 계정과 같은지 비교
      const userCredential = await signInWithEmailAndPassword(auth, email, pwd);
      console.log(userCredential);
      navigate('/');
    } catch (error) {
      alert('로그인 실패!');
      console.error(error);
    }
  };

  // 이메일
  const loginEmailInput = (e) => {
    setEmail(e.target.value);
  };

  // 비밀번호
  const loginPwdInput = (e) => {
    setPwd(e.target.value);
  };

  // 구글 인증 버튼
  const loginGoogleBtn = async () => {
    const provier = new GoogleAuthProvider();
    try {
      // signInWithPopup 연동되는 것을 팝업창으로 확인
      const result = await signInWithPopup(auth, provier);
      const user = result.user;
      navigate('/');
      alert('안녕하세요!');
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  // git 인증 버튼
  const loginGithubBtn = async () => {
    const provier = new GithubAuthProvider();
    try {
      // signInWithPopup 연동되는 것을 팝업창으로 확인
      const result = await signInWithPopup(auth, provier);
      const user = result.user;
      navigate('/');
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  // 비밀번호 찾기
  const loginFindPwd = () => {
    const emailCheck = window.prompt('이메일을 입력해주세요');

    // 이메일 확인 후 그 이메일에 메일 보냄
    sendPasswordResetEmail(auth, emailCheck)
      .then(() => {
        alert('이메일을 확인해주세요!');
      })
      .catch((error) => {
        alert('이메일을 제대로 확인해주세요!');
        console.log(error);
      });
  };

  return (
    <Section>
      <LoginDiv>
        <LoginMain>
          <LoginForm onSubmit={formOnSubmit}>
            ID <LoginInput id="inputLogin" type="email" value={email} onChange={loginEmailInput} required />
            PWD <LoginInput type="password" value={pwd} onChange={loginPwdInput} required />
            <LoginBtn type="submit">로그인</LoginBtn>
          </LoginForm>
          <LoginBtn onClick={loginGoogleBtn}>
            <LoginGitImg src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="google icon" />
            Google로 계속하기
          </LoginBtn>
          <LoginBtn onClick={loginGithubBtn}>
            <LoginGitImg src={gitIcon} alt="github icon" />
            Github로 계속하기
          </LoginBtn>
          <LoginLinkDiv>
            <Link to="/register">회원가입</Link>
            <LoginSpan onClick={loginFindPwd}>비밀번호 찾기</LoginSpan>
          </LoginLinkDiv>
        </LoginMain>
      </LoginDiv>
    </Section>
  );
};

export default Login;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.6rem;
  width: 100%;
`;

export const LoginInput = styled.input`
  padding: 0.6rem 1.25rem;
  border-radius: 3.2rem;
  border: none;
  width: 100%;
  font-size: 1rem;
  margin: 0 auto;
`;

export const LoginMain = styled.div`
  height: 28rem;
  display: flex;
  background-color: #f5f5f5;
  flex-direction: column;
  align-items: center;
  width: 30rem;
  padding: 4rem;
  gap: 0.6rem;
  font-weight: bold;
`;

export const LoginBtn = styled.button`
  background-color: black;
  color: white;
  padding: 0.6rem 1.25rem;
  border-radius: 3.2rem;
  border: none;
  width: 100%;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const LoginGitImg = styled.img`
  height: 1.5rem;
  padding-right: 1rem;
`;

export const LoginDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginLinkDiv = styled.div`
  margin: 1.5rem;
`;

const LoginSpan = styled.span`
  padding-left: 5rem;
  cursor: pointer;
`;
