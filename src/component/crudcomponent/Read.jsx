import React from 'react';
import { useSelector } from 'react-redux';

const Read = () => {
  const albums = useSelector((state) => state.album.albums);
  console.log(albums);
  return (
    <div>
      {albums.map((album) => (
        <div key={album.user_id}>{album.title}</div>
      ))}
    </div>
  );
};

export default Read;
