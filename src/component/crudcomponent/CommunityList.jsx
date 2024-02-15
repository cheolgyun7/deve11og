import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CommunityListBox, CommunityThumbnail, LikeIcon, Section } from 'styles/SharedStyle';
import { CommunityDetail } from 'styles/SharedStyle';
import { useNavigate } from 'react-router-dom';

const CommunityList = () => {
  const answer = useSelector((state) => state.list.board);
  const { data } = useSelector((state) => state.comment);
  const filteredCommunityRespondAll = answer.filter((list) => list.category === 'discussion');
  const navigate = useNavigate();
  const ModifyButton = (id) => {
    navigate(`/detailPage/${id}`);
  };
  return (
    <Section>
      <CommunityDetail>
        <h2>커뮤니티</h2>
        <CommunityBox>
          {filteredCommunityRespondAll.map((card) => {
            const commentCount = data.filter((comment) => comment.board_id === card.id).length;

            return (
              <CommunityListBox key={card.id}>
                <CommunityThumbnail onClick={() => ModifyButton(card.id)}>
                  <img src={card.imageUrl} alt="썸네일" />
                </CommunityThumbnail>
                <div>
                  <h4 onClick={() => ModifyButton(card.id)}>{card.title}</h4>
                  <span>{card.contents}</span>
                  <p>
                    <span>{card.regDate.slice(0, -6)}</span>
                    <span>{commentCount}개의 댓글</span>
                    <span>
                      <LikeIcon>
                        <FontAwesomeIcon icon={faHeart} />
                      </LikeIcon>
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
