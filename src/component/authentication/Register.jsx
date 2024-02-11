import React, { useState } from 'react';
import { Section } from 'styles/SharedStyle';
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { LoginBtn, LoginDiv, LoginForm, LoginInput, LoginMain } from './Login';

const Register = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');

  const navigate = useNavigate();

  // 회원가입
  const signUp = async (event) => {
    event.preventDefault();
    if (pwd === pwdCheck) {
      try {
        // createUserWithEmailAndPassword 계정새로만들기
        const userCreate = await createUserWithEmailAndPassword(auth, email, pwd);
        const user = userCreate.user;
        // 닉네임 지정, 기본프로필지정
        await updateProfile(user, {
          displayName: nickname,
          // import 해서 가져오면 안뜨는 오류 때문에 github에서 이미지링크로 가져왔습니다
          photoURL: 'https://github.com/cheolgyun7/deve11og/blob/dev/src/image/userImage.png?raw=true'
        });
        // 회원가입하면 자동로그인 방지 위해 여기서 로그아웃
        signOut(auth);

        alert('회원가입 완료! 로그인해주세요!');
        navigate('/login');
      } catch (error) {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          // 중복된 이메일 주소
          alert('중복된 이메일 주소입니다.');
        } else {
          console.error(error);
        }
      }
    } else {
      alert('비밀번호가 달라요!');
    }
  };

  // 닉네임
  const registerNicknameInput = (e) => {
    setNickname(e.target.value);
  };

  // 이메일
  const registerEmailInput = (e) => {
    setEmail(e.target.value);
  };

  // 비밀번호
  const registerPwdInput = (e) => {
    setPwd(e.target.value);
  };

  // 비밀번호확인
  const registerPwdCheckInput = (e) => {
    setPwdCheck(e.target.value);
  };

  return (
    <Section>
      <LoginDiv>
        <LoginMain>
          <LoginForm onSubmit={signUp}>
            ID <LoginInput type="email" value={email} onChange={registerEmailInput} required />
            PWD <LoginInput minLength="6" type="password" value={pwd} onChange={registerPwdInput} required />
            PWD Check{' '}
            <LoginInput
              minLength="6"
              maxLength="13"
              type="password"
              value={pwdCheck}
              onChange={registerPwdCheckInput}
              required
            />
            닉네임{' '}
            <LoginInput minLength="2" maxLength="10" value={nickname} onChange={registerNicknameInput} required />
            <LoginBtn type="submit">회원가입</LoginBtn>
          </LoginForm>
          <Link to={'/login'}>뒤로가기</Link>
        </LoginMain>
      </LoginDiv>
    </Section>
  );
};

export default Register;
