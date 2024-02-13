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

  const board = useSelector((item) => item.board);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <ContentsBox>
            {board.map((item) => {
              return (
                <div key={item.id}>
                  <TitleBox>
                    <SelectDiv>{item.category}</SelectDiv>
                    <TitleDiv>{item.title}</TitleDiv>
                  </TitleBox>

                  <ImgBox>
                    <ImgDiv src={item.imageUrl} alt="이미지" />
                    <ContentDiv>{item.contents}</ContentDiv>
                  </ImgBox>

                  <div>{item.regDate}</div>
                  <button onClick={() => editingBoard(item)}>수정</button>
                  <button onClick={() => removeBoard(item.id, item.thumbnail)}>삭제</button>
                </div>
              );
            })}
          </ContentsBox>
        </DetailPageBoxCard>
      </DetailPageBox>
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
