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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = useSelector(
    (state) => state.list.board,
    (prev, next) => prev === next
  ); // 비교 함수 추가
  console.log(list);

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     const promise = list
  //       .filter((item) => item.category === 'discussion')
  //       .map(async (item) => {
  //         const imageRef = ref(storage, `thumbnail/${item.thumbnail}`);
  //         const imageUrl = await getDownloadURL(imageRef);
  //         return {
  //           ...item,
  //           imageUrl
  //         };
  //       });
  //     const result = await Promise.all(promise);
  //     setImageCard(result);
  //   };
  //   fetchImage();
  // }, [list]); // useEffect의 의존성 변경

  const [imageCard, setImageCard] = useState([]);

  // 좋아요 토글 핸들러 함수
  const likeIconClick = (postId, isLiked, userId) => {
    dispatch(toggleLike(postId, isLiked, userId)); // 좋아요 토글 액션을 디스패치합니다.
  };
  const ModifyButton = (userId) => {
    navigate(`/detailPage/${userId}`);
  };
  return (
    <MainContents>
      <h2>커뮤니티</h2>
      <CardBox>
        {imageCard.map((item) => (
          <CardArticle key={item.user_id}>
            <CardThumbnail>
              <img src={item.imageUrl} alt="이미지" />
            </CardThumbnail>
            <div>
              <h4 onClick={() => ModifyButton(item.user_id)}>{item.title}</h4>
              <p>
                <span>{item.reg_date}</span>
                <span>개의 댓글</span>
                <span>
                  <LikeIcon onClick={() => likeIconClick(item.id, item.liked, item.user_id)}>
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
