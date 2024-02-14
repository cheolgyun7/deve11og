import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledIcon } from 'styles/SharedStyle';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CardArticle, CardThumbnail, LikeIcon, MainContents } from 'styles/SharedStyle';
import { toggleLike } from '../../redux/modules/list';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { setComment } from '../../redux/modules/comment';

const Read = () => {
  // const { user_id } = useSelector((state) => state.user.nowUser);
  const navigate = useNavigate();
  const listBoard = useSelector((state) => state.list.board); // 비교 함수 추가
  const dispatch = useDispatch();
  const filteredList = listBoard.filter((list) => list.category === 'discussion');
  const { data } = useSelector((state) => state.comment);
  useEffect(() => {
    // const boardId = boardTestData[0].id;
    const fetchCommentData = async () => {
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
  // 좋아요 토글 핸들러 함수
  const handleToggleLike = (id, isLiked) => {
    dispatch(toggleLike(id, isLiked));
    console.log(dispatch(toggleLike(id, isLiked)));
  };
  const ModifyButton = (id) => {
    navigate(`/detailPage/${id}`);
  };
  return (
    <MainContents>
      <h2>커뮤니티</h2>
      <CardBox>
        {filteredList.length === 0 ? (
          <span>등록된 커뮤니티 글이 없습니다</span>
        ) : (
          filteredList.map((item, index) => {
            const commentCount = data.filter((comment) => comment.board_id === item.id).length;
            return (
              <CardArticle key={index}>
                <CardThumbnail onClick={() => ModifyButton(item.id)}>
                  <img src={item.imageUrl} alt="이미지" />
                </CardThumbnail>
                <div>
                  <h4 onClick={() => ModifyButton(item.id)}>{item.title}</h4>
                  <p>
                    <span>{item.regDate.slice(0, -6)}</span>
                    <span>{commentCount}개의 댓글</span>
                    <span>
                      <LikeIcon onClick={() => handleToggleLike(item.id, item.liked)}>
                        <FontAwesomeIcon icon={faHeart} style={{ color: item.liked ? 'red' : 'black' }} />
                      </LikeIcon>
                      {item.liked.length}
                    </span>
                  </p>
                  <p>
                    <span>by {item.nickname}</span>
                  </p>
                </div>
              </CardArticle>
            );
          })
        )}
      </CardBox>
      <Link to="/communityList">
        <StyledIcon icon={faArrowRight} />
      </Link>
    </MainContents>
  );
};
export default Read;
export const CardBox = styled.div`
  display: flex;
  margin: 0 3rem;
  flex-wrap: wrap;
  height: 20rem;
  overflow: hidden;
`;
