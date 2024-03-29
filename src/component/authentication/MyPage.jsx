import styled from 'styled-components';
import { auth, db, storage } from '../../firebase';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { BtnBlackBg, BtnBlackText, Section } from 'styles/SharedStyle';
import userDefaultImage from '../../image/userImage.png';
import { sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage, updateNickname } from '../../redux/modules/user';
import MyBoardList from 'component/crudcomponent/MyBoardList';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const MyPage = () => {
  const dispatch = useDispatch();
  const { user_id, email, nickname: nicknameData, user_img } = useSelector((state) => state.user.nowUser);

  const [isEditing, setIsEditing] = useState(false); //수정 상태
  const [nickname, setNickname] = useState('');
  const [isImageRemovable, setIsImageRemovable] = useState(false);

  const nicknameRef = useRef(null);
  //기본 이미지
  const DEFAULT_IMAGE = 'https://github.com/cheolgyun7/deve11og/blob/dev/src/image/userImage.png?raw=true';

  const fileSelect = async (event) => {
    const file = event.target.files[0];

    if (window.confirm('선택한 이미지로 업로드를 진행할까요?')) {
      const imageRef = ref(storage, `${user_id}/${file.name}`);
      await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(imageRef);
      // 파이어스토어 이미지 변경
      const imgRef = doc(db, 'usersDB', user_id);
      const docSnap = await getDoc(imgRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        await updateDoc(imgRef, { ...userData, user_img: downloadURL });
      }

      dispatch(updateImage(downloadURL));

      updateProfile(auth.currentUser, {
        photoURL: downloadURL
      })
        .then(() => {
          alert('업로드가 완료되었습니다.');
        })
        .catch((error) => {
          console.log(error);
          alert('에러가 발생했습니다. 다시 시도해주세요.');
        });
    } else {
      alert('업로드를 취소했습니다.');
    }
  };

  //이미지 삭제
  const handleRemove = () => {
    if (!window.confirm('이미지 삭제를 진행할까요?')) return alert('삭제를 취소하였습니다.');
    const storage = getStorage();
    const path = ref(storage, user_img).fullPath;
    const desertRef = ref(storage, path);
    deleteObject(desertRef)
      .then(async () => {
        // 파이어스토어 이미지 변경
        const imgRef = doc(db, 'usersDB', user_id);
        const docSnap = await getDoc(imgRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          await updateDoc(imgRef, { ...userData, user_img: DEFAULT_IMAGE });
        }

        dispatch(updateImage(DEFAULT_IMAGE));

        updateProfile(auth.currentUser, {
          photoURL: DEFAULT_IMAGE
        })
          .then(() => {
            alert('삭제가 완료되었습니다.');
          })
          .catch((error) => {
            console.log(error);
            alert('에러가 발생했습니다. 다시 시도해주세요.');
          });
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
    setNickname(nicknameData);
    nicknameRef.current.readOnly = true;
    setIsEditing(false);
  };

  //유저 정보(닉네임) 수정 기능
  const handleSave = async () => {
    if (!nickname.trim()) {
      return alert('닉네임을 입력해주세요.');
    }
    if (nicknameData === nickname) {
      return alert('이전 닉네임과 같습니다.');
    }

    dispatch(updateNickname(nickname));

    // 파이어스토어 닉네임변경

    const nameRef = doc(db, 'usersDB', user_id);
    const docSnap = await getDoc(nameRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      await updateDoc(nameRef, { ...userData, nickname: nickname });
    }

    updateProfile(auth.currentUser, {
      displayName: nickname
    })
      .then(() => {
        alert('수정이 완료되었습니다.');
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
        alert('에러가 발생했습니다. 다시 시도해주세요.');
      });
  };

  //닉네임 change
  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  //비밀번호 재설정
  const changePassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('재설정 메일을 발송하였습니다.');
      })
      .catch((error) => {
        console.error(error);
        alert('에러가 발생했습니다. 다시 시도해주세요.');
      });
  };

  useEffect(() => {
    setNickname(nicknameData);
  }, [nicknameData]);

  //이미지 에러 시 기본 이미지로 셋팅
  const errorImage = (e) => {
    e.target.src = userDefaultImage;
  };

  useEffect(() => {
    const googleImg = user_img ? user_img.indexOf('googleusercontent') : -1;
    const githubImg = user_img ? user_img.indexOf('githubusercontent') : -1;
    if (googleImg < 0 && githubImg < 0 && user_img !== null && user_img !== DEFAULT_IMAGE) {
      setIsImageRemovable(true);
    }
  }, [user_img]);

  return (
    <Section>
      <PageTitleStyle>마이페이지</PageTitleStyle>
      <TopUserInfoStyle>
        <LeftAreaStyle>
          <FigureStyle>
            {/* TODO: 렌더링 되고 나서 이미지를 가져와서 늦게가져옴... 확인 필요 */}
            <img src={!user_img ? DEFAULT_IMAGE : user_img} onError={errorImage} alt="유저 이미지" />
          </FigureStyle>
          <FileLabelStyle>
            이미지 업로드
            <input type="file" onChange={fileSelect} accept="image/*" />
          </FileLabelStyle>
          {!isImageRemovable ? <></> : <BtnBlackText onClick={handleRemove}>이미지 제거</BtnBlackText>}
        </LeftAreaStyle>
        <RightAreaStyle>
          <p>{email}</p>
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
            <BtnBlackBg type="button" onClick={changePassword}>
              비밀번호 재설정
            </BtnBlackBg>
          </PasswordArea>
          <div>
            <TitleStyle>내 게시물 보기</TitleStyle>
            <MyBoardList />
          </div>
        </RightAreaStyle>
      </TopUserInfoStyle>
    </Section>
  );
};

export default MyPage;

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
  padding: 1rem;
  display: flex;
  /* flex-wrap: wrap; */
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
  width: 100%;
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
  margin: 2rem auto;

  & label {
    margin: 0.5rem auto;
    display: block;
  }
`;
