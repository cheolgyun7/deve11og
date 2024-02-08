import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Section } from 'styles/SharedStyle';
import { auth } from '../../firebase';
import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';
import gitIcon from '../../image/github-mark-white.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const formOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pwd);
      console.log(userCredential);
      navigate('/');
    } catch (error) {
      alert('로그인 실패!');
      console.error(error);
    }
  };

  const loginEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const loginPwdInput = (e) => {
    setPwd(e.target.value);
  };

  const loginGoogleBtn = async () => {
    const provier = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provier);
      const user = result.user;
      navigate('/');
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const loginGithubBtn = async () => {
    const provier = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provier);
      const user = result.user;
      navigate('/');
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Section>
      <LoginDiv>
        <LoginMain>
          <LoginForm onSubmit={formOnSubmit}>
            Email <LoginInput type="email" value={email} onChange={loginEmailInput} required />
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
          <Link to="/register">회원가입</Link>
          <Link>비밀번호 찾기</Link>
        </LoginMain>
      </LoginDiv>
    </Section>
  );
};

export default Login;

export const LoginForm = styled.form`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
`;

export const LoginInput = styled.input`
  padding: 0.6rem 1.25rem;
  border-radius: 3.2rem;
  border: none;
  width: 100%;
  font-size: 1rem;
`;

export const LoginMain = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 26rem;
  padding: 3.2rem 0rem;
  gap: 0.6rem;
`;

export const LoginBtn = styled.button`
  background-color: #8930fe;
  padding: 0.6rem 1.25rem;
  border-radius: 3.2rem;
  border: none;
  width: 100%;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginGitImg = styled.img`
  height: 1.5rem;
  padding-right: 1rem;
`;

export const LoginDiv = styled.div`
  display: flex;
  justify-content: center;
`;
