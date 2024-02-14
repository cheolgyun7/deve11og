import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setComment } from '../../redux/modules/comment';
import { BtnBlackBg, BtnBlackText } from 'styles/SharedStyle';
import CommentItem from './CommentItem';
import { useParams } from 'react-router-dom';

export default function CommentList() {
  const { data } = useSelector((state) => state.comment);
  const { user_id } = useSelector((state) => state.user.nowUser);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const { boardData } = useSelector((state) => state.board);
  console.log('boardData', boardData);
  const params = useParams();

  //댓글 데이터 가져오기
  useEffect(() => {
    // const boardId = boardTestData[0].id;
    const fetchCommentData = async () => {
      const q = query(collection(db, 'comments'), where('board_id', '==', params.id));
      // const q = query(collection(db, 'comments'));
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
  // console.log('userData', userData);

  return (
    <CommentListStyle>
      {data.map((el) => {
        let findData = null;
        if (userData) {
          findData = userData.find((item) => {
            return item.user_id === el.user_id;
          });
        }
        // console.log(findData);
        return <CommentItem key={el.id} data={el} findData={findData}></CommentItem>;
      })}
    </CommentListStyle>
  );
}

const CommentListStyle = styled.ul`
  margin: 0 auto 4rem;
  max-width: 1000px;
`;
