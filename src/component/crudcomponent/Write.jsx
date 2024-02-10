import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Section } from 'styles/SharedStyle';
import { db, storage } from '../../firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import talkingimport from '../../image/talking-img.png';
import { ref, uploadBytes } from '@firebase/storage';

const Write = () => {
  // 게시물 state
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState();
  const [category, setCategory] = useState('');
  const [thumbnailImg, setThumbnailImg] = useState('');

  // 이미지 미리보기 변수
  const thumbnailRef = useRef(null);

  // 포커스를 위한 변수들
  const boardTitleRef = useRef(null);
  const boardContentRef = useRef(null);
  const categoryRef = useRef(null);

  // 게시물 제목과 내용 change 이벤트
  const titleChanged = (e) => setBoardTitle(e.target.value);
  const contentChanged = (e) => setBoardContent(e.target.value);
  const categoryChanged = (e) => setCategory(e.target.value);

  const thumbnailImgChanged = (e) => setThumbnailImg(e.target.files[0]);

  // 게시물 등록일 함수
  const now = new Date();
  const regDate = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    hour12: false, // 24시간 형식표기
    minute: '2-digit'
  });

  // board
  const [board, setBoard] = useState([
    {
      category: '커뮤니티',
      cnt: 0,
      contents: boardContent,
      liked: 0,
      regDate,
      title: boardTitle
    }
  ]);

  // board 수정 전 값을 담는 state
  // const [isUpdateBoard, setIsUpdateBoard] = useState('');

  // board 수정된 값을 담는 state
  // const [updateCompletedBoard, setUpdateCompletedBoard] = useState(isUpdateBoard);

  // 게시물 등록 form
  const insertBoardForm = async (e) => {
    e.preventDefault();

    const newBoard = {
      cnt: 0,
      contents: boardContent,
      liked: 0,
      marked: false,
      regDate,
      title: boardTitle,
      category
    };

    if (!boardTitle) {
      alert('제목을 입력해 주세요');
      return boardTitleRef.current.focus();
    } else if (!boardContent) {
      alert('제목을 입력해 주세요');
      return boardContentRef.current.focus();
    } else if (!category) {
      alert('카테고리를 선택해 주세요');
      return categoryRef.current.focus();
    }

    // 썸네일 회원이 등록한 이미지가 없을경우 기본 이미지 사용
    // 이미지는 스토리지에 따로 저장
    // const imgRef = ref(storage, );
    // await uploadBytes(imgRef, thumbnailImg);
    // console.log('uploadBytes', thumbnailImg);

    setBoard([...board, newBoard]);
    setBoardTitle('');
    setBoardContent('');
    setCategory('');

    // 파이어베이스 게시물 등록
    const collectionRef = collection(db, 'board');
    await addDoc(collectionRef, newBoard);
  };

  // 파이어베이스에 저장된 데이터 가져오기
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const boardData = query(collection(db, 'board'));
  //     const querySanpshot = await getDocs(boardData);

  //     const initialBoard = [];
  //     querySanpshot.forEach((doc) => {
  //       const data = {
  //         id: doc.id,
  //         ...doc.data()
  //       };
  //       console.log('data', data);
  //       initialBoard.push(data);
  //     });
  //     setBoard(initialBoard);
  //   };
  //   fetchData();
  // }, []);

  return (
    <Section>
      <InsertBoard>
        <InsertBoardForm onSubmit={insertBoardForm}>
          <SelectBox value={category} onChange={categoryChanged} ref={categoryRef}>
            <option value="">카테고리를 선택해 주세요</option>
            <option value="discussion">커뮤니티</option>
            <option value="techTalk">질문 및 답변</option>
            <option value="about">About</option>
          </SelectBox>
          <TitleInput
            value={boardTitle}
            onChange={titleChanged}
            ref={boardTitleRef}
            type="text"
            placeholder="제목을 입력해 주세요"
          />
          {/* 회원이 이미지 파일을 업로드 한 경우 미리보기 */}
          {thumbnailImg ? (
            <PreviewDiv>
              <img src={URL.createObjectURL(thumbnailImg)} alt="이미지" />
              <ImgBtn>
                <button>삭제</button>
                <button>등록</button>
              </ImgBtn>
            </PreviewDiv>
          ) : null}

          <textarea
            value={boardContent}
            onChange={contentChanged}
            ref={boardContentRef}
            placeholder="내용을 입력해 주세요"
          ></textarea>
          <InsertBtnDiv>
            <button type="submit">작성 완료</button>
            <label htmlFor="thumbnail">
              <ThumbnailDiv>이미지 추가</ThumbnailDiv>
            </label>
            <ThumbnailInput
              // value={thumbnailImg}
              onChange={thumbnailImgChanged}
              type="file"
              accept="image/*"
              id="thumbnail"
              ref={thumbnailRef}
            />
          </InsertBtnDiv>
        </InsertBoardForm>
      </InsertBoard>

      {/* 테스트 코드
      {board.map((item, idx) => {
        return (
          <div key={idx}>
            <div>{item.title}</div>
            <div>{item.contents}</div>
            <div>{item.regDate}</div>
            <div>{item.nic}</div>
          </div>
        );
      })} */}
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
  height: 75%;
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

const PreviewDiv = styled.div`
  width: 30%;
  flex-direction: column;
  align-items: center;
  display: flex;
  flex-direction: column;
  img {
    width: 10rem;
  }
`;

const ImgBtn = styled.div`
  display: flex;
  button {
    margin: 0.5rem 1.2rem;
    background-color: transparent;
    border: none;
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
  margin: 2rem;
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
