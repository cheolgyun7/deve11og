import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AskRespondListBox, AskRespondThumbnail, LikeIcon, Section } from 'styles/SharedStyle';
import { AskRespondDetail } from 'styles/SharedStyle';

const AskList = () => {
  const answer = useSelector((state) => state.album.albums);
  const filteredAskRespondAll = answer.filter((list) => list.Classification === 'AskRespond');
  return (
    <Section>
      <AskRespondDetail>
        <h2>질문 및 답변</h2>
        <AskListBox>
          {filteredAskRespondAll.map((card) => (
            <AskRespondListBox key={card.user_id}>
              <AskRespondThumbnail></AskRespondThumbnail>
              <div>
                <h4>{card.title}</h4>
                <span>{card.contents}</span>
                <p>
                  <span>{card.reg_date}</span>
                  <span>개의 댓글</span>
                  <span>
                    <LikeIcon>
                      <FontAwesomeIcon icon={faHeart} />
                    </LikeIcon>
                    {card.liked}
                  </span>
                </p>
              </div>
            </AskRespondListBox>
          ))}
        </AskListBox>
      </AskRespondDetail>
    </Section>
  );
};

export default AskList;

export const AskListBox = styled.div`
  display: flex;
  margin: 1rem 0;
  padding: 1rem 3rem;
  border-radius: 1rem;
  border: 1px solid #c5c5c5;
`;
