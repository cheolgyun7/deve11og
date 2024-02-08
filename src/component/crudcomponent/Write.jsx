import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section } from 'styles/SharedStyle';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Write = () => {
  // 게시물 제목과 내용 input state
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [boardAlbumImg, setBoardAlbumImg] = useState('');

  // 게시물 제목과 내용 change 이벤트
  const titleChanged = (e) => setBoardTitle(e.target.value);
  const contentChanged = (e) => setBoardContent(e.target.value);
  const albumImgChanged = (e) => setBoardAlbumImg(e.target.value);

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

  // firebase DB연결
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
          <TitleInput value={boardTitle} onChange={titleChanged} type="text" placeholder="제목을 입력해 주세요" />
          <ImgInput value={boardAlbumImg} onChange={albumImgChanged} type="file" />
          <textarea value={boardContent} onChange={contentChanged} placeholder="내용을 입력해 주세요"></textarea>
          <button type="submit">등록</button>
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
  width: 80%;
  height: 45rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #171717;
  border-radius: 2rem;
  position: relative;

  textarea {
    width: 95%;
    height: 30rem;
    padding: 1rem;
    background-color: transparent;
    border: none;
    border-radius: 2rem;
    color: white;
    font-size: 1rem;
  }
  button {
    width: 15%;
    padding: 0.8rem;
    background-color: #8930fe;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 0.5rem;

    &:hover {
      background-color: #fefbba;
      color: black;
    }
  }
`;

const TitleInput = styled.input`
  width: 50%;
  padding: 0.7rem;
  border: none;
  border-bottom: 0.1rem solid white;
  background-color: transparent;
  color: white;
  font-size: 1rem;
`;

const ImgInput = styled.input`
  position: absolute;
  top: 39rem;
  right: -2rem;
  border: none;
`;
