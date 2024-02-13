import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CardArticle, CardThumbnail, LikeIcon, MainContents } from 'styles/SharedStyle';
import { toggleLike } from '../../redux/modules/list';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const Read = () => {
  const { user_id } = useSelector((state) => state.user.nowUser);
  console.log(user_id);
  console.log(useSelector((state) => state));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listBoard = useSelector((state) => state.list.board); // 비교 함수 추가
  console.log(listBoard);
  const filteredList = listBoard.filter((list) => list.category === 'discussion');
  console.log(filteredList);
  // 좋아요 토글 핸들러 함수
  const handleToggleLike = (postId, isLiked) => {
    dispatch(toggleLike(postId, isLiked, user_id));
    console.log(dispatch(toggleLike(postId, isLiked, user_id)));
  };
  const ModifyButton = (postId) => {
    navigate(`/detailPage/${postId}`);
  };
  return (
    <MainContents>
      <h2>커뮤니티</h2>
      <CardBox>
        {filteredList.map((item, index) => (
          <CardArticle key={item.user_id + index}>
            <CardThumbnail onClick={() => ModifyButton(item.postId)}>
              <img src={item.imageUrl} alt="이미지" />
            </CardThumbnail>
            <div>
              <h4 onClick={() => ModifyButton(item.postId)}>{item.title}</h4>
              <p>
                <span>{item.reg_date}</span>
                <span>개의 댓글</span>
                <span>
                  <LikeIcon onClick={() => handleToggleLike(item.postId, item.liked)}>
                    <FontAwesomeIcon icon={faHeart} style={{ color: item.liked ? 'red' : 'black' }} />
                  </LikeIcon>
                  {item.liked.length} {/* 좋아요 수 */}
                </span>
              </p>
              <p>
                <span>by {item.nickname}</span>
              </p>
            </div>
          </CardArticle>
        ))}
      </CardBox>
    </MainContents>
  );
};

export default Read;

export const CardBox = styled.div`
  display: flex;
  margin: 0 3rem;
`;
