<<<<<<< HEAD
import { Section } from 'styles/SharedStyle';
=======
import { getDocs, collection, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Section } from 'styles/SharedStyle';
import { db } from '../firebase';
import Read from './crudcomponent/Read';
import { useDispatch } from 'react-redux';
import { setAlbums } from '../redux/modules/album';

>>>>>>> e234c833083a1a554938c30c861180f4d3a7b0c5
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'albums'));
      const fetchedAlbums = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        const albumData = doc.data();
        albumData.user_id = doc.id;
        fetchedAlbums.push(albumData);
        console.log(`${doc.id} => ${doc.data()}`);
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
