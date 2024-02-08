import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section } from 'styles/SharedStyle';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
const Write = () => {
  // 게시물 제목과 내용 input state
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');

  // 게시물 제목과 내용 change 이벤트
  const titleChanged = (e) => setBoardTitle(e.target.value);
  const contentChanged = (e) => setBoardContent(e.target.value);

  // 게시물 등록 form
  const insertBoardForm = () => {};

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
          <input value={boardTitle} onChange={titleChanged} type="text" placeholder="제목을 입력해 주세요" />
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
  height: 80vh;
  display: flex;
  flex-direction: column;

  width: 80%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  justify-content: center;

  input {
    width: 50%;
    padding: 10px;
    border: none;
    border-bottom: 2px solid black;
    background-color: transparent;
  }
  textarea {
    width: 50%;
    height: 60%;
    padding: 10px;
    background-color: transparent;
    border-radius: 5px;
  }
  button {
    width: 20%;
    padding: 10px;
    background-color: black;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 5px;

    &:hover {
      background-color: #eee;
      color: black;
    }
  }
`;
