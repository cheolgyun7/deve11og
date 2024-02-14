import React from 'react';
import { FooterBox, LayoutStyle } from 'styles/SharedStyle';
import githubIcon from '../../image/github-mark.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterBox>
      <LayoutStyle>
        <div>© 2024 deve11og. All Rights Reserved.</div>
        <IconDiv>
          <Link to="https://teamsparta.notion.site/11-3ef9f966184747948bb8a5791a12dae6">
            <IconStyle src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" />
          </Link>
          <Link to="https://github.com/cheolgyun7/deve11og">
            <IconStyle src={githubIcon} />
          </Link>
        </IconDiv>
      </LayoutStyle>
    </FooterBox>
  );
};

export default Footer;

const IconStyle = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.6rem;
  cursor: pointer;
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;
