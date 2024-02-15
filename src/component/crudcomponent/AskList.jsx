import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AskRespondListBox, AskRespondThumbnail, LikeIcon, Section } from 'styles/SharedStyle';
import { AskRespondDetail } from 'styles/SharedStyle';
import { useNavigate } from 'react-router-dom';

const AskList = () => {
  const answer = useSelector((state) => state.list.board);
  const { data } = useSelector((state) => state.comment);
  const filteredAskRespondAll = answer.filter((list) => list.category === 'asklist');
  const navigate = useNavigate();
  const ModifyButton = (id) => {
    navigate(`/detailPage/${id}`);
  };
  return (
    <Section>
      <AskRespondDetail>
        <h2>질문 및 답변</h2>
        <AskListBox>
          {filteredAskRespondAll.map((card) => {
            const commentCount = data.filter((comment) => comment.board_id === card.id).length;
            return (
              <AskRespondListBox key={card.id}>
                <AskRespondThumbnail onClick={() => ModifyButton(card.id)}>
                  <img src={card.imageUrl} alt="썸네일" />
                </AskRespondThumbnail>
                <div>
                  <h4 onClick={() => ModifyButton(card.id)}>{card.title}</h4>
                  <span>{card.contents}</span>
                  <p>
                    <span>{card.regDate.slice(0, -6)}</span>
                    {commentCount > 0 ? <span>{commentCount}개의 댓글</span> : <span>등록된 댓글0</span>}
                    <span>
                      <LikeIcon>
                        <FontAwesomeIcon icon={faHeart} />
                      </LikeIcon>
                    </span>
                  </p>
                </div>
              </AskRespondListBox>
            );
          })}
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
