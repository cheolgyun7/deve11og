import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addComment } from '../../redux/modules/comment';
import CommentList from './CommentList';
import { BtnBlackBg } from 'styles/SharedStyle';
import { useParams } from 'react-router-dom';

export default function CommentSection() {
  const { user_id, user_img, nickname } = useSelector((state) => state.user.nowUser);
  const dispatch = useDispatch();
  const params = useParams();

  // console.log(user_id, user_img, nickname);

  const [contents, setContents] = useState('');
  const [boardTestData, setBoardTestData] = useState(''); //테스트로 id 만 가져오는 state - 삭제 예정

  const handleChange = (e) => {
    setContents(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // 유효성 검사
    if (!contents.trim()) {
      return alert('내용을 입력해주세요');
    }

    try {
      const nowDate = new Date();
      const regDate = nowDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        hour12: false, // 24시간 형식 표기
        minute: '2-digit'
      });

      const newComment = {
        contents,
        regDate,
        nickname,
        user_id,
        // board_id: boardTestData[0].id //임시로 파이어베이스 첫 번째 데이터의 id로 부여함. 나중에 useParam으로 id 가져와서 하는 등 변경 필요
        board_id: params.id
      };
      const collectionRef = collection(db, 'comments');
      await addDoc(collectionRef, newComment);
      dispatch(addComment(newComment));
      alert('등록이 완료되었습니다.');
      e.target.reset();
    } catch (error) {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  //게시물 데이터 가져오기 - 임시로 만듬, 삭제 예정
  useEffect(() => {
    const fetchBoardData = async () => {
      const q = query(collection(db, 'board'));
      const querySnapshot = await getDocs(q);

      const initialData = [];

      querySnapshot.forEach((doc) => {
        initialData.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setBoardTestData(initialData);
    };

    fetchBoardData();
  }, []);

  return (
    <>
      <CommentFormWrap onSubmit={handelSubmit}>
        <CommentFormBox>
          <ThumbNailBox>
            <img src={user_img} alt={`${nickname} 유저 프로필 이미지`} />
          </ThumbNailBox>
          <CommentInput type="text" value={contents} onChange={handleChange} />
        </CommentFormBox>
        <BtnBox>
          <BtnBlackBg>등록</BtnBlackBg>
        </BtnBox>
      </CommentFormWrap>
      <CommentList />
    </>
  );
}

const CommentFormWrap = styled.form`
  margin: 0 auto;
  padding: 2rem;
  max-width: 1000px;
`;
const CommentFormBox = styled.div`
  display: flex;
  align-items: center;
`;
const ThumbNailBox = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 50%;

  & img {
    max-width: 100%;
  }
`;
const CommentInput = styled.input`
  margin-left: 1rem;
  padding: 0.5rem;
  width: calc(100% - 6rem);
  border: 0;
  border-bottom: 1px solid #ddd;
  font-family: inherit;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 0.8rem;
`;
