import { getDocs, collection } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Section } from 'styles/SharedStyle';
import { db } from '../firebase';
import Read from './crudcomponent/Read';
import { useDispatch } from 'react-redux';
import { setBoard } from '../redux/modules/list';
import AskRespond from './crudcomponent/AskRespond';
import About from './crudcomponent/About';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'board'));
      const fetchedBoard = [];
      querySnapshot.forEach((doc) => {
        const boardData = doc.data();
        // boardData.user_id = doc.id;
        fetchedBoard.push(boardData);
      });
      dispatch(setBoard(fetchedBoard));
    };
    fetchData();
  }, []);
  return (
    <Section>
      <Read />
      <AskRespond />
      <About />
    </Section>
  );
};

export default Home;
