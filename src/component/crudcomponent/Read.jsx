import React from 'react';
import { useSelector } from 'react-redux';

const Read = () => {
  const albums = useSelector((state) => state.album.albums);
  console.log(albums);
  return (
    <div>
      {albums.map((album) => (
        <ul key={album.user_id}>
          <li>{album.title}</li>
          <li>{album.contents}</li>
          <li>{album.reg_date}</li>
          <li>{album.liked}</li>
        </ul>
      ))}
    </div>
  );
};

export default Read;
