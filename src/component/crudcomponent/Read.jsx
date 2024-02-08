import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Read = () => {
  const albums = useSelector((state) => state.album.albums);
  console.log(albums);
  return (
    <MainContents>
      <h2>PLAYLIST</h2>
      <AlbumBox>
        {albums.map((album) => (
          <AlbumUi key={album.user_id}>
            <AlbumThumnail>이미지</AlbumThumnail>
            <li>{album.title}</li>
            <li>{album.contents}</li>
            <li>
              <span>{album.reg_date}</span>
              <span>{album.liked}</span>
            </li>
          </AlbumUi>
        ))}
      </AlbumBox>
    </MainContents>
  );
};

export default Read;

export const MainContents = styled.div`
  padding: 0 1rem;
  & > h2 {
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem 0;
  }
`;

export const AlbumUi = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 18%;
  background-color: #282828;
  margin-right: 1rem;
  li {
    width: 100%;
  }
`;

export const AlbumLi = styled.li`
  /* background-color: black; */
`;

export const AlbumBox = styled.div`
  display: flex;
`;

export const AlbumThumnail = styled.div`
  width: 100%;
  height: 180px;
`;
