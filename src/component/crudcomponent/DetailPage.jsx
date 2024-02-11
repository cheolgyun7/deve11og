import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Section } from 'styles/SharedStyle';

const DetailPage = () => {
  const { userId } = useParams();
  // console.log(userId);
  const question = useSelector((state) => {
    // console.log(state.album.albums); // 상태를 출력하여 확인
    // Redux 상태에서 userId와 일치하는 질문을 찾음
    return state.album.albums.find((item) => item.user_id === userId);
  });
  console.log(question);
  return (
    <Section>
      <div>
        <h2>제목 :{question.title}</h2>
      </div>
    </Section>
  );
};

export default DetailPage;
