import styled from 'styled-components';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { Section } from 'styles/SharedStyle';

const MyPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userImage, setUserImage] = useState('');
  const imgRef = useRef(null);

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
      const imageRef = ref(storage, `4/${selectedFile.name}`); //TODO : userId로 경로 변경 예정
      await uploadBytes(imageRef, selectedFile);
      alert('업로드가 완료되었습니다.');

      //파일 업로드 후 state로 저장
      const downloadURL = await getDownloadURL(imageRef);
      setUserImage(downloadURL);
    } else {
      alert('업로드를 취소했습니다.');
    }
  };

  useEffect(() => {
    //userImage state가 변경될 때 마다 실행
    //userImage 업로드한 이미지로 보여줌
    imgRef.current.src = userImage;
  }, [userImage]);

  return (
    <Section>
      <TopUserInfoStyle>
        <LeftAreaStyle>
          <FigureStyle>
            <img src="" alt="유저 이미지" ref={imgRef} />
          </FigureStyle>
          <FileLabelStyle>
            이미지 업로드
            <input type="file" onChange={fileSelect} />
          </FileLabelStyle>
          {!selectedFile ? <></> : <button onClick={handleUpload}>등록</button>}
          <BtnColorYellowStyle>이미지 제거</BtnColorYellowStyle>
        </LeftAreaStyle>
        <RightAreaStyle>
          <NicknameStyle>짱구</NicknameStyle>
          <DescStyle>이 영역은 설명이 들어갑니다~</DescStyle>
          <button>수정</button>
        </RightAreaStyle>
      </TopUserInfoStyle>
      <div></div>
    </Section>
  );
};

export default MyPage;

const TopUserInfoStyle = styled.div`
  display: flex;
`;

const FigureStyle = styled.figure`
  margin-bottom: 1rem;
  width: 150px;
  height: 150px;
  background-color: #999999;
  border-radius: 50%;
  text-align: center;
  overflow: hidden;
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
  border-left: 1px solid #252525;
`;

const NicknameStyle = styled.h2`
  font-weight: bold;
  font-size: 2rem;
`;

const DescStyle = styled.p`
  margin-top: 0.8rem;
  color: #999;
`;
