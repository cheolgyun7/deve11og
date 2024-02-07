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
      <figure>
        <img src="" alt="유저 이미지" ref={imgRef} />
      </figure>
      <FileLabelStyle>
        이미지 업로드
        <input type="file" onChange={fileSelect} />
      </FileLabelStyle>
      {!selectedFile ? <></> : <button onClick={handleUpload}>등록</button>}
    </Section>
  );
};

export default MyPage;

const FileLabelStyle = styled.label`
  & input {
    display: none;
  }
`;
