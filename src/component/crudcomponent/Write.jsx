import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Section } from 'styles/SharedStyle';
import { db, storage } from '../../firebase';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes } from '@firebase/storage';
import { uuidv4 } from '@firebase/util';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_BOARD, INSERT_BOARD } from '../../redux/modules/board';

const Write = () => {
  const dispatch = useDispatch();
  const board = useSelector((item) => item.board);

  console.log('board', board);

  // 게시물 state들
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  // 이미지 id
  const thumbnailId = uuidv4();

  // 썸네일 기본 이미지 url(깃헙에 저장된 이미지)
  const defaultImgUrl = 'https://github.com/cheolgyun7/deve11og/raw/dev/src/image/userImage.png';

  // 포커스 변수들
  const titleRef = useRef(null);
  const contentsRef = useRef(null);
  const categoryRef = useRef(null);

  // 게시물 state change 이벤트
  const titleChanged = (e) => setTitle(e.target.value);
  const contentChanged = (e) => setContents(e.target.value);
  const categoryChanged = (e) => setCategory(e.target.value);
  const thumbnailChanged = (e) => setThumbnail(e.target.files[0]);

  // 게시물 등록일 함수
  const now = new Date();
  const regDate = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    hour12: false, // 24시간 형식 표기
    minute: '2-digit'
  });

  // 게시물 등록
  const addBoardForm = async (e) => {
    e.preventDefault();
    try {
      const newBoard = {
        cnt: 0,
        contents,
        liked: 0,
        regDate,
        thumbnail: thumbnailId, // 이미지의 UUID를 게시물에 저장
        title,
        category
      };

      // 유효성 검사
      if (!title) {
        alert('제목을 입력해 주세요');
        return titleRef.current.focus();
      } else if (!contents) {
        alert('내용을 입력해 주세요');
        return contentsRef.current.focus();
      } else if (!category) {
        alert('카테고리를 선택해 주세요');
        return categoryRef.current.focus();
      }
      // 스토리지에 이미지 등록
      const imgRef = ref(storage, 'thumbnail/' + thumbnailId);

      // 회원이 등록한 이미지가 없을경우 기본 이미지 등록
      // ** 문제 스토리지에 저장은되지만 이미지 파일로 저장이안됨
      const imageToUpload = thumbnail ? thumbnail : defaultImgUrl;
      await uploadBytes(imgRef, imageToUpload);

      // 파이어베이스 게시물 등록
      const collectionRef = collection(db, 'board');
      await addDoc(collectionRef, newBoard);

      dispatch({
        type: INSERT_BOARD,
        payload: newBoard
      });
      setTitle('');
      setContents('');
      setCategory('');
      imgRemove();

      alert(`"${title}" 게시물이 등록되었습니다.`);
    } catch (error) {
      console.error('게시물 등록 실패', error);
    }
  };

  // 이미지 미리보기 삭제 함수
  const imgRemove = () => {
    setThumbnail('');
  };

  // 문제 ** 파이에어베이스에서 게시물, 이미지 둘 다 정상적으로 삭제가 되나 처리 속도가 느려 게시물이 삭제됐음에도 화면상에 남아있는 경우가 있음. 리팩토링 이후에도 발생하는지 확인 필요
  // 삭제
  const removeBoard = async (id, thumbnail) => {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      try {
        // 이미지 삭제
        const imgRef = ref(storage, 'thumbnail/' + thumbnail);
        deleteObject(imgRef);

        // 게시물 삭제
        const boardRef = doc(db, 'board', id);
        await deleteDoc(boardRef);
        dispatch({
          type: DELETE_BOARD,
          payload: id
        });

        alert('게시물이 삭제되었습니다.');
      } catch (error) {
        console.error('삭제 실패', error);
      }
    }
  };

  // 수정
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부 스테이트
  const [updateBoard, setUpdateBoard] = useState(''); //  수정 데이터 저장

  const editingBoard = () => {
    if (window.confirm('게시물을 수정하시겠습니까?')) {
      setIsEditing(true);
    }
  };

  // ** 파이어베이스 미연결, 스토리지 미연결, 로컬내 수정 불가
  const onEditDone = async (e) => {
    // if (!updateBoard) alert('수정사항이 없습니다');
    // const updatedBoard = {
    //   ...updateBoard,
    //   title,
    //   contents,
    //   category,
    //   thumbnail
    // };
    // try {
    //   const boardRef = doc(db, 'board', board.id);
    //   await updateDoc(boardRef, updatedBoard);
    //   setBoard(updatedBoard);
    //   setUpdateBoard(null);
    //   setIsEditing(false);
    // } catch (error) {
    //   console.error('수정 실패', error);
    // }
  };

  return (
    <Section>
      <AddBoard>
        <AddBoardForm onSubmit={addBoardForm}>
          <SelectBox value={category} onChange={categoryChanged} ref={categoryRef}>
            <option value="">카테고리를 선택해 주세요</option>
            <option value="discussion">커뮤니티</option>
            <option value="techTalk">질문 및 답변</option>
          </SelectBox>
          <TitleInput
            value={title}
            onChange={titleChanged}
            ref={titleRef}
            type="text"
            placeholder="제목을 입력해 주세요"
            autoFocus
          />
          {/* 회원이 이미지 파일을 업로드 한 경우 미리보기 */}
          {/* 인풋 파일에 이미지를 추가하면 URL.createObjectURL()함수가 이미지를 url로 변환해서 src에 넣어줌 */}
          {thumbnail ? (
            <PreviewDiv>
              <img src={URL.createObjectURL(thumbnail)} alt="이미지" />
              <button onClick={imgRemove}>이미지 삭제</button>
            </PreviewDiv>
          ) : null}

          <textarea
            value={contents}
            onChange={contentChanged}
            ref={contentsRef}
            placeholder="내용을 입력해 주세요"
          ></textarea>
          <AddBtnDiv>
            <button type="submit">작성 완료</button>
            <label htmlFor="thumbnail">
              <ThumbnailDiv>이미지 추가</ThumbnailDiv>
            </label>
            <ThumbnailInput onChange={thumbnailChanged} type="file" accept="image/*" id="thumbnail" />
          </AddBtnDiv>
        </AddBoardForm>
      </AddBoard>
    </Section>
  );
};

export default Write;

const AddBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddBoardForm = styled.form`
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

const PreviewDiv = styled.div`
  width: 30%;
  flex-direction: column;
  align-items: center;
  display: flex;
  flex-direction: column;
  img {
    width: 10rem;
  }
  button {
    margin: 0.5rem;
    background-color: transparent;
    border: none;
    &:hover {
      transform: scale(1.3);
    }
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

const AddBtnDiv = styled.div`
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

// ** 문제 스토리지에 저장은되지만 이미지 파일로 저장이안됨

// 미해결 각 카테고리별로 게시물 보내기 라우터 설정 아직 안함
// 요즘 머리가 너무 안굴러가는데
// 각 페이지별 컴포넌트 생성 > 라우터 생성 >  셀렉트 옵션값(state에 저장된 value)로 navigate를 보내면 되는거 맞지?
// ex navigate=(`${category}`)

// 상세페이지에서, 수정 버튼을 누르면 이전 값을 저장하는 스테이트에 수정 게시물을 담아서
// 각 인풋 스테이트를 또 만들어서 수정하던가... 머리가 진짜 너무 안돌아가 미치겠네
