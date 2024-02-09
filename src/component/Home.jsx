import { getDocs, collection } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Section } from 'styles/SharedStyle';
import { db } from '../firebase';
import Read from './crudcomponent/Read';
import { useDispatch } from 'react-redux';
import { setAlbums } from '../redux/modules/album';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'albums'));
      const fetchedAlbums = [];
      querySnapshot.forEach((doc) => {
        const albumData = doc.data();
        albumData.user_id = doc.id;
        fetchedAlbums.push(albumData);
      });
      dispatch(setAlbums(fetchedAlbums));
    };
    fetchData();
  }, []);
  return (
    <Section>
      <Read />
    </Section>
  );
};

export default Home;
