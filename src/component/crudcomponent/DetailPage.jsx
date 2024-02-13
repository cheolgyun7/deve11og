import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { Section } from 'styles/SharedStyle';
import { db, storage } from '../../firebase';
import styled from 'styled-components';
import { deleteBoard, setBoard } from '../../redux/modules/board';
import Write from './Write';
import { deleteObject, ref } from '@firebase/storage';
import { useNavigate } from 'react-router-dom';
const DetailPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [imageURL, setImageURL] = useState('');

  const question = useSelector((state) => {
    return state.list.board.find((item) => item.user_id === userId);
  });
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    title: '',
    contents: '',
    thumbnail: '',
    regDate: '',
    category: ''
  });

  const [isEdit, setIsEdit] = useState(false); //수정가능한상태
  useEffect(() => {
    const fetchImage = async () => {
      if (question) {
        const imageRef = ref(storage, `thumbnail/${question.thumbnail}`);
        const url = await getDownloadURL(imageRef);
        setImageURL(url);
      }
    };

    fetchImage();
  }, [question]);

  useEffect(() => {
    if (question) {
      setUpdateData({
        title: question.title,
        contents: question.contents,
        thumbnail: question.thumbnail,
        regDate: question.regDate,
        category: question.category
      });
    }
  }, [question]);

  const handleInputChange = (e) => {
    if (isEdit) {
      // 입력 필드의 이름을 가져옴 (title 또는 contents)
      const fieldName = e.target.name;
      // 입력된 값
      const fieldValue = e.target.value;
      // 기존 boardData 복사
      const updatedData = { ...updateData };
      // 해당 필드 업데이트
      updatedData[fieldName] = fieldValue;
      // 업데이트된 데이터로 boardData 업데이트
      setUpdateData(updatedData);
    } else {
      alert('수정버튼을 누르고 수정하세요');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (isEdit) {
      try {
        const updatedBoard = {
          ...question,
          title: updateData.title,
          contents: updateData.contents,
          regDate: updateData.regDate,
          category: updateData.category
        };
        await updateDoc(doc(db, 'board', question.user_id), updatedBoard);
        dispatch(updateBoard(updatedBoard));
        alert(`"${updateData.title}" 게시물이 수정되었습니다.`);
      } catch (error) {
        console.error('게시물 수정 실패', error);
      }
    }
    setIsEdit(!isEdit);
  };
  const handleCancel = async (user_id) => {
    if (window.confirm('게시물을 삭제하시겠습니까???')) {
      try {
        const boardRef = doc(db, 'board', question.user_id);
        console.log(boardRef);
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
  // const [updateBoard, setUpdateBoard] = useState(''); //  수정 데이터 저장

  const editingBoard = async (item) => {
    if (window.confirm('게시물을 수정하시겠습니까?')) {
      // setUpdateBoard(item); // 수정할 데이터를 상태에 저장
      // setIsEditing(true); // 수정 모드로 변경
      navigate('/write');
      return <Write isEditing={isEditing} setIsEditing={setIsEditing(true)} item={item} />;
    }
  };

  return (
    <Section>
      <DetailPageBox>
        <DetailPageBoxCard>
          <UpdateSelectBox name="category" value={updateData.category} onChange={handleInputChange}>
            <option value="discussion">커뮤니티</option>
            <option value="techTalk">질문 및 답변</option>
          </UpdateSelectBox>
          {isEdit === true ? (
            <>
              <input type="text" name="title" value={updateData.title} onChange={handleInputChange} />
              <input type="text" name="regDate" value={updateData.regDate} onChange={handleInputChange} readOnly />
              <div>{imageURL && <img src={imageURL} alt="미리보기" />}</div>
              <textarea type="text" name="contents" value={updateData.contents} onChange={handleInputChange} />
            </>
          ) : (
            <>
              <h2>{updateData.title}</h2>
              <span>{updateData.regDate}</span>
              <div>{imageURL && <img src={imageURL} alt="미리보기" />}</div>
              <span>{updateData.contents}</span>
            </>
          )}
          <p>
            <button onClick={handleUpdate}>{isEdit ? '수정완료' : '수정'}</button>
            <button onClick={handleCancel}>삭제</button>
          </p>
        </DetailPageBoxCard>
      </DetailPageBox>
      <CommentSection />
    </Section>
  );
};
export default DetailPage;
export const DetailPageBox = styled.div``;
export const DetailPageBoxCard = styled.div`
  /* width: 75%;
  height: 50vh;
  position: relative;
  padding: 1rem;
  border: 1px solid black;
  margin: 0 auto;
  input {
    display: block;
    margin-bottom: 1rem;
    &:first-of-type {
      font-size: 2rem;
    }
  }
  textarea {
    display: inline-block;
    padding: 1rem;
    vertical-align: top;
    width: 70%;
    height: 50%;
    resize: none;
  }
  span {
    display: block;
    margin-bottom: 1rem;
    &:last-of-type {
      display: inline-flex;
      vertical-align: top;
      padding: 1rem;
    }
  }
  p {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  div {
    display: inline-flex;
    justify-content: center;
    width: 30%;
    height: 70%;
    background-color: black;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  } */
`;
export const UpdateSelectBox = styled.select`
  /* position: absolute;
  top: 1rem;
  right: 1rem; */
`;
const ContentsBox = styled.div`
  width: 75%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 0.2rem solid #f5f5f5;
`;
const SelectDiv = styled.div``;
const TitleBox = styled.div``;
const TitleDiv = styled.div``;
const ImgBox = styled.div``;
const ImgDiv = styled.div``;
const ContentDiv = styled.div``;
