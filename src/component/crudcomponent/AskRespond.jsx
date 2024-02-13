import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AskRespondContents, StyledIcon } from 'styles/SharedStyle';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AskRespond = () => {
  const answer = useSelector((state) => state.list.board);
  const filteredAskRespond = answer.filter((list) => list.category === 'techTalk');
  const navigate = useNavigate();
  const askDetailClick = (userId) => {
    navigate(`/detailPage/${userId}`);
  };
  return (
    <AskRespondContents>
      <h2>질문 및 답변</h2>
      <AskRespondBox>
        {filteredAskRespond.map((list) => (
          <ul key={list.user_id}>
            <li onClick={() => askDetailClick(list.user_id)}>{list.title}</li>
            <span>{list.regDate}</span>
            <span>{list.nickname}</span>
          </ul>
        ))}
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
      font-size: 1.8rem;
      font-weight: bold;
      margin-top: 2rem;
      cursor: pointer;
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
