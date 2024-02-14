import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CommunityListBox, CommunityThumbnail, LikeIcon, Section } from 'styles/SharedStyle';
import { CommunityDetail } from 'styles/SharedStyle';

const CommunityList = () => {
  const answer = useSelector((state) => state.list.board);
  const { data } = useSelector((state) => state.comment);
  console.log(answer);
  const filteredCommunityRespondAll = answer.filter((list) => list.category === 'discussion');
  console.log(filteredCommunityRespondAll);
  return (
    <Section>
      <CommunityDetail>
        <h2>질문 및 답변</h2>
        <CommunityBox>
          {filteredCommunityRespondAll.map((card) => {
            const commentCount = data.filter((comment) => comment.board_id === card.id).length;

            return (
              <CommunityListBox key={card.id}>
                <CommunityThumbnail>
                  <img src={card.imageUrl} alt="썸네일" />
                </CommunityThumbnail>
                <div>
                  <h4>{card.title}</h4>
                  <span>{card.contents}</span>
                  <p>
                    <span>{card.reg_date}</span>
                    <span>{commentCount}개의 댓글</span>
                    <span>
                      <LikeIcon>
                        <FontAwesomeIcon icon={faHeart} />
                      </LikeIcon>
                      {card.liked}
                    </span>
                  </p>
                </div>
              </CommunityListBox>
            );
          })}
        </CommunityBox>
      </CommunityDetail>
    </Section>
  );
};

export default CommunityList;

export const CommunityBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
  padding: 1rem 3rem;
  border-radius: 1rem;
  border: 1px solid #c5c5c5;
`;
