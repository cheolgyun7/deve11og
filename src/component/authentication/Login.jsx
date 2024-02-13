import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Section } from 'styles/SharedStyle';
import { auth, db } from '../../firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import styled from 'styled-components';
import gitIcon from '../../image/github-mark-white.svg';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { setUserLoginDB } from '../../redux/modules/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();
  const userloginDB = useSelector((state) => state.user.userloginDB);
  const dispatch = useDispatch();
  const collectionRef = collection(db, 'usersDB');

  // 로그인
  const formOnSubmit = async (event) => {
    event.preventDefault();
    // 이메일 검사
    const emailTest = userloginDB.some((prev) => prev.email === email);

    if (!emailTest) {
      alert('이메일이 존재 하지 않습니다');
      return false;
    }
    try {
      // signInWithEmailAndPassword 현재 입력된 이메일이 파이어베이스에 있는 계정과 같은지 비교
      const userCredential = await signInWithEmailAndPassword(auth, email, pwd);
      console.log(userCredential);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        // 비밀번호 에러
        alert('비밀번호를 확인해주세요');
        console.log('비밀번호', errorCode);
      }
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
      const newData = {
        nickname: user.displayName,
        email: user.email,
        user_img: user.photoURL,
        user_id: user.uid
      };

      const docRef = doc(collectionRef, user.uid);
      await setDoc(docRef, newData);
      const q = query(collection(db, 'usersDB'));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const initial = [];
      querySnapshot.forEach((doc) => {
        initial.push({ ...doc.data() });
      });
      dispatch(setUserLoginDB([...initial]));
      navigate('/');
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
      // const nicknameIncludes = userloginDB.some((prev) => prev.nickname === user.displayName);

      // if (nicknameIncludes) {
      //   // 닉네임이 이미 존재하는 경우 새로운 닉네임 생성
      //   const newNickname = user.displayName + '_' + Math.floor(Math.random() * 1000);

      //   // 새로운 닉네임으로 프로필 업데이트
      //   await updateProfile(user, {
      //     displayName: newNickname
      //   });

      //   // 사용자 정보에 새로운 닉네임 반영
      //   user.displayName = newNickname;
      // }

      const newData = {
        nickname: user.displayName,
        email: user.email,
        user_img: user.photoURL,
        user_id: user.uid
      };

      const docRef = doc(collectionRef, user.uid);
      await setDoc(docRef, newData);
      const q = query(collection(db, 'usersDB'));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const initial = [];
      querySnapshot.forEach((doc) => {
        initial.push({ ...doc.data() });
      });
      dispatch(setUserLoginDB([...initial]));
      // navigate('/');
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
