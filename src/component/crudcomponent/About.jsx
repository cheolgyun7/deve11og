import React from 'react';
import styled from 'styled-components';
import { AboutContents } from 'styles/SharedStyle';

const About = () => {
  const dummyData = [
    {
      name: '강지수',
      github: 'https://github.com/jigico',
      introduce: '발표를 맡게 되었습니다. 너무 떨려요.'
    },
    {
      name: '김철균',
      github: 'https://github.com/cheolgyun7',
      introduce: '오늘 10시간 이상 숙면하겠습니다'
    },
    {
      name: '김연재',
      github: 'https://github.com/porosadporosad',
      introduce: 'Deve11og지금 바로 가입'
    },
    {
      name: '서가희',
      github: 'https://github.com/seokahee',
      introduce: '다들 고생하셨습니다'
    }
  ];
  return (
    <AboutContents>
      <h2>About</h2>
      {dummyData.map((team, index) => (
        <AboutDiv key={index}>
          <span>{team.name}</span>
          <a href={team.github} target="_blank" rel="noopener noreferrer">
            {team.github.split('/').pop()}
          </a>
          <span>{team.introduce}</span>
        </AboutDiv>
      ))}
    </AboutContents>
  );
};

export default About;

export const AboutDiv = styled.div`
  display: flex;
  padding-left: 3rem;
  margin: 2rem 0;
  a {
    width: 10rem;
    color: #bc79ff;
  }
  span {
    &:first-child {
      width: 4rem;
      color: black;
      font-weight: bold;
    }
    &:last-child {
      flex-grow: 3;
      color: black;
    }
  }
`;
