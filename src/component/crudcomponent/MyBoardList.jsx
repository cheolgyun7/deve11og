import styled from 'styled-components';
import { db, storage } from '../../firebase';
import { ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function MyBoardList() {
  const { user_id } = useSelector((state) => state.user.nowUser);
  const [boards, setBoards] = useState([]);

  //[상수] storage - 게시물의 썸네일 경로
  const THUMBNAIL_DIRECTORY = 'thumbnail';

  useEffect(() => {
    const fetchData = async () => {
      //user_id 와 일치하는 데이터만 조회
      const q = query(collection(db, 'board'), where('user_id', '==', user_id));
      const querySnapshot = await getDocs(q);

      const initial = [];
      querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        const pathRef = ref(storage, `${THUMBNAIL_DIRECTORY}/${data.thumbnail}`);
        // getDownloadURL(pathRef)
        //   .then((url) => {
        //     console.log('실행', url);
        //     initial.push({ id: doc.id, ...doc.data(), thumbnail: url });
        //     console.log('initial', initial);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     alert('에러가 발생했습니다.');
        //   });

        initial.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setBoards(initial);
    };

    fetchData();
  }, [user_id]); //TODO: 새로고침 시 렌더링 안돼서 의존성 배열 추가함. 이유 확인 필요

  if (boards && boards.length) {
    return (
      <MyBoardListStyle>
        {boards.map((el) => {
          return (
            <ItemStyle key={el.id}>
              <Link to={`/detailPage/${el.id}`}>
                {/* TODO: 이미지 확인 필요 */}
                {/* <div>
                  <img src={el.thumbnail} alt="" />
                </div> */}
                {el.category === 'discussion' ? (
                  <CategoryStyle $color="purple">커뮤니티</CategoryStyle>
                ) : (
                  <CategoryStyle $color="red">질문과 답변</CategoryStyle>
                )}
                <BoardTitleStyle>{el.title}</BoardTitleStyle>
                <DateStyle>{el.regDate}</DateStyle>
                <LikeCntStyle>♥ {el.liked}</LikeCntStyle>
              </Link>
            </ItemStyle>
          );
        })}
      </MyBoardListStyle>
    );
  } else {
    return <NoDataStyle>등록한 게시물이 없습니다.</NoDataStyle>;
  }
}

const NoDataStyle = styled.p`
  padding: 4rem 2rem;
  font-size: 1rem;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const MyBoardListStyle = styled.ul`
  margin: 1rem auto;
  width: 100%;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
`;

const ItemStyle = styled.li`
  padding: 1rem;

  & + li {
    border-top: 1px solid #dddddd;
  }

  &:hover strong {
    font-weight: bold;
  }
`;

const CategoryStyle = styled.span`
  display: inline-block;
  padding: 0.3rem;
  font-size: 0.8rem;
  border-radius: 5px;
  background-color: ${(props) => (props.$color === 'purple' ? '#e6c6ff' : '#ff7d7d')};

  /* &::before {
    content: '';
    display: inline-block;
    width: 100%;
    height: 5px;
    background-color: ${(props) => (props.$color === 'purple' ? '#e6c6ff' : '#ff7d7d')};
  } */
`;

const BoardTitleStyle = styled.strong`
  margin: 0.5rem 0;
  display: block;
  transition: all 0.3s;
`;

const DateStyle = styled.span`
  display: inline-block;
  vertical-align: middle;
  color: #999999;
  font-size: 0.8rem;
`;

const LikeCntStyle = styled.span`
  padding-left: 0.8rem;
  display: inline-block;
  vertical-align: middle;
  font-size: 0.8rem;
`;
