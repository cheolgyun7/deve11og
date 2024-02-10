import styled from 'styled-components';
import { db, storage } from '../../firebase';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { Section } from 'styles/SharedStyle';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import userDefaultImage from '../../image/userImage.png';

const MyPage = () => {
  const [selectedFile, setSelectedFile] = useState(null); //업로드를 위해 선택한 이미지
  const [userInfo, setUserInfo] = useState(''); //firestore 에서 가져온 user 정보
  const imgRef = useRef(null);
  const TEST_ID = 'GD58BJjuxnlpOTsuXCcP'; //테스트 하실 계정의 식별 가능한 id 값을 넣어주세요! (firestore에서 자동 부여된 값)

  //유저 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'user', TEST_ID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log('data: ', docSnap.data());
        // console.log('docSnap', docSnap.id);
        setUserInfo(docSnap.data());
        imgRef.current.src = userInfo.user_img;
      } else {
        console.log('no data!!');
      }
    };

    fetchData();
  }, []);

  const fileSelect = async (event) => {
    setSelectedFile(event.target.files[0]);

    // if (window.confirm('선택한 이미지로 업로드를 진행할까요?')) {
    //   const imageRef = ref(storage, `4/${selectedFile.name}`); //TODO : userId로 경로 변경 예정
    //   await uploadBytes(imageRef, selectedFile);
    //   alert('업로드가 완료되었습니다.');
    // } else {
    //   alert('업로드를 취소했습니다.');
    // }
  };

  const handleUpload = async () => {
    //파일 업로드
    if (window.confirm('선택한 이미지로 업로드를 진행할까요?')) {
      const imageRef = ref(storage, `${TEST_ID}/${selectedFile.name}`); //TODO : 식별 가능한 Id로 경로 변경 예정
      await uploadBytes(imageRef, selectedFile);

      //파일 업로드 후 state로 저장
      const downloadURL = await getDownloadURL(imageRef);
      // setUserImage(downloadURL);
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
        // setUserImage(userDefaultImage);
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

  // useEffect(() => {
  //   //userImage state가 변경될 때 마다 실행
  //   //userImage 업로드한 이미지로 보여줌
  //   imgRef.current.src = userImage;
  // }, [userImage]);

  //userImage state가 변경될 때 마다 실행
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
          <BtnColorYellowStyle onClick={handleRemove}>이미지 제거</BtnColorYellowStyle>
        </LeftAreaStyle>
        <RightAreaStyle>
          <NicknameStyle>{userInfo.nickname}</NicknameStyle>
          <button>수정</button>
          <br />
          유저 이메일 : {userInfo.email}
        </RightAreaStyle>
      </TopUserInfoStyle>
      <div>ddd</div>
    </Section>
  );
};

export default MyPage;

const PageTitleStyle = styled.h2`
  /* position: relative; */
  margin: 1rem 0;
  font-size: 1.3rem;
  font-weight: bold;

  &::before {
    content: '';
    /* position: absolute;
    left: -0.6rem;
    top: -0.6rem; */
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

const BtnColorYellowStyle = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem;
  display: block;
  width: 100%;
  color: #fefbba;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 5px;
  transition: 0.3s;
  font-size: 0.9rem;

  &:hover {
    border-color: #fefbba;
    color: #fefbba;
  }
`;

const LeftAreaStyle = styled.div`
  padding: 1rem;
`;

const RightAreaStyle = styled.div`
  padding: 1rem;
  border-left: 1px solid #dddddd;
`;

const NicknameStyle = styled.h2`
  font-weight: bold;
  font-size: 2rem;
`;
