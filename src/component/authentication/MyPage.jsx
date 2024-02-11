import styled from 'styled-components';
import { db, storage } from '../../firebase';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { Section } from 'styles/SharedStyle';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import userDefaultImage from '../../image/userImage.png';
import { getAuth, signOut, updatePassword } from 'firebase/auth';

const MyPage = () => {
  const [selectedFile, setSelectedFile] = useState(null); //업로드를 위해 선택한 이미지
  const [userInfo, setUserInfo] = useState(''); //firestore 에서 가져온 user 정보
  const imgRef = useRef(null);
  const TEST_ID = 'GD58BJjuxnlpOTsuXCcP'; //테스트 하실 계정의 식별 가능한 id 값을 넣어주세요! (firestore에서 자동 부여된 값)
  const [isEditing, setIsEditing] = useState(false); //수정 상태
  const nicknameRef = useRef(null);
  const [nickname, setNickname] = useState('');

  //유저 Auth 조회
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);

  //비밀번호 변경 - 메일로 보내기
  const changePassword = () => {
    const user = auth.currentUser;
    const newPassword = 'a123456';

    updatePassword(user, newPassword)
      .then(() => {
        alert('비밀번호가 변경되었습니다.');
      })
      .catch((error) => {
        console.log(error);
        alert('비밀번호 변경 중 에러가 발생하였습니다. 잠시 후 다시 시도해주세요');
      });
  };

  //로그아웃
  const logout = () => {
    signOut(auth)
      .then(() => {
        alert('로그아웃되었습니다. 메인으로 이동합니다.');
      })
      .catch((error) => {
        console.log(error);
        alert('에러가 발생했습니다. 다시 시도해주세요');
      });
  };

  //유저 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'user', TEST_ID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log('data: ', docSnap.data());
        // console.log('docSnap', docSnap.id);
        setUserInfo(docSnap.data());
        setNickname(docSnap.data().nickname);
      } else {
        console.log('no data!!');
      }
    };

    fetchData();
  }, []);

  const fileSelect = async (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    //파일 업로드
    if (window.confirm('선택한 이미지로 업로드를 진행할까요?')) {
      const imageRef = ref(storage, `${TEST_ID}/${selectedFile.name}`); //TODO : 식별 가능한 Id로 경로 변경 예정
      await uploadBytes(imageRef, selectedFile);

      //파일 업로드 후 state로 저장
      const downloadURL = await getDownloadURL(imageRef);
      setUserInfo((prev) => {
        return {
          ...prev,
          user_img: downloadURL
        };
      });

      //파일 업로드 db 업데이트
      const docRef = doc(db, 'user', TEST_ID);
      await setDoc(docRef, {
        ...userInfo,
        user_img: downloadURL
      });
      setSelectedFile(null);
      alert('업로드가 완료되었습니다.');
    } else {
      alert('업로드를 취소했습니다.');
    }
  };

  //이미지 삭제
  const handleRemove = () => {
    if (!window.confirm('이미지 삭제를 진행할까요?')) return alert('삭제를 취소하였습니다.');
    const storage = getStorage();
    const path = ref(storage, userInfo.user_img).fullPath;
    const desertRef = ref(storage, path);
    deleteObject(desertRef)
      .then(async () => {
        //파일 업로드 db 업데이트
        const docRef = doc(db, 'user', TEST_ID);
        await setDoc(docRef, {
          ...userInfo,
          user_img: userDefaultImage
        });
        setUserInfo((prev) => {
          return {
            ...prev,
            user_img: userDefaultImage
          };
        });
        alert('삭제를 완료하였습니다.');
      })
      .catch((error) => {
        console.log(error);
        alert('삭제를 실패하였습니다. 잠시 후 다시 시도해주세요.');
      });
  };

  //유저 정보(닉네임) 수정 - 활성화 기능
  const handleEdit = () => {
    nicknameRef.current.readOnly = false;
    nicknameRef.current.focus();
    setIsEditing(true);
  };

  //유저 정보(닉네임) 수정 취소 - 비활성화 기능
  const handleEditCancel = () => {
    setNickname(userInfo.nickname);
    nicknameRef.current.readOnly = true;
    setIsEditing(false);
  };

  //유저 정보(닉네임) 수정 기능
  const handleSave = async () => {
    if (!nickname.trim()) {
      return alert('닉네임을 입력해주세요.');
    }
    if (userInfo.nickname === nickname) {
      return alert('이전 닉네임과 같습니다.');
    }

    //정보 수정
    const docRef = doc(db, 'user', TEST_ID);
    await setDoc(docRef, {
      ...userInfo,
      nickname
    });
    setUserInfo((prev) => {
      return {
        ...prev,
        nickname
      };
    });

    alert('수정이 완료되었습니다.');
    setIsEditing(false);
  };

  //닉네임 change
  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  //userImage가 변경될 때 마다 실행
  //userImage 업로드한 이미지로 보여줌
  useEffect(() => {
    imgRef.current.src = userInfo.user_img;
  }, [userInfo]);

  //이미지 에러 시 기본 이미지로 셋팅
  const errorImage = (e) => {
    e.target.src = userDefaultImage;
  };

  return (
    <Section>
      <PageTitleStyle>마이페이지</PageTitleStyle>
      <TopUserInfoStyle>
        <LeftAreaStyle>
          <FigureStyle>
            {/* TODO: 렌더링 되고 나서 이미지를 가져와서 늦게가져옴... 확인 필요 */}
            <img src={userInfo.user_img} onError={errorImage} ref={imgRef} alt="유저 이미지" />
          </FigureStyle>
          <FileLabelStyle>
            이미지 업로드
            <input type="file" onChange={fileSelect} />
          </FileLabelStyle>
          {!selectedFile ? <></> : <button onClick={handleUpload}>등록</button>}
          <BtnBlackText onClick={handleRemove}>이미지 제거</BtnBlackText>
        </LeftAreaStyle>
        <RightAreaStyle>
          <TitleStyle>닉네임 변경</TitleStyle>
          <label htmlFor="nickname">닉네임 : </label>
          <InputStyle
            type="text"
            id="nickname"
            value={nickname}
            ref={nicknameRef}
            onChange={handleChange}
            readOnly
            minLength="2"
            maxLength="10"
          />
          {isEditing ? (
            <>
              <BtnBlackBg onClick={handleSave}>저장</BtnBlackBg>
              <BtnBlackText onClick={handleEditCancel}>취소</BtnBlackText>
            </>
          ) : (
            <BtnBlackBg onClick={handleEdit}>수정</BtnBlackBg>
          )}
          <PasswordArea>
            <TitleStyle>비밀번호 변경</TitleStyle>
            <label htmlFor="currentPassword">현재 비밀번호</label>
            <PasswordInputStyle type="password" id="currentPassword" placeholder="현재 비밀번호를 입력해주세요." />
            <label htmlFor="newPassword">비밀번호</label>
            <PasswordInputStyle
              type="password"
              id="newPassword"
              minLength="6"
              maxLength="13"
              placeholder="비밀번호를 입력해주세요."
            />
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <PasswordInputStyle
              type="password"
              id="confirmPassword"
              minLength="6"
              maxLength="13"
              placeholder="비밀번호를 입력해주세요."
            />
            <BtnAreaStyle>
              <BtnBlackBg type="button">변경</BtnBlackBg>
              <BtnBlackBg type="button" onClick={changePassword}>
                비밀번호 재설정
              </BtnBlackBg>
              <BtnBlackText onClick={logout}>로그아웃</BtnBlackText>
            </BtnAreaStyle>
          </PasswordArea>
          <div>
            <TitleStyle>내 게시물 보기</TitleStyle>
          </div>
          <p>유저 이메일 : {userInfo.email}</p>
        </RightAreaStyle>
      </TopUserInfoStyle>
    </Section>
  );
};

