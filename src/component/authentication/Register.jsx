import React, { useState } from 'react';
import { Section } from 'styles/SharedStyle';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { LoginBtn, LoginDiv, LoginForm, LoginInput, LoginMain } from './Login';

const Register = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');

  const nav = useNavigate();
  const signUp = async (event) => {
    event.preventDefault();
    if (pwd === pwdCheck) {
      try {
        await createUserWithEmailAndPassword(auth, email, pwd);
        alert('회원가입 완료!');
        nav('/login');
      } catch (error) {
        console.error(error);
        alert('회원가입이 실패했어요');
      }
    } else {
      alert('비밀번호가 달라요!');
    }
  };

  const registerNicknameInput = (e) => {
    setNickname(e.target.value);
  };
  const registerEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const registerPwdInput = (e) => {
    setPwd(e.target.value);
  };
  const registerPwdCheckInput = (e) => {
    setPwdCheck(e.target.value);
  };

  return (
    <Section>
      <LoginDiv>
        <LoginMain>
          <LoginForm onSubmit={signUp}>
            닉네임{' '}
            <LoginInput minLength="2" maxLength="10" value={nickname} onChange={registerNicknameInput} required />
            이메일 <LoginInput type="email" value={email} onChange={registerEmailInput} required />
            비밀번호 <LoginInput minLength="6" type="password" value={pwd} onChange={registerPwdInput} required />
            비밀번호 확인{' '}
            <LoginInput
              minLength="6"
              maxLength="13"
              type="password"
              value={pwdCheck}
              onChange={registerPwdCheckInput}
              required
            />
            <LoginBtn type="submit">회원가입</LoginBtn>
          </LoginForm>
          <Link to={'/login'}>뒤로가기</Link>
        </LoginMain>
      </LoginDiv>
    </Section>
  );
};

export default Register;
