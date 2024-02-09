import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section } from 'styles/SharedStyle';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Write = () => {
  // 게시물 제목과 내용 input state
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [thumbnailImg, setThumbnailImg] = useState('');

  // 게시물 제목과 내용 change 이벤트
  const titleChanged = (e) => setBoardTitle(e.target.value);
  const contentChanged = (e) => setBoardContent(e.target.value);
  const thumbnailImgChanged = (e) => setThumbnailImg(e.target.value);

  const now = new Date();
  const regDate = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    hour12: false, // 24시간 형식표기
    minute: '2-digit'
  });

  // 게시물 등록 form
  const insertBoardForm = async (e) => {
    e.preventDefault();
    const newBoard = {
      albumImg: null,
      cnt: 0,
      contents: boardContent,
      liked: 0,
      marked: false,
      regDate,
      title: boardTitle
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'board'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };
    fetchData();
  }, []);

  return (
    <Section>
      <InsertBoard>
        <InsertBoardForm onSubmit={insertBoardForm}>
          <SelectBox>
            <option value="">카테고리를 선택해 주세요</option>
            <option value="discussion">커뮤니티</option>
            <option value="techTalk">질문 및 답변</option>
            <option value="about">About</option>
          </SelectBox>
          <TitleInput value={boardTitle} onChange={titleChanged} type="text" placeholder="제목을 입력해 주세요" />
          <textarea value={boardContent} onChange={contentChanged} placeholder="내용을 입력해 주세요"></textarea>
          <InsertBtnDiv>
            <button type="submit">작성 완료</button>
            <label for="thumbnail">
              <ThumbnailDiv>이미지 추가</ThumbnailDiv>
            </label>
            <ThumbnailInput value={thumbnailImg} onChange={thumbnailImgChanged} type="file" id="thumbnail" />
          </InsertBtnDiv>
        </InsertBoardForm>
      </InsertBoard>
    </Section>
  );
};

export default Write;

const InsertBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InsertBoardForm = styled.form`
  width: 75%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 0.2rem solid #f5f5f5;
  position: relative;
  textarea {
    width: 95%;
    height: 30rem;
    padding: 1rem;
    background-color: transparent;
    border: none;
    border-radius: 2rem;
    font-size: 1rem;
  }
`;

const SelectBox = styled.select`
  width: 20%;
  padding: 0.2rem;
  position: absolute;
  top: 1rem;
  right: 4rem;
  border-color: #f5f5f5;
  cursor: pointer;
`;

const TitleInput = styled.input`
  width: 90%;
  padding: 0.7rem;
  border: none;
  border-bottom: 0.1rem solid #f5f5f5;
  background-color: transparent;
  font-size: 1rem;
`;

const InsertBtnDiv = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  position: absolute;
  bottom: -5%;
  right: -5%;
  button {
    background-color: transparent;
    border: none;
    font-size: 1rem;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const ThumbnailDiv = styled.div`
  color: black;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
const ThumbnailInput = styled.input`
  display: none;
`;
