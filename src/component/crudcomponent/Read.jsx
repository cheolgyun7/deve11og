import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { MainContents } from 'styles/SharedStyle';

const Read = () => {
  const albums = useSelector((state) => state.album.albums);
  const filteredCommunity = albums.filter((album) => album.Classification === 'Community');

  console.log(albums);
  const likeIconClick = (e) => {
    e.target.style.color = 'red';
  };
  return (
    <MainContents>
      <h2>커뮤니티</h2>
      <CardBox>
        {filteredCommunity.map((album) => (
          <CardArticle key={album.user_id}>
            <CardThumnail>{/* <img src={album.album_img} alt='앨범 썸네일' /> */}</CardThumnail>
            <div>
              <h4>{album.title}</h4>
              <p>
                <span>{album.reg_date}</span>
                <span>개의 댓글</span>
                <span>
                  <LikeIcon onClick={likeIconClick}>
                    <FontAwesomeIcon icon={faHeart} />
                  </LikeIcon>
                  {album.liked}
                </span>
              </p>
              <p>
                <span>by {album.nickname}</span>
              </p>
            </div>
          </CardArticle>
        ))}
      </CardBox>
    </MainContents>
  );
};

export default Read;

export const LikeIcon = styled.span`
  &:hover {
    cursor: pointer;
    color: red; /* 호버 시 변경할 색상 */
  }
`;

export const CardArticle = styled.article`
  flex-wrap: wrap;
  width: 17%;
  background-color: #f1f1f1;
  margin-right: 0.5rem;
  box-shadow: 0 0 0;
  & > div {
    margin: 1rem 0.5rem;
  }
  h4 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  p {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    span {
      font-size: 0.9rem;
    }
  }
`;

export const CardBox = styled.div`
  display: flex;
  margin: 0 3rem;
`;

export const CardThumnail = styled.p`
  width: 100%;
  height: 12rem;
  background-color: black;
`;
