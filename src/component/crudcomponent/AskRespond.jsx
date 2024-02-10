import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AskRespondContents } from 'styles/SharedStyle';

const AskRespond = () => {
  const answer = useSelector((state) => state.album.albums);
  const filteredAskRespond = answer.filter((list) => list.Classification === 'AskRespond');
  return (
    <AskRespondContents>
      <h2>질문 및 답변</h2>
      <AskRespondBox>
        {filteredAskRespond.map((list) => (
          <ul key={list.user_id}>
            <li>{list.title}</li>
            <span>{list.reg_date}</span>
            <span>{list.nickname}</span>
          </ul>
        ))}
      </AskRespondBox>
    </AskRespondContents>
  );
};

export default AskRespond;

export const AskRespondBox = styled.div`
  ul {
    padding-left: 3rem;
    li {
      list-style: disc;
      font-size: 1.8rem;
      font-weight: bold;
      margin-top: 2rem;
    }
    span {
      display: inline-block;
      margin-top: 0.5rem;
      margin-bottom: 2rem;
      margin-right: 2rem;
      color: #737373;
    }
  }
`;
