import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #000;
  color: #fff;
`;

export const HeaderBox = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 0;
  background: #000;

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
  background: #060606;
`;

export const Section = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 1500px;
  min-height: 90vh;
  background-color: #111;
`;

export const LayoutStyle = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1500px;
`;
