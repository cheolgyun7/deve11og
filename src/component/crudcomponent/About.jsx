import React from 'react';
import styled from 'styled-components';
import { AboutContents } from 'styles/SharedStyle';

const About = () => {
  const dummyData = [
    {
      name: 'kcg',
      github: 'aa@github.com',
      introduce: '내소개입니다1111'
    },
    {
      name: 'bbbb',
      github: 'bb@github.com',
      introduce: '내소개입니다2222'
    },
    {
      name: 'cccc',
      github: 'cc@github.com',
      introduce: '내소개입니다3333'
    }
  ];
  return (
    <AboutContents>
      <h2>About</h2>
      {dummyData.map((team, index) => (
        <AboutDiv key={index}>
          <span>{team.name}</span>
          <span>{team.github}</span>
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
  span {
    width: 10rem;
    color: #737373;
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
