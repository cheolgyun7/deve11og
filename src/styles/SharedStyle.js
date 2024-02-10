import styled from 'styled-components';

export const Wrapper = styled.div`
  color: black;
`;

export const HeaderBox = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 0;

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
  padding: 1rem 0;
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
`;

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
  min-width: 40rem;
  min-height: 20rem;
  & > h2 {
    ${contentsShared}
    &::after {
      background-color: #ff7d7d;
    }
  }
`;

export const MainContents = styled.div`
  ${contentsShared}
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
  min-width: 40rem;
  min-height: 20rem;
  & > h2 {
    ${contentsShared}
    &::after {
      background-color: #e6c6ff;
    }
  }
`;
