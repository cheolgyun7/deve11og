import { getDocs, collection } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Section } from 'styles/SharedStyle';
import { db } from '../firebase';

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };
    fetchData();
  }, []);
  return <Section>Home</Section>;
};

export default Home;
