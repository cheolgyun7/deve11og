import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AskRespondContents, StyledIcon } from 'styles/SharedStyle';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AskRespond = () => {
  const answer = useSelector((state) => state.list.board);
  const filteredAskRespond = answer.filter((list) => list.category === 'asklist');
  console.log(filteredAskRespond);
  const navigate = useNavigate();
  const askDetailClick = (boardId) => {
    navigate(`/detailPage/${boardId}`);
  };
  return (
    <AskRespondContents>
      <h2>질문 및 답변</h2>
      <AskRespondBox>
        <ul>
          {filteredAskRespond.map((list) => (
            <li key={list.user_id} onClick={() => askDetailClick(list.id)}>
              <span>{list.title}</span>
              <span>{list.regDate}</span>
              <span>{list.nickname}</span>
            </li>
          ))}
        </ul>
      </AskRespondBox>
      <Link to="/asklist">
        <StyledIcon icon={faArrowRight} />
      </Link>
    </AskRespondContents>
  );
};

export default AskRespond;

export const AskRespondBox = styled.div`
  ul {
    padding-left: 3rem;
    li {
      list-style: disc;
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 0.5rem;
      cursor: pointer;
    }
    span {
      display: inline-block;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      margin-right: 2rem;
      font-size: 1rem;
      &:first-of-type {
        font-size: 1.5rem;
        color: #737373;
        display: block;
      }
    }
  }
`;
