import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Section } from 'styles/SharedStyle';
import { db, storage } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes } from '@firebase/storage';
import { uuidv4 } from '@firebase/util';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBoard, insertBoard, setBoard } from '../../redux/modules/board';
import imageFrames from '../../image/imageFrames.png';

const Write = () => {
  // // 파이어베이스에 저장된 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const boardData = query(collection(db, 'board'));
      const querySnapshot = await getDocs(boardData);

      const initialBoard = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialBoard.push(data);
      });
      dispatch(setBoard(initialBoard));
    };
    fetchData();
  }, []);

  const dispatch = useDispatch();
  const board = useSelector((item) => item.board);

  // 게시물 state들
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  // 이미지 id
  const thumbnailId = uuidv4();

  // 썸네일 기본 이미지 url(깃헙에 저장된 이미지)
  // const defaultImgUrl = 'https://github.com/cheolgyun7/deve11og/raw/dev/src/image/userImage.png';

  // 포커스 변수들
  const titleRef = useRef(null);
  const contentsRef = useRef(null);
  const categoryRef = useRef(null);

  // 게시물 state change 이벤트
  const titleChanged = (e) => {
    setTitle(e.target.value);
    setUpdateBoard((prevState) => ({ ...prevState, title: e.target.value }));
  };
  const contentChanged = (e) => {
    setContents(e.target.value);
    setUpdateBoard((prevState) => ({ ...prevState, contents: e.target.value }));
  };
  const categoryChanged = (e) => {
    setCategory(e.target.value);
    setUpdateBoard((prevState) => ({ ...prevState, category: e.target.value }));
  };
  const thumbnailChanged = (e) => {
    setThumbnail(e.target.files[0]);
    setUpdateBoard((prevState) => ({ ...prevState, thumbnail: e.target.value }));
  };

  // 게시물 등록
  const addBoardForm = async (e) => {
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

    e.preventDefault();
    try {
      const newBoard = {
        category,
        title,
        contents,
        regDate,
        thumbnail: thumbnailId, // 이미지의 UUID를 게시물에 저장
        nickName: '테스트',
        user_id: '테스트',
        cnt: 0,
        liked: 0
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

      await uploadBytes(imgRef, thumbnail);

      // 파이어베이스 게시물 등록
      const collectionRef = collection(db, 'board');
      await addDoc(collectionRef, newBoard);

      dispatch(insertBoard(newBoard));

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

        dispatch(deleteBoard(id, thumbnail));

        alert('게시물이 삭제되었습니다.');
      } catch (error) {
        console.error('삭제 실패', error);
      }
    }
  };

  // 수정
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부 스테이트
  const [updateBoard, setUpdateBoard] = useState(''); //  수정 데이터 저장

  const editingBoard = (item) => {
    if (window.confirm('게시물을 수정하시겠습니까?')) {
      setUpdateBoard(item); // 수정할 데이터를 상태에 저장
      setIsEditing(true); // 수정 모드로 변경
    }
  };

  // 수정 완료 버튼 클릭 시
  const updateBoardForm = async (e) => {
    e.preventDefault();

    try {
      const completedBoard = {
        ...updateBoard,
        category,
        title,
        contents,
        thumbnail: thumbnailId // 이미지의 UUID를 게시물에 저장
        // user_id: '테스트'
      };

      await updateDoc(doc(db, 'board', updateBoard.id), completedBoard);
      dispatch(updateBoard(completedBoard));
      alert(`"${title}" 게시물이 수정되었습니다.`);
    } catch (error) {
      console.error('수정 실패', error);
    }
  };

  return (
    <Section>
      <AddBoard>
        <AddBoardForm onSubmit={isEditing ? updateBoardForm : addBoardForm}>
          <SelectBox value={isEditing ? updateBoard.category : category} onChange={categoryChanged} ref={categoryRef}>
            <option value="">카테고리를 선택해 주세요</option>
            <option value="discussion">커뮤니티</option>
            <option value="techTalk">질문 및 답변</option>
          </SelectBox>
          <TitleInput
            value={isEditing ? updateBoard.title : title}
            onChange={titleChanged}
            ref={titleRef}
            type="text"
            placeholder="제목을 입력해 주세요"
          />
          {/* 회원이 이미지 파일을 업로드 한 경우 미리보기 */}
          {/* 인풋 파일에 이미지를 추가하면 URL.createObjectURL()함수가 이미지를 url로 변환해서 src에 넣어줌 */}
          {thumbnail ? (
            <PreviewDiv>
              <img src={URL.createObjectURL(thumbnail)} alt="이미지" />
              <button onClick={imgRemove}>이미지 삭제</button>
            </PreviewDiv>
          ) : (
            <ThumbnailDiv>
              <img src={imageFrames} alt="이미지 프레임" />
              <label htmlFor="thumbnail">
                <ThumbnailBtn>{isEditing ? '이미지 변경' : '이미지 추가'}</ThumbnailBtn>
              </label>
              <ThumbnailInput onChange={thumbnailChanged} type="file" accept="image/*" id="thumbnail" />
            </ThumbnailDiv>
          )}

          <textarea
            value={isEditing ? updateBoard.contents : contents}
            onChange={contentChanged}
            ref={contentsRef}
            placeholder="내용을 입력해 주세요"
          ></textarea>
          <AddBtnDiv>
            <button type="submit">{isEditing ? '수정 완료' : '작성 완료'}</button>
          </AddBtnDiv>
        </AddBoardForm>
      </AddBoard>

      {/* 수정, 삭제를 위한 테스트 코드 */}
      {board.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.thumbnail} alt="" />
            <div>아이디 ***************************{item.id}</div>
            <div>{item.category}</div>
            <div>{item.title}</div>
            <div>{item.contents}</div>
            <div>{item.regDate}</div>
            <button onClick={() => editingBoard(item)}>수정</button>
            <button onClick={() => removeBoard(item.id, item.thumbnail)}>삭제</button>
          </div>
        );
      })}
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
  height: 25rem;

  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 10rem;
    margin-bottom: 0.5rem;
  }
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
  width: 30%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 50%;
    height: 10rem;
    margin-bottom: 0.5rem;
  }
  button {
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
const ThumbnailBtn = styled.div`
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
const ThumbnailInput = styled.input`
  display: none;
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
