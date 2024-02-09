import styled from 'styled-components';

export const Wrapper = styled.div``;

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
  color: black;
`;
