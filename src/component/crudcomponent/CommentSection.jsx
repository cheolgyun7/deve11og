import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setComment } from '../../redux/modules/comment';

export default function CommentSection() {
  const { user_id, user_img, nickname } = useSelector((state) => state.user.nowUser);
  const dispatch = useDispatch();
  const { data, ddd } = useSelector((state) => state.comment);
  console.log(data, ddd);
  // console.log(user_id, user_img, nickname);

  const [contents, setContents] = useState('');
  // const [commentData, setCommentData] = useState('');
  const [boardTestData, setBoardTestData] = useState(''); //테스트로 id 만 가져오는 state - 삭제 예정
  // console.log(boardTestData[0]);

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
      const newComment = {
        contents,
        regDate: new Date(),
        nickname,
        user_id,
        board_id: boardTestData[0].id //임시로 파이어베이스 첫 번째 데이터의 id로 부여함. 나중에 useParam으로 id 가져와서 하는 등 변경 필요
      };
      const collectionRef = collection(db, 'comments');
      await addDoc(collectionRef, newComment);
      alert('등록이 완료되었습니다.');
    } catch (error) {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  // textarea 높이 변경
  // const handleKeyUp = (e) => {
  //   let text = contents;
  //   let rowCnt = text.split(/\r\n|\r|\n/).length;
  //   // $reviewBtnBox.style.display = 'flex';
  //   if (event.key === 'Enter') {
  //     $reviewTextarea.setAttribute('rows', rowCnt);
  //   } else if (event.key === 'Backspace') {
  //     if (rowCnt >= 1) {
  //       $reviewTextarea.setAttribute('rows', rowCnt);
  //     }
  //   }
  // };

  //댓글 데이터 가져오기
  // useEffect(() => {
  //   const boardId = boardTestData[0].id;
  //   const fetchData = async () => {
  //     const q = query(collection(db, 'comments'), where('board_id', '==', boardId));
  //     const querySnapshot = await getDocs(q);

  //     const initialData = [];

  //     querySnapshot.forEach((doc) => {
  //       initialData.push({ id: doc.id, ...doc.data() });
  //     });

  //     // firestore에서 가져온 데이터를 state에 전달
  //     dispatch(setComment(initialData));
  //   };

  //   fetchData();
  // }, []);

  //게시물 데이터 가져오기 - 임시로 만듬, 삭제 예정
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'board'));
      const querySnapshot = await getDocs(q);

      const initialData = [];

      querySnapshot.forEach((doc) => {
        initialData.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setBoardTestData(initialData);
    };

    fetchData();
  }, []);

  return (
    <>
      <CommentFormWrap onSubmit={handelSubmit}>
        <CommentFormBox>
          <ThumbNailBox>
            <img src={user_img} alt={`${nickname} 유저 프로필 이미지`} />
          </ThumbNailBox>
          <CommentTextarea
            name=""
            id=""
            cols="30"
            rows="1"
            onChange={handleChange}
            // onKeyUp={handleKeyUp}
          ></CommentTextarea>
        </CommentFormBox>
        <BtnBox>
          <button type="button">취소</button>
          <button>등록</button>
        </BtnBox>
      </CommentFormWrap>
      {/* <ul>
        {data.map((el) => {
          return <li key={el.id}>{el.comment}</li>;
        })}
      </ul> */}
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
`;
const CommentTextarea = styled.textarea`
  margin-left: 1rem;
  padding: 0.5rem;
  width: calc(100% - 6rem);
  border: 0;
  border-bottom: 1px solid #ddd;
  resize: none;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 1rem;
`;
