import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CardArticle, CardThumbnail, LikeIcon, MainContents } from 'styles/SharedStyle';

const Read = () => {
  const albums = useSelector((state) => state.album.albums);
  console.log(albums);
  const filteredCommunity = albums.filter((album) => album.Classification === 'Community');
  const likeIconClick = (e) => {
    e.target.style.color = 'red';
  };
  return (
    <MainContents>
      <h2>커뮤니티</h2>
      <CardBox>
        {filteredCommunity.map((album) => (
          <CardArticle key={album.user_id}>
            <CardThumbnail>{/* <img src={album.album_img} alt='앨범 썸네일' /> */}</CardThumbnail>
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

export const CardBox = styled.div`
  display: flex;
  margin: 0 3rem;
`;
