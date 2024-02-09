import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Read = () => {
  const albums = useSelector((state) => state.album.albums);

  console.log(albums);
  const likeIconClick = (e) => {
    e.target.style.color = 'red';
  };
  return (
    <MainContents>
      <h2>PLAYLIST</h2>
      <span>최신순 /</span>
      <span> 좋아요순</span>
      <AlbumBox>
        {albums.map((album) => (
          <AlbumArticle key={album.user_id}>
            <AlbumThumnail>{/* <img src={album.album_img} alt='앨범 썸네일' /> */}</AlbumThumnail>
            <h4>{album.title}</h4>
            <div>
              <span>{album.reg_date}</span>
              <span>
                <LikeIcon onClick={likeIconClick}>
                  <FontAwesomeIcon icon={faHeart} />
                </LikeIcon>
              </span>
              <span>{album.liked}</span>
            </div>
          </AlbumArticle>
        ))}
      </AlbumBox>
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

export const MainContents = styled.div`
  padding: 0 1rem;
  & > h2 {
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem 0;
    display: inline-block;
  }
`;

export const AlbumArticle = styled.article`
  flex-wrap: wrap;
  width: 20%;
  background-color: #f1f1f1;
  margin-right: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 0;
  li {
    width: 100%;
    margin: 0.2rem;
    span {
      font-size: 0.8rem;
    }
  }
`;

export const AlbumBox = styled.div`
  display: flex;
`;

export const AlbumThumnail = styled.div`
  width: 100%;
  height: 12rem;
  background-color: black;
`;
