import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from 'styles/SharedStyle';
import { db, storage } from '../../firebase';
import { SET_DELETEBOARD, updateBoard } from '../../redux/modules/list';
import styled from 'styled-components';
import { getDownloadURL, ref } from 'firebase/storage';
import Comments from './Comments';
import { query } from 'express';
import { setBoard } from 'redux/modules/board';
import Write from './Write';
const DetailPage = () => {
  // const { userId } = useParams();
  // const [imageURL, setImageURL] = useState('');
  // console.log(updateBoard());
  // const question = useSelector((state) => {
  //   return state.list.board.find((item) => item.user_id === userId);
  // });
  // const navigate = useNavigate();
  // const [updateData, setUpdateData] = useState({
  //   title: '',
  //   contents: '',
  //   thumbnail: '',
  //   regDate: '',
  //   category: ''
  // });
  // const [isEdit, setIsEdit] = useState(false); //수정가능한상태
  // useEffect(() => {
  //   if (question) {
  //     setUpdateData({
  //       title: question.title,
  //       contents: question.contents,
  //       thumbnail: question.thumbnail,
  //       regDate: question.regDate,
  //       category: question.category
  //     });
  //   }
  // }, [question]);
  // const handleInputChange = (e) => {
  //   if (isEdit) {
  //     // 입력 필드의 이름을 가져옴 (title 또는 contents)
  //     const fieldName = e.target.name;
  //     // 입력된 값
  //     const fieldValue = e.target.value;
  //     // 기존 boardData 복사
  //     const updatedData = { ...updateData };
  //     // 해당 필드 업데이트
  //     updatedData[fieldName] = fieldValue;
  //     // 업데이트된 데이터로 boardData 업데이트
  //     setUpdateData(updatedData);
  //   } else {
  //     alert('수정버튼을 누르고 수정하세요');
  //   }
  // };
  // const handleUpdate = async (user_id) => {
  //   if (isEdit) {
  //     try {
  //       const updatedBoard = {
  //         ...question,
  //         title: updateData.title,
  //         contents: updateData.contents,
  //         regDate: updateData.regDate,
  //         category: updateData.category
  //       };
  //       console.log(updateBoard());
  //       await updateDoc(doc(db, 'board', question.user_id), updatedBoard);
  //       dispatch(updateBoard(updatedBoard));
  //       alert(`"${updateData.title}" 게시물이 수정되었습니다.`);
  //     } catch (error) {
  //       console.error('게시물 수정 실패', error);
  //     }
  //   }
  //   setIsEdit(!isEdit);
  // };
  // const handleCancel = async (user_id) => {
  //   if (window.confirm('게시물을 삭제하시겠습니까???')) {
  //     try {
  //       const boardRef = doc(db, 'board', question.user_id);
  //       console.log(boardRef);
  //       await deleteDoc(boardRef);
  //       dispatch({
  //         type: SET_DELETEBOARD,
  //         payload: user_id
  //       });
  //       alert('게시물이 삭제되었습니다.');
  //       navigate('/');
  //     } catch (error) {
  //       console.error('삭제실패', error);
  //     }
  //   }
  // };

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

  return (
    <Section>
      <DetailPageBox>
        <DetailPageBoxCard>
          <UpdateSelectBox name="category" value={board.category}>
            <option value="discussion">커뮤니티</option>
            <option value="techTalk">질문 및 답변</option>
          </UpdateSelectBox>
          <div>
            {board.map((item) => {
              return (
                <div key={item.id}>
                  <img src={item.imageUrl} alt="" />
                  <div>아이디 ***************************{item.id}</div>
                  <div>{item.category}</div>
                  <div>{item.title}</div>
                  <div>{item.contents}</div>
                  <div>{item.regDate}</div>
                  <button onClick={() => <Write editingBoard={item} />}>수정</button>
                  <button onClick={() => <Write removeBoard={(item.id, item.thumbnail)} />}>삭제</button>
                </div>
              );
            })}
          </div>
        </DetailPageBoxCard>
      </DetailPageBox>
    </Section>
  );
};
export default DetailPage;
export const DetailPageBox = styled.div``;
export const DetailPageBoxCard = styled.div`
  width: 75%;
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
  }
`;
export const UpdateSelectBox = styled.select`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
