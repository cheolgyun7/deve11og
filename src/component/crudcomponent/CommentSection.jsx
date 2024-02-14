import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CommentList from './CommentList';
import { BtnBlackBg } from 'styles/SharedStyle';
import { useParams } from 'react-router-dom';

export default function CommentSection() {
  const { user_id, user_img, nickname } = useSelector((state) => state.user.nowUser);
  const params = useParams();
  const [contents, setContents] = useState('');
  const [commentData, setCommentData] = useState();
  const contentRef = useRef(null);

  //댓글 데이터 가져오기
  useEffect(() => {
    const fetchCommentData = async () => {
      const q = query(collection(db, 'comments'), where('board_id', '==', params.id));
      const querySnapshot = await getDocs(q);

      const initialData = [];

      querySnapshot.forEach((doc) => {
        initialData.push({ id: doc.id, ...doc.data() });
      });

      setCommentData([...initialData]);
    };

    fetchCommentData();
  }, []);

  useEffect(() => {
    contentRef.current.focus();
  });

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
        board_id: params.id
      };
      const collectionRef = collection(db, 'comments');
      const ref = await addDoc(collectionRef, newComment);

      newComment.id = ref.id;
      setCommentData((prev) => {
        return [newComment, ...prev];
      });
      alert('등록이 완료되었습니다.');
      setContents('');
      e.target.reset();
    } catch (error) {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  return (
    <>
      <CommentFormWrap onSubmit={handelSubmit}>
        <CommentFormBox>
          <ThumbNailBox>
            <img src={user_img} alt={`${nickname} 유저 프로필 이미지`} />
          </ThumbNailBox>
          <CommentInput
            type="text"
            value={contents}
            onChange={handleChange}
            ref={contentRef}
            placeholder="내용을 입력해주세요"
          />
        </CommentFormBox>
        <BtnBox>
          <BtnBlackBg>등록</BtnBlackBg>
        </BtnBox>
      </CommentFormWrap>
      <CommentList commentData={commentData} setCommentData={setCommentData} />
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
