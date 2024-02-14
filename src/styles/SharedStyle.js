import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
  color: black;
`;

export const HeaderBox = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 1rem 0;
  background: #ffffff;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export const FooterBox = styled.footer`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 1rem 0;
  background: #f5f5f5;
`;

export const Section = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 1500px;
  min-height: 90vh;
`;

export const LayoutStyle = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1500px;
  display: flex;
`;

// 카드 공통css
const cardSharedBox = `
flex-wrap: wrap;
width: 17%;
background-color: #f1f1f1;
margin-right: 0.5rem;
box-shadow: 0 0 0;
& > div {
  margin: 1rem 0.5rem;
}
h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
p {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  span {
    font-size: 0.9rem;
  }
}
`;
//카드안 썸네일 css
const cardthumbnail = `
width: 100%;
  height: 12rem;
  background-color: black;
`;
export const CardThumbnail = styled.p`
  ${cardthumbnail}
  img {
    margin: 0 auto;
    width: 100%;
    height: auto; /* 이미지의 비율을 유지하기 위해 */
    object-fit: cover;
    transition: transform 0.3s ease; /* 호버 시에 자연스럽게 크기가 변하도록 트랜지션 설정 */
  }

  &:hover img {
    transform: scale(1.5); /* 호버 시 이미지를 1.1배로 확대 */
  }
  overflow: hidden;
`;
export const CommunityThumbnail = styled.p`
  ${cardthumbnail}
  img {
    margin: 0 auto;
    width: 100%;
    object-fit: cover;
  }
`;
export const AskRespondThumbnail = styled.p`
  ${cardthumbnail}
`;
export const CardArticle = styled.article`
  ${cardSharedBox}
`;
export const AskRespondListBox = styled.article`
  ${cardSharedBox}
  width: 18%;
  div {
    h4 {
      margin-bottom: 1rem;
    }
    p {
      margin-top: 1rem;
    }
  }
`;
export const CommunityListBox = styled.article`
  ${cardSharedBox}
  width: 18%;
  margin-bottom: 1rem;
  div {
    h4 {
      margin-bottom: 1rem;
    }
    p {
      margin-top: 1rem;
    }
  }
`;
// 메인페이지 title제목과  공통css공유
const contentsShared = `
&>h2{
  font-size: 1.5rem;
    font-weight: bold;
    margin: 2rem 0 1rem 1rem;
    display: inline-block;
    position: relative;
}
  &::after {
    content: '';
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    position: absolute;
    top: -1.2rem;
    left: -1.2rem;
    z-index: -999;
  }
`;
export const AskRespondContents = styled.div`
  ${contentsShared}
  display: inline-block;
  border: 1px solid #c0c0c0;
  border-radius: 1rem;
  padding: 0 1rem 1rem;
  position: relative;
  min-width: 48%;
  height: 20rem;
  overflow: hidden;
  & > h2 {
    ${contentsShared}
    &::after {
      background-color: #ff7d7d;
    }
  }
`;

export const MainContents = styled.div`
  ${contentsShared}
  position: relative;
  padding: 0 1rem;
  margin-bottom: 2rem;
  & > h2 {
    ${contentsShared}
    &::after {
      background-color: #e6c6ff;
    }
  }
`;

export const AboutContents = styled.div`
  ${contentsShared}
  display: inline-block;
  vertical-align: top;
  border: 1px solid #c0c0c0;
  border-radius: 1rem;
  padding: 0 1rem 1rem;
  position: relative;
  margin-left: 3rem;
  min-width: 48%;
  min-height: 20rem;
  & > h2 {
    ${contentsShared}
    &::after {
      background-color: #e6c6ff;
    }
  }
`;

export const AskRespondDetail = styled.div`
  position: relative;
  margin: 2rem;
  ${contentsShared}
  &>h2 {
    margin: auto;
  }
  &::after {
    background-color: #ff7d7d;
  }
`;

export const CommunityDetail = styled.div`
  position: relative;
  margin: 2rem;
  ${contentsShared}
  &>h2 {
    margin: auto;
  }
  &::after {
    background-color: #ff7d7d;
  }
`;

// 공통 아이콘사용 화살표
export const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  cursor: pointer;
`;
export const LikeIcon = styled.span`
  &:hover {
    cursor: pointer;
    color: red; /* 호버 시 변경할 색상 */
  }
`;

// 공통 버튼
export const BtnNormalStyle = styled.button`
  padding: 0.2rem 0.4rem;
  font-size: 0.9rem;
  transition: 0.3s;
`;
export const BtnBlackBg = styled(BtnNormalStyle)`
  background: #000000;
  border: 1px solid #000000;
  color: #fff;
  border-radius: 5px;
`;
export const BtnBlackText = styled(BtnNormalStyle)`
  background: #ffffff;
  border: 1px solid #ffffff;
  color: #000000;
  border-radius: 5px;
`;
