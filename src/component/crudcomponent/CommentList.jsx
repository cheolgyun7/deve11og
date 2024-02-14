import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import CommentItem from './CommentItem';
import { useParams } from 'react-router-dom';

export default function CommentList({ commentData, setCommentData }) {
  const [userData, setUserData] = useState();

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
      {commentData &&
        commentData.map((el) => {
          let findData = null;
          if (userData) {
            findData = userData.find((item) => {
              return item.user_id === el.user_id;
            });
          }
          return (
            <CommentItem
              key={el.id}
              data={el}
              findData={findData}
              commentData={commentData}
              setCommentData={setCommentData}
            ></CommentItem>
          );
        })}
    </CommentListStyle>
  );
}

const CommentListStyle = styled.ul`
  margin: 0 auto 4rem;
  max-width: 1000px;
`;
