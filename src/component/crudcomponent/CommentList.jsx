import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setComment } from '../../redux/modules/comment';

export default function CommentList() {
  const { data } = useSelector((state) => state.comment);
  const { user_id, user_img, nickname } = useSelector((state) => state.user.nowUser);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();

  //댓글 데이터 가져오기
  useEffect(() => {
    // const boardId = boardTestData[0].id;
    const fetchCommentData = async () => {
      // const q = query(collection(db, 'comments'), where('board_id', '==', boardId));
      const q = query(collection(db, 'comments'));
      const querySnapshot = await getDocs(q);

      const initialData = [];

      querySnapshot.forEach((doc) => {
        initialData.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      dispatch(setComment(initialData));
    };

    fetchCommentData();
  }, []);

  //유저 정보 데이터 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      const q = query(collection(db, 'usersDB'));
      const querySnapshot = await getDocs(q);

      const initialData = [];

      querySnapshot.forEach((doc) => {
        initialData.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setUserData(initialData);
    };

    fetchUserData();
  }, []);

  return (
    <CommentListStyle>
      {data.map((el) => {
        return (
          <CommentItem key={el.id}>
            <CommentTopInfo>
              <ThumbBox>
                <img src="" alt="" />
              </ThumbBox>
              <div>
                <NicknameStyle>{el.nickname}</NicknameStyle>
                <DateStyle>{el.regDate}</DateStyle>
              </div>
            </CommentTopInfo>
            <CommentCont>
              <p>{el.contents}</p>
              {el.user_id === user_id ? (
                <div>
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              ) : (
                <></>
              )}
            </CommentCont>
          </CommentItem>
        );
      })}
    </CommentListStyle>
  );
}

const CommentListStyle = styled.ul`
  margin: 0 auto;
  max-width: 1000px;
`;
const CommentItem = styled.li`
  padding: 1rem 2rem;

  & + li {
    border-top: 1px solid #ddd;
  }
`;
const CommentTopInfo = styled.div`
  display: flex;
  align-items: center;
`;
const ThumbBox = styled.figure`
  margin-right: 1rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #eee;
  overflow: hidden;
`;
const NicknameStyle = styled.strong`
  display: block;
`;
const DateStyle = styled.span`
  font-size: 0.8rem;
  color: #999999;
`;
const CommentCont = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