export default MyPage;

const BtnNormalStyle = styled.button`
  padding: 0.2rem 0.4rem;
  font-size: 0.9rem;
  transition: 0.3s;
`;
const BtnBlackBg = styled(BtnNormalStyle)`
  background: #000000;
  border: 1px solid #000000;
  color: #fff;
  border-radius: 5px;
`;
const BtnBlackText = styled(BtnNormalStyle)`
  background: #ffffff;
  border: 1px solid #ffffff;
  color: #000000;
  border-radius: 5px;
`;

const PageTitleStyle = styled.h2`
  /* position: relative; */
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: bold;

  &::before {
    content: '';
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    background-color: #9fffbaa6;
    border-radius: 50%;
    transform: translate(0.6rem, -0.6rem);
  }
`;

const TopUserInfoStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LeftAreaStyle = styled.div`
  padding: 1rem;

  ${BtnBlackText} {
    margin-top: 0.5rem;
    display: block;
    width: 100%;
  }
`;

const RightAreaStyle = styled.div`
  padding: 1rem;
  border-left: 1px solid #dddddd;

  & button + button {
    margin-left: 0.5rem;
  }
`;

const TitleStyle = styled.h3`
  margin: 1rem auto 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
`;

const FigureStyle = styled.figure`
  margin-bottom: 1rem;
  width: 150px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 50%;
  text-align: center;
  overflow: hidden;

  & img {
    width: 100%;
  }
`;

const FileLabelStyle = styled.label`
  padding: 0.5rem;
  display: block;
  text-align: center;
  border-radius: 5px;
  background: #fefbba;
  color: #000;
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.9rem;

  &:hover {
    background: #e2de92;
  }

  & input {
    display: none;
  }
`;

const InputStyle = styled.input`
  padding: 0.4rem;
  border: none;
  font-size: 1rem;

  &:read-only {
    outline: none;
  }
`;

const PasswordArea = styled.div`
  margin-top: 2rem;

  & label {
    margin: 0.5rem auto;
    display: block;
  }
`;

const PasswordInputStyle = styled.input`
  height: 30px;
  padding: 0 0.4rem;
  border: 1px solid #ddd;
  font-size: 1rem;
  border-radius: 5px;
`;

const BtnAreaStyle = styled.div`
  margin: 0.5rem 0;
`;
